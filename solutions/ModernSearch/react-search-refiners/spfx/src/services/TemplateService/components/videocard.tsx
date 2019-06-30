import * as ReactDOM from 'react-dom';
import * as React from                                                 'react';
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { DocumentCardComponent, IDocumentCardComponentProps } from '../DocumentCardComponent/DocumentCardComponent'
import { camelCase } from '@microsoft/sp-lodash-subset';

export class VideoCardWebComponent extends HTMLElement {
    constructor() {
       super(); 
    }
 
    connectedCallback() {

      // Get all custom element attributes
      let props: IDocumentCardComponentProps = {};
      
      this.getAttributeNames().map((attr) => {

         if (this.attributes.getNamedItem(attr)) {

            // HTML custom element attributes should match the React component props using a camel case transformation (ex: 'preview-image' => previewImage) 
            props[camelCase(attr)] = this.attributes.getNamedItem(attr).value;
         }         
      });

      // Add video props
      props.isVideo = true;

      const documentCarditem = <DocumentCardComponent {...props}/>;
      ReactDOM.render(documentCarditem, this);
    }
 
    disconnectedCallback(){
       ReactDOM.unmountComponentAtNode(this);
    }    
}