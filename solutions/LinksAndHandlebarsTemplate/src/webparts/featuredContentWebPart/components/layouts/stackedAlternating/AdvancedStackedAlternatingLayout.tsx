import * as React from 'react';
import { IFeaturedItem } from '../../IFeaturedItem';
import { IFeaturedContentLayout } from '../FeatureContentLayout';
import FeaturedContentFactory from '../FeaturedContentFactory';
import styles from './Styles.module.scss';
import FeaturedContentWebPart from '../../FeaturedContentWebPart';

const urlField = "URL";
const imageField = "Image";
const contentField = "Content";
const descriptionField = "Description";
const openNewTabField = "NewTab";

export default class AdvancedStackedLayout implements IFeaturedContentLayout{
  constructor(webpart: FeaturedContentWebPart){this.webpart=webpart;}

  private webpart:FeaturedContentWebPart;

  public render(items:IFeaturedItem[], isEditMode:boolean):JSX.Element{
    return (
      <div className={styles["featured-content"]}>
        { items &&
            items.map((item) => {
              return (
                <div className={styles["featured-content-item"]}>
                  <div role="presentation" className={styles["box-container"]}>
                    <div className={styles["image"]}>
                      {item[openNewTabField] &&
                        <a className={styles["featured-content-link"]} href={item[urlField]} target="blank" data-interception="off"></a>
                      }
                      {!item[openNewTabField] &&
                        <a className={styles["featured-content-link"]} href={item[urlField]}></a>
                      }
                      {item[imageField] && 
                      <img src={item[imageField]+FeaturedContentFactory.getWidthHeightQueryStringAppendForImage(item[imageField])}/>
                      }
                    </div>
                    <div className={styles["content"]}>
                      <div className={styles["title"]}>
                        {item[openNewTabField] &&
                          <a className={styles["featured-content-link"]} href={item[urlField]} target="blank" data-interception="off">{item[urlField+"_text"]}</a>
                        }
                        {!item[openNewTabField] &&
                          <a className={styles["featured-content-link"]} href={item[urlField]}>{item[urlField+"_text"]}</a>
                        }
                      </div>
                      <span className={styles["description"]}>{item[descriptionField]}</span>
                      <span className={styles["rich-text-field"]} dangerouslySetInnerHTML={{__html:item[contentField]}}></span>
                    </div>
                  </div>
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