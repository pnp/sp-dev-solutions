import{ IWebPartContext } from '@microsoft/sp-webpart-base';
// Bitwise enumeration of link type(s) to select
export enum LinkType {
    doc    = 1 << 0,
    page   = 1 << 1,
    image  = 1 << 2,
    folder = 1 << 3,
    developer = 1 << 4,
    any    = doc | page | image | folder | developer,
    all    = -1
}

export interface ILinkPickerPanelProps {
    webPartContext: IWebPartContext;
    className?: string;
    webAbsUrl: string;
    linkType: LinkType;
}