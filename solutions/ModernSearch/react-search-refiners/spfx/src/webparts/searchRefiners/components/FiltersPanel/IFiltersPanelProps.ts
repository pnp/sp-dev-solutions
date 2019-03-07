import { DisplayMode } from "@microsoft/sp-core-library";
import { IRefinementResult } from "../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../models/RefinementValueOperationCallback";

interface IFiltersProps {
    availableFilters: IRefinementResult[];
    refinersConfiguration: IRefinerConfiguration[];
    onUpdateFilters: RefinementFilterOperationCallback;
    showBlank: boolean;
    displayMode: DisplayMode;
}
  
export default IFiltersProps;