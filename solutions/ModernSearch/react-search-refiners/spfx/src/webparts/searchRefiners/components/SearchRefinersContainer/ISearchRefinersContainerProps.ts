import { IRefinementResult } from "../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../models/RefinementValueOperationCallback";
import { DisplayMode } from "@microsoft/sp-core-library";
import RefinersLayoutOption from "../../../../models/RefinersLayoutOptions";

export interface ISearchRefinersContainerProps {
  webPartTitle: string;
  availableRefiners: IRefinementResult[];
  refinersConfiguration: IRefinerConfiguration[];
  selectedLayout: RefinersLayoutOption;
  onUpdateFilters: RefinementFilterOperationCallback;
  showBlank: boolean;
  displayMode: DisplayMode;
  areResultsLoading: boolean;
  queryKeywords: string;
  selectedProperties: string[];
  queryTemplate: string;
}
