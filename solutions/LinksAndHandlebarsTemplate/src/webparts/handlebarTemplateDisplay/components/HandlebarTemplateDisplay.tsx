import * as React from 'react';
import * as strings from 'handlebarTemplateDisplayStrings';
import Handlebars = require('handlebars');
import moment = require('moment');
import 'file-saver';
import styles from './HandlebarTemplateDisplay.module.scss';
import LinkPickerPanel from "../../../components/LinkPickerPanel/LinkPickerPanel";
import { IHandlebarTemplateDisplayProps } from './IHandlebarTemplateDisplayProps';
import { LinkType } from "../../../components/LinkPickerPanel/ILinkPickerPanelProps";
import { Button, CommandButton } from "office-ui-fabric-react/lib/Button";
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { IHandlebarDisplayTemplateState } from './IHandlebarTemplateDisplayState';

const specialChar = "    ";

//Handlebars.registerHelper("date",(date: Date,format: string): string=>{
//  return moment(date).format(format);
//});

export default class HandlebarTemplateDisplay extends React.Component<IHandlebarTemplateDisplayProps, IHandlebarDisplayTemplateState> {
  private linkPickerPanel: LinkPickerPanel;

  private _templateExport : string;
  public get templateExport() : string {
    return this._templateExport;
  }
  public set templateExport(v : string) {
    this._templateExport = v;
  }

  public setTitle(event){
    this.props.setTitle(event.target.value);
  }

  public openTemplateLinkPicker(event){
    if (this.linkPickerPanel) {
      this.linkPickerPanel.pickLink()
      .then (({name, url}) => {
        this.props.setTemplateUrl(url, name);
      });
    }
  }

  public openStyleLinkPicker(event){
    if (this.linkPickerPanel) {
      this.linkPickerPanel.pickLink()
      .then (({name, url}) => {
        this.props.setStyleUrl(url, name);
      });
    }
  }

  public openScriptLinkPicker(event){
    if (this.linkPickerPanel) {
      this.linkPickerPanel.pickLink()
      .then (({name, url}) => {
        this.props.setScriptUrl(url, name);
      });
    }
  }

  public copyTemplate(event){
    const template = new Blob([this.templateExport], {type: "text/html;charset=utf-8"});
    window["saveAs"](template, "example.html");
  }

  public componentDidMount() {
    if(this.props.jsUrl){
      const script = document.createElement("script");
      script.src = this.props.jsUrl;
      script.async = true;
      document.body.appendChild(script);
    }

    if(this.props.cssUrl){
      const link = document.createElement("link");
      link.href = this.props.cssUrl;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);
    }
  }

  public render(): React.ReactElement<IHandlebarTemplateDisplayProps> {
    const template = Handlebars.compile(this.props.template);
    return (
      <div>
        <div className={styles["webpart-header"]}>
          { this.props.isEdit && <textarea onChange={this.setTitle.bind(this)} className={styles["edit"]} placeholder={strings.TitlePlaceholder} aria-label="Add a title" defaultValue={this.props.title}></textarea> }
          { !this.props.isEdit && this.props.title && <span className={styles["view"]}>{this.props.title}</span> }
        </div>
        <div className={this.props.containerClass}>
          {this.props.items.length > 0 && this.props.templateUrl && this.props.items.map((item) =>  this.templateRender(item, template) )}
          {this.props.items.length > 0 && !this.props.templateUrl && this.noTemplateRender(this.props.items[0])}
          {this.props.items.length===0 && !this.props.listIsSelected && this.renderConfigureWebPartView()}
        </div>
        <LinkPickerPanel
          className={styles["link-picker"]}
          webPartContext={this.props.context}
          webAbsUrl={this.props.context.pageContext.web.absoluteUrl}
          linkType={ LinkType.any }
          ref={ (ref) => {this.linkPickerPanel = ref;}} />
      </div>
    );
  }

  private templateRender(item, template): React.ReactElement<IHandlebarTemplateDisplayProps>{
    return ( <span dangerouslySetInnerHTML={{__html:template(item)}}></span> );
  }

  private noTemplateRender(item): React.ReactElement<IHandlebarTemplateDisplayProps>{
    this.templateExport = this.buildExampleTemplate(item);
    const temaplate = Handlebars.compile(this.templateExport);
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button iconProps={{iconName: "Download"}}
            style={{position: "absolute", right: '0', top: "0"}}
            onClick={this.copyTemplate.bind(this)}>
            {strings.DownloadButtonText}
          </Button>
          </div>
        <div style={{border: '1px solid #DEDEDE', marginBottom: '5px', padding: '7px'}} dangerouslySetInnerHTML={{__html: temaplate(item)}}></div>
      </div>
    );
  }

  private buildExampleTemplate(obj, path = ""): string{
    var template = "";
    const separator = path ? "." : "";
    for(const key of Object.keys(obj).sort()){
      const o = obj[key];
      if(key.indexOf(".")!==key.length-1){
        if(typeof o === 'object'){
          template+=this.getLeadingTab(path)+'<div style="margin-left:10px;">';
          template+='\n'+this.getLeadingTab(path)+'    <span style="font-weight:bold;">';
          template+=key+": ";
          template+="</span>";
          template+="\n"+this.getLeadingTab(path)+"    <span>";
          template+=this.buildExampleTemplate(o, path+separator+key);
          template+="</span>";
          template+="\n"+this.getLeadingTab(path)+"</div>\n";
        }
        else{
          template+=this.getLeadingTab(path)+'<div style="margin-left:10px;">';
          template+='\n'+this.getLeadingTab(path)+'    <span style="font-weight:bold;">';
          template+=key+": ";
          template+="</span>";
          template+="\n"+this.getLeadingTab(path)+'    <span style="word-wrap:break-word;">';
          template+="{{"+path+separator+key+"}}";
          template+="</span>";
          template+=this.getLeadingTab(path)+"\n</div>\n";
        }
      }
    }

    return template;
  }

  private getLeadingTab(path): string{
    const periodFinder = new RegExp(/\./g);
    const periods = periodFinder.exec(path);
    const periodCount = periods ? periods.length: 0;
    var leading = "";
    for(var i = 0; i < periodCount; i++){
      leading += specialChar;
    }
    return leading;
  }

  private renderConfigureWebPartView(): React.ReactElement<IHandlebarTemplateDisplayProps>{
    return (
      <CommandButton iconProps={{iconName:"Settings"}}
                     onClick={this.openPropertyPane.bind(this)}>
        {strings.ConfigureWebPartButtonText}
      </CommandButton>
    );
  }

  private openPropertyPane(event){
    this.props.context.propertyPane.open();
  }
}
