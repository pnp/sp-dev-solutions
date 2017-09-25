// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';
import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

export interface IItemTextFieldDisplayProps extends IFieldComponentProps {
}

export interface IItemTextFieldDisplayState extends IFieldComponentState {
}

export default class ItemTextFieldDisplay extends FieldComponent<IItemTextFieldDisplayProps, IItemTextFieldDisplayState> {

  public constructor()
  {
    super();
  }

  public render(): JSX.Element {
    return (
      <div className={styles.sharePointComponent}>
        { this.valueString }
      </div>
    );
  }
}
