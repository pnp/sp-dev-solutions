import { DynamicProperty } from "@microsoft/sp-component-base";
import { IRefinementResult } from "../../models/ISearchResult";
import IRefinerConfiguration from "../../models/IRefinerConfiguration";

export interface ISearchRefinersWebPartProps {
  webPartTitle: string;
  showBlank: boolean;
  refinersConfiguration: IRefinerConfiguration[];
  searchQuery: DynamicProperty<string>;
  searchQuerySourceId: string;
  searchQueryPropertyId: string;
  searchQueryPropertyPath: string;
  availableRefiners: DynamicProperty<IRefinementResult>;
  availableRefinersSourceId: string;
  availableRefinersPropertyId: string;
  availableRefinersPropertyPath: string;
}