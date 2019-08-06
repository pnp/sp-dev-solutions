import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DocumentCardComponent } from '../DocumentCardComponent/DocumentCardComponent';
import { BaseWebComponent } from './BaseWebComponent';


export class DocumentCardWebComponent extends BaseWebComponent {
   
   public constructor() {
       super(); 
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const documentCarditem = <DocumentCardComponent {...props} themeVariant={this._themeVariant}/>;
      ReactDOM.render(documentCarditem, this);
   }    
}