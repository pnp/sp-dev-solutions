import { IRefinementResult, IRefinementFilter } from "../../../../models/ISearchResult";
import RefinementFilterOperationCallback from "../../../../models/RefinementValueOperationCallback";

interface IBaseRefinerTemplateProps {

    /**
     * The refiner values to render
     */
    refinementResult: IRefinementResult;

    selectedRefinementFilters: IRefinementFilter[];

    onFiltersAdded: RefinementFilterOperationCallback;

    onFiltersRemoved: RefinementFilterOperationCallback;

    isMultiValue?: boolean;
} 

export default IBaseRefinerTemplateProps;