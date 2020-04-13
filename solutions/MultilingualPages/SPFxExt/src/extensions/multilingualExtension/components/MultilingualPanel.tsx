import * as React from 'react';
import * as lodash from 'lodash';

import { Logger, LogLevel } from "@pnp/logging";
import "@pnp/polyfill-ie11";
import styles from './MultilingualExtension.module.scss';
import { ILanguage, IPageProperties, ITranslation, Translation, IMap, IRoute, Route } from '../../../common/models/Models';
import { IconButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { sp, ItemUpdateResult, EmailProperties } from '@pnp/sp';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import PageInformation from '../atom/PageInformation';

export interface IMultilingualPanelProps {
  editMode: boolean;
  languages: ILanguage[];
  currentPage: IPageProperties;
  variantPages: IPageProperties[];
  showPanel: boolean;
  setShowPanel: () => void;
  reloadPages: () => void;
  savePage: () => Promise<void>;
  manageRedirectorPage: (redirectorUrl: string, mapping: IMap) => Promise<boolean>;
}

export interface IMultilingualPanelState {
  pageNotMaster: boolean;
  lockedTranslations: boolean;
  masterPageUrl: string;
  currentLanguage: ITranslation;
  otherLanguages: ITranslation[];
  hasChanged: boolean;
  translateAdd: string[];
  translateRemove: string[];
  workingApply: boolean;
  workingRetranslate: boolean;
  emailComment: string;
  redirectorPage: boolean;
  redirectorPageUrl: string;
  replaceAllPages: boolean;
}

export class MultilingualPanelState implements IMultilingualPanelState {
  constructor(
    public pageNotMaster: boolean = false,
    public lockedTranslations: boolean = false,
    public masterPageUrl: string = "",
    public currentLanguage: ITranslation = null,
    public otherLanguages: ITranslation[] = null,
    public hasChanged: boolean = false,
    public translateAdd: string[] = [],
    public translateRemove: string[] = [],
    public workingApply: boolean = false,
    public workingRetranslate: boolean = false,
    public emailComment: string = "",
    public redirectorPage: boolean = false,
    public redirectorPageUrl: string = "",
    public replaceAllPages: boolean = false
  ) { }
}

export class MultilingualPanel extends React.Component<IMultilingualPanelProps, IMultilingualPanelState> {
  private LOG_SOURCE: string = 'MultilingualPanel';
  private _reinit: boolean = false;

  constructor(props) {
    super(props);
    this.state = new MultilingualPanelState();
  }

  public componentDidUpdate() {
    if ((this.props.currentPage.Id != "" && this.state.currentLanguage == null) || this._reinit) {
      this._reinit = false;
      this.init();
    }
  }

  public shouldComponentUpdate(nextProps: Readonly<IMultilingualPanelProps>, nextState: Readonly<IMultilingualPanelState>) {
    if (!nextProps.currentPage || nextProps.currentPage.Id == "" || (lodash.isEqual(nextState, this.state) && lodash.isEqual(nextProps, this.props)))
      return false;
    //Variant pages may have changed during pages reload, if so reinit component state.
    if (!lodash.isEqual(nextProps.variantPages, this.props.variantPages))
      this._reinit = true;
    return true;
  }

  private init() {
    let pageNotMaster: boolean = false;
    let masterPageUrl: string = this.props.currentPage.Url;
    let currentLanguage: ITranslation = new Translation();
    let otherLanguages: ITranslation[] = [];
    try {
      let redirectorPage = (this.props.currentPage.RedirectorPage && this.props.currentPage.RedirectorPage.length > 0);
      let redirectorPageUrl = this.props.currentPage.RedirectorPage;
      this.props.languages.forEach((lang) => {
        if (lang.code == this.props.currentPage.LanguageFolder) {
          //current
          currentLanguage.Page = this.props.currentPage;
          currentLanguage.TranslationLanguage = lang;
        } else {
          //other
          let t: ITranslation = new Translation();
          t.TranslationLanguage = lang;
          t.Page = lodash.find(this.props.variantPages, { LanguageFolder: lang.code });
          //Check if page is master, if not assume current page is master
          if (t.Page && !this.state.pageNotMaster && !pageNotMaster) {
            if (t.Page.Id === t.Page.MasterTranslationPage) {
              pageNotMaster = true;
              masterPageUrl = t.Page.Url;
              redirectorPage = (t.Page.RedirectorPage && t.Page.RedirectorPage.length > 0);
              redirectorPageUrl = t.Page.RedirectorPage;
            }
          }
          otherLanguages.push(t);
        }
      });
      let lockedTranslationsArray = lodash.filter(this.props.variantPages, (variant) => {
        if (variant.Version >= 1.0 && variant.DurationSinceSync > 30) return true;
        return false;
      });
      let lockedTranslations = lockedTranslationsArray.length > 0;
      this.setState({
        lockedTranslations: lockedTranslations,
        pageNotMaster: pageNotMaster,
        currentLanguage: currentLanguage,
        otherLanguages: otherLanguages,
        masterPageUrl: masterPageUrl,
        redirectorPage: redirectorPage,
        redirectorPageUrl: redirectorPageUrl
      });
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE}`, LogLevel.Error);
    }
  }

  private doTranslation = (language: string, checked?: boolean) => {
    let translateAdd = this.state.translateAdd;
    let translateRemove = this.state.translateRemove;
    try {
      if (checked) {
        if (!lodash.includes(translateRemove, language)) {
          translateAdd.push(language);
        } else {
          lodash.pull(translateRemove, language);
        }
      } else {
        if (!lodash.includes(translateAdd, language)) {
          translateRemove.push(language);
        } else {
          lodash.pull(translateAdd, language);
        }
      }
      let hasChanged = (translateAdd.length != 0 || translateRemove.length != 0);

      this.setState({
        translateAdd: translateAdd,
        translateRemove: translateRemove,
        hasChanged: hasChanged
      });
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE}`, LogLevel.Error);
    }
  }

  private getMasterLanguages(): string {
    try {
      let masterLanguagesArray = lodash.filter(this.props.languages, (lang) => {
        if (lang.code == this.state.currentLanguage.TranslationLanguage.code) return true;
        let willAdd = lodash.includes(this.state.translateAdd, lang.code);
        let willRemove = lodash.includes(this.state.translateRemove, lang.code);
        let exists = (lodash.find(this.props.variantPages, { LanguageFolder: lang.code }) != null);
        let retVal = false;
        retVal = (!willAdd || willRemove);
        if (retVal && (exists && !willRemove))
          retVal = false;
        return retVal;
      });

      let masterLanguages = lodash.map(masterLanguagesArray, 'code').join(' ');
      return masterLanguages;
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE}`, LogLevel.Error);
    }
    return "";
  }

  private doApply = (): void => {
    if (this.state.workingApply) return;
    this.setState({
      workingApply: true
    }, () => {
      if (!this.state.hasChanged)
        this.retranslate();
      else
        this.apply();
    });
  }

  private doReplaceAllPages = (checked?: boolean): void => {
    let replaceAllPages = checked;
    this.setState({
      replaceAllPages: replaceAllPages
    });
  }

  private doRedirectorPage = (checked?: boolean): void => {
    let redirectorUrl = "";
    if (checked) {
      let idxLastSlash = this.props.currentPage.Url.lastIndexOf("/");
      let idxLanguageFolder = this.props.currentPage.Url.indexOf(this.props.currentPage.LanguageFolder.toLowerCase());
      let replaceString = this.props.currentPage.Url.substring(idxLanguageFolder, idxLastSlash + 1);
      redirectorUrl = this.props.currentPage.Url.replace(replaceString, "").replace(/'/g, "''");
    }
    this.setState({
      redirectorPage: checked,
      redirectorPageUrl: redirectorUrl,
      hasChanged: true
    });
  }

  private async testFolderUrl(folderUrl: string): Promise<boolean> {
    try {
      await sp.web.getFolderByServerRelativeUrl(folderUrl).get();
      return true;
    } catch (err) {
      return false;
    }
  }

  private async validateFolders(destUrl: string, language: string): Promise<boolean> {
    try {
      let sitePagesArray = destUrl.split(language);
      if (sitePagesArray.length > 0) {
        let folders = (sitePagesArray[1].split("/").length - 1);
        if (folders > 1) {
          //Sub Folders exist, must be checked
          let folderUrl = destUrl.substr(0, destUrl.lastIndexOf("/"));
          let exists = await this.testFolderUrl(folderUrl);
          if (!exists) {
            let addFolder = await sp.web.folders.add(folderUrl);
          }
        }
      }
      return true;
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE}`, LogLevel.Error);
      return false;
    }
  }

  private async getFileItemId(destUrl: string): Promise<number> {
    let item;
    destUrl = destUrl.replace(/&/g, "%26"); // replace & as it would inadvertently introduce a new query string parameter
    while (!item) {
      try {
        let items = await sp.web.lists.getByTitle("Site Pages").items.filter(`FileRef%20eq%20%27${destUrl}%27`).select("Id").get<{ Id: number }[]>();
        if (items.length === 1) {
          item = items[0];
        }
      } catch (err) {

      }
    }
    return item.Id;
  }

  private async apply(): Promise<void> {
    try {
      //Validate url hasn't changed, if has, reload pages which will not trigger refresh because only currentPage will change
      if (this.props.currentPage.Url.indexOf(document.location.pathname.toLowerCase()) === -1 && document.location.pathname.toLowerCase().indexOf('.aspx') > -1)
        await this.props.reloadPages();

      //What languages aren't covered
      let masterLanguages = this.getMasterLanguages();

      //Setup
      let list = sp.web.lists.getByTitle("Site Pages");
      let entityTypeFullName = await list.getListItemEntityTypeFullName();
      let lastSyncedDate = new Date();

      //Remove translations first... by removing properties
      if (this.state.translateRemove.length > 0) {
        for (let r = 0; r < this.state.translateRemove.length; r++) {
          let itemRemove: IPageProperties = lodash.find(this.props.variantPages, { LanguageFolder: this.state.translateRemove[r] });
          if (itemRemove) {
            let removeResult = await list.items.getById(+itemRemove.Id).update({ MasterTranslationPage: "", LanguageVariant: "" }, "*", entityTypeFullName);
            let eTag = removeResult.data["odata.etag"];
          }
        }
      }

      //Add new translations... copy page
      if (this.state.translateAdd.length > 0) {
        for (let i = 0; i < this.state.translateAdd.length; i++) {
          let lang = this.state.translateAdd[i];
          let destUrl = this.props.currentPage.Url.replace(this.props.currentPage.LanguageFolder.toLowerCase(), lang).replace(/'/g, "''");
          let exists = await this.validateFolders(destUrl, lang);
          if (exists) {
            let sourceUrl = this.props.currentPage.Url.replace(/'/g, "''");
            await sp.web.getFileByServerRelativeUrl(sourceUrl).copyTo(destUrl, true);
            let itemCreatedId = await this.getFileItemId(destUrl);
            let itemUpdateResult = await sp.web.lists.getByTitle('Site Pages').items.getById(itemCreatedId).update({ MasterTranslationPage: this.props.currentPage.Id, LanguageVariant: lang, LastSynced: lastSyncedDate.toISOString(), LanguageFolder: lang }, "*", entityTypeFullName);
            //let itemCreated = await sp.web.getFileByServerRelativeUrl(destUrl).getItem<{ Id: number }>("Id");
            //   if (itemCreated != null) {
            //     let itemUpdateResult = await sp.web.lists.getByTitle('Site Pages').items.getById(itemCreated.Id).update({ MasterTranslationPage: this.props.currentPage.Id, LanguageVariant: lang, LastSynced: lastSyncedDate.toISOString(), LanguageFolder: lang }, "*", entityTypeFullName);
            //   }
          }
        }
      }

      //Update current page properties (as master page)
      let fullRedirectorPageUrl = (this.state.redirectorPage) ? `${document.location.origin}${this.state.redirectorPageUrl}` : "";
      let redirectorPage = {
        "__metadata": { type: "SP.FieldUrlValue" },
        Description: fullRedirectorPageUrl,
        Url: fullRedirectorPageUrl
      };
      let updateMasterResult = await sp.web.lists.getByTitle('Site Pages').items.getById(+this.props.currentPage.Id).update({ MasterTranslationPage: this.props.currentPage.Id, LanguageVariant: masterLanguages, LastSynced: lastSyncedDate.toISOString(), LanguageFolder: this.props.currentPage.LanguageFolder, RedirectorPage: redirectorPage }, "*", entityTypeFullName);

      //Manage Redirector Page
      if (this.state.redirectorPage) {
        //Create Map
        let routes: IRoute[] = [];
        for (let i = 0; i < this.props.languages.length; i++) {
          let lang = this.props.languages[i];
          let route: IRoute;
          let langUrl = (masterLanguages.indexOf(lang.code) > -1) ? this.props.currentPage.Url : this.props.currentPage.Url.replace(this.props.currentPage.LanguageFolder.toLowerCase(), lang.code);
          route = new Route(lang.code.substr(0, 2), lang.description, `${document.location.origin}${langUrl}`);
          routes.push(route);
        }
        let map: IMap = {
          routes: routes
        };
        //Create/Update Redirector Page
        let redirector = await this.props.manageRedirectorPage(this.state.redirectorPageUrl, map);
      } else {
        //Remove Redirector Page
        if (this.props.currentPage.RedirectorPage.length > 0) {
          let removeUrl = this.props.currentPage.RedirectorPage.replace(/'/g, "''");
          await sp.web.getFileByServerRelativeUrl(removeUrl).delete();
        }
      }

      //Save Page
      this.props.savePage();

      //Assume retranslate for those pages that haven't been updated
      await this.retranslate(false, lastSyncedDate);

      //Close Panel
      this.props.setShowPanel();
      this.props.reloadPages();
      this.setState({
        workingApply: false,
        hasChanged: false,
        translateAdd: [],
        translateRemove: [],
        replaceAllPages: false
      });
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE}`, LogLevel.Error);
    }
    return;
  }

  private async retranslate(updateMaster: boolean = true, lastSyncedDate: Date = new Date()): Promise<void> {
    try {
      //Setup
      let list = sp.web.lists.getByTitle("Site Pages");
      let entityTypeFullName = await list.getListItemEntityTypeFullName();
      //Retranslate
      for (let i = 0; i < this.props.variantPages.length; i++) {
        //If ReplaceAllPages flag is set then just retranslate
        if (this.props.variantPages[i].DurationSinceSync <= 30 || this.state.replaceAllPages) {
          //Validate wasn't removed
          if (!lodash.includes(this.state.translateRemove, this.props.variantPages[i].LanguageFolder)) {
            //Copy again and overwrite.
            let sourceUrl = this.props.currentPage.Url.replace(/'/g, "''");
            let destUrl = this.props.variantPages[i].Url.replace(/'/g, "''");
            await sp.web.getFileByServerRelativeUrl(sourceUrl).copyTo(destUrl, true);
            let copyToResultId = await this.getFileItemId(destUrl);
            let itemUpdateResult: ItemUpdateResult = await sp.web.lists.getByTitle('Site Pages').items.getById(copyToResultId).update({ LanguageVariant: this.props.variantPages[i].LanguageVariant.join(' '), MasterTranslationPage: this.props.variantPages[i].MasterTranslationPage, LanguageFolder: this.props.variantPages[i].LanguageFolder, LastSynced: lastSyncedDate.toISOString() }, "*", entityTypeFullName);
            // let copyToResult = await sp.web.getFileByServerRelativeUrl(destUrl).getItem<{ Id: number }>("Id");
            // if (copyToResult != null) {
            //   let itemUpdateResult: ItemUpdateResult = await sp.web.lists.getByTitle('Site Pages').items.getById(copyToResult.Id).update({ LanguageVariant: this.props.variantPages[i].LanguageVariant.join(' '), MasterTranslationPage: this.props.variantPages[i].MasterTranslationPage, LanguageFolder: this.props.variantPages[i].LanguageFolder, LastSynced: lastSyncedDate.toISOString() }, "*", entityTypeFullName);
            // }
          }
        } else {
          //Notify last modified by that translation has changed?
          let currentUser = await sp.utility.getCurrentUserEmailAddresses();
          let editorComments = "";
          if (this.state.emailComment.length > 0)
            editorComments = `<p><strong>Editor Comments:</strong> ${this.state.emailComment}</p>`;
          let emailProps: EmailProperties = {
            To: [this.props.variantPages[i].ModifiedBy],
            CC: [currentUser],
            Subject: "Master translation change notification",
            Body: `<p>The master translation for page: <a href'${document.location.origin}${this.props.variantPages[i].Url}'>${document.location.origin}${this.props.variantPages[i].Url}</a> has changed.</p>${editorComments}`,
          };

          await sp.utility.sendEmail(emailProps);
        }
      }

      //Update current page properties (as master page)
      if (updateMaster) {
        let updateMasterResult = await sp.web.lists.getByTitle('Site Pages').items.getById(+this.props.currentPage.Id).update({ LastSynced: lastSyncedDate.toISOString() }, "*", entityTypeFullName);
        this.props.setShowPanel();
        this.props.savePage();
        this.props.reloadPages();
        //Assume need to turn working flag off if Master is updated.  
        this.setState({
          workingApply: false,
          emailComment: "",
          replaceAllPages: false
        });
      } else {
        this.setState({
          emailComment: ""
        });
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE}`, LogLevel.Error);
    }
    return;
  }

  private emailCommentChanged = (newText: string): void => {
    this.setState({
      emailComment: newText
    });
  }

  public render() {
    //Don't Render if currentLangugage hasn't or couldn't be initialized
    if (!this.state.currentLanguage) return null;
    //Render
    let masterTranslation: ITranslation = (this.state.pageNotMaster) ?
      lodash.find(this.state.otherLanguages, t => {
        if (t.Page) {
          return (t.Page.Id === t.Page.MasterTranslationPage);
        } else {
          return false;
        }
      })
      : this.state.currentLanguage;
    return (
      <div className={styles.multilingualPanel + ((this.props.editMode && this.props.showPanel) ? ' ' + styles.show : '')}>
        <div className={styles.hidePanel} onClick={this.props.setShowPanel}>
          <IconButton disabled={false} iconProps={{ iconName: 'ChromeClose' }} title="ChromeClose" ariaLabel="ChromeClose" />
        </div>
        <div className={styles.panelDetail}>
          <Label className={"ms-font-xl"}>Multilingual Page Details</Label>
          {this.state.currentLanguage.Page.MasterTranslationPage == "" &&
            <Label className={"ms-fontColor-themeSecondary ms-font-s"}>This page has not been translated.  To start a translation, select your language from the list below, then select "Apply Language Changes."</Label>
          }
          {this.state.pageNotMaster &&
            <Label className={"ms-fontColor-themeSecondary ms-font-s"}>This page is a translation of another page.  To modify the translation, please edit this page.  If the <a href={this.state.masterPageUrl}>Master Page</a> is modified, you will get an alert indicating that there are changes that you can use to update your translated page.</Label>
          }
          {(this.state.pageNotMaster) && [
            <Label className={"ms-fontWeight-semibold"}>This Page's Language:</Label>,
            <PageInformation class={styles.pageInfoCont} translation={this.state.currentLanguage} selected={true} savePage={this.props.savePage}></PageInformation>
          ]}
          <Label className={"ms-fontWeight-semibold"}>Master Translation Language:</Label>
          <PageInformation class={styles.pageInfoCont} translation={masterTranslation} selected={true} savePage={this.props.savePage}></PageInformation>
          <Label className={"ms-fontWeight-semibold"}>Other Translations: </Label>
          {this.state.otherLanguages && this.state.otherLanguages.map((t: ITranslation) => {
            if (t.Page && (t.Page.Id === t.Page.MasterTranslationPage)) return null;
            return (
              <div key={t.TranslationLanguage.code} className={styles.translationToggle}>
                <Toggle
                  className={styles.toggle}
                  defaultChecked={t.Page && (t.Page.Id != "")}
                  onChanged={(checked?) => { this.doTranslation(t.TranslationLanguage.code, checked); }}
                  disabled={this.state.pageNotMaster}
                />
                <PageInformation class={styles.desc} translation={t} selected={(t.Page || this.state.translateAdd.indexOf(t.TranslationLanguage.code) > -1) ? true : false} savePage={this.props.savePage}></PageInformation>
              </div>
            );
          })}
          <Label className={"ms-fontWeight-semibold"}>Redirector Page: </Label>
          <Toggle
            checked={this.state.redirectorPage}
            onText='On'
            offText='Off'
            onChanged={this.doRedirectorPage}
            disabled={this.state.pageNotMaster}
          />
          {this.state.redirectorPage && this.state.redirectorPageUrl && this.state.redirectorPageUrl.length > 0 &&
            <Label>{document.location.origin}{this.state.redirectorPageUrl}</Label>
          }
          {this.state.lockedTranslations && !this.state.replaceAllPages &&
            <TextField
              value={this.state.emailComment}
              label="Translator Comments:"
              multiline rows={4}
              onChanged={this.emailCommentChanged} />
          }
          {this.props.variantPages.length > 0 &&
            <div>
              <Label className={"ms-fontWeight-semibold"}>Replace Existing Pages: </Label>
              <Toggle
                checked={this.state.replaceAllPages}
                onText='On'
                offText='Off'
                onChanged={this.doReplaceAllPages}
                disabled={this.state.pageNotMaster}
              />
            </div>
          }
          <div className={styles.commandCont}>
            <div className={styles.panelCommand}>
              {this.state.workingApply &&
                <Spinner className={styles.spinner} size={SpinnerSize.large} />
              }
              <PrimaryButton
                text="Apply Language Changes"
                primary={true}
                disabled={(((this.props.currentPage.MasterTranslationPage === "") && !this.state.hasChanged) || this.state.pageNotMaster)}
                onClick={this.doApply}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
