import { IRefinementResult, IRefinementFilter } from "../../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../../models/RefinementValueOperationCallback";

interface IVerticalProps {
    refinementResults: IRefinementResult[];

    refinersConfiguration: IRefinerConfiguration[];

    selectedRefinementFilters: IRefinementFilter[];

    onFiltersAdded: RefinementFilterOperationCallback;
    onFiltersRemoved: RefinementFilterOperationCallback;
}
  
export default IVerticalProps;