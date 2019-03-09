import { IRefinementFilter } from "./ISearchResult";
import IRefinerConfiguration from "./IRefinerConfiguration";

/**
 * Represents the data exposeed by a search refiner Web Part for dynamic data connection
 */
interface IRefinerSourceData {
    
    /**
     * The current selected filters
     */
    selectedFilters: IRefinementFilter[];

    /**
     * The refiners configuration for the Web Part
     */
    refinerConfiguration: IRefinerConfiguration[];
}

export default IRefinerSourceData;