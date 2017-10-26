// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import styles from '../Crm.module.scss';
import { PersonCallback } from '../../../data/IPerson';

import { ICrmComponentProps } from '../ICrmComponentProps';
import OrganizationEdit from './OrganizationEdit';
import { IOrganization } from '../../../data/IOrganization';
import { IPerson } from '../../../data/IPerson';
import ItemFieldIterator from '../../../sharePointComponents/ItemFieldIterator';
import ItemTextFieldDisplay from '../../../sharePointComponents/ItemTextFieldDisplay';
import ItemRichTextFieldDisplay from '../../../sharePointComponents/ItemRichTextFieldDisplay';
import ItemMultiLookupFieldDisplay from '../../../sharePointComponents/ItemMultiLookupFieldDisplay';
import ItemUrlFieldDisplay from '../../../sharePointComponents/ItemUrlFieldDisplay';
import ItemDateFieldDisplay from '../../../sharePointComponents/ItemDateFieldDisplay';
import ItemPeopleFieldDisplay from '../../../sharePointComponents/ItemPeopleFieldDisplay';
import UserInterfaceUtility from '../../../sharePointComponents/UserInterfaceUtility';
import ItemContext from '../../../sharePointComponents/ItemContext';
import PersonMiniDisplay from './PersonMiniDisplay';
import ElementUtilities from '../../../utilities/ElementUtilities';

import {
  PivotItem,
  Pivot
} from 'office-ui-fabric-react/lib/Pivot';

export interface IOrganizationDisplayProps extends ICrmComponentProps{
  organization: IOrganization;
  allowEdit: boolean;
  itemId : number;
  onPersonSelected : PersonCallback;
  isEditing? : boolean;
}

export interface IOrganizationDisplayState {
  isEditing : boolean;
  persons? : IPerson[];
  personsQueryId? : number;
}

import DialogUtility from '../../../utilities/DialogUtility';

import PersonEdit, { IPersonEditProps }  from './PersonEdit';

import { Button } from 'office-ui-fabric-react/lib/Button';

export default class OrganizationDisplay extends React.Component<IOrganizationDisplayProps, IOrganizationDisplayState> {

  private _organizationEdit : OrganizationEdit = null; 
  private _itemContext : ItemContext = null;

  public constructor(props?: IOrganizationDisplayProps, context?: any)
  {
    super(props, context);

    this.state = {
      isEditing : false
    };

    this.updateOrganizationEdit = this.updateOrganizationEdit.bind(this);
    this._updateItemsState = this._updateItemsState.bind(this);
    this._handleNewPersonClick = this._handleNewPersonClick.bind(this);
    this._handlePersonClick = this._handlePersonClick.bind(this);
    this._itemContext = new ItemContext();
    this._itemContext.dataProvider = this.props.manager.data;    
  }

  private _handleNewPersonClick() : void {
  
    var newPersonProto : IPerson = {
      OrganizationId : this._itemContext.itemObject.Id,
      Title: "",
      FirstName: "",
      Id: this.props.manager.data.nextNewId(), 
      Company: ""
    } ;

    const personEditElement : React.ReactElement<IPersonEditProps> = React.createElement(
      PersonEdit,
      {
        person: null,
        newPersonPrototype: newPersonProto,
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

  public updateOrganizationEdit() : void
  {
    this._organizationEdit.onSave();
  }

  public componentWillMount()
  {
    this._updateProps(this.props);

    this.props.manager.data.onPersonAdded.sub(this._updateItemsState, this);
  }
 
  private _updateItemsState() : void
  {
    this._updateProps(this.props);

    this._executeQuery();
  }

  public componentWillReceiveProps(nextProps : IOrganizationDisplayProps) 
  {
    this._updateProps(nextProps);
  }

  private _updateProps(newProps : IOrganizationDisplayProps )
  {
    if (newProps != null && newProps.manager != null)
    {
      this._itemContext.list = newProps.manager.data.selectedOrganizationList;
      this._itemContext.itemObject = newProps.organization;
    }
  }

  private _executeQuery()
  {
      this.props.manager.data.readPersonItemsByOrganizationId(this.props.organization.Id).then(
              (people: IPerson[]) => { 
                
                if (people != null)
                {
                  this.setState( { 
                    isEditing: this.state.isEditing,
                    persons: people 
                  } ); 
                }
            }
      );      
  }
 
  private _handlePersonClick(e : React.MouseEvent<HTMLDivElement>) {
    var val = ElementUtilities.getParentElementAttribute(e.nativeEvent.srcElement, "data-personId");

    if (val != null)
    {
      if (this.props.onPersonSelected != null)
      {
        this.props.onPersonSelected(this.state.persons[val]);
      }
    }
  }

  public render(): JSX.Element {
    var interior = null;
    var toolbar = null;
    var me = this;

    if (this.state.personsQueryId != this.props.organization.Id && this.props.organization.Id != null)
    {
      this.state.personsQueryId = this.props.organization.Id;

      this._executeQuery();
    }

    UserInterfaceUtility.applyWorkarounds();

    if (this.props.isEditing || this.state.isEditing)
    {
      toolbar = <div></div>;

      interior = <OrganizationEdit   organization={ this.props.organization }
                      ensureNew={ false } 
                      ref={ (incomingOrganizationEdit : OrganizationEdit) => { this._organizationEdit = incomingOrganizationEdit; } }
                      manager={ this.props.manager } 
                      />;
    }
    else
    {
      if (this.props.allowEdit)
      {
        toolbar = <div></div>;
      }

      let aboutContent = <div></div>;
      
      if (this.props.organization.About != null)
      {
        let aboutUrl = this.props.organization.About.Url;

        if (aboutUrl != null && aboutUrl.toLowerCase().indexOf("wikipedia") >= 0)
        {
          aboutUrl = aboutUrl.replace(".wikipedia.", ".m.wikipedia.");

          aboutContent = <PivotItem key="wikipedia" linkText="Wikipedia"><div><iframe width="100%" frameBorder="0" className={ styles.wikipediaIframe } src={aboutUrl}></iframe></div></PivotItem>;
        }
      }

      let personsContent = <div></div>;

      if (this.state.persons != null)
      {
        personsContent = <div className={ styles.peopleArea }>
            &nbsp;
            <div className={ styles.peopleHeader }>People</div>
            <div className={ styles.peopleList }>
            {
              this.state.persons == null || this.state.persons.length == 0 ?
                <div>(No related people added yet.)</div> : 
              this.state.persons.map( (person, i) =>
              {
                return <div data-personId={i} key={i} onClick= { this._handlePersonClick }>
                      <PersonMiniDisplay key={ "PMD" + i } manager={ me.props.manager } person={ person } />
                    </div>;
              }) 
            }
            </div>
            
            <div className={ styles.addContact }>
              <Button onClick={ this._handleNewPersonClick } className={ styles.button }>Add contact</Button>
            </div> 
          </div>;
      } 
    
      interior = <div>
          <h3>{ this.props.organization.Title }</h3>
          <Pivot ref="pivot">
            <PivotItem key="summary" linkText="Summary">
              <div className={styles.pivotInterior}>
                <div className={ styles.displayArea }>
                  <ItemRichTextFieldDisplay field={this._itemContext.getField("Description") } itemContext={ this._itemContext } />
                </div>
                <div className={ styles.displayArea }>
                  <ItemRichTextFieldDisplay field={this._itemContext.getField("Notes") } itemContext={ this._itemContext } />
                </div>
                <div>&#160;</div>
                <div className={styles.fieldListArea}>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Status:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("Status") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Tags:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemMultiLookupFieldDisplay field={this._itemContext.getField("Tags") } itemContext={ this._itemContext } />
                    </div>
                    <div className={styles.fieldLabel}>
                      Priority:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("Organizational_x0020_Priority") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Owner:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemPeopleFieldDisplay field={this._itemContext.getField("Owner") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                </div>
                { personsContent }
              </div>
            </PivotItem>
            { aboutContent }
            <PivotItem key="org" linkText='Address'>
              <div className={styles.pivotInterior}>            
                <div className={styles.fieldListArea}>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Address:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("PrimaryAddress") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      City:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldDisplay field={this._itemContext.getField("PrimaryCity") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Zip/Postal Code:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldDisplay field={this._itemContext.getField("PrimaryZipPostalCode") } itemContext={ this._itemContext } />
                    </div>
                  </div>                
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      State/Province:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("PrimaryStateProvince") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}/>
                    <div className={styles.fieldLabel}>
                      Country:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("PrimaryCountry") } itemContext={ this._itemContext } />
                    </div>
                  </div>
              </div>
            </PivotItem>            
            <PivotItem key="resources" linkText='Resources'>
              <div className={styles.pivotInterior}>            
                <div className={styles.fieldListArea}>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Home Page:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("HomePage") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      About:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemUrlFieldDisplay field={this._itemContext.getField("About") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                </div>
              </div>
            </PivotItem>            
            <PivotItem key="miscellaneous" linkText="Miscellaneous">
              <div className={styles.pivotInterior}>
                <div className={styles.iteratorArea}>
                  <ItemFieldIterator isDisplayOnly={ true } excludedFields={ ["Title", "Notes", "Description", "Created", "Modified", "Editor", "Author", "PrimaryAddress", "PrimaryStateProvince", "PrimaryCity", "PrimaryCountry", "PrimaryZipPostalCode", "Logo", "HomePage", "Updates", "Tags", "Status", "About", "Owner"] } itemContext={ this._itemContext } />
                </div>
                { personsContent }
              </div>
            </PivotItem>
            <PivotItem key="history" linkText="History">
              <div className={styles.pivotInterior}>
                <div className={ styles.displayArea }>
                  <div className={ styles.displayHeader }>Created:</div> 
                  <ItemDateFieldDisplay field={this._itemContext.getField("Created") } itemContext={ this._itemContext } />
                </div>
                <div className={ styles.displayArea }>
                  <div className={ styles.displayHeader }>Creator:</div>
                  <ItemPeopleFieldDisplay field={this._itemContext.getField("Author") } itemContext={ this._itemContext } />
                </div>
              <div className={ styles.displayArea }>
                  <div className={ styles.displayHeader }>Modified:</div>
                  <ItemDateFieldDisplay field={this._itemContext.getField("Modified") } itemContext={ this._itemContext } />
                </div>
                <div className={ styles.displayArea }>
                  <div className={ styles.displayHeader }>Last Edited By:</div>
                  <ItemPeopleFieldDisplay field={this._itemContext.getField("Editor") } itemContext={ this._itemContext } />
                </div>
              </div>
            </PivotItem>
          </Pivot>
        </div>;
    }

    return (
      <div className={styles.organizationDisplay}>
        { toolbar }
        { interior }
      </div>
    );
  }
}
