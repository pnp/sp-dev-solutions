import { ImageDisplayType } from "../../../propertyPane/propertyFieldImageSelector/PropertyFieldImageSelector";

export interface IFeaturedItem {
    Image: string;
    ImageAlternate: string;
    Title: string;
    URL: string;
    NewTab: boolean;
    Description: string;
    Content: string;
    PreviewImageUrl: string;
    CustomImageUrl: string;
    ImageMode: ImageDisplayType;
}