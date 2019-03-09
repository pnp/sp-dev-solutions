import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  DynamicDataSharedDepth,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
  IWebPartPropertiesMetadata
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchPaginationWebPartStrings';
import SearchPagination from './components/SearchPaginationContainer/SearchPaginationContainer';
import { ISearchPaginationWebPartProps } from './ISearchPaginationWebPartProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import IDynamicDataService from '../../services/DynamicDataService/IDynamicDataService';
import { DynamicDataService } from '../../services/DynamicDataService/DynamicDataService';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition, IDynamicDataAnnotatedPropertyValue } from '@microsoft/sp-dynamic-data';

export default class SearchPaginationWebPart extends BaseClientSideWebPart<ISearchPaginationWebPartProps> implements IDynamicDataCallables {
  private _dynamicDataService: IDynamicDataService;
  private _currentPage: number = 1;

  public render(): void {
    let renderElement = null;

    if (!!this.properties.searchPagination.tryGetSource() 
        && this.properties.searchPaginationPropertyPath
      )
    {
      let searchPagination = this._dynamicDataService.getDataSourceValue(this.context.dynamicDataProvider, this.properties.searchPagination, this.properties.searchPaginationSourceId, this.properties.searchPaginationPropertyId, this.properties.searchPaginationPropertyPath);

      if (searchPagination)
      {
        renderElement = React.createElement(
          SearchPagination,
          {
            totalItems: searchPagination.TotalRows,
            itemsCountPerPage: searchPagination.MaxResultsPerPage,
            onPageUpdate: (page: number) => {
              this._currentPage = page;
              this.context.dynamicDataSourceManager.notifyPropertyChanged("currentPage");
            },
            currentPage: searchPagination.CurrentPage
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

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
        'searchPagination': {
          dynamicPropertyType: 'object'
        }
    };
  }

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
          id: 'currentPage',
          title: strings.CurrentPageLabel
      }
    ];
  }

  public getPropertyValue(propertyId: string): number {
    switch (propertyId) {

      case 'currentPage':
          return this._currentPage;
      default:
          throw new Error('Bad property id');
    }
  }

  public getAnnotatedPropertyValue?(propertyId: string): IDynamicDataAnnotatedPropertyValue {
    switch (propertyId) {
      case 'currentPage':
          const annotatedPropertyValue = {
              sampleValue: {

              },
              metadata: {

              }
          };
          return annotatedPropertyValue;
      default:
          throw new Error('Bad property id');
    }
  }

  protected onInit(): Promise<void> {
    this._dynamicDataService = new DynamicDataService();

    if (this.properties.searchPaginationSourceId) {
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
                PropertyPaneDynamicFieldSet({
                  label: strings.SearchResultsLabel,
                  fields: [
                    PropertyPaneDynamicField('searchPagination', {
                      label: strings.SearchPaginationLabel
                    })
                  ],
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.Source
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string) {

    if (propertyPath.localeCompare('searchPagination') === 0) {
        // Update data source information
        this._saveDataSourceInfo();
    }
  }

  /**
  * Save the useful information for the connected data source. 
  * They will be used to get the value of the dynamic property if this one fails.
  */
  private _saveDataSourceInfo() {
    if (this.properties.searchPagination.tryGetSource()) {
        this.properties.searchPaginationSourceId = this.properties.searchPagination["_reference"]._sourceId;
        this.properties.searchPaginationPropertyId = this.properties.searchPagination["_reference"]._property;
        this.properties.searchPaginationPropertyPath = this.properties.searchPagination["_reference"]._propertyPath;
    } else {
        this.properties.searchPaginationSourceId = null;
        this.properties.searchPaginationPropertyId = null;
        this.properties.searchPaginationPropertyPath = null;
    }
  }
}
