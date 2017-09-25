// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

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
import ItemTextFieldDisplay from '../../../sharePointComponents/ItemTextFieldDisplay';
import ItemMultiLookupFieldDisplay from '../../../sharePointComponents/ItemMultiLookupFieldDisplay';
import ItemLookupFieldDisplay from '../../../sharePointComponents/ItemLookupFieldDisplay';

import {
  PivotItem,
  Pivot
} from 'office-ui-fabric-react/lib/Pivot';

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
      }

      let organizationContent = <div></div>;
      
      interior = <div>
          <div className={styles.topArea}>
            <div className={ styles.name }>{ this.props.person.FirstName }&nbsp;{ this.props.person.Title }</div>
            <h3>{ this.props.person.Company }</h3>

            <ItemRichTextFieldDisplay field={ this._itemContext.getField("Comments") } itemContext={ this._itemContext } />
          </div>

          <Pivot ref="pivot">
            <PivotItem key="summary" linkText="Summary">
              <div className={styles.pivotInterior}>
                <div className={styles.fieldListArea}>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Job Title:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("JobTitle") } itemContext={ this._itemContext } />
                    </div>
                    <div className={styles.fieldLabel}>
                      E-Mail:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("Email") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Company:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("Company") } itemContext={ this._itemContext } />
                    </div>
                    <div className={styles.fieldLabel}>
                    Organization:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemLookupFieldDisplay field={this._itemContext.getField("Organization") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Tags:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemMultiLookupFieldDisplay field={this._itemContext.getField("Tags") } itemContext={ this._itemContext } />
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
                      <ItemTextFieldDisplay field={this._itemContext.getField("WorkAddress") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      City:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldDisplay field={this._itemContext.getField("WorkCity") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Zip/Postal Code:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldDisplay field={this._itemContext.getField("WorkZip") } itemContext={ this._itemContext } />
                    </div>
                  </div>                
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      State/Province:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("WorkState") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Country:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("WorkCountry") } itemContext={ this._itemContext } />
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
                      <ItemTextFieldDisplay field={this._itemContext.getField("Twitter") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Facebook:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldDisplay field={this._itemContext.getField("Facebook") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      LinkedIn:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldDisplay field={this._itemContext.getField("LinkedIn") } itemContext={ this._itemContext } />
                    </div>
                  </div>                
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Web Page:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("WebPage") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Personal Website:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("PersonalWebsite") } itemContext={ this._itemContext } />
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
                      <ItemTextFieldDisplay field={this._itemContext.getField("WorkPhone") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Home Phone:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldDisplay field={this._itemContext.getField("HomePhone") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Mobile Phone:
                    </div>
                    <div className={styles.fieldInput}>                
                      <ItemTextFieldDisplay field={this._itemContext.getField("CellPhone") } itemContext={ this._itemContext } />
                    </div>
                  </div>                
                  <div className={styles.fieldArea}>
                    <div className={styles.fieldLabel}>
                      Fax Number:
                    </div>
                    <div className={styles.fieldInput}>
                      <ItemTextFieldDisplay field={this._itemContext.getField("WorkFax") } itemContext={ this._itemContext } />
                    </div>
                  </div>
                </div>              
              </div>
            </PivotItem>
            <PivotItem key="misc" linkText="Miscellaneous">
              <div className={styles.pivotInterior}>
                <div className={styles.iteratorArea}>
                  <ItemFieldIterator isDisplayOnly={true} excludedFields={ ["Facebook", "LinkedIn", "Twitter", "WebPage", "PersonalWebsite", "Title", "First Name", "Tags", "Organization", "JobTitle", "FullName", "Email", "Company", "Comments", "WorkFax", "CellPhone", "HomePhone", "WorkPhone", "WorkState", "WorkCountry", "WorkAddress", "WorkZip", "WorkCity"] } itemContext={ this._itemContext } />
                </div>
              </div>
            </PivotItem>
          </Pivot>

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
