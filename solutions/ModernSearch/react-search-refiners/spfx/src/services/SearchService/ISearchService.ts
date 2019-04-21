import { ISearchResults, ISearchVerticalInformation, IRefinementFilter } from '../../models/ISearchResult';
import { ISearchServiceConfiguration } from '../../models/ISearchServiceConfiguration';
import ISearchVerticalSourceData from '../../models/ISearchVerticalSourceData';
import { ISearchVertical } from '../../models/ISearchVertical';

interface ISearchService extends ISearchServiceConfiguration {
    /**
     * Perfoms a search query.
     * @returns ISearchResults object. Use the 'RelevantResults' property to acces results proeprties (returned as key/value pair object => item.[<Managed property name>])
     */
    search(kqlQuery: string, pageNumber?: number): Promise<ISearchResults>;

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
     * Retreives the result counts for each search vertical
     * @param queryText the search query text
     * @param searchVerticalsConfiguration the search verticals configuration
     * @param enableQueryRules enable query rules or not
     */
    getSearchVerticalCounts(queryText: string, searchVerticals: ISearchVertical[], enableQueryRules: boolean): Promise<ISearchVerticalInformation[]>;
}

 export default ISearchService;