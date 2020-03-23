import { IRefinementFilter, IRefinementResult } from "../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../models/IRefinerConfiguration";

export interface ISearchRefinersContainerState {
    selectedRefinementFilters: IRefinementFilter[];
    shouldResetFilters: boolean;
    availableRefiners: IRefinementResult[];
    refinersConfiguration: IRefinerConfiguration[];
}