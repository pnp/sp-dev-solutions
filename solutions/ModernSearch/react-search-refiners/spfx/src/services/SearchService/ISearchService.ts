import { ISearchResults, ISearchVerticalInformation, IRefinementFilter } from '../../models/ISearchResult';
import { ISearchServiceConfiguration } from '../../models/ISearchServiceConfiguration';
import { ISearchVertical } from '../../models/ISearchVertical';
import IManagedPropertyInfo from '../../models/IManagedPropertyInfo';

interface ISearchService extends ISearchServiceConfiguration {
    /**
     * Perfoms a search query.
     * @returns ISearchResults object. Use the 'RelevantResults' property to acces results proeprties (returned as key/value pair object => item.[<Managed property name>])
     */
    search(kqlQuery: string, pageNumber?: number, useOldSPIcons?: boolean): Promise<ISearchResults>;

    /**
     * Retrieves search query suggestions
     * @param query the term to suggest from
     */
    suggest(query: string): Promise<string[]>;

    /**
     * Retrieve the configuration of the search service
     */
    getConfiguration(): ISearchServiceConfiguration;

    /**
     * Gets available search managed properties in the search schema
     */
    getAvailableManagedProperties(): Promise<IManagedPropertyInfo[]>;

    /**
     * Checks if the provided manage property is sortable or not
     * @param property the managed property to verify
     */
    validateSortableProperty(property: string): Promise<boolean>;

    /**
     * Retreives the result counts for each search vertical
     * @param queryText the search query text
     * @param searchVerticalsConfiguration the search verticals configuration
     * @param enableQueryRules enable query rules or not
     */
    getSearchVerticalCounts(queryText: string, searchVerticals: ISearchVertical[], enableQueryRules: boolean): Promise<ISearchVerticalInformation[]>;

    /**
     * Gets all available languages for the search query
     */
    getAvailableQueryLanguages(): Promise<any[]>;
}

 export default ISearchService;