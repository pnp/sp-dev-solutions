import * as ReactDOM from 'react-dom';
import { camelCase } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements/custom-elements.min';

export abstract class BaseWebComponent extends HTMLElement {

    // Property set by the BaseTemplateService via prototype
    public _ctx: WebPartContext;
    public _themeVariant: IReadonlyTheme | undefined;

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