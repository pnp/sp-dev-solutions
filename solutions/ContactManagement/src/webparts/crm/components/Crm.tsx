// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import styles from '../Crm.module.scss';
import { ICrmComponentProps } from '../ICrmComponentProps';
import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import { CommandBar, IContextualMenuItem, Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react';
import { ProvisionManager }  from '../../../biz/ProvisionManager';
import { EnsureListResult } from "../../../libraries/solutions/EnsureListResult";

import DialogUtility from '../../../utilities/DialogUtility';

import ViewSet from '../../../data/ViewSet';
import View from '../../../data/View';
import Clause, { ClauseType } from '../../../data/Clause';
import OrganizationSet from '../../../dataProviders/OrganizationSet';
import { IPerson } from '../../../data/IPerson';
import { IOrganization } from '../../../data/IOrganization';
import { ITagSet } from '../../../dataProviders/ITagSet';

import Home from './Home';

import PersonDisplay from './PersonDisplay';
import PersonEdit from './PersonEdit';
import OrganizationDisplay from './OrganizationDisplay';
import OrganizationEdit from './OrganizationEdit';
import UserInterfaceUtility from '../../../sharePointComponents/UserInterfaceUtility';
import SharePointUtility from '../../../data/SharePointUtility';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';

export interface IPickerItem 
{ 
  key: string;
  name: string;
}

export enum CrmDialogMode
{
  None = 0,
  Organization = 1,
  Person = 2
}

export enum CrmMode
{
  Loading = 0,
  Error = 1,
  PersonDirectory = 5,
  Person = 6,
  OrganizationDirectory = 2,
  Organization = 3,
  Search = 4,
  OrganizationRecent = 9,
  OrganizationUnprioritized = 10,
  OrganizationQuery = 11,
  ListsNotInitialized = 12
}

export interface ICrmProps extends ICrmComponentProps {
  description: string;
  views: ViewSet;
  context: IWebPartContext;
  displayMode: number; 
  initialMode: CrmMode; 
}

export interface ICrmState {
  lastMode: CrmMode;
  mode: CrmMode;
  isContextMenuShown?: boolean;
  dialogMode: CrmDialogMode;
  searchTerm?: string;
  searchTags?: number[];
	selectedPerson?: IPerson;
	selectedOrganization?: IOrganization;
  isEditing : boolean;
}

export default class Crm extends React.Component<ICrmProps, ICrmState> {
  private _organizationDisplay : OrganizationDisplay;
  private _personDisplay : PersonDisplay;
  private _lastMode? : CrmMode;

  public constructor(props?: ICrmProps, context?: any)
  {
    super(props, context);

    this.state = {
      lastMode: props.initialMode,
      dialogMode: CrmDialogMode.None,
      mode: props.initialMode,
      isEditing: false
    };

    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._handleModeChanged = this._handleModeChanged.bind(this);
    this._handleChanged = this._handleChanged.bind(this);
    this._handlePersonSelected = this._handlePersonSelected.bind(this);
    this._handleOrganizationSelected = this._handleOrganizationSelected.bind(this);
    this._handleSearchChanged = this._handleSearchChanged.bind(this);
    this._handleNewPersonClick = this._handleNewPersonClick.bind(this);
    this._handleNewOrganizationClick = this._handleNewOrganizationClick.bind(this);
    this._hideDialog = this._hideDialog.bind(this);
    this._confirmDialog = this._confirmDialog.bind(this);
  }

  public componentWillMount()
  {
    var errs = this.props.manager.data.getErrors();

    var mode = this.props.initialMode;

    if (mode == CrmMode.Loading)
    {
      mode = CrmMode.OrganizationDirectory;
    }

    let locationHash = location.hash;

    if (locationHash != null)
    {
      locationHash = locationHash.trim().replace("#", "");
        
      if (locationHash == "people")
      {
        mode = CrmMode.PersonDirectory;
      }

      if (locationHash.length > 8 && locationHash.substring(0, 4) == "org(")
      {
        let view = new View();
        let titleEqualsValue = new Clause();
        titleEqualsValue.fieldName = "Title";
        titleEqualsValue.clauseType = ClauseType.Equals;
        titleEqualsValue.value = locationHash.substring(4, locationHash.length - 1);
        view.query.addClause(titleEqualsValue);

        this.props.manager.data.readOrganizationItemsByView(view).then((organizationSet : OrganizationSet) =>
        {
          if (organizationSet != null && organizationSet.organizations.length == 1)
          {            
            this.setState({
              searchTerm: this.state.searchTerm,
              searchTags: this.state.searchTags,
              lastMode: mode,
              dialogMode: this.state.dialogMode, 
              mode: CrmMode.Organization,
              selectedOrganization: organizationSet.organizations[0],
              selectedPerson: null,
              isEditing: false     
            });
          }
        });
      }
    }

    if (errs != null && errs.length > 0)
    {
      mode = CrmMode.Error;
    }

    this.setState({
      searchTerm: this.state.searchTerm,
      searchTags: this.state.searchTags,
      dialogMode: this.state.dialogMode, 
      lastMode: mode,
      mode: mode,
      selectedOrganization: this.state.selectedOrganization,
      selectedPerson: this.state.selectedPerson,
      isEditing: false     
    });
  }

  private _confirmDialog()
  {
    DialogUtility.doSaveCallout();
    this._hideDialog();
  }

  private _hideDialog()
  {
    this.setState({
      lastMode: this.state.lastMode,
      mode: this.state.mode,
      dialogMode: CrmDialogMode.None, 
      selectedPerson: this.state.selectedPerson,
      selectedOrganization: this.state.selectedOrganization,
      isEditing: false
    });
  }

  private _handleNewOrganizationClick(val: any)
  { 
    this.setState({
      lastMode: this.state.lastMode,
      mode: this.state.mode,
      dialogMode: CrmDialogMode.Organization, 
      selectedPerson: this.state.selectedPerson,
      selectedOrganization: this.state.selectedOrganization,
      isEditing: false
    });
  }

  private _handleNewPersonClick(val: any)
  { 
    this.setState({
      lastMode: this.state.lastMode,
      mode: this.state.mode,
      dialogMode: CrmDialogMode.Person, 
      selectedPerson: this.state.selectedPerson,
      selectedOrganization: this.state.selectedOrganization,
      isEditing: false
    });
  }

  public _handlePersonSelected(val: any)
  {
    this.setState({
      lastMode: this.state.mode,
      mode: CrmMode.Person,
      dialogMode: this.state.dialogMode, 
      selectedPerson: val,
      isEditing: false
    });
  }

  public _handleOrganizationSelected(val: any)
  {
    this.setState({      
      lastMode: this.state.mode,
      mode: CrmMode.Organization,
      dialogMode: this.state.dialogMode, 
      selectedOrganization: val,
      isEditing: false
    });
  }

  protected _handleSearchChanged(newValue : any) : void
  {
    if (newValue.length > 1 || (this.state.searchTags != null && this.state.searchTags.length > 0))
    {
      this.setState({
        searchTerm: newValue,
        searchTags: this.state.searchTags,
        lastMode: this.state.mode,
        dialogMode: this.state.dialogMode, 
        mode: CrmMode.Search,
        selectedOrganization: this.state.selectedOrganization,
        selectedPerson: this.state.selectedPerson ,
        isEditing: false     
      });
    }
    else if (this.state.mode == CrmMode.Search)
    {
      this.setState({
        searchTerm: newValue,
        searchTags: this.state.searchTags,
        lastMode: this.state.mode, 
        dialogMode: this.state.dialogMode, 
        mode: CrmMode.OrganizationDirectory,
        selectedOrganization: this.state.selectedOrganization,
        selectedPerson: this.state.selectedPerson,
        isEditing: this.state.isEditing
      });

    }
  }
  
  protected _handleChanged(pickerItems : IPickerItem[]) : void
  {
    if (pickerItems == null)
    {
      if (this.state.searchTags != null)
      {

       this.setState({
          searchTerm: this.state.searchTerm,
          searchTags: null,
          dialogMode: this.state.dialogMode,           
          lastMode: CrmMode.OrganizationDirectory,
          mode: CrmMode.OrganizationDirectory,
          selectedOrganization: this.state.selectedOrganization,
          selectedPerson: this.state.selectedPerson,
          isEditing: this.state.isEditing
        }); 
      }
    }
    else
    {
      var selectedItems : number[] = new Array();

      for (var item of pickerItems)
      {
        selectedItems.push(parseInt(item.key));
      }

       this.setState({
          searchTerm: this.state.searchTerm,
          searchTags: selectedItems,
          lastMode: this.state.mode,         
          dialogMode: this.state.dialogMode,          
          mode: CrmMode.Search,
          selectedOrganization: this.state.selectedOrganization,
          selectedPerson: this.state.selectedPerson,
          isEditing: this.state.isEditing
        }); 
    }
  }

  public _handleModeChanged(mode: CrmMode)
  {
    this._lastMode = mode;
  }

  private _onFilterChanged(filterText: string, tagList: IPickerItem[])  
  {
    this._handleSearchChanged(filterText);

    if (filterText) 
    {        
        return this.props.manager.data.readTagItemsBySearch(filterText).then( (tagSet: ITagSet ) =>
        {
          var selections : IPickerItem[] = new Array();
          
          if (tagSet != null)
          {
            for (var item of tagSet.tags)
            {
              var selection = {
                name: item.Title,
                key: item.Id + ""
              };

              selections.push(selection);
            }
          }

          return selections;
        });
    } 
    else
    {
      return [];
    }
  }

  public render(): React.ReactElement<ICrmProps> {
    var pageRender;

    
    var splashHeader = <div>
              	    <CommandBar
                       isSearchBoxVisible={ false }
                      items={ [] }
                     />        
          <div className={ styles.logoArea }>
            <h1>Contact Management</h1>
          </div>  
        </div>;

    
    if (this.state.mode == CrmMode.Loading)
    {
      return <div className={ styles.crm } >
        { splashHeader } 
        <div>Loading...</div>
      </div>;
    }
    else if (this.state.mode == CrmMode.ListsNotInitialized)
    {
      return <div className={ styles.crm } >
        { splashHeader } 
        <div>This web part requires Organization, Contact, and Tag lists for storage of data. Click Create Lists to set these lists up.</div>
        <p>
          <Button onClick={ () => { 
            ProvisionManager.provisionSite(this.props.context).then((result: EnsureListResult) => {          
              this.props.manager.data.init().then( () => {
                this.setState( { 
                    mode: CrmMode.OrganizationDirectory, 
                    dialogMode: this.state.dialogMode, 
                    lastMode: CrmMode.Organization,
                    isEditing: false});
                  });
              });
            }}>
            Create Lists
          </Button>
        </p>        
      </div>;
    }
    else if (this.state.mode == CrmMode.Error)
    {
      var errs = this.props.manager.data.getErrors();

      return <div className={ styles.crm }>        
              { splashHeader }
              <div className={ styles.errorText } >Sorry, this app is not able to start.</div>
              {
                errs ?
                errs.map( (err, i) =>
                {
                  return <div key={i}>{ err.message } </div>;
                }) : <div></div>
              }
              <p>
                  <div>&#160;</div>
                  <div>&#160;</div>
                  Please note that you should have the following lists and fields in your site.
                  <div className={ styles.errorDescription }>
                    <div className={ styles.errorListTitle }>Organization List</div>
                    <div  className={ styles.errorDescriptionList }>
                      {
                        this.props.manager.data.defaultOrganizationList.Fields.map((field, i) =>
                        {
                          return <div key={i} className={ styles.errorDescriptionField }>
                              <div className={ styles.errorDescriptionData } >{ field.InternalName.replace("_x0020_", " ") }</div>
                              <div className={ styles.errorDescriptionData }>{ SharePointUtility.getFieldTypeFriendlyName(field.FieldTypeKind)}</div>
                            </div>;
                        })
                      }
                    </div>
                    <div className={ styles.errorListTitle }>Contacts List</div>
                    <div className={ styles.errorDescriptionList }>
                      {
                        this.props.manager.data.defaultPersonList.Fields.map((field, i) =>
                        {
                          return <div key={i} className={ styles.errorDescriptionField }>
                              <div className={ styles.errorDescriptionData } >{ field.InternalName.replace("_x0020_", " ") }</div>
                              <div className={ styles.errorDescriptionData }>{ SharePointUtility.getFieldTypeFriendlyName(field.FieldTypeKind)}</div>
                            </div>;
                        })
                      }
                    </div>
                    <div className={ styles.errorListTitle }>Tags List</div>
                    <div className={ styles.errorDescriptionList }>
                      {
                        this.props.manager.data.defaultTagList.Fields.map((field, i) =>
                        {
                          return <div key={i} className={ styles.errorDescriptionField }>
                              <div className={ styles.errorDescriptionData } >{ field.InternalName.replace("_x0020_", " ") }</div>
                              <div className={ styles.errorDescriptionData }>{ SharePointUtility.getFieldTypeFriendlyName(field.FieldTypeKind)}</div>
                            </div>;
                        })
                      }
                    </div>                    
                  </div>
                </p>
            </div>;
    }
    else if (   this.state.mode != CrmMode.Person && 
                this.state.mode != CrmMode.Organization)
    {
      pageRender = <Home  manager={ this.props.manager } 
                          mode={ this.state.mode } 
                          views= { this.props.views }
                          searchTerm= { this.state.searchTerm }
                          searchTags= { this.state.searchTags }
                          onModeChanged = { this._handleModeChanged }
                          onPersonSelected={ this._handlePersonSelected } 
                          onOrganizationSelected={ this._handleOrganizationSelected }/>;              
    }
    else if (this.state.mode == CrmMode.Person)
    {
      pageRender = <div>
          <div className={ styles.formToolBar }>
            <Button className={styles.formButton} onClick={ () => { 
                  if (this._personDisplay != null && this.state.isEditing)
                  {
                    this._personDisplay.updatePersonEdit();
                  }

                  this.setState( { 
                      mode: this._lastMode != null ? this._lastMode : this.state.lastMode, 
                      dialogMode: this.state.dialogMode, 
                      lastMode: CrmMode.OrganizationDirectory,
                      isEditing: false});
                }
              }><i className="ms-Icon ms-Icon--Back" aria-hidden="true"></i></Button>
            <Button className={styles.formButton} onClick={ () => {
                if (this._personDisplay != null && this.state.isEditing)
                {
                  this._personDisplay.updatePersonEdit();
                }

                this.setState( { 
                      mode: this.state.mode, 
                      dialogMode: this.state.dialogMode, 
                      lastMode: CrmMode.OrganizationDirectory, 
                      isEditing: !this.state.isEditing });
                }
              }><i className="ms-Icon ms-Icon--Edit" aria-hidden="true"></i></Button>
          </div>
          <PersonDisplay manager={ this.props.manager }           
               ref={ (incomingPersonDisplay : PersonDisplay) => { this._personDisplay = incomingPersonDisplay; } }
               isEditing={this.state.isEditing} itemId={this.state.selectedPerson.Id} person={ this.state.selectedPerson } allowEdit={ true }/>
        </div>;              
    }
    else if (this.state.mode == CrmMode.Organization)
    {
      pageRender = <div>
          <div className={ styles.formToolBar }>
            <Button className={styles.formButton} onClick={ () => { 
                  if (this._organizationDisplay != null && this.state.isEditing)
                  {
                    this._organizationDisplay.updateOrganizationEdit();
                  }

                  this.setState( { 
                    mode: this._lastMode != null ? this._lastMode : this.state.lastMode, 
                    dialogMode: this.state.dialogMode, 
                    lastMode: this._lastMode != null ? this._lastMode : this.state.lastMode, 
                    isEditing: false });
                }
              }><i className="ms-Icon ms-Icon--Back" aria-hidden="true"></i></Button>
            <Button className={styles.formButton}  onClick={ () => {
                if (this._organizationDisplay != null && this.state.isEditing)
                {
                  this._organizationDisplay.updateOrganizationEdit();
                }
            
                this.setState( { 
                  mode: this.state.mode, 
                  dialogMode: this.state.dialogMode, 
                  lastMode: this.state.lastMode, 
                  isEditing: !this.state.isEditing
                });
               }}><i className="ms-Icon ms-Icon--Edit" aria-hidden="true"></i></Button>
          </div>
          <div className={styles.formArea}>
            <OrganizationDisplay manager={ this.props.manager }
                ref={ (incomingOrganizationDisplay : OrganizationDisplay) => { this._organizationDisplay = incomingOrganizationDisplay; } }
                onPersonSelected={ this._handlePersonSelected } 
                 isEditing={this.state.isEditing} itemId={this.state.selectedOrganization.Id} organization={ this.state.selectedOrganization } allowEdit={ true }/>
          </div>
        </div>;              
    }
 
	  const menuItems: IContextualMenuItem[] = [ 
        { 
          name: 'New Person', 
          key: 'newPerson',
          onClick: this._handleNewPersonClick
        },
        { 
          name: 'New Organization', 
          key: 'newOrganization',
          onClick: this._handleNewOrganizationClick
        }
    ];
    
    UserInterfaceUtility.applyWorkarounds();

    return (
      <div className={styles.crm}>
        <div className={styles.container}>
          <div className={css(styles.row)}>
            <div className={css(styles.toolBarCell)}>
              <div className={css(styles.toolBarOuter)}>
                <div className={css(styles.toolBarInner)}>
                  <div className={css(styles.searchAreaLabel)}>
                    <Label>Search</Label>
                  </div>
                  <div className={css(styles.searchArea)}>
                    <TagPicker
                      onResolveSuggestions = { this._onFilterChanged.bind(this) }
                      getTextFromItem = { (item: any) => { return item.name; } }
                      onChange= { this._handleChanged }
                      pickerSuggestionsProps={
                        {
                          suggestionsHeaderText: 'Suggested searches',
                          noResultsFoundText: 'No tags found'
                        }
                      }
                    />
                  </div>
                  <div className={css(styles.toolBar)}>
              	    <CommandBar
                      isSearchBoxVisible={ false }
                      items={ menuItems }
                     />          
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={css(styles.row)}>
            <div className={css(styles.contentCell)}>
              { pageRender }          
            </div>
          </div>          
        </div>
        { 
            this.props.displayMode != 1 ?
            <div className={styles.brandArea}>
              <a className={styles.brandContent} href="https://aka.ms/sppnpsolutions">
                <span className={styles.iconArea}><i className={`ms-Icon ms-Icon--SharepointLogo`} aria-hidden="true"></i></span>
                <span>SharePoint Patterns and Practices Community Solutions</span>
              </a>
            </div> : 
            <div></div> 
        }        
        <Dialog  isOpen={ this.state.dialogMode == CrmDialogMode.Organization }
          type={ DialogType.largeHeader }    
          title= { "Organization" }
          containerClassName = { styles.fullDialog }
          isBlocking={ true } >
          <OrganizationEdit
            organization = { null }
            manager = { this.props.manager }
            ensureNew = {true }
            isDialog = { true }
          />
          <DialogFooter>
            <Button style={{ border: "solid 1px #D0D0D0" }} onClick={ this._confirmDialog }>Save</Button>
            <Button style={{ border: "solid 1px #D0D0D0" }} onClick={ this._hideDialog }>Cancel</Button>
          </DialogFooter>
        </Dialog>
        <Dialog  isOpen={ this.state.dialogMode == CrmDialogMode.Person }
          type={ DialogType.largeHeader }    
          title= { "Person" }
          containerClassName = { styles.fullDialog }
          isBlocking={ true } >
          <PersonEdit
            person = { null }
            manager = { this.props.manager }
            ensureNew = {true }
            isDialog = { true }
          />
          <DialogFooter>
            <Button style={{ border: "solid 1px #D0D0D0" }} onClick={ this._confirmDialog }>Save</Button>
            <Button style={{ border: "solid 1px #D0D0D0" }} onClick={ this._hideDialog }>Cancel</Button>
          </DialogFooter>
        </Dialog>     
      </div>
    );
  }
}
