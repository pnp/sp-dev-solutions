import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { DynamicProperty } from '@microsoft/sp-component-base';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneToggle,
    PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import * as strings from 'SearchNavigationWebPartStrings';
import SearchNavigation from './components/SearchNavigationContainer/SearchNavigationContainer';
import { ISearchNavigationWebPartProps } from './ISearchNavigationWebPartProps';
import { SearchComponentType } from '../../models/SearchComponentType';
import { DynamicDataService } from '../../services/DynamicDataService/DynamicDataService';
import IDynamicDataService from '../../services/DynamicDataService/IDynamicDataService';
import ISearchQuery from '../../models/ISearchQuery';

export default class SearchNavigationWebPart extends BaseClientSideWebPart<ISearchNavigationWebPartProps> {
    private _propertyFieldCollectionData;
    private _customCollectionFieldType;
    private _propertyFieldColorPicker;
    private _propertyFieldColorPickerStyle;
    private _dynamicDataService: IDynamicDataService;
    private _queryKeywordsSourceData: DynamicProperty<ISearchQuery>;

    public render(): void {
        let renderElement: JSX.Element = React.createElement('div', null);

        if (this.properties.queryKeywordsDataSourceReference 
            && this._queryKeywordsSourceData 
            && this.properties.nodes 
            && this.properties.nodes.length > 0) 
        {
            let queryKeywords = "";
            let queryKeywordsData = this._queryKeywordsSourceData.tryGetValue();
            if (queryKeywordsData)
            {
                queryKeywords = (this.properties.useNlpValue)? queryKeywordsData.enhancedQuery : queryKeywordsData.rawInputValue;
            }

            renderElement = React.createElement(
                SearchNavigation,
                {
                    nodes: this.properties.nodes,
                    queryKeywords: queryKeywords,
                    color: this.properties.color,
                    useThemeColor: this.properties.useThemeColor,
                    currentPageUrl: this.context.pageContext.site.absoluteUrl.replace(this.context.pageContext.site.serverRelativeUrl, "") + this.context.pageContext.site.serverRequestPath
                }
            );
        }
        else {
          if (this.displayMode === DisplayMode.Edit) {
            renderElement = React.createElement(
              Placeholder,
              {
                  iconName: strings.PlaceHolderEditLabel,
                  iconText: strings.PlaceHolderIconText,
                  description: strings.PlaceHolderDescription,
                  buttonLabel: strings.PlaceHolderConfigureBtnLabel,
                  onConfigure: this._setupWebPart.bind(this)
              }
            );
          }
        }
        ReactDom.render(renderElement, this.domElement);
    }

    private _setupWebPart() {
        this.context.propertyPane.open();
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected onInit(): Promise<void> {
        this._dynamicDataService = new DynamicDataService(this.context.dynamicDataProvider);
        this.ensureDataSourceConnection();
    
        return Promise.resolve();
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

      this._propertyFieldCollectionData = PropertyFieldCollectionData;
      this._customCollectionFieldType = CustomCollectionFieldType;
      this._propertyFieldColorPicker = PropertyFieldColorPicker;
      this._propertyFieldColorPickerStyle = PropertyFieldColorPickerStyle;
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        let propertypane =  {
            pages: [
                {
                    groups: [
                        {
                            groupFields: [
                                PropertyPaneDropdown('queryKeywordsDataSourceReference', {
                                    options: this._dynamicDataService.getAvailableDataSourcesByType(SearchComponentType.SearchBoxWebPart),
                                    label: strings.DynamicFieldLabel
                                }),
                                PropertyPaneToggle('useNlpValue', {
                                    label: strings.UseNlpValueLabel,
                                }),
                                this._propertyFieldCollectionData('nodes', {
                                    key: 'nodes',
                                    enableSorting: true,
                                    label: strings.NavNodeLabel,
                                    panelHeader: strings.NavNodeHeader,
                                    manageBtnLabel: strings.NavNodeManageBtnLabel,
                                    value: this.properties.nodes,
                                    fields: [
                                        {
                                            id: 'displayText',
                                            title: strings.NavNodeDisplayTextFieldLabel,
                                            type: this._customCollectionFieldType.string,
                                        },
                                        {
                                            id: 'url',
                                            title: strings.NavNodeUrlFieldLabel,
                                            type: this._customCollectionFieldType.url,
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
          propertypane.pages[0].groups[0].groupFields.push(this._propertyFieldColorPicker('color', {
            label: strings.ColorPickerLabel,
            selectedColor: this.properties.color,
            onPropertyChange: this.onPropertyPaneFieldChanged,
            properties: this.properties,
            disabled: false,
            alphaSliderHidden: false,
            style: this._propertyFieldColorPickerStyle.Full,
            iconName: 'Precipitation',
            key: 'colorFieldId',
          }));
        }
        return propertypane;
    }

    /**
     * Make sure the dynamic property is correctly connected to the source if a search results component has been selected in options 
     */
    private ensureDataSourceConnection() {
        if (this.properties.queryKeywordsDataSourceReference) {
            // Register the data source manually since we don't want user select properties manually
            if (!this._queryKeywordsSourceData) {
                this._queryKeywordsSourceData = new DynamicProperty<ISearchQuery>(this.context.dynamicDataProvider);
            }

            this._queryKeywordsSourceData.setReference(this.properties.queryKeywordsDataSourceReference);
            this._queryKeywordsSourceData.register(this.render);
            
        } else {
            if (this._queryKeywordsSourceData) {
                this._queryKeywordsSourceData.unregister(this.render);
            }
        }
    }

    protected async onPropertyPaneFieldChanged(propertyPath: string) {
        if (propertyPath.localeCompare('queryKeywordsDataSourceReference') === 0) {
            this.ensureDataSourceConnection();
        }
    }
}
