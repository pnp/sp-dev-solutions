import * as React from 'react';

import styles from '../Crm.module.scss';

import { ICrmComponentProps } from '../ICrmComponentProps';
import PersonEdit from './PersonEdit';
import { IPerson } from '../../../data/IPerson';
import { IOrganization } from '../../../data/IOrganization';
import { IOrganizationSet  } from '../../../dataProviders/IOrganizationSet';
import ItemFieldIterator from '../../../sharePointComponents/ItemFieldIterator';
import ItemContext from '../../../sharePointComponents/ItemContext';
import ItemRichTextFieldDisplay  from '../../../sharePointComponents/ItemRichTextFieldDisplay';

export interface IPersonDisplayProps extends ICrmComponentProps{
  person: IPerson;
  allowEdit: boolean;
  isEditing? : boolean;  
  itemId : number;  
}

export interface IPersonDisplayState {
  isEditing : boolean;  
  organization? : IOrganization;
  organizationQueryId? : number;
}

export default class PersonDisplay extends React.Component<IPersonDisplayProps, IPersonDisplayState> {
  private _personEdit : PersonEdit = null; 
  private _itemContext : ItemContext = null;

  public constructor(props?: IPersonDisplayProps, context?: any)
  {
    super(props, context);

    this.state = {
      isEditing : false
    };

    this.updatePersonEdit = this.updatePersonEdit.bind(this);

    this._itemContext = new ItemContext();
    this._itemContext.dataProvider = this.props.manager.data;
  }
  
  public componentWillMount()
  {
    this._updateProps(this.props);
  }
  
  public componentWillReceiveProps(nextProps : IPersonDisplayProps) 
  {
    this._updateProps(nextProps);
  }

  private _updateProps(newProps : IPersonDisplayProps)  
  {
    if (newProps != null && newProps.manager != null)
    {
      this._itemContext.list = this.props.manager.data.selectedPersonList;
      this._itemContext.itemObject = this.props.person;
    }
  }


  public updatePersonEdit() : void
  {
    this._personEdit.onSave();
  }

  public render(): JSX.Element {
    var interior = null;
    var toolbar = null;

    if (this.state.organizationQueryId != this.props.person.OrganizationId && this.props.person.OrganizationId != null)
    {

      this.props.manager.data.readOrganizationItemsByIds([ this.props.person.OrganizationId ]).then(
              (personOrg: IOrganizationSet) => { 
                
                if (personOrg != null && personOrg.organizations.length == 1)
                {
                  this.setState( { 
                    isEditing: this.state.isEditing,
                    organization: personOrg.organizations[0], 
                    organizationQueryId: this.props.person.OrganizationId
                  } ); 
                }
            }
      );    
    }

    if (this.state.isEditing || this.props.isEditing)
    {
      toolbar = <div></div>;
//          <Button onClick={  () => { this.setState( { isEditing: !this.state.isEditing }); this._updatePersionEdit(); } }>Done</Button>
  //      </div>;

      interior = <PersonEdit   person={ this.props.person }
                      ensureNew={ false } 
                      ref={ (incomingPersonEdit : PersonEdit) => { this._personEdit = incomingPersonEdit; } }
                      manager={ this.props.manager } 
                      />;
    }
    else
    {
      if (this.props.allowEdit)
      {
        toolbar = <div></div>;
        /*
          <Button onClick={  () => { this.setState( { isEditing: !this.state.isEditing }); } }>Edit</Button>
        </div>;*/
      }

      let organizationContent = <div></div>;

      /*
      if (this.state.organization != null)
      {
        organizationContent = <div className={ styles.organizationArea }>
            <div>Organization</div>
            <div>{this.state.organization.Title}</div>
          </div>;
      } 
      */
      
      interior = <div>
          <div className={ styles.name }>{ this.props.person.FirstName }&nbsp;{ this.props.person.Title }</div>
          <h3>{ this.props.person.Company }</h3>

          <ItemRichTextFieldDisplay field={ this._itemContext.getField("Comments") } itemContext={ this._itemContext } />

          <div className={styles.iteratorArea}>
            <ItemFieldIterator isDisplayOnly={ true } excludedFields={ ["Title", "First Name", "Company", "Comments"] } itemContext={ this._itemContext } />
          </div>

          { organizationContent }
        </div>;
    }

    return (
      <div className={ styles.personDisplay }>
        { toolbar }
        { interior }
      </div>
    );
  }
}
