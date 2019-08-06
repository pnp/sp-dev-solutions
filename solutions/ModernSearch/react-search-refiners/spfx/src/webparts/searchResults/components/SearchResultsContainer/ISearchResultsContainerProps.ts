import ISearchService from '../../../../services/SearchService/ISearchService';
import ITaxonomyService from '../../../../services/TaxonomyService/ITaxonomyService';
import { DisplayMode } from '@microsoft/sp-core-library';
import { TemplateService } from '../../../../services/TemplateService/TemplateService';
import ISortableFieldConfiguration from '../../../../models/ISortableFieldConfiguration';
import { ISearchResultType } from '../../../../models/ISearchResultType';
import {ICustomTemplateFieldValue} from '../../../../services/ResultService/ResultService';
import SearchResultsOperationCallback from '../../../../models/SearchResultsOperationCallback';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

interface ISearchResultsContainerProps {

    /**
     * The web part title
     */
    webPartTitle: string;

    /**
     * The search data provider instance
     */
    searchService: ISearchService;

    /**
     * The taxonomy data provider instance
     */
    taxonomyService: ITaxonomyService;

    /**
     * The search query keywords
     */
    queryKeywords: string;

    /**
     * The managed properties used as sortable fields for the query
     */
    sortableFields: ISortableFieldConfiguration[];

    /**
     * Show the paging control
     */
    showPaging: boolean;

    /**
     * Show the result count and entered keywords
     */
    showResultsCount: boolean;

    /**
     * Show nothing if no result
     */
    showBlank: boolean;

    /** 
     * The current display mode of Web Part
     */
    displayMode: DisplayMode;

    /**
     * The template helper instance
     */
    templateService: TemplateService;

    /** 
     * The template raw content to display
     */
    templateContent: string;

    /**
     * Template parameters from Web Part property pane
     */
    templateParameters: { [key:string]: any };

    /**
     * The site server relative url for the current Site
     */
    siteServerRelativeUrl: string;

    /**
     * The web server relative url for the current Web
     */
    webServerRelativeUrl: string;

    /**
     * The name of the current ui culture
     */
    currentUICultureName: string;

    /** 
     * The configured result types 
     */
    resultTypes: ISearchResultType[];

    /**
     * The name of the CustomAction that should render this data. 
     */
    rendererId: string;

    /**
     * The data passing service for custom action renderers
     */
    useCodeRenderer: boolean;
    customTemplateFieldValues:  ICustomTemplateFieldValue[];

    /**
     * Web Parts localized strings
     */
    strings: ISearchResultsWebPartStrings;

    /**
     * Enables taxonomy terms fro filters and results metadata
     */
    enableLocalization: boolean;

    /**
     * Handler method when search results are updated
     */
    onSearchResultsUpdate: SearchResultsOperationCallback;

    /* 
     * The selected page to show for the search results
     */
    selectedPage: number;

    /**
     * The current theme variant
     */
    themeVariant: IReadonlyTheme | undefined;
}

export default ISearchResultsContainerProps;