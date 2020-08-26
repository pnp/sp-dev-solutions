import * as React from 'react';
import { IFeaturedItem } from '../../../FeaturedContentWebPart';
import FeaturedContentFactory, { IFeaturedContentLayout } from '../FeaturedContentFactory';
import FeaturedContentWebPart from '../../FeaturedContent';
import styles from './Styles.module.scss';

const urlField = "URL";
const imageField = "Image";
const descriptionField = "Description";
const openNewTabField = "NewTab";

export default class AdvancedHorizontalTitleDescriptionLayout implements IFeaturedContentLayout {
  constructor(webpart) { this.webpart = webpart; }
  private webpart: FeaturedContentWebPart;
  public render(items: IFeaturedItem[], isEditMode: boolean): JSX.Element {
    return (
      <div className={styles["featured-content"]}>
        {items &&
          items.map((item) => {
            return (
              <div className={styles["featured-content-item"]}>
                <div className={styles["featured-content-picture-container"]}>
                  {item[imageField] &&
                    <img src={item[imageField] + FeaturedContentFactory.getWidthHeightQueryStringAppendForImage(item[imageField])} className="largepictureimg" />
                  }
                </div>
                <div className={styles["featured-content-title"]}>{item[urlField + "_text"]}</div>
                <div className={styles["featured-content-desc"]} dangerouslySetInnerHTML={{ __html: item[descriptionField] }}></div>
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
        {!items && isEditMode &&
          <div>Please configure the list mapping in the property pane of this web part.</div>
        }
        <div className={styles["clear"]}></div>
      </div>
    );
  }
}