import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import styles from '../Crm.module.scss';
import { ICrmComponentProps } from '../ICrmComponentProps';

import { CommandBar, IContextualMenuItem } from 'office-ui-fabric-react';

import DialogUtility from '../../../utilities/DialogUtility';

import ViewSet from '../../../data/ViewSet';
import { IPerson } from '../../../data/IPerson';
import { IOrganization } from '../../../data/IOrganization';
import { ITagSet } from '../../../dataProviders/ITagSet';

import Home from './Home';

import PersonDisplay from './PersonDisplay';
import PersonEdit from './PersonEdit';
import OrganizationDisplay from './OrganizationDisplay';
import OrganizationEdit from './OrganizationEdit';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { IPersonEditProps } from './PersonEdit';
import { IOrganizationEditProps } from './OrganizationEdit';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';

export interface IPickerItem 
{ 
  key: string;
  name: string;
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
  OrganizationQuery = 11
}

export interface ICrmProps extends ICrmComponentProps {
  description: string;
  views: ViewSet;
}

export interface ICrmState {
  lastMode: CrmMode;
  mode: CrmMode;
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
      lastMode: CrmMode.Loading,
      mode: CrmMode.Loading,
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
}

  public componentWillMount()
  {

     this.props.manager.data.init().then( () =>
     {
       var errs = this.props.manager.data.getErrors();

       var mode = CrmMode.OrganizationDirectory;

       if (errs != null && errs.length > 0)
       {
         mode = CrmMode.Error;
       }

       this.setState({
        searchTerm: this.state.searchTerm,
        searchTags: this.state.searchTags,
        lastMode: mode,
        mode: mode,
        selectedOrganization: this.state.selectedOrganization,
        selectedPerson: this.state.selectedPerson ,
        isEditing: false     
       });
     }, (error : any) => {

       this.setState({
        searchTerm: this.state.searchTerm,
        searchTags: this.state.searchTags,
        lastMode: CrmMode.Error,
        mode: CrmMode.Error,
        selectedOrganization: this.state.selectedOrganization,
        selectedPerson: this.state.selectedPerson ,
        isEditing: false     
       });
     });
  }

  private _handleNewPersonClick(val: any)
  {    
    const personEditElement : React.ReactElement<IPersonEditProps> = React.createElement(
      PersonEdit,
      {
        person: null,
        manager: this.props.manager,
        ensureNew: true,
        isDialog: true
      }
    );
        
    DialogUtility.showDialog(personEditElement, {
      displaySaveButton: true,
      dialogTitle: "Add Person"
    });
  }

  private _handleNewOrganizationClick(val: any)
  {    
    const organizationEditElement : React.ReactElement<IOrganizationEditProps> = React.createElement(
      OrganizationEdit,
      {
        organization: null,
        manager: this.props.manager,
        ensureNew: true,
        isDialog: true
      }
    );

    DialogUtility.showDialog(organizationEditElement, {
      displaySaveButton: true,
      dialogTitle: "Add Organization"
    });
  }

  public _handlePersonSelected(val: any)
  {
    this.setState({
      lastMode: this.state.mode,
      mode: CrmMode.Person,
      selectedPerson: val,
      isEditing: false
    });
  }

  public _handleOrganizationSelected(val: any)
  {
    this.setState({      
      lastMode: this.state.mode,
      mode: CrmMode.Organization,
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
    /*
     this.setState({
          searchTerm: this.state.searchTerm,
          searchTags: this.state.searchTags,
          lastMode: mode,          
          mode: mode,
          selectedOrganization: this.state.selectedOrganization,
          selectedPerson: this.state.selectedPerson,
          isEditing: this.state.isEditing
        }); */
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
          <h2>Community Solutions</h2>
        </div>  
        </div>;


    if (this.state.mode == CrmMode.Loading)
    {
      return <div className={ styles.crm } >
        { splashHeader } 
        <div>Loading...</div>
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
              </div>;
    }
    else if (  this.state.mode != CrmMode.Person && 
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
                    lastMode: this._lastMode != null ? this._lastMode : this.state.lastMode, 
                    isEditing: false });
                }
              }><i className="ms-Icon ms-Icon--Back" aria-hidden="true"></i></Button>
            <Button className={styles.formButton}  onClick={ () => {
                if (this._organizationDisplay != null && this.state.isEditing)
                {
                  this._organizationDisplay.updateOrganizationEdit();
                }
            
                this.setState( { mode: this.state.mode, lastMode: this.state.lastMode, isEditing: !this.state.isEditing});
               }}><i className="ms-Icon ms-Icon--Edit" aria-hidden="true"></i></Button>
          </div>
          <OrganizationDisplay manager={ this.props.manager }
              ref={ (incomingOrganizationDisplay : OrganizationDisplay) => { this._organizationDisplay = incomingOrganizationDisplay; } }
              onPersonSelected={ this._handlePersonSelected } 
               isEditing={this.state.isEditing} itemId={this.state.selectedOrganization.Id} organization={ this.state.selectedOrganization } allowEdit={ true }/>
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
      </div>
    );
  }
}
