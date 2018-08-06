import * as React from 'react';
import { IHubLinksItem } from '../../IHubLinksItem';
import { IHubLinksLayout } from '../HubLinksLayout';
import HubLinksWebPart from "../../HubLinks";
import llStyles from './LLStyles.module.scss';

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
      <ul className={llStyles["hubLinks"]+ (this.webpart.props.isEdit? " " + llStyles["edit"] : "")}>
        {items &&
            items.map((item) => {
              return (
                <li>
                    {item.Icon && item.Icon.length > 0 &&
                      <i className={"fa "+item.Icon+" "+llStyles["faIcon"]} aria-hidden="true"/>
                    }
                    <a className={llStyles["linktitle"]} href={(item.NewTab ? this.webpart.state.redirectUrl : "")+item.URL} target={item.NewTab ? "_blank" : ""}>{item.Title}</a>
                    {this.webpart.props.showDescription && 
                    <p className={llStyles["linkdescription"]}>{item.Description}</p>
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