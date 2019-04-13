import { IRefinementResult, IRefinementValue, IRefinementFilter } from "../../../../models/ISearchResult";
import IRefinerConfiguration from "../../../../models/IRefinerConfiguration";
import RefinementFilterOperationCallback from "../../../../models/RefinementValueOperationCallback";

interface IFilterLayoutProps {
    
    /**
     * The refinement results
     */
    refinementResults: IRefinementResult[];

    /**
     * The Web Part refiners configuration
     */
    refinersConfiguration: IRefinerConfiguration[];

    /**
     * Indicates if at least a filter value has been selected 
     */
    hasSelectedValues: boolean;

    /**
     * Handler method called from sub components when a refiner values have been updated (added or removed) 
     */
    onFilterValuesUpdated: RefinementFilterOperationCallback;

    /**
     * Handler method called when all filters are removed
     */
    onRemoveAllFilters: () => void;

    /**
     * Indicates if we should reset filters for all refiners
     */
    shouldResetFilters: boolean;

    /**
     * The current selected filters (i.e global state for all refiners)
     */
    selectedFilters: IRefinementFilter[];

    /**
     * The current UI language
     */
    language: string;
}
  
export default IFilterLayoutProps;