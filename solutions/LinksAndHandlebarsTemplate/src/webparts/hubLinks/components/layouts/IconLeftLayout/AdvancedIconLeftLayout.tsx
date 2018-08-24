import * as React from 'react';
import { IHubLinksItem } from '../../IHubLinksItem';
import { IHubLinksLayout } from '../HubLinksLayout';
import HubLinksWebPart from "../../HubLinks";
import styles from './ILLStyles.module.scss';

export default class AdvancedItemLayoutLayout implements IHubLinksLayout{
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
    const colorStyle = {
        backgroundColor: this.webpart.props.backgroundColor, 
        borderColor: this.webpart.props.borderColor,
        color: this.webpart.props.textColor
    };
    const textColor = {
        color: this.webpart.props.textColor
    };
    const dividerColor = {
        color: this.webpart.props.borderColor
    };
    return (
        <div className={styles["hubLinks"] + " " + (this.webpart.props.isEdit? " " + styles["edit"] : "")}>
        {items &&
            items.map((item) => {
              return item.NewTab ?
              (
                <a href={item.URL} data-interception="off" target="_blank" className={styles["tile"]} style={colorStyle}>
                    <div className={styles["fontawesome"] + " " + styles["icon"]}>
                        <i style={textColor} className={"fa "+item.Icon+" fa-2x"}></i>
                    </div>
                    <div style={dividerColor} className={styles["cell-divider"]}></div>
                    <div style={textColor} className={styles["title"]}>{item.Title}</div>
                    <div style={textColor} className={styles["description"]}>{item.Description}</div>
                </a>      
              ) :              
              (
                <a href={item.URL} className={styles["tile"]} style={colorStyle}>
                    <div style={textColor} className={styles["fontawesome"] + " " + styles["icon"]}>
                        <i className={"fa "+item.Icon+" fa-2x"}></i>
                    </div>
                    <div style={dividerColor} className={styles["cell-divider"]}></div>
                    <div style={textColor} className={styles["title"]}>{item.Title}</div>
                    <div style={textColor} className={styles["description"]}>{item.Description}</div>
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