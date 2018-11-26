import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneLabel,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'LeadsWebPartStrings';
import { Leads, ILeadsProps } from './components/Leads';
import { SPHttpClient, HttpClientResponse, HttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface ILeadsWebPartProps {
  description: string;
  demo: boolean;
  region: string;
  quarterlyOnly: boolean;
}

export default class LeadsWebPart extends BaseClientSideWebPart<ILeadsWebPartProps> {

  private needsConfiguration: boolean;
  private leadsApiUrl: string;
  private connectionStatus: string;

  protected onInit(): Promise<void> {
    if (this.properties.demo) {
      this.needsConfiguration = false;
      return Promise.resolve();
    }

    return this.getApiUrl();
  }

  public render(): void {
    const element: React.ReactElement<ILeadsProps> = React.createElement(
      Leads,
      {
        demo: this.properties.demo,
        httpClient: this.context.httpClient,
        leadsApiUrl: this.leadsApiUrl,
        needsConfiguration: this.needsConfiguration
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private testConnection = (): void => {
    this.connectionStatus = 'Connecting to the API...';
    this.context.propertyPane.refresh();

    this.context.httpClient
      .get(this.leadsApiUrl, HttpClient.configurations.v1)
      .then((res: HttpClientResponse): void => {
        this.connectionStatus = 'Connection OK';
        this.context.propertyPane.refresh();
      }, (error: any): void => {
        this.connectionStatus = `Connection error: ${error}`;
        this.context.propertyPane.refresh();
      });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const config: IPropertyPaneConfiguration = {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "Data",
              groupFields: [
                PropertyPaneToggle('demo', {
                  label: 'Demo mode',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            },
            {
              groupName: "Filtering options",
              isCollapsed: false,
              groupFields: [
                PropertyPaneDropdown('region', {
                  label: 'Region',
                  options: [
                    { key: '1', text: 'America' },
                    { key: '2', text: 'Europe' },
                    { key: '3', text: 'Asia' },
                    { key: '4', text: 'South Pole' }
                  ]
                }),
                PropertyPaneToggle('quarterlyOnly', {
                  label: 'Only this quarter',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            },
            {
              groupName: "Connection Validation",
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField('apiUrl', {
                  label: 'Data Source',
                  value: this.leadsApiUrl || 'Not configured',
                  disabled: true
                }),
                PropertyPaneLabel('spacer1', { text: '' }),
                PropertyPaneButton('testConnection', {
                  buttonType: PropertyPaneButtonType.Primary,
                  disabled: this.needsConfiguration,
                  onClick: this.testConnection,
                  text: 'Test connection'
                }),
                PropertyPaneLabel('connectionStatus', {
                  text: this.needsConfiguration ? 'Required tenant properties LeadsApiUrl and LeadsApiAadAppId not set' : this.connectionStatus
                })
              ]
            }
          ]
        }
      ]
    };
    return config;
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'demo') {
      if (newValue === true) {
        this.needsConfiguration = false;
      }
      else {
        this.needsConfiguration = true;
        this.getApiUrl(true);
      }
    }
  }

  private getApiUrl(reRender: boolean = false): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (err: any) => void): void => {
      this.context.spHttpClient
        .get(`${this.context.pageContext.web.absoluteUrl}/_api/web/GetStorageEntity('LeadsApiUrl')`, SPHttpClient.configurations.v1)
        .then((res: SPHttpClientResponse) => {
          return res.json();
        })
        .then((res) => {
          this.leadsApiUrl = res.Value;
          this.needsConfiguration = !this.leadsApiUrl;
          if (reRender) {
            this.render();
          }
          resolve();
        }, (err: any): void => {
          reject(err);
        });
    });
  }
}
