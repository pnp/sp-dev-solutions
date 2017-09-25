// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import TimeAwaySummaryContainer from './components/Container/TimeAwaySummaryContainer';
import ITimeAwaySummaryContainerProps from './components/Container/ITimeAwaySummaryContainerProps';
import { ITimeAwaySummaryWebPartProps } from './ITimeAwaySummaryWebPartProps';
import { ITimeAwaySummaryDataProvider } from './dataProviders/ITimeAwaySummaryDataProvider';
import TimeAwaySummaryDataProvider from './dataProviders/TimeAwaySummaryDataProvider';
import MockTimeAwaySummaryProvider from './dataProviders/MockTimeAwaySummaryProvider';
import {
    Constants, WeekType, TimeAwayManager, SharePointDataProvider, MockDataProvider, IMyTimeAwayDataProvider
} from '../../libraries/index';

export default class TimeAwaySummaryWebPart extends BaseClientSideWebPart<ITimeAwaySummaryWebPartProps> {
  private _dataProvider: ITimeAwaySummaryDataProvider;
  private _myTimeAwaydataProvider: IMyTimeAwayDataProvider;
  private _weekType: WeekType = WeekType.FiveDays;
  private _isInitialized:boolean = false;

  public render(): void {
    const element: React.ReactElement<ITimeAwaySummaryContainerProps> = React.createElement(
      TimeAwaySummaryContainer,
      {
        context: this.context,
        dataProvider: this._dataProvider,
        displayMode: this.displayMode,
        myTimeAwaydataProvider: this._myTimeAwaydataProvider,
        weekType: this.properties.normalWeekToggleField ? WeekType.FiveDays : WeekType.SevenDays,
        statusFilter: this.properties.statusToggleField,
        showMyTimeAwayLink: this.properties.myTimeAwayToggleField,
        isInitialized: this._isInitialized
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected async onInit(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Loading List");
    if (Environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockTimeAwaySummaryProvider(this.properties, this.context);
      this._myTimeAwaydataProvider = new MockDataProvider(this.context, Constants.TimeAwayListTitle, true, Constants.Default_TimePeriod);
      this._isInitialized = true;
      return super.onInit();
    } 
    else {
      this._dataProvider = new TimeAwaySummaryDataProvider(this.properties, this.context);
      this._myTimeAwaydataProvider = new SharePointDataProvider(this.context, Constants.TimeAwayListTitle, true, Constants.Default_TimePeriod);

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
                  label: 'Use 5 day weeks',
                  checked: true
                }),
                PropertyPaneToggle('statusToggleField', {
                  label: 'Only display approved absences',
                }),
                PropertyPaneToggle('myTimeAwayToggleField', {
                  label: 'Display "My Time Away" link',
                  checked: true
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'normalWeekToggleField') {
      this._myTimeAwaydataProvider.updateWeekType(newValue);
    }
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }
}