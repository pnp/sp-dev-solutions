import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'myChangeRequestsWebPartStrings';
import MyCRContainer from './components/Container/MyCRContainer';
import { IMyCRDataProvider } from './dataProviders/IMyCRDataProvider';
import { MyCRDataProvider } from './dataProviders/MyCRDataProvider';
import { MockMyCRDataProvider } from './dataProviders/MockMyCRDataProvider';

import IMyCRContainerProps from './components/Container/IMyCRContainerProps';
import { IMyChangeRequestsWebPartProps } from './IMyChangeRequestsWebPartProps';
import { NewCRDisplays } from './models/MyCRModel';
import { ProvisionManager as ProvisionManager } from '../../libraries/index';

export default class MyChangeRequestsWebPart extends BaseClientSideWebPart<IMyChangeRequestsWebPartProps> {
  private myCRContainerProps: IMyCRContainerProps;
  private _isInitialized: boolean = false;
  private _dataProvider: IMyCRDataProvider;


  protected async onInit(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Loading List");
    if (Environment.type === EnvironmentType.Local) {
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this._isInitialized = true;
      this._dataProvider = new MockMyCRDataProvider(this.context);
      return super.onInit();
    } else {
      this._dataProvider = new MyCRDataProvider(this.context);
      return ProvisionManager
        .checkSPlistsExist(this.context)
        .then((prop: boolean) => {
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
          this._isInitialized = prop;
          return super.onInit();
        }, (er: any) => {
          this.context.statusRenderer.renderError(this.domElement, "Error checking the My Change Request web part lists!");
          return super.onInit();
        });
    }
  }

  public render(): void {
    this.myCRContainerProps = {
      context: this.context,
      dataProvider: this._dataProvider,
      newcrdisplays: escape(this.properties.newcrdisplays),
      newcrtext: escape(this.properties.newcrtext),
      newcrsubmissiontext: escape(this.properties.newcrsubmissiontext),
      newcrbuttontext: escape(this.properties.newcrbuttontext),
      isInitialized: this._isInitialized
    };
    const element: React.ReactElement<IMyCRContainerProps> = React.createElement(
      MyCRContainer,
      this.myCRContainerProps
    );
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('newcrdisplays', {
                  label: 'New Change Request displays',
                  selectedKey: `${NewCRDisplays.PopUp}`,
                  disabled: false,
                  options: [
                    { key: `${NewCRDisplays.PopUp}`, text: 'In a popup' },
                    { key: `${NewCRDisplays.Inline}`, text: 'Inline, within the form' }
                  ]
                }),
                PropertyPaneTextField('newcrtext', {
                  label: 'New Change Request text',
                  onGetErrorMessage: this.validateTextValue.bind(this)
                }),
                PropertyPaneTextField('newcrsubmissiontext', {
                  label: 'New Change Request Submission text',
                  onGetErrorMessage: this.validateTextValue.bind(this)
                }),
                PropertyPaneTextField('newcrbuttontext', {
                  label: 'New Change Request Call to Action Button text',
                  onGetErrorMessage: this.validateTextValue.bind(this)
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  private validateTextValue(value: string): string {
    if (value === null || value.trim().length === 0) {
      return 'Provide a value';
    }
    return '';
  }
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'newcrdisplays') {
      this.myCRContainerProps.newcrdisplays = newValue;
    }
    else if (propertyPath === 'newcrtext') {
      this.myCRContainerProps.newcrtext = newValue;
    }
    else if (propertyPath === 'newcrsubmissiontext') {
      this.myCRContainerProps.newcrsubmissiontext = newValue;
    }
    else if (propertyPath === 'newcrbuttontext') {
      this.myCRContainerProps.newcrbuttontext = newValue;
    }
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }
}
