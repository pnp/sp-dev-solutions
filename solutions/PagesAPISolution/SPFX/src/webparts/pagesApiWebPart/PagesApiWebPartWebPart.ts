import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PagesApiWebPartWebPartStrings';
import PagesApiWebPart from './components/PagesApiWebPart';
import { IPagesApiWebPartProps } from './components/IPagesApiWebPartProps';

export interface IPagesApiWebPartWebPartProps {
  description: string;
}

export default class PagesApiWebPartWebPart extends BaseClientSideWebPart<IPagesApiWebPartWebPartProps> {

  private _isDarkTheme: boolean = false;

  public render(): void {
      
    const element: React.ReactElement<IPagesApiWebPartProps> = React.createElement(
      PagesApiWebPart,
      {
        msGraphClientFactory: this.context.msGraphClientFactory,
        siteId: this.context.pageContext.site.id,
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
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
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
          ]
        }
      ]
    };
  }
}
