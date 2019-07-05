import BaseTemplateService, { IDocumentCardFieldsConfiguration } from                    './BaseTemplateService';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import ISearchService from '../SearchService/ISearchService';
import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import { ISearchResultsWebPartProps } from '../../webparts/searchResults/ISearchResultsWebPartProps';
import { IPropertyPaneField, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import { IDetailsListColumnConfiguration } from './DetailsListComponent/DetailsListComponent';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import * as React from 'react';
import { TemplateValueFieldEditor, ITemplateValueFieldEditorProps } from '../../controls/TemplateValueFieldEditor/TemplateValueFieldEditor';
import * as strings from 'SearchResultsWebPartStrings';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';

class TemplateService extends BaseTemplateService {

    private _spHttpClient: SPHttpClient;
    private _searchService: ISearchService;

    constructor(spHttpClient: SPHttpClient, locale: string, searchService: ISearchService) {

        super();

        this._searchService = searchService;
        this._spHttpClient = spHttpClient;
        this.CurrentLocale = locale;
    }

    /**
     * Gets the external file content from the specified URL
     * @param fileUrl the file URL
     */
    public async getFileContent(fileUrl: string): Promise<string> {

        try {
            const response: SPHttpClientResponse = await this._spHttpClient.get(fileUrl, SPHttpClient.configurations.v1);
            if(response.ok) {
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
            if(response.ok) {

                if(response.url.indexOf('AccessDenied.aspx') > -1){
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

        switch (layout) {

            case ResultsLayoutOption.DetailsList:

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

            if (properties.templateParameters.showFileIcon !== undefined || properties.templateParameters.showFileIcon !== null) {
                properties.templateParameters.showFileIcon = true;
            }

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
                                title: "Column display name",
                                type: CustomCollectionFieldType.string,
                                required: true,                               
                            },
                            {
                                id: 'value',
                                title: "Value to do display",
                                type: CustomCollectionFieldType.custom,
                                required: true,
                                onCustomRender: (field, value, onUpdate, item, itemId, onCustomFieldValidation) => {
                                    return React.createElement("div", { key: itemId }, 
                                        React.createElement(TemplateValueFieldEditor, {
                                            currentItem: item,
                                            field: field,
                                            useHandlebarsExpr: item.useHandlebarsExpr,
                                            onUpdate: onUpdate,
                                            value: value,
                                            onUpdateAvailableProperties: onUpdateAvailableProperties ? onUpdateAvailableProperties : () => {},
                                            availableProperties: availableProperties ? availableProperties : [],
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
                                title: "Use expression"
                            },
                            {
                                id: 'minWidth',
                                title: "Minimum width (px)",
                                type: CustomCollectionFieldType.number,
                                required: false,
                                defaultValue: 50
                            },
                            {
                                id: 'maxWidth',
                                title: "Maximum width (px)",
                                type: CustomCollectionFieldType.number,
                                required: false,
                                defaultValue: 310
                            },
                            {
                                id: 'enableSorting',
                                title: "Sortable",
                                type: CustomCollectionFieldType.boolean,
                                defaultValue: false,
                                required: false                                
                            },
                            {
                                id: 'isResizable',
                                title: "Resizable",
                                type: CustomCollectionFieldType.boolean,
                                defaultValue: false,
                                required: false                                
                            },
                            {
                                id: 'isMultiline',
                                title: "Multiline",
                                type: CustomCollectionFieldType.boolean,
                                defaultValue: false,
                                required: false          
                            },
                            {
                                id: 'isResultItemLink',
                                title: "Link to item",
                                type: CustomCollectionFieldType.boolean,
                                defaultValue: false,
                                required: false          
                            },                                                        
                        ]
                    }),
                    PropertyPaneToggle('templateParameters.showFileIcon', {
                        label: strings.TemplateParameters.ShowFileIcon,                        
                        checked: properties.templateParameters.showFileIcon  !== null || properties.templateParameters.showFileIcon !== undefined ? properties.templateParameters.showFileIcon : true
                    })                    
                ];

            case ResultsLayoutOption.Tiles:

                // Setup default values
                if (!properties.templateParameters.documentCardFields) {

                    properties.templateParameters.documentCardFields = [
                        { name: 'Title', field: 'title', value: "Title", useHandlebarsExpr: false },
                        { name: 'Preview Image', field: 'previewImage',  value: "{{{getPreviewSrc item}}}", useHandlebarsExpr: true },
                        { name: 'Preview URL', field: 'previewUrl' , value: "{{#eq item.contentclass 'STS_ListItem_851'}}{{{item.DefaultEncodingURL}}}{{else}}{{#eq item.FileType 'pdf'}}<!-- Documents from OneDrive sites can't be viewed directly due to SAMEORIGIN iframe restrictions-->{{#contains Path '-my.sharepoint'}}{{{item.ServerRedirectedEmbedURL}}}{{else}}{{{item.Path}}}{{/contains}}{{else}}{{{item.ServerRedirectedEmbedURL}}}{{/eq}}{{/eq}} ", useHandlebarsExpr: true },
                        { name: 'Date', field: 'date', value: "{{getDate item.Created 'LL'}}", useHandlebarsExpr: true },
                        { name: 'URL', field: 'href', value: "{{getUrl item}}", useHandlebarsExpr: true },
                        { name: 'Author', field: 'author', value: "Author", useHandlebarsExpr: false },
                        { name: 'Profile Image', field: 'profileImage', value: "{{#with (split AuthorOWSUSER '|')}}/_layouts/15/userphoto.aspx?size=L&username={{[0]}}{{/with}}", useHandlebarsExpr: true  },
                        { name: 'IconSrc', field: 'iconSrc', value: "IconSrc", useHandlebarsExpr: false },
                        { name: 'File Extension', field: 'fileExtension', value: "FileType", useHandlebarsExpr: false }
                    ] as IDocumentCardFieldsConfiguration[];
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
                        label: strings.TemplateParameters.ManageDetailsListColumnLabel,
                        value: properties.templateParameters.documentCardFields,
                        fields: [
                            {
                                id: 'name',
                                type: CustomCollectionFieldType.string,
                                disableEdit: true,
                                title: strings.TemplateParameters.DocumentCardNameFieldLabel
                            },
                            {
                                id: 'value',
                                type: CustomCollectionFieldType.custom,
                                title: strings.TemplateParameters.DocumentCardValueFieldLabel,
                                onCustomRender: (field, value, onUpdate, item, itemId, onCustomFieldValidation) => {
                                    return React.createElement("div", { key: itemId }, 
                                        React.createElement(TemplateValueFieldEditor, {
                                            currentItem: item,
                                            field: field,
                                            useHandlebarsExpr: item.useHandlebarsExpr,
                                            onUpdate: onUpdate,
                                            value: value,
                                            onUpdateAvailableProperties: onUpdateAvailableProperties ? onUpdateAvailableProperties : () => {},
                                            availableProperties: availableProperties ? availableProperties : [],
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
                                title: "Use Handlebars expression"
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
                ];

            default:
                return [];
        }
    }

}

export default TemplateService;