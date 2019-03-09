export interface ISearchResults {
    SearchQuery: string;
    // SearchState: {
    //     QueryKeywords: string;
    //     SelectedProperties: string[];
    //     QueryTemplate: string;
    // };
    Pagination?: ISearchPagination;
    RelevantResults: ISearchResult[];
    RefinementResults: IRefinementResult[];
    PromotedResults?: IPromotedResult[];
}

export interface ISearchPagination {
    CurrentPage: number;
    TotalRows: number;
    MaxResultsPerPage: number;
}

export interface ISearchResult {
    [key: string]: string;
    IconSrc?: string;
}

export interface IRefinementResult {
    FilterName: string;
    Values: IRefinementValue[];
}

export interface IPromotedResult {
    Url: string;
    Title: string;
    Description: string;
}

export interface IRefinementValue {
    RefinementCount: number;
    RefinementName: string;
    RefinementToken: string;
    RefinementValue: string;
} 

export interface IRefinementFilter {
    FilterName: string;
    Value: IRefinementValue;
}