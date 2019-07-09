import * as ReactDOM from 'react-dom';
import * as React from 'react';
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { DocumentCardComponent } from '../DocumentCardComponent/DocumentCardComponent';
import { BaseWebComponent } from './BaseWebComponent';

export class DocumentCardWebComponent extends BaseWebComponent {
   
   public constructor() {
       super(); 
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const documentCarditem = <DocumentCardComponent {...props}/>;
      ReactDOM.render(documentCarditem, this);
   }    
}