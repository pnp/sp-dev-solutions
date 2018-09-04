import { IHubLinksItem, HubLinksGroupItem } from '../IHubLinksItem';

export enum HubLinksLayout{
    RoundIconItemLayout,
    ListLayout,
    GroupedListLayout,
    TileLayout,
    SquareIconItemLayout
}

export interface IHubLinksLayout{
    render(items:IHubLinksItem[] | HubLinksGroupItem[], isEditMode: boolean):JSX.Element;
}