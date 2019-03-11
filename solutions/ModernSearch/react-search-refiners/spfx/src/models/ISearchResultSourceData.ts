import { IRefinementResult, IPaginationInformation } from "./ISearchResult";

/**
 * Represents the data exposed by a search results Web Part for dynamic data connection
 */
interface ISearchResultSourceData {
    
    /**
     * The refinement results
     */
    refinementResults: IRefinementResult[];

    /**
     * The refinement results
     */
    paginationInformation: IPaginationInformation;
}

export default ISearchResultSourceData;