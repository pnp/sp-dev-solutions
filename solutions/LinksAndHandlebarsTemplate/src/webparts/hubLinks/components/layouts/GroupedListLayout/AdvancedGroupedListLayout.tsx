import * as React from 'react';
import { Logger, LogLevel } from "@pnp/logging";

import { IHubLinksLayout } from '../HubLinksLayout';
import HubLinksWebPart from "../../HubLinks";
import styles from './Styles.module.scss';

export default class AdvancedGroupedListLayout implements IHubLinksLayout {
  private LOG_SOURCE = "AdvancedGroupedListLayout";
  private groupDefault = {};

  constructor(webpart: HubLinksWebPart) {
    this.webpart = webpart;
    if (webpart.props.defaultExpand) {
      this.groupDefault['data-expanded'] = true;
    }
  }

  private _webpart: HubLinksWebPart;
  public get webpart(): HubLinksWebPart {
    return this._webpart;
  }
  public set webpart(v: HubLinksWebPart) {
    this._webpart = v;
  }

  public render(items: any[], isEditMode: boolean): JSX.Element {
    try {
      return (
        <div className={styles["hubLinks"] + (this.webpart.props.isEdit ? " " + styles["edit"] : "")}>
          {items &&
            items.map((item) => {
              return (
                <div className={styles["grouped"]} {...this.groupDefault} data-group onClick={this.webpart.toggleGroup.bind(this)}>
                  <div role="button" className={styles["groupHeader"]}>
                    {item.Heading.Title}
                    <div className={styles["expand"]}>
                      <i className="fas fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div className={styles["collapse"]}>
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </div>
                  </div>
                  <ul>
                    {item.Links && item.Links.map((link) => {
                      return (
                        <li className={styles["linkItem"]}>
                          {link.Icon && link.Icon.length > 0 &&
                            <i className={"fas " + link.Icon + " " + styles["faIcon"]} aria-hidden="true" />
                          }
                          {link.NewTab &&
                            <a className={styles["linktitle"]} href={link.URL} target="blank" data-interception="off">{link.Title}</a>
                          }
                          {!link.NewTab &&
                            <a className={styles["linktitle"]} href={link.URL}>{link.Title}</a>
                          }
                          {this.webpart.props.showDescription &&
                            <p className={styles["linkdescription"]}>{link.Description}</p>
                          }
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          }
          {!items && isEditMode &&
            <div>Please configure the list mapping in the property pane of this web part.</div>
          }
        </div>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (render)`, LogLevel.Error);
      return null;
    }
  }
}