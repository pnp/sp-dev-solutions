import * as React from 'react';
import { IHubLinksLayout } from '../HubLinksLayout';
import HubLinksWebPart from "../../HubLinks";
import gllStyles from './GLLStyles.module.scss';

export default class AdvancedGroupedListLayout implements IHubLinksLayout{
  private groupDefault = {};

  constructor(webpart:HubLinksWebPart){
    this.webpart = webpart;
    if(webpart.props.defaultExpand){
      this.groupDefault['data-expanded'] = true;
    }
  }
  
  private _webpart : HubLinksWebPart;
  public get webpart() : HubLinksWebPart {
    return this._webpart;
  }
  public set webpart(v : HubLinksWebPart) {
    this._webpart = v;
  }

  public render(items:any[], isEditMode:boolean):JSX.Element{
    return (
      <div className={gllStyles["hubLinks"]+ (this.webpart.props.isEdit? " " + gllStyles["edit"] : "")}>
        { items &&
            items.map((item) => {
              return (
                <div className={gllStyles["grouped"]} {...this.groupDefault} data-group onClick={this.webpart.toggleGroup.bind(this)}>
                  <div role="button" className={gllStyles["groupHeader"]}>
                    {item.Heading.Title}
                    <div className={gllStyles["expand"]}>
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div className={gllStyles["collapse"]}>
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                  </div>
                  <ul>
                    {item.Links && item.Links.map((link)=> {
                      return(
                        <li className={gllStyles["linkItem"]}>
                          {link.Icon && link.Icon.length > 0 &&
                            <i className={"fa "+link.Icon + " " + gllStyles["faIcon"]} aria-hidden="true"/>
                          }                              
                          <a className={gllStyles["linktitle"]} href={link.URL} target={link.NewTab ? "_blank" : ""}>{link.Title}</a>
                          {this.webpart.props.showDescription && 
                          <p className={gllStyles["linkdescription"]}>{link.Description}</p>
                          }
                        </li>
                      );
                    })}
                  </ul>
                </div>
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