import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { DynamicProperty } from '@microsoft/sp-component-base';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneDynamicField,
    PropertyPaneDynamicFieldSet,
    DynamicDataSharedDepth,
    PropertyPaneToggle,
    IWebPartPropertiesMetadata
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchNavigationWebPartStrings';
import SearchNavigation from './components/SearchNavigationContainer/SearchNavigationContainer';
import { ISearchNavigationContainerProps } from './components/SearchNavigationContainer/ISearchNavigationContainerProps';
import { DynamicDataService } from '../../services/DynamicDataService/DynamicDataService';
import IDynamicDataService from '../../services/DynamicDataService/IDynamicDataService';

export interface ISearchNavigationWebPartProps {
    nodes: INavigationNodeProps[];
    queryKeywords: DynamicProperty<string>;
    sourceId: string;
    propertyPath: string;
    propertyId: string;
    color: string;
    useThemeColor: boolean;
}

export interface INavigationNodeWebPartProps {
    collectionData: INavigationNodeProps[];
}

export interface INavigationNodeProps {
    displayText: string;
    url: string;
}

export default class SearchNavigationWebPart extends BaseClientSideWebPart<ISearchNavigationWebPartProps> {
    private PropertyFieldCollectionData;
    private CustomCollectionFieldType;
    private PropertyFieldColorPicker;
    private PropertyFieldColorPickerStyle;
    private _dynamicDataService: IDynamicDataService;

    public render(): void {
        let queryDataSourceValue = ''//this._dynamicDataService.getDataSourceValue(this.context.dynamicDataProvider, this.properties.queryKeywords, this.properties.sourceId, this.properties.propertyId, this.properties.propertyPath);
        let queryKeywords = (!queryDataSourceValue) ? "" : queryDataSourceValue;

        const element: React.ReactElement<ISearchNavigationContainerProps> = React.createElement(
            SearchNavigation,
            {
                nodes: this.properties.nodes,
                queryKeywords: queryKeywords,
                color: this.properties.color,
                useThemeColor: this.properties.useThemeColor
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected onInit(): Promise<void> {
        this._dynamicDataService = new DynamicDataService(this.context.dynamicDataProvider);
        
        if (this.properties.sourceId) {
            // Needed to retrieve manually the value for the dynamic property at render time. See the associated SPFx bug
            // https://github.com/SharePoint/sp-dev-docs/issues/2985
            this.context.dynamicDataProvider.registerSourceChanged(this.properties.sourceId, this.render);
        }

        return super.onInit();
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected async loadPropertyPaneResources(): Promise<void> {

      // tslint:disable-next-line:no-shadowed-variable
      const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import(
          /* webpackChunkName: 'search-property-pane' */
          '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
      );
      // tslint:disable-next-line:no-shadowed-variable
      const { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } = await import(
          /* webpackChunkName: 'search-property-pane' */
          '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker'
      );

      this.PropertyFieldCollectionData = PropertyFieldCollectionData;
      this.CustomCollectionFieldType = CustomCollectionFieldType;
      this.PropertyFieldColorPicker = PropertyFieldColorPicker;
      this.PropertyFieldColorPickerStyle = PropertyFieldColorPickerStyle;
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        let propertypane =  {
            pages: [
                {
                    groups: [
                        {
                            groupFields: [
                                PropertyPaneDynamicFieldSet({
                                    label: strings.DynamicFieldSetLabel,
                                    fields: [
                                        PropertyPaneDynamicField('queryKeywords', {
                                            label: strings.DynamicFieldLabel
                                        })
                                    ],
                                    sharedConfiguration: {
                                        depth: DynamicDataSharedDepth.Source,
                                    },
                                }),
                                this.PropertyFieldCollectionData('nodes', {
                                    key: 'nodes',
                                    label: strings.NavNodeLabel,
                                    panelHeader: strings.NavNodeHeader,
                                    manageBtnLabel: strings.NavNodeManageBtnLabel,
                                    value: this.properties.nodes,
                                    fields: [
                                        {
                                            id: 'displayText',
                                            title: strings.NavNodeDisplayTextFieldLabel,
                                            type: this.CustomCollectionFieldType.string,
                                        },
                                        {
                                            id: 'url',
                                            title: strings.NavNodeUrlFieldLabel,
                                            type: this.CustomCollectionFieldType.url,
                                        }
                                    ]
                                }),
                                PropertyPaneToggle('useThemeColor', {
                                  label: strings.UseThemeColorLabel,
                                }),

                            ]
                        }
                    ]
                }
            ]
        };
        if(!this.properties.useThemeColor) {
          propertypane.pages[0].groups[0].groupFields.push(this.PropertyFieldColorPicker('color', {
            label: strings.ColorPickerLabel,
            selectedColor: this.properties.color,
            onPropertyChange: this.onPropertyPaneFieldChanged,
            properties: this.properties,
            disabled: false,
            alphaSliderHidden: false,
            style: this.PropertyFieldColorPickerStyle.Full,
            iconName: 'Precipitation',
            key: 'colorFieldId',
          }));
        }
        return propertypane;
    }

    protected async onPropertyPaneFieldChanged(propertyPath: string) {
        if (propertyPath.localeCompare('queryKeywords') === 0) {

            // Update data source information
            this._saveDataSourceInfo();
        }
    }

    /**
     * Save the useful information for the connected data source. 
     * They will be used to get the value of the dynamic property if this one fails.
     */
    private _saveDataSourceInfo() {
        if (this.properties.queryKeywords.tryGetSource()) {
            this.properties.sourceId = this.properties.queryKeywords["_reference"]._sourceId;
            this.properties.propertyId = this.properties.queryKeywords["_reference"]._property;
            this.properties.propertyPath = this.properties.queryKeywords["_reference"]._propertyPath;
        } else {
            this.properties.sourceId = null;
            this.properties.propertyId = null;
            this.properties.propertyPath = null;
        }
    }

    protected get propertiesMetadata(): IWebPartPropertiesMetadata {
        return {
            'queryKeywords': {
                dynamicPropertyType: 'string'
            }
        };
    }
}
