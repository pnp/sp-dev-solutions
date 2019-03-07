import { IRefinementResult } from "../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../models/RefinementValueOperationCallback";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface ISearchRefinersContainerProps {
  webPartTitle: string;
  searchQuery: string;
  availableRefiners: IRefinementResult[];
  refinersConfiguration: IRefinerConfiguration[];
  onUpdateFilters: RefinementFilterOperationCallback;
  showBlank: boolean;
  displayMode: DisplayMode;
}
