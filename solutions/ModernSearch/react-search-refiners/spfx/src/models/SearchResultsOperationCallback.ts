import { ISearchResults } from './ISearchResult';

type SearchResultsOperationCallback = (results: ISearchResults, mountingNodeGuid: string) => void;

export default SearchResultsOperationCallback;