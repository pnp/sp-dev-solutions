// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

import UserInterfaceUtility from './UserInterfaceUtility';

export interface IItemDateFieldDisplayProps extends IFieldComponentProps {
}

export interface IItemDateFieldDisplayState extends IFieldComponentState {
}

export default class ItemDateFieldDisplay extends FieldComponent<IItemDateFieldDisplayProps, IItemDateFieldDisplayState> {

  public constructor()
  {
    super();
  }

  public render(): JSX.Element {
    let dateVal : string = "";

    if (this.value != null)
    {
      let date = new Date(this.value) as Date;

      if (date != null)
      {
        dateVal = UserInterfaceUtility.getFriendlyDate(date);
      }
    }

    return (
      <div className={styles.sharePointComponent}>
        { dateVal }
      </div>
    );
  }
}
