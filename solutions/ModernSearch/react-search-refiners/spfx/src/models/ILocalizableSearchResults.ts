export interface ILocalizableSearchResult {

    /**
     * The unique identifier of the search result
     */
    uniqueIdentifier: string;

    /**
     * All localizable properties for this result
     */
    properties: ILocalizableSearchResultProperty[];
}

export  interface ILocalizableSearchResultProperty {

    /**
     * Name of the search result propert (ex: 'RefinableStringXXX')
     */
    propertyName: string;

    /**
     * Localized term ids
     */
    termIds?: string[];

    /**
     * Localized term labels
     */
    termLabels?: string[];
}