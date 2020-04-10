import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { override } from '@microsoft/decorators';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import {SPComponentLoader} from '@microsoft/sp-loader';

import * as strings from 'MultilingualExtensionApplicationCustomizerStrings';
import { MultilingualExt } from './components/MultilingualExt';
import "@pnp/polyfill-ie11";
import { Logger, LogLevel, ConsoleListener } from "@pnp/logging";
import { sp } from '@pnp/sp';

export interface IMultilingualExtensionApplicationCustomizerProperties { }

export default class MultilingualExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IMultilingualExtensionApplicationCustomizerProperties> {

  private LOG_SOURCE: string = "MultilingualExtensionApplicationCustomizer";
  private elementId: string = "MultilingualApplicationCustomizer";
  private className = "MultilingualApplicationSupport";

  @override
  public async onInit(): Promise<void> {
    Logger.subscribe(new ConsoleListener());
    Logger.activeLogLevel = LogLevel.Info;
    Logger.write(`onInit() [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);

    await this.loadJSOM();

    sp.setup({
      spfxContext: this.context,
      globalCacheDisable: true
    });

    this.context.application.navigatedEvent.add(this, this.render);
  }

  @override
  public onDispose(): Promise<void> {
    this.context.application.navigatedEvent.remove(this, this.render);
    return Promise.resolve();
  }

   /** Load SharePoint JSOM modules if needed  */
   private loadJSOM(): Promise<any> {
    var globalExportsName = null, p = null;
    var promise = new Promise<any>((resolve, reject) => {
      globalExportsName = '$_global_init'; 
        p = (window[globalExportsName] ? 
          Promise.resolve(window[globalExportsName]) : 
          SPComponentLoader.loadScript('/_layouts/15/init.js', { globalExportsName }));
      p.catch((error) => { })
        .then(($_global_init): Promise<any> => {
          globalExportsName = 'Sys'; 
          p = (window[globalExportsName] ? 
            Promise.resolve(window[globalExportsName]) : 
            SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', { globalExportsName }));
          return p;
        }).catch((error) => { })
        .then((Sys): Promise<any> => {
          globalExportsName = 'SP'; p = ((window[globalExportsName] && window[globalExportsName].ClientRuntimeContext) ? 
            Promise.resolve(window[globalExportsName]) : 
            SPComponentLoader.loadScript('/_layouts/15/SP.Runtime.js', { globalExportsName }));
          return p;
        }).catch((error) => { })
        .then((SP): Promise<any> => {
          globalExportsName = 'SP'; 
          p = ((window[globalExportsName] && window[globalExportsName].ClientContext) ? 
            Promise.resolve(window[globalExportsName]) : 
            SPComponentLoader.loadScript('/_layouts/15/SP.js', { globalExportsName }));
          return p;
        }).catch((error) => { })
        .then((SP) => {
          resolve(SP);
        })
      ;
    });
    return promise;
  }

  private getMultilingualContainer(): HTMLElement {
    return document.getElementById(this.elementId);
  }

  private deleteMultilingualContainer() {
    let container = this.getMultilingualContainer();
    Logger.write(`Deleting existing Multilingual picker! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
    container.parentNode.removeChild(container);
  }

  private async render(): Promise<void> {
    try {
      Logger.write(`Start [renderMultilingual - ${this.LOG_SOURCE}]`, LogLevel.Info);
      let bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this.onDispose });
      if (bottomPlaceholder != undefined) {
        Logger.write(`starting to render multilingual picker! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
        let multiContainer = this.getMultilingualContainer();
        if (multiContainer == undefined) {
          multiContainer = document.createElement("DIV");
          multiContainer.setAttribute("id", this.elementId);
          multiContainer.className = this.className;
          bottomPlaceholder.domElement.appendChild(multiContainer);
        }
        Logger.write(`Have container - ${multiContainer.id} [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
        let element = React.createElement(MultilingualExt, { context: this.context, disable: this.deleteMultilingualContainer, topPlaceholder: bottomPlaceholder.domElement });
        let elements: any = [];
        elements.push(element);
        Logger.write(`Render react components: ${elements.length} - ${multiContainer.id} [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
        ReactDOM.render(elements, multiContainer);
        Logger.write(`Redner multilingual complete- ${multiContainer.id} [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Info);
      } else {
        Logger.write(`Bottom Placeholder not available! [${strings.Title} - ${this.LOG_SOURCE}]`, LogLevel.Error);
      }
    }
    catch (err) {
      Logger.write(`${err} [renderMultilingual - ${this.LOG_SOURCE}]`, LogLevel.Error);
    }
  }
}