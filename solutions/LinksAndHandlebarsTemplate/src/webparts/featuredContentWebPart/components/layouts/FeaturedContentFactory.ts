import { IFeaturedItem } from '../../FeaturedContentWebPart';
import FeaturedContentWebPart from '../FeaturedContent';
import AdvancedHorizontalTitleOnlyLayout from './horizontalTitleOnly/AdvancedHorizontalTitleOnlyLayout';
import BasicHorizontalTitleOnlyLayout from './horizontalTitleOnly/BasicHorizontalTitleOnlyLayout';
import AdvancedHorizontalTitleDescriptionLayout from './horizontalTitleDescription/AdvancedHorizontalTitleDescriptionLayout';
import BasicHorizontalTitleDescriptionLayout from './horizontalTitleDescription/BasicHorizontalTitleDescriptionLayout';
import AdvancedStackedLayout from './stacked/AdvancedStackedLayout';
import BasicStackedLayout from './stacked/BasicStackedLayout';
import AdvancedStackedAlternatingLayout from './stackedAlternating/AdvancedStackedAlternatingLayout';
import BasicStackedAlternatingLayout from './stackedAlternating/BasicStackedAlternatingLayout';

export enum FeaturedContentLayout {
  HorizontalTitleOnly,
  HorizontalTitleAndDescription,
  Vertical,
  VerticalAlternating
}

export interface IFeaturedContentLayout {
  render(items: IFeaturedItem[], isEditMode: boolean): JSX.Element;
}

export default class FeaturedContentFactory {
  public static getLayout(layout: FeaturedContentLayout, isAdvancedMode: boolean, webPart: FeaturedContentWebPart): IFeaturedContentLayout {
    if (!isAdvancedMode) {
      switch (layout) {
        case FeaturedContentLayout.HorizontalTitleAndDescription: return new BasicHorizontalTitleDescriptionLayout(webPart);
        case FeaturedContentLayout.Vertical: return new BasicStackedLayout(webPart);
        case FeaturedContentLayout.VerticalAlternating: return new BasicStackedAlternatingLayout(webPart);
        default: return new BasicHorizontalTitleOnlyLayout(webPart);
      }
    }
    else {
      switch (layout) {
        case FeaturedContentLayout.HorizontalTitleAndDescription: return new AdvancedHorizontalTitleDescriptionLayout(webPart);
        case FeaturedContentLayout.Vertical: return new AdvancedStackedLayout(webPart);
        case FeaturedContentLayout.VerticalAlternating: return new AdvancedStackedAlternatingLayout(webPart);
        default: return new AdvancedHorizontalTitleOnlyLayout(webPart);
      }
    }
  }

  public static getWidthHeightQueryStringAppendForImage(imageUrl: string): string {
    if (imageUrl.indexOf(window.location.origin) > -1 && imageUrl.indexOf("?") > -1) {
      return "&width=252&height=200";
    }
    else if (imageUrl.indexOf(window.location.origin) > -1) {
      return "?width=252&height=200";
    }
    else {
      return "";
    }
  }
}