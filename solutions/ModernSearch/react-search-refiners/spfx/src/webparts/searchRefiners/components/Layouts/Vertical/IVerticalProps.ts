import { IRefinementResult, IRefinementFilter } from "../../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../../models/RefinementValueOperationCallback";

interface IVerticalProps {
    availableFilters: IRefinementResult[];

    refinersConfiguration: IRefinerConfiguration[];

    onUpdateFilters: RefinementFilterOperationCallback;

    /**
     * The current selected filters across all refiners
     */
    allSelectedFilters: IRefinementFilter[];
}
  
export default IVerticalProps;