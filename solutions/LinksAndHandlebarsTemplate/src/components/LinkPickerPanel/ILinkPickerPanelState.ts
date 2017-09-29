// The left navigation selects what kind of link picking to do
export enum NavState { site, link }

export interface ILinkPickerPanelState {
    isOpen? : boolean;              // true if the panel is open
    navState?: NavState;            // the navigation selection
    isUrlValid?: boolean;           // true if the URL is valid
    url?: string;                   // the link
}