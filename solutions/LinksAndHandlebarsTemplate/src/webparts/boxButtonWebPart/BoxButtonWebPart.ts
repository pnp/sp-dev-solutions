import "core-js/stable/array/from";
import "core-js/stable/array/fill";
import "core-js/stable/array/iterator";
import "core-js/stable/promise";
import "core-js/stable/reflect";
import "es6-map/implement";
//import "core-js/stable/symbol";
import "whatwg-fetch";

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneLink, PropertyPaneTextField, PropertyPaneCheckbox, PropertyPaneToggle, PropertyPaneButton, PropertyPaneButtonType, PropertyPaneLabel } from "@microsoft/sp-property-pane";
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Logger, LogLevel, ConsoleListener } from "@pnp/logging";

import styles from './components/BoxButtonWebPart.module.scss';
import * as strings from 'boxButtonWebPartStrings';
import BoxButton, { IBoxButtonProps } from './components/BoxButton';
import { SPFieldType, PropertyFieldCamlQueryOrderBy, SPFieldRequiredLevel, PropertyFieldCamlQueryFieldMapping } from '../../propertyPane/propertyFieldCamlQueryFieldMapping/PropertyFieldCamlQueryFieldMapping';
import { sp } from "@pnp/sp";
import QueryStringParser from "../../utilities/urlparser/queryStringParser";
import { WebPartLogger } from '../../utilities/webpartlogger/usagelogger';

const urlField = "URL";
const iconField = "Font Awesome Icon";
const isBlueField = "Has Blue Background";
const openNewTabField = "Open Link in New Tab";

export interface IBoxButton {
  name: string;
  url: string;
  icon: string;
  isBlue: boolean;
  openNew: boolean;
}

export interface IBoxButtonWebPartWebPartProps {
  name: string;
  fontAwesomeIcon: string;
  url: string;
  isThemed: boolean;
  newTab: boolean;
  data: IBoxButton[];
  title: string;
  usesListMode: boolean;
  advancedCamlQuery: string;
  advancedCamlData: string;
}

export default class BoxButtonWebPartWebPart extends BaseClientSideWebPart<IBoxButtonWebPartWebPartProps> {
  private LOG_SOURCE = "BoxButtonWebPartWebPart";

  constructor() {
    super();
  }

  public async onInit(): Promise<void> {
    //Initialize PnPLogger
    Logger.subscribe(new ConsoleListener());
    Logger.activeLogLevel = LogLevel.Info;

    //Initialize PnPJs
    let ie11Mode: boolean = (!!window.MSInputMethodContext && !!document["documentMode"]);
    sp.setup({ ie11: ie11Mode, spfxContext: this.context });

    SPComponentLoader.loadCss('https://use.fontawesome.com/releases/v5.14.0/css/all.css');

    const urls: string[] = [];
    if (this.properties.data) {
      this.properties.data.forEach(element => {
        if (element.url)
          urls.push(element.url);
      });
    }

    if (this.displayMode !== DisplayMode.Edit)
      WebPartLogger.logUsage(this.context, urls);
  }

  private _webpart: any;
  public get webpart(): any {
    return this._webpart;
  }
  public set webpart(v: any) {
    this._webpart = v;
  }

  private _activeIndex: number = -1;
  public get activeIndex(): number {
    return this._activeIndex;
  }
  public set activeIndex(v: number) {
    this._activeIndex = v;
  }

  public render(): void {
    try {
      // Copy properties from previous version if needed (??)
      if (!this.properties.data && this.properties.name) {
        this.properties.data = [{
          name: this.properties.name,
          isBlue: this.properties.isThemed,
          icon: this.properties.fontAwesomeIcon,
          url: this.properties.url,
          openNew: this.properties.newTab
        }];
        this.properties.name = undefined;
        this.properties.isThemed = undefined;
        this.properties.fontAwesomeIcon = undefined;
        this.properties.url = undefined;
        this.properties.newTab = undefined;
      }

      const props = this.properties;
      const propPaneRefresh = this.context.propertyPane.refresh;

      // Set up the BoxButtonWebPart component
      let elements = [];

      // Insert retired web part message
      if (this.displayMode == DisplayMode.Edit) {
        elements.push(React.createElement("div", { className: `${styles.editMode}` }, strings.RetiredMessage));
      }
      const element: React.ReactElement<IBoxButtonProps> = React.createElement(
        BoxButton,
        {
          name: this.properties.name,
          isThemed: this.properties.isThemed,
          fontAwesomeIcon: this.properties.fontAwesomeIcon,
          url: this.properties.url,
          newTab: this.properties.newTab,
          data: this.properties.data,
          title: this.properties.title,
          usesListMode: this.properties.usesListMode,
          advancedCamlQuery: this.properties.advancedCamlQuery,
          advancedCamlData: this.properties.advancedCamlData,
          links: [],
          isEdit: this.displayMode === DisplayMode.Edit,
          setTitle: (title: string) => {
            props.title = title;
          },
          // Callback from main component when user selects a new link
          setUrl: (name: string, url: string) => {
            // If there is no active index, add a new link at the top and make it active
            if (this.activeIndex === -1) {
              this.properties.data.push({
                name: name,
                isBlue: false,
                icon: "",
                url: "",
                openNew: false
              });
              this.activeIndex = 0;
            }

            // Figure out if it's a document
            var isDoc = false;
            const docExtensions = ["pdf", "xls", "xlsx", "doc", "docx", "ppt", "pptx", "pptm", "dot"];
            for (const ext of docExtensions) {
              if (url.indexOf(ext, url.length - ext.length) !== -1)
                isDoc = true;
            }

            if (name) {
              props.data[this.activeIndex].name =
                name.split('.')[0].replace('-', ' ').replace('_', ' ');
            }

            // In the "data" (array of links) adjust the URL to use OWA if it's a document
            props.data[this.activeIndex].url = url + (isDoc ? "?web=1" : "");
            // If the property pane isn't already open, open it and refresh it
            if (!this.context.propertyPane.isRenderedByWebPart())
              this.context.propertyPane.open();
            propPaneRefresh();
          },
          // Called when user clicks edit on a link in BoxButtonWebPart
          editItem: (index: number) => {
            if (index === -1) {
              this.properties.data.push({
                name: strings.TitlePlaceholder,
                isBlue: false,
                icon: "",
                url: "",
                openNew: false
              });
              index = this.properties.data.length - 1;
            }
            this.activeIndex = index;
            this.context.propertyPane.open();
          },
          // Called when user clicks delete on a link in BoxButtonWebPart
          deleteItem: (index: number) => {
            this.properties.data.splice(index, 1);
            this.render();
          },
          // Called when a user rearranges links in BoxButtonWebPart
          rearrangeItems: (newOrder: number[]) => {
            const newArr = [];
            for (const num of newOrder)
              newArr.push(this.properties.data[num]);
            this.properties.data.length = 0;
            for (const val of newArr)
              this.properties.data.push(val);
            this.render();
          },
          context: this.context
        }
      );

      // OK we have the BoxButtonWebPart component
      // If we're in List mode, read the list
      if (this.properties.usesListMode) {
        const propData = this.properties.advancedCamlData ? JSON.parse(this.properties.advancedCamlData) : { fieldMappings: [], selectedList: {} };
        if (propData.selectedList.id) {
          sp.web.lists.getById(propData.selectedList.id).getItemsByCAMLQuery({ ViewXml: QueryStringParser.ReplaceQueryStringParameters(this.properties.advancedCamlQuery) }).then((response: any[]) => {
            response.forEach(value => {
              const link = {};
              propData.fieldMappings.forEach(mapping => {
                switch (mapping.type) {
                  case SPFieldType.URL:
                    link[mapping.name] = value[mapping.mappedTo] ? value[mapping.mappedTo]["Url"] : null;
                    link[mapping.name + "_text"] = value[mapping.mappedTo] ? value[mapping.mappedTo]["Description"] : null;
                    break;
                  default:
                    link[mapping.name] = value[mapping.mappedTo];
                    break;
                }
              });
              if (link[urlField] !== null)
                element.props.links.push(link);
            });
            // TODO: Return from ReactDom.render has a race condition
            // Switch to a function ref
            elements.push(element);
            this.webpart = ReactDom.render(elements, this.domElement);
          }).catch((error) => { });
        }
      }
      else {
        // Not in list mode, just render the BoxButtonWebPart
        // TODO: Return from ReactDom.render has a race condition
        // Switch to a function ref
        elements.push(element);
        this.webpart = ReactDom.render(elements, this.domElement);
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (onInit)`, LogLevel.Error);
      return null;
    }
  }

  public setTitle(title: string) {
    this.properties.title = title;
  }

  // onClick of "Change" button in classic editing panel
  private openLinkSelector = (event): void => {
    this.webpart.openLinkPicker(event);
  }

  private itemValidation = (length: number, required: boolean, errorText: string, value: string): string => {
    let retVal: string = "";

    if (value.length > length) {
      retVal = errorText;
    }
    else if (required && value.length < 1) {
      retVal = strings.RequiredValueErrorText;
    }
    return retVal;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if (this.context.propertyPane.isRenderedByWebPart()) return this.getEditItemPropertyPane();
    return this.getBasicPropertyPane();
  }

  // Property pane for List mode
  public getBasicPropertyPane(): IPropertyPaneConfiguration {
    let retVal: IPropertyPaneConfiguration = { pages: [] };

    try {
      retVal = {
        pages: [
          {
            header: {
              description: ''//strings.PropertyPaneBaseDescription
            },
            groups: [
              {
                groupName: strings.AdvancedListModeGroupLabel,
                isCollapsed: !this.properties.usesListMode,
                groupFields: [
                  PropertyPaneToggle('usesListMode', {
                    label: strings.AdvancedEnableListModeLabel,
                    onText: strings.EditItemColorOnLabel,
                    offText: strings.EditItemColorOffLabel
                  }),
                  PropertyPaneLabel('listModeInfo', {
                    text: strings.AdvancedEnableListModeInfo
                  }),
                  PropertyFieldCamlQueryFieldMapping('advancedCamlQuery', {
                    label: "",
                    dataPropertyPath: 'advancedCamlData',
                    query: this.properties.advancedCamlQuery,
                    fieldMappings: [
                      { name: urlField, type: SPFieldType.URL, requiredLevel: SPFieldRequiredLevel.Required },
                      { name: iconField, type: SPFieldType.Text, requiredLevel: SPFieldRequiredLevel.Required },
                      { name: isBlueField, type: SPFieldType.Boolean, requiredLevel: SPFieldRequiredLevel.Required },
                      { name: openNewTabField, type: SPFieldType.Boolean, requiredLevel: SPFieldRequiredLevel.Required }
                    ],
                    createFields: [
                      '<Field ID="{c29e077d-f466-4d8e-8bbe-72b66c5f205c}" Name="URL" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="URL" Group="Base Columns" Type="URL" DisplayName="URL" Required="TRUE"/>',
                      '<Field Type="Text" DisplayName="FontAwesomeIcon" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" MaxLength="255" Group="Web Part Columns" ID="{6df0c002-e0f6-4801-aa83-b7a5bb80f0f4}" SourceID="{a5df0f41-264b-4bf8-a651-222fcdf5d32d}" StaticName="FontAwesomeIcon" Name="FontAwesomeIcon" Version="5" />',
                      '<Field Type="Number" DisplayName="SortOrder" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Group="Web Part Columns" ID="{7a911a9e-dbe1-4a87-bd40-c042db929a80}" SourceID="{a5df0f41-264b-4bf8-a651-222fcdf5d32d}" StaticName="SortOrder" Name="SortOrder" Version="5" />',
                      '<Field Type="Boolean" DisplayName="HasBlueBackground" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Group="Web Part Columns" ID="{f9ba1903-e7be-42cd-843e-f898d4c1fcb4}" SourceID="{f9ba1903-e7be-42cd-843e-f898d4c1fcb4}" StaticName="HasBlueBackground" Name="HasBlueBackground" Version="5" />',
                      '<Field Type="Boolean" DisplayName="OpenLinkinNewTab" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Group="Web Part Columns" ID="{4bf7c60f-0737-49c9-894c-6a31af134242}" SourceID="{4bf7c60f-0737-49c9-894c-6a31af134242}" StaticName="OpenLinkInNewTab" Name="OpenLinkInNewTab" Version="5" />'
                    ],
                    createTitleRequired: false,
                    includeHidden: false,
                    orderBy: PropertyFieldCamlQueryOrderBy.Title,
                    showOrderBy: true,
                    showFilters: true,
                    showMax: false,
                    showCreate: true,
                    render: this.render.bind(this),
                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                    context: this.context,
                    properties: this.properties,
                    disabled: !this.properties.usesListMode,
                    onGetErrorMessage: null,
                    deferredValidationTime: 0,
                    key: 'spListQueryFieldId'
                  })
                ]
              }
            ],
            displayGroupsAsAccordion: true
          }
        ]
      };
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (getBasicPropertyPane)`, LogLevel.Error);
    }
    return retVal;
  }

  // Property pane for editing an item in non-List mode
  public getEditItemPropertyPane(): IPropertyPaneConfiguration {
    let retVal: IPropertyPaneConfiguration = { pages: [] };

    try {
      retVal = {
        pages: [
          {
            header: {
              description: ""
            },
            displayGroupsAsAccordion: true,
            groups: [
              {
                groupName: strings.EditItemGeneralLabel,
                groupFields: [
                  PropertyPaneTextField("data[" + this.activeIndex + "].name", {
                    label: strings.EditItemGeneralTitleLabel,
                    description: strings.EditItemGeneralTitlePreCountLabel + (40 - this.properties.data[this.activeIndex].name.length) + strings.EditItemGeneralTitlePostCountLabel,
                    onGetErrorMessage: (value) => { return this.itemValidation(40, true, strings.EditItemGeneralTitleErrorText, value); }
                  }),
                  PropertyPaneLabel("itemLinkLabel", {
                    text: strings.EditItemGeneralSelectLinkLabel
                  }),
                  PropertyPaneLink("data[" + this.activeIndex + "].url", {
                    target: "_blank",
                    href: this.properties.data[this.activeIndex].url,
                    text: this.properties.data[this.activeIndex].url
                  }),
                  PropertyPaneButton("itemChangeLink", {
                    text: strings.EditItemGeneralSelectLinkButtonText,
                    buttonType: PropertyPaneButtonType.Primary,
                    onClick: this.openLinkSelector
                  }),
                  PropertyPaneCheckbox("data[" + this.activeIndex + "].openNew", {
                    text: strings.EditItemGeneralOpenTabLabel
                  })
                ]
              },
              {
                groupName: strings.EditItemIconLabel,
                groupFields: [
                  PropertyPaneTextField("data[" + this.activeIndex + "].icon", {
                    label: strings.EditItemIconEntryLabel,
                    placeholder: strings.EditItemIconEntryPlaceholder
                  }),
                  PropertyPaneLink('iconShortcut', {
                    text: strings.EditItemIconEntryLinkText,
                    href: "https://fontawesome.com/icons?d=gallery&m=free",
                    target: "blank"
                  })
                ]
              },
              {
                groupName: strings.EditItemColorLabel,
                groupFields: [
                  PropertyPaneToggle("data[" + this.activeIndex + "].isBlue", {
                    label: strings.EditItemColorFieldLabel,
                    onText: strings.EditItemColorOnLabel,
                    offText: strings.EditItemColorOffLabel
                  })
                ]
              }
            ]
          }
        ]
      };
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (getEditItemPropertyPane)`, LogLevel.Error);
    }
    return retVal;
  }
}
