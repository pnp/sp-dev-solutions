import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BaseWebComponent } from './BaseWebComponent';
import DebugView from '../DebugViewComponent/DebugViewComponent';

export class DebugViewWebComponent extends BaseWebComponent {
   
   public constructor() {
       super(); 
   }

   public async connectedCallback() {

      // Reuse the 'brace' imports from the PnP control instead of reference them explicitly in the debug view
      await import(
         /* webpackChunkName: 'debug-view' */
         '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor'
      );

      let props = this.resolveAttributes();
      const debugView = <DebugView {...props}/>;
      ReactDOM.render(debugView, this);
   }    
}