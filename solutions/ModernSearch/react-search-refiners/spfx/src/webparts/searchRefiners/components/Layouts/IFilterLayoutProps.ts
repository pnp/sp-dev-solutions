import { IRefinementResult, IRefinementFilter, IRefinementValue } from "../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../models/RefinementValueOperationCallback";

interface IFilterLayoutProps {
    refinementResults: IRefinementResult[];

    refinersConfiguration: IRefinerConfiguration[];

    hasSelectedValues: boolean;

    onFilterValuesUpdated: RefinementFilterOperationCallback;

    onRemoveAllFilters: () => void;

    shouldResetFilters: boolean;
}
  
export default IFilterLayoutProps;