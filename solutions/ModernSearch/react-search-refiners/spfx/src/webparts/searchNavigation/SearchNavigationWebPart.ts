import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { DynamicProperty } from '@microsoft/sp-component-base';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneDynamicField,
    PropertyPaneDynamicFieldSet,
    DynamicDataSharedDepth
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchNavigationWebPartStrings';
import SearchNavigation from './components/SearchNavigation';
import { ISearchNavigationProps } from './components/ISearchNavigationProps';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';



export interface ISearchNavigationWebPartProps {
    nodes: INavigationNodeProps[];
    queryKeywords: DynamicProperty<string>;
    sourceId: string;
    propertyPath: string;
    propertyId: string;
    color: string;
}

export interface INavigationNodeWebPartProps {
    collectionData: INavigationNodeProps[];
}

export interface INavigationNodeProps {
    displayText: string;
    url: string;
}

export default class SearchNavigationWebPart extends BaseClientSideWebPart<ISearchNavigationWebPartProps> {

    public render(): void {
        console.log(this.properties);
        let dataSourceValue;
        let source;
        if (this.properties && this.properties.queryKeywords) {
            source = this.properties.queryKeywords.tryGetSource();
        }
        console.log(this.properties);

        if (!source && this.properties.sourceId) {
            source = this.context.dynamicDataProvider.tryGetSource(this.properties.sourceId);

            if (source && this.properties.propertyId) {
                dataSourceValue = source.getPropertyValue(this.properties.propertyId)[this.properties.propertyPath];
            }

        } else {
            dataSourceValue = this.properties.queryKeywords.tryGetValue();
        }
        const element: React.ReactElement<ISearchNavigationProps> = React.createElement(
            SearchNavigation,
            {
                nodes: this.properties.nodes,
                queryKeywords: dataSourceValue,
                color: this.properties.color,
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected onInit(): Promise<void> {
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

    protected onBeforeSerialize() {
        this._saveDataSourceInfo();
        super.onBeforeSerialize();
    }

    /**
    * Save the useful information for the connected data source. 
    * They will be used to get the value of the dynamic property if this one fails.
    */
    private _saveDataSourceInfo() {

        if (this.properties.queryKeywords.reference) {
            this.properties.sourceId = this.properties.queryKeywords["_reference"]._sourceId;
            this.properties.propertyId = this.properties.queryKeywords["_reference"]._property;
            this.properties.propertyPath = this.properties.queryKeywords["_reference"]._propertyPath;
        } else {
            this.properties.sourceId = null;
            this.properties.propertyId = null;
            this.properties.propertyPath = null;
        }
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
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
                                PropertyFieldCollectionData('nodes', {
                                    key: 'nodes',
                                    label: strings.NavNodeLabel,
                                    panelHeader: strings.NavNodeHeader,
                                    manageBtnLabel: strings.NavNodeManageBtnLabel,
                                    value: this.properties.nodes,
                                    fields: [
                                        {
                                            id: 'displayText',
                                            title: strings.NavNodeDisplayTextFieldLabel,
                                            type: CustomCollectionFieldType.string,
                                        },
                                        {
                                            id: 'url',
                                            title: strings.NavNodeUrlFieldLabel,
                                            type: CustomCollectionFieldType.url,
                                        }
                                    ]
                                }),
                                PropertyFieldColorPicker('color', {
                                    label: strings.ColorPickerLabel,
                                    selectedColor: this.properties.color,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    properties: this.properties,
                                    disabled: false,
                                    alphaSliderHidden: false,
                                    style: PropertyFieldColorPickerStyle.Full,
                                    iconName: 'Precipitation',
                                    key: 'colorFieldId'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
