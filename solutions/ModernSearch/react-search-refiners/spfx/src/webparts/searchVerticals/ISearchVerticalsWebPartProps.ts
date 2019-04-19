import { ISearchVertical } from "../../models/ISearchVertical";

export interface ISearchVerticalsWebPartProps {
    verticals: ISearchVertical[];
    showCounts: boolean;
    searchResultsDataSourceReference: string;
}
  