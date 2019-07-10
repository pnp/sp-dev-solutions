import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { override } from '@microsoft/decorators';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import { SPHttpClient, SPHttpClientResponse, HttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'MultilingualExtensionApplicationCustomizerStrings';

import { MultilingualExt } from './components/MultilingualExt';
import "@pnp/polyfill-ie11";
import { Logger, LogLevel, ConsoleListener } from "@pnp/logging";

import { getQueryStringValue } from '../../common/services/utilities';

export interface IMultilingualExtensionApplicationCustomizerProperties { }

export default class MultilingualExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IMultilingualExtensionApplicationCustomizerProperties> {

  private LOG_SOURCE: string = "MultilingualExtensionApplicationCustomizer";
  private elementId: string = "MultilingualApplicationCustomizer";
  private className = "MultilingualApplicationSupport";

  @override
  public onInit(): Promise<void> {
    return new Promise(() => {
      Logger.subscribe(new ConsoleListener());
      Logger.activeLogLevel = LogLevel.Info;
      Logger.write(`onInit() [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);

      //OPTION 1
      //The following code disables partial page loading and then
      //uses the change event to trigger picker rendering
      //this.stopDataInterception();
      //this.context.placeholderProvider.changedEvent.add(this, this.renderMultilingual);
      //this.context.application.navigatedEvent.add(this,this.renderMultilingual); 

      //OPTION 2
      //Try to use session state to trackmultiple nav calls and suppress them
      this.context.application.navigatedEvent.add(this, this.navigatedEvent);
      return;
    });
  }

  //HACK CODE TO HANDLE MULTIPLE NAVIGATE CALLS, WHICH IS AN SPFX BUG
  //https://github.com/SharePoint/sp-dev-docs/issues/1871
  //https://github.com/SharePoint/sp-dev-docs/issues/1971
  private navigatedEvent(): void {

    Logger.write(`navigatedEvent: [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
    const navigatedPage = window.location.pathname + window.location.search;
    if (navigatedPage != sessionStorage.getItem('mlCurrentPage')) {
      this.context.placeholderProvider.changedEvent.add(this, this.renderMultilingual);
    }
    sessionStorage.setItem('mlCurrentPage', window.location.pathname + window.location.search);
  }
  //END HACK

  private deleteAllPickers() {
    Logger.write(`Deleting existing Multilingual pickers! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
    let pickerDivs = document.getElementsByClassName(this.className);
    while (pickerDivs[0]) {
      pickerDivs[0].parentNode.removeChild(pickerDivs[0]);
    }
  }

  protected onDispose(): void {
    let multiContainer = document.getElementById(this.elementId);
    if (multiContainer != undefined) {
      ReactDOM.unmountComponentAtNode(multiContainer);
      multiContainer.remove();
    }
  }

  private async renderMultilingual(): Promise<void> {
    try {

      Logger.write(`renderMultilingual: [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);

      let redirector = await this.hasRedirector();
      if (!redirector) {
        let isInstalled = await this.isMultiLingualInstalled();
        this.deleteAllPickers();
        if (isInstalled) {
          let bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this.onDispose });
          if (bottomPlaceholder != undefined) {
            Logger.write(`Found Bottom placeholder [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
            Logger.write(`Rendering picker! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
            let multiContainer = document.createElement("DIV");
            multiContainer.setAttribute("id", this.elementId);
            multiContainer.className = this.className;
            bottomPlaceholder.domElement.appendChild(multiContainer);
            let element = React.createElement(MultilingualExt, { context: this.context, disable: this.deleteAllPickers.bind(this), topPlaceholder: bottomPlaceholder.domElement });
            let elements: any = [];
            elements.push(element);
            ReactDOM.render(elements, multiContainer);
          } else {
            Logger.write(`Bottom Placeholder not available! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Error);
          }
        }
      }
    }
    catch (err) {
      Logger.write(`${err} [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Error);
    }
  }

  private async isMultiLingualInstalled(): Promise<boolean> {
    let url: string = `${this.context.pageContext.web.serverRelativeUrl}/_api/web/apptiles?$filter=Title eq 'Multilingual Page Management'`;

    let response = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
    let results = await response.json();

    if (results.value != undefined && results.value.length > 0) {
      Logger.write(`Multilingual support is installed! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
      return true;
    }
    else {
      Logger.write(`Multilingual support NOT installed! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
      return false;
    }
  }

  private async hasRedirector(): Promise<boolean> {
    try {
      let stay: boolean = getQueryStringValue("Stay") == undefined || getQueryStringValue("Stay") == "" ? false : true;
      let url: string = `${this.context.pageContext.web.serverRelativeUrl}/_api/web/getFileByServerRelativeUrl('${this.getPageServerRelativeUrl()}')/listItemAllFields?$select=CanvasContent1,CommentsDisabled`;

      if (stay == true) { return false; }
      if (window.location.pathname.toLocaleLowerCase().indexOf("/_layouts/") != -1) { return false; }

      let response = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
      let canvas = await response.json();
      if (canvas.CanvasContent1 != undefined &&
        canvas.CanvasContent1.indexOf("Multilingual Redirector") != -1) {
        Logger.write(`Found Redirector [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
        return true;
      }
      else {
        Logger.write(`Redirector NOT found [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
        return false;
      }
    }
    catch (err) {
      return false;
    }
  }

  private getPageServerRelativeUrl(): string {
    let pathName: string = window.location.pathname;
    let serverRelativeUrl: string = this.context.pageContext.web.serverRelativeUrl;
    let start: number = pathName.indexOf(serverRelativeUrl);
    Logger.write(`getPageServerRelativeUrl: ${pathName.substring(start)} [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
    return `${pathName.substring(start)}`;
  }

  // private stopDataInterception() {
  //   var els = document.querySelectorAll('a');
  //   for (var i = 0; i < els.length; i++) {
  //     els[i].setAttribute("data-interception", "off");
  //   }
  // }
}

(() => {
  sessionStorage.setItem('mlCurrentPage', '');
})();