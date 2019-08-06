import { ISearchResults } from '../../../../models/ISearchResult';
import { SortDirection } from "@pnp/sp";

interface ISearchResultsContainerState {
    
    /**
     * The current search results to display
     */
    results: ISearchResults;

    /**
     * Error message display in the message bar
     */
    errorMessage: string;

    /**
     * Indicates whether or not there is an error in the component
     */
    hasError: boolean;

    /**
     * Indicates whether or not the results are currenty loading due to a refinement or new query
     */
    areResultsLoading: boolean;

    /**
     * Keeps the field on which the results need to be sorted (after initial sort)
     */
    sortField?: string;

    /**
     * Keeps the order in which the results need to be sorted (after initial sort)
     */
    sortDirection?: SortDirection;
    
    /**
     *  Id for the current mounting node
     */
    mountingNodeId: string;
}

export default ISearchResultsContainerState;