import { ISearchManagedPropertiesProps, SearchManagedProperties } from "../SearchManagedProperties/SearchManagedProperties";
import { IPropertyPaneField, PropertyPaneFieldType, IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import ISearchService from "../../services/SearchService/ISearchService";
import { IComboBoxOption } from "office-ui-fabric-react/lib/ComboBox";

/**
 * Defines only relevant properties
 */
export interface IPropertyPaneSearchManagedPropertiesProps {
    
    /**
     * The control label
     */
    label: string;

    /**
     * Description of the control
     */
    description: string;

    /**
     * The default selected key
     */
    defaultSelectedKey?: string;

    /**
     * The default selected key
     */
    defaultSelectedKeys: string[];

    /**
     * The search service instance
     */
    searchService: ISearchService;

    /**
     * Callback when the list of managed properties is fetched by the control
     */
    onUpdateAvailableProperties: (properties: IComboBoxOption[]) => void;

    /**
     * Callback when the property valu is updated
     */
    onPropertyChange: (propertyPath: string, newValue: any) => void;

    /**
     * The list of available managed properties already fetched once
     */
    availableProperties: IComboBoxOption[];

    /**
     * Indicates whether or not we should allow multiple selection
     */
    allowMultiSelect?: boolean;
}

export interface IPropertyPaneSearchManagedPropertiesInternalProps extends IPropertyPaneSearchManagedPropertiesProps, IPropertyPaneCustomFieldProps {
}

export class PropertyPaneSearchManagedProperties implements IPropertyPaneField<IPropertyPaneSearchManagedPropertiesProps> {

    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public shouldFocus?: boolean;
    public properties: IPropertyPaneSearchManagedPropertiesInternalProps;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IPropertyPaneSearchManagedPropertiesProps) {
        this.targetProperty = targetProperty;

        this.properties = {
            key: properties.label,
            label: properties.label,
            description: properties.description,
            onPropertyChange: properties.onPropertyChange,
            allowMultiSelect: properties.allowMultiSelect,
            defaultSelectedKey: properties.defaultSelectedKey,
            availableProperties: properties.availableProperties,
            onUpdateAvailableProperties: properties.onUpdateAvailableProperties,
            searchService: properties.searchService,
            defaultSelectedKeys: properties.defaultSelectedKeys,
            onRender: this.onRender.bind(this),
            onDispose: this.onDispose.bind(this)
          };
    }
    
    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }
    
    private onDispose(element: HTMLElement): void {
        ReactDom.unmountComponentAtNode(element);
    }

    private onRender(elem: HTMLElement): void {

        if (!this.elem) {
            this.elem = elem;
        }

        const element: React.ReactElement<any> = React.createElement("div", { key: this.properties.key },
            React.createElement(SearchManagedProperties, {
                label: this.properties.label,
                allowMultiSelect: this.properties.allowMultiSelect,
                availableProperties: this.properties.availableProperties,
                defaultSelectedKeys: this.properties.defaultSelectedKeys,
                onUpdate: (newValue: any) => {
                    this.properties.onPropertyChange(this.targetProperty, newValue);
                },
                onUpdateAvailableProperties: this.properties.onUpdateAvailableProperties,
                searchService: this.properties.searchService
            } as ISearchManagedPropertiesProps)
        );

        ReactDom.render(element, elem);
    }
}