import { Sort } from "@pnp/sp";
import { IRefinementFilter } from "./ISearchResult";
import IRefinerConfiguration from "./IRefinerConfiguration";

export interface ISearchServiceConfiguration {
    /**
     * Determines the number of items ot retrieve in REST requests
     */
    resultsCount: number;
    
    /**
     * Selected managed properties to retrieve when a search query is performed 
     */
    selectedProperties: string[];
    
    /**
     * Determines the query template to apply in REST requests
     */
    queryTemplate?: string;

    /**
     * The SharePoint result source id to target
     */
    resultSourceId?: string;

    /**
     * The sort order of the results
     */
    sortList?: Sort[];

    /**
     * Indicates wheter or not the query rules should be applied in the query
     */
    enableQueryRules?: boolean;

    /**
     * The managed properties used as refiners for the query
     */
    refiners?: IRefinerConfiguration[];
    
    /**
     * The selected filters that need to be applied on the search query
     */
    refinementFilters?: IRefinementFilter[];

    /**
     * The synonyms table
     */
    synonymTable?: { [key:string]: string[] };

    /**
     * The search query culture
     */
    queryCulture: number;
}