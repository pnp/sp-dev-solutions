import 'core-js/modules/es7.array.includes.js';
import 'core-js/modules/es6.string.includes.js';
import 'core-js/modules/es6.number.is-nan.js';
import * as Handlebars from 'handlebars';
import { ISearchResult } from '../../models/ISearchResult';
import { isEmpty, uniqBy, uniq } from '@microsoft/sp-lodash-subset';
import * as strings from 'SearchResultsWebPartStrings';
import { Text } from '@microsoft/sp-core-library';
import { DomHelper } from '../../helpers/DomHelper';
import { ISearchResultType, ResultTypeOperator } from '../../models/ISearchResultType';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import PreviewContainer from './PreviewContainer/PreviewContainer';
import { IPreviewContainerProps, PreviewType } from './PreviewContainer/IPreviewContainerProps';
import { DocumentCardWebComponent } from './components/DocumentCard';
import { DetailsListWebComponent } from './components/DetailsList';
import { VideoCardWebComponent } from './components/VideoCard';
import { DocumentCardShimmersWebComponent } from './components/shimmers/DocumentCardShimmers';
import '@webcomponents/custom-elements';
import { IPropertyPaneField } from '@microsoft/sp-property-pane';
import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import { ISearchResultsWebPartProps } from '../../webparts/searchResults/ISearchResultsWebPartProps';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';

abstract class BaseTemplateService {

    public CurrentLocale = "en";

    constructor() {

        // Registers all helpers
        this.registerTemplateServices();

        // Register web components
        this.registerWebComponents();        
    }

    private async LoadHandlebarsHelpers() {
        if ((window as any).searchHBHelper !== undefined) {
            // early check - seems to never hit(?)
            return;
        }
        let component = await import(
            /* webpackChunkName: 'search-handlebars-helpers' */
            'handlebars-helpers'
        );
        if ((window as any).searchHBHelper !== undefined) {
            return;
        }
        (window as any).searchHBHelper = component({
            handlebars: Handlebars
        });
    }

    /**
     * Gets template parameters according to the specified layout
     * @param layout the selected layout
     * @param properties the Web Part properties
     * @param onUpdateAvailableProperties callback when the list of managed properties is fetched by the control (Optional)
     * @param availableProperties the list of available managed properties already fetched once (Optional)
     */
    public getTemplateParameters(layout: ResultsLayoutOption, properties: ISearchResultsWebPartProps, onUpdateAvailableProperties?: (properties: IComboBoxOption[]) => void, availableProperties?: IComboBoxOption[]): IPropertyPaneField<any>[] {
        return [];
    }

    /**
     * Gets the default Handlebars template content used for a specific layout
     * @returns the template HTML markup
     */
    public static getTemplateContent(layout: ResultsLayoutOption): string {

        switch (layout) {

            case ResultsLayoutOption.DetailsList:
                return require('./templates/layouts/list.html');

            case ResultsLayoutOption.Tiles:
                return require('./templates/layouts/tiles.html');

            case ResultsLayoutOption.Custom:
                return require('./templates/layouts/default.html');

            default:
                return null;
        }
    }

    /**
     * Gets the default Handlebars result type list item
     * @returns the template HTML markup
     */
    public static getDefaultResultTypeListItem(): string {
        return require('./templates/resultTypes/default_list.html');
    }

    /**
     * Gets the default Handlebars result type tile item
     * @returns the template HTML markup
     */
    public static getDefaultResultTypeTileItem(): string {
       return require('./templates/resultTypes/default_tile.html');
    }

    /**
     * Gets the default Handlebars result type custom item
     * @returns the template HTML markup
     */
    public static getDefaultResultTypeCustomItem(): string {
        return require('./templates/resultTypes/default_custom.html');
    }

    /**
     * Gets the template HTML markup in the full template content
     * @param templateContent the full template content
     */
    public static getTemplateMarkup(templateContent: string): string {

        const domParser = new DOMParser();
        const htmlContent: Document = domParser.parseFromString(templateContent, 'text/html');
    
        let templates: any = htmlContent.getElementById('template');
        if (templates && templates.innerHTML) {
          
            // Need to unescape '&gt;' for handlebars partials 
            return templates.innerHTML.replace('&gt;', '>');
        } else {
            return templateContent;
        }
    }

    /**
     * Gets the placeholder HTML markup in the full template content
     * @param templateContent the full template content
     */
    public static getPlaceholderMarkup(templateContent: string): string {
        const domParser = new DOMParser();
        const htmlContent: Document = domParser.parseFromString(templateContent, 'text/html');
    
        const placeHolders = htmlContent.getElementById('placeholder');
        if (placeHolders && placeHolders.innerHTML) {
          return placeHolders.innerHTML;
        } else {
            return null;
        }
    }

    /**
     * Registers useful helpers for search results templates
     */
    private registerTemplateServices() {

        // Return the URL of the search result item
        // Usage: <a href="{{url item}}">
        Handlebars.registerHelper("getUrl", (item: ISearchResult) => {
            if (!isEmpty(item))
                return new Handlebars.SafeString(item.ServerRedirectedURL ? item.ServerRedirectedURL : item.Path);
        });

        // Return the search result count message
        // Usage: {{getCountMessage totalRows keywords}} or {{getCountMessage totalRows null}}
        Handlebars.registerHelper("getCountMessage", (totalRows: string, inputQuery?: string) => {

            const countResultMessage = inputQuery ? Text.format(strings.CountMessageLong, totalRows, inputQuery) : Text.format(strings.CountMessageShort, totalRows);
            return new Handlebars.SafeString(countResultMessage);
        });

        // Return the preview image URL for the search result item
        // Usage: <img src="{{previewSrc item}}""/>
        Handlebars.registerHelper("getPreviewSrc", (item: ISearchResult) => {

            let previewSrc = "";

            if (item) {
                if (!isEmpty(item.SiteLogo)) previewSrc = item.SiteLogo;
                else if (!isEmpty(item.PreviewUrl)) previewSrc = item.PreviewUrl;
                else if (!isEmpty(item.PictureThumbnailURL)) previewSrc = item.PictureThumbnailURL;
                else if (!isEmpty(item.ServerRedirectedPreviewURL)) previewSrc = item.ServerRedirectedPreviewURL;
            }

            return new Handlebars.SafeString(previewSrc);
        });

        // Return the highlighted summary of the search result item
        // <p>{{summary HitHighlightedSummary}}</p>
        Handlebars.registerHelper("getSummary", (hitHighlightedSummary: string) => {
            if (!isEmpty(hitHighlightedSummary)) {
                return new Handlebars.SafeString(hitHighlightedSummary.replace(/<c0\>/g, "<strong>").replace(/<\/c0\>/g, "</strong>").replace(/<ddd\/>/g, "&#8230;"));
            }
        });

        // Return the formatted date according to current locale using moment.js
        // <p>{{getDate Created "LL"}}</p>
        Handlebars.registerHelper("getDate", (date: string, format: string) => {
            try {
                if (new Date(date).toISOString() !== new Date(null).toISOString()) {
                    let d = (window as any).searchHBHelper.moment(date, format, { lang: this.CurrentLocale, datejs: false });
                    return d;
                }
            } catch (error) {
                return date;
            }
        });

        // Return the URL or Title part of a URL automatic managed property
        // <p>{{getUrlField MyLinkOWSURLH "Title"}}</p>
        Handlebars.registerHelper("getUrlField", (urlField: string, value: "URL" | "Title") => {
            if (!isEmpty(urlField)) {
                let separatorPos = urlField.indexOf(",");
                if (separatorPos === -1) {
                    return urlField;
                }
                if (value === "URL") {
                    return urlField.substr(0, separatorPos);
                }
                return urlField.substr(separatorPos + 1).trim();
            }
            return new Handlebars.SafeString(urlField);
        });

        // Return the unique count based on an array or property of an object in the array
        // <p>{{getUniqueCount items "Title"}}</p>
        Handlebars.registerHelper("getUniqueCount", (array: any[], property: string) => {
            if (!Array.isArray(array)) return 0;
            if (array.length === 0) return 0;

            let result;
            if (property) {
                result = uniqBy(array, property);

            }
            else {
                result = uniq(array);
            }
            return result.length;
        });

        // Repeat the block N times
        // https://stackoverflow.com/questions/11924452/iterating-over-basic-for-loop-using-handlebars-js
        // <p>{{#times 10}}</p>
        Handlebars.registerHelper('times', (n, block) => {
            var accum = '';
            for(var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        });

        // Stringify an object
        // <p>{{#stringify myObj}}</p>
        Handlebars.registerHelper('stringify', (obj) => {
            return JSON.stringify(obj);
        });
    }

    /**
     * Registers web components on the current page to be able to use them in the Handlebars template
     */
    private registerWebComponents() {

        const webComponents = [
            {
                name: 'document-card',
                class: DocumentCardWebComponent
            },
            {
                name: 'document-card-shimmers',
                class: DocumentCardShimmersWebComponent
            },
            {
                name: 'details-list',
                class: DetailsListWebComponent

            },
            {
                name: 'video-card',
                class: VideoCardWebComponent
            }
        ];

        // Registers custom HTML elements
        webComponents.map(wc => {
            if (!customElements.get(wc.name)) {
                customElements.define(wc.name,wc.class);
            }
        });
    }

    /**
     * Compile the specified Handlebars template with the associated context object¸
     * @returns the compiled HTML template string 
     */
    public async processTemplate(templateContext: any, templateContent: string): Promise<string> {
    
        // Process the Handlebars template
        const handlebarFunctionNames = [
            "getDate",
            "after",
            "arrayify",
            "before",
            "eachIndex",
            "filter",
            "first",
            "forEach",
            "inArray",
            "isArray",
            "itemAt",
            "join",
            "last",
            "lengthEqual",
            "map",
            "some",
            "sort",
            "sortBy",
            "withAfter",
            "withBefore",
            "withFirst",
            "withGroup",
            "withLast",
            "withSort",
            "embed",
            "gist",
            "jsfiddle",
            "isEmpty",
            "iterate",
            "length",
            "and",
            "compare",
            "contains",
            "gt",
            "gte",
            "has",
            "eq",
            "ifEven",
            "ifNth",
            "ifOdd",
            "is",
            "isnt",
            "lt",
            "lte",
            "neither",
            "or",
            "unlessEq",
            "unlessGt",
            "unlessLt",
            "unlessGteq",
            "unlessLteq",
            "moment",
            "fileSize",
            "read",
            "readdir",
            "css",
            "ellipsis",
            "js",
            "sanitize",
            "truncate",
            "ul",
            "ol",
            "thumbnailImage",
            "i18n",
            "inflect",
            "ordinalize",
            "info",
            "bold",
            "warn",
            "error",
            "debug",
            "_inspect",
            "markdown",
            "md",
            "mm",
            "match",
            "isMatch",
            "add",
            "subtract",
            "divide",
            "multiply",
            "floor",
            "ceil",
            "round",
            "sum",
            "avg",
            "default",
            "option",
            "noop",
            "withHash",
            "addCommas",
            "phoneNumber",
            "random",
            "toAbbr",
            "toExponential",
            "toFixed",
            "toFloat",
            "toInt",
            "toPrecision",
            "extend",
            "forIn",
            "forOwn",
            "toPath",
            "get",
            "getObject",
            "hasOwn",
            "isObject",
            "merge",
            "JSONparse",
            "parseJSON",
            "pick",
            "JSONstringify",
            "stringify",
            "absolute",
            "dirname",
            "relative",
            "basename",
            "stem",
            "extname",
            "segments",
            "camelcase",
            "capitalize",
            "capitalizeAll",
            "center",
            "chop",
            "dashcase",
            "dotcase",
            "hyphenate",
            "isString",
            "lowercase",
            "occurrences",
            "pascalcase",
            "pathcase",
            "plusify",
            "reverse",
            "replace",
            "sentence",
            "snakecase",
            "split",
            "startsWith",
            "titleize",
            "trim",
            "uppercase",
            "encodeURI",
            "decodeURI",
            "urlResolve",
            "urlParse",
            "stripQuerystring",
            "stripProtocol"
        ];

        for (let i = 0; i < handlebarFunctionNames.length; i++) {
            const element = handlebarFunctionNames[i];

            let regEx = new RegExp("{{#.*?" + element + ".*?}}", "m");
            if (regEx.test(templateContent)) {
                await this.LoadHandlebarsHelpers();
                break;
            }
        }

        let template = Handlebars.compile(templateContent);
        let result = template(templateContext)
        if (result.indexOf("video-preview-item") || result.indexOf("video-card") !== -1) {
            await this._loadVideoLibrary();
        }

        return result;
    }

    /**
     * Builds and registers the result types as Handlebars partials 
     * Based on https://github.com/helpers/handlebars-helpers/ operators
     * @param resultTypes the configured result types from the property pane
     */
    public async registerResultTypes(resultTypes: ISearchResultType[]): Promise<void> {

        if (resultTypes.length > 0) {
            let content = await this._buildCondition(resultTypes, resultTypes[0], 0);
            let template = Handlebars.compile(content);
            Handlebars.registerPartial('resultTypes', template);
        } else {
            Handlebars.registerPartial('resultTypes', '{{> @partial-block }}');

        }
    }

    /**
     * Builds the Handlebars nested conditions recursively to reflect the result types configuration
     * @param resultTypes the configured result types from the property pane 
     * @param currentResultType the current processed result type
     * @param currentIdx current index
     */
    private async _buildCondition(resultTypes: ISearchResultType[], currentResultType: ISearchResultType, currentIdx: number): Promise<string> {

        let conditionBlockContent;
        let templateContent = currentResultType.inlineTemplateContent;

        if (currentResultType.externalTemplateUrl) {
            templateContent = await this.getFileContent(currentResultType.externalTemplateUrl);
        }

        if (currentResultType.value) {

            let handlebarsToken = currentResultType.value.match(/^\{\{(.*)\}\}$/);

            let operator = currentResultType.operator;
            let param1 = currentResultType.property;
    
            // Use a token or a string value
            let param2 = handlebarsToken ? handlebarsToken[1] : `"${currentResultType.value}"`;
    
            // Operator: "Starts With"
            if (currentResultType.operator === ResultTypeOperator.StartsWith) {
                param1 = `"${currentResultType.value}"`;
                param2 = `${currentResultType.property}`;
            }
    
            // Operator: "Not null"
            if (currentResultType.operator === ResultTypeOperator.NotNull) {
                param2 = null;
            }
    
            const baseCondition = `{{#${operator} ${param1} ${param2 || ""}}} 
                                        ${templateContent}`;
    
            if (currentIdx === resultTypes.length - 1) {
                // Renders inner content set in the 'resultTypes' partial
                conditionBlockContent = "{{> @partial-block }}";
            } else {
                conditionBlockContent = await this._buildCondition(resultTypes, resultTypes[currentIdx + 1], currentIdx + 1);
            }
    
            return `${baseCondition}   
                    {{else}} 
                        ${conditionBlockContent}
                    {{/${operator}}}`;
        } else {
             return '';
        }
    }

    /**
     * Verifies if the template fiel path is correct
     * @param filePath the file path string
     */
    public static isValidTemplateFile(filePath: string): boolean {

        let path = filePath.toLowerCase().trim();
        let pathExtension = path.substring(path.lastIndexOf('.'));
        return (pathExtension == '.htm' || pathExtension == '.html');
    }

    /**
     * Initializes the previews on search results for documents and videos. Called when a template is updated/changed
     */
    public static initPreviewElements(): void {
        this._initVideoPreviews();
        this._initDocumentPreviews();
    }

    public abstract getFileContent(fileUrl: string): Promise<string>;

    public abstract ensureFileResolves(fileUrl: string): Promise<void>;

    private static _initDocumentPreviews() {

        const nodes = document.querySelectorAll('.document-preview-item');

        DomHelper.forEach(nodes, ((index, el) => {
            el.addEventListener("click", (event) => {
                const thumbnailElt = event.srcElement;

                // Get infos about the document to preview
                const url: string = event.srcElement.getAttribute("data-url");
                const previewImgUrl: string = event.srcElement.getAttribute("data-src");

                if (url) {
                    let renderElement = React.createElement(
                        PreviewContainer,
                        {   
                            elementUrl: url.replace('interactivepreview','embedview'),
                            targetElement: thumbnailElt,
                            previewImageUrl: previewImgUrl,
                            showPreview: true,
                            previewType: PreviewType.Document
                        } as IPreviewContainerProps  
                    );
                       
                    ReactDom.render(renderElement, el);
                }
            });
        }));
    }

    private async _loadVideoLibrary() {
        // Load Videos-Js on Demand 
        // Webpack will create a other bundle loaded on demand just for this library
        if ((window as any).searchVideoJS === undefined) {
            const videoJs = await import(
                /* webpackChunkName: 'videos-js' */
                './video-js'
            );
            (window as any).searchVideoJS = videoJs.default.getVideoJs();
        }
    }

    private static _initVideoPreviews() {
        const nodes = document.querySelectorAll('.video-preview-item');

        DomHelper.forEach(nodes, ((index, el) => {
            el.addEventListener("click", (event) => {

                const thumbnailElt = event.srcElement;

                // Get infos about the video to render
                const url = event.srcElement.getAttribute("data-url");
                const fileExtension = event.srcElement.getAttribute("data-fileext");
                const previewImgUrl: string = event.srcElement.getAttribute("data-src");

                if (url && fileExtension) {
                    let renderElement = React.createElement(
                        PreviewContainer,
                        {   
                            videoProps: {
                                fileExtension: fileExtension
                            },
                            showPreview: true,
                            targetElement: thumbnailElt,
                            previewImageUrl: previewImgUrl,
                            elementUrl: url,
                            previewType: PreviewType.Video                            
                        } as IPreviewContainerProps  
                    );
                       
                    ReactDom.render(renderElement, el);
                }               
            });
        }));
    }
}

export default BaseTemplateService;