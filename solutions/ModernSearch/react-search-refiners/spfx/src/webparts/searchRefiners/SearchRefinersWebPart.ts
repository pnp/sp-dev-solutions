import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
  DynamicDataSharedDepth,
  PropertyPaneTextField,
  PropertyPaneToggle,
  IWebPartPropertiesMetadata
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchRefinersWebPartStrings';
import { IRefinementResult, IRefinementFilter } from '../../models/ISearchResult';
import IRefinerConfiguration from '../../models/IRefinerConfiguration';
import SearchRefiners from './components/SearchRefiners';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition, IDynamicDataAnnotatedPropertyValue } from '@microsoft/sp-dynamic-data';
import { ISearchRefinersWebPartProps } from './ISearchRefinersWebPartProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { DynamicDataService } from '../../services/DynamicDataService/DynamicDataService';
import IDynamicDataService from '../../services/DynamicDataService/IDynamicDataService';

//TODO: hide on first load (without results, only show after first query done)
export default class SearchRefinersWebPart extends BaseClientSideWebPart<ISearchRefinersWebPartProps> implements IDynamicDataCallables {
  private _selectedFilters: IRefinementFilter[];
  private _dynamicDataService: IDynamicDataService;

  public render(): void {
    let renderElement = null;

    if (!!this.properties.availableFilters.tryGetSource()
        && !!this.properties.refinersConfiguration.tryGetSource() 
        && !!this.properties.selectedFilters.tryGetSource())
    {
      let availableRefinersDataSourceValue = this._dynamicDataService.getDataSourceValues(this.context.dynamicDataProvider, this.properties.availableFilters, this.properties.availableFiltersSourceId, this.properties.availableFiltersPropertyId, this.properties.availableFiltersPropertyPath);
      let availableRefiners = (!availableRefinersDataSourceValue) ? [] : availableRefinersDataSourceValue;

      let selectedRefinersDataSourceValue = this._dynamicDataService.getDataSourceValues(this.context.dynamicDataProvider, this.properties.selectedFilters, this.properties.selectedFiltersSourceId, this.properties.selectedFiltersPropertyId, this.properties.selectedFiltersPropertyPath);
      let selectedRefiners = (!selectedRefinersDataSourceValue) ? [] : selectedRefinersDataSourceValue;

      let refinersConfigurationDataSourceValue = this._dynamicDataService.getDataSourceValues(this.context.dynamicDataProvider, this.properties.refinersConfiguration, this.properties.refinersConfigurationSourceId, this.properties.refinersConfigurationPropertyId, this.properties.refinersConfigurationPropertyPath);
      let refinersConfiguration = (!refinersConfigurationDataSourceValue) ? [] : refinersConfigurationDataSourceValue;

      renderElement = React.createElement(
        SearchRefiners,
        {
          webPartTitle: this.properties.webPartTitle,
          availableFilters: availableRefiners,
          refinersConfiguration: refinersConfiguration,
          selectedFilters: selectedRefiners,
          showBlank: this.properties.showBlank,
          displayMode: this.displayMode,
          onUpdateFilters: (filters: IRefinementFilter[]) => {
            this._selectedFilters = filters;
            this.context.dynamicDataSourceManager.notifyPropertyChanged("selectedFilters");
          }
        }
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

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
        'availableFilters': {
            dynamicPropertyType: 'array'
        },
        'selectedFilters': {
            dynamicPropertyType: 'array'
        },
        'refinersConfiguration': {
            dynamicPropertyType: 'array'
        }
    };
}

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
          id: 'selectedFilters',
          title: strings.SelectedFiltersLabel
      },
    ];
  }

  public getPropertyValue(propertyId: string): IRefinementFilter[] {
    switch (propertyId) {

      case 'selectedFilters':
          return this._selectedFilters;

      default:
          throw new Error('Bad property id');
    }
  }

  public getAnnotatedPropertyValue?(propertyId: string): IDynamicDataAnnotatedPropertyValue {
    switch (propertyId) {
      case 'selectedFilters':
          const selectedFiltersAnnotatedPropertyValue = {
              sampleValue: {

              },
              metadata: {

              }
          };
          return selectedFiltersAnnotatedPropertyValue;
      default:
          throw new Error('Bad property id');
    }
  }

  protected onInit(): Promise<void> {
    this._dynamicDataService = new DynamicDataService();

    if (this.properties.availableFiltersSourceId || this.properties.refinersConfigurationSourceId || this.properties.selectedFiltersSourceId) {
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
              groupName: strings.RefinerFiltersGroupName,
              groupFields: [
                PropertyPaneDynamicFieldSet({
                  label: 'Filters',
                  fields: [
                    PropertyPaneDynamicField('availableFilters', {
                      label: strings.AvailableFiltersLabel
                    }),
                    PropertyPaneDynamicField('refinersConfiguration', {
                      label: strings.RefinersConfiguration
                    }),
                    PropertyPaneDynamicField('selectedFilters', {
                      label: strings.SelectedFiltersLabel
                    })
                  ],
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.Source
                  }
                })
              ]
            }
          ]
        },
        {
          groups: [
            {
              groupName: strings.StylingSettingsGroupName,
              groupFields: [
                PropertyPaneTextField('webPartTitle', {
                    label: strings.WebPartTitle
                }),
                PropertyPaneToggle('showBlank', {
                    label: strings.ShowBlankLabel,
                    checked: this.properties.showBlank,
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string) {

    if (propertyPath.localeCompare('availableFilters') === 0 || propertyPath.localeCompare('refinersConfiguration') === 0 || propertyPath.localeCompare('selectedFilters') === 0) {

        // Update data source information
        this._saveDataSourceInfo();
    }
  }

      /**
    * Save the useful information for the connected data source. 
    * They will be used to get the value of the dynamic property if this one fails.
    */
   private _saveDataSourceInfo() {
    if (this.properties.availableFilters.tryGetSource()) {
        this.properties.availableFiltersSourceId = this.properties.availableFilters["_reference"]._sourceId;
        this.properties.availableFiltersPropertyId = this.properties.availableFilters["_reference"]._property;
        this.properties.availableFiltersPropertyPath = this.properties.availableFilters["_reference"]._propertyPath;
    } else {
        this.properties.availableFiltersSourceId = null;
        this.properties.availableFiltersPropertyId = null;
        this.properties.availableFiltersPropertyPath = null;
    }

    if (this.properties.refinersConfiguration.tryGetSource()) {
        this.properties.refinersConfigurationSourceId = this.properties.refinersConfiguration["_reference"]._sourceId;
        this.properties.refinersConfigurationPropertyId = this.properties.refinersConfiguration["_reference"]._property;
        this.properties.refinersConfigurationPropertyPath = this.properties.refinersConfiguration["_reference"]._propertyPath;
    } else {
        this.properties.refinersConfigurationSourceId = null;
        this.properties.refinersConfigurationPropertyId = null;
        this.properties.refinersConfigurationPropertyPath = null;
    }

    if (this.properties.selectedFilters.tryGetSource()) {
      this.properties.selectedFiltersSourceId = this.properties.selectedFilters["_reference"]._sourceId;
      this.properties.selectedFiltersPropertyId = this.properties.selectedFilters["_reference"]._property;
      this.properties.selectedFiltersPropertyPath = this.properties.selectedFilters["_reference"]._propertyPath;
    } else {
        this.properties.selectedFiltersSourceId = null;
        this.properties.selectedFiltersPropertyId = null;
        this.properties.selectedFiltersPropertyPath = null;
    }
  }
}
