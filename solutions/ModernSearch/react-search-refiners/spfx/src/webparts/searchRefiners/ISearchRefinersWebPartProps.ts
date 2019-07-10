import IRefinerConfiguration from "../../models/IRefinerConfiguration";
import RefinersLayoutOption from "../../models/RefinersLayoutOptions";

export interface ISearchRefinersWebPartProps {
  webPartTitle: string;
  showBlank: boolean;
  refinersConfiguration: IRefinerConfiguration[];
  searchResultsDataSourceReference: string;
  selectedLayout: RefinersLayoutOption;
}