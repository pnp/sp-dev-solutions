import { ISearchResults } from '../../models/ISearchResult';
import { ISearchServiceConfiguration } from '../../models/ISearchServiceConfiguration';

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
}

 export default ISearchService;