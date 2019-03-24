import { IRefinementFilter } from "../../../../models/ISearchResult";

export interface ISearchRefinersContainerState {
    currentQuery: string;
    lastQuery: string;
    allSelectedFilters: IRefinementFilter[];
}