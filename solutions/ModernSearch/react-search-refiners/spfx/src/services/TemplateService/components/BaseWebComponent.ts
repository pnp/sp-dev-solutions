import * as ReactDOM from 'react-dom';
import { camelCase } from '@microsoft/sp-lodash-subset';
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export abstract class BaseWebComponent extends HTMLElement {

    // Property set by the BaseTemplateService via prototype
    public _ctx: WebPartContext;

    protected connectedCallback() {
        throw 'Not implemented';
    }
    
    protected disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this);
    }

    /**
     * Transforms web component attributes to camel case propreties to pass in React components
     * (ex: a 'preview-image' HTML attribute becomes 'previewImage' prop, etc.)
     */
    protected resolveAttributes(): { [key:string] : any } {
        
        let props = {};

        for (let i =0;i < this.attributes.length;i++) {

            if (this.attributes.item(i)) {

                let value = this.attributes.item(i).value; 
                let attr = this.attributes.item(i).name;  

                // Booleans
                if (/^(true|false)$/.test(value)) {
                    props[camelCase(attr)] = (value === 'true');
                } else {
                    props[camelCase(attr)] = value;
                }
            }         
        }
         
        return props;
    }
}