import * as ReactDOM from 'react-dom';
import * as React from                                                 'react';
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { camelCase } from '@microsoft/sp-lodash-subset';
import { DetailsListComponent, DetailsListComponentProps } from '../DetailsListComponent/DetailsListComponent';

export class DetailsListWebComponent extends HTMLElement {
    constructor() {
       super(); 
    }
 
    connectedCallback() {

      // Get all custom element attributes
      let props: DetailsListComponentProps = {};
      
      this.getAttributeNames().map((attr) => {

         if (this.attributes.getNamedItem(attr)) {
            props[camelCase(attr)] = this.attributes.getNamedItem(attr).value;
         }         
      });

      const documentCarditem = <DetailsListComponent {...props}/>;

       ReactDOM.render(documentCarditem, this);
    }
 
    disconnectedCallback(){
       ReactDOM.unmountComponentAtNode(this);
    }    
}