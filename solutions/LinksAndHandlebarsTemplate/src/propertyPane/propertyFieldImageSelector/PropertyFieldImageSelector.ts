import * as React from 'react';
import * as ReactDom from 'react-dom';
import IWebPartContext from '@microsoft/sp-webpart-base/lib/core/IWebPartContext';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { IPropertyFieldImageSelectorHostProps } from './PropertyFieldImageSelectorHost';
import PropertyFieldImageSelectorHost from './PropertyFieldImageSelectorHost';

export interface IPropertyFieldImageSelectorProps{
    properties?: any;
    context?: IWebPartContext;
    label: string;
    key?: string;
    imageMode: ImageDisplayType;
    changeImage?: (url: string, name?: string) => void;
    changeImageMode?: (imageDisplayMode: ImageDisplayType)=>void;
}

export interface IPropertyFieldImageSelectorPropsInternal extends IPropertyFieldImageSelectorProps{
    onRender(elem: HTMLElement): void;
    context?: IWebPartContext;
    targetProperty: string;
    label: string;
    key?: string;
    imageMode: ImageDisplayType;
    changeImage?: (url: string, name?: string) => void;  
    changeImageMode?: (imageDisplayMode: ImageDisplayType)=>void;
}

class PropertyFieldImageSelectorBuilder implements IPropertyPaneField<IPropertyFieldImageSelectorProps>{
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyFieldImageSelectorPropsInternal; 
    public context?: IWebPartContext;
    public label: string;
    public key?: string;
    public changeImage?: (url: string, name?: string) => void;
    public changeImageMode?: (imageDisplayMode: ImageDisplayType)=>void;
    public imageMode: ImageDisplayType;

    public constructor(_targetProperty: string, _properties: IPropertyFieldImageSelectorPropsInternal){
        this.render = this.render.bind(this);        
        this.targetProperty = _targetProperty;
        this.properties = _properties;
        this.context = _properties.context;
        this.properties.onRender = this.render;
        this.label = _properties.label;
        this.key = _properties.key;
        this.changeImage = _properties.changeImage;
        this.changeImageMode = _properties.changeImageMode;
        this.imageMode = _properties.imageMode;
    }

    private render(elem: HTMLElement){
        const element: React.ReactElement<IPropertyFieldImageSelectorHostProps> = React.createElement(PropertyFieldImageSelectorHost,{
            onRender: this.render,
            properties: this.properties,
            context: this.context,
            targetProperty: this.targetProperty ,
            label: this.label,
            key: this.key,
            changeImage: this.changeImage,
            changeImageMode: this.changeImageMode,
            imageMode: this.imageMode
        });
        ReactDom.render(element,elem);
    }
}

export function PropertyPaneImageSelector(targetProperty: string, properties: IPropertyFieldImageSelectorProps):IPropertyPaneField<IPropertyFieldImageSelectorPropsInternal>{
    var newProperties: IPropertyFieldImageSelectorPropsInternal = {
        onRender: null,
        properties: properties.properties,
        context: properties.context,
        targetProperty: targetProperty,
        label: properties.label,
        key: properties.key,
        changeImage: properties.changeImage,
        changeImageMode: properties.changeImageMode,
        imageMode: properties.imageMode
    };
    return new PropertyFieldImageSelectorBuilder(targetProperty,newProperties);
}

export enum ImageDisplayType{
    Auto,
    Custom
}