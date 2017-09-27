import * as React from 'react';
import { IFeaturedItem } from '../../IFeaturedItem';
import { IFeaturedContentLayout } from '../FeatureContentLayout';
import FeaturedContentFactory from '../FeaturedContentFactory';
import styles from './Styles.module.scss';

export default class AdvancedHorizontalTitleDescriptionLayout implements IFeaturedContentLayout{
  constructor(){}

  public render(items:IFeaturedItem[], isEditMode:boolean):JSX.Element{
    return (
      <div className={styles["featured-content"]}>
        { items &&
            items.map((item) => {
              return (
                <div className={styles["featured-content-item"]+" col-md-4"}>
                  <div className={styles["featured-content-picture-container"]}>
                    {item["Image"] && 
                    <img src={item["Image"]+FeaturedContentFactory.getWidthHeightQueryStringAppendForImage(item.Image)} className="largepictureimg" alt={item.ImageAlternate}/>
                    }
                  </div>
                  <div className={styles["featured-content-title"]}>{item.Title}</div>
                  <div className={styles["featured-content-desc"]} dangerouslySetInnerHTML={ {__html:item.Description} }></div>
                  <a className={styles["featured-content-link"]} href={item.URL} target={item.NewTab ? "_blank" : ""}></a>
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