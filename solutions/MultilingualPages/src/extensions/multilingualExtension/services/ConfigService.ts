import { _getInternalDialogApi } from "@microsoft/sp-dialog/lib/DialogManager";
import { SPRest, FieldAddResult, XmlSchemaFieldCreationInformation, FolderAddResult, sp } from "@pnp/sp";

import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Logger, LogLevel } from "@pnp/logging";
import "@pnp/polyfill-ie11";

export interface IConfigService {
  createSiteColumn(context: ApplicationCustomizerContext, fieldId: string, xml: string, defaultValue: string): Promise<boolean>;
}

export default class ConfigService implements IConfigService {
  private LOG_SOURCE: string = 'MultilingualExtensionApplicationCustomizer-ConfigService';
  private _sitePagesLibraryId: string = "";

  constructor(sitePagesLibraryId: string) {
    this._sitePagesLibraryId = sitePagesLibraryId;
  }

  public async createSiteColumn(context: ApplicationCustomizerContext, fieldId: string, xml: string, defaultValue: string): Promise<boolean> {
    let retVal = false;
    try {
      const xmlSchema: XmlSchemaFieldCreationInformation = { SchemaXml: xml };
      let result: FieldAddResult = null;
      result = await sp.web.fields.createFieldAsXml(xmlSchema);

      if (result && result.field) {
        let fieldLink = await this.createFieldLink(context, fieldId);
        if (fieldLink) {
          //Update visibility and defaults
          let snf = await sp.web.lists.getById(this._sitePagesLibraryId).fields.getById(fieldId).setShowInNewForm(false);
          let sef = await sp.web.lists.getById(this._sitePagesLibraryId).fields.getById(fieldId).setShowInEditForm(false);
          if (defaultValue != null) {
            let fieldDefault = await sp.web.lists.getById(this._sitePagesLibraryId).fields.getById(fieldId).update({ DefaultValue: defaultValue });
          }
          retVal = true;
        }
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (createSiteColumn)`, LogLevel.Error);
    }
    return retVal;
  }

  private async tryUnsealCT(context: ApplicationCustomizerContext): Promise<boolean> {
    try {
      let rUnseal: SPHttpClientResponse = null;
      let sitePageCT: { Id: { StringValue: string }, Name: string, Sealed: boolean } = await sp.web.contentTypes.getById('0x0101009D1CB255DA76424F860D91F20E6C4118').get();
      if (sitePageCT.Sealed) {
        let fixUrl = sp.web.contentTypes.getById('0x0101009D1CB255DA76424F860D91F20E6C4118').toUrl();
        let fixOptions = {
          headers: {
            Method: "PATCH"
          },
          body: JSON.stringify({ Sealed: false })
        };
        rUnseal = await context.spHttpClient.post(`${context.pageContext.site.absoluteUrl}/${fixUrl}`, SPHttpClient.configurations.v1, fixOptions);
        if (!rUnseal.ok) {
          Logger.write(`Could not unseal Site Pages content type - ${this.LOG_SOURCE}`, LogLevel.Error);
          return false;
        }
      }
      return true;
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (tryUnsealCT)`, LogLevel.Error);
      return false;
    }
  }

  private async createFieldLink(context: ApplicationCustomizerContext, fieldId: string): Promise<boolean> {
    let retVal = false;
    try {
      let unsealCT = await this.tryUnsealCT(context);
      if (unsealCT) {
        let fieldLinkUrl = `${context.pageContext.site.absoluteUrl}/_vti_bin/client.svc/ProcessQuery`;
        let body = `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Multilingual" `
          + `xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="5" ObjectPathId="4" />`
          + `<Query Id="56" ObjectPathId="4"><Query SelectAllProperties="false"><Properties>`
          + `<Property Name="Required" ScalarProperty="true" /><Property Name="Hidden" ScalarProperty="true" />`
          + `</Properties></Query></Query>`
          + `<SetProperty Id="58" ObjectPathId="2" Name="Required"><Parameter Type="Boolean">false</Parameter></SetProperty>`
          + `<SetProperty Id="59" ObjectPathId="2" Name="Hidden"><Parameter Type="Boolean">true</Parameter></SetProperty>`
          + `<Method Name="Update" Id="7" ObjectPathId="1"><Parameters><Parameter Type="Boolean">true</Parameter></Parameters></Method></Actions>`
          + `<ObjectPaths><Identity Id="2" Name="d6667b9e-50fb-0000-2693-032ae7a0df25|740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${context.pageContext.site.id}:web:${context.pageContext.web.id}:field:${fieldId}" />`
          + `<Method Id="4" ParentId="3" Name="Add"><Parameters><Parameter TypeId="{63fb2c92-8f65-4bbb-a658-b6cd294403f4}"><Property Name="Field" ObjectPathId="2" /></Parameter></Parameters></Method>`
          + `<Identity Id="1" Name="d6667b9e-80f4-0000-2693-05528ff416bf|740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${context.pageContext.site.id}:web:${context.pageContext.web.id}:contenttype:0x0101009D1CB255DA76424F860D91F20E6C4118" />`
          + `<Property Id="3" ParentId="1" Name="FieldLinks" /></ObjectPaths></Request>`;

        let fieldOptions = {
          headers: {},
          body: body
        };
        let rFieldLink = await context.spHttpClient.post(fieldLinkUrl, SPHttpClient.configurations.v1, fieldOptions);
        if (rFieldLink.ok) {
          let responseJson = await rFieldLink.json();
          if (!responseJson[0].ErrorInfo) {
            retVal = true;
          }
        }
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (createFieldLink)`, LogLevel.Error);
    }
    return retVal;
  }
}