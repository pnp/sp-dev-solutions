import { IRefinementResult, IRefinementFilter } from "../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../models/IRefinerConfiguration";
import { DisplayMode } from "@microsoft/sp-core-library";
import RefinersLayoutOption from "../../../../models/RefinersLayoutOptions";

export interface ISearchRefinersContainerProps {
  webPartTitle: string;
  availableRefiners: IRefinementResult[];
  refinersConfiguration: IRefinerConfiguration[];
  selectedLayout: RefinersLayoutOption;
  onUpdateFilters: (filters: IRefinementFilter[]) => void;
  showBlank: boolean;
  displayMode: DisplayMode;
}
