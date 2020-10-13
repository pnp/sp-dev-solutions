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
import { IPropertyPaneConfiguration, PropertyPaneButton, PropertyPaneButtonType, PropertyPaneCheckbox, PropertyPaneChoiceGroup, PropertyPaneLabel, PropertyPaneLink, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";

import * as strings from 'featuredContentWebPartStrings';
import FeaturedContent, { IFeaturedContentProps } from './components/FeaturedContent';
import { PropertyFieldCamlQueryFieldMapping, SPFieldType, SPFieldRequiredLevel, PropertyFieldCamlQueryOrderBy } from '../../propertyPane/propertyFieldCamlQueryFieldMapping/PropertyFieldCamlQueryFieldMapping';
import { sp } from "@pnp/sp";
import { PropertyPaneRichText } from '../../propertyPane/propertyFieldRichText/PropertyFieldRichText';
import { PropertyPaneImageSelector, ImageDisplayType } from "../../propertyPane/propertyFieldImageSelector/PropertyFieldImageSelector";
import QueryStringParser from "../../utilities/urlparser/queryStringParser";
import { WebPartLogger } from '../../utilities/webpartlogger/usagelogger';
import { FeaturedContentLayout } from "./components/layouts/FeaturedContentFactory";

const titleOnlyImage = require('./assets/title-only.svg');
const titleDescImage = require('./assets/title-desc.svg');
const stackedImage = require('./assets/stacked.svg');
const altStackImage = require('./assets/alt-stack.svg');

const urlField = "URL";
const imageField = "Image";
const descriptionField = "Description";
const openNewTabField = "NewTab";
const contentField = "Content";


export interface IFeaturedItem {
  Image: string;
  ImageAlternate: string;
  Title: string;
  URL: string;
  NewTab: boolean;
  Description: string;
  Content: string;
  PreviewImageUrl: string;
  CustomImageUrl: string;
  ImageMode: ImageDisplayType;
}

export interface IFeaturedContentWebPartProps {
  featuredContentItems: IFeaturedItem[];
  title: string;
  usesListMode: boolean;
  advancedCamlQuery: string;
  advancedCamlData: string;
  layoutMode: FeaturedContentLayout;
}

export default class FeaturedContentWebPart extends BaseClientSideWebPart<IFeaturedContentWebPartProps> {

  constructor() {
    super();
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }

  public async onInit(): Promise<void> {
    //Initialize PnPJs
    let ie11Mode: boolean = (!!window.MSInputMethodContext && !!document["documentMode"]);
    sp.setup({ ie11: ie11Mode, spfxContext: this.context });

    const urls: string[] = [];

    if (this.properties.featuredContentItems) {
      this.properties.featuredContentItems.forEach(element => {
        if (element.CustomImageUrl)
          urls.push(element.CustomImageUrl);
        if (element.PreviewImageUrl)
          urls.push(element.PreviewImageUrl);
        if (element.URL)
          urls.push(element.URL);
        if (element.Image)
          urls.push(element.Image);
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
    this.properties.featuredContentItems.forEach(el => {
      if (el.Content === undefined) {
        el.Content = "";
      }
      if (el.ImageMode === undefined) {
        el.ImageMode = ImageDisplayType.Auto;
      }
    });

    const element: React.ReactElement<IFeaturedContentProps> = React.createElement(
      FeaturedContent,
      {
        featuredContentItems: this.properties.featuredContentItems,
        title: this.properties.title,
        isEdit: this.displayMode === DisplayMode.Edit,
        layoutMode: this.properties.layoutMode,
        usesListMode: this.properties.usesListMode,
        advancedCamlData: this.properties.advancedCamlData,
        advancedCamlQuery: this.properties.advancedCamlQuery,
        links: [],
        context: this.context,
        setTitle: this.setTitle.bind(this),
        setUrl: this.setUrl.bind(this),
        editItem: this.editBasicItem.bind(this),
        deleteItem: this.deleteBasicItem.bind(this),
        rearrangeItems: this.rearrangeBasicItems.bind(this),
        resetActiveIndex: this.resetIndex.bind(this),
        displayMode: this.displayMode
      }
    );

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
          element.props.links.forEach((v, i, a) => {
            if (v[imageField].substr(0, this.context.pageContext.web.absoluteUrl.length) === this.context.pageContext.web.absoluteUrl && v[imageField].indexOf("getpreview.ashx") === -1) {
              v[imageField] = this.context.pageContext.web.serverRelativeUrl + "/_layouts/15/getpreview.ashx?resolution=0&clientMode=modernWebPart&path=" + encodeURIComponent(v[imageField]);
            }
          });

          this.webpart = ReactDom.render(element, this.domElement);
        }).catch((error) => { });
      }
    }
    else {
      this.webpart = ReactDom.render(element, this.domElement);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public openLinkSelector(event) {
    this.webpart.openLinkPicker(event);
  }

  public itemValidation(length: number, required: boolean, errorText: string, value: string): Promise<string> {
    return new Promise<string>((resolve: (validationMessage: string) => void) => {
      if (value.length > length) {
        resolve(errorText);
      }
      else if (required && value.length < 1) {
        resolve(strings.RequiredValueErrorText);
      }
      else {
        resolve("");
      }
    });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if (this.context.propertyPane.isRenderedByWebPart()) return this.getEditItemPropertyPane();
    return this.getWebPartPropertyPane();
  }

  public getWebPartPropertyPane(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: ''
          },
          groups: [
            {
              groupName: strings.LayoutLabel,
              groupFields: [
                PropertyPaneChoiceGroup("layoutMode", {
                  label: strings.LayoutSelectorLabel,
                  options: [
                    {
                      checked: this.properties.layoutMode === FeaturedContentLayout.HorizontalTitleOnly,
                      key: FeaturedContentLayout.HorizontalTitleOnly,
                      imageSrc: titleOnlyImage.toString(),
                      selectedImageSrc: titleOnlyImage.toString(),
                      imageSize: { height: 32, width: 32 },
                      text: strings.TitleOnlyLabel
                    },
                    {
                      checked: this.properties.layoutMode === FeaturedContentLayout.HorizontalTitleAndDescription,
                      key: FeaturedContentLayout.HorizontalTitleAndDescription,
                      imageSrc: titleDescImage.toString(),
                      imageSize: { height: 32, width: 32 },
                      selectedImageSrc: titleDescImage.toString(),
                      text: strings.TitleDescriptionLabel
                    },
                    {
                      checked: this.properties.layoutMode === FeaturedContentLayout.Vertical,
                      key: FeaturedContentLayout.Vertical,
                      imageSrc: stackedImage.toString(),
                      imageSize: { height: 32, width: 32 },
                      selectedImageSrc: stackedImage.toString(),
                      text: strings.StackedLabel
                    },
                    {
                      checked: this.properties.layoutMode === FeaturedContentLayout.VerticalAlternating,
                      key: FeaturedContentLayout.VerticalAlternating,
                      imageSrc: altStackImage.toString(),
                      imageSize: { height: 32, width: 32 },
                      selectedImageSrc: altStackImage.toString(),
                      text: strings.AltStackedLabel
                    }
                  ]
                })
              ]
            },
            {
              groupName: strings.AdvancedListModeGroupLabel,
              isCollapsed: !this.properties.usesListMode,
              groupFields: [
                PropertyPaneToggle('usesListMode', {
                  label: strings.AdvancedEnableListModeLabel,
                  onText: strings.OnLabel,
                  offText: strings.OffLabel
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
                    { name: imageField, type: SPFieldType.URL, requiredLevel: SPFieldRequiredLevel.Required },
                    { name: descriptionField, type: SPFieldType.Text, requiredLevel: SPFieldRequiredLevel.Required },
                    { name: contentField, type: SPFieldType.Text, requiredLevel: SPFieldRequiredLevel.Required },
                    { name: openNewTabField, type: SPFieldType.Boolean, requiredLevel: SPFieldRequiredLevel.Required }
                  ],
                  createFields: [
                    '<Field ID="{c29e077d-f466-4d8e-8bbe-72b66c5f205c}" Name="URL" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="URL" Group="Base Columns" Type="URL" DisplayName="URL" Required="TRUE"/>',
                    '<Field Type="Text" DisplayName="Description" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" MaxLength="255" Group="Web Part Columns" ID="{6df0c033-e0f6-4801-aa83-b7a5bb80f0f4}" SourceID="{a5df0f33-264b-4bf8-a651-222fcdf5d32d}" StaticName="Description" Name="Description" Version="5" />',
                    '<Field Type="Note" DisplayName="Content" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" NumLines="6" RichText="TRUE" RichTextMode="FullHtml" IsolateStyles="TRUE" Sortable="FALSE" ID="{24f71f35-b1ad-43dc-8ad7-56faddad0870}" SourceID="{11fc90a7-6fab-44ff-87ca-f7ac20b3bc50}" StaticName="Content" Name="Content" ColName="ntext2" RowOrdinal="0" Version="1" />',
                    '<Field Type="Number" DisplayName="SortOrder" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Group="Web Part Columns" ID="{7a911a9e-dbe1-4a87-bd40-c042db929a80}" SourceID="{a5df0f41-264b-4bf8-a651-222fcdf5d32d}" StaticName="SortOrder" Name="SortOrder" Version="5" />',
                    '<Field Type="URL" DisplayName="Image" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Group="Web Part Columns" ID="{f9ba1903-e722-42cd-843e-f898d4c1fcb4}" SourceID="{f9ba1903-e722-42cd-843e-f898d4c1fcb4}" StaticName="Image" Name="Image" Version="5" />',
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
  }

  public getEditItemPropertyPane(): IPropertyPaneConfiguration {
    return {
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
                PropertyPaneTextField("featuredContentItems[" + this.activeIndex + "].Title", {
                  label: strings.EditItemGeneralTitleLabel,
                  description: strings.EditItemGeneralTitlePreCountLabel + (80 - this.properties.featuredContentItems[this.activeIndex].Title.length) + strings.EditItemGeneralTitlePostCountLabel,
                  onGetErrorMessage: this.itemValidation.bind(this, 80, true, strings.EditItemGeneralTitleErrorText)
                }),
                PropertyPaneTextField("featuredContentItems[" + this.activeIndex + "].Description", {
                  label: strings.EditItemGeneralDescriptionLabel,
                  description: strings.EditItemGeneralDescriptionPreCountLabel + (130 - (this.properties.featuredContentItems[this.activeIndex].Description ? this.properties.featuredContentItems[this.activeIndex].Description.length : 0)) + strings.EditItemGeneralDescriptionPostCountLabel,
                  onGetErrorMessage: this.itemValidation.bind(this, 130, false, strings.EditItemGeneralDescriptionErrorText)
                }),
                PropertyPaneRichText("featuredContentItems[" + this.activeIndex + "].Content", {
                  label: strings.EditItemGeneralContentLabel,
                  properties: this.properties,
                  onChange: this.onContentChange.bind(this)
                }),
                PropertyPaneLabel("itemLinkLabel", {
                  text: strings.EditItemGeneralSelectLinkLabel
                }),
                PropertyPaneLink("featuredContentItems[" + this.activeIndex + "].URL", {
                  target: "_blank",
                  href: this.properties.featuredContentItems[this.activeIndex].URL,
                  text: this.properties.featuredContentItems[this.activeIndex].URL
                }),
                PropertyPaneButton("itemChangeLink", {
                  text: strings.EditItemGeneralSelectLinkButtonText,
                  buttonType: PropertyPaneButtonType.Primary,
                  onClick: this.openLinkSelector.bind(this)
                }),
                PropertyPaneCheckbox("featuredContentItems[" + this.activeIndex + "].NewTab", {
                  text: strings.EditItemGeneralOpenTabLabel
                })
              ]
            },
            {
              groupName: strings.EditItemImageLabel,
              groupFields: [
                PropertyPaneImageSelector("featuredContentItems[" + this.activeIndex + "].Image", {
                  label: strings.EditItemImageEntryLabel,
                  properties: this.properties,
                  context: this.context,
                  changeImage: (url: string, name?: string) => {
                    const oldMode = this.properties.featuredContentItems[this.activeIndex].ImageMode;
                    const oldUrl = this.properties.featuredContentItems[this.activeIndex].CustomImageUrl;
                    const oldImage = this.properties.featuredContentItems[this.activeIndex].Image;
                    const newUrl = url.indexOf(this.context.pageContext.web.absoluteUrl) > -1 ? this.context.pageContext.web.absoluteUrl + "/_layouts/15/getpreview.ashx?resolution=0&clientMode=modernWebPart&path=" + url : url;
                    this.properties.featuredContentItems[this.activeIndex].CustomImageUrl = newUrl;
                    this.properties.featuredContentItems[this.activeIndex].Image = newUrl;
                    this.properties.featuredContentItems[this.activeIndex].ImageMode = ImageDisplayType.Custom;
                    if (name) {
                      const oldAlt = this.properties.featuredContentItems[this.activeIndex].ImageAlternate;
                      this.properties.featuredContentItems[this.activeIndex].ImageAlternate = name;
                      this.onPropertyPaneFieldChanged("featuredContentItems[" + this.activeIndex + "].ImageAlternate", oldAlt, name);
                    }
                    this.onPropertyPaneFieldChanged("featuredContentItems[" + this.activeIndex + "].ImageMode", oldMode, ImageDisplayType.Custom);
                    this.onPropertyPaneFieldChanged("featuredContentItems[" + this.activeIndex + "].Image", oldImage, newUrl);
                    this.onPropertyPaneFieldChanged("featuredContentItems[" + this.activeIndex + "].CustomImageUrl", oldUrl, newUrl);

                    this.render();
                    this.context.propertyPane.refresh();
                  },
                  changeImageMode: (mode: ImageDisplayType) => {
                    const oldMode = this.properties.featuredContentItems[this.activeIndex].ImageMode;
                    const oldImage = this.properties.featuredContentItems[this.activeIndex].Image;

                    this.properties.featuredContentItems[this.activeIndex].ImageMode = mode;
                    this.properties.featuredContentItems[this.activeIndex].Image = mode == ImageDisplayType.Auto ?
                      this.properties.featuredContentItems[this.activeIndex].PreviewImageUrl :
                      this.properties.featuredContentItems[this.activeIndex].CustomImageUrl;
                    this.onPropertyPaneFieldChanged("featuredContentItems[" + this.activeIndex + "].ImageMode", oldMode, mode);
                    this.onPropertyPaneFieldChanged("featuredContentItems[" + this.activeIndex + "].Image", oldImage, this.properties.featuredContentItems[this.activeIndex].Image);
                    this.render();
                    this.context.propertyPane.refresh();
                  },
                  imageMode: this.properties.featuredContentItems[this.activeIndex].ImageMode,
                  key: "imageSelector"
                }),
                PropertyPaneTextField("featuredContentItems[" + this.activeIndex + "].ImageAlternate", {
                  label: strings.EditItemGeneralAlternateLabel,
                  description: strings.EditItemGeneralDescriptionPreCountLabel + (130 - (this.properties.featuredContentItems[this.activeIndex].ImageAlternate ? this.properties.featuredContentItems[this.activeIndex].ImageAlternate.length : 0)) + strings.EditItemGeneralDescriptionPostCountLabel,
                  onGetErrorMessage: this.itemValidation.bind(this, 130, false, strings.EditItemGeneralDescriptionErrorText)
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private rearrangeBasicItems(newOrder: number[]) {
    const newArr = new Array<IFeaturedItem>();
    for (const num of newOrder)
      newArr.push(this.properties.featuredContentItems[num]);
    this.properties.featuredContentItems.length = 0;
    for (const val of newArr)
      this.properties.featuredContentItems.push(val);
    this.render();
  }

  private editBasicItem(index: number): void {
    if (index === -1) {
      this.properties.featuredContentItems.push({
        Title: strings.TitlePlaceholder,
        URL: "",
        NewTab: false,
        Image: "",
        Description: "",
        Content: "",
        ImageAlternate: "",
        CustomImageUrl: "",
        ImageMode: ImageDisplayType.Auto,
        PreviewImageUrl: ""
      });
      index = this.properties.featuredContentItems.length - 1;
    }
    this.activeIndex = index;
    this.context.propertyPane.open();
  }

  private deleteBasicItem(index: number): void {
    this.properties.featuredContentItems.splice(index, 1);
    this.render();
  }

  //Function to validate previewUrl before setting Image property of item.
  private checkImage(imageSrc, success, failure) {
    const img = new Image();
    img.onload = success;
    img.onerror = failure;
    img.src = imageSrc;
  }

  private setUrl(urlString: string, name?: string): void {
    if (this.activeIndex === -1) {
      this.properties.featuredContentItems.push({
        Title: strings.TitlePlaceholder,
        Description: "",
        Content: "",
        URL: "",
        NewTab: false,
        Image: "",
        ImageAlternate: "",
        CustomImageUrl: "",
        ImageMode: ImageDisplayType.Auto,
        PreviewImageUrl: ""
      });
      this.activeIndex = this.properties.featuredContentItems.length - 1;
    }

    var isDoc = false;
    const docExtensions = ["pdf", "xls", "xlsx", "doc", "docx", "ppt", "pptx", "pptm", "dot"];
    for (const ext of docExtensions) {
      if (urlString.indexOf(ext, urlString.length - ext.length) !== -1)
        isDoc = true;
    }

    this.properties.featuredContentItems[this.activeIndex].URL = urlString + (isDoc ? "?web=1" : "");
    this.properties.featuredContentItems[this.activeIndex].Title = name ? name : this.properties.featuredContentItems[this.activeIndex].Title;

    //If image is on host server
    const url = new URL(urlString);
    if (url.host === window.location.host) {
      //Generate preview urlString
      const tmpPreviewUrl = urlString.indexOf("getpreview.ashx") > -1 ? urlString : this.context.pageContext.web.serverRelativeUrl + "/_layouts/15/getpreview.ashx?resolution=0&clientMode=modernWebPart&path=" + encodeURIComponent(urlString);
      //Validate its an image
      this.checkImage(tmpPreviewUrl, () => {
        //Success function, set Image to preview urlString unless user has already set a custom image.
        this.properties.featuredContentItems[this.activeIndex].PreviewImageUrl = tmpPreviewUrl;
        this.properties.featuredContentItems[this.activeIndex].CustomImageUrl = tmpPreviewUrl;
        if (this.properties.featuredContentItems[this.activeIndex].ImageMode == ImageDisplayType.Auto) {
          this.properties.featuredContentItems[this.activeIndex].Image = tmpPreviewUrl;
        }
        else {
          //if image isn't already set, reset to preview urlString
          if (!this.properties.featuredContentItems[this.activeIndex].Image)
            this.properties.featuredContentItems[this.activeIndex].Image = tmpPreviewUrl;
        }
        this.context.propertyPane.refresh();
        //Force UI to display new image.
        this.render();
      }, () => {
        this.properties.featuredContentItems[this.activeIndex].PreviewImageUrl = "";
        this.properties.featuredContentItems[this.activeIndex].CustomImageUrl = "";
        this.properties.featuredContentItems[this.activeIndex].Image = "";
        this.context.propertyPane.refresh();
      });//Failure function -- reset images to blank in case of link change
    } else {
      //Image is external URL
      this.checkImage(urlString, () => {
        this.properties.featuredContentItems[this.activeIndex].PreviewImageUrl = encodeURI(urlString);
        this.properties.featuredContentItems[this.activeIndex].CustomImageUrl = encodeURI(urlString);
        this.properties.featuredContentItems[this.activeIndex].Image = encodeURI(urlString);
        this.context.propertyPane.refresh();
      }, () => {
        this.properties.featuredContentItems[this.activeIndex].PreviewImageUrl = "";
        this.properties.featuredContentItems[this.activeIndex].CustomImageUrl = "";
        this.properties.featuredContentItems[this.activeIndex].Image = "";
        this.context.propertyPane.refresh();
      });
    }

    if (!this.context.propertyPane.isRenderedByWebPart())
      this.context.propertyPane.open();
    this.context.propertyPane.refresh();
  }

  private setTitle(title: string): void {
    this.properties.title = title;
  }

  private resetIndex(): void {
    this.activeIndex = -1;
  }

  private onContentChange(content: string): void {
    const initVal = this.properties.featuredContentItems[this.activeIndex].Content;
    this.properties.featuredContentItems[this.activeIndex].Content = content;
    this.onPropertyPaneFieldChanged("featuredContentItems[" + this.activeIndex + "].Content", initVal, content);
    this.render();
  }
}