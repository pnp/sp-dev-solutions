import * as React from 'react';
import "@pnp/polyfill-ie11";

import styles from "./MultilingualExtension.module.scss";
import * as lodash from 'lodash';
import { IPageProperties, ILanguage, IPageVariants, ILanguageSelectOption } from '../../../common/models/Models';
import { DefaultButton, IconButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Logger, LogLevel } from "@pnp/logging";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { sp } from '@pnp/sp';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import LanguageSelector from '../atom/LanguageSelector';

export interface IMultilingualButtonProps {
  languages: ILanguage[];
  setShowPanel: () => void;
  editMode: boolean;
  rootFolder: boolean;
  currentPage: IPageProperties;
  variantPages: IPageProperties[];
  setEditMode: () => Promise<void>;
  userCanEdit: boolean;
}

export interface IMultilingualButtonState {
  buttonLabel: string;
  pageLanguages: IPageVariants[];
  pageLanguagesOptions: ILanguageSelectOption[];
  defaultOption: string;
  currentPageInit: boolean;
  movePageLocation: string;
  movingPage: boolean;
  promptMovePage: boolean;
}

export class MultilingualButtonState implements IMultilingualButtonState {
  constructor(
    public buttonLabel: string = "Language Details",
    public pageLanguages: IPageVariants[] = [],
    public pageLanguagesOptions: ILanguageSelectOption[] = [],
    public defaultOption: string = "",
    public currentPageInit: boolean = false,
    public movePageLocation: string = "",
    public movingPage: boolean = false,
    public promptMovePage: boolean = false
  ) { }
}

export class MultilingualButton extends React.Component<IMultilingualButtonProps, IMultilingualButtonState> {
  private LOG_SOURCE: string = 'MultilingualButton';
  private variantsChanged: boolean = false;

  constructor(props) {
    super(props);
    this.state = new MultilingualButtonState("Language Details", [], [], "", false, this.props.languages[0].code);
  }

  public componentDidUpdate() {
    if (this.variantsChanged || (this.props.currentPage.Id != "" && this.state.defaultOption == "")) {
      this.variantsChanged = false;
      this.init();
    }
  }

  public shouldComponentUpdate(nextProps: Readonly<IMultilingualButtonProps>, nextState: Readonly<IMultilingualButtonState>) {
    if (!nextProps.currentPage || nextProps.currentPage.Id == "" || (lodash.isEqual(nextState, this.state) && lodash.isEqual(nextProps, this.props)))
      return false;
    if (!lodash.isEqual(nextProps.variantPages, this.props.variantPages) || !lodash.isEqual(nextProps.currentPage, this.props.currentPage))
      this.variantsChanged = true;
    return true;
  }

  private init(): void {
    if (this.props.rootFolder) { return; }
    let pageLanguages: IPageVariants[] = [];
    let pageLanguagesOptions: ILanguageSelectOption[] = [];
    let defaultOption: string = "";
    try {
      let currentPageInit: boolean = !(this.props.currentPage.MasterTranslationPage == "");
      if (this.props.currentPage.LanguageVariant.length == 0) {
        pageLanguages.push({ variant: this.props.currentPage.LanguageFolder, url: this.props.currentPage.Url });
        let language = lodash.find(this.props.languages, { code: this.props.currentPage.LanguageFolder });
        pageLanguagesOptions.push({ key: this.props.currentPage.LanguageFolder, text: language.description, selected: true, master: false });
        defaultOption = this.props.currentPage.LanguageFolder;
      } else {
        if (this.props.currentPage.MasterTranslationPage == this.props.currentPage.Id) {
          let langDesc = lodash.find(this.props.languages, { code: this.props.currentPage.LanguageFolder }).description;
          pageLanguages.push({ variant: this.props.currentPage.LanguageFolder, url: this.props.currentPage.Url });
          pageLanguagesOptions.push({ key: this.props.currentPage.LanguageFolder, text: langDesc, selected: true, master: true });
          defaultOption = `Default - ${langDesc}`;
        } else {
          let variants = this.props.currentPage.LanguageVariant.join(", ");
          if (variants.lastIndexOf(",") > -1)
            variants = variants.slice(0, variants.lastIndexOf(","));
          pageLanguages.push({ variant: variants, url: this.props.currentPage.Url });
          let language = lodash.find(this.props.languages, { code: this.props.currentPage.LanguageFolder });
          pageLanguagesOptions.push({ key: this.props.currentPage.LanguageFolder, text: language.description, selected: true, master: false });
          defaultOption = variants;
        }
      }
      if (this.props.variantPages.length > 0) {
        this.props.variantPages.forEach((variant: IPageProperties) => {
          if (variant.MasterTranslationPage == variant.Id) {
            let langDesc = lodash.find(this.props.languages, { code: variant.LanguageFolder }).description;
            pageLanguages.push({ variant: variant.LanguageFolder, url: variant.Url });
            pageLanguagesOptions.push({ key: variant.LanguageFolder, text: langDesc, selected: false, master: true });
          } else {
            if (variant.LanguageVariant.length > 0) {
              let variants = variant.LanguageVariant.join(", ");
              if (variants.lastIndexOf(",") > -1)
                variants = variants.slice(0, variants.lastIndexOf(","));
              pageLanguages.push({ variant: variants, url: variant.Url });
              let language = lodash.find(this.props.languages, { code: variant.LanguageFolder });
              pageLanguagesOptions.push({ key: variant.LanguageFolder, text: language.description, selected: false, master: false });
            }
          }
        });
      }
      this.setState({
        currentPageInit: currentPageInit,
        pageLanguages: pageLanguages,
        pageLanguagesOptions: pageLanguagesOptions,
        defaultOption: defaultOption
      });
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (init)`, LogLevel.Error);
    }
    return;
  }


  private changePage = (value: string): void => {
    try {
      let variantLocation = lodash.find(this.state.pageLanguages, ["variant", value]);
      if (variantLocation != null) {
        let urlRedirect = `${variantLocation.url}`;
        if (this.props.currentPage.ContentType === "Repost Page") {
          urlRedirect = `${urlRedirect}?stay=true`;
        }
        document.location.href = urlRedirect;
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (changePage)`, LogLevel.Error);
    }
  }

  private movePageLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    this.setState({
      movePageLocation: value
    });
  }

  private async movePage() {
    try {
      let url = this.props.currentPage.Url;
      let currentUrl = document.location.pathname.toLowerCase();
      if (currentUrl != url)
        url = currentUrl;
      let redirectUrl = url.replace("sitepages", `sitepages/${this.state.movePageLocation}`);
      let destUrl = url.replace("sitepages", `sitepages/${this.state.movePageLocation}`).replace(/'/g, "''");
      let sourceUrl = url.replace(/'/g, "''");
      await sp.web.getFileByServerRelativeUrl(sourceUrl).moveTo(destUrl);
      let urlRedirect = `${redirectUrl.split("?")[0]}`;
      if (this.props.currentPage.ContentType === "Repost Page") {
        urlRedirect = `${urlRedirect}?stay=true&Mode=Edit`;
        console.error(`Redirecting Repost Page to: ${urlRedirect}`);
      } else {
        urlRedirect = `${urlRedirect}${document.location.search}`;
        console.error(`Redirecting Regular Page to: ${urlRedirect}`);
      }
      document.location.href = urlRedirect;
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (movePage)`, LogLevel.Error);
      this.setState({
        movingPage: false
      });
    }
  }

  private doMovePage = async () => {
    this.setState({ promptMovePage: false, movingPage: true }, () => {
      this.movePage();
    });
  }

  private promptMovePage = () => {
    if (this.state.movePageLocation == "") return;
    this.setState({ promptMovePage: true });
  }

  public render() {
    return (
      <div className={styles.multilingualButton} >
        {this.state.currentPageInit && !this.props.rootFolder && !this.props.editMode &&
          <LanguageSelector pageLanguages={this.state.pageLanguagesOptions} changePage={this.changePage} />
        }
        {this.props.userCanEdit && !this.state.currentPageInit && !this.props.rootFolder && !this.props.editMode &&
          <IconButton className={styles.languageButton + " ms-fontColor-redDark"}
            iconProps={{ iconName: 'Error' }}
            title="Multilingual Not Configured"
            onClick={this.props.setEditMode}
          />
        }
        {!this.props.rootFolder && this.props.editMode &&
          <PrimaryButton className={styles.languageButton}
            primary={true}
            text={this.state.buttonLabel}
            onClick={this.props.setShowPanel}
          />
        }
        {this.props.userCanEdit && this.props.rootFolder &&
          <div className={styles.buttonMovePage}>
            <Label className={styles.label}>Folder: </Label>
            <select className={styles.languageCombo + " " + styles.label} onChange={this.movePageLocation} value={this.state.movePageLocation}>
              {this.props.languages && this.props.languages.map((o) => {
                return (
                  <option key={o.code} value={o.code}>{o.description}</option>
                );
              })}
            </select>
            {!this.state.movingPage &&
              <DefaultButton className={styles.languageButton + " ms-bgColor-redDark ms-fontColor-white"}
                text="Move Page"
                onClick={this.promptMovePage}
              />
            }
            {this.state.movingPage &&
              <Spinner className={styles.spinner} size={SpinnerSize.medium} />
            }
          </div>
        }
        <Dialog
          hidden={!this.state.promptMovePage}
          onDismiss={() => this.setState({ promptMovePage: false })}
          dialogContentProps={{
            type: DialogType.normal,
            title: "Confirm Move Page to Language Folder",
            subText: `This action will move this page from its current location to the ${this.state.movePageLocation} language folder, making it unavailable from here.  If this is not what you intended, or you are not clear on the consequences of this move, please cancel and ask for support.`
          }}
          modalProps={{
            titleAriaId: 'promptMoveLabelId',
            subtitleAriaId: 'promptMoveSubtextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={this.doMovePage} text="Move Page" />
            <DefaultButton onClick={() => this.setState({ promptMovePage: false })} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}




