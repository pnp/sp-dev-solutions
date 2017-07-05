import * as React from 'react';

import styles from '../Crm.module.scss';
import { PersonCallback } from '../../../data/IPerson';

import { ICrmComponentProps } from '../ICrmComponentProps';
import OrganizationEdit from './OrganizationEdit';
import { IOrganization } from '../../../data/IOrganization';
import { IPerson } from '../../../data/IPerson';
import ItemFieldIterator from '../../../sharePointComponents/ItemFieldIterator';
import ItemRichTextFieldDisplay from '../../../sharePointComponents/ItemRichTextFieldDisplay';
import UserInterfaceUtility from '../../../sharePointComponents/UserInterfaceUtility';
import ItemContext from '../../../sharePointComponents/ItemContext';
import PersonMiniDisplay from './PersonMiniDisplay';
import ElementUtilities from '../../../utilities/ElementUtilities';

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
   //       <Button onClick={  () => { this.setState( { isEditing: !this.state.isEditing }); this.updatePersionEdit(); } }>Done</Button>
       // </div>;

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
//          <Button onClick={  () => { this.setState( { isEditing: !this.state.isEditing }); } }>Edit</Button>
  //      </div>;
      }
      
      let personsContent = <div></div>;

      if (this.state.persons != null)
      {
        personsContent = <div className={ styles.peopleArea }>
            &nbsp;
            <div>People</div>
            <div className={styles.peopleList}>
            {
              this.state.persons.map( (person, i) =>
              {
                return <div data-personId={i} onClick= { this._handlePersonClick }>
                      <PersonMiniDisplay key={ "PMD" + i } manager={ me.props.manager } person={ person } />
                    </div>;
              }) 
            }
            </div>
            
            <div className={ styles.addContact }>
              <Button onClick={ this._handleNewPersonClick }>Add contact</Button>
            </div> 
          </div>;
      } 
    
      interior = <div>
          <h3>{ this.props.organization.Title }</h3>
          <div className={ styles.displayArea }>
            <ItemRichTextFieldDisplay field={this._itemContext.getField("Description") } itemContext={ this._itemContext } />
          </div>
          <div className={ styles.displayArea }>
            <ItemRichTextFieldDisplay field={this._itemContext.getField("Notes") } itemContext={ this._itemContext } />
          </div>

          <div className={styles.iteratorArea}>
            <ItemFieldIterator isDisplayOnly={ true } excludedFields={ ["Title", "Notes", "Description"] } itemContext={ this._itemContext } />
          </div>

          { personsContent }
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
