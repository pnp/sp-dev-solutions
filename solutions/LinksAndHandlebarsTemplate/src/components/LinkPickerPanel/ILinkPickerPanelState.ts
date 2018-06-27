// The left navigation selects what kind of link picking to do
export enum NavState { site, link, image }

export class ApprovedImage {
    public RelativeURL: string = null;
    public Name: string = null;
    public Thumbnail: string = null;
}

export class ImageLibrary {
    public libUrl: string = null;
    public cdnUrl: string = null;
}

export interface ILinkPickerPanelState {
    isOpen? : boolean;              // true if the panel is open
    navState?: NavState;            // the navigation selection
    isUrlValid?: boolean;           // true if the URL is valid
    url?: string;                   // the link
    images?: Array<ApprovedImage>;  // array of images for approved image picker
    imageLibs?: Array<ImageLibrary>;      // array of image libraries for approved images.
}