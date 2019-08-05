import * as ReactDOM from 'react-dom';
import * as React from                                                 'react';
import { BaseWebComponent } from '../BaseWebComponent';
import { PersonaCardShimmers } from '../../PersonaCardComponent/PersonaCardShimmers';

export class PersonaCardShimmersWebComponent extends BaseWebComponent {
   
   public constructor() {
       super(); 
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const documentCarditem = <PersonaCardShimmers {...props}/>;
      ReactDOM.render(documentCarditem, this);
   }    
}