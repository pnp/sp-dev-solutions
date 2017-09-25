// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';

export interface IItemRichTextFieldDisplayProps extends IFieldComponentProps {
}

export interface IItemRichTextFieldDisplayState extends IFieldComponentState {
}

export default class ItemRichTextFieldDisplay extends FieldComponent<IItemRichTextFieldDisplayProps, IItemRichTextFieldDisplayState> {

  public constructor()
  {
    super();
  }

  public render(): JSX.Element {
    return (
      <div className={styles.sharePointComponent} dangerouslySetInnerHTML={ {__html: this.valueString} }>
      </div>
    );
  }
}
