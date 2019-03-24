import { IRefinementResult, IRefinementFilter } from "../../../../models/ISearchResult";
import RefinementFilterOperationCallback from "../../../../models/RefinementValueOperationCallback";

interface IBaseRefinerTemplateProps {

    /**
     * The refiner values to render
     */
    refinementFilter: IRefinementResult;
    onUpdateFilters: RefinementFilterOperationCallback;
    isMultiValue?: boolean;
} 

export default IBaseRefinerTemplateProps;