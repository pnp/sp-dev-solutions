import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneLink,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneToggle,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneLabel
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'boxButtonWebPartStrings';
import BoxButtonWebPart from './components/BoxButtonWebPart';
import { IBoxButtonWebPartProps } from './components/IBoxButtonWebPartProps';
import { IBoxButtonWebPartWebPartProps } from './IBoxButtonWebPartWebPartProps';
import { SPFieldType, PropertyFieldCamlQueryOrderBy, SPFieldRequiredLevel, PropertyFieldCamlQueryFieldMapping } from '../../propertyPane/propertyFieldCamlQueryFieldMapping/PropertyFieldCamlQueryFieldMapping';
import pnp from 'sp-pnp-js';
import QueryStringParser from "../../utilities/urlparser/queryStringParser";
import { WebPartLogger } from '../../utilities/webpartlogger/usagelogger';

const urlField = "URL";
const iconField = "Font Awesome Icon";
const isBlueField = "Has Blue Background";
const openNewTabField = "Open Link in New Tab";

export default class BoxButtonWebPartWebPart extends BaseClientSideWebPart<IBoxButtonWebPartWebPartProps> {

  constructor() {
    super();

    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  }

  public onInit(): Promise<void> {
    const urls:string[] = [];
    if(this.properties.data){
      this.properties.data.forEach(element => {
        if(element.url)
          urls.push(element.url);
      });
    }
    WebPartLogger.logUsage(this.context,urls);

    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }
  
  private _webpart : any;
  public get webpart() : any {
    return this._webpart;
  }
  public set webpart(v : any) {
    this._webpart = v;
  }

  private _activeIndex : number = -1;
  public get activeIndex() : number {
    return this._activeIndex;
  }
  public set activeIndex(v : number) {
    this._activeIndex = v;
  }
  
  public render(): void {
    // Copy properties from previous version if needed (??)
    if(!this.properties.data && this.properties.name){
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
    const element:React.ReactElement<IBoxButtonWebPartProps> = React.createElement(
      BoxButtonWebPart,
      {
        name: this.properties.name,
        isThemed: this.properties.isThemed,
        fontAwesomeIcon: this.properties.fontAwesomeIcon,
        url: this.properties.url,
        newTab: this.properties.newTab,
        data: this.properties.data,
        title: this.properties.title,
        usesListMode:this.properties.usesListMode,
        advancedCamlQuery: this.properties.advancedCamlQuery,
        advancedCamlData: this.properties.advancedCamlData,
        links:[],
        isEdit: this.displayMode===DisplayMode.Edit,
        setTitle: (title:string) => {
          props.title = title;
        },
        // Callback from main component when user selects a new link
        setUrl: (name: string, url:string) => {
          // If there is no active index, add a new link at the top and make it active
          if(this.activeIndex===-1){
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
          for(const ext of docExtensions){
            if(url.indexOf(ext, url.length - ext.length) !== -1)
              isDoc = true;
          }

          if (name) {
            props.data[this.activeIndex].name = 
              name.split('.')[0].replace('-',' ').replace('_',' ');
          }

          // In the "data" (array of links) adjust the URL to use OWA if it's a document
          props.data[this.activeIndex].url=url+( isDoc ? "?web=1" : "");
          // If the property pane isn't already open, open it and refresh it
          if(!this.context.propertyPane.isRenderedByWebPart())
            this.context.propertyPane.open();
          propPaneRefresh();
        },
        // Called when user clicks edit on a link in BoxButtonWebPart
        editItem: (index:number) => {
          if(index===-1){
            this.properties.data.push({
              name: strings.TitlePlaceholder,
              isBlue: false,
              icon: "",
              url: "",
              openNew: false
            });
            index = this.properties.data.length-1;
          }
          this.activeIndex = index;
          this.context.propertyPane.open();
        },
        // Called when user clicks delete on a link in BoxButtonWebPart
        deleteItem: (index:number)=>{          
          this.properties.data.splice(index,1);
          this.render();     
        },
        // Called when a user rearranges links in BoxButtonWebPart
        rearrangeItems: (newOrder:number[])=>{
          const newArr = [];
          for(const num of newOrder)
            newArr.push(this.properties.data[num]);
          this.properties.data.length=0;
          for(const val of newArr)
            this.properties.data.push(val);
          this.render();
        },
        context: this.context
      }
    );

    // OK we have the BoxButtonWebPart component
    // If we're in List mode, read the list
    if(this.properties.usesListMode){
      const propData = this.properties.advancedCamlData ? JSON.parse(this.properties.advancedCamlData) : {fieldMappings:[], selectedList:{}};
      if(propData.selectedList.id){
        pnp.sp.web.lists.getById(propData.selectedList.id).getItemsByCAMLQuery({ ViewXml: QueryStringParser.ReplaceQueryStringParameters(this.properties.advancedCamlQuery)}).then((response:any[])=>{
          response.forEach(value => {
          const link = {};
          propData.fieldMappings.forEach(mapping => {
            switch(mapping.type){
              case SPFieldType.URL:
                link[mapping.name] = value[mapping.mappedTo] ? value[mapping.mappedTo]["Url"] : null;
                link[mapping.name+"_text"] = value[mapping.mappedTo] ? value[mapping.mappedTo]["Description"] : null;
                break;
              default: 
                link[mapping.name] = value[mapping.mappedTo];
                break;
              }
            });
            if(link[urlField] !== null)
              element.props.links.push(link);
          });
          // TODO: Return from ReactDom.render has a race condition
          // Switch to a function ref
          this.webpart = ReactDom.render(element, this.domElement);
        }).catch((error)=>{ });
      }
    }
    else
      // Not in list mode, just render the BoxButtonWebPart
      // TODO: Return from ReactDom.render has a race condition
      // Switch to a function ref
      this.webpart = ReactDom.render(element, this.domElement);
  } // render()

  public setTitle(title:string){
    this.properties.title = title;
  }

  // onClick of "Change" button in classic editing panel
  // TODO: Why is this public?
  // Event doesn't seem to be passed in
  public openLinkSelector(event){
    this.webpart.openLinkPicker(event);
  }

  public itemValidation(length: number, required: boolean, errorText: string, value: string): Promise<string> {
    return new Promise<string>((resolve: (validationMessage: string)=>void)=>{
      if(value.length>length){
        resolve(errorText);
      }
      else if(required && value.length<1){
        resolve(strings.RequiredValueErrorText);
      }
      else{
        resolve("");
      }
    });
  }

  // public nameValidation(value: string): Promise<string>{
  //   return new Promise<string>((resolve: (validationMessage: string)=>void)=>{
  //     if(value.length>40){
  //       resolve(strings.EditItemGeneralTitleErrorText);
  //     }
  //     else{
  //       resolve('');
  //     }
  //   });
  // }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if(this.context.propertyPane.isRenderedByWebPart()) return this.getEditItemPropertyPane();
    return this.getBasicPropertyPane();
  }

  // Property pane for List mode
  public getBasicPropertyPane(): IPropertyPaneConfiguration{
    return {
      pages: [
        {
          header: {
            description: ''//strings.PropertyPaneBaseDescription
          },
          groups:[
            {
              groupName: strings.AdvancedListModeGroupLabel,
              isCollapsed: !this.properties.usesListMode,
              groupFields:[
                PropertyPaneToggle('usesListMode',{
                  label: strings.AdvancedEnableListModeLabel,
                  onText: strings.EditItemColorOnLabel,
                  offText: strings.EditItemColorOffLabel
                }),
                PropertyPaneLabel('listModeInfo',{
                  text: strings.AdvancedEnableListModeInfo
                }),
                PropertyFieldCamlQueryFieldMapping('advancedCamlQuery',{
                  label: "",
                  dataPropertyPath: 'advancedCamlData',
                  query: this.properties.advancedCamlQuery,
                  fieldMappings: [
                    { name: urlField,type: SPFieldType.URL, requiredLevel: SPFieldRequiredLevel.Required },
                    { name: iconField, type: SPFieldType.Text, requiredLevel: SPFieldRequiredLevel.Required },
                    { name: isBlueField, type: SPFieldType.Boolean, requiredLevel: SPFieldRequiredLevel.Required },
                    { name: openNewTabField, type: SPFieldType.Boolean, requiredLevel: SPFieldRequiredLevel.Required }
                  ],
                  createFields:[
                    '<Field ID="{c29e077d-f466-4d8e-8bbe-72b66c5f205c}" Name="URL" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="URL" Group="Base Columns" Type="URL" DisplayName="URL" Required="TRUE"/>',
                    '<Field Type="Text" DisplayName="FontAwesomeIcon" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" MaxLength="255" Group="Web Part Columns" ID="{6df0c002-e0f6-4801-aa83-b7a5bb80f0f4}" SourceID="{a5df0f41-264b-4bf8-a651-222fcdf5d32d}" StaticName="FontAwesomeIcon" Name="FontAwesomeIcon" Version="5" />',
                    '<Field Type="Number" DisplayName="SortOrder" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Group="Web Part Columns" ID="{7a911a9e-dbe1-4a87-bd40-c042db929a80}" SourceID="{a5df0f41-264b-4bf8-a651-222fcdf5d32d}" StaticName="SortOrder" Name="SortOrder" Version="5" />',
                    '<Field Type="Boolean" DisplayName="HasBlueBackground" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Group="Web Part Columns" ID="{f9ba1903-e7be-42cd-843e-f898d4c1fcb4}" SourceID="{f9ba1903-e7be-42cd-843e-f898d4c1fcb4}" StaticName="HasBlueBackground" Name="HasBlueBackground" Version="5" />',
                    '<Field Type="Boolean" DisplayName="OpenLinkinNewTab" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Group="Web Part Columns" ID="{4bf7c60f-0737-49c9-894c-6a31af134242}" SourceID="{4bf7c60f-0737-49c9-894c-6a31af134242}" StaticName="OpenLinkInNewTab" Name="OpenLinkInNewTab" Version="5" />'
                  ],
                  createTitleRequired:false,
                  includeHidden: false,
                  orderBy: PropertyFieldCamlQueryOrderBy.Title,
                  showOrderBy: true,
                  showFilters: true,
                  showMax:false,
                  showCreate:true,
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

  // Property pane for editing an item in non-List mode
  public getEditItemPropertyPane(): IPropertyPaneConfiguration{
    return {
      pages: [
        {
          header: {
            description: ""
          },
          displayGroupsAsAccordion:true,
          groups: [
            {
              groupName: strings.EditItemGeneralLabel,
              groupFields:[
                PropertyPaneTextField("data["+this.activeIndex+"].name",{
                  label: strings.EditItemGeneralTitleLabel,
                  description: strings.EditItemGeneralTitlePreCountLabel+(40-this.properties.data[this.activeIndex].name.length)+strings.EditItemGeneralTitlePostCountLabel,
                  onGetErrorMessage: this.itemValidation.bind(this, 40, true, strings.EditItemGeneralTitleErrorText)
                  //onGetErrorMessage: this.nameValidation.bind(this)
                }),
                PropertyPaneLabel("itemLinkLabel",{
                  text: strings.EditItemGeneralSelectLinkLabel
                }),
                PropertyPaneLink("data["+this.activeIndex+"].url",{
                  target: "_blank",
                  href: this.properties.data[this.activeIndex].url,
                  text: this.properties.data[this.activeIndex].url
                }),
                PropertyPaneButton("itemChangeLink",{
                  text: strings.EditItemGeneralSelectLinkButtonText,
                  buttonType: PropertyPaneButtonType.Primary,
                  // ??? Link Selector - only this is passed, no other arg or event
                  onClick: this.openLinkSelector.bind(this)
                }),
                PropertyPaneCheckbox("data["+this.activeIndex+"].openNew",{
                  text:strings.EditItemGeneralOpenTabLabel
                })
              ]
            },
            {
              groupName: strings.EditItemIconLabel,
              groupFields:[
                PropertyPaneTextField("data["+this.activeIndex+"].icon",{
                  label: strings.EditItemIconEntryLabel,
                  placeholder: strings.EditItemIconEntryPlaceholder
                }),
                PropertyPaneLink('iconShortcut',{
                  text: strings.EditItemIconEntryLinkText,
                  href:"https://fontawesome.com/v4.7.0/cheatsheet/",
                  target: "blank"
                })
              ]
            },
            {
              groupName: strings.EditItemColorLabel,
              groupFields:[
                PropertyPaneToggle("data["+this.activeIndex+"].isBlue",{
                  label:strings.EditItemColorFieldLabel,
                  onText: strings.EditItemColorOnLabel,
                  offText: strings.EditItemColorOffLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
