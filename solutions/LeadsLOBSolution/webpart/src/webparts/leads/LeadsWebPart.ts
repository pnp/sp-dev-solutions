import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButtonType,
  PropertyPaneButton,
  PropertyPaneDropdown,
  PropertyPaneLabel,
  PropertyPaneTextField,
  PropertyPaneToggle
} from "@microsoft/sp-property-pane";

import * as strings from 'LeadsWebPartStrings';
import { Leads, ILeadsProps, LeadView } from './components/Leads';
import { SPHttpClient, HttpClientResponse, HttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ILeadsSettings, LeadsSettings } from '../../LeadsSettings';

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
  private queryParameters: UrlQueryParameterCollection;
  private view?: LeadView;

  protected onInit(): Promise<void> {
    if (this.properties.demo) {
      this.needsConfiguration = false;
      return Promise.resolve();
    }

    return this.getApiUrl();
  }

  private getLeadView(): LeadView | undefined {
    const view: string = this.queryParameters.getValue('view');
    const supportedViews: string[] = ['new', 'mostProbable', 'recentComments', 'requireAttention'];

    if (!view || supportedViews.indexOf(view) < 0) {
      return undefined;
    }

    return LeadView[view];
  }

  public render(): void {
    const element: React.ReactElement<ILeadsProps> = React.createElement(
      Leads,
      {
        demo: this.properties.demo,
        httpClient: this.context.httpClient,
        host: (this.context as any)._host,
        leadsApiUrl: this.leadsApiUrl,
        teamsContext: this.context.microsoftTeams,
        needsConfiguration: this.needsConfiguration,
        view: this.view
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
                  label: 'LOB API URL',
                  placeholder: 'Not configured',
                  value: this.leadsApiUrl,
                  disabled: true
                }),
                PropertyPaneLabel('spacer1', { text: '' }),
                PropertyPaneButton('testConnection', {
                  buttonType: PropertyPaneButtonType.Primary,
                  disabled: this.properties.demo || this.needsConfiguration,
                  onClick: this.testConnection,
                  text: 'Test connection'
                }),
                PropertyPaneLabel('connectionStatus', {
                  text: this.needsConfiguration ? 'Required tenant property LeadsApiUrl not set' : this.connectionStatus
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
    if (this.leadsApiUrl) {
      this.needsConfiguration = false;
      if (reRender) {
        this.render();
      }
      return Promise.resolve();
    }

    return new Promise<void>((resolve: () => void, reject: (err: any) => void): void => {
      LeadsSettings
        .getLeadsApiUrl(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl)
        .then((leadsApiUrl: string): void => {
          this.leadsApiUrl = leadsApiUrl;
          this.needsConfiguration = !this.leadsApiUrl;
          if (reRender) {
            this.render();
          }
          resolve();
        }, () => resolve());
    });
  }

  protected onAfterDeserialize(deserializedObject: any, dataVersion: Version): ILeadsWebPartProps {
    const props: ILeadsWebPartProps = deserializedObject;
    this.queryParameters = new UrlQueryParameterCollection(window.location.href);
    this.view = this.getLeadView();

    if (this.context.microsoftTeams && typeof this.view !== 'undefined') {
      const settings: ILeadsSettings = LeadsSettings.getSettings();
      if (settings) {
        props.demo = settings.demo;
        props.quarterlyOnly = settings.quarterlyOnly;
        props.region = settings.region;
      }
    }

    return props;
  }
}
