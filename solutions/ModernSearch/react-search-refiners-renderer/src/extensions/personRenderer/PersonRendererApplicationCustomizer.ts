import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ResultService, ISearchEvent} from '../../services/ResultService/ResultService';
import SearchResult from './SearchResult/SearchResults';
import IResultService from '../../services/ResultService/IResultService';



const LOG_SOURCE: string = 'PersonRendererApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPersonRendererApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PersonRendererApplicationCustomizer
  extends BaseApplicationCustomizer<IPersonRendererApplicationCustomizerProperties> {
  private _resultService: IResultService;

  @override
  public onInit(): Promise<void> {
    this._resultService = new ResultService();
    this._resultService.registerRenderer(this.componentId, 'Persona', 'People', (e) => this.onChangeHappened(e), ['SecondaryText', 'TertiaryText']);
    return Promise.resolve();

  }
  public onChangeHappened(e: ISearchEvent) {
    const secondaryTextField = e.customTemplateFieldValues[0].searchProperty && e.customTemplateFieldValues[0].searchProperty.length > 0 ? e.customTemplateFieldValues[0].searchProperty : 'JobTitle';
    const tertiaryTextField = e.customTemplateFieldValues[1].searchProperty && e.customTemplateFieldValues[1].searchProperty.length > 1 ? e.customTemplateFieldValues[1].searchProperty : 'OfficeNumber';
    const resultDisplay = React.createElement(SearchResult, {
      searchResults: e.results,
      webServerRelativeUrl: this.context.pageContext.web.serverRelativeUrl,
      componentId: e.rendererId,
      secondaryTextField: secondaryTextField,
      tertiaryTextField: tertiaryTextField
    });
    let node = document.getElementById(e.mountNode);
    if(node) {
      ReactDOM.render(resultDisplay, node);
    }
  }
}
