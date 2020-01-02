import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { DynamicProperty, ThemeChangedEventArgs, ThemeProvider } from '@microsoft/sp-component-base';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneToggle, IPropertyPaneField, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import * as strings from 'SearchNavigationWebPartStrings';
import SearchNavigation from './components/SearchNavigationContainer/SearchNavigationContainer';
import { ISearchNavigationWebPartProps } from './ISearchNavigationWebPartProps';
import { SearchComponentType } from '../../models/SearchComponentType';
import { DynamicDataService } from '../../services/DynamicDataService/DynamicDataService';
import IDynamicDataService from '../../services/DynamicDataService/IDynamicDataService';
import ISearchQuery from '../../models/ISearchQuery';
import { QueryPathBehavior, PageOpenBehavior } from '../../helpers/UrlHelper';

export default class SearchNavigationWebPart extends BaseClientSideWebPart<ISearchNavigationWebPartProps> {
    private _propertyFieldCollectionData;
    private _customCollectionFieldType;
    private _propertyFieldColorPicker;
    private _propertyFieldColorPickerStyle;
    private _dynamicDataService: IDynamicDataService;
    private _queryKeywordsSourceData: DynamicProperty<ISearchQuery>;
    private _themeProvider: ThemeProvider;

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
                    currentPageUrl: this.context.pageContext.site.absoluteUrl.replace(this.context.pageContext.site.serverRelativeUrl, "") + this.context.pageContext.site.serverRequestPath,
                    openBehavior: this.properties.openBehavior,
                    passQuery: this.properties.passQuery,
                    queryPathBehavior: this.properties.queryPathBehavior,
                    queryStringParameter: this.properties.queryStringParameter
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

        this.initThemeVariant();

        this.properties.passQuery = (this.properties.passQuery !== undefined && this.properties.passQuery !== null) ? this.properties.passQuery : true;
        this.properties.queryPathBehavior = (this.properties.queryPathBehavior !== undefined && this.properties.queryPathBehavior !== null) ? this.properties.queryPathBehavior : QueryPathBehavior.QueryParameter;
        this.properties.queryStringParameter = (this.properties.queryStringParameter !== undefined && this.properties.queryStringParameter !== null) ? this.properties.queryStringParameter : "q";
        this.properties.openBehavior = (this.properties.openBehavior !== undefined && this.properties.openBehavior !== null) ? this.properties.openBehavior : PageOpenBehavior.Self;

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
                            groupName: strings.SearchNavigationDataSettings,
                            groupFields: this._getSearchNavigationConfigFields()
                        },
                        {
                            groupName: strings.SearchNavigationColorSettings,
                            groupFields: this._getSearchNavigationColorFields()
                        },
                        {
                            groupName: strings.SearchNavigationQueryPathBehaviorSettings,
                            groupFields: this._getSearchNavigationBehaviorFields()
                        }
                    ],
                    displayGroupsAsAccordion: true
                }
            ]
        };

        return propertypane;
    }

    private _getSearchNavigationConfigFields(): IPropertyPaneField<any>[] {
        let searchNavigationConfigFields: IPropertyPaneField<any>[] = [
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
            PropertyPaneDropdown('queryKeywordsDataSourceReference', {
                options: this._dynamicDataService.getAvailableDataSourcesByType(SearchComponentType.SearchBoxWebPart),
                label: strings.DynamicFieldLabel
            }),
            PropertyPaneToggle('useNlpValue', {
                label: strings.UseNlpValueLabel,
            })
        ];
    
        return searchNavigationConfigFields;
    }

    private _getSearchNavigationColorFields(): IPropertyPaneField<any>[] {
        let searchNavigationColorFields: IPropertyPaneField<any>[] = [
            PropertyPaneToggle('useThemeColor', {
                label: strings.UseThemeColorLabel,
            })
        ];

        if(!this.properties.useThemeColor) {
            searchNavigationColorFields.push(this._propertyFieldColorPicker('color', {
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
    
        return searchNavigationColorFields;
    }

    private _getSearchNavigationBehaviorFields(): IPropertyPaneField<any>[] {
        let searchNavigationBehaviorFields: IPropertyPaneField<any>[] = [
            PropertyPaneDropdown('openBehavior', {
                label:  strings.SearchBoxPageOpenBehaviorLabel,
                options: [
                  { key: PageOpenBehavior.Self, text: strings.SearchBoxSameTabOpenBehavior },
                  { key: PageOpenBehavior.NewTab, text: strings.SearchBoxNewTabOpenBehavior }
                ],
                selectedKey: this.properties.openBehavior
            }),
            PropertyPaneToggle('passQuery', {
                label: strings.PassQueryLabel,
            })
        ];

        if (this.properties.passQuery) {
            searchNavigationBehaviorFields.push(
                PropertyPaneDropdown('queryPathBehavior', {
                    label:  strings.SearchBoxQueryPathBehaviorLabel,
                    options: [
                      { key: QueryPathBehavior.URLFragment, text: strings.SearchBoxUrlFragmentQueryPathBehavior },
                      { key: QueryPathBehavior.QueryParameter, text: strings.SearchBoxQueryStringQueryPathBehavior }
                    ],
                    selectedKey: this.properties.queryPathBehavior
                })
            );

            if (this.properties.queryPathBehavior === QueryPathBehavior.QueryParameter) {
                searchNavigationBehaviorFields.push(
                  PropertyPaneTextField('queryStringParameter', {
                    disabled: this.properties.queryPathBehavior !== QueryPathBehavior.QueryParameter,
                    label: strings.SearchBoxQueryStringParameterName,
                    onGetErrorMessage: (value) => {
                      if (this.properties.queryPathBehavior === QueryPathBehavior.QueryParameter) {
                        if (value === null ||
                          value.trim().length === 0) {
                          return strings.SearchBoxQueryParameterNotEmpty;
                        }              
                      }
                      return '';
                    }
                  })
                );
            }
        }
    
        return searchNavigationBehaviorFields;
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

    /**
     * Initializes theme variant properties
     */
    private initThemeVariant(): void {

        // Consume the new ThemeProvider service
        this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

        // Register a handler to be notified if the theme variant changes
        this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent.bind(this));
    }

    /**
     * Update the current theme variant reference and re-render.
     * @param args The new theme
     */
    private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
        this.render();
    }
}
