import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType, IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { IPropertyFieldRichTextHostProps } from './PropertyFieldRichTextHost';
import PropertyFieldRichTextHost from './PropertyFieldRichTextHost';

export interface IPropertyFieldRichTextProps {
  properties?: any;
  label?: string;
  onChange: (content: string) => void;
}

export interface IPropertyFieldRichTextPropsInternal extends IPropertyFieldRichTextProps, IPropertyPaneCustomFieldProps {
}

class PropertyFieldRichTextBuilder implements IPropertyPaneField<IPropertyFieldRichTextProps>{
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldRichTextPropsInternal;
  public label?: string;
  public key?: string;
  public onChange: (content: string) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldRichTextPropsInternal) {
    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onRender = this.render;
    this.label = _properties.label;
    this.key = _properties.key;
    this.onChange = _properties.onChange;
  }

  private render(elem: HTMLElement) {
    const element: React.ReactElement<IPropertyFieldRichTextHostProps> = React.createElement(PropertyFieldRichTextHost, {
      onRender: this.render,
      currentValue: this.getPropertyByString(this.properties.properties, this.targetProperty).toString(),
      label: this.label,
      onChange: this.onChange.bind(this)
    });
    ReactDom.render(element, elem);
  }

  public getPropertyByString(o, s): any {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }
}

export function PropertyPaneRichText(targetProperty: string, properties: IPropertyFieldRichTextProps): IPropertyPaneField<IPropertyFieldRichTextPropsInternal> {
  const newProperties: IPropertyFieldRichTextPropsInternal = {
    onRender: null,
    properties: properties.properties,
    label: properties.label,
    key: "richText",
    onChange: properties.onChange
  };
  return new PropertyFieldRichTextBuilder(targetProperty, newProperties);
}