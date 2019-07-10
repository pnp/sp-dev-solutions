import { ISearchResults } from './ISearchResult';
import ISearchService from '../services/SearchService/ISearchService';

type SearchResultsOperationCallback = (results: ISearchResults, mountingNodeGuid: string, searchService: ISearchService) => Promise<void>;

export default SearchResultsOperationCallback;