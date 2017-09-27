import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { IPropertyFieldGuidanceHostProps } from './PropertyFieldGuidanceMessageHost';
import PropertyFieldGuidanceHost from './PropertyFieldGuidanceMessageHost';

export interface IPropertyFieldGuidanceProps{
    properties?: any;
    url: string;
    key?: string;    
}

export interface IPropertyFieldGuidancePropsInternal extends IPropertyFieldGuidanceProps{
    onRender(elem: HTMLElement): void;
    targetProperty:string;
    url: string;
    key?: string;
}

class PropertyFieldGuidanceBuilder implements IPropertyPaneField<IPropertyFieldGuidanceProps>{
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyFieldGuidancePropsInternal; 
    public url: string; 
    public key?: string;  

    public constructor(_targetProperty: string, _properties: IPropertyFieldGuidancePropsInternal){
        this.render = this.render.bind(this);        
        this.targetProperty = _targetProperty;
        this.properties = _properties;
        this.properties.onRender = this.render;
        this.url = _properties.url;
        this.key = _properties.key;
    }

    private render(elem: HTMLElement){
        const element: React.ReactElement<IPropertyFieldGuidanceHostProps> = React.createElement(PropertyFieldGuidanceHost,{
            onRender: this.render,
            properties: this.properties,
            targetProperty: this.targetProperty ,
            url: this.url,
            key: this.key
        });
        ReactDom.render(element,elem);
    }
}

export function PropertyPaneGuidance(targetProperty: string, properties: IPropertyFieldGuidanceProps):IPropertyPaneField<IPropertyFieldGuidancePropsInternal>{
    var newProperties: IPropertyFieldGuidancePropsInternal = {
        onRender: null,
        properties: properties.properties,
        targetProperty: targetProperty,
        url: properties.url,
        key: properties.key
    };
    return new PropertyFieldGuidanceBuilder(targetProperty,newProperties);
}