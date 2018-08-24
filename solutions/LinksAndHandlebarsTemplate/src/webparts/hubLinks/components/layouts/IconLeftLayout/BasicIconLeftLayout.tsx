import * as React from 'react';
import * as strings from 'hubLinksStrings';
import { IHubLinksItem } from '../../IHubLinksItem';
import { IHubLinksLayout } from "../HubLinksLayout";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import HubLinksWebPart from "../../HubLinks";
import styles from './ILLStyles.module.scss';

export default class BasicIconLeftLayout implements IHubLinksLayout{
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
  
  public render(items:IHubLinksItem[], isEditMode: boolean):JSX.Element{
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
        { items &&
            items.map((item) => {
              return item.NewTab ? (
                <a key={"item-"+items.indexOf(item)} role="link" id={"item-"+items.indexOf(item)} 
                      draggable={isEditMode} onDragStart={this.webpart.startDrag.bind(this.webpart)} 
                      onMouseDown={this.webpart.mouseDragDown.bind(this.webpart)} onDragEnter={this.webpart.moveItem.bind(this.webpart)} 
                      onDragEnd={this.webpart.endDrag.bind(this.webpart)} data-index={items.indexOf(item)}
                      style={colorStyle} href={item.URL} className={styles["tile"]} data-interception="off" target="_blank">
                  <div className={styles["fontawesome"] + " " + styles["icon"]}>
                      <i style={textColor} className={"fa "+item.Icon+" fa-2x"}></i>
                  </div>
                  <div style={dividerColor} className={styles["cell-divider"]}></div>
                  <div style={textColor} className={styles["title"]}>{item.Title}</div>
                  <div style={textColor} className={styles["description"]}>{item.Description}</div>
                  {isEditMode &&
                      <div className={styles["editControls"]}>
                          <DefaultButton iconProps={{iconName:"Clear"}} onClick={this.webpart.deleteBox.bind(this.webpart)} className={styles["right-button"]}/>
                          <DefaultButton iconProps={{iconName:"Edit"}} onClick={this.webpart.editBox.bind(this.webpart)} className={styles["right-button"]}/>
                          <i className={"ms-Icon ms-Icon--Move "+styles["left-button"]} id="drag-handle" aria-hidden="true"></i>
                      </div>
                    }    
                </a>
              ) :              
              (
                <a key={"item-"+items.indexOf(item)} role="link" id={"item-"+items.indexOf(item)} 
                      draggable={isEditMode} onDragStart={this.webpart.startDrag.bind(this.webpart)} 
                      onMouseDown={this.webpart.mouseDragDown.bind(this.webpart)} onDragEnter={this.webpart.moveItem.bind(this.webpart)} 
                      onDragEnd={this.webpart.endDrag.bind(this.webpart)} data-index={items.indexOf(item)}
                      style={colorStyle} href={item.URL} className={styles["tile"]}>
                  <div style={textColor} className={styles["fontawesome"] + " " + styles["icon"]}>
                      <i className={"fa "+item.Icon+" fa-2x"}></i>
                  </div>
                  <div style={dividerColor} className={styles["cell-divider"]}></div>
                  <div style={textColor} className={styles["title"]}>{item.Title}</div>
                  <div style={textColor} className={styles["description"]}>{item.Description}</div>     
                  {isEditMode &&
                      <div className={styles["editControls"]}>
                          <DefaultButton iconProps={{iconName:"Clear"}} onClick={this.webpart.deleteBox.bind(this.webpart)} className={styles["right-button"]}/>
                          <DefaultButton iconProps={{iconName:"Edit"}} onClick={this.webpart.editBox.bind(this.webpart)} className={styles["right-button"]}/>
                          <i className={"ms-Icon ms-Icon--Move "+styles["left-button"]} id="drag-handle" aria-hidden="true"></i>
                      </div>
                    }       
                </a>
              );
            })
        }
        { (!items || items.length < 1) && isEditMode &&
          Array.apply(null,Array(1-(items ? items.length : 0))).map((o,i)=>{
            return(
              <div className={"col-md-4 "+styles["emptyBox"]}>
                <div role="button" onClick={this.webpart.openLinkPicker.bind(this.webpart)}>{strings.PlaceholderButtonText}</div>
              </div>
            );
          })
        }        
      </div>
    );
  }
}