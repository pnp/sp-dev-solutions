// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

import { TextField } from 'office-ui-fabric-react';
import Utility from '../utilities/Utility';

export interface IItemMultilineTextFieldEditorProps extends IFieldComponentProps {
  stripHtml? : boolean;
  placeholder? : string;
}

export interface IItemMultilineTextFieldEditorState extends IFieldComponentState {
}

export default class ItemMultilineTextFieldEditor extends FieldComponent<IItemMultilineTextFieldEditorProps, IItemMultilineTextFieldEditorState> {

  public constructor()
  {
    super();
  }

  public render(): JSX.Element {

    var val = this.valueString;

    if (val != null && this.props.stripHtml)
    {
      val = Utility.stripTags(val);
    }

    return (
      <div className={styles.sharePointComponent}>
        <TextField 
          multiline = { true }
          value={ val }
          placeholder={ this.props.placeholder ? this.props.placeholder : "" }
          onChanged={ this._handleValueChanged }
        />
      </div>
    );
  }
}
