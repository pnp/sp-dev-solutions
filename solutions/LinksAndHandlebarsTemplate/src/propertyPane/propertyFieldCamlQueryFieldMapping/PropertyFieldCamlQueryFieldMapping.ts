/**
 * @file PropertyFieldCamlQueryFieldMapping.ts
 * Define a custom field of type PropertyFieldCamlQueryFieldMapping for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2017 Shire
 * Released under MIT licence
 * 
 * Uses the PropertyFieldCamlQuery by Olivier Carpentier
 *
 */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import PropertyFieldCamlQueryFieldMappingHost, { IPropertyFieldCamlQueryFieldMappingHostProps } from './PropertyFieldCamlQueryFieldMappingHost';
import { IWebPartContext} from '@microsoft/sp-webpart-base';

export enum PropertyFieldCamlQueryOrderBy {
  Id = 0,
  Title = 1
}

export enum SPFieldRequiredLevel{
  Required,
  Optional
}

export interface IList{
  title?:string;
  id?:string;
  isDocLib?: boolean;
}

export interface ISort{
  title?:string;
  direction?:SortDirection;
}

export interface IField{
  name:string;
  internalName:string;
  kind:SPFieldType;
}

export interface IMapping{
  name?:string;
  type?: SPFieldType;
  mappedTo?: string;
  enabled?:boolean;
  requiredLevel?: SPFieldRequiredLevel;
  field?:string;
}

export enum SPFieldType{
  Boolean = 0,
  Choice = 1,
  Counter = 2,
  Date = 3,
  DateTime = 4,
  Integer = 5,
  Lookup = 6,
  Number = 7,
  Text = 8,
  URL = 9,
  User = 10,
  Taxonomy = 11
}

export enum SortDirection{
  Ascending = 0,
  Descending = 1
}

/**
 * @interface
 * Public properties of the PropertyFieldCamlQuery custom field
 *
 */
export interface IPropertyFieldCamlQueryFieldMappingProps {
  /**
   * @var
   * Property field label displayed on top
   */
  label: string;
  context: IWebPartContext;
  dataPropertyPath:string;
  query:string;
  baseTemplate?: number;
  includeHidden?: boolean;
  orderBy?: PropertyFieldCamlQueryOrderBy;
  showOrderBy?: boolean;
  showMax?: boolean;
  showFilters?: boolean;
  showCreate?:boolean;
  fieldMappings: IMapping[];
  createFields?: string[];
  createTitleRequired?: boolean;
  render(): void;
  max?: number;
  /**
   * @function
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    /**
   * @var
   * Parent Web Part properties
   */
  properties: any;
  /**
   * @var
   * An UNIQUE key indicates the identity of this control
   */
  key?: string;
  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;
  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the text field will
   *     show a red border and show an error message below the text field.
   *
   *   When it returns Promise<string>:
   *   - The resolved value is display as error message.
   *   - The rejected, the value is thrown away.
   *
   */
   onGetErrorMessage?: (value: string) => string | Promise<string>;
   /**
    * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
    * Default value is 200.
    */
   deferredValidationTime?: number;
}

/**
 * @interface
 * Private properties of the PropertyFieldCamlQuery custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldCamlQuery.
 *
 */
export interface IPropertyFieldCamlQueryFieldMappingPropsInternal extends IPropertyFieldCamlQueryFieldMappingProps {
  label: string;
  targetProperty: string;
  context: IWebPartContext;
  query:string;
  dataPropertyPath: string;
  baseTemplate?: number;
  orderBy?: PropertyFieldCamlQueryOrderBy;
  includeHidden?: boolean;
  showOrderBy?: boolean;
  showMax?: boolean;
  showFilters?: boolean;
  showCreate?: boolean;
  fieldMappings: IMapping[];
  createFields?: string[];
  createTitleRequired?:boolean;
  render():void;
  max?: number;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  properties: any;
  key: string;
  disabled?: boolean;
  onGetErrorMessage?: (value: string) => string | Promise<string>;
  deferredValidationTime?: number;
}

/**
 * @interface
 * Represents a PropertyFieldCamlQuery object
 *
 */
class PropertyFieldCamlQueryBuilder implements IPropertyPaneField<IPropertyFieldCamlQueryFieldMappingPropsInternal> {

  //Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldCamlQueryFieldMappingPropsInternal;

  //Custom properties label: string;
  private label: string;
  private context: IWebPartContext;
  private dataPropertyPath:string;
  private query:string;
  private baseTemplate: number;
  private orderBy: PropertyFieldCamlQueryOrderBy;
  private includeHidden: boolean;
  private showOrderBy: boolean;
  private showMax: boolean;
  private showFilters: boolean;
  private showCreate:boolean;
  private fieldMappings: IMapping[];
  private createFields: string[];
  private createTitleRequired: boolean;
  private renderWebpart = ()=>{ this.properties.render(); };
  private max: number;
  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void {}
  private customProperties: any;
  private key: string;
  private disabled: boolean = false;
  private onGetErrorMessage: (value: string) => string | Promise<string>;
  private deferredValidationTime: number = 200;

  /**
   * @function
   * Ctor
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldCamlQueryFieldMappingPropsInternal) {
    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.label = _properties.label;
    this.context = _properties.context;
    this.dataPropertyPath = _properties.dataPropertyPath;
    this.query = _properties.query;
    this.baseTemplate = _properties.baseTemplate;
    this.orderBy = _properties.orderBy;
    this.includeHidden = _properties.includeHidden;
    this.showOrderBy = _properties.showOrderBy;
    this.showMax = _properties.showMax;
    this.showFilters = _properties.showFilters;
    this.showCreate = _properties.showCreate;
    this.fieldMappings = _properties.fieldMappings;
    this.createFields = _properties.createFields;
    this.createTitleRequired = _properties.createTitleRequired;
    this.max = _properties.max;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    if (_properties.disabled === true)
      this.disabled = _properties.disabled;
    this.onGetErrorMessage = _properties.onGetErrorMessage;
    if (_properties.deferredValidationTime !== undefined)
      this.deferredValidationTime = _properties.deferredValidationTime;
  }

  /**
   * @function
   * Renders the SPListPicker field content
   */
  private render(elem: HTMLElement): void {
    //Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldCamlQueryFieldMappingHostProps> = React.createElement(PropertyFieldCamlQueryFieldMappingHost, {
      label: this.label,
      targetProperty: this.targetProperty,
      context: this.context,
      query: this.query,
      dataPropertyPath:this.dataPropertyPath,
      baseTemplate: this.baseTemplate,
      orderBy: this.orderBy,
      includeHidden: this.includeHidden,
      showOrderBy: this.showOrderBy,
      showMax: this.showMax,
      showFilters: this.showFilters,
      showCreate: this.showCreate,
      fieldMappings: this.fieldMappings,
      createFields: this.createFields,
      createTitleRequired: this.createTitleRequired,
      max: this.max,
      onDispose: this.dispose,
      onRender: this.render,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
      render: this.renderWebpart
    });
    //Calls the REACT content generator
    ReactDom.render(element, elem);
  }

  /**
   * @function
   * Disposes the current object
   */
  private dispose(elem: HTMLElement): void {

  }

}

/**
 * @function
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
export function PropertyFieldCamlQueryFieldMapping(targetProperty: string, properties: IPropertyFieldCamlQueryFieldMappingProps): IPropertyPaneField<IPropertyFieldCamlQueryFieldMappingPropsInternal> {

    //Create an internal properties object from the given properties
    var newProperties: IPropertyFieldCamlQueryFieldMappingPropsInternal = {
      label: properties.label,
      targetProperty: targetProperty,
      context: properties.context,
      query:properties.query,
      dataPropertyPath:properties.dataPropertyPath,
      baseTemplate: properties.baseTemplate,
      orderBy: properties.orderBy,
      includeHidden: properties.includeHidden,
      showOrderBy: properties.showOrderBy,
      showMax: properties.showMax,
      showFilters: properties.showFilters,
      showCreate: properties.showCreate,
      fieldMappings: properties.fieldMappings,
      createFields: properties.createFields,
      createTitleRequired: properties.createTitleRequired,
      render: properties.render,
      max: properties.max,
      onPropertyChange: properties.onPropertyChange,
      properties: properties.properties,
      onDispose: null,
      onRender: null,
      key: properties.key,
      disabled: properties.disabled,
      onGetErrorMessage: properties.onGetErrorMessage,
      deferredValidationTime: properties.deferredValidationTime
    };
    //Calls the PropertyFieldCamlQuery builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldCamlQueryBuilder(targetProperty, newProperties);
}