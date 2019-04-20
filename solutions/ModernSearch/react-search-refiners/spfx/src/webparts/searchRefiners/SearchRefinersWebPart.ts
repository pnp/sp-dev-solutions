import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  IPropertyPaneField,
  IPropertyPaneChoiceGroupOption,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as strings from 'SearchRefinersWebPartStrings';
import { IRefinementFilter, IRefinementResult } from '../../models/ISearchResult';
import SearchRefinersContainer from './components/SearchRefinersContainer/SearchRefinersContainer';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition, IDynamicDataSource } from '@microsoft/sp-dynamic-data';
import { ISearchRefinersWebPartProps } from './ISearchRefinersWebPartProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import IRefinerSourceData from '../../models/IRefinerSourceData';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { SearchComponentType } from '../../models/SearchComponentType';
import RefinersLayoutOption from '../../models/RefinersLayoutOptions';
import { ISearchRefinersContainerProps } from './components/SearchRefinersContainer/ISearchRefinersContainerProps';
import ISearchResultSourceData from '../../models/ISearchResultSourceData';
import { DynamicDataService } from '../../services/DynamicDataService/DynamicDataService';
import IDynamicDataService from '../../services/DynamicDataService/IDynamicDataService';
import RefinerTemplateOption from '../../models/RefinerTemplateOption';
import RefinersSortOption from '../../models/RefinersSortOptions';

export default class SearchRefinersWebPart extends BaseClientSideWebPart<ISearchRefinersWebPartProps> implements IDynamicDataCallables {

  private _dynamicDataService: IDynamicDataService;
  private _selectedFilters: IRefinementFilter[] = [];
  private _searchResultSourceData: DynamicProperty<ISearchResultSourceData>;

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
    this._dynamicDataService = new DynamicDataService(this.context.dynamicDataProvider);
    this.ensureDataSourceConnection();

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
            type: CustomCollectionFieldType.string,
            placeholder: '\"RefinableStringXXX\", etc.'
          },
          {
            id: 'displayValue',
            title: strings.Refiners.RefinerDisplayValueField,
            type: CustomCollectionFieldType.string
          },
          {
            id: 'template',
            title: "Refiner template",
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
              }
            ]
          },
          {
            id: 'refinerSortType',
            title: strings.Refiners.Templates.RefinerSortTypeLabel,
            type: CustomCollectionFieldType.dropdown,
            options: [
              {
                key: RefinersSortOption.ByNumberOfResults,
                text: strings.Refiners.Templates.RefinerSortTypeByNumberOfResults
              },
              {
                key: RefinersSortOption.Alphabetical,
                text: strings.Refiners.Templates.RefinerSortTypeAlphabetical
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

        return config;
      });

    } else {

      // Default setup
      this.properties.refinersConfiguration = [
        {
          refinerName: "Created",
          displayValue: "Created Date",
          template: RefinerTemplateOption.CheckBox,
          refinerSortType: RefinersSortOption.ByNumberOfResults,
          showExpanded: false
        },
        {
          refinerName: "Size",
          displayValue: "Size of the file",
          template: RefinerTemplateOption.CheckBox,
          refinerSortType: RefinersSortOption.ByNumberOfResults,
          showExpanded: false
        },
        {
          refinerName: "owstaxidmetadataalltagsinfo",
          displayValue: "Tags",
          template: RefinerTemplateOption.CheckBox,
          refinerSortType: RefinersSortOption.ByNumberOfResults,
          showExpanded: false
        }
      ];
    }

    this.properties.selectedLayout = this.properties.selectedLayout ? this.properties.selectedLayout : RefinersLayoutOption.Vertical;
  }
}
