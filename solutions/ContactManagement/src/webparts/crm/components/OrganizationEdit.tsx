// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import styles from '../Crm.module.scss';

import DialogUtility from '../../../utilities/DialogUtility';

import { ICrmComponentProps } from '../ICrmComponentProps';

import { IOrganization } from '../../../data/IOrganization';
import { IOrganizationSet  } from '../../../dataProviders/IOrganizationSet';
import ItemFieldIterator from '../../../sharePointComponents/ItemFieldIterator';
import ItemMultilineTextFieldEditor  from '../../../sharePointComponents/ItemMultilineTextFieldEditor';
import ItemMultiLookupFieldEditor  from '../../../sharePointComponents/ItemMultiLookupFieldEditor';
import ItemTextFieldEditor  from '../../../sharePointComponents/ItemTextFieldEditor';
import ItemUrlFieldEditor  from '../../../sharePointComponents/ItemUrlFieldEditor';
import ItemContext from '../../../sharePointComponents/ItemContext';
import ItemPeopleFieldEditor  from '../../../sharePointComponents/ItemPeopleFieldEditor';

import {
  PivotItem,
  Pivot
} from 'office-ui-fabric-react/lib/Pivot';

export interface IOrganizationEditProps extends ICrmComponentProps {
  organization: IOrganization;
  ensureNew : boolean;
  isDialog? : boolean;
}

export interface IOrganizationEditState {
  organization: IOrganization;
  newItemWasCreated : boolean;
}

export default class OrganizationEdit extends React.Component<IOrganizationEditProps, IOrganizationEditState> {
  private _itemContext : ItemContext = null;
  
  public constructor(props?: IOrganizationEditProps, context?: any)
  {
    super(props, context);
    
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this._itemContext = new ItemContext();    
    this._itemContext.dataProvider = this.props.manager.data;
  }

  public componentWillMount()
  {
    var newProps = this.props;

    if (newProps != null && newProps.organization != null)
    {
      this.state = {
          organization: newProps.organization,
          newItemWasCreated: false
        };
    }
    else if (newProps.ensureNew)
    {            
      newProps.manager.data.createOrganizationItem("", "").then((data: IOrganizationSet) => {
          this._itemContext.itemId = data.organizations[0].Id;
          this._itemContext.itemObject = data.organizations[0];
          
          this.setState( { 
            organization: data.organizations[0],
            newItemWasCreated: true
          });
	      }
      );
    }

    if (newProps.isDialog)
    {
        DialogUtility.setActions(this.onCancel, this.onSave);
    }

    this._updateProps(this.props);
  }

  public componentWillReceiveProps(nextProps : IOrganizationEditProps) 
  {
    this._updateProps(nextProps);
  }

  private _updateProps(newProps : IOrganizationEditProps)  
  {
    if (newProps != null && newProps.manager != null)
    {
      this._itemContext.list = newProps.manager.data.selectedOrganizationList;
      this._itemContext.itemObject = newProps.organization;
    }
  }

  public onSave() : void {
    var me = this;    

    var wasUpdated : boolean = me.state.newItemWasCreated;

    if (wasUpdated || this._itemContext.hasChanged)
    {
      if (me.state.newItemWasCreated)
      {
        //Debug.message("Saving new organization" + JSON.stringify(this.state.organization));
        this.props.manager.data.addOrganizationItem(this.state.organization).then((data: IOrganizationSet) => {
          
        //Debug.message("Result from saving organization (note new ID)" + JSON.stringify(data.organizations[0]));
        this._itemContext.itemId = data.organizations[0].Id;
        this._itemContext.itemObject = data.organizations[0];

        this.setState( { 
            organization: data.organizations[0],
            newItemWasCreated: false
          });
        });
      }
      else
      {
        me.props.manager.data.updateOrganizationItem(this.state.organization).then((data: IOrganizationSet) => {
        });
      }

      this._itemContext.hasChanged = false;
      
      me.props.manager.data.notifyOrganizationChanged(this.state.organization);
    }
  }

  public onCancel() : void {

  }

  public render(): JSX.Element {
    return (
      <div className={styles.organizationEdit}>

        <div className={styles.mainFieldArea}>
          <ItemTextFieldEditor field={ this._itemContext.getField("Title") } itemContext={ this._itemContext } />

        </div>

        <Pivot ref="pivot">
          <PivotItem key="summary" linkText="Summary">
            <div className={styles.fieldTab}>
            <div>Description:</div>
            <ItemMultilineTextFieldEditor stripHtml={true} field={this._itemContext.getField("Description") } itemContext={ this._itemContext } />

            <div>Notes:</div>
            <ItemMultilineTextFieldEditor stripHtml={true} field={this._itemContext.getField("Notes") } itemContext={ this._itemContext } />
              <div className={styles.fieldListArea}>
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    Tags:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemMultiLookupFieldEditor field={this._itemContext.getField("Tags") } itemContext={ this._itemContext } />
                  </div>
                  <div className={styles.fieldLabel}>
                    Priority:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemTextFieldEditor field={this._itemContext.getField("Organizational_x0020_Priority") } itemContext={ this._itemContext } />
                  </div>
                </div>

                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    Owner:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemPeopleFieldEditor field={this._itemContext.getField("Owner") } itemContext={ this._itemContext } />
                  </div>
                </div>
              </div>
            </div>
          </PivotItem>
          <PivotItem key="org" linkText='Address' >            
            <div className="{styles.fieldTab}">
              <div className={styles.fieldListArea}>
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                      Address:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemTextFieldEditor field={this._itemContext.getField("PrimaryAddress") } itemContext={ this._itemContext } />
                  </div>
                </div>
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    City:
                  </div>
                  <div className={styles.fieldInput}>                
                    <ItemTextFieldEditor field={this._itemContext.getField("PrimaryCity") } itemContext={ this._itemContext } />
                  </div>
                </div>
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    Zip/Postal Code:
                  </div>
                  <div className={styles.fieldInput}>                
                    <ItemTextFieldEditor field={this._itemContext.getField("PrimaryZipPostalCode") } itemContext={ this._itemContext } />
                  </div>
                </div>                
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    State/Province:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemTextFieldEditor field={this._itemContext.getField("PrimaryStateProvince") } itemContext={ this._itemContext } />
                  </div>
                </div>
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    Country:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemTextFieldEditor field={this._itemContext.getField("PrimaryCountry") } itemContext={ this._itemContext } />
                  </div>
                </div>
              </div>
            </div>
          </PivotItem>
          <PivotItem key="res" linkText='Resources' >            
            <div className="{styles.fieldTab}">
              <div className={styles.fieldListArea}>
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    Home Page:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemTextFieldEditor field={this._itemContext.getField("HomePage") } itemContext={ this._itemContext } />
                  </div>
                </div>
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    About:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemUrlFieldEditor field={this._itemContext.getField("About") } itemContext={ this._itemContext } />
                  </div>
                </div>
                <div className={styles.fieldArea}>
                  <div className={styles.fieldLabel}>
                    Logo:
                  </div>
                  <div className={styles.fieldInput}>
                    <ItemUrlFieldEditor field={this._itemContext.getField("Logo") } itemContext={ this._itemContext } />
                  </div>
                </div>
                
              </div>
            </div>
          </PivotItem>
          <PivotItem key="orgrecent" linkText='Miscellaneous' >
              <div className={styles.fieldTab}>
            
            <div className={styles.iteratorArea}>
              <ItemFieldIterator excludedFields={ 
                ["Title", 
                "Updates", 
                "Notes", 
                "Description", 
                "Tags",
                "Organizational_x0020_Priority",
                "Owner",
                "Homepage",
                "Logo",
                "About",
                "PrimaryAddress", 
                "PrimaryCity", 
                "PrimaryStateProvince", 
                "PrimaryZipPostalCode",
                "PrimaryCountry"] } itemContext={ this._itemContext } />
            </div>
          </div>
          </PivotItem>
        </Pivot>

      </div>
    );
  }
}
