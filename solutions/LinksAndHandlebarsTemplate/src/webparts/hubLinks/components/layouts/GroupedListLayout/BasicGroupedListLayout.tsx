import * as React from 'react';
import { IHubLinksLayout } from "../HubLinksLayout";
import HubLinksWebPart from "../../HubLinks";
import { IHubLinksGroupItem } from "../../IHubLinksItem";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import styles from './Styles.module.scss';

export default class BasicGroupedListLayout implements IHubLinksLayout{
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
  
  public render(items:IHubLinksGroupItem[], isEditMode: boolean):JSX.Element{
    return (
      <div className={styles["hubLinks"]+ (this.webpart.props.isEdit? " " + styles["edit"] : "")}>
        { items &&
            items.map((item) => {
              return (
                <div className={styles["grouped"]+" "} {...this.groupDefault} onClick={this.webpart.toggleGroup.bind(this)} data-group={"group-"+item.Heading.Title}>
                  <div role="button" className={styles["groupHeader"]}>
                    {item.Heading.Title}
                    <div className={styles["expand"]}>
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div className={styles["collapse"]}>
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </div>
                  </div>
                  <ul>
                    {item.Links && item.Links.map((link)=> {
                      return(
                        <li className={styles["linkItem"]} key={"item-"+link.index+link.Title.replace(" ","")} role="link" 
                            draggable={isEditMode} onDragStart={this.webpart.startDrag.bind(this.webpart)} 
                            onMouseDown={this.webpart.mouseDragDown.bind(this.webpart)} onDragEnter={this.webpart.moveItem.bind(this.webpart)} 
                            onDragEnd={this.webpart.endDrag.bind(this.webpart)} data-index={link.index}>
                          {link.Icon && link.Icon.length > 0 &&
                          <i className={"fa "+link.Icon + " " + styles["faIcon"]} aria-hidden="true"/>
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
                          {isEditMode &&
                          <div className={styles["editControls"]}>
                              <DefaultButton iconProps={{iconName:"Clear"}} onClick={this.webpart.deleteBox.bind(this.webpart)} className={styles["right-button"]}/>
                              <DefaultButton iconProps={{iconName:"Edit"}} onClick={this.webpart.editBox.bind(this.webpart)} className={styles["right-button"]}/>
                              <i style={{display: "none"}} className={"ms-Icon ms-Icon--Move "+styles["left-button"]} id="drag-handle" aria-hidden="true"></i>
                          </div>
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