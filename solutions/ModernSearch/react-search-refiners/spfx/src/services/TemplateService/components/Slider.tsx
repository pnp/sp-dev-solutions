import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SliderComponent } from '../SliderComponent/SliderComponent';
import { BaseWebComponent } from './BaseWebComponent';

export class SliderWebComponent extends BaseWebComponent {
   
   public constructor() {
       super(); 
   }

   public connectedCallback() {

      let props = this.resolveAttributes();
      const sliderComponent = <SliderComponent {...props}/>;
      ReactDOM.render(sliderComponent, this);
   }    
}