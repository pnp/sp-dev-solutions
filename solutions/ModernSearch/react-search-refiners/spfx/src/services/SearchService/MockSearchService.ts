import ISearchService from                                       './ISearchService';
import { ISearchResults, IRefinementFilter, ISearchResult, ISearchVerticalInformation } from '../../models/ISearchResult';
import { intersection, clone } from '@microsoft/sp-lodash-subset';
import IRefinerConfiguration from '../../models/IRefinerConfiguration';
import { Sort } from '@pnp/sp';
import { ISearchServiceConfiguration } from '../../models/ISearchServiceConfiguration';
import ISearchVerticalSourceData from '../../models/ISearchVerticalSourceData';
import { ISearchVertical } from '../../models/ISearchVertical';
import IManagedPropertyInfo from '../../models/IManagedPropertyInfo';

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
    private _queryCulture: number;

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

    public get queryCulture(): number { return this._queryCulture; }
    public set queryCulture(value: number) { this._queryCulture = value; }

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
                    PreviewUrl: 'https://via.placeholder.com/400',
                    Author: 'Michele Clark',
                    SPSiteUrl: 'https://www.microsoft.com',
                    SiteTitle: 'Site 1',
                    owstaxidmetadataalltagsinfo: "L0|#03f88cf2c-a641-4bca-8861-7e363f5d9a0f|Tag 1"
                },
                {
                    Title: 'Document 2 - Category 2',
                    Path: 'http://document2.ca',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ446f63756d656e74,ǂǂ416476697365',
                    ContentCategory: 'Document',
                    PreviewUrl: 'https://via.placeholder.com/400',
                    Author: 'John Doe',
                    SPSiteUrl: 'https://www.microsoft.com',
                    SiteTitle: 'Site 1',
                    owstaxidmetadataalltagsinfo: "L0|#0ce7eb131-c322-4a46-a398-383b0ec0f3c3|Tag 2,L0|#03f88cf2c-a641-4bca-8861-7e363f5d9a0f|Tag 1"
                },
                {
                    Title: 'Form 1',
                    Path: 'http://form1.ca',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues:  'ǂǂ466f726d',
                    ContentCategory: 'Form',
                    PreviewUrl: 'https://via.placeholder.com/400',
                    Author: 'John Doe',
                    SPSiteUrl: 'https://www.microsoft.com',
                    SiteTitle: 'Site 2',
                    owstaxidmetadataalltagsinfo: "L0|#03f88cf2c-a641-4bca-8861-7e363f5d9a0f|Tag 1"              
                },
                {
                    Title: 'Video 1 - Category 1',
                    Path: 'https://www.youtube.com/watch?v=S93e6UU7y9o',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ566964656f,ǂǂ45647563617465',
                    ContentCategory: 'Video',
                    PreviewUrl: 'https://via.placeholder.com/400',
                    Author: 'Aaron Painter',
                    SiteTitle: 'Site 2',
                    owstaxidmetadataalltagsinfo: "L0|#0ce7eb131-c322-4a46-a398-383b0ec0f3c3|Tag 2"                                        
                },
                {
                    Title: 'Video 2 - Category 2',
                    Path: 'https://www.youtube.com/watch?v=8Nl_dKVQ1O8',
                    Created: '2017-07-22T15:38:54.0000000Z',
                    RefinementTokenValues: 'ǂǂ566964656f,ǂǂ416476697365',
                    ContentCategory: 'Video',
                    PreviewUrl: 'https://via.placeholder.com/400',
                    Author: 'Aaron Painter',
                    SPSiteUrl: 'https://www.microsoft.com',
                    SiteTitle: 'Site 3',
                    owstaxidmetadataalltagsinfo: "L0|#01257a103-d2a1-43c4-8c07-6138527a88b7|Tag 3"               
                },                                   
            ],
            RefinementResults: [
                {
                    FilterName: 'Created',
                    Values: [
                        {
                            RefinementCount: 388,
                            RefinementName: "Before 2017-12-01T23:30:15.0000640Z",
                            RefinementToken: "range(min, 2017-12-01T23:30:15.0000640Z)",
                            RefinementValue: "Before 2017-12-01T23:30:15.0000640Z"
                        },
                        {
                            RefinementCount: 389,
                            RefinementName: "From 2017-12-01T23:30:15.0000640Z up to 2018-03-11T00:45:21.0000384Z",
                            RefinementToken: "range(2017-12-01T23:30:15.0000640Z, 2018-03-11T00:45:21.0000384Z)",
                            RefinementValue: "From 2017-12-01T23:30:15.0000640Z up to 2018-03-11T00:45:21.0000384Z"
                        },
                        {
                            RefinementCount: 389,
                            RefinementName: "From 2018-03-11T00:45:21.0000384Z up to 2019-03-11T15:35:26.5000448Z",
                            RefinementToken: "range(2018-03-11T00:45:21.0000384Z, 2019-03-11T15:35:26.5000448Z)",
                            RefinementValue: "From 2018-03-11T00:45:21.0000384Z up to 2019-03-11T15:35:26.5000448Z"
                        },
                        {
                            RefinementCount: 388,
                            RefinementName: "2019-03-11T15:35:26.5000448Z or later",
                            RefinementToken: "range(2019-03-11T15:35:26.5000448Z, max, to=\"le\")",
                            RefinementValue: "2019-03-11T15:35:26.5000448Z or later"
                        }
                    ]
                },
                {
                    FilterName: 'Size',
                    Values:  [
                        {
                            RefinementCount: 1352,
                            RefinementName: "Less than 6",
                            RefinementToken: "range(min, 6)",
                            RefinementValue: "Less than 6"
                        },
                        {
                            RefinementCount: 334,
                            RefinementName: "6 up to 1735",
                            RefinementToken: "range(6, 1735)",
                            RefinementValue: "6 up to 1735"
                        },
                        {
                            RefinementCount: 335,
                            RefinementName: "1735 up to 83594",
                            RefinementToken: "range(1735, 83594)",
                            RefinementValue: "1735 up to 83594"
                        },
                        {
                            RefinementCount: 334,
                            RefinementName: "83594 and up",
                            RefinementToken: "range(83594, max, to=\"le\")",
                            RefinementValue: "83594 and up"
                        }
                    ]
                },
                {
                    FilterName: 'owstaxidmetadataalltagsinfo',
                    Values: [
                        {
                            RefinementCount: 8,
                            RefinementName: "L0|#0e795b4e4-f18e-4f65-8a23-829e83d9ec8a|Presentation",
                            RefinementToken: "ǂǂ446f63756d656e74",
                            RefinementValue: "L0|#0e795b4e4-f18e-4f65-8a23-829e83d9ec8a|Presentation"
                        },
                        {
                            RefinementCount: 7,
                            RefinementName: "L0|#0f3840020-3a06-427f-a062-829e07687199|Document",
                            RefinementToken: "ǂǂ566964656f",
                            RefinementValue: "L0|#0f3840020-3a06-427f-a062-829e07687199|Document"
                        },
                        {
                            RefinementCount: 6,
                            RefinementName: "L0|#05b248f74-ffcc-4221-94a5-1fcf4495e014|News",
                            RefinementToken: "ǂǂ416476697365",
                            RefinementValue: "L0|#05b248f74-ffcc-4221-94a5-1fcf4495e014|News"
                        },
                        {
                            RefinementCount: 6,
                            RefinementName: "L0|#06234355d-bb43-4632-b170-809b06fe103f|Policy",
                            RefinementToken: "ǂǂ466f726d",
                            RefinementValue: "L0|#06234355d-bb43-4632-b170-809b06fe103f|Policy"
                        }
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
         
        const p1 = new Promise<ISearchResults>((resolve) => {

            const filters: string[] = [];
            let searchResults = clone(this._searchResults);
            searchResults.QueryKeywords = query;
            const filteredResults: ISearchResult[] = [];
            
            if (this.refinementFilters.length > 0) {
                this.refinementFilters.map((filter) => {
                    filters.push(filter.Values[0].RefinementToken);                                                     
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

        const p1 = new Promise<string[]>((resolve) => {
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
            sortList: this.sortList,
            queryCulture: this.queryCulture
        };
    }

    /**
     * Retrieves the result counts for each search vertical
     * @param queryText the search query text
     * @param searchVerticalsConfiguration the search verticals configuration
     * @param enableQueryRules enable query rules or not
     */
    public getSearchVerticalCounts(queryText: string, searchVerticals: ISearchVertical[], enableQueryRules: boolean): Promise<ISearchVerticalInformation[]> {

        let verticalInformation: ISearchVerticalInformation[] = [];

        verticalInformation = searchVerticals.map(vertical => {
            return {
                Count: Math.ceil(Math.random() * 10),
                VerticalKey: vertical.key
            } as ISearchVerticalInformation;
        });

        return Promise.resolve(verticalInformation);
    }

    /**
     * Gets available search managed properties in the search schema
     */
    public async getAvailableManagedProperties(): Promise<IManagedPropertyInfo[]> {

        let managedProperties: IManagedPropertyInfo[] = [
            { name: 'Created' },
            { name: 'AuthorOWSUSER'},
            { name: 'CreatedBy' },
            { name: 'Title'},
            { name: 'Modified' },
            { name: 'ModifiedBy'},
            { name: 'FileType' },
            { name: 'Size'}
        ];

        return Promise.resolve(managedProperties);
    }

    /**
     * Gets all available languages for the search query
     */
    public getAvailableQueryLanguages() {
        return Promise.resolve([
            {
                DisplayName:"English",
                LanguageTag:"en-US",
                Lcid:1033
            },
            { 
                DisplayName: "German", 
                LanguageTag: "de-DE", 
                Lcid: 1031
            },
            {
                DisplayName: "French", 
                LanguageTag: "fr-FR", 
                Lcid: 1036
            },
            {   DisplayName: "Irish",
                LanguageTag: "ga-IE",
                Lcid: 2108
            }
        ]);
    }

    /**
     * Checks if the provided manage property is sortable or not
     * @param property the managed property to verify
     */
    public async validateSortableProperty(property: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}

export default MockSearchService;