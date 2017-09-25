// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { UrlFieldComponent, IUrlFieldComponentProps, IUrlFieldComponentState } from './UrlFieldComponent';

export interface IItemUrlFieldDisplayProps extends IUrlFieldComponentProps {
}

export interface IItemUrlFieldDisplayState extends IUrlFieldComponentState {
}

export default class ItemUrlFieldDisplay extends UrlFieldComponent<IItemUrlFieldDisplayProps, IItemUrlFieldDisplayState> {

  public render(): JSX.Element {
    return (
      <div className={styles.sharePointComponent}>
        
        {
          this.url == null || this.url == "" ?
            <div></div> :
          this.description != null  && this.description != this.url ?
            <a href={this.url} title={this.url}>{this.description}</a> :
            <a href={this.url} title={this.url}>{this.props.field.Title} Url</a>
        }        
      </div>
    );
  }
}
