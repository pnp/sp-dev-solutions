import * as ReactDOM from 'react-dom';
import * as React from                                                 'react';
import { DocumentCardComponent } from '../DocumentCardComponent/DocumentCardComponent';
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