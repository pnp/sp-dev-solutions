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

//TODO: hide on first load (without results, only show after first query done)
export default class SearchRefinersWebPart extends BaseClientSideWebPart<ISearchRefinersWebPartProps> implements IDynamicDataCallables {
  private _selectedFilters: IRefinementFilter[];

  public render(): void {
    let renderElement = null;

    if (this.properties.availableFilters.tryGetSource() && this.properties.refinersConfiguration.tryGetSource() && this.properties.selectedFilters.tryGetSource()) {
      const availableRefiners:IRefinementResult[] = this.properties.availableFilters.tryGetValues() as any;
      const selectedRefiners:IRefinementFilter[] = this.properties.selectedFilters.tryGetValues() as any;
      const refinersConfiguration:IRefinerConfiguration[] = this.properties.refinersConfiguration.tryGetValues() as any;

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

  public getAnnotatedPropertyValue?(propertyId: string): IDynamicDataAnnotatedPropertyValue { //TODO
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
}
