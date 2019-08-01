import * as React from 'react';

import Slider, { Settings as ISliderProps } from 'react-slick';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';

import { IDatum } from '../IFeedResponse';

require('./css/slick.scss');
require('./css/slick-theme.scss');
import styles from './Instagram.module.scss';

export interface IListGridExampleProps {
  items: IDatum[];
  containerWidth: number;
}

const FOUR_PER_ROW_PIXELS: number = 184;
const LOGO_PATH: string = require<string>('./assets/instagram-logo-80.png');

export class InstaList extends React.Component<IListGridExampleProps> {
  constructor(props: IListGridExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { containerWidth, items } = this.props;
    let slidesPerRow: number = Math.floor(containerWidth / FOUR_PER_ROW_PIXELS);
    if (slidesPerRow > items.length) {
      slidesPerRow = items.length;
    }

    const settings: ISliderProps = {
      arrows: true,
      dots: true,
      //rows: 1,
      slidesToShow: slidesPerRow,
      slidesToScroll: slidesPerRow
    };
    const sliderItems: JSX.Element[] = items.map(InstaList._convertDataToSliderItem);

    return React.createElement(Slider, settings, sliderItems);
  }

  private static _convertDataToSliderItem(value: IDatum, index?: number): JSX.Element {
    const caption: string | undefined = (value.caption) ? value.caption.text : undefined;
    const hasCaption: boolean = !!caption;
    const hasTags: boolean = Boolean(value.tags && value.tags.length);
    return (
      <div key={value.id} className={styles.card}>
        {hasTags && <div className={styles.tags}>#</div>}
        <a 
          aria-label={caption}
          href={value.images.standard_resolution.url} 
          target='_blank'
        >
          <Image 
            alt={caption}
            height={FOUR_PER_ROW_PIXELS}
            imageFit={ImageFit.cover} 
            src={value.images.low_resolution.url}
            width={FOUR_PER_ROW_PIXELS}
          />
        </a>
        <div className={styles.captionContainer}>
          <span className={styles.captionLabel}>
          {hasCaption ? caption : `@${value.user.username}`}
          </span>
          <img
            alt=''
            className={styles.logo}
            role='presentation'
            src={LOGO_PATH}
          />
        </div>
    </div>
    );
  }
}