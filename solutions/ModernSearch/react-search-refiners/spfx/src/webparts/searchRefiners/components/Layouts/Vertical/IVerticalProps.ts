import { IRefinementResult, IRefinementFilter } from "../../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../../models/RefinementValueOperationCallback";

interface IVerticalProps {
    refinementResults: IRefinementResult[];

    refinersConfiguration: IRefinerConfiguration[];

    hasSelectedValues: boolean;

    onFilterValuesUpdated: RefinementFilterOperationCallback;

    onRemoveAllFilters: () => void;

    shouldResetFilters: boolean;
}
  
export default IVerticalProps;