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
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as strings from 'SearchRefinersWebPartStrings';
import { IRefinementFilter } from '../../models/ISearchResult';
import SearchRefiners from './components/SearchRefinersContainer/SearchRefinersContainer';
import { IDynamicDataCallables, IDynamicDataPropertyDefinition, IDynamicDataAnnotatedPropertyValue } from '@microsoft/sp-dynamic-data';
import { ISearchRefinersWebPartProps } from './ISearchRefinersWebPartProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { DynamicDataService } from '../../services/DynamicDataService/DynamicDataService';
import IDynamicDataService from '../../services/DynamicDataService/IDynamicDataService';
import IRefinerConfiguration from '../../models/IRefinerConfiguration';

export default class SearchRefinersWebPart extends BaseClientSideWebPart<ISearchRefinersWebPartProps> implements IDynamicDataCallables {
  private _appliedRefiners: IRefinementFilter[] = [];
  private _dynamicDataService: IDynamicDataService;

  public render(): void {
    let renderElement = null;

    if (!!this.properties.availableRefiners.tryGetSource())
    {
      let availableRefinersDataSourceValue = this._dynamicDataService.getDataSourceValues(this.context.dynamicDataProvider, this.properties.availableRefiners, this.properties.availableRefinersSourceId, this.properties.availableRefinersPropertyId, this.properties.availableRefinersPropertyPath);
      let availableRefiners = (!availableRefinersDataSourceValue) ? [] : availableRefinersDataSourceValue;

      renderElement = React.createElement(
        SearchRefiners,
        {
          webPartTitle: this.properties.webPartTitle,
          availableRefiners: availableRefiners,
          refinersConfiguration: this.properties.refinersConfiguration,
          showBlank: this.properties.showBlank,
          displayMode: this.displayMode,
          onUpdateFilters: (appliedRefiners: IRefinementFilter[]) => {
            this._appliedRefiners = appliedRefiners;
            this.context.dynamicDataSourceManager.notifyPropertyChanged("appliedRefiners");
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
        'availableRefiners': {
            dynamicPropertyType: 'array'
        }
    };
  }

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
          id: 'appliedRefiners',
          title: strings.AppliedRefinersLabel
      },
      {
        id: 'refinersConfiguration',
        title: strings.RefinersConfiguration
      },
    ];
  }

  public getPropertyValue(propertyId: string): IRefinementFilter[] | IRefinerConfiguration[] {
    switch (propertyId) {

      case 'appliedRefiners':
          return this._appliedRefiners;
      case 'refinersConfiguration':
          return this.properties.refinersConfiguration;
      default:
          throw new Error('Bad property id');
    }
  }

  public getAnnotatedPropertyValue?(propertyId: string): IDynamicDataAnnotatedPropertyValue {
    switch (propertyId) {
      case 'appliedRefiners':
          const appliedRefinersAnnotatedPropertyValue = {
              sampleValue: {

              },
              metadata: {

              }
          };
          return appliedRefinersAnnotatedPropertyValue;
      case 'refinersConfiguration':
          const refinersConfigurationAnnotatedPropertyValue = {
              sampleValue: {

              },
              metadata: {

              }
          };
          return refinersConfigurationAnnotatedPropertyValue;
      default:
          throw new Error('Bad property id');
    }
  }

  protected onInit(): Promise<void> {
    this._initializeRequiredProperties();

    this._dynamicDataService = new DynamicDataService();

    if (this.properties.availableRefinersSourceId) {
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
              groupName: strings.RefinersConfigurationGroupName,
              groupFields: [
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
                      }
                  ]
                }),
                PropertyPaneDynamicFieldSet({
                  label: strings.Refiners.AvailableRefinersLabel,
                  fields: [
                    PropertyPaneDynamicField('availableRefiners', {
                      label: strings.AvailableRefinersLabel
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

    if (propertyPath.localeCompare('availableRefiners') === 0) {
        // Update data source information
        this._saveDataSourceInfo();
    }

    if (propertyPath.localeCompare('refinersConfiguration') === 0) {
      this.context.dynamicDataSourceManager.notifyPropertyChanged("refinersConfiguration");
    }
  }

    /**
  * Save the useful information for the connected data source. 
  * They will be used to get the value of the dynamic property if this one fails.
  */
  private _saveDataSourceInfo() {
    if (this.properties.availableRefiners.tryGetSource()) {
        this.properties.availableRefinersSourceId = this.properties.availableRefiners["_reference"]._sourceId;
        this.properties.availableRefinersPropertyId = this.properties.availableRefiners["_reference"]._property;
        this.properties.availableRefinersPropertyPath = this.properties.availableRefiners["_reference"]._propertyPath;
    } else {
        this.properties.availableRefinersSourceId = null;
        this.properties.availableRefinersPropertyId = null;
        this.properties.availableRefinersPropertyPath = null;
    }
  }

  /**
   * Initializes the Web Part required properties if there are not present in the manifest (i.e. during an update scenario)
   */
  private _initializeRequiredProperties() {

    if(<any>this.properties.refinersConfiguration === "") {
        this.properties.refinersConfiguration = [];
    }

    this.properties.refinersConfiguration = Array.isArray(this.properties.refinersConfiguration) ? this.properties.refinersConfiguration : [
        {
            refinerName: "Created",
            displayValue: "Created Date"
        },
        {
            refinerName: "Size",
            displayValue: "Size of the file"
        },
        {
            refinerName: "owstaxidmetadataalltagsinfo",
            displayValue: "Tags"
        }
    ];
  }
}
