import * as React from 'react';
import * as lodash from 'lodash';
import "@pnp/polyfill-ie11";
import { MultilingualButton } from './MultilingualButton';
import { MultilingualPanel } from './MultilingualPanel';
import { ILanguage, IPageProperties, PageProperties, IMap } from '../../../common/models/Models';
import { sp } from '@pnp/sp';

import { Logger, LogLevel } from "@pnp/logging";
import styles from './MultilingualExtension.module.scss';

export interface IMultilingualContainerProps {
  editMode: boolean;
  rootFolder: boolean;
  languages: ILanguage[];
  pages: IPageProperties[];
  url: string;
  userCanEdit: boolean;
  disable: () => void;
  reloadPages: () => Promise<void>;
  savePage: () => Promise<void>;
  setEditMode: () => Promise<void>;
  manageRedirectorPage: (redirectorUrl: string, mapping: IMap) => Promise<boolean>;
}

export interface IMultilingualContainerState {
  showPanel: boolean;
  currentPage: IPageProperties;
  variantPages: IPageProperties[];
}

export class MultilingualContainerState implements IMultilingualContainerState {
  constructor(
    public showPanel: boolean = false,
    public currentPage: IPageProperties = new PageProperties(),
    public variantPages: IPageProperties[] = []
  ) { }
}

export class MultilingualContainer extends React.Component<IMultilingualContainerProps, IMultilingualContainerState> {
  private LOG_SOURCE: string = 'MultilingualContainer';
  private _reinit: boolean = false;

  constructor(props) {
    super(props);
    this.state = new MultilingualContainerState();
  }

  public async componentDidMount(): Promise<void> {
    this.updatePageState();
    if (this.props.rootFolder) {
      //Remove metadata if necessary
      if (this.state.currentPage.MasterTranslationPage != "") {
        let currentPage = this.state.currentPage;
        let list = sp.web.lists.getByTitle("Site Pages");
        let entityTypeFullName = await list.getListItemEntityTypeFullName();
        let updateMasterResult = await sp.web.lists.getByTitle('Site Pages').items.getById(+currentPage.Id).update({ MasterTranslationPage: "", LanguageVariant: "", LastSynced: "", LanguageFolder: "" }, "*", entityTypeFullName);
        currentPage.LanguageFolder = "";
        currentPage.LanguageVariant = [];
        currentPage.LastModified = "";
        currentPage.MasterTranslationPage = "";
        this.setState({
          currentPage: currentPage
        });
      }
    }
  }

  public shouldComponentUpdate(nextProps: Readonly<IMultilingualContainerProps>, nextState: Readonly<IMultilingualContainerState>) {
    if ((lodash.isEqual(nextState, this.state) && lodash.isEqual(nextProps, this.props)))
      return false;
    //Variant pages may have changed during pages reload, if so reinit component state.
    if (!lodash.isEqual(nextProps.pages, this.props.pages))
      this._reinit = true;
    return true;
  }

  public componentDidUpdate() {
    if (this._reinit && this.props.pages.length > 0) {
      this._reinit = false;
      this.updatePageState();
    }
  }

  private setShowPanel = (): void => {
    var show: boolean = !this.state.showPanel;
    this.setState({
      showPanel: show
    });
  }

  private updatePageState() {
    let currentPage = lodash.find(this.props.pages, { Current: true });
    if (currentPage) {
      let masterTranslationId = (currentPage.MasterTranslationPage == "") ? currentPage.Id : currentPage.MasterTranslationPage;
      let variantPages = lodash.filter(this.props.pages, { MasterTranslationPage: masterTranslationId, Current: false });
      this.setState({
        currentPage: currentPage,
        variantPages: variantPages
      });
    } else {
      Logger.write(`${this.LOG_SOURCE} (updatePageState) - Current page is not found.`, LogLevel.Error);
    }
  }

  public render() {
    if (!this.state.currentPage) return null;
    return (
      <div className={styles.multilingualContainer}>
        <MultilingualButton
          languages={this.props.languages}
          rootFolder={this.props.rootFolder}
          editMode={this.props.editMode}
          setShowPanel={this.setShowPanel}
          currentPage={this.state.currentPage}
          variantPages={this.state.variantPages}
          setEditMode={this.props.setEditMode}
          userCanEdit={this.props.userCanEdit}
        />
        {this.props.userCanEdit && !this.props.rootFolder &&
          <MultilingualPanel
            editMode={this.props.editMode}
            languages={this.props.languages}
            currentPage={this.state.currentPage}
            variantPages={this.state.variantPages}
            showPanel={this.state.showPanel}
            setShowPanel={this.setShowPanel}
            reloadPages={this.props.reloadPages}
            savePage={this.props.savePage}
            manageRedirectorPage={this.props.manageRedirectorPage}
          />
        }
      </div>
    );
  }
}
