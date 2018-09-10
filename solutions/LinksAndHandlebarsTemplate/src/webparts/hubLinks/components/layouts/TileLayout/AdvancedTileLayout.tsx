import * as React from 'react';
import { IHubLinksItem } from '../../IHubLinksItem';
import { IHubLinksLayout } from '../HubLinksLayout';
import HubLinksWebPart from "../../HubLinks";
import styles from './Styles.module.scss';

export default class AdvancedTileLayout implements IHubLinksLayout{
  constructor(webpart:HubLinksWebPart){
    this.webpart = webpart;
  }
  
  private _webpart : HubLinksWebPart;
  public get webpart() : HubLinksWebPart {
    return this._webpart;
  }
  public set webpart(v : HubLinksWebPart) {
    this._webpart = v;
  }

  public render(items:IHubLinksItem[], isEditMode:boolean):JSX.Element{
    return (
        <div className={styles["hubLinks"] + " " + (this.webpart.props.isEdit? " " + styles["edit"] : "")}>
        {items &&
            items.map((item) => {
              return item.NewTab ?
              (
                <a href={item.URL} data-interception="off" target="_blank" className={styles["box"]+" "+styles["color-"+this.webpart.props.textColor]+" "+styles["background-"+this.webpart.props.backgroundColor]+" "+styles["border-"+this.webpart.props.borderColor]}>
                    <div className={styles["fontawesome"] + " " + styles["icon"]}>
                        <i className={"fa "+item.Icon+" fa-3x "+styles["color"]+" "+styles[this.webpart.props.textColor]}></i>
                    </div>
                    <div className={styles["cell-divider"]}></div>
                    <div className={styles["title"]+" "+styles["color"]+" "+styles[this.webpart.props.textColor]}>{item.Title}</div>
                    <div className={styles["description"]+" "+styles["color"]+" "+styles[this.webpart.props.textColor]}>{item.Description}</div>
                </a>      
              ) :              
              (
                <a href={item.URL} className={styles["box"]+" "+styles["color-"+this.webpart.props.textColor]+" "+styles["background-"+this.webpart.props.backgroundColor]+" "+styles["border-"+this.webpart.props.borderColor]}>
                    <div className={styles["fontawesome"] + " " + styles["icon"]}>
                        <i className={"fa "+item.Icon+" fa-3x "+styles["color"]+" "+styles[this.webpart.props.textColor]}></i>
                    </div>
                    <div className={styles["cell-divider"]+" "+styles[this.webpart.props.borderColor]}></div>
                    <div className={styles["title"]+" "+styles["color"]+" "+styles[this.webpart.props.textColor]}>{item.Title}</div>
                    <div className={styles["description"]+" "+styles["color"]+" "+styles[this.webpart.props.textColor]}>{item.Description}</div>
                </a>             
              );
            })
          }
          { !items && isEditMode &&
            <div>Please configure the list mapping in the property pane of this web part.</div>
          }      
      </div>
    );
  }
}