// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

import { TextField } from 'office-ui-fabric-react';

export interface IItemDateFieldEditorProps extends IFieldComponentProps {
}

export interface IItemDateFieldEditorState extends IFieldComponentState {
}

export default class ItemDateFieldEditor extends FieldComponent<IItemDateFieldEditorProps, IItemDateFieldEditorState> {

  public constructor()
  {
    super();
  }

  public render(): JSX.Element {
    return (
      <div className={styles.sharePointComponent}>
        <TextField 
          value={ this.valueString }
          onChanged={ this._handleValueChanged }
        />
      </div>
    );
  }
}
