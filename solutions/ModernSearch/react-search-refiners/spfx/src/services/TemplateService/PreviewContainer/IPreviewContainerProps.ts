export interface IPreviewContainerProps {

   /**
    * The element URL to display (can be the iframe source URL or a video URL)
    */
   elementUrl: string;

   /**
    * The thumbnail image URL
    */
   previewImageUrl: string;

   /**
    * The HTML element to use as target for the callout
    */
   targetElement: HTMLElement;

   /**
    * Indicates if we need to show the preview
    */
   showPreview: boolean;

   /**
    * The preview type (document or video)
    */
   previewType: PreviewType;

   /**
    * The video props
    */
   videoProps?: IVideoPreviewProps;
}

export interface IVideoPreviewProps {

   /**
    * Video file extension
    */
   fileExtension :string;
}

export enum PreviewType {
   Document,
   Video
}
