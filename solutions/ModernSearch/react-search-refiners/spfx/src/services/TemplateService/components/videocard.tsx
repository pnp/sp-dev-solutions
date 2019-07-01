import * as ReactDOM from 'react-dom';
import * as React from                                                 'react';
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { DocumentCardComponent, IDocumentCardComponentProps } from '../DocumentCardComponent/DocumentCardComponent'
import { IPropertyPaneGroup } from '@microsoft/sp-property-pane';
import { BaseWebComponent } from './BaseWebComponent';

export class VideoCardWebComponent extends BaseWebComponent {
   
   public constructor() {
      super(); 
   }

   public connectedCallback() {

      // Get all custom element attributes
      let props = this.resolveAttributes();

      // Add video props
      props.isVideo = true;

      const documentCarditem = <DocumentCardComponent {...props}/>;
      ReactDOM.render(documentCarditem, this);
    }    
}