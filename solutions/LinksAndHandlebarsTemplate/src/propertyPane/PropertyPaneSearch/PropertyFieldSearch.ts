import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { IPropertyFieldSearchHostProps } from './PropertyFieldSearchHost';
import PropertyFieldSearchHost from './PropertyFieldSearchHost';

export interface IPropertyFieldSearchProps {
  properties?: any;
  onPropertyChange(property: string, oldValue: any, newValue: any): void;
  render: () => void;
  key?: string;
}

export interface IPropertyFieldSearchPropsInternal extends IPropertyFieldSearchProps {
  onRender(elem: HTMLElement): void;
  onPropertyChange(property: string, oldValue: any, newValue: any): void;
  render: () => void;
  targetProperty: string;
  key?: string;
}

class PropertyFieldSearchBuilder implements IPropertyPaneField<IPropertyFieldSearchProps>{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldSearchPropsInternal;
  public key?: string;

  public constructor(_targetProperty: string, _properties: IPropertyFieldSearchPropsInternal) {
    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onRender = this.render;
    this.properties.key = _properties.key;
  }

  private render(elem: HTMLElement) {
    const element: React.ReactElement<IPropertyFieldSearchHostProps> = React.createElement(PropertyFieldSearchHost, {
      onRender: this.render,
      render: this.properties.render,
      onPropertyChange: this.properties.onPropertyChange,
      properties: this.properties,
      targetProperty: this.targetProperty,
      key: this.key
    });
    ReactDom.render(element, elem);
  }
}

export function PropertyPaneSearch(targetProperty: string, properties: IPropertyFieldSearchProps): IPropertyPaneField<IPropertyFieldSearchPropsInternal> {
  const newProperties: IPropertyFieldSearchPropsInternal = {
    onRender: null,
    properties: properties.properties,
    targetProperty: targetProperty,
    onPropertyChange: properties.onPropertyChange,
    render: properties.render,
    key: properties.key
  };
  return new PropertyFieldSearchBuilder(targetProperty, newProperties);
}
