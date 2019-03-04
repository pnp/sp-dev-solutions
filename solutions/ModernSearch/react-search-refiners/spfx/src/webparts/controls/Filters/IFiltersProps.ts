import { IRefinementResult, IRefinementFilter } from "../../../models/ISearchResult";
import IRefinerConfiguration from "../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../models/RefinementValueOperationCallback";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IFiltersStrings } from "./IFiltersStrings";


interface IFiltersProps {
    availableFilters: IRefinementResult[];
    selectedFilters?: IRefinementFilter[];
    refinersConfiguration: IRefinerConfiguration[];
    onUpdateFilters: RefinementFilterOperationCallback;
    showBlank: boolean;
    displayMode: DisplayMode;
    strings: IFiltersStrings;
}
  
export default IFiltersProps;