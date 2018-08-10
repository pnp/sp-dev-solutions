import * as React from 'react';
import { IFeaturedItem } from '../../IFeaturedItem';
import { IFeaturedContentLayout } from '../FeatureContentLayout';
import FeaturedContentFactory from '../FeaturedContentFactory';
import styles from './Styles.module.scss';
import FeaturedContentWebPart from '../../FeaturedContentWebPart';

const urlField = "URL";
const imageField = "Image";
const imageAltField = "ImageAlternate";
const openNewTabField = "NewTab";

export default class AdvancedHorizontalTitleOnlyLayout implements IFeaturedContentLayout{
  constructor(webpart:FeaturedContentWebPart){this.webpart=webpart;}

  private webpart: FeaturedContentWebPart;

  public render(items:IFeaturedItem[], isEditMode:boolean):JSX.Element{
    return (
      <div className={styles["featured-content"]}>
        { items &&
            items.map((item) => {
              return (
                <div className={styles["featured-content-item"]}>
                  <div className={styles["featured-content-picture-container"]}>
                    {item["Image"] && 
                    <img src={item["Image"]+FeaturedContentFactory.getWidthHeightQueryStringAppendForImage(item[imageField])} className="largepictureimg" alt={item[imageAltField]}/>
                    }
                  </div>
                  <div className={styles["featured-content-title"]}>{item[urlField+"_text"]}</div>
                  {item[openNewTabField] &&
                    <a className={styles["featured-content-link"]} href={item[urlField]} target="blank" data-interception="off"></a>
                  }
                  {!item[openNewTabField] &&
                    <a className={styles["featured-content-link"]} href={item[urlField]}></a>
                  }
                </div>
              );
            })
          }
          { !items && isEditMode &&
            <div>Please configure the list mapping in the property pane of this web part.</div>
          }
        <div className={styles["clear"]}></div>        
      </div>
    );
  }
}