// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';
import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

export interface IItemFieldLabelProps extends IFieldComponentProps {

}

export interface IItemFieldLabelState extends IFieldComponentState {
}

export default class ItemFieldLabel extends FieldComponent<IItemFieldLabelProps, IItemFieldLabelState> {

  public constructor()
  {
    super();
  }

  public render(): JSX.Element {
    if (this.props.field == null)
    { 
      return null;
    }
    
    return (
      <div className={styles.sharePointComponent}>
        { this.props.field.Title }
      </div>
    );
  }
}
