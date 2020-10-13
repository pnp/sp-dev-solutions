import * as React from 'react';
import { Logger, LogLevel } from "@pnp/logging";

import { IHubLinksItem } from '../../IHubLinksItem';
import { IHubLinksLayout } from '../HubLinksLayout';
import HubLinksWebPart from "../../HubLinks";
import styles from './Styles.module.scss';

export default class AdvancedRoundIconItemLayoutLayout implements IHubLinksLayout {
  private LOG_SOURCE = "AdvancedRoundIconItemLayoutLayout";

  constructor(webpart: HubLinksWebPart) {
    this.webpart = webpart;
  }

  private _webpart: HubLinksWebPart;
  public get webpart(): HubLinksWebPart {
    return this._webpart;
  }
  public set webpart(v: HubLinksWebPart) {
    this._webpart = v;
  }

  public render(items: IHubLinksItem[], isEditMode: boolean): JSX.Element {
    try {
      return (
        <ul className={styles["hubLinks"] + " " + styles["themed"] + (this.webpart.props.isEdit ? " " + styles["edit"] : "")}>
          {items &&
            items.map((item) => {
              return item.NewTab ? (
                <a href={item.URL} target="blank" data-interception="off">
                  <li>
                    <i className={"fas " + item.Icon + " " + styles["faIcon"]} aria-hidden="true" />
                    <div className={styles["text"]}>
                      <p className={styles["linktitle"]}>{item.Title}</p>
                      <p className={styles["linkdescription"]}>{item.Description}</p>
                    </div>
                  </li>
                </a>
              ) : (
                  <a href={item.URL}>
                    <li>
                      <i className={"fas " + item.Icon + " " + styles["faIcon"]} aria-hidden="true" />
                      <div className={styles["text"]}>
                        <p className={styles["linktitle"]}>{item.Title}</p>
                        <p className={styles["linkdescription"]}>{item.Description}</p>
                      </div>
                    </li>
                  </a>
                );
            })
          }
          {!items && isEditMode &&
            <div>Please configure the list mapping in the property pane of this web part.</div>
          }
        </ul>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (render)`, LogLevel.Error);
      return null;
    }
  }
}