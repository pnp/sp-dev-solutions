import { IRefinementFilter } from "../../../../models/ISearchResult";

export interface ISearchRefinersContainerState {
    currentQuery: string;
    lastQuery: string;
    selectedRefinementFilters: IRefinementFilter[];
}