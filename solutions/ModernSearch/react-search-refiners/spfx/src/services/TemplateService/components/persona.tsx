import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PersonaComponent } from '../PersonaComponent/PersonaComponent';
import { BaseWebComponent } from './BaseWebComponent';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class PersonaWebComponent extends BaseWebComponent {
   
   constructor() {
       super();
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const personaItem = <PersonaComponent {...props} ctx={this._ctx}/>;
      ReactDOM.render(personaItem, this);
   }    
}