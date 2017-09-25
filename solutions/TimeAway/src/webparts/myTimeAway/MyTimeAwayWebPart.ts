// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import IMyTimeAwayWebPartProps from './IMyTimeAwayWebPartProps';


import {
  MyTimeAwayContainer,
  IMyTimeAwayContainerProps,
  IMyTimeAwayDataProvider,
  SharePointDataProvider,
  MockDataProvider,
  TimeAwayManager,
  Constants
} from '../../libraries/index';

export default class MyTimeAwayWebPart extends BaseClientSideWebPart<IMyTimeAwayWebPartProps> {
  private _isInitialized: boolean = false;
  private _dataProvider: IMyTimeAwayDataProvider;

  protected async onInit(): Promise<void> {

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Loading List");
    if (Environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockDataProvider(this.context,
        Constants.TimeAwayListTitle,
        this.properties.normalWeekToggleField,
        Constants.Default_TimePeriod);
        this._isInitialized = true;
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        return super.onInit();
    } else {
      this._dataProvider = new SharePointDataProvider(this.context,
        Constants.TimeAwayListTitle,
        this.properties.normalWeekToggleField,
        Constants.Default_TimePeriod);

      return TimeAwayManager
        .checkSPListTimeAway(this.context)
        .then((prop: any) => {
          this._isInitialized = prop.contentlistExists == true;
          return super.onInit();
        }, (er: any) => {
          return super.onInit();
        });
    }
  }

  public render(): void {
    const element: React.ReactElement<IMyTimeAwayContainerProps> = React.createElement(
      MyTimeAwayContainer, {
        dataProvider: this._dataProvider,
        period: Constants.Default_TimePeriod,
        context: this.context,
        isInitialized: this._isInitialized
      });
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneToggle('normalWeekToggleField', {
                  label: 'Use 5 day weeks'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'normalWeekToggleField') {
      this._dataProvider.updateWeekType(newValue);
    }
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }
}
