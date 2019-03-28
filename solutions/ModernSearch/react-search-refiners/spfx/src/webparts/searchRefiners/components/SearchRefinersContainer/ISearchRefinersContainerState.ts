import { IRefinementFilter } from "../../../../models/ISearchResult";

export interface ISearchRefinersContainerState {
    selectedRefinementFilters: IRefinementFilter[];
    shouldResetFilters: boolean;
}