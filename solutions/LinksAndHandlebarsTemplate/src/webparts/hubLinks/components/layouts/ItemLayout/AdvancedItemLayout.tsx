import * as React from 'react';
import { IHubLinksItem } from '../../IHubLinksItem';
import { IHubLinksLayout } from '../HubLinksLayout';
import HubLinksWebPart from "../../HubLinks";
import ilStyles from './ILStyles.module.scss';

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
    return (
      <ul className={ilStyles["hubLinks"] + " " + ilStyles["blue"] + (this.webpart.props.isEdit? " " + ilStyles["edit"] : "")}>
        {items &&
            items.map((item) => {
              return (
                <li>
                  <i className={"fa " + item.Icon + " " + ilStyles["faIcon"]} aria-hidden="true"/>
                  <a className={ilStyles["linktitle"]} href={item.URL} target={item.NewTab ? "_blank" : ""}>{item.Title}</a>
                  <p className={ilStyles["linkdescription"]}>{item.Description}</p>                    
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