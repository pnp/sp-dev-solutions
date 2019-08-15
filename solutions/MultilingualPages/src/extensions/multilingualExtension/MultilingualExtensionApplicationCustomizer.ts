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
import { sp, ClientSidePage, ClientSideWebpart, CanvasControl } from '@pnp/sp';

export interface IMultilingualExtensionApplicationCustomizerProperties { }

export default class MultilingualExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IMultilingualExtensionApplicationCustomizerProperties> {

  private LOG_SOURCE: string = "MultilingualExtensionApplicationCustomizer";
  private elementId: string = "MultilingualApplicationCustomizer";
  private className = "MultilingualApplicationSupport";

  @override
  public onInit(): Promise<void> {
    Logger.subscribe(new ConsoleListener());
    Logger.activeLogLevel = LogLevel.Info;
    Logger.write(`onInit() [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);

    sp.setup({
      spfxContext: this.context,
      globalCacheDisable: true
    });

    if (!(window as any).isNavigatedEventSubscribed) {
      this.context.application.navigatedEvent.add(this, this.navigationEventHandler);
      (window as any).isNavigatedEventSubscribed = true;
    }

    return Promise.resolve();
  }

  @override
  public onDispose(): Promise<void> {
    this.context.application.navigatedEvent.remove(this, this.navigationEventHandler);

    (window as any).isNavigatedEventSubscribed = false;
    (window as any).currentPage = '';
    return Promise.resolve();
  }

  private navigationEventHandler(): void {
    setTimeout(() => {
      try {
        if ((window as any).isNavigatedEventSubscribed && (window as any).currentPage !== window.location.href) {
          Logger.write(`Change [navigationEventHandler - ${this.LOG_SOURCE}]`, LogLevel.Info);
          (window as any).currentPage = window.location.href;
          this.render();
        } else {
          Logger.write(`Event Unsubscribed or No Url Change [navigationEventHandler - ${this.LOG_SOURCE}]`, LogLevel.Info);
        }
      } catch (err) {
        Logger.write(`${err} [${this.LOG_SOURCE}]`, LogLevel.Error);
      }
    }, 50);
  }

  // protected onDispose(): void {
  //   let multiContainer = document.getElementById(this.elementId);
  //   if (multiContainer != undefined) {
  //     ReactDOM.unmountComponentAtNode(multiContainer);
  //     multiContainer.remove();
  //   }
  // }

  //HACK CODE TO HANDLE MULTIPLE NAVIGATE CALLS, WHICH IS AN SPFX BUG
  //https://github.com/SharePoint/sp-dev-docs/issues/1871
  //https://github.com/SharePoint/sp-dev-docs/issues/1971
  // private navigatedEvent(): void {

  //   Logger.write(`navigatedEvent: [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
  //   const navigatedPage = window.location.pathname + window.location.search;
  //   if (navigatedPage != sessionStorage.getItem('mlCurrentPage')) {
  //     this.context.placeholderProvider.changedEvent.add(this, this.renderMultilingual);
  //   }
  //   sessionStorage.setItem('mlCurrentPage', window.location.pathname + window.location.search);
  // }
  //END HACK

  private deleteAllPickers() {
    Logger.write(`Deleting existing Multilingual pickers! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
    let pickerDivs = document.getElementsByClassName(this.className);
    while (pickerDivs[0]) {
      pickerDivs[0].parentNode.removeChild(pickerDivs[0]);
    }
    this.dispose();
  }

  private render(): void {
    if (!this.context) {
      Logger.write(`Context is undefined [render - ${this.LOG_SOURCE}]`, LogLevel.Error);
      //Reset current page because it's not loaded?
      (window as any).currentPage = '';
      this.navigationEventHandler();
      return;
    }

    this.renderMultilingual();
  }

  private async renderMultilingual(): Promise<void> {
    try {
      Logger.write(`Start [renderMultilingual - ${this.LOG_SOURCE}]`, LogLevel.Info);

      let redirector = await this.hasRedirector();
      if (!redirector) {
        let isInstalled = await this.isMultiLingualInstalled();
        //this.deleteAllPickers();
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
      Logger.write(`${err} [renderMultilingual - ${this.LOG_SOURCE}]`, LogLevel.Error);
    }
  }

  private async isMultiLingualInstalled(): Promise<boolean> {
    try {
      let response = await sp.web.userCustomActions.filter("Title eq 'MultilingualExtension'").get();
      if (response != undefined && response.length > 0) {
        Logger.write(`Multilingual support is installed! [isMultiLingualInstalled - ${this.LOG_SOURCE}]`, LogLevel.Info);
        return true;
      }
      else {
        Logger.write(`Multilingual support NOT installed! [isMultiLingualInstalled - ${this.LOG_SOURCE}]`, LogLevel.Info);
        return false;
      }
    } catch (err) {
      Logger.write(`${err} [isMultiLingualInstalled - ${this.LOG_SOURCE}]`, LogLevel.Error);
    }
  }

  private async hasRedirector(): Promise<boolean> {
    try {
      // Took at as it seemed unnecessary.
      // let stay: boolean = getQueryStringValue("Stay") == undefined || getQueryStringValue("Stay") == "" ? false : true;
      // if (stay == true) { return false; }
      if (window.location.pathname.toLocaleLowerCase().indexOf("/_layouts/") != -1) { return false; }
      const page = await ClientSidePage.fromFile(sp.web.getFileByServerRelativeUrl(window.location.pathname));
      const redirectorControl = page.findControl<ClientSideWebpart>((c: CanvasControl) => {
        return c["webPartId"] === "e842c4da-371b-410e-a3ca-b890d4342564";
      });

      if (redirectorControl != undefined) {
        Logger.write(`Found Redirector [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
        return true;
      }
      else {
        Logger.write(`Redirector NOT found [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
        return false;
      }
    }
    catch (err) {
      Logger.write(`${err} [hasRedirector - ${this.LOG_SOURCE}]`, LogLevel.Error);
      return false;
    }
  }

  // private getPageServerRelativeUrl(): string {
  //   let pathName: string = window.location.pathname;
  //   let serverRelativeUrl: string = this.context.pageContext.web.serverRelativeUrl;
  //   let start: number = pathName.indexOf(serverRelativeUrl);
  //   Logger.write(`getPageServerRelativeUrl: ${pathName.substring(start)} [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
  //   return `${pathName.substring(start)}`;
  // }

  // private stopDataInterception() {
  //   var els = document.querySelectorAll('a');
  //   for (var i = 0; i < els.length; i++) {
  //     els[i].setAttribute("data-interception", "off");
  //   }
  // }
}

// (() => {
//   sessionStorage.setItem('mlCurrentPage', '');
// })();