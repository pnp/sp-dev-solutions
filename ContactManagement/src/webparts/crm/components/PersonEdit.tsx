import * as React from 'react';

import styles from '../Crm.module.scss';

import DialogUtility from '../../../utilities/DialogUtility';

import { ICrmComponentProps } from '../ICrmComponentProps';

import { IPerson } from '../../../data/IPerson';

import ItemContext from '../../../sharePointComponents/ItemContext';
import ItemFieldIterator from '../../../sharePointComponents/ItemFieldIterator';
import ItemMultilineTextFieldEditor  from '../../../sharePointComponents/ItemMultilineTextFieldEditor';
import ItemTextFieldEditor from '../../../sharePointComponents/ItemTextFieldEditor';

export interface IPersonEditProps extends ICrmComponentProps {
  person: IPerson;
  newPersonPrototype? : IPerson;
  ensureNew : boolean;
  isDialog? : boolean;
}

export interface IPersonEditState {
  person: IPerson;
  newItemWasCreated : boolean;
}

export default class PersonEdit extends React.Component<IPersonEditProps, IPersonEditState> {
   private _itemContext : ItemContext = null;

  public constructor(props?: IPersonEditProps, context?: any)
  {
    super(props, context);
    
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this._itemContext = new ItemContext();    
    this._itemContext.dataProvider = this.props.manager.data;    
  }

  public componentWillMount()
  {
      this._updateProps(this.props);

    if (this.props != null && this.props.person != null)
    {
      this.setState( {
          person: this.props.person,
          newItemWasCreated: false
        });
    }
    else if (this.props.ensureNew)
    {            
      if (this.props.newPersonPrototype != null)
      {

        this._itemContext.itemId = this.props.newPersonPrototype.Id;
        this._itemContext.itemObject = this.props.newPersonPrototype;

        this.setState( {
          person: this.props.newPersonPrototype,
          newItemWasCreated: true
        });
      }
      else
      {
        this.props.manager.data.createPersonItem("Doe", "John", "").then((data: IPerson[]) => {
        this.setState( { 
              person: data[0],
              newItemWasCreated: true
            });

            this._itemContext.itemId = data[0].Id;
            this._itemContext.itemObject = data[0];
	        }
        );
      }
    }

    if (this.props.isDialog)
    {
        DialogUtility.setActions(this.onCancel, this.onSave);
    }

  }
  
    
  public componentWillReceiveProps(nextProps : IPersonEditProps) 
  {
    this._updateProps(nextProps);
  }

  private _updateProps(newProps : IPersonEditProps)  
  {   
    if (this.props != null && this.props.manager != null)
    {
      this._itemContext.list = this.props.manager.data.selectedPersonList;
      this._itemContext.itemObject = this.props.person;
    }

  }

  public onSave() : void {
    var wasUpdated : boolean = this.state.newItemWasCreated;

    if (wasUpdated || this._itemContext.hasChanged)
    {
      if (this.state.newItemWasCreated)
      {
        this.props.manager.data.addPersonItem(this.state.person).then((data: IPerson[]) => {          
              this._itemContext.itemId = data[0].Id;

              this.setState( { 
                person: data[0],
                newItemWasCreated: false
              });
            });
      }
      else
      {
        this.props.manager.data.updatePersonItem(this.state.person).then((data: IPerson[]) => {
          this.state.person = data[0];
        });
      }

      this.props.manager.data.notifyPersonChanged(this.state.person);

      this._itemContext.hasChanged = false;
    }
  }

  public onCancel() : void {

  }

  public render(): JSX.Element {

    if (this.props == null || this.state == null)
    {
      return <div></div>;
    }

    let person = this.props.person;

    if (this.state.person != null)
    {
      person = this.state.person;
    }

    return (
      <div className={styles.personEdit}>

        <div className= {styles.nameArea}>
          <div className={styles.nameInner}>
            <div className={styles.nameFirst}>
              <ItemTextFieldEditor field={ this._itemContext.getField("FirstName") } placeholder="First Name" itemContext={ this._itemContext } />
            </div>
            <div className={styles.nameLast}>
              <ItemTextFieldEditor field={ this._itemContext.getField("Title") } placeholder="Last Name" itemContext={ this._itemContext } />
            </div>
          </div>
        </div>
        <ItemMultilineTextFieldEditor field={ this._itemContext.getField("Comments") } placeholder="Comments" stripHtml={true} itemContext={ this._itemContext } />

        <div className={styles.iteratorArea}>
          <ItemFieldIterator excludedFields={ ["Title", "First Name", "Comments"] } itemContext={ this._itemContext } />
        </div>
      </div>
    );
  }
}
