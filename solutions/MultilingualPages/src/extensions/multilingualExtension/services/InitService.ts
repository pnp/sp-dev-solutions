import { ILanguages, ILanguage, MultilingualFields, IPageProperties, PageProperties, IMap } from '../../../common/models/Models';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { sp, Fields, ClientSidePage, ClientSideWebpart, File, CheckinType } from '@pnp/sp';
import * as lodash from 'lodash';
import ConfigService from './ConfigService';
import { SPHttpClient } from '@microsoft/sp-http';
import { Logger, LogLevel } from "@pnp/logging";
import "@pnp/polyfill-ie11";

export interface IInitService {
  getLanguages(): Promise<ILanguage[]>;
  validateConfig(languages: ILanguage[]): Promise<boolean>;
  checkoutPage(): Promise<boolean>;
  savePage(): Promise<void>;
  pageEdit(): boolean;
  manageRedirectorPage(redirectorUrl: string, mapping: IMap): Promise<boolean>;
}

export default class InitService implements IInitService {
  private LOG_SOURCE: string = 'Multilingual-InitService';
  private _context: ApplicationCustomizerContext;
  private _redirectorWebpartId: string;
  private _sitePagesLibraryId: string;

  constructor(context: ApplicationCustomizerContext, redirectorWebpartId: string) {
    this._context = context;
    this._redirectorWebpartId = redirectorWebpartId;
  }

  public async getLanguages(): Promise<ILanguage[]> {
    let data: ILanguages = null;
    try {
      let jsonString = await sp.web.getStorageEntity("LanguageConfig");
      if (jsonString.Value != null) {
        let languages = JSON.parse(jsonString.Value);
        return languages.languages;
      } else {
        return null;
      }
    }
    catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (getLanguages)`, LogLevel.Error);
      return null;
    }
  }

  private async getSitePagesLibraryId(): Promise<boolean> {
    let retVal = false;
    try {
      let lists = await sp.web.lists.select("Id", "EntityTypeName").filter("EntityTypeName eq 'SitePages'").get();
      if (lists.length == 1) {
        this._sitePagesLibraryId = lists[0].Id;
        retVal = true;
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (getSitePagesLibraryId)`, LogLevel.Error);
      return false;
    }
    return retVal;
  }

  public async validateConfig(languages: ILanguage[]): Promise<boolean> {
    let configService: ConfigService;
    let success = this.getSitePagesLibraryId();
    if (!success) {
      Logger.write(`Could not find Site Pages library Id - ${this.LOG_SOURCE} (validateConfig)`, LogLevel.Error);
      return false;
    }
    //Validate Site Columns... try to create them if not there.
    try {
      let siteColumns: Fields[] = await sp.web.fields.filter("Group eq 'Multilingual'").get();
      let siteFieldsValid = true;
      if ((lodash.find(siteColumns, ['Id', MultilingualFields.LanguageVariant.id]) == null)) {
        let defaultLangString = lodash.map(languages, 'code').join(' ');
        if (!configService) configService = new ConfigService(this._sitePagesLibraryId);
        let resultLanguage = await configService.createSiteColumn(this._context, MultilingualFields.LanguageVariant.id, MultilingualFields.LanguageVariant.xml, defaultLangString);
        if (!resultLanguage)
          siteFieldsValid = false;
      }
      if (siteFieldsValid && (lodash.find(siteColumns, ['Id', MultilingualFields.LastSynced.id]) == null)) {
        if (!configService) configService = new ConfigService(this._sitePagesLibraryId);
        let resultLastSync = await configService.createSiteColumn(this._context, MultilingualFields.LastSynced.id, MultilingualFields.LastSynced.xml, null);
        if (!resultLastSync)
          siteFieldsValid = false;
      }
      if (siteFieldsValid && (lodash.find(siteColumns, ['Id', MultilingualFields.MasterTranslationPage.id]) == null)) {
        if (!configService) configService = new ConfigService(this._sitePagesLibraryId);
        let resultMTP = await configService.createSiteColumn(this._context, MultilingualFields.MasterTranslationPage.id, MultilingualFields.MasterTranslationPage.xml, null);
        if (!resultMTP)
          siteFieldsValid = false;
      }
      if (siteFieldsValid && (lodash.find(siteColumns, ['Id', MultilingualFields.LanguageFolder.id]) == null)) {
        if (!configService) configService = new ConfigService(this._sitePagesLibraryId);
        let resultLF = await configService.createSiteColumn(this._context, MultilingualFields.LanguageFolder.id, MultilingualFields.LanguageFolder.xml, null);
        if (!resultLF)
          siteFieldsValid = false;
      }
      if (siteFieldsValid && (lodash.find(siteColumns, ['Id', MultilingualFields.RedirectorPage.id]) == null)) {
        if (!configService) configService = new ConfigService(this._sitePagesLibraryId);
        let resultRP = await configService.createSiteColumn(this._context, MultilingualFields.RedirectorPage.id, MultilingualFields.RedirectorPage.xml, null);
        if (!resultRP)
          siteFieldsValid = false;
      }
      if (!siteFieldsValid)
        return false;

      //Validate Folders in SitePages library
      let existingFolders: string[] = [];
      const viewXml = `<View Scope='RecursiveAll'><ViewFields><FieldRef Name='FileLeafRef'/></ViewFields><Query><Eq><FieldRef Name='ContentType'/><Value Type='Computed'>Folder</Value></Eq></Query></View>`;
      const viewUrl = `${this._context.pageContext.site.absoluteUrl}/_api/web/Lists/GetById('${this._sitePagesLibraryId}')/RenderListDataAsStream`;
      const body = { "parameters": { "RenderOptions": 0, "ViewXml": viewXml } };
      var fieldOptions = {
        headers: { Accept: "application/json;odata.metadata=none" },
        body: JSON.stringify(body)
      };
      let response = await this._context.spHttpClient.post(viewUrl, SPHttpClient.configurations.v1, fieldOptions);

      if (response.status == 200) {
        let data = await response.json();
        if (data.Row.length > 0) {
          data.Row.forEach((folder) => {
            existingFolders.push(folder.FileLeafRef);
          });
        }
      }

      let foldersValid: boolean = true;
      for (var j = 0; j < languages.length; j++) {
        let language: ILanguage = languages[j];
        let languageFolder = `SitePages/${language.code}`;
        let folder = lodash.includes(existingFolders, language.code);
        if (!folder) {
          if (!configService) configService = new ConfigService(this._sitePagesLibraryId);
          let resultFolder = await sp.web.folders.add(languageFolder);
          if (!resultFolder)
            foldersValid = false;
        }
      }
      if (!foldersValid)
        return false;
      return true;
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (validateConfig)`, LogLevel.Error);
      return false;
    }
  }

  public async getAllPages(languages: ILanguage[], currentUrl: string): Promise<IPageProperties[]> {
    var allPages: IPageProperties[] = [];
    const viewXml = `<View Scope='RecursiveAll'><ViewFields><FieldRef Name='ID'/><FieldRef Name='FileLeafRef'/><FieldRef Name='FileRef'/><FieldRef Name='Title'/><FieldRef Name='LanguageVariant'/>`
      + `<FieldRef Name='LastSynced'/><FieldRef Name='MasterTranslationPage'/><FieldRef Name='LanguageFolder'/><FieldRef Name='RedirectorPage'/><FieldRef Name='_UIVersionString'/><FieldRef Name='Modified'/><FieldRef Name='Editor'/><FieldRef Name='ContentType'/></ViewFields><Query></Query></View>`;
    const viewUrl = `${this._context.pageContext.site.absoluteUrl}/_api/web/Lists/GetById('${this._sitePagesLibraryId}')/RenderListDataAsStream`;
    const body = { "parameters": { "RenderOptions": 0, "ViewXml": viewXml } };

    var fieldOptions = {
      headers: { Accept: "application/json;odata.metadata=none" },
      body: JSON.stringify(body)
    };

    try {
      let response = await this._context.spHttpClient.post(viewUrl, SPHttpClient.configurations.v1, fieldOptions);

      if (response.status == 200) {
        let data = await response.json();
        if (data.Row.length > 0) {
          data.Row.forEach((page) => {
            if (page.ContentType != "Folder") {
              let url = page.FileRef;
              let spUrl = url.substr(url.toLowerCase().indexOf('sitepages'));
              let match = spUrl.match("(.{2}-.{2,4})\/");
              let rootFolder = ((url.substr(url.toLowerCase().indexOf('sitepages')).split("/").length - 1) == 1);
              //If file is in a recognized language folder add to the appPages list
              if (rootFolder || (match != null && match.length == 2 && (lodash.find(languages, (lang) => { return (lang.code.toLowerCase() == match[1].toLowerCase()); }) != null))) {
                let p: IPageProperties = new PageProperties();
                p.Id = page.ID;
                p.FileLeafRef = page.FileLeafRef;
                p.ContentType = page.ContentType;
                p.LanguageFolder = !rootFolder ? match[1] : "";
                let languageVariant = page.LanguageVariant ? page.LanguageVariant.split(' ') : [];
                p.LanguageVariant = languageVariant;
                p.LastSynced = page.LastSynced;
                p.LastModified = page.Modified;
                p.ModifiedBy = page.Editor[0]["email"];
                let diff = (Date.parse(p.LastModified) - Date.parse(p.LastSynced));
                if (diff > 0) {
                  //seconds
                  p.DurationSinceSync = Math.round(((diff % 86400000) % 3600000) / 1000);
                }
                p.MasterTranslationPage = page.MasterTranslationPage;
                p.RedirectorPage = page.RedirectorPage;
                p.Url = page.FileRef.toLowerCase();
                p.Current = ((`${document.location.origin}${url}`).toLowerCase() == currentUrl) ? true : false;
                p.Version = +page._UIVersionString;
                allPages.push(p);
              }
            }
          });
        }
      }
      return allPages;
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (getAllPages)`, LogLevel.Error);
      return null;
    }
  }

  public pageEdit(): boolean {
    try {
      let retVal: boolean = false;
      //using bitwize operation because reference to SPPermission causes app customizer not to load.
      retVal = ((this._context.pageContext.list.permissions.value.High & 4) > 0 || (this._context.pageContext.list.permissions.value.Low & 4) > 0);
      return retVal;
    } catch (err) {
      //Don't log failure, means user doesn't have edit rights.
      Logger.write(`${this.LOG_SOURCE} (pageEdit) - User does not have edit rights to Site Pages library.`, LogLevel.Info);
      return false;
    }
  }

  public async checkoutPage(): Promise<boolean> {
    try {
      const pageUrl = `${this._context.pageContext.site.absoluteUrl}/_api/sitepages/pages(${this._context.pageContext.listItem.id})/checkoutpage`;
      const fieldOptions = {
        headers: {}
      };
      let response = await this._context.spHttpClient.post(pageUrl, SPHttpClient.configurations.v1, fieldOptions);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (checkoutPage)`, LogLevel.Error);
    }
    return false;
  }

  public async savePage(): Promise<void> {
    try {
      const pageUrl = `${this._context.pageContext.site.absoluteUrl}/_api/sitepages/pages(${this._context.pageContext.listItem.id})/SavePage`;
      const body = { "__metadata": { "type": "SP.Publishing.SitePage" } };
      const fieldOptions = {
        headers: {},
        body: JSON.stringify(body)
      };
      let response = await this._context.spHttpClient.post(pageUrl, SPHttpClient.configurations.v1, fieldOptions);
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (savePage) `, LogLevel.Error);
    }
    return;
  }

  public async manageRedirectorPage(redirectorUrl: string, mapping: IMap): Promise<boolean> {

    //Remove and recreate page becase as of build time getPage fails to load the page.
    let redirectorPage: ClientSidePage;
    let file: File;
    try {
      file = await sp.web.getFileByServerRelativeUrl(redirectorUrl.replace(/'/g, "''")).get();
    } catch (err) { }
    try {
      if (file) {
        redirectorPage = await ClientSidePage.fromFile(sp.web.getFileByServerRelativeUrl(redirectorUrl.replace(/'/g, "''")));
      } else {
        let pageName = redirectorUrl.substr(redirectorUrl.lastIndexOf("/") + 1);
        let pageUrl = redirectorUrl.substring(0, redirectorUrl.lastIndexOf("/"));
        redirectorPage = await sp.web.addClientSidePageByPath(pageName, pageUrl);
      }
      if (redirectorPage) {
        if (redirectorPage.sections.length > 0) {
          redirectorPage.sections[0].remove();
        }
        let section = redirectorPage.addSection();
        let column = section.defaultColumn;

        const partDefs = await sp.web.getClientSideWebParts();
        const partDef = lodash.find(partDefs, { Id: this._redirectorWebpartId });
        if (!partDef) {
          Logger.write(`${this.LOG_SOURCE} (manageRedirectorPage) - Could not find redirector web part ${this._redirectorWebpartId} (Must be in upper case) - ${redirectorUrl}`, LogLevel.Error);
          return false;
        }

        // create a ClientWebPart instance from the definition
        const part = ClientSideWebpart.fromComponentDef(partDef);
        let map: string = JSON.stringify(mapping);
        part.setProperties<{ redirectionMap: string }>({ redirectionMap: map });

        column.addControl(part);
        Logger.write(`${this.LOG_SOURCE} (manageRedirectorPage) - Webpart added to section ${redirectorPage.sections.length}, ${redirectorPage.sections[0].defaultColumn.controls.length}`, LogLevel.Info);
        //Update
        let resultSave = await redirectorPage.save();
        await redirectorPage.checkin("Added Redirector", CheckinType.Major);
        Logger.write(`${this.LOG_SOURCE} (manageRedirectorPage) - Saved and Checked In Redirector Page ${resultSave.data["odata.etag"]}`, LogLevel.Info);
        return true;
      } else {
        Logger.write(`${this.LOG_SOURCE} (manageRedirectorPage) - failed to create redirector page - ${redirectorUrl}`, LogLevel.Error);
        return false;
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (manageRedirectorPage)`, LogLevel.Error);
      return false;
    }
  }
}