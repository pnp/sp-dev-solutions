// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

import { TextField } from 'office-ui-fabric-react';

export interface IItemTextFieldEditorProps extends IFieldComponentProps {
  placeholder? : string;
}

export interface IItemTextFieldEditorState extends IFieldComponentState {
}

export default class ItemTextFieldEditor extends FieldComponent<IItemTextFieldEditorProps, IItemTextFieldEditorState> {

  public constructor()
  {
    super();
  }

  public render(): JSX.Element {
    return (
      <div className={styles.textFieldEditor}>
        <TextField 
          value={ this.valueString }
          placeholder={ this.props.placeholder ? this.props.placeholder : "" }
          onChanged={ this._handleValueChanged }
        />
      </div>
    );
  }
}
