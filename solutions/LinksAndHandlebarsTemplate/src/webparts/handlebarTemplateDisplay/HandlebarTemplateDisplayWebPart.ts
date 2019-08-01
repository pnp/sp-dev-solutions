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
  PropertyPaneLabel,
  PropertyPaneToggle,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';
//import * as Handlebars = require('handlebars');
import * as Handlebars from 'handlebars';
import * as strings from 'handlebarTemplateDisplayStrings';
import HandlebarTemplateDisplay from './components/HandlebarTemplateDisplay';
import { IHandlebarTemplateDisplayProps } from './components/IHandlebarTemplateDisplayProps';
import { IHandlebarTemplateDisplayWebPartProps } from './IHandlebarTemplateDisplayWebPartProps';
import { PropertyFieldCamlQueryFieldMapping, PropertyFieldCamlQueryOrderBy } from "../../propertyPane/propertyFieldCamlQueryFieldMapping/PropertyFieldCamlQueryFieldMapping";
import QueryStringParser from "../../utilities/urlparser/queryStringParser";
import pnp, { SearchQueryBuilder, Sort, SearchProperty } from 'sp-pnp-js';
import { PropertyPaneSearch } from '../../propertyPane/PropertyPaneSearch/PropertyFieldSearch';
import { WebPartLogger } from '../../utilities/webpartlogger/usagelogger';

export default class HandlebarTemplateDisplayWebPart extends BaseClientSideWebPart<IHandlebarTemplateDisplayWebPartProps> {
  constructor(){
    super();
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }

  public onInit(): Promise<void> {
    WebPartLogger.logUsage(this.context);
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
        isSearch: this.properties.usesSearchSource,
        title: this.properties.title,
        items: [],
        templateUrl: this.properties.handlebarTemplateUrl,
        template: "",
        isOptimized: this.properties.optimizedTemplate,
        webUrl: this.context.pageContext.web.absoluteUrl,
        instanceId: this.context.instanceId,
        serverRelativeUrl: window.location.pathname,
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
    if(propData.selectedList.id && !this.properties.usesSearchSource){
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
        if(this.properties.optimizedTemplate && this.displayMode===DisplayMode.Edit){
            this.context.spHttpClient.get(this.properties.handlebarTemplateUrl, SPHttpClient.configurations.v1,{method:"GET",mode:"no-cors"}).then((templateResponse)=>{
              templateResponse.text().then((s)=>{
                const template: TemplateSpecification = Handlebars.precompile(s);
                this.properties.precompiledTemplate = template.toString();
                element.props.template = template;
                this.webpart = ReactDom.render(element, this.domElement);
              });
            });
          }
        else if(this.properties.optimizedTemplate){
          element.props.template = this.properties.precompiledTemplate;
          this.webpart = ReactDom.render(element, this.domElement);
        }
        else{
          this.context.spHttpClient.get(this.properties.handlebarTemplateUrl, SPHttpClient.configurations.v1,{method:"GET",mode:"no-cors"}).then((templateResponse)=>{
            templateResponse.text().then((s)=>{
              element.props.template = s;
              this.webpart = ReactDom.render(element, this.domElement);
            });
          }).catch((error)=>{
            this.webpart = ReactDom.render(element, this.domElement);
          });
        }
      }).catch((error)=>{
        this.webpart = ReactDom.render(element, this.domElement);
      });
    }else if(this.properties.usesSearchSource){
      const searchData = this.properties.searchSource ? JSON.parse(this.properties.searchSource) :
      {
        query: '',
        selectProperties: '',
        sort: [],
        rows: 10
      };

      const sqb = new SearchQueryBuilder();
      if(searchData.query)
        sqb.template(searchData.query);
      if(searchData.sort && searchData.sort.length > 0)
          sqb.sortList(searchData.sort);
      if(searchData.selectProperties)
        sqb.selectProperties(searchData.selectProperties.split(';'));

      sqb.rowLimit(searchData.rows);
      sqb.rowsPerPage(searchData.rows);
      sqb.clientType("HandlebarTemplateDisplayWebPart");
      sqb.sourceId(this.instanceId);
      sqb.properties(
        { Name: "TrimSelectProperties", Value: {StrVal: "1", QueryPropertyValueTypeIndex: 1}},
        { Name: "EnableDynamicGroups", Value: {BoolVal: false, QueryPropertyValueTypeIndex: 3}}
      );

      const request = sqb.toSearchQuery();
      request.SortList = searchData.sort;

      pnp.sp.search(sqb).then(response=>{
        element.props.items = response.PrimarySearchResults;
        if(this.properties.optimizedTemplate && this.displayMode===DisplayMode.Edit){
          this.context.spHttpClient.get(this.properties.handlebarTemplateUrl, SPHttpClient.configurations.v1).then((templateResponse)=>{
            templateResponse.text().then((s)=>{
              const template: TemplateSpecification = Handlebars.precompile(s);
              this.properties.precompiledTemplate = template.toString();
              element.props.template = template;
              this.webpart = ReactDom.render(element, this.domElement);
            });
          });
        }
        else if(this.properties.optimizedTemplate){
          element.props.template = this.properties.precompiledTemplate;
          this.webpart = ReactDom.render(element, this.domElement);
        }
        else{
          this.context.spHttpClient.get(this.properties.handlebarTemplateUrl, SPHttpClient.configurations.v1).then((templateResponse)=>{
            templateResponse.text().then((s)=>{
              element.props.template = s;
              this.webpart = ReactDom.render(element, this.domElement);
            });
          }).catch((error)=>{
            this.webpart = ReactDom.render(element, this.domElement);
          });
        }
      }).catch((error)=>{
        this.webpart = ReactDom.render(element, this.domElement);
      });
    }else{
      this.webpart = ReactDom.render(element, this.domElement);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this.properties.usesSearchSource ? this.getSearchBackedPropertyPaneConfiguration() : this.getListBackedPropertyPaneConfiguration();
  }

  private getListBackedPropertyPaneConfiguration(): IPropertyPaneConfiguration{
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
                PropertyPaneToggle("usesSearchSource",{
                  offText: strings.ListLabel,
                  onText: strings.SearchLabel,
                  label: strings.SearchToggleLabel
                }),
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
                PropertyPaneCheckbox('optimizedTemplate',{
                  text: strings.OptimizedTemplateLabel
                }),
                PropertyPaneLabel("optimizedTemplate",{
                  text: strings.OptimizedTemplateDescription
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

  private getSearchBackedPropertyPaneConfiguration(): IPropertyPaneConfiguration{
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
                PropertyPaneToggle("usesSearchSource",{
                  offText: strings.ListLabel,
                  onText: strings.SearchLabel,
                  label: strings.SearchToggleLabel
                }),
                PropertyPaneSearch('searchSource',{
                  properties: this.properties,
                  render: this.render.bind(this),
                  key: 'search',
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this)}),
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
                PropertyPaneCheckbox('optimizedTemplate',{
                  text: strings.OptimizedTemplateLabel
                }),
                PropertyPaneLabel("optimizedTemplate",{
                  text: strings.OptimizedTemplateDescription
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
