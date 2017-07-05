// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import Clause, { ClauseType } from '../data/Clause';
import { ISPList } from '../data/ISPList';

import { Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react';

export interface IClauseEditorProps {
  clause : Clause;
  list: ISPList;
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
  
  protected _handleFieldDropdownValueChanged(option : IDropdownOption) : void
  {
    if (option == null)
    {
      this.props.clause.setFieldName(null);
    }
    {
      this.props.clause.setFieldName(option.key as string);
    }
  }
  
  protected _handleTypeDropdownValueChanged(option : IDropdownOption) : void
  {
    if (option == null)
    {
      this.props.clause.setClauseType(null);
    }
    {
      this.props.clause.setClauseType(option.key as number);
    }
  }

  protected _valueChanged(newValue : any) : void
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


    return (
      <div className={styles.clauseEditor}>
        <div className={styles.rowTable}>
          <div className={styles.row}>
            <div className={styles.cell}>
              <Dropdown
                label=""
                selectedKey={ this.props.clause.fieldName }
                options={ dropdownFieldOptions }
                onChanged = { this._handleFieldDropdownValueChanged }
              />
            </div>
            <div className={styles.operatorCell}>               
              <Dropdown
                label=""
                selectedKey={ this.props.clause.clauseType }
                options={ [
                  { key: ClauseType.Equals, text: "equals" },       
                  { key: ClauseType.NotEquals, text: "not equals" } 
                ]}
                onChanged = { this._handleTypeDropdownValueChanged }
              />
            </div>
            <div className={styles.valueCell}>     
              <TextField value={ this.props.clause.value } onChanged={ this._valueChanged }/>          
            </div>            
          </div>
        </div>
      </div>
    );
  }
}
