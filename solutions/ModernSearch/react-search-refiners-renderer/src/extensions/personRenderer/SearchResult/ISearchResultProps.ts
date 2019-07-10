import { ISearchResults } from '../../../models/ISearchResult';
import IResultService from '../../../services/ResultService/IResultService';

export default interface ISearchResultProps {
    searchResults: ISearchResults;
    componentId: string;
    webServerRelativeUrl: string;
    secondaryTextField: string;
    tertiaryTextField: string;
}