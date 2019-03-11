import { IRefinementResult } from "../../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../../models/RefinementValueOperationCallback";

interface IHorizontalProps {
    availableFilters: IRefinementResult[];
    refinersConfiguration: IRefinerConfiguration[];
    onUpdateFilters: RefinementFilterOperationCallback;
    resetSelectedFilters: boolean;
}
  
export default IHorizontalProps;