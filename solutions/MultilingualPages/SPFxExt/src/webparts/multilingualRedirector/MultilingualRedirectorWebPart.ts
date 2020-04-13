import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { PropertyPaneRouteList } from './components/PropertyPaneRouteList';
import MultilingualRedirector from './components/MultilingualRedirector';
import { ILanguage, IMap } from '../../common/models/Models';
import {
  IMultilingualRedirectorService,
  MultilingualRedirectorService,
  MockMultilingualRedirectorService
} from './services/MutlilingualRedirectorService';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { IMultilingualRedirectorProps } from './components/MultilingualRedirector';
import { update, get } from '@microsoft/sp-lodash-subset';

initializeIcons();

export interface IMultilingualRedirectorWebPartProps {
  redirectionMap: string;
}

export default class MultilingualRedirectorWebPart extends BaseClientSideWebPart<IMultilingualRedirectorWebPartProps> {
  private _languageCode: string;

  public async onInit(): Promise<void> {
    // let response = await this.context.spHttpClient.get('/_api/SP.UserProfiles.PeopleManager/GetMyProperties', SPHttpClient.configurations.v1);
    // let json = await response.json();
    // this._languageCode = json.UserProfileProperties.filter(p => p.Key == 'SPS-MUILanguages')[0].Value.substr(0,2);
    // if(!this._languageCode || this._languageCode.length < 1)
    //   this._languageCode = this.context.pageContext.cultureInfo.currentUICultureName.substr(0,2);
    this._languageCode = sessionStorage.getItem('menuLanguage') || this.context.pageContext.cultureInfo.currentUICultureName.substr(0, 2);
    return;
  }

  public render(): void {
    const element: React.ReactElement<IMultilingualRedirectorProps> = React.createElement(
      MultilingualRedirector,
      {
        map: this.getMap(),
        languageCode: this._languageCode,
        propertyPane: this.context.propertyPane
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
            description: "Configuration"
          },
          groups: [
            {
              groupName: "Mapping",
              groupFields: [
                new PropertyPaneRouteList("redirectionMap", {
                  label: "Routes",
                  loadLanguages: this.loadLanguages.bind(this),
                  map: this.getMap(),
                  onPropertyChange: this.onMapChange.bind(this),
                  webPartContext: this.context
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected loadLanguages(): Promise<Array<ILanguage>> {

    let currentHost: string = (window.location.protocol + "//" + window.location.host).toLowerCase();

    let redirectorService: IMultilingualRedirectorService = new MultilingualRedirectorService(this.context);

    if (Environment.type === EnvironmentType.Local) {
      console.log("Using Local Service");
      redirectorService = new MockMultilingualRedirectorService();
    }

    return redirectorService.getLanguages();
  }

  private onMapChange(propertyPath: string, newValue: any): void {
    update(this.properties, propertyPath, (): any => { return newValue; });
    this.render();
  }

  private getMap(): IMap {
    try {
      if (JSON.parse(get(this.properties, "redirectionMap")) == undefined ||
        (JSON.parse(get(this.properties, "redirectionMap"))).routes as IMap == undefined) {
        return { routes: [] };
      }
      else {
        return JSON.parse(get(this.properties, "redirectionMap")) as IMap;
      }
    }
    catch (e) {
      return { routes: [] };
    }
  }
}
