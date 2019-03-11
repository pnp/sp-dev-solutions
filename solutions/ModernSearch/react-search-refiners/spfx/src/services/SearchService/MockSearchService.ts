import ISearchService from                                       './ISearchService';
import { ISearchResults, IRefinementFilter, ISearchResult } from '../../models/ISearchResult';
import { intersection, clone } from '@microsoft/sp-lodash-subset';
import IRefinerConfiguration from '../../models/IRefinerConfiguration';
import { Sort } from '@pnp/sp';
import { ISearchServiceConfiguration } from '../../models/ISearchServiceConfiguration';

class MockSearchService implements ISearchService {

    private _suggestions: string[];
    private _resultsCount: number;
    private _selectedProperties: string[];
    private _queryTemplate: string;
    private _resultSourceId: string;
    private _sortList: Sort[];
    private _enableQueryRules: boolean;
    private _refiners: IRefinerConfiguration[];
    private _refinementFilters: IRefinementFilter[];

    public get resultsCount(): number { return this._resultsCount; }
    public set resultsCount(value: number) { this._resultsCount = value; }

    public set selectedProperties(value: string[]) { this._selectedProperties = value; }
    public get selectedProperties(): string[] { return this._selectedProperties; }

    public set queryTemplate(value: string) { this._queryTemplate = value; }
    public get queryTemplate(): string { return this._queryTemplate; }

    public set resultSourceId(value: string) { this._resultSourceId = value; }
    public get resultSourceId(): string { return this._resultSourceId; }

    public set sortList(value: Sort[]) { this._sortList = value; }
    public get sortList(): Sort[] { return this._sortList; }

    public set enableQueryRules(value: boolean) { this._enableQueryRules = value; }
    public get enableQueryRules(): boolean { return this._enableQueryRules; }

    public set refiners(value: IRefinerConfiguration[]) { this._refiners = value; }
    public get refiners(): IRefinerConfiguration[] { return this._refiners; }

    public set refinementFilters(value: IRefinementFilter[]) { this._refinementFilters = value; }
    public get refinementFilters(): IRefinementFilter[] { return this._refinementFilters; }

    private _searchResults: ISearchResults;

    public constructor() {
     
        this._searchResults = {
            QueryKeywords: "",
            RelevantResults: [
                {
                    Title: 'Document 1 - Category 1',
                    Path: 'http://document1.ca',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ446f63756d656e74,ǂǂ45647563617465',
                    ContentCategory: 'Document',
                },
                {
                    Title: 'Document 2 - Category 2',
                    Path: 'http://document2.ca',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ446f63756d656e74,ǂǂ416476697365',
                    ContentCategory: 'Document',
                },
                {
                    Title: 'Form 1',
                    Path: 'http://form1.ca',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues:  'ǂǂ466f726d',
                    ContentCategory: 'Form',              
                },
                {
                    Title: 'Video 1 - Category 1',
                    Path: 'https://www.youtube.com/watch?v=S93e6UU7y9o',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ566964656f,ǂǂ45647563617465',
                    ContentCategory: 'Video',                    
                },
                {
                    Title: 'Video 2 - Category 2',
                    Path: 'https://www.youtube.com/watch?v=8Nl_dKVQ1O8',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ566964656f,ǂǂ416476697365',
                    ContentCategory: 'Video',                                                
                },                                   
            ],
            RefinementResults: [
                {
                    FilterName: 'Type',
                    Values: [
                        {
                            RefinementCount: 2,
                            RefinementName: 'Document',
                            RefinementToken: 'ǂǂ446f63756d656e74',
                            RefinementValue: 'Document',   
                        },
                        {
                            RefinementCount: 2,
                            RefinementName: 'Video',
                            RefinementToken: 'ǂǂ566964656f',
                            RefinementValue: 'Video',                               
                        },
                        {
                            RefinementCount: 1,
                            RefinementName: 'Form',
                            RefinementToken: 'ǂǂ466f726d',
                            RefinementValue: 'Form',                               
                        }
                    ]
                },
                {
                    FilterName: 'Theme',
                    Values: [
                        {
                            RefinementCount: 2,
                            RefinementName: 'Category 1',
                            RefinementToken: 'ǂǂ45647563617465',
                            RefinementValue: 'Category 1',   
                        },
                        {
                            RefinementCount: 2,
                            RefinementName: 'Category 2',
                            RefinementToken: 'ǂǂ416476697365',
                            RefinementValue: 'Category 2',                               
                        },
                    ]
                }
            ],
            PaginationInformation: {
                TotalRows: 5,
                CurrentPage: 1,
                MaxResultsPerPage: this.resultsCount
            }
        };

        this._suggestions = [
            "sharepoint",
            "analysis document",
            "project document",
            "office 365",
            "azure cloud architecture",
            "architecture document",
            "sharepoint governance guide",
            "hr policies",
            "human resources procedures"
        ];
    }

    public search(query: string, pageNumber?: number): Promise<ISearchResults> {
         
        const p1 = new Promise<ISearchResults>((resolve, reject) => {

            const filters: string[] = [];
            let searchResults = clone(this._searchResults);
            searchResults.QueryKeywords = query;
            const filteredResults: ISearchResult[] = [];
            
            if (this.refinementFilters.length > 0) {
                this.refinementFilters.map((filter) => {
                    filters.push(filter.Value.RefinementToken);                                                     
                });
                
                searchResults.RelevantResults.map((searchResult) => {
                    const filtered = intersection(filters, searchResult.RefinementTokenValues.split(','));
                    if (filtered.length > 0) {
                        filteredResults.push(searchResult);
                    }
                });

                searchResults.RelevantResults = filteredResults;
                searchResults.RefinementResults = this._searchResults.RefinementResults;
            }

            searchResults.PaginationInformation.CurrentPage = pageNumber;
            searchResults.PaginationInformation.TotalRows = searchResults.RelevantResults.length;
            searchResults.PaginationInformation.MaxResultsPerPage = this.resultsCount;
            
            // Return only the specified count
            searchResults.RelevantResults = this._paginate(searchResults.RelevantResults, this.resultsCount, pageNumber);

            // Simulate an async call
            setTimeout(() => {
                resolve(searchResults);
            }, 1000);
        });

        return p1;
    }

    private _paginate (array, pageSize: number, pageNumber: number) {
        let basePage = --pageNumber * pageSize;

        return pageNumber < 0 || pageSize < 1 || basePage >= array.length 
            ? [] 
            : array.slice(basePage, basePage + pageSize );
    }

    public async suggest(keywords: string): Promise<string[]> {
       
        let proposedSuggestions: string[] = [];

        const p1 = new Promise<string[]>((resolve, reject) => {
            this._suggestions.map(suggestion => {

                const idx = suggestion.toLowerCase().indexOf(keywords.toLowerCase());
                if (idx !== -1) {

                    const preMatchedText = suggestion.substring(0, idx);
                    const postMatchedText = suggestion.substring(idx + keywords.length, suggestion.length);
                    const matchedText = suggestion.substr(idx, keywords.length);

                    proposedSuggestions.push(`${preMatchedText}<B>${matchedText}</B>${postMatchedText}`);
                }
            });
            
            // Simulate an async call
            setTimeout(() => {
                resolve(proposedSuggestions);
            }, 100);

        });
        
        return p1;
    }

    public getConfiguration(): ISearchServiceConfiguration {
        return {
            enableQueryRules: this.enableQueryRules,
            queryTemplate: this.queryTemplate,
            refinementFilters: this.refinementFilters,
            refiners: this.refiners,
            resultSourceId: this.resultSourceId,
            resultsCount: this.resultsCount,
            selectedProperties: this.selectedProperties,
            sortList: this.sortList
        };
    }
}

export default MockSearchService;