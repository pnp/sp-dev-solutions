// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

import { TextField } from 'office-ui-fabric-react';

export interface IItemTextFieldEditorProps extends IFieldComponentProps {
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
      <div className={styles.sharePointComponent}>
        <TextField 
          value={ this.valueString }
          onChanged={ this._handleValueChanged }
        />
      </div>
    );
  }
}
