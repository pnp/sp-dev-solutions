import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
    IPropertyPaneConfiguration,
    IPropertyPaneField,
    IPropertyPaneChoiceGroupOption,
    PropertyPaneChoiceGroup,
    PropertyPaneDropdown,
    PropertyPaneTextField,
    PropertyPaneToggle
} from "@microsoft/sp-property-pane";
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as strings from 'SearchRefinersWebPartStrings';
import { IRefinementFilter, IRefinementResult } from '../../models/ISearchResult';
import SearchRefinersContainer from './components/SearchRefinersContainer/SearchRefinersContainer';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition, IDynamicDataSource } from '@microsoft/sp-dynamic-data';
import { ISearchRefinersWebPartProps } from './ISearchRefinersWebPartProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import IRefinerSourceData from '../../models/IRefinerSourceData';
import { DynamicProperty, ThemeChangedEventArgs, ThemeProvider } from '@microsoft/sp-component-base';
import { SearchComponentType } from '../../models/SearchComponentType';
import RefinersLayoutOption from '../../models/RefinersLayoutOptions';
import { ISearchRefinersContainerProps } from './components/SearchRefinersContainer/ISearchRefinersContainerProps';
import ISearchResultSourceData from '../../models/ISearchResultSourceData';
import { DynamicDataService } from '../../services/DynamicDataService/DynamicDataService';
import IDynamicDataService from '../../services/DynamicDataService/IDynamicDataService';
import RefinerTemplateOption from '../../models/RefinerTemplateOption';
import RefinersSortOption from '../../models/RefinersSortOptions';
import RefinersSortDirection from '../../models/RefinersSortDirection';
import { SearchManagedProperties, ISearchManagedPropertiesProps } from '../../controls/SearchManagedProperties/SearchManagedProperties';
import MockSearchService from '../../services/SearchService/MockSearchService';
import SearchService from '../../services/SearchService/SearchService';
import ISearchService from '../../services/SearchService/ISearchService';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { cloneDeep } from '@microsoft/sp-lodash-subset';

export default class SearchRefinersWebPart extends BaseClientSideWebPart<ISearchRefinersWebPartProps> implements IDynamicDataCallables {

    private _dynamicDataService: IDynamicDataService;
    private _selectedFilters: IRefinementFilter[] = [];
    private _searchResultSourceData: DynamicProperty<ISearchResultSourceData>;
    private _searchService: ISearchService;
    private _themeProvider: ThemeProvider;

    /**
     * The list of available managed managed properties (managed globally for all proeprty pane fiels if needed)
     */
    private _availableManagedProperties: IComboBoxOption[];

    public render(): void {

        let renderElement = null;
        let availableRefiners = [];
        let queryKeywords = '';
        let selectedProperties: string[] = [];
        let queryTemplate: string = '';
        let resultSourceId: string = '';

        if (this.properties.searchResultsDataSourceReference) {

            // If the dynamic property exists, it means the Web Part ins connected to a search results Web Part
            if (this._searchResultSourceData) {
                const searchResultSourceData: ISearchResultSourceData = this._searchResultSourceData.tryGetValue();

                if (searchResultSourceData) {
                    availableRefiners = searchResultSourceData.refinementResults;
                    queryKeywords = searchResultSourceData.queryKeywords;
                    const searchServiceConfig = searchResultSourceData.searchServiceConfiguration;
                    selectedProperties = (searchServiceConfig.selectedProperties) ? searchServiceConfig.selectedProperties : [];
                    queryTemplate = (searchServiceConfig.queryTemplate) ? searchServiceConfig.queryTemplate : '';
                    resultSourceId = searchServiceConfig.resultSourceId;
                }
            }

            renderElement = React.createElement(
                SearchRefinersContainer,
                {
                    webPartTitle: this.properties.webPartTitle,
                    availableRefiners: availableRefiners,
                    refinersConfiguration: this.properties.refinersConfiguration,
                    showBlank: this.properties.showBlank,
                    displayMode: this.displayMode,
                    onUpdateFilters: (appliedRefiners: IRefinementFilter[]) => {
                        this._selectedFilters = appliedRefiners;
                        this.context.dynamicDataSourceManager.notifyPropertyChanged(SearchComponentType.RefinersWebPart);
                    },
                    selectedLayout: this.properties.selectedLayout,
                    language: this.context.pageContext.cultureInfo.currentUICultureName,
                    query: queryKeywords + queryTemplate + selectedProperties + resultSourceId
                } as ISearchRefinersContainerProps
            );
        } else {
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
            } else {
                renderElement = React.createElement('div', null);
            }
        }
        ReactDom.render(renderElement, this.domElement);
    }

    /**
     * Opens the Web Part property pane
     */
    private _setupWebPart() {
        this.context.propertyPane.open();
    }

    public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {

        // Use the Web Part title as property title since we don't expose sub properties
        return [
            {
                id: SearchComponentType.RefinersWebPart,
                title: this.properties.webPartTitle ? this.properties.webPartTitle : this.title
            }
        ];
    }

    public getPropertyValue(propertyId: string): IRefinerSourceData {
        switch (propertyId) {

            case SearchComponentType.RefinersWebPart:
                return {
                    selectedFilters: this._selectedFilters,
                    refinerConfiguration: this.properties.refinersConfiguration
                } as IRefinerSourceData;

            default:
                throw new Error('Bad property id');
        }
    }

    protected onInit(): Promise<void> {

        this._initializeRequiredProperties();
        this.initThemeVariant();

        this._dynamicDataService = new DynamicDataService(this.context.dynamicDataProvider);
        this.ensureDataSourceConnection();

        if (Environment.type === EnvironmentType.Local) {
            this._searchService = new MockSearchService();
        } else {
            this._searchService = new SearchService(this.context.pageContext, this.context.spHttpClient);
        }

        if (this.properties.searchResultsDataSourceReference) {
            // Needed to retrieve manually the value for the dynamic property at render time. See the associated SPFx bug
            // https://github.com/SharePoint/sp-dev-docs/issues/2985
            this.context.dynamicDataProvider.registerAvailableSourcesChanged(this.render);
        }

        this.context.dynamicDataSourceManager.initializeSource(this);

        return Promise.resolve();
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    /**
     * Determines the group fields for refiner settings
     */
    private _getRefinerSettings(): IPropertyPaneField<any>[] {

        const refinerSettings = [
            PropertyFieldCollectionData('refinersConfiguration', {
                manageBtnLabel: strings.Refiners.EditRefinersLabel,
                key: 'refiners',
                enableSorting: true,
                panelHeader: strings.Refiners.EditRefinersLabel,
                panelDescription: strings.Refiners.RefinersFieldDescription,
                label: strings.Refiners.RefinersFieldLabel,
                value: this.properties.refinersConfiguration,
                fields: [
                    {
                        id: 'refinerName',
                        title: strings.Refiners.RefinerManagedPropertyField,
                        type: CustomCollectionFieldType.custom,
                        onCustomRender: (field, value, onUpdate, item, itemId, onCustomFieldValidation) => {
                            // Need to specify a React key to avoid item duplication when adding a new row
                            return React.createElement("div", { key: `${field.id}-${itemId}` },
                                React.createElement(SearchManagedProperties, {
                                    defaultSelectedKey: item[field.id] ? item[field.id] : '',
                                    onUpdate: (newValue: any, isSortable: boolean) => {
                                        onUpdate(field.id, newValue);
                                        onCustomFieldValidation(field.id, '');
                                    },
                                    searchService: this._searchService,
                                    validateSortable: false,
                                    availableProperties: this._availableManagedProperties,
                                    onUpdateAvailableProperties: this._onUpdateAvailableProperties
                                } as ISearchManagedPropertiesProps));
                        }
                    },
                    {
                        id: 'displayValue',
                        title: strings.Refiners.RefinerDisplayValueField,
                        type: CustomCollectionFieldType.string
                    },
                    {
                        id: 'template',
                        title: strings.Refiners.RefinerTemplateField,
                        type: CustomCollectionFieldType.dropdown,
                        options: [
                            {
                                key: RefinerTemplateOption.CheckBox,
                                text: strings.Refiners.Templates.RefinementItemTemplateLabel
                            },
                            {
                                key: RefinerTemplateOption.CheckBoxMulti,
                                text: strings.Refiners.Templates.MutliValueRefinementItemTemplateLabel
                            },
                            {
                                key: RefinerTemplateOption.DateRange,
                                text: strings.Refiners.Templates.DateRangeRefinementItemLabel,
                            },
                            {
                                key: RefinerTemplateOption.FixedDateRange,
                                text: strings.Refiners.Templates.FixedDateRangeRefinementItemLabel,
                            }
                        ]
                    },
                    {
                        id: 'refinerSortType',
                        title: strings.Refiners.Templates.RefinerSortTypeLabel,
                        type: CustomCollectionFieldType.dropdown,
                        options: [
                            {
                                key: RefinersSortOption.Default,
                                text: "--"
                            },
                            {
                                key: RefinersSortOption.ByNumberOfResults,
                                text: strings.Refiners.Templates.RefinerSortTypeByNumberOfResults,
                                ariaLabel: strings.Refiners.Templates.RefinerSortTypeByNumberOfResults
                            },
                            {
                                key: RefinersSortOption.Alphabetical,
                                text: strings.Refiners.Templates.RefinerSortTypeAlphabetical,
                                ariaLabel: strings.Refiners.Templates.RefinerSortTypeAlphabetical
                            }
                        ]
                    },
                    {
                        id: 'refinerSortDirection',
                        title: strings.Refiners.Templates.RefinerSortTypeSortOrderLabel,
                        type: CustomCollectionFieldType.dropdown,
                        options: [
                            {
                                key: RefinersSortDirection.Ascending,
                                text: strings.Refiners.Templates.RefinerSortTypeSortDirectionAscending,
                                ariaLabel: strings.Refiners.Templates.RefinerSortTypeSortDirectionAscending
                            },
                            {
                                key: RefinersSortDirection.Descending,
                                text: strings.Refiners.Templates.RefinerSortTypeSortDirectionDescending,
                                ariaLabel: strings.Refiners.Templates.RefinerSortTypeSortDirectionDescending
                            }
                        ]

                    },
                    {
                        id: 'showExpanded',
                        title: strings.Refiners.ShowExpanded,
                        type: CustomCollectionFieldType.boolean
                    }
                ]
            }),
            PropertyPaneDropdown('searchResultsDataSourceReference', {
                options: this._dynamicDataService.getAvailableDataSourcesByType(SearchComponentType.SearchResultsWebPart),
                label: strings.ConnectToSearchResultsLabel
            })
        ];

        return refinerSettings;
    }

    /**
     * Determines the group fields for styling options inside the property pane
     */
    private _getStylingFields(): IPropertyPaneField<any>[] {

        // Options for the search results layout 
        const layoutOptions = [
            {
                iconProps: {
                    officeFabricIconFontName: 'BulletedList2'
                },
                text: 'Vertical',
                key: RefinersLayoutOption.Vertical,
            },
            {
                iconProps: {
                    officeFabricIconFontName: 'ClosePane'
                },
                text: 'Panel',
                key: RefinersLayoutOption.LinkAndPanel
            }
        ] as IPropertyPaneChoiceGroupOption[];

        // Sets up styling fields
        let stylingFields: IPropertyPaneField<any>[] = [
            PropertyPaneTextField('webPartTitle', {
                label: strings.WebPartTitle
            }),
            PropertyPaneToggle('showBlank', {
                label: strings.ShowBlankLabel,
                checked: this.properties.showBlank,
            }),
            PropertyPaneChoiceGroup('selectedLayout', {
                label: strings.RefinerLayoutLabel,
                options: layoutOptions
            })
        ];

        return stylingFields;
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    groups: [
                        {
                            groupName: strings.RefinersConfigurationGroupName,
                            groupFields: this._getRefinerSettings()
                        },
                        {
                            groupName: strings.StylingSettingsGroupName,
                            groupFields: this._getStylingFields()
                        }
                    ],
                    displayGroupsAsAccordion: true
                }
            ]
        };
    }

    /**
     * Make sure the dynamic property is correctly connected to the source if a search results component has been selected in options 
     */
    private ensureDataSourceConnection() {

        if (this.properties.searchResultsDataSourceReference) {

            // Register the data source manually since we don't want user select properties manually
            if (!this._searchResultSourceData) {
                this._searchResultSourceData = new DynamicProperty<ISearchResultSourceData>(this.context.dynamicDataProvider);
            }

            this._searchResultSourceData.setReference(this.properties.searchResultsDataSourceReference);
            this._searchResultSourceData.register(this.render);

        } else {
            if (this._searchResultSourceData) {
                this._searchResultSourceData.unregister(this.render);
            }
        }
    }

    protected async onPropertyPaneFieldChanged(propertyPath: string) {

        if (propertyPath.localeCompare('searchResultsDataSourceReference') === 0) {
            this.ensureDataSourceConnection();
        }

        if (propertyPath.localeCompare('refinersConfiguration') === 0) {
            this.context.dynamicDataSourceManager.notifyPropertyChanged(SearchComponentType.RefinersWebPart);
        }
    }

    /**
     * Initializes the Web Part required properties if there are not present in the manifest (i.e. during an update scenario)
     */
    private _initializeRequiredProperties() {

        if (<any>this.properties.refinersConfiguration === "") {
            this.properties.refinersConfiguration = [];
        }

        if (Array.isArray(this.properties.refinersConfiguration)) {

            this.properties.refinersConfiguration = this.properties.refinersConfiguration.map(config => {
                if (!config.template) {
                    config.template = RefinerTemplateOption.CheckBox;
                }
                if (!config.refinerSortType) {
                    config.refinerSortType = RefinersSortOption.ByNumberOfResults;
                }
                if (!config.refinerSortDirection) {
                    config.refinerSortDirection = config.refinerSortType == RefinersSortOption.Alphabetical ? RefinersSortDirection.Ascending : RefinersSortDirection.Descending;
                }

                return config;
            });

        } else {

            // Default setup
            this.properties.refinersConfiguration = [
                {
                    refinerName: "Created",
                    displayValue: "Created Date",
                    template: RefinerTemplateOption.CheckBox,
                    refinerSortType: RefinersSortOption.Default,
                    refinerSortDirection: RefinersSortDirection.Ascending,
                    showExpanded: false
                },
                {
                    refinerName: "Size",
                    displayValue: "Size of the file",
                    template: RefinerTemplateOption.CheckBox,
                    refinerSortType: RefinersSortOption.ByNumberOfResults,
                    refinerSortDirection: RefinersSortDirection.Descending,
                    showExpanded: false
                },
                {
                    refinerName: "owstaxidmetadataalltagsinfo",
                    displayValue: "Tags",
                    template: RefinerTemplateOption.CheckBox,
                    refinerSortType: RefinersSortOption.Alphabetical,
                    refinerSortDirection: RefinersSortDirection.Ascending,
                    showExpanded: false
                }
            ];
        }

        this.properties.selectedLayout = this.properties.selectedLayout ? this.properties.selectedLayout : RefinersLayoutOption.Vertical;
    }

    /**
     * Handler when the list of available managed properties is fetched by a property pane control¸or a field in a collection data control
     * @param properties the fetched properties
     */
    private _onUpdateAvailableProperties(properties: IComboBoxOption[]) {

        // Save the value in the root Web Part class to avoid fetching it again if the property list is requested again by any other property pane control
        this._availableManagedProperties = cloneDeep(properties);

        // Refresh all fields so other property controls can use the new list 
        this.context.propertyPane.refresh();
        this.render();
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
