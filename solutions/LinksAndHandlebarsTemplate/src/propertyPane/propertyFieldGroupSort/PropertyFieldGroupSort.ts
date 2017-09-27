import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import PropertyFieldGroupSortHost, { IPropertyFieldGroupSortHostProps } from './PropertyFieldGroupSortHost';

export interface IPropertyFieldGroupSortProps{
    label: string;
    initialValue?: string[];
    placeHolder?: string;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties?: any;
    key?: string;  
    disabled?: boolean;
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    deferredValidationTime?: number;
}

export interface IPropertyFieldGroupSortPropsInternal extends IPropertyFieldGroupSortProps{
    label: string;
    initialValue?: string[];
    placeHolder?: string;
    targetProperty: string;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties: any;
    disabled?: boolean;
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    deferredValidationTime?: number; 
}

class PropertyFieldGroupSortBuilder implements IPropertyPaneField<IPropertyFieldGroupSortPropsInternal>{
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyFieldGroupSortPropsInternal;

    //Custom properties
    private label: string;
    private initialValue: string[];
    private placeHolder: string;
    private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
    private customProperties: any;
    private key: string;
    private disabled: boolean = false;
    private onGetErrorMessage: (value: string) => string | Promise<string>;
    private deferredValidationTime: number = 200;
    private renderWebPart: () => void;
    private disableReactivePropertyChanges: boolean = false;

    public constructor(_targetProperty: string, _properties: IPropertyFieldGroupSortPropsInternal){
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.initialValue = _properties.initialValue;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        if (_properties.disabled === true)
        this.disabled = _properties.disabled;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
        this.deferredValidationTime = _properties.deferredValidationTime;
        this.placeHolder = _properties.placeHolder;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
        this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }

    
    private render(elem: HTMLElement){
        const element: React.ReactElement<IPropertyFieldGroupSortHostProps> = React.createElement(PropertyFieldGroupSortHost,{
            label: this.label,
            initialValue: this.initialValue,
            placeHolder: this.placeHolder,
            targetProperty: this.targetProperty,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.key,
            disabled: this.disabled,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            render: this.renderWebPart,
            disableReactivePropertyChanges: this.disableReactivePropertyChanges
        });
        ReactDom.render(element,elem);
    }

    private dispose(elem: HTMLElement): void {
    }
}

export function PropertyPaneGroupSort(targetProperty: string, properties: IPropertyFieldGroupSortProps):IPropertyPaneField<IPropertyFieldGroupSortPropsInternal>{
    var newProperties: IPropertyFieldGroupSortPropsInternal = {
        label: properties.label,
        targetProperty: targetProperty,
        placeHolder: properties.placeHolder,
        initialValue: properties.initialValue,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        disabled: properties.disabled,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    return new PropertyFieldGroupSortBuilder(targetProperty,newProperties);
}