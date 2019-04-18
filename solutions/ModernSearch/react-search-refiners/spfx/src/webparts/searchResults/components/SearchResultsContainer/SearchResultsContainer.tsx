import * as React from 'react';
import ISearchResultsContainerProps from './ISearchResultsContainerProps';
import ISearchResultsContainerState from './ISearchResultsContainerState';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Shimmer, ShimmerElementType as ElemType, ShimmerElementsGroup } from 'office-ui-fabric-react/lib/Shimmer';
import { Logger, LogLevel } from '@pnp/logging';
import * as strings from 'SearchResultsWebPartStrings';
import { IRefinementValue, IRefinementResult, ISearchResult, ISearchResults } from '../../../../models/ISearchResult';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { DisplayMode, Guid } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import SearchResultsTemplate from '../Layouts/SearchResultsTemplate';
import styles from '../SearchResultsWebPart.module.scss';
import { SortPanel } from '../SortPanel';
import { SortDirection } from "@pnp/sp";
import { ITermData, ITerm } from '@pnp/sp-taxonomy';
import LocalizationHelper from '../../../../helpers/LocalizationHelper';
import { Text } from '@microsoft/sp-core-library';
import { ILocalizableSearchResultProperty, ILocalizableSearchResult } from '../../../../models/ILocalizableSearchResults';
import * as _ from '@microsoft/sp-lodash-subset';

declare var System: any;

export default class SearchResultsContainer extends React.Component<ISearchResultsContainerProps, ISearchResultsContainerState> {

    private _searchWpRef: HTMLElement;

    public constructor(props: ISearchResultsContainerProps) {
        super(props);

        // Set the initial state
        this.state = {
            results: {
                QueryKeywords: '',
                RefinementResults: [],
                RelevantResults: []
            },
            areResultsLoading: false,
            errorMessage: '',
            hasError: false,
            mountingNodeId: `pnp-search-render-node-${this.getGUID()}`,
        };

        this._onUpdateSort = this._onUpdateSort.bind(this);
    }

    public render(): React.ReactElement<ISearchResultsContainerProps> {

        const areResultsLoading = this.state.areResultsLoading;
        const items = this.state.results;
        const hasError = this.state.hasError;
        const errorMessage = this.state.errorMessage;

        let renderWpContent: JSX.Element = null;
        let renderOverlay: JSX.Element = null;
        let renderWebPartTitle: JSX.Element = null;

        if (areResultsLoading) {

            if (items.RelevantResults.length > 0) {
                renderOverlay = <div>
                    <Overlay isDarkThemed={false} className={styles.overlay}>
                        <Spinner size={SpinnerSize.medium} />
                    </Overlay>
                </div>;
            } else {
                let i = 0;
                let renderShimmerElements: JSX.Element[] = [];
                while (i < 4) {
                    renderShimmerElements.push(
                        <Shimmer 
                        key={i}
                        customElementsGroup={this._getShimmerElements()} 
                        width="100%"
                        style={{ marginBottom: "20px" }}                    
                    />);
                    i++;
                }

                renderWpContent = <div>{ renderShimmerElements }</div>;
            }
        }

        
        if (this.props.webPartTitle && this.props.webPartTitle.length > 0) {
            renderWebPartTitle = <WebPartTitle title={this.props.webPartTitle} updateProperty={null} displayMode={DisplayMode.Read} />;
        }

        const sortPanel = <SortPanel 
                                onUpdateSort={this._onUpdateSort} 
                                sortableFieldsConfiguration={this.props.sortableFields} 
                                sortDirection={this.state.sortDirection}
                                sortField={this.state.sortField} />; 
        if (hasError) {
            renderWpContent = <MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>;
        } else {                                 

            if (items.RelevantResults.length === 0) {
                const selectedProperties = (this.props.searchService.selectedProperties) ? this.props.searchService.selectedProperties.join(',') : undefined;
                const lastQuery = this.state.results.QueryKeywords + this.props.searchService.queryTemplate + selectedProperties;
                // Check if a search request has already been entered (to distinguish the first use scenario)
                if (!this.props.showBlank && lastQuery && !areResultsLoading) {
                    renderWpContent =
                        <div>
                            {renderWebPartTitle}
                            <div className={styles.searchWp__buttonBar}>{sortPanel}</div>
                            <div className={styles.searchWp__noresult}>{strings.NoResultMessage}</div>
                        </div>;
                } else {
                    if (this.props.displayMode === DisplayMode.Edit && !areResultsLoading && this.props.showBlank) {
                        renderWpContent = <MessageBar messageBarType={MessageBarType.info}>{strings.ShowBlankEditInfoMessage}</MessageBar>;
                    }
                }
            } else {

                let renderSearchResultTemplate = <div></div>;
                 if(!this.props.useCodeRenderer) {
                    renderSearchResultTemplate = 
                        <SearchResultsTemplate
                            templateService={this.props.templateService}
                            templateContent={this.props.templateContent}
                            templateContext={
                                {
                                    items: this.state.results.RelevantResults,
                                    promotedResults: this.state.results.PromotedResults,
                                    totalRows: this.state.results.PaginationInformation.TotalRows,
                                    keywords: this.props.queryKeywords,
                                    showResultsCount: this.props.showResultsCount,
                                    siteUrl: this.props.siteServerRelativeUrl,
                                    webUrl: this.props.webServerRelativeUrl,
                                    maxResultsCount: this.props.searchService.resultsCount,
                                    actualResultsCount: items.RelevantResults.length,
                                    strings: strings
                                }
                            }
                        />;
                }
                renderWpContent =
                    <div>
                        {renderWebPartTitle}
                        <div className={styles.searchWp__buttonBar}>{sortPanel}</div>
                        {renderOverlay}
                        <div id={this.state.mountingNodeId} />
                        {renderSearchResultTemplate}
                    </div>;
            }
        }
        
        return (
            <div className={styles.searchWp}>
                <div tabIndex={-1} ref={ (ref) => { this._searchWpRef = ref; }}></div>
                {renderWpContent}
            </div>
        );
    }

    public async componentDidMount() {

        // Don't perform search if there are no keywords
        if (this.props.queryKeywords) {
            try {

                this.setState({
                    areResultsLoading: true,
                });

                const searchResults = await this.props.searchService.search(this.props.queryKeywords, this.props.selectedPage);

                // Translates taxonomy refiners and result values by using terms ID
                if (this.props.enableLocalization) {
                    const localizedFilters = await this._getLocalizedFilters(searchResults.RefinementResults);
                    searchResults.RefinementResults = localizedFilters;

                    const localizedResults = await this._getLocalizedMetadata(searchResults.RelevantResults);
                    searchResults.RelevantResults = localizedResults;
                }
                
                this.setState({
                    results: searchResults,
                    areResultsLoading: false
                });

                this.handleResultUpdateBroadCast(searchResults);

            } catch (error) {

                Logger.write('[SearchContainer._componentDidMount()]: Error: ' + error, LogLevel.Error);

                let results: ISearchResults = { QueryKeywords: this.state.results.QueryKeywords, RefinementResults: [], RelevantResults: [] };

                this.setState({
                    areResultsLoading: false,
                    results: results,
                    hasError: true,
                    errorMessage: error.message
                });

                this.handleResultUpdateBroadCast(results);
            }
        } else {
            this.setState({
                areResultsLoading: false
            });
        }
    }

    public async componentWillReceiveProps(nextProps: ISearchResultsContainerProps) {
        let executeSearch = false;
        let isPageChanged = false;
        let selectedPage = 1;
        let lastSelectedProperties = (this.props.searchService.selectedProperties) ? this.props.searchService.selectedProperties.join(',') : undefined;
        let lastQuery = this.props.queryKeywords + this.props.searchService.queryTemplate + lastSelectedProperties;
        let nextSelectedProperties = (nextProps.searchService.selectedProperties) ? nextProps.searchService.selectedProperties.join(',') : undefined;
        let query = nextProps.queryKeywords + nextProps.searchService.queryTemplate + nextSelectedProperties;

        if (this.props.selectedPage !== nextProps.selectedPage) {
            executeSearch = true;
            isPageChanged = true;
            selectedPage = nextProps.selectedPage;
        }

        // New props are passed to the component when the search query has been changed
        if (JSON.stringify(this.props.searchService.refiners) !== JSON.stringify(nextProps.searchService.refiners)
            || JSON.stringify(this.props.searchService.refinementFilters) != JSON.stringify(nextProps.searchService.refinementFilters)
            || JSON.stringify(this.props.searchService.sortList) !== JSON.stringify(nextProps.searchService.sortList)
            || this.props.searchService.resultsCount !== nextProps.searchService.resultsCount
            || this.props.searchService.enableQueryRules !== nextProps.searchService.enableQueryRules
            || lastQuery !== query
            || this.props.searchService.resultSourceId !== nextProps.searchService.resultSourceId
            || this.props.queryKeywords !== nextProps.queryKeywords
            || this.props.enableLocalization !== nextProps.enableLocalization
            || this.props.rendererId !== nextProps.rendererId
            || this.props.customTemplateFieldValues !== nextProps.customTemplateFieldValues) {
            executeSearch = true;
            isPageChanged = false;
            selectedPage = 1;
            if (lastQuery !== query) {
                nextProps.searchService.refinementFilters = [];
            }
        }

        if (executeSearch) {
            // Don't perform search is there is no keywords
            if (nextProps.queryKeywords) {
                try {
                    // Clear selected filters on a new query or new refiners
                    this.setState({
                        areResultsLoading: true,
                        hasError: false,
                        errorMessage: ""
                    });

                    if (isPageChanged)
                    {
                        // Set the focus at the top of the component
                        this._searchWpRef.focus();
                    }

                    // We reset the page number and refinement filters
                    const searchResults = await nextProps.searchService.search(nextProps.queryKeywords, selectedPage);

                    // Translates taxonomy refiners and result values by using terms ID
                    if (nextProps.enableLocalization) {
                        const localizedFilters = await this._getLocalizedFilters(searchResults.RefinementResults);
                        searchResults.RefinementResults = localizedFilters;

                        const localizedResults = await this._getLocalizedMetadata(searchResults.RelevantResults);
                        searchResults.RelevantResults = localizedResults;
                    }

                    this.setState({
                        results: searchResults,
                        areResultsLoading: false
                    });

                    this.handleResultUpdateBroadCast(searchResults);

                } catch (error) {

                    Logger.write('[SearchContainer._componentWillReceiveProps()]: Error: ' + error, LogLevel.Error);

                    let results: ISearchResults = { QueryKeywords: this.state.results.QueryKeywords, RefinementResults: [], RelevantResults: [] };

                    this.setState({
                        areResultsLoading: false,
                        results: results,
                        hasError: true,
                        errorMessage: error.message
                    });
                    this.handleResultUpdateBroadCast(results);
                }
            } else {
                let results: ISearchResults = { QueryKeywords: '', RefinementResults: [], RelevantResults: [] };
                this.setState({
                    areResultsLoading: false,
                    results: results,
                });

                this.handleResultUpdateBroadCast(results);
            }
        } else {
            // Refresh the template without making a new search query because we don't need to
            if (this.props.templateContent !== nextProps.templateContent ||
                this.props.showResultsCount !== nextProps.showResultsCount) {

                // Reset template errors if it has
                if (this.state.hasError) {
                    this.setState({
                        hasError: false,
                    });
                } else {
                    // We don't use a state variable for the template since it is passed from props 
                    // so we force a re render to apply the new template
                    this.forceUpdate();
                }
            }
        }
    }

    /**
     * Callback function to apply new sort configuration coming from the sort panel child component
     * @param newFilters The new filters to apply
     */
    private async _onUpdateSort(sortDirection: SortDirection, sortField?: string) {

        if (sortField) {
            // Get back to the first page when new sorting has been selected
            this.setState({
                sortField: sortField,
                sortDirection: sortDirection,
                areResultsLoading: true,
                hasError:false,
                errorMessage:null
            });

            this.props.searchService.sortList = [{Property: sortField, Direction: sortDirection}];

            try
            {
                const searchResults = await this.props.searchService.search(this.props.queryKeywords, 1);

                this.setState({
                    results: searchResults,
                    areResultsLoading: false,
                });

                this.handleResultUpdateBroadCast(searchResults);
            }
            catch(error) {
                Logger.write('[SearchContainer._onUpdateSort()]: Error: ' + error, LogLevel.Error);
                const errorMessage = /\"value\":\"[^:]+: SortList\.\"/.test(error.message) ? strings.Sort.SortErrorMessage : error.message;
                
                let results: ISearchResults = { QueryKeywords: this.state.results.QueryKeywords, RefinementResults: [], RelevantResults: [] };

                this.setState({
                    areResultsLoading: false,
                    results: results,
                    hasError: true,
                    errorMessage: errorMessage
                });

                this.handleResultUpdateBroadCast(results);
            }
        }
    }

    /**
     * Translates all refinement results according the current culture
     * By default SharePoint stores the taxonomy values according to the current site language. Because we can't create a communication site in French (as of 08/12/2017)
     * we need to do the translation afterwards
     * @param rawFilters The raw refinement results to translate coming from SharePoint search results
     */
    private async _getLocalizedFilters(rawFilters: IRefinementResult[]): Promise<IRefinementResult[]> {

        // Get the current lcid according to current page language
        const lcid = LocalizationHelper.getLocaleId(this.props.currentUICultureName);

        let termsToLocalize: { uniqueIdentifier: string, termId: string, localizedTermLabel: string }[] = [];
        let updatedFilters = [];
        let localizedTerms = [];

        rawFilters.map((filterResult) => {

            filterResult.Values.map((value) => {

                // Check if the value seems to be a taxonomy term
                // If the field value looks like a taxonomy value, we get the label according to the current locale
                // To get this type of values, we need to map the RefinableStringXXX properties with ows_taxId_xxx crawled properties
                const isTerm = /L0\|#(.+)\|/.test(value.RefinementValue);

                if (isTerm) {

                    // Check if it is a multi value term (i.e property bag proeprty formatted with ';')
                    // The ';' is a reserved character so it can't appear in taxonomy labels
                    const values = value.RefinementValue.split(';');
                    values.map((term) => {
                        let termId = /L0\|#(.+)\|/.exec(term)[1];
                        termId = Guid.isValid(termId) ? termId : termId.substr(1);

                        // The uniqueIdentifier is here to be able to match the original value with the localized one
                        // We use the refinement token, which is unique
                        termsToLocalize.push({
                            uniqueIdentifier: value.RefinementToken,
                            termId: termId,
                            localizedTermLabel: null
                        });
                    }); 
                }
            });
        });

        if (termsToLocalize.length > 0) {

            // Get the terms from taxonomy
            // If a term doesn't exist anymore, it won't be retrieved by the API so the termValues count could be less than termsToLocalize count
            const termValues = await this.props.taxonomyService.getTermsById(termsToLocalize.map((t) => { return t.termId; }));

            termsToLocalize.map((termToLocalize) => {

                // Check if the term has been retrieved from taxonomy (i.e. exists)
                const termsFromTaxonomy = termValues.filter((taxonomyTerm: ITerm & ITermData) => {
                    const termIdFromTaxonomy = taxonomyTerm.Id.substring(taxonomyTerm.Id.indexOf('(') + 1, taxonomyTerm.Id.indexOf(')'));
                    return termIdFromTaxonomy === termToLocalize.termId;
                });

                if (termsFromTaxonomy.length > 0) {

                    // Should be always unique since we can't have two terms with the same ids
                    const termFromTaxonomy: ITerm & ITermData = termsFromTaxonomy[0];

                    // It supposes the 'Label' property has been selected in the underlying call
                    // A term always have a default label so the collection can't be empty
                    let  localizedLabel = termFromTaxonomy["Labels"]._Child_Items_.filter((label: any) => {
                        return label.Language === lcid;
                    });

                    // Term does not have a translation for this LCID, get the default label
                    if (localizedLabel.length === 0) {
                        localizedLabel = termFromTaxonomy["Labels"]._Child_Items_;
                    }
                    
                    localizedTerms.push({
                        uniqueIdentifier: termToLocalize.uniqueIdentifier,
                        termId: termToLocalize.termId,
                        localizedTermLabel: localizedLabel[0].Value
                    });

                } else {
                    localizedTerms.push({
                        uniqueIdentifier: termToLocalize.uniqueIdentifier,
                        termId: termToLocalize.termId,
                        localizedTermLabel: Text.format(strings.TermNotFound, termToLocalize.termId)
                    });
                }
            });

            // Update original filters with localized values
            rawFilters.map((filter) => {
                let updatedValues = [];

                filter.Values.map((value) => {
                    const existingFilters = localizedTerms.filter((e) => { return e.uniqueIdentifier === value.RefinementToken; });
                                        
                    if (existingFilters.length > 0) {
                        existingFilters.map((existingFilter) => {
                            updatedValues.push({
                                RefinementCount: value.RefinementCount,
                                RefinementName: existingFilter.localizedTermLabel,
                                RefinementToken: value.RefinementToken,
                                RefinementValue: existingFilter.localizedTermLabel,
                            } as IRefinementValue);
                        });
                    } else {

                        // Keep only terms (L0). The crawl property ows_taxid_xxx return term sets too.
                        if (!/(GTSet|GPP|GP0)/i.test(value.RefinementName)) {
                            updatedValues.push(value);
                        }
                    }
                });

                updatedFilters.push({
                    FilterName: filter.FilterName,
                    Values: updatedValues.sort((a: IRefinementValue, b: IRefinementValue) => {
                        if (a.RefinementName) {
                            return a.RefinementName.localeCompare(b.RefinementName);
                        } else {
                            return 0;
                        }
                    })
                } as IRefinementResult);
            });

        } else {
            // Return filters without any modification
            updatedFilters = rawFilters;
        }

        return updatedFilters;
    }

    /**
     * Translates all result taxonomy values (owsTaxId...) according the current culture
     * @param rawResults The raw search results to translate coming from SharePoint search
     */
    private async _getLocalizedMetadata(rawResults: ISearchResult[]): Promise<ISearchResult[]> {

        // Get the current lcid according to current page language
        const lcid = LocalizationHelper.getLocaleId(this.props.currentUICultureName);

        let resultsToLocalize: ILocalizableSearchResult[] = [];

        let updatedResults: ISearchResult[] = [];
        let localizedTerms = [];

        // Step #1: identify all taxonomy like properties and gather corresponding term ids for such properties.
        rawResults.map((result) => {

            let properties = [];

            Object.keys(result).map((value) => {

                // Check if the value seems to be a taxonomy term value (single or multi)
                const isTerm = /L0\|#.?([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/.test(result[value]);

                if (isTerm) {
                    
                    let termIds = [];
                    
                    const regex = /L0\|#.?([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/g;
                    const str = result[value];
                    let m;

                    while ((m = regex.exec(str)) !== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }

                        termIds.push(m[1]); 
                    }

                    properties.push({
                        propertyName: value,
                        termIds: termIds
                    } as ILocalizableSearchResultProperty);
                }
            });

            // We use the 'UniqueID' as an unique identifier since this property is always present in the metadata
            if (properties.length > 0) {
                resultsToLocalize.push({
                    uniqueIdentifier: result.UniqueID,
                    properties: properties
                });
            }
        });

        // Step #2: flatten and concatenate all terms ids to retrieve them as a single query using the REST endpoint.
        if (resultsToLocalize.length > 0) {

            let allTerms: string[] = [];

            // Concat all term ids from all results to make a single query
            resultsToLocalize.map((result) => { 
                result.properties.map((p) => {
                    allTerms = allTerms.concat(p.termIds);
                });
            });

            // Remove duplicates
            allTerms = _.uniq<string>(allTerms);

            // Get the terms from taxonomy
            // If a term doesn't exist anymore, it won't be retrieved by the API so the termValues count could be less than termsToLocalize count
            const termValues = await this.props.taxonomyService.getTermsById(allTerms);

            resultsToLocalize.map((resultToLocalize) => {

                let updatedProperties: ILocalizableSearchResultProperty[] = [];

                // Browse each proeprty of each result
                resultToLocalize.properties.map(property => {

                    let termLabels: string[] = [];

                    // Check if the term has been retrieved from taxonomy (i.e. exists)
                    const termsFromTaxonomy = termValues.filter((taxonomyTerm: ITerm & ITermData) => {
                        const termIdFromTaxonomy = taxonomyTerm.Id.substring(taxonomyTerm.Id.indexOf('(') + 1, taxonomyTerm.Id.indexOf(')'));                                        
                        return property.termIds.indexOf(termIdFromTaxonomy) !== -1;
                    });

                    if (termsFromTaxonomy.length > 0) {
                        termsFromTaxonomy.map((taxonomyTerm: ITerm & ITermData) => {
    
                            // It supposes the 'Label' property has been selected in the underlying service call
                            // A term always have a default label so the collection can't be empty
                            let localizedLabel = taxonomyTerm["Labels"]._Child_Items_.filter((label: any) => {
                                return label.Language === lcid && label.IsDefaultForLanguage;
                            });

                            // Term does not have a translation for this LCID, get the default label
                            if (localizedLabel.length === 0) {
                                localizedLabel = taxonomyTerm["Labels"]._Child_Items_;
                            }
    
                            if (localizedLabel.length > 0) {
                                // There is only one default label for a language 
                                termLabels.push(localizedLabel[0].Value);
                            }
                        });

                        updatedProperties.push({
                            propertyName: property.propertyName,
                            termLabels: termLabels
                        });
                    }                    
                });

                localizedTerms.push({
                    uniqueIdentifier: resultToLocalize.uniqueIdentifier,
                    properties: updatedProperties,
                });
            });

             // Step #3: populate corresponding properties with term labels and returns new results
             updatedResults = rawResults.map((result) => {

                const existingResults = localizedTerms.filter((e) => {
                    return e.uniqueIdentifier === result.UniqueID;
                });

                if (existingResults.length > 0) {
                    
                    existingResults[0].properties.map((res) => {
                        result[res.propertyName] = res.termLabels.join(', ');
                    });
                }

                return result;
            });

            return updatedResults;

        } else {
            return rawResults;
        }
    }

    private _getShimmerElements(): JSX.Element {
        return <div style={{ display: 'flex' }}>
                  <ShimmerElementsGroup
                    shimmerElements={[
                        { type: ElemType.line, width: 40, height: 40 },
                        { type: ElemType.gap, width: 10, height: 40 }
                    ]}
                    />
                    <ShimmerElementsGroup
                    flexWrap={true}
                    width="100%"
                    shimmerElements={[
                        { type: ElemType.line, width: '100%', height: 10 },
                        { type: ElemType.line, width: '75%', height: 10 },
                        { type: ElemType.gap, width: '25%', height: 20 }
                    ]}
                    />
                </div>;
    }

    private handleResultUpdateBroadCast(results: ISearchResults) {
        this.props.onSearchResultsUpdate(results, this.state.mountingNodeId);
    }

    /**
     * Gets a random GUID value
     *
     * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     */
    /* tslint:disable no-bitwise */
    private getGUID(): string {
        let d = new Date().getTime();
        const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }
}