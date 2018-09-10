import * as React from 'react';
import { IHubLinksItem } from '../../IHubLinksItem';
import { IHubLinksLayout } from '../HubLinksLayout';
import HubLinksWebPart from "../../HubLinks";
import styles from './Styles.module.scss';

export default class AdvancedListLayout implements IHubLinksLayout{
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
      <ul className={styles["hubLinks"]+ (this.webpart.props.isEdit? " " + styles["edit"] : "")}>
        {items &&
            items.map((item) => {
              return (
                <li>
                    {item.Icon && item.Icon.length > 0 &&
                      <i className={"fa "+item.Icon+" "+styles["faIcon"]} aria-hidden="true"/>
                    }
                    {item.NewTab &&
                      <a className={styles["linktitle"]} href={item.URL} target="blank" data-interception="off">{item.Title}</a>
                    }
                    {!item.NewTab &&
                      <a className={styles["linktitle"]} href={item.URL}>{item.Title}</a>
                    }
                    {this.webpart.props.showDescription && 
                    <p className={styles["linkdescription"]}>{item.Description}</p>
                    }
                </li>                  
              );
            })
          }
          { !items && isEditMode &&
            <div>Please configure the list mapping in the property pane of this web part.</div>
          }      
      </ul>
    );
  }
}