import { IHubLinksItem, HubLinksGroupItem } from '../IHubLinksItem';

export enum HubLinksLayout{
    ItemLayout,
    ListLayout,
    GroupedListLayout,
    IconTopLayout,
    IconLeftLayout
}

export interface IHubLinksLayout{
    render(items:IHubLinksItem[] | HubLinksGroupItem[], isEditMode: boolean):JSX.Element;
}