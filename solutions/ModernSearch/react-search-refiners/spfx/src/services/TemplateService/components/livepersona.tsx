import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BaseWebComponent } from './BaseWebComponent';
import { LivePersonaComponent } from '../LivePersonaComponent/LivePersonaComponent';

export class LivePersonaWebComponent extends BaseWebComponent {
   
   constructor() {
       super();
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const livePersonaItem = <LivePersonaComponent {...props} ctx={this._ctx}/>;
      ReactDOM.render(livePersonaItem, this);
   }    
}