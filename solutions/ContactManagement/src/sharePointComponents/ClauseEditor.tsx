// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import Clause, { ClauseType, ClauseTypeJoin } from '../data/Clause';
import { ISPList } from '../data/ISPList';
import { ISPField } from '../data/ISPField';
import { FieldTypeKind } from '../data/FieldTypeKind';
import { ISharePointDataProvider } from '../data/ISharePointDataProvider';
import { ISharePointItem } from '../data/ISharePointItem';

import { DropdownEx, IDropdownExOption } from './DropdownEx';
import UserInterfaceUtility from './UserInterfaceUtility';
import SharePointUtility from '../data/SharePointUtility';
import ItemContext from './ItemContext';

export interface IClauseEditorProps {
  clause : Clause;
  list: ISPList;
  isFirst : boolean;
  hasMultiple : boolean;
  dataProvider: ISharePointDataProvider;
}

export interface IClauseEditorState {
}

export default class ClauseEditor extends React.Component<IClauseEditorProps, IClauseEditorState> {

  public constructor()
  {
    super();

    this._handleFieldDropdownValueChanged = this._handleFieldDropdownValueChanged.bind(this);
    this._handleTypeDropdownValueChanged = this._handleTypeDropdownValueChanged.bind(this);
    this._valueChanged = this._valueChanged.bind(this);
  }
  
  protected _handleFieldDropdownJoinChanged(option : IDropdownExOption) : void
  {
    if (option == null)
    {
      this.props.clause.setJoiner(ClauseTypeJoin.And);
    }
    else
    {      
      this.props.clause.setJoiner(option.key as ClauseTypeJoin);
    }

    this.forceUpdate();
  }
  protected _handleFieldDropdownValueChanged(option : IDropdownExOption) : void
  {
    if (option == null)
    {
      this.props.clause.setFieldName(null);
    }
    else
    {      
      // clear field value if the type of dropdown changes
      var originalField = SharePointUtility.getField(this.props.list, this.props.clause.fieldName);
      var newField = SharePointUtility.getField(this.props.list, option.key as string);

      if (  originalField == null || 
            (originalField != null && newField != null && originalField.FieldTypeKind != newField.FieldTypeKind))
      {
        this.props.clause.setValue(null);        
      }    

      this.props.clause.setFieldName(option.key as string);
    }

    this.forceUpdate();
  }
  
  protected _handleTypeDropdownValueChanged(option : IDropdownExOption) : void
  {
    if (option == null)
    {
      this.props.clause.setClauseType(null);
    }
    {
      this.props.clause.setClauseType(option.key as number);
    }
  }

  protected _valueChanged(field : ISPField, item : ISharePointItem, newValue : any) : void
  {
    this.props.clause.setValue(newValue);
  }

  public render(): JSX.Element 
  {
    if (this.props == null)
    {
      return <div></div>;
    }

    var dropdownFieldOptions = new Array();

    for (var i=0; i<this.props.list.Fields.length; i++)
    {
      var field = this.props.list.Fields[i];

      dropdownFieldOptions.push({
        key: field.InternalName,
        text: field.Title
      });
    } 
    
    if (this.props.clause.fieldName == null)
    {
      this.props.clause.fieldName = this.props.list.Fields[0].InternalName;
    }

    var sourceField = SharePointUtility.getField(this.props.list, this.props.clause.fieldName);

    var ic = new ItemContext();
    
    if (sourceField != null)
    {
      ic.itemId = 0;
      ic.itemObject = { };
      ic.dataProvider = this.props.dataProvider;
      ic.itemObject[sourceField.InternalName] = this.props.clause.value;
      ic.list = {
        Title: ""
      };

      var options : IDropdownExOption[] = [
        { key: ClauseType.Equals, text: "equals" },       
        { key: ClauseType.NotEquals, text: "not equals" }
      ];

      if (sourceField.FieldTypeKind == FieldTypeKind.Number)
      {
        options.push( { key: ClauseType.GreaterThan, text: "greater than" } );
        options.push( { key: ClauseType.GreaterThanOrEquals, text: "greater than or equals" } ); 
        options.push( { key: ClauseType.LessThan, text: "less than" } );
        options.push( { key: ClauseType.LessThanOrEquals, text: "less than or equals" } ); 
      }
      else if ( sourceField.FieldTypeKind == FieldTypeKind.Text || 
                sourceField.FieldTypeKind == FieldTypeKind.Note)
      {                  
        options.push( { key: ClauseType.Contains, text: "contains" } );
      }
    }


    return (
      <div className={styles.clauseEditor}>
        <div className={styles.rowTable}>
          <div className={styles.row}>
            {
              this.props.hasMultiple ?
                <div className={styles.joinerCell}>
                  {
                    !this.props.isFirst ?
                      <DropdownEx
                        label=""
                        selectedKey={ this.props.clause.fieldName }
                        options={ [
                          { key: ClauseTypeJoin.And, text: "and" },
                          { key: ClauseTypeJoin.Or, text: "or" }
                        ] }
                        onChanged = { this._handleFieldDropdownJoinChanged }
                     /> : <span>&#160;</span>
                  }
                </div> : ''

            }
            <div className={styles.cell}>
              <DropdownEx
                label=""
                selectedKey={ this.props.clause.fieldName }
                options={ dropdownFieldOptions }
                onChanged = { this._handleFieldDropdownValueChanged }
              />
            </div>
            <div className={styles.operatorCell}>               
              <DropdownEx
                label=""
                selectedKey={ this.props.clause.clauseType }
                options= { options }
                onChanged = { this._handleTypeDropdownValueChanged }
              />
            </div>
            <div className={styles.valueCell}>  
              {
                sourceField ? UserInterfaceUtility.getFieldElement(ic, sourceField, false, this._valueChanged) : ''
              }   
            </div>            
          </div>
        </div>
      </div>
    );
  }
}
