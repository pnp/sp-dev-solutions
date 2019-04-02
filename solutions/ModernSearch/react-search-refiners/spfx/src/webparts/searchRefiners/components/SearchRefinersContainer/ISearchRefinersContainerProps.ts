import { IRefinementResult, IRefinementFilter } from "../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../models/IRefinerConfiguration";
import { DisplayMode } from "@microsoft/sp-core-library";
import RefinersLayoutOption from "../../../../models/RefinersLayoutOptions";

export interface ISearchRefinersContainerProps {

  /**
   * The Web Part title
   */
  webPartTitle: string;

  /**
   * List of available refiners from the connected search results Web Part
   */
  availableRefiners: IRefinementResult[];

  /**
   * The Web Part refiners configuration
   */
  refinersConfiguration: IRefinerConfiguration[];

  /**
   * The selected layout
   */
  selectedLayout: RefinersLayoutOption;

  /**
   * Handler method when a filter value is updated in children components
   */
  onUpdateFilters: (filters: IRefinementFilter[]) => void;

  /**
   * Indicates if we should show blank if no refinement result
   */
  showBlank: boolean;

  /**
   * The current page display mode
   */
  displayMode: DisplayMode;

  /**
   * The current UI language
   */
  language: string;

  /**
   * The current search query
   */
  query: string;
}
