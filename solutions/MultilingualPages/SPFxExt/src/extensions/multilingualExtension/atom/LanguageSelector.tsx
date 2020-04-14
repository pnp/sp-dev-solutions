import * as React from "react";
import { Logger, LogLevel } from "@pnp/logging";
import "@pnp/polyfill-ie11";
import * as lodash from "lodash";
import styles from "../components/MultilingualExtension.module.scss";

import { ILanguageSelectOption } from '../../../common/models/Models';

export interface ILanguageSelectorProps {
  pageLanguages: ILanguageSelectOption[];
  changePage: (value: string) => void;
}

export interface ILanguageSelectorState {
  mobileShow: boolean;
}

export class LanguageSelectorState implements ILanguageSelectorState {
  constructor(
    public mobileShow: boolean = false
  ) { }
}

export default class LanguageSelector extends React.Component<ILanguageSelectorProps, ILanguageSelectorState> {
  private LOG_SOURCE: string = "LanguageSelector";

  constructor(props) {
    super(props);
    this.state = new LanguageSelectorState();
  }

  public shouldComponentUpdate(nextProps: Readonly<ILanguageSelectorProps>, nextState: Readonly<ILanguageSelectorState>) {
    if ((lodash.isEqual(nextState, this.state) && lodash.isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  public render(): React.ReactElement<ILanguageSelectorProps> {
    let currentLanguage: ILanguageSelectOption = lodash.find(this.props.pageLanguages, { selected: true });
    let otherLanguages: ILanguageSelectOption[] = lodash.filter(this.props.pageLanguages, { selected: false });
    try {
      return (
        <div className={styles.languageSelectorCont + (this.state.mobileShow ? ` ${styles.show}` : "")}>
          <div className={styles.languageSelect}>
            <div className={styles.selected + " ms-fontWeight-semibold"}>
              <span>{currentLanguage.text}</span>
              <span className={styles.nonMobileShow + " ms-Icon ms-Icon--ChevronRight"}></span>
              <span className={styles.mobileShow + " ms-Icon" + (this.state.mobileShow ? " ms-Icon--ChevronDown" : " ms-Icon--ChevronRight")} onClick={() => { this.setState({ mobileShow: !this.state.mobileShow }); }}></span>
            </div>
            {otherLanguages.map((p) => {
              return (<div className={styles.languageOther} onClick={() => { this.props.changePage(p.key); }}>
                <span>{p.text}</span>
              </div>);
            })}
          </div>
        </div>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (render)`, LogLevel.Error);
      return null;
    }
  }
}