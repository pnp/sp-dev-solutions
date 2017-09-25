// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import styles from '../Crm.module.scss';

import DialogUtility from '../../../utilities/DialogUtility';

import { ICrmComponentProps } from '../ICrmComponentProps';

import { IPerson } from '../../../data/IPerson';

import ItemContext from '../../../sharePointComponents/ItemContext';
import ItemFieldIterator from '../../../sharePointComponents/ItemFieldIterator';
import ItemMultilineTextFieldEditor  from '../../../sharePointComponents/ItemMultilineTextFieldEditor';
import ItemTextFieldEditor from '../../../sharePointComponents/ItemTextFieldEditor';
import ItemMultiLookupFieldEditor from '../../../sharePointComponents/ItemMultiLookupFieldEditor';
import ItemLookupFieldEditor from '../../../sharePointComponents/ItemLookupFieldEditor';

import {
  PivotItem,
  Pivot
} from 'office-ui-fabric-react/lib/Pivot';

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
        <Pivot ref="pivot">
            <PivotItem key="summary" linkText="Summary">
              <div className={styles.pivotInterior}>
                <ItemMultilineTextFieldEditor field={ this._itemContext.getField("Comments") } placeholder="Comments" stripHtml={true} itemContext={ this._itemContext } />
                <div className={styles.fieldListArea}>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Job Title:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("JobTitle") } itemContext={ this._itemContext } />
                    </div>
                    <div className={styles.fieldLabel}>
                      E-Mail:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("Email") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Company:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("Company") } itemContext={ this._itemContext } />
                    </div>
                    <div className={styles.fieldLabel}>
                    Organization:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemLookupFieldEditor field={this._itemContext.getField("Organization") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Tags:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemMultiLookupFieldEditor field={this._itemContext.getField("Tags") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                </div>
              </div>
            </PivotItem>
            <PivotItem key="address" linkText="Address">
              <div className={styles.pivotInterior}>
                <div className={styles.fieldListArea}>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Address:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("WorkAddress") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      City:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldEditor field={this._itemContext.getField("WorkCity") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Zip/Postal Code:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldEditor field={this._itemContext.getField("WorkZip") } itemContext={ this._itemContext } />
                    </div>
                  </div>                
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      State/Province:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("WorkState") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Country:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("WorkCountry") } itemContext={ this._itemContext } />
                    </div>
                  </div>    
                </div>              
              </div>
            </PivotItem>
            
            <PivotItem key="social" linkText="Social">
              <div className={styles.pivotInterior}>
                <div className={styles.fieldListArea}>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Twitter:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("Twitter") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Facebook:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldEditor field={this._itemContext.getField("Facebook") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      LinkedIn:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldEditor field={this._itemContext.getField("LinkedIn") } itemContext={ this._itemContext } />
                    </div>
                  </div>                
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Web Page:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("WebPage") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Personal Website:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("PersonalWebsite") } itemContext={ this._itemContext } />
                    </div>
                  </div>    
                </div>              
              </div>
            </PivotItem>
            <PivotItem key="phone" linkText="Phone">
              <div className={styles.pivotInterior}>
                <div className={styles.fieldListArea}>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Work Phone:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("WorkPhone") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Home Phone:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldEditor field={this._itemContext.getField("HomePhone") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Mobile Phone:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldEditor field={this._itemContext.getField("CellPhone") } itemContext={ this._itemContext } />
                    </div>
                  </div>                
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Fax Number:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldEditor field={this._itemContext.getField("WorkFax") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                </div>              
              </div>
            </PivotItem>
            <PivotItem key="misc" linkText="Miscellaneous">
              <div className={styles.pivotInterior}>
                <div className={styles.iteratorArea}>
                  <ItemFieldIterator excludedFields={ ["Facebook", "LinkedIn", "Twitter", "WebPage", "PersonalWebsite", "Title", "First Name", "Tags", "Organization", "JobTitle", "FullName", "Email", "Company", "Comments", "WorkFax", "CellPhone", "HomePhone", "WorkPhone", "WorkState", "WorkCountry", "WorkAddress", "WorkZip", "WorkCity"] } itemContext={ this._itemContext } />
                </div>
              </div>
            </PivotItem>
        </Pivot>
      </div>
    );
  }
}
