// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';
import PartViewManager, {IPartViewManagerProps} from './components/PartViewManager';
import ViewSet from '../../data/ViewSet';
import { ICrmDataProvider } from '../../dataProviders/ICrmDataProvider';

export interface IViewManagerPropertyPaneFieldProps extends IPropertyPaneCustomFieldProps {
    views: ViewSet;
    data: ICrmDataProvider;
}

export default  class ViewManagerPropertyPaneField implements IPropertyPaneField<IViewManagerPropertyPaneFieldProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IViewManagerPropertyPaneFieldProps;
  private elem: HTMLElement;

  constructor(targetProperty: string, views: ViewSet, data: ICrmDataProvider) {
    this.targetProperty = targetProperty;

    this.properties = {
      key: "views",
      views: views,
      data: data,
      onRender: this.onRender.bind(this)
    };
  }

  public render(): void {
    if (!this.elem) {
      return;
    }

    this.onRender(this.elem);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const element: React.ReactElement<IPartViewManagerProps> = React.createElement(PartViewManager, {
        views: this.properties.views,
        data: this.properties.data
    });

    ReactDom.render(element, elem);
  }
}