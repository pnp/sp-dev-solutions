import BaseTemplateService from './BaseTemplateService';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import ISearchService from '../SearchService/ISearchService';
import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import { ISearchResultsWebPartProps } from '../../webparts/searchResults/ISearchResultsWebPartProps';
import { IPropertyPaneField, PropertyPaneToggle, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { IDetailsListColumnConfiguration } from './DetailsListComponent/DetailsListComponent';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as React from 'react';
import { TemplateValueFieldEditor, ITemplateValueFieldEditorProps } from '../../controls/TemplateValueFieldEditor/TemplateValueFieldEditor';
import * as strings from 'SearchResultsWebPartStrings';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { ISliderOptions } from './SliderComponent/SliderComponent';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { WebPartContext, PropertyPaneChoiceGroup } from '@microsoft/sp-webpart-base';

const PEOPLE_RESULT_SOURCEID = 'b09a7990-05ea-4af9-81ef-edfab16c4e31';

export interface IComponentFieldsConfiguration {

    /**
     * The name of the field
     */
    name: string;

    /**
     * The field name for the inner component props
     */
    field: string;

    /**
     * The value of the field
     */
    value: string;

    /**
     * Indicates if the calue is an Handlebars expression
     */
    useHandlebarsExpr: boolean;

    /**
     * Indicates if the field supports HTML markup injection
     */
    supportHtml: boolean;
}

export class TemplateService extends BaseTemplateService {

    private _spHttpClient: SPHttpClient;
    private _searchService: ISearchService;

    /**
     * The list of available managed managed properties (managed globally for all proeprty pane fiels if needed)
     */
    private _availableManagedProperties: IComboBoxOption[];

    constructor(spHttpClient: SPHttpClient, locale: string, searchService: ISearchService, timeZoneBias?: any, ctx?: WebPartContext) {

        super(ctx);

        this._searchService = searchService;
        this._spHttpClient = spHttpClient;
        this.CurrentLocale = locale;
        this.TimeZoneBias = timeZoneBias;
    }

    /**
     * Gets the external file content from the specified URL
     * @param fileUrl the file URL
     */
    public async getFileContent(fileUrl: string): Promise<string> {

        try {
            const response: SPHttpClientResponse = await this._spHttpClient.get(fileUrl, SPHttpClient.configurations.v1);
            if (response.ok) {
                return await response.text();
            }
            else {
                throw response.statusText;
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * Ensures the file is accessible trough the specified URL
     * @param filePath the file URL
     */
    public async ensureFileResolves(fileUrl: string): Promise<void> {

        try {
            const response: SPHttpClientResponse = await this._spHttpClient.get(fileUrl, SPHttpClient.configurations.v1);
            if (response.ok) {

                if (response.url.indexOf('AccessDenied.aspx') > -1) {
                    throw 'Access Denied';
                }

                return;
            }
            else {
                throw response.statusText;
            }

        } catch (error) {
            throw error;
        }
    }

    /**
     * Gets template parameters
     * @param layout the selected layout
     * @param properties the Web Part properties
     * @param onUpdateAvailableProperties callback when the list of managed properties is fetched by the control (Optional)
     * @param availableProperties the list of available managed properties already fetched once (Optional)
     */
    public getTemplateParameters(layout: ResultsLayoutOption, properties: ISearchResultsWebPartProps, onUpdateAvailableProperties?: (properties: IComboBoxOption[]) => void, availableProperties?: IComboBoxOption[]): IPropertyPaneField<any>[] {

        // Get available properties coming from other property pane controls if there are
        this._availableManagedProperties = availableProperties;

        switch (layout) {

            case ResultsLayoutOption.DetailsList:
                return this._getDetailsListFields(properties, onUpdateAvailableProperties);
                
            case ResultsLayoutOption.Tiles:
                return this._getTileLayoutFields(properties, onUpdateAvailableProperties);
               
            case ResultsLayoutOption.Slider:
                return this._getSliderLayoutFields(properties);

            case ResultsLayoutOption.People:
                return this._getPeopleLayoutFields(properties, onUpdateAvailableProperties);
                
            default:
                return [];
        }
    }

    private _getDetailsListFields(properties: ISearchResultsWebPartProps, onUpdateAvailableProperties?: (properties: IComboBoxOption[]) => void): IPropertyPaneField<any>[] {

        // Setup default values
        if (!properties.templateParameters.detailsListColumns) {
            properties.templateParameters.detailsListColumns = [
                {
                    name: 'Title',
                    value: 'Title',
                    useHandlebarsExpr: false,
                    minWidth: '80',
                    maxWidth: '300',
                    enableSorting: true,
                    isMultiline: false,
                    isResizable: true,
                    isResultItemLink: true                        
                },
                {
                    name: 'Created',
                    value: "{{getDate Created 'LL'}}",
                    useHandlebarsExpr: true,
                    minWidth: '80',
                    maxWidth: '120',
                    enableSorting: false,
                    isMultiline: false,
                    isResizable: false,
                    isResultItemLink: false                        
                },
                {
                    name: 'Summary',
                    value: "{{getSummary HitHighlightedSummary}}",
                    useHandlebarsExpr: true,
                    minWidth: '80',
                    maxWidth: '300',
                    enableSorting: false,
                    isMultiline: true,
                    isResizable: false,
                    isResultItemLink: false                        
                }
            ] as IDetailsListColumnConfiguration[];
        }

        if (properties.templateParameters.showFileIcon === undefined || properties.templateParameters.showFileIcon === null) {
            properties.templateParameters.showFileIcon = true;
        }

        if (properties.resultSourceId === PEOPLE_RESULT_SOURCEID) {
            properties.resultSourceId = null;
        }

        // Set required selected properties if not present
        let requiredProperties = ['Title','Created','HitHighlightedSummary','IsContainer','IsListItem','HtmlFileType'];
        this._ensureRequiredSelectedProperties(requiredProperties, properties);

        return [

            PropertyFieldCollectionData('templateParameters.detailsListColumns', {
                manageBtnLabel: strings.TemplateParameters.ManageDetailsListColumnLabel,
                key: 'templateParameters.detailsListColumns',
                panelHeader: strings.TemplateParameters.ManageDetailsListColumnLabel,
                panelDescription: strings.TemplateParameters.ManageDetailsListColumnDescription,
                enableSorting: true,
                label: strings.TemplateParameters.ManageDetailsListColumnLabel,
                value: properties.templateParameters.detailsListColumns,
                fields: [
                    {
                        id: 'name',
                        title: strings.TemplateParameters.DisplayNameColumnLabel,
                        type: CustomCollectionFieldType.string,
                        required: true,                               
                    },
                    {
                        id: 'value',
                        title:strings.TemplateParameters.ValueColumnLabel,
                        type: CustomCollectionFieldType.custom,
                        required: true,
                        onCustomRender: (field, value, onUpdate, item, itemId, onCustomFieldValidation) => {
                            return React.createElement("div", { key: `${field.id}-${itemId}` }, 
                                React.createElement(TemplateValueFieldEditor, {
                                    currentItem: item,
                                    field: field,
                                    useHandlebarsExpr: item.useHandlebarsExpr,
                                    onUpdate: onUpdate,
                                    value: value,
                                    onUpdateAvailableProperties: (options: IComboBoxOption[]) => {

                                        // Keep the list state for all collection data rows
                                        this._availableManagedProperties = cloneDeep(options);

                                        // Share the list for other controls in the property pane (not only the collection data control)
                                        onUpdateAvailableProperties(options);
                                    },
                                    availableProperties: this._availableManagedProperties ? this._availableManagedProperties : [],
                                    searchService: this._searchService,
                                    validateSortable: false,
                                    onCustomFieldValidation: onCustomFieldValidation
                                } as ITemplateValueFieldEditorProps)
                            );
                        }
                    },
                    {
                        id: 'useHandlebarsExpr',
                        type: CustomCollectionFieldType.boolean,
                        defaultValue: false,
                        title: strings.TemplateParameters.UseHandlebarsExpressionLabel
                    },
                    {
                        id: 'minWidth',
                        title: strings.TemplateParameters.MinimumWidthColumnLabel,
                        type: CustomCollectionFieldType.number,
                        required: false,
                        defaultValue: 50
                    },
                    {
                        id: 'maxWidth',
                        title: strings.TemplateParameters.MaximumWidthColumnLabel,
                        type: CustomCollectionFieldType.number,
                        required: false,
                        defaultValue: 310
                    },
                    {
                        id: 'enableSorting',
                        title: strings.TemplateParameters.SortableColumnLabel,
                        type: CustomCollectionFieldType.boolean,
                        defaultValue: false,
                        required: false                                
                    },
                    {
                        id: 'isResizable',
                        title: strings.TemplateParameters.ResizableColumnLabel,
                        type: CustomCollectionFieldType.boolean,
                        defaultValue: false,
                        required: false                                
                    },
                    {
                        id: 'isMultiline',
                        title: strings.TemplateParameters.MultilineColumnLabel,
                        type: CustomCollectionFieldType.boolean,
                        defaultValue: false,
                        required: false          
                    },
                    {
                        id: 'isResultItemLink',
                        title: strings.TemplateParameters.LinkToItemColumnLabel,
                        type: CustomCollectionFieldType.boolean,
                        defaultValue: false,
                        required: false          
                    },                                                        
                ]
            }),
            PropertyPaneToggle('templateParameters.showFileIcon', {
                label: strings.TemplateParameters.ShowFileIcon,                        
                checked: properties.templateParameters.showFileIcon
            }),
            PropertyPaneToggle('templateParameters.isCompact', {
                label: strings.TemplateParameters.CompactModeLabel,                        
                checked: properties.templateParameters.isCompact  !== null || properties.templateParameters.isCompact !== undefined ? properties.templateParameters.isCompact : true
            })                            
        ];
    }

    private _getTileLayoutFields(properties: ISearchResultsWebPartProps, onUpdateAvailableProperties?: (properties: IComboBoxOption[]) => void): IPropertyPaneField<any>[] {

        // Setup default values
        if (!properties.templateParameters.documentCardFields) {

            properties.templateParameters.documentCardFields = [
                { name: 'Title', field: 'title', value: "Title", useHandlebarsExpr: false, supportHtml: false },
                { name: 'Location', field: 'location', value: `<a style="color:{{@themeVariant.palette.themePrimary}}" href="{{SPSiteUrl}}">{{SiteTitle}}</a>`, useHandlebarsExpr: true, supportHtml: true },
                { name: 'Tags', field: 'tags', value: `{{#if owstaxidmetadataalltagsinfo}}<i class='ms-Icon ms-Icon--Tag' aria-hidden='true'></i> {{#each (split owstaxidmetadataalltagsinfo ',') as |tag| }}<a class="ms-Link" href="#owstaxidmetadataalltagsinfo:'{{trim tag}}'">{{tag}}</a>{{/each}}{{/if}}`, useHandlebarsExpr: true, supportHtml: true },
                { name: 'Preview Image', field: 'previewImage',  value: "{{{getPreviewSrc item}}}", useHandlebarsExpr: true, supportHtml: false },
                { name: 'Preview URL', field: 'previewUrl' , value: "{{#eq contentclass 'STS_ListItem_851'}}{{{DefaultEncodingURL}}}{{else}}{{#eq FileType 'pdf'}}<!-- Documents from OneDrive sites can't be viewed directly due to SAMEORIGIN iframe restrictions-->{{#contains Path '-my.sharepoint'}}{{{ServerRedirectedEmbedURL}}}{{else}}{{{Path}}}{{/contains}}{{else}}{{{ServerRedirectedEmbedURL}}}{{/eq}}{{/eq}} ", useHandlebarsExpr: true, supportHtml: false },
                { name: 'Date', field: 'date', value: "{{getDate item.Created 'LL'}}", useHandlebarsExpr: true, supportHtml: false },
                { name: 'URL', field: 'href', value: "{{getUrl item}}", useHandlebarsExpr: true, supportHtml: false },
                { name: 'Author', field: 'author', value: "Author", useHandlebarsExpr: false, supportHtml: false },
                { name: 'Profile Image', field: 'profileImage', value: "{{#with (split AuthorOWSUSER '|')}}/_layouts/15/userphoto.aspx?size=L&username={{[0]}}{{/with}}", useHandlebarsExpr: true, supportHtml: false  },
                { name: 'IconSrc', field: 'iconSrc', value: "{{IconSrc}}", useHandlebarsExpr: true, supportHtml: false },
                { name: 'IconExt', field: 'iconExt', value: "{{IconExt}}", useHandlebarsExpr: true, supportHtml: false },
                { name: 'File Extension', field: 'fileExtension', value: "FileType", useHandlebarsExpr: false, supportHtml: false }
            ] as IComponentFieldsConfiguration[];
        }

        // Set required selected properties if not present
        let requiredProperties = ['SPSiteUrl','SiteTitle','owstaxidmetadataalltagsinfo','contentclass','Created','AuthorOWSUSER','Author','FileType','ServerRedirectedEmbedURL','DefaultEncodingURL','Path','IsContainer','IsListItem','HtmlFileType'];
        this._ensureRequiredSelectedProperties(requiredProperties, properties);

        if (properties.resultSourceId === PEOPLE_RESULT_SOURCEID) {
            properties.resultSourceId = null;
        }

        return [
            
            // Careful, the property names should match the React components props. These will be injected in the Handlebars template context and passed as web component attributes
            PropertyFieldCollectionData('templateParameters.documentCardFields', {
                manageBtnLabel: strings.TemplateParameters.ManageTilesFieldsLabel,
                key: 'templateParameters.documentCardFields',
                panelHeader: strings.TemplateParameters.ManageTilesFieldsLabel,
                panelDescription: strings.TemplateParameters.ManageTilesFieldsPanelDescriptionLabel,
                enableSorting: false,
                disableItemCreation: true,
                disableItemDeletion: true,
                label: strings.TemplateParameters.ManageTilesFieldsLabel,
                value: properties.templateParameters.documentCardFields,
                fields: [
                    {
                        id: 'name',
                        type: CustomCollectionFieldType.string,
                        disableEdit: true,
                        title: strings.TemplateParameters.PlaceholderNameFieldLabel
                    },
                    {
                        id: 'supportHtml',
                        type: CustomCollectionFieldType.custom,
                        disableEdit: true,
                        title: strings.TemplateParameters.SupportHTMLColumnLabel,
                        onCustomRender: (field, value, onUpdate, item, itemId, onCustomFieldValidation) => {
                            if (item.supportHtml) {
                                return React.createElement(Icon, { iconName: 'CheckMark' } as IIconProps);
                            }
                        }
                    },
                    {
                        id: 'value',
                        type: CustomCollectionFieldType.custom,
                        title: strings.TemplateParameters.PlaceholderValueFieldLabel,
                        onCustomRender: (field, value, onUpdate, item, itemId, onCustomFieldValidation) => {
                            return React.createElement("div", { key: `${field.id}-${itemId}` }, 
                                React.createElement(TemplateValueFieldEditor, {
                                    currentItem: item,
                                    field: field,
                                    useHandlebarsExpr: item.useHandlebarsExpr,
                                    onUpdate: onUpdate,
                                    value: value,
                                    onUpdateAvailableProperties: (options: IComboBoxOption[]) => {

                                        // Keep the list state for all collection data rows
                                        this._availableManagedProperties = cloneDeep(options);

                                        // Share the list for other controls in the property pane
                                        onUpdateAvailableProperties(options);
                                    },
                                    availableProperties: this._availableManagedProperties ? this._availableManagedProperties : [],
                                    searchService: this._searchService,
                                    validateSortable: false,
                                    onCustomFieldValidation: onCustomFieldValidation
                                } as ITemplateValueFieldEditorProps)
                            );
                        }
                    },
                    {
                        id: 'useHandlebarsExpr',
                        type: CustomCollectionFieldType.boolean,
                        title: strings.TemplateParameters.UseHandlebarsExpressionLabel
                    }
                ]
            }),
            PropertyPaneToggle('templateParameters.enablePreview', {
                label: strings.TemplateParameters.EnableItemPreview,                        
                checked: properties.templateParameters.enablePreview  !== null || properties.templateParameters.enablePreview !== undefined ? properties.templateParameters.enablePreview : true
            }),
            PropertyPaneToggle('templateParameters.showFileIcon', {
                label: strings.TemplateParameters.ShowFileIcon,                        
                checked: properties.templateParameters.showFileIcon  !== null || properties.templateParameters.showFileIcon !== undefined ? properties.templateParameters.showFileIcon : true
            }),
            PropertyPaneToggle('templateParameters.isCompact', {
                label: strings.TemplateParameters.CompactModeLabel,               
                checked: properties.templateParameters.isCompact  !== null || properties.templateParameters.isCompact !== undefined ? properties.templateParameters.isCompact : true
            })                    
        ];
    }

    private _getSliderLayoutFields(properties: ISearchResultsWebPartProps): IPropertyPaneField<any>[] {
                
        if (!properties.templateParameters.sliderOptions) {
            properties.templateParameters.sliderOptions = {
                autoPlay: true,
                autoPlayDuration: 4000,
                pauseAutoPlayOnHover: true,
                numberOfSlides: 3,
                showPageDots: true
            } as ISliderOptions;
        }

        if (properties.resultSourceId === PEOPLE_RESULT_SOURCEID) {
            properties.resultSourceId = null;
        }

        // Set required selected properties if not present (by default we use the document card component)
        let requiredProperties = ['SPSiteUrl','SiteTitle','owstaxidmetadataalltagsinfo','contentclass','Created','AuthorOWSUSER','Author','FileType','ServerRedirectedEmbedURL','DefaultEncodingURL','Path','IsContainer','IsListItem','HtmlFileType'];
        this._ensureRequiredSelectedProperties(requiredProperties, properties);

        let groupFields: IPropertyPaneField<any>[] = [
            PropertyPaneToggle('templateParameters.sliderOptions.autoPlay', {
                label: strings.TemplateParameters.SliderAutoPlay,                
                checked: properties.templateParameters.sliderOptions.autoPlay !== null || properties.templateParameters.sliderOptions.autoPlay !== undefined ? properties.templateParameters.sliderOptions.autoPlay : true
            })
        ];

        if (properties.templateParameters.sliderOptions.autoPlay) {

            const autoPlayFields = [
                PropertyPaneSlider('templateParameters.sliderOptions.autoPlayDuration', {
                    label: strings.TemplateParameters.SliderAutoPlayDuration, 
                    min: 1,
                    max: 60,
                    showValue: true,
                    step: 1            
                }),
                PropertyPaneToggle('templateParameters.sliderOptions.pauseAutoPlayOnHover', {
                    label: strings.TemplateParameters.SliderPauseAutoPlayOnHover,              
                    checked: properties.templateParameters.sliderOptions.pauseAutoPlayOnHover !== null || properties.templateParameters.sliderOptions.pauseAutoPlayOnHover !== undefined ? properties.templateParameters.sliderOptions.pauseAutoPlayOnHover : true
                })
            ];

            groupFields = groupFields.concat(autoPlayFields);
        }

        groupFields = groupFields.concat([
            PropertyPaneSlider('templateParameters.sliderOptions.numberOfSlides', {
                label: strings.TemplateParameters.SliderGroupCells,  
                min: 1,
                max: 5,
                showValue: true,
                step: 1            
            }),
            PropertyPaneToggle('templateParameters.sliderOptions.showPageDots', {
                label: strings.TemplateParameters.SliderShowPageDots,               
                checked: properties.templateParameters.sliderOptions.showPageDots !== null || properties.templateParameters.sliderOptions.showPageDots !== undefined ? properties.templateParameters.sliderOptions.showPageDots : true
            }),
            PropertyPaneToggle('templateParameters.sliderOptions.wrapAround', {
                label: strings.TemplateParameters.SliderWrapAround,               
                checked: properties.templateParameters.sliderOptions.wrapAround !== null || properties.templateParameters.sliderOptions.wrapAround !== undefined ? properties.templateParameters.sliderOptions.wrapAround : true
            })
        ]);

        return groupFields;
    }

    private _getPeopleLayoutFields(properties: ISearchResultsWebPartProps, onUpdateAvailableProperties?: (properties: IComboBoxOption[]) => void): IPropertyPaneField<any>[] {
        
        // Setup default values
        if (!properties.templateParameters.peopleFields) {

            properties.templateParameters.peopleFields = [
                { name: 'Image Url', field: 'imageUrl', value: "{{#with (split AccountName '|')}}/_layouts/15/userphoto.aspx?size=L&username={{[2]}}{{/with}}", useHandlebarsExpr: true, supportHtml: false },
                { name: 'Primary Text', field: 'text', value: "{{FirstName}} {{LastName}}", useHandlebarsExpr: true, supportHtml: false },
                { name: 'Secondary Text', field: 'secondaryText', value: "JobTitle", useHandlebarsExpr: false, supportHtml: false },
                { name: 'Tertiary Text', field: 'tertiaryText',  value: "{{#with (split AccountName '|')}}{{[2]}}{{/with}}", useHandlebarsExpr: true, supportHtml: false },
                { name: 'Optional Text', field: 'optionalText' , value: "WorkPhone", useHandlebarsExpr: false, supportHtml: false },
            ] as IComponentFieldsConfiguration[];
        }

        // Set required selected properties if not present
        let requiredProperties = ['AccountName','FirstName','LastName','Department','JobTitle','WorkPhone'];
        this._ensureRequiredSelectedProperties(requiredProperties, properties);

        // Set people result source id by default
        if (!properties.resultSourceId) {
            properties.resultSourceId = PEOPLE_RESULT_SOURCEID; // Local People results
            properties.queryTemplate = '{searchTerms}';
        }

        if (!properties.templateParameters.personaSize) {
            properties.templateParameters.personaSize = 14;
        }

        return [
            
            // Careful, the property names should match the React components props. These will be injected in the Handlebars template context and passed as web component attributes
            PropertyFieldCollectionData('templateParameters.peopleFields', {
                manageBtnLabel: strings.TemplateParameters.ManagePeopleFieldsLabel,
                key: 'templateParameters.peopleFields',
                panelHeader: strings.TemplateParameters.ManagePeopleFieldsLabel,
                panelDescription: strings.TemplateParameters.ManagePeopleFieldsPanelDescriptionLabel,
                enableSorting: false,
                disableItemCreation: true,
                disableItemDeletion: true,
                label: strings.TemplateParameters.ManagePeopleFieldsLabel,
                value: properties.templateParameters.peopleFields,
                fields: [
                    {
                        id: 'name',
                        type: CustomCollectionFieldType.string,
                        disableEdit: true,
                        title: strings.TemplateParameters.PlaceholderNameFieldLabel
                    },
                    {
                        id: 'value',
                        type: CustomCollectionFieldType.custom,
                        title: strings.TemplateParameters.PlaceholderValueFieldLabel,
                        onCustomRender: (field, value, onUpdate, item, itemId, onCustomFieldValidation) => {
                            return React.createElement("div", { key: `${field.id}-${itemId}` }, 
                                React.createElement(TemplateValueFieldEditor, {
                                    currentItem: item,
                                    field: field,
                                    useHandlebarsExpr: item.useHandlebarsExpr,
                                    onUpdate: onUpdate,
                                    value: value,
                                    onUpdateAvailableProperties: (options: IComboBoxOption[]) => {

                                        // Keep the list state for all collection data rows
                                        this._availableManagedProperties = cloneDeep(options);

                                        // Share the list for other controls in the property pane
                                        onUpdateAvailableProperties(options);
                                    },
                                    availableProperties: this._availableManagedProperties ? this._availableManagedProperties : [],
                                    searchService: this._searchService,
                                    validateSortable: false,
                                    onCustomFieldValidation: onCustomFieldValidation
                                } as ITemplateValueFieldEditorProps)
                            );
                        }
                    },
                    {
                        id: 'useHandlebarsExpr',
                        type: CustomCollectionFieldType.boolean,
                        title: strings.TemplateParameters.UseHandlebarsExpressionLabel
                    }
                ]
            }),
            PropertyPaneChoiceGroup('templateParameters.personaSize', {
                label: strings.TemplateParameters.PersonaSizeOptionsLabel,
                options: [
                    {
                        key: 11,
                        text: strings.TemplateParameters.PersonaSizeExtraSmall
                    },
                    {
                        key: 12,
                        text: strings.TemplateParameters.PersonaSizeSmall
                    },
                    {
                        key: 13,
                        text: strings.TemplateParameters.PersonaSizeRegular
                    },
                    {
                        key: 14,
                        text: strings.TemplateParameters.PersonaSizeLarge
                    },
                    {
                        key: 15,
                        text: strings.TemplateParameters.PersonaSizeExtraLarge
                    }
                ]
            }),   
            PropertyPaneToggle('templateParameters.disableHover', {
                label: strings.TemplateParameters.LivePersonaDisableHover,               
                checked: properties.templateParameters.disableHover !== null || properties.templateParameters.disableHover !== undefined ? properties.templateParameters.disableHover : false
            })          
        ];
    }

    private _ensureRequiredSelectedProperties(requiredProperties: string[], wpProperties: ISearchResultsWebPartProps): void {

        let selectedProperties = wpProperties.selectedProperties.split(',');
        requiredProperties.map(property => {
            if (wpProperties.selectedProperties.indexOf(property) === -1) {
                selectedProperties.push(property);
                wpProperties.selectedProperties = selectedProperties.join(',');
            }
        });       
    }
}