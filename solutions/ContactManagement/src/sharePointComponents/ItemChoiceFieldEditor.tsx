// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

import { DropdownEx, IDropdownExOption } from './DropdownEx';

export interface IItemChoiceFieldEditorProps extends IFieldComponentProps {
}

export interface IItemChoiceFieldEditorState extends IFieldComponentState {
}

export default class ItemChoiceFieldEditor extends FieldComponent<IItemChoiceFieldEditorProps, IItemChoiceFieldEditorState> {

  public constructor()
  {
    super();

    this._handleDropdownValueChanged = this._handleDropdownValueChanged.bind(this);
  }
  
  protected _handleDropdownValueChanged(option : IDropdownExOption) : void
  {
    if (option == null)
    {
      this.value = null;
    }
    {
      this.value = option.key;
    }
  }

  public render(): JSX.Element {
    var dropdownOptions = new Array();

    if (this.props == null || this.props.field == null || this.props.field.Choices == null || this.props.itemContext == null || this.props.itemContext.itemObject == null)
    {
      return <div></div>;
    }

    for (var i=0; i<this.props.field.Choices.length; i++)
    {
      var choice = this.props.field.Choices[i];

      dropdownOptions.push({
        key: choice,
        text: choice
      });
    }

    return (
      <div className={styles.sharePointComponent}>
        <DropdownEx
          label=""
          selectedKey={ this.valueString }
          options={ dropdownOptions }
          onChanged = { this._handleDropdownValueChanged }
        />
      </div>
    );
  }
}
