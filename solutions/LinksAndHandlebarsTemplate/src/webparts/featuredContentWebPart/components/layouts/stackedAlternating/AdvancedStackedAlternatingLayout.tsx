import * as React from 'react';
import { IFeaturedItem } from '../../IFeaturedItem';
import { IFeaturedContentLayout } from '../FeatureContentLayout';
import FeaturedContentFactory from '../FeaturedContentFactory';
import styles from './Styles.module.scss';

export default class AdvancedStackedLayout implements IFeaturedContentLayout{
  constructor(){}

  public render(items:IFeaturedItem[], isEditMode:boolean):JSX.Element{
    return (
      <div className={styles["featured-content"]}>
        { items &&
            items.map((item) => {
              return (
                <div className={styles["featured-content-item"]}>
                  <div role="presentation" className={styles["box-container"]}>
                    <div className={styles["image"]}>
                      <a className={styles["featured-content-link"]} href={item.URL} target={item.NewTab ? "_blank" : ""}></a>
                      {item["Image"] && 
                      <img src={item["Image"]+FeaturedContentFactory.getWidthHeightQueryStringAppendForImage(item.Image)} alt={item.ImageAlternate}/>
                      }
                    </div>
                    <div className={styles["content"]}>
                      <div className={styles["title"]}>
                        <a className={styles["featured-content-link"]} href={item.URL} target={item.NewTab ? "_blank" : ""}>{item.Title}</a>
                      </div>
                      <span className={styles["description"]}>{item.Description}</span>
                      <span className={styles["rich-text-field"]} dangerouslySetInnerHTML={{__html:item.Content}}></span>
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