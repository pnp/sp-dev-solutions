import { _getInternalDialogApi } from "@microsoft/sp-dialog/lib/DialogManager";
import { SPRest, FieldAddResult, FieldCreationProperties, XmlSchemaFieldCreationInformation, FolderAddResult} from "@pnp/sp";

import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
import {Logger,LogLevel} from "@pnp/logging";
import "@pnp/polyfill-ie11";

export interface IConfigService{
  createSiteColumn(context: ApplicationCustomizerContext, sp: SPRest, fieldId: string, xml: string, defaultValue: string): Promise<boolean>;
}

export default class ConfigService implements IConfigService {
  private LOG_SOURCE: string = 'MultilingualExtensionApplicationCustomizer-ConfigService';

  public async createSiteColumn(context: ApplicationCustomizerContext, sp: SPRest, fieldId: string, xml: string, defaultValue: string): Promise<boolean> { 
    const xmlSchema: XmlSchemaFieldCreationInformation = {SchemaXml: xml};
    let result: FieldAddResult = null;
    try{
      result = await sp.web.fields.createFieldAsXml(xmlSchema); 
    }catch(err){
      Logger.write(`${err} - ${this.LOG_SOURCE}`, LogLevel.Error);
    }

    if(result && result.field){
      let fieldLink = await this.createFieldLink(context, sp, fieldId);
      if(fieldLink){
        //Update visibility and defaults
        await sp.web.lists.getByTitle("Site Pages").fields.getById(fieldId).setShowInNewForm(false);
        await sp.web.lists.getByTitle("Site Pages").fields.getById(fieldId).setShowInEditForm(false);
        if(defaultValue != null){
          let fieldDefault = await sp.web.lists.getByTitle("Site Pages").fields.getById(fieldId).update({DefaultValue: defaultValue});
          return true;
        }
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  private async createFieldLink(context: ApplicationCustomizerContext, sp: SPRest, fieldId: string): Promise<boolean> {
    var contentTypes: any[] = await sp.web.contentTypes.select("Id,Name").filter("Name eq 'Site Page'").top(1).get();
    if(contentTypes.length == 1){
      var sitePageCT: {Id: {StringValue:string}, Name: string} = contentTypes[0];

      var fieldLinkUrl = `${context.pageContext.site.absoluteUrl}/_vti_bin/client.svc/ProcessQuery`;
      var body = `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Multilingual" `
      +`xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="5" ObjectPathId="4" />`
      +`<Query Id="56" ObjectPathId="4"><Query SelectAllProperties="false"><Properties>`
      +`<Property Name="Required" ScalarProperty="true" /><Property Name="Hidden" ScalarProperty="true" />`
      +`</Properties></Query></Query>`
      +`<SetProperty Id="58" ObjectPathId="2" Name="Required"><Parameter Type="Boolean">false</Parameter></SetProperty>`
      +`<SetProperty Id="59" ObjectPathId="2" Name="Hidden"><Parameter Type="Boolean">true</Parameter></SetProperty>`
      +`<Method Name="Update" Id="7" ObjectPathId="1"><Parameters><Parameter Type="Boolean">true</Parameter></Parameters></Method></Actions>`
      +`<ObjectPaths><Identity Id="2" Name="d6667b9e-50fb-0000-2693-032ae7a0df25|740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${context.pageContext.site.id}:web:${context.pageContext.web.id}:field:${fieldId}" />`
      +`<Method Id="4" ParentId="3" Name="Add"><Parameters><Parameter TypeId="{63fb2c92-8f65-4bbb-a658-b6cd294403f4}"><Property Name="Field" ObjectPathId="2" /></Parameter></Parameters></Method>`
      +`<Identity Id="1" Name="d6667b9e-80f4-0000-2693-05528ff416bf|740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${context.pageContext.site.id}:web:${context.pageContext.web.id}:contenttype:${sitePageCT.Id.StringValue}" />`
      +`<Property Id="3" ParentId="1" Name="FieldLinks" /></ObjectPaths></Request>`;

      var fieldOptions = {
        headers: {},
        body: body
      };
      let response: SPHttpClientResponse = null;
      try{
        response = await context.spHttpClient.post(fieldLinkUrl, SPHttpClient.configurations.v1, fieldOptions);
      }catch(err){
        Logger.write(`${err} - ${this.LOG_SOURCE}`, LogLevel.Error);
      }
      let retVal = false;
      if(response && response.status){
        let responseJson = await response.json();
        if(responseJson[0].ErrorInfo){
          retVal = false;
        }else{
          retVal = true;
        }
      }
      return retVal;
    }else{
      return false;
    }
  }
}