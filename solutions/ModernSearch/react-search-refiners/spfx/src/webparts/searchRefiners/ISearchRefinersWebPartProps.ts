import { DynamicProperty } from "@microsoft/sp-component-base";
import { IRefinementResult, IRefinementFilter } from "../../models/ISearchResult";
import IRefinerConfiguration from "../../models/IRefinerConfiguration";

export interface ISearchRefinersWebPartProps {
    availableFilters: DynamicProperty<IRefinementResult>;
    selectedFilters: DynamicProperty<IRefinementFilter>;
    refinersConfiguration: DynamicProperty<IRefinerConfiguration>;
    webPartTitle: string;
    showBlank: boolean;
    availableFiltersSourceId: string;
    availableFiltersPropertyId: string;
    availableFiltersPropertyPath: string;
    refinersConfigurationSourceId: string;
    refinersConfigurationPropertyId: string;
    refinersConfigurationPropertyPath: string;
    selectedFiltersSourceId: string;
    selectedFiltersPropertyId: string;
    selectedFiltersPropertyPath: string;
  }