import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchPaginationWebPartStrings';
import SearchPagination from './components/SearchPaginationContainer/SearchPaginationContainer';
import { ISearchPaginationWebPartProps } from './ISearchPaginationWebPartProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition, IDynamicDataSource } from '@microsoft/sp-dynamic-data';
import { DynamicProperty } from '@microsoft/sp-component-base';
import ISearchResultSourceData from '../../models/ISearchResultSourceData';
import { SearchComponentType } from '../../models/SearchComponentType';
import { IPaginationInformation } from '../../models/ISearchResult';
import IPaginationSourceData from '../../models/IPaginationSourceData';

export default class SearchPaginationWebPart extends BaseClientSideWebPart<ISearchPaginationWebPartProps> implements IDynamicDataCallables {
  private _currentPage: number = 1;
  private _pageInformation: DynamicProperty<ISearchResultSourceData>;

  public render(): void {
    let renderElement = null;
    let searchPagination: IPaginationInformation = null;

    if (this.properties.searchResultsDataSourceReference) {

      // If the dynamic property exists, it means the Web Part ins connected to a search results Web Part
      if (this._pageInformation) {
        const searchResultSourceData: ISearchResultSourceData = this._pageInformation.tryGetValue();

        if (searchResultSourceData) {
          searchPagination = searchResultSourceData.paginationInformation;
        }
      }      

      if (searchPagination)
      {
        this._currentPage = searchPagination.CurrentPage;
        renderElement = React.createElement(
          SearchPagination,
          {
            totalItems: searchPagination.TotalRows,
            itemsCountPerPage: searchPagination.MaxResultsPerPage,
            onPageUpdate: (page: number) => {
              this._currentPage = page;
              this.context.dynamicDataSourceManager.notifyPropertyChanged(SearchComponentType.PaginationWebPart);
            },
            currentPage: this._currentPage
          }
        );
      }
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

  private _setupWebPart() {
    this.context.propertyPane.open();
  }

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {

    // Use the Web Part title as property title since we don't expose sub properties
    return [
      {
        id: SearchComponentType.PaginationWebPart,
        title: this.title
      }
    ];
  }

  public getPropertyValue(propertyId: string): IPaginationSourceData {
    switch (propertyId) {

      case SearchComponentType.PaginationWebPart:
        return { 
          selectedPage: this._currentPage,
        } as IPaginationSourceData;
      default:
          throw new Error('Bad property id');
    }
  }

  protected onInit(): Promise<void> {
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.PaginationConfigurationGroupName,
              groupFields: [
                PropertyPaneDropdown('searchResultsDataSourceReference', {
                  options: this.getAvailableDataSourcesByType(SearchComponentType.SearchResultsWebPart),
                  label: strings.ConnectToSearchResultsLabel
                })
              ]
            }
          ],
          displayGroupsAsAccordion: false
        }
      ]
    };
  }

  /**
  * Get available data sources on the page with specific property Id
  */
  private getAvailableDataSourcesByType(propertyId: string): IPropertyPaneDropdownOption[] {

    const sourceOptions: IPropertyPaneDropdownOption[] =
        this.context.dynamicDataProvider.getAvailableSources().map(source => {
            return {
                key: source.id,
                text: source.metadata.title,
                instanceId: source.metadata.instanceId
        };
    });

    let propertyOptions: IPropertyPaneDropdownOption[] = [];

    sourceOptions.map((sourceInfo) => {
        const source: IDynamicDataSource = this.context.dynamicDataProvider.tryGetSource(sourceInfo.key.toString());
        if (source) {
            source.getPropertyDefinitions().map(prop => {
                if (prop.id === propertyId) {

                    // The prop title should be the Web Part title here
                    propertyOptions.push({
                        key: `${source.id}:${prop.id}`,
                        text: prop.title
                    });
                }
            });
        }
    });

    return propertyOptions;
  }

  /**
   * Make sure the dynamic property is correctly connected to the source if a search results component has been selected in options 
   */
  private ensureDataSourceConnection() {

    if (this.properties.searchResultsDataSourceReference) {

      // Register the data source manually since we don't want user select properties manually
      if (!this._pageInformation) {
        this._pageInformation = new DynamicProperty<ISearchResultSourceData>(this.context.dynamicDataProvider);
      }

      this._pageInformation.setReference(this.properties.searchResultsDataSourceReference);
      this._pageInformation.register(this.render);
      
    } else {
      if (this._pageInformation) {
        this._pageInformation.unregister(this.render);
      }
    }
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string) {

    if (propertyPath.localeCompare('searchResultsDataSourceReference') === 0) {
      this.ensureDataSourceConnection();
    }
  }
}
