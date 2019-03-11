import { IRefinementResult, IPaginationInformation } from "./ISearchResult";
import { ISearchServiceConfiguration } from "./ISearchServiceConfiguration";

/**
 * Represents the data exposed by a search results Web Part for dynamic data connection
 */
interface ISearchResultSourceData {
    
    /**
     * The refinement results
     */
    refinementResults: IRefinementResult[];

    /**
     * The pagination information
     */
    paginationInformation: IPaginationInformation;

    /**
     * The search service configuration
     */
    searchServiceConfiguration: ISearchServiceConfiguration;
}

export default ISearchResultSourceData;