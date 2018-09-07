import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Link } from '.';
import { GlobalFooterProps, GlobalFooter } from './components';

export interface IGlobalFooterApplicationCustomizerProperties {
  links?: Link[];
  label: string;
}

export default class GlobalFooterApplicationCustomizer
  extends BaseApplicationCustomizer<IGlobalFooterApplicationCustomizerProperties> {
  private footerPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    if (!this.properties.links) {
      console.error(`No links have been configured. Please configure links in the footer's properties and refresh the page`);
      return Promise.resolve();
    }

    if (!this.footerPlaceholder) {
      this.footerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
    }

    if (!this.footerPlaceholder) {
      console.error('Placeholder bottom not found');
      return Promise.resolve();
    }

    const element: React.ReactElement<GlobalFooterProps> = React.createElement(
      GlobalFooter,
      {
        label: this.properties.label,
        links: this.properties.links
      }
    );

    ReactDom.render(element, this.footerPlaceholder.domElement);

    return Promise.resolve();
  }

  private _onDispose(): void {
  }
}
