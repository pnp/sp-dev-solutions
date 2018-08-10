import * as React from 'react';
import * as strings from 'featuredContentWebPartStrings';
import { IFeaturedItem } from '../../IFeaturedItem';
import { IFeaturedContentLayout } from "../FeatureContentLayout";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import FeaturedContentFactory from '../FeaturedContentFactory';
import FeaturedContentWebPart from "../../FeaturedContentWebPart";
import styles from './Styles.module.scss';

export default class BasicHorizontalTitleDescriptionLayout implements IFeaturedContentLayout{
  constructor(webpart:FeaturedContentWebPart){
    this.webpart = webpart;
  }
  
  private _webpart : FeaturedContentWebPart;
  public get webpart() : FeaturedContentWebPart {
    return this._webpart;
  }
  public set webpart(v : FeaturedContentWebPart) {
    this._webpart = v;
  }

  public render(items:IFeaturedItem[], isEditMode: boolean):JSX.Element{
    return (
      <div className={styles["featured-content"]}>
        { items &&
            items.map((item) => {
              return (
                <div className={styles["featured-content-item"]+" "+(isEditMode ? styles["edit"] : "")} 
                      key={"item-"+items.indexOf(item)} role="link" id={"item-"+items.indexOf(item)} 
                      draggable={isEditMode} onDragStart={this.webpart.startDrag.bind(this.webpart)} 
                      onMouseDown={this.webpart.mouseDragDown.bind(this.webpart)} onDragEnter={this.webpart.moveItem.bind(this.webpart)} 
                      onDragEnd={this.webpart.endDrag.bind(this.webpart)} data-index={items.indexOf(item)}>
                  <div className={styles["featured-content-picture-container"]}>
                    <img src={item["Image"]+FeaturedContentFactory.getWidthHeightQueryStringAppendForImage(item.Image)} className="largepictureimg" alt={item.ImageAlternate}/>
                  </div>
                  <div className={styles["featured-content-title"]}>{item.Title}</div>
                  <div className={styles["featured-content-desc"]} dangerouslySetInnerHTML={ {__html:item.Description} }></div>
                  {item.NewTab &&
                    <a className={styles["featured-content-link"]} href={item.URL} target="blank" data-interception="off"></a>
                  }
                  {!item.NewTab &&
                    <a className={styles["featured-content-link"]} href={item.URL}></a>
                  }
                  {isEditMode &&
                    <div className={styles["edit-controls"]}>
                        <DefaultButton iconProps={{iconName:"Clear"}} onClick={this.webpart.deleteBox.bind(this.webpart)} className={styles["right-button"]}/>
                        <DefaultButton iconProps={{iconName:"Edit"}} onClick={this.webpart.editBox.bind(this.webpart)} className={styles["right-button"]}/>
                        <i className={"ms-Icon ms-Icon--Move "+styles["left-button"]} id="drag-handle" aria-hidden="true"></i>
                    </div>
                  }
                </div>
              );
            })
        }
        { (!items || items.length < 3) && isEditMode &&
          Array.apply(null,Array(3-(items ? items.length : 0))).map((o,i)=>{
            return(
              <div className={styles["featured-content-item"]+" "+styles["empty"]}>
                <div role="button" onClick={this.webpart.createNewItemFromLink.bind(this.webpart)}>{strings.PlaceholderButtonText}</div>
              </div>
            );
          })
        }
        <div className={styles["clear"]}></div>        
      </div>
    );
  }
}