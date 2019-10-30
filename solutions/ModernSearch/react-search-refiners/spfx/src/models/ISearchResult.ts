export interface ISearchResults {
    QueryKeywords: string;
    PaginationInformation?: IPaginationInformation;
    RelevantResults: ISearchResult[];
    RefinementResults: IRefinementResult[];
    PromotedResults?: IPromotedResult[];
    SecondaryResults?: ISearchResultBlock[];
    SpellingSuggestion?: string;
}

export interface IPaginationInformation {
    CurrentPage: number;
    TotalRows: number;
    MaxResultsPerPage: number;
}

export interface ISearchVerticalInformation {
    VerticalKey: string;
    Count: number;
}

export interface ISearchResult {
    [key: string]: string;
    IconSrc?: string;
    IconExt?: string;
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
    Values: IRefinementValue[];
    Operator: RefinementOperator;
}

export enum RefinementOperator {
    OR = 'or',
    AND = 'and'
}

export interface ISearchResultBlock {
  Title: string;
  Results: ISearchResult[];
}
