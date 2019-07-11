import * as ReactDOM from 'react-dom';
import * as React from                                                 'react';
import { DocumentCardShimmers } from '../../DocumentCardComponent/DocumentCardShimmers';
import { BaseWebComponent } from '../BaseWebComponent';

export class DocumentCardShimmersWebComponent extends BaseWebComponent {
   
   public constructor() {
       super(); 
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const documentCarditem = <DocumentCardShimmers {...props}/>;
      ReactDOM.render(documentCarditem, this);
   }    
}