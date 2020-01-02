import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { IconComponent } from '../IconComponent/IconComponent';
import { BaseWebComponent } from './BaseWebComponent';

export class IconWebComponent extends BaseWebComponent {
   
   public constructor() {
       super(); 
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const iconComponent = <IconComponent {...props}/>;
      ReactDOM.render(iconComponent, this);
   }    
}