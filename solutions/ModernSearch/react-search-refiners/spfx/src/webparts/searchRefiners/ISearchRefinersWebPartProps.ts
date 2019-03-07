import { DynamicProperty } from "@microsoft/sp-component-base";
import { IRefinementResult, IRefinementFilter } from "../../models/ISearchResult";
import IRefinerConfiguration from "../../models/IRefinerConfiguration";

export interface ISearchRefinersWebPartProps {
  webPartTitle: string;
  showBlank: boolean;
  refinersConfiguration: IRefinerConfiguration[];
  availableRefiners: DynamicProperty<IRefinementResult>;
  availableRefinersSourceId: string;
  availableRefinersPropertyId: string;
  availableRefinersPropertyPath: string;
}