import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import { Link } from '.';
import { FooterProps, Footer } from './components';

export interface IFooterApplicationCustomizerProperties {
  links?: Link[];
  label: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class FooterApplicationCustomizer
  extends BaseApplicationCustomizer<IFooterApplicationCustomizerProperties> {
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

    const element: React.ReactElement<FooterProps> = React.createElement(
      Footer,
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
