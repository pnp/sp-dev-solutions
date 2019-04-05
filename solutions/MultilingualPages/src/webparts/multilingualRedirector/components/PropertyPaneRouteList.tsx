import * as React from 'react';
import * as ReactDom from 'react-dom';
import { WebPartContext, IPropertyPaneCustomFieldProps, IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
import { IMap, ILanguage } from '../../../common/models/Models';
import { RouteList, IRouteListProps } from './RouteList';
import styles from './MultilingualRedirector.module.scss';

export interface IPropertyPaneRouteListProps{
    label: string;
    loadLanguages: () => Promise<Array<ILanguage>>;
    map: IMap;
    onPropertyChange: (propertyPath: string, newValue: string) => void;
    webPartContext: WebPartContext;
}

export interface IPropertyPaneRouteListInternalProps extends IPropertyPaneRouteListProps, IPropertyPaneCustomFieldProps {
}

export class PropertyPaneRouteList implements IPropertyPaneField<IPropertyPaneRouteListProps>{
    
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneRouteListInternalProps;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IPropertyPaneRouteListProps) {
        this.targetProperty = targetProperty;
        this.properties = {
          key: properties.label,
          label: properties.label,
          loadLanguages: properties.loadLanguages,
          map: properties.map,
          onPropertyChange: properties.onPropertyChange,
          webPartContext: properties.webPartContext,
          onRender: this.onRender.bind(this)
        };
      }

      public render(): void {

        if (!this.elem) {
          return;
        }
     
        this.onRender(this.elem);
      }
     
      private onRender(elem: HTMLElement): void {
        if (!this.elem) {
          this.elem = elem;
        }
     
        const element: React.ReactElement<IRouteListProps> = React.createElement(RouteList, {
          label: this.properties.label,
          loadLanguages: this.properties.loadLanguages,
          map: this.properties.map,
          onChanged: this.onChanged.bind(this),
          context: this.properties.webPartContext,
          stateKey: new Date().toString()
        });
        ReactDom.render(element, elem);
      }
    
      private onChanged(map: IMap): void {
        this.properties.onPropertyChange(this.targetProperty, JSON.stringify(map));
      }
    
    }

