// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { UrlFieldComponent, IUrlFieldComponentProps, IUrlFieldComponentState } from './UrlFieldComponent';

import { TextField } from 'office-ui-fabric-react';

export interface IItemUrlFieldEditorProps extends IUrlFieldComponentProps {
}

export interface IItemUrlFieldEditorState extends IUrlFieldComponentState {
}

export default class ItemUrlFieldEditor extends UrlFieldComponent<IItemUrlFieldEditorProps, IItemUrlFieldEditorState> {
  
  public render(): JSX.Element {
    return (
      <div className={styles.sharePointComponent}>
        <TextField 
          label="Url"
          value={ this.url }
          onChanged={ this._urlChanged }
        />
        <TextField 
          label="Description"
          value={ this.description }
          onChanged={ this._descriptionChanged }
        />        
      </div>
    );
  }
}
