import { IRefinementFilter, IRefinementResult } from "../../../../models/ISearchResult";

export interface ISearchRefinersContainerState {
    selectedRefinementFilters: IRefinementFilter[];
    shouldResetFilters: boolean;
    availableRefiners: IRefinementResult[];
}