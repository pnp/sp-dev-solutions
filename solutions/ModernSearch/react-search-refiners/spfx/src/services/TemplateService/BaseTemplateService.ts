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

abstract class BaseTemplateService {
    public CurrentLocale = "en";

    constructor() {
        // Registers all helpers
        this.registerTemplateServices();
    }

    private async LoadHandlebarsHelpers() {
        if ((<any>window).searchHBHelper !== undefined) {
            // early check - seems to never hit(?)
            return;
        }
        let component = await import(
            /* webpackChunkName: 'search-handlebars-helpers' */
            'handlebars-helpers'
        );
        if ((<any>window).searchHBHelper !== undefined) {
            return;
        }
        (<any>window).searchHBHelper = component({
            handlebars: Handlebars
        });
    }

    /**
     * Gets the default Handlebars list item template used in list layout
     * @returns the template HTML markup
     */
    public static getListDefaultTemplate(): string {
        return require('./templates/layouts/list.html');
    }

    /**
     * Gets the default Handlebars list item template used in list layout
     * @returns the template HTML markup
     */
    public static getTilesDefaultTemplate(): string {
        return require('./templates/layouts/tiles.html');
    }

    /**
     * Gets the default Handlebars custom blank item template
     * @returns the template HTML markup
     */
    public static getBlankDefaultTemplate(): string {
        return require('./templates/layouts/default.html');
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
     * Registers useful helpers for search results templates
     */
    private registerTemplateServices() {

        // Return the URL of the search result item
        // Usage: <a href="{{url item}}">
        Handlebars.registerHelper("getUrl", (item: ISearchResult) => {
            if (!isEmpty(item))
                return item.ServerRedirectedURL ? item.ServerRedirectedURL : item.Path;
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

            return previewSrc;
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
                let d = (<any>window).searchHBHelper.moment(date, format, { lang: this.CurrentLocale, datejs: false });
                return d;
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
            return urlField;
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
        let result = template(templateContext);
        if (result.indexOf("-preview-item") !== -1) {
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
    public initPreviewElements(): void {
        this._initVideoPreviews();
        this._initDocumentPreviews();
    }

    public abstract getFileContent(fileUrl: string): Promise<string>;

    public abstract ensureFileResolves(fileUrl: string): Promise<void>;

    private _initDocumentPreviews() {

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
        if ((<any>window).searchVideoJS !== undefined) {
            return;
        }
        const videoJs = await import(
            /* webpackChunkName: 'videos-js' */
            './video-js'
        );
        (<any>window).searchVideoJS = videoJs.default.getVideoJs();
    }

    private _initVideoPreviews() {
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