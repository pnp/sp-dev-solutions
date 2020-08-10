import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { LeadsSettings, ILeadsSettingsProps } from './components/LeadsSettings';
import { LeadsSettings as SettingsManager } from '../../LeadsSettings';

export interface ILeadsSettingsWebPartProps {
  description: string;
}

export default class LeadsSettingsWebPart extends BaseClientSideWebPart<ILeadsSettingsWebPartProps> {
  public onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (err) => void): void => {
      this.context.msGraphClientFactory
        .getClient()
        .then((client): void => {
          SettingsManager.initialize(client, this.context.httpClient);
          resolve();
        }, err => reject(err));
    });
  }

  public render(): void {
    const element: React.ReactElement<ILeadsSettingsProps> = React.createElement(
      LeadsSettings, {
        httpClient: this.context.httpClient,
        spHttpClient: this.context.spHttpClient,
        webUrl: this.context.pageContext.web.absoluteUrl
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
