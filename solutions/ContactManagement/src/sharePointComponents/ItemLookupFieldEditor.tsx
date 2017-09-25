// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';
import { ISharePointItem } from '../data/ISharePointItem';
import { DropdownEx, IDropdownExOption } from './DropdownEx';

export interface IItemLookupFieldEditorProps extends IFieldComponentProps {

}

export interface IItemLookupFieldEditorState extends IFieldComponentState {
  lookupItems : ISharePointItem[];
}

export default class ItemLookupFieldEditor extends FieldComponent<IItemLookupFieldEditorProps, IItemLookupFieldEditorState> {

  public constructor()
  {
    super();

    this._handleDropdownValueChanged = this._handleDropdownValueChanged.bind(this);
  }

  public componentWillMount() : void {
    if (this.props == null || this.props.itemContext == null)
    {
      return;
    }

    this.props.itemContext.readListItems(this.props.field.LookupList).then(
        (displayItems: ISharePointItem[]) => { 
        this.setState( { lookupItems: displayItems } ); 
      }
    );
  }

  protected _handleDropdownValueChanged(option : IDropdownExOption) : void
  {
    if (option == null)
    {
      this.value = null;
    }
    else
    {
      if (option.key == "NULL")
      {
        this.value = null;
      }
      else
      {
        this.value = option.key;
      }
    }
  }

  public render(): JSX.Element 
  {
    if (this.state == null || this.state.lookupItems == null || this.state.lookupItems.length == 0)
    {
      return <div></div>;
    }

    var dropdownOptions = new Array();
      dropdownOptions.push({
        key: "NULL",
        text: "(no selection)"
      });

    for (var i=0; i<this.state.lookupItems.length; i++)
    {
      var item = this.state.lookupItems[i];

      dropdownOptions.push({
        key: item.Id,
        text: item.Title
      });
    }
    
    return (
      <div className={styles.sharePointComponent}>
        <DropdownEx
          label=""
          selectedKey={ this.value }
          options={ dropdownOptions }
          onChanged = { this._handleDropdownValueChanged }
        />
      </div>
    );
  }
}
