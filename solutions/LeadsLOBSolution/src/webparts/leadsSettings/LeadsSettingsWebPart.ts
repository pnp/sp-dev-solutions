import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { LeadsSettings, ILeadsSettingsProps } from './components/LeadsSettings';

export interface ILeadsSettingsWebPartProps {
  description: string;
}

export default class LeadsSettingsWebPart extends BaseClientSideWebPart<ILeadsSettingsWebPartProps> {

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
