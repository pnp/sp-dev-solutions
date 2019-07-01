import * as ReactDOM from 'react-dom';
import * as React from                                                 'react';
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { DetailsListComponent } from '../DetailsListComponent/DetailsListComponent';
import { BaseWebComponent } from './BaseWebComponent';

export class DetailsListWebComponent extends BaseWebComponent {

   public constructor() {
      super(); 
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const documentCarditem = <DetailsListComponent {...props}/>;
      ReactDOM.render(documentCarditem, this);
   }
}