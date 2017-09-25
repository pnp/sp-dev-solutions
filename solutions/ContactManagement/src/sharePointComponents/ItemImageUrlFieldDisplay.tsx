// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

export interface IItemImageUrlFieldDisplayProps extends IFieldComponentProps {
}

export interface IItemImageUrlFieldDisplayState extends IFieldComponentState {
}

export default class ItemImageUrlFieldDisplay extends FieldComponent<IItemImageUrlFieldDisplayProps, IItemImageUrlFieldDisplayState> {

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
