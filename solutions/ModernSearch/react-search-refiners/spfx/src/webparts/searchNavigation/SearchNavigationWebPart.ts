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
    PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchNavigationWebPartStrings';
import SearchNavigation from './components/SearchNavigation';
import { ISearchNavigationProps } from './components/ISearchNavigationProps';




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

    public render(): void {
        let dataSourceValue;
        let source;
        if (this.properties && this.properties.queryKeywords) {
            source = this.properties.queryKeywords.tryGetSource();
        }
        if (!source && this.properties.sourceId) {
            source = this.context.dynamicDataProvider.tryGetSource(this.properties.sourceId);

            if (source && this.properties.propertyId) {
                dataSourceValue = source.getPropertyValue(this.properties.propertyId)[this.properties.propertyPath];
            }

        } else {
            if(this.properties.queryKeywords) {
                dataSourceValue = this.properties.queryKeywords.tryGetValue();
            }
        }
        const element: React.ReactElement<ISearchNavigationProps> = React.createElement(
            SearchNavigation,
            {
                nodes: this.properties.nodes,
                queryKeywords: dataSourceValue,
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
}
