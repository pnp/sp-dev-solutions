export interface IHubLinksItemHeading{
    Title: string;
    Id: number;
}
export interface IHubLinksItem {
    index: string;
    Title: string;
    URL: string;
    Description: string;
    Icon: string;
    NewTab: boolean;
    GroupBy: string;
}

export interface IHubLinksGroupItem {
    Heading: IHubLinksItemHeading;
    Links: Array<IHubLinksItem>;
}

export class HubLinksItem implements IHubLinksItem {
    constructor (
        public index: string = null,
        public Title: string = null, 
        public URL: string = null, 
        public Description: string = null, 
        public Icon: string = null, 
        public NewTab: boolean = false, 
        public GroupBy: string = null) { }
}

export class HubLinksItemHeading implements IHubLinksItemHeading {
    constructor (
        public Title: string = null,
        public Id: number = null) {}
}

export class HubLinksGroupItem implements IHubLinksGroupItem {
    constructor (
        public Heading: IHubLinksItemHeading = new HubLinksItemHeading(),
        public Links: Array<IHubLinksItem> = []) {}
}