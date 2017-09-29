import { IFeaturedItem } from '../IFeaturedItem';

export enum FeaturedContentLayout{
    HorizontalTitleOnly,
    HorizontalTitleAndDescription,
    Vertical,
    VerticalAlternating
}

export interface IFeaturedContentLayout{
    render(items:IFeaturedItem[], isEditMode: boolean):JSX.Element;
}