import * as ReactDOM from 'react-dom';
import { camelCase } from '@microsoft/sp-lodash-subset';

export abstract class BaseWebComponent extends HTMLElement {
    
    protected connectedCallback() {
        throw 'Not implemented';
    };
    
    protected disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this);
    }

    /**
     * Transforms web component attributes to camel case propreties to pass in React components
     * (ex: a 'preview-image' HTML attribute becomes 'previewImage' prop, etc.)
     */
    protected resolveAttributes(): { [key:string] : any } {
        
        let props = {};

        this.getAttributeNames().map((attr) => {

            if (this.attributes.getNamedItem(attr)) {

                let value = this.attributes.getNamedItem(attr).value;   

                // Booleans
                if (/^(true|false)$/.test(value)) {
                    props[camelCase(attr)] = (value === 'true');
                } else {
                    props[camelCase(attr)] = value;
                }
            }         
         });
         
        return props;
    }

}