import * as React from "react";
import { Logger, LogLevel } from "@pnp/logging";
import "@pnp/polyfill-ie11";
import * as lodash from "lodash";
import styles from '../components/MultilingualExtension.module.scss';

import { ITranslation } from '../../../common/models/Models';

import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { Label } from 'office-ui-fabric-react/lib/Label';

export interface IPageInformationProps {
  class: string;
  translation: ITranslation;
  selected: boolean;
  savePage: () => Promise<void>;
}

export interface IPageInformationState {
  showInfo: boolean;
}

export class PageInformationState implements IPageInformationState {
  constructor(
    public showInfo: boolean = false
  ) { }
}

export default class PageInformation extends React.Component<IPageInformationProps, IPageInformationState> {
  private LOG_SOURCE: string = "PageInformation";

  constructor(props) {
    super(props);
    this.state = new PageInformationState();
  }

  public shouldComponentUpdate(nextProps: Readonly<IPageInformationProps>, nextState: Readonly<IPageInformationState>) {
    if ((lodash.isEqual(nextState, this.state) && lodash.isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  private toggleInfo = () => {
    let showInfo = this.state.showInfo;
    this.setState({ showInfo: !showInfo });
  }

  private gotoPage = async() => {
    let url: string = `${this.props.translation.Page.Url}?Mode=Edit`;
    window.open(url, "blank");    
  }

  private getPanel = (): Array<JSX.Element> => {
    let retVal = [];
    retVal.push(<Label>
      <span className={`${styles.pageInfoTitle} ${(this.props.selected) ? styles.selected : ""}`} onClick={this.gotoPage}>{this.props.translation.TranslationLanguage.description}</span>
      {this.props.selected && this.props.translation.Page &&
        <TooltipHost
          content="More information"
          directionalHint={DirectionalHint.topLeftEdge}
          calloutProps={{ gapSpace: 0 }}>
          <i className={`${styles.iconPanel} ms-Icon ms-Icon--Info`} aria-hidden="true" onClick={this.toggleInfo}></i>
        </TooltipHost>
      }
    </Label>);
    if (this.state.showInfo) {
      retVal.push(
        <div className={styles.pageInfoPanel}>
          <div><span className="ms-fontWeight-semibold">Status:</span> {(this.props.translation.Page.Version >= 1) ? "P" : "Not P"}ublished</div>
          <div className="ms-fontWeight-semibold">Modified:</div>
          <div className={styles.info}>{this.props.translation.Page.ModifiedBy} on {this.props.translation.Page.LastModified}</div>
          <div className="ms-fontWeight-semibold">Last synced:</div>
          <div>{this.props.translation.Page.LastSynced}</div>
          <div>{((this.props.translation.Page.Version >= 1.0) && (this.props.translation.Page.DurationSinceSync > 30)) ? "M" : "Not M"}odified since last sync</div>
        </div>
      );
    }
    return retVal;
  }

  public render(): React.ReactElement<IPageInformationProps> {
    try {
      return (
        <div className={this.props.class}>{this.getPanel()}</div>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (render)`, LogLevel.Error);
      return null;
    }
  }
}