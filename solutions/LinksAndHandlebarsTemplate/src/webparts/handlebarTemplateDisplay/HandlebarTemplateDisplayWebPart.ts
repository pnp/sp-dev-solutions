import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneLink,
  PropertyPaneLabel
} from '@microsoft/sp-webpart-base';

import * as strings from 'handlebarTemplateDisplayStrings';
import HandlebarTemplateDisplay from './components/HandlebarTemplateDisplay';
import { IHandlebarTemplateDisplayProps } from './components/IHandlebarTemplateDisplayProps';
import { IHandlebarTemplateDisplayWebPartProps } from './IHandlebarTemplateDisplayWebPartProps';
import { PropertyFieldCamlQueryFieldMapping, PropertyFieldCamlQueryOrderBy } from "../../propertyPane/propertyFieldCamlQueryFieldMapping/PropertyFieldCamlQueryFieldMapping";
import QueryStringParser from "../../utilities/urlparser/queryStringParser";
import pnp from 'sp-pnp-js';

export default class HandlebarTemplateDisplayWebPart extends BaseClientSideWebPart<IHandlebarTemplateDisplayWebPartProps> {
  constructor(){
    super();
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });

    });
  }

  private _fields : any[];
  public get fields() : any[] {
    return this._fields;
  }
  public set fields(v : any[]) {
    this._fields = v;
  }


  private _webpart : any;
  public get webpart() : any {
    return this._webpart;
  }
  public set webpart(v : any) {
    this._webpart = v;
  }

  public render(): void {
    const propData = this.properties.listQueryData ? JSON.parse(this.properties.listQueryData) : {fieldMappings:[], selectedList:{}};
    const element: React.ReactElement<IHandlebarTemplateDisplayProps> = React.createElement(
      HandlebarTemplateDisplay,
      {
        isEdit: this.displayMode===DisplayMode.Edit,
        title: this.properties.title,
        items: [],
        templateUrl: this.properties.handlebarTemplateUrl,
        template: "",
        cssUrl: this.properties.cssUrl,
        jsUrl: this.properties.jsUrl,
        context: this.context,
        listIsSelected: propData.selectedList.id!==undefined,
        containerClass: this.properties.containerClass,
        setTitle: this.setTitle.bind(this),
        setTemplateUrl: this.setTemplateUrl.bind(this),
        setStyleUrl: this.setCSSUrl.bind(this),
        setScriptUrl: this.setJSUrl.bind(this)
      }
    );

    if(propData.selectedList.id){
      pnp.sp.web.lists.getById(propData.selectedList.id).renderListDataAsStream({ ViewXml: QueryStringParser.ReplaceQueryStringParameters(this.properties.listQuery), AllowMultipleValueFilterForTaxonomyFields: true},{}).then((response:any)=>{
        response.Row.forEach(value => {
          for(const prop of Object.keys(value)){
            if(Object.keys(value).indexOf(prop+".desc") > -1){
              const propVal = value[prop];
              delete value[prop];
              value[prop] = {
                Url: propVal
              };
            }
            else{
              const split = prop.split('.');
              if(split.length===2 && split[1]==="desc"){
                const propReplace = prop.substring(0,prop.indexOf('.desc'));
                value[propReplace].Description = value[prop];
                delete value[prop];
              }
            }
          }

          element.props.items.push(value);
        });

        this.context.spHttpClient.get(this.properties.handlebarTemplateUrl, SPHttpClient.configurations.v1).then((templateResponse)=>{
          templateResponse.text().then((s)=>{
            element.props.template = s;
            this.webpart = ReactDom.render(element, this.domElement);
          });
        }).catch((error)=>{
          this.webpart = ReactDom.render(element, this.domElement);
        });
      }).catch((error)=>{
        this.webpart = ReactDom.render(element, this.domElement);
      });
    }
    else{
      this.webpart = ReactDom.render(element, this.domElement);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldCamlQueryFieldMapping('listQuery',{
                  label: strings.QueryFieldLabel,
                  dataPropertyPath: 'listQueryData',
                  query: this.properties.listQuery,
                  fieldMappings: [],
                  createFields:[],
                  createTitleRequired:false,
                  includeHidden: false,
                  orderBy: PropertyFieldCamlQueryOrderBy.Title,
                  showOrderBy: true,
                  showFilters: true,
                  showMax:true,
                  showCreate:false,
                  render: this.render.bind(this),
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  context: this.context,
                  properties: this.properties,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'spListQueryFieldId'
                }),
                PropertyPaneLabel("templateLabel",{
                  text: strings.TemplateFieldLabel,
                }),
                PropertyPaneLink("handlebarTemplateUrl",{
                  href: this.properties.handlebarTemplateUrl,
                  text: this.properties.handlebarTemplateUrl,
                  target: '_blank'
                }),
                PropertyPaneButton("templateChange",{
                  text: strings.TemplateFieldButtonText,
                  buttonType: PropertyPaneButtonType.Primary,
                  onClick: this.openTemplateSelector.bind(this)
                }),
                PropertyPaneLabel("cssLabel",{
                  text: strings.StyleFieldLabel,
                }),
                PropertyPaneLink("cssUrl",{
                  href: this.properties.cssUrl,
                  text: this.properties.cssUrl,
                  target: '_blank'
                }),
                PropertyPaneButton("cssChange",{
                  text: strings.StyleFieldButtonText,
                  buttonType: PropertyPaneButtonType.Primary,
                  onClick: this.openStyleSelector.bind(this)
                }),
                PropertyPaneLabel("jsLabel",{
                  text: strings.ScriptFieldLabel,
                }),
                PropertyPaneLink("jsUrl",{
                  href: this.properties.jsUrl,
                  text: this.properties.jsUrl,
                  target: '_blank'
                }),
                PropertyPaneButton("jsChange",{
                  text: strings.ScriptFieldButtonText,
                  buttonType: PropertyPaneButtonType.Primary,
                  onClick: this.openScriptSelector.bind(this)
                }),
                PropertyPaneTextField("containerClass",{
                  label: strings.ContainerClassLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  public openTemplateSelector(event){
      this.webpart.openTemplateLinkPicker();
  }

  public openStyleSelector(event){
      this.webpart.openStyleLinkPicker();
  }

  public openScriptSelector(event){
      this.webpart.openScriptLinkPicker();
  }

  public setTitle(title: string){
    this.properties.title = title;
  }

  public setTemplateUrl(url: string, name?: string){
    const oldUrl = this.properties.handlebarTemplateUrl;
    this.properties.handlebarTemplateUrl = url;
    this.onPropertyPaneFieldChanged("handlebarTemplateUrl",oldUrl, url);
    this.render();
    this.context.propertyPane.refresh();
  }

  public setCSSUrl(url: string, name?: string){
    const oldUrl = this.properties.cssUrl;
    this.properties.cssUrl = url;
    this.onPropertyPaneFieldChanged("cssUrl",oldUrl, url);
    this.render();
    this.context.propertyPane.refresh();
  }

  public setJSUrl(url: string, name?: string){
    const oldUrl = this.properties.jsUrl;
    this.properties.jsUrl = url;
    this.onPropertyPaneFieldChanged("jsUrl",oldUrl, url);
    this.render();
    this.context.propertyPane.refresh();
  }
}
