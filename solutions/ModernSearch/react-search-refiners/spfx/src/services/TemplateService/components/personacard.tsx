import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PersonaCardComponent } from '../PersonaCardComponent/PersonaCardComponent';
import { BaseWebComponent } from './BaseWebComponent';

export class PersonaCardWebComponent extends BaseWebComponent {
   
   constructor() {
       super();
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const personaItem = <PersonaCardComponent {...props}/>;
      ReactDOM.render(personaItem, this);
   }    
}