import * as React from 'react';
import { ComboBox, IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { ICustomCollectionField } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { ISPHttpClientConfiguration, SPHttpClient, SPHttpClientConfiguration, ODataVersion } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import { Log } from '@microsoft/sp-core-library';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { isEqual } from '@microsoft/sp-lodash-subset';
import { IRefinementResult } from '../../models/ISearchResult';

const LOADING_KEY = 'LOADING';

export interface ISearchManagedPropertiesProps {
    /**
     * The current page context
     */
    pageContext: PageContext;

    /**
     * An SPHttpClient instance
     */
    spHttpClient: SPHttpClient;

    /**
     * The current CollectionData item (i.e. row)
     */
    currentItem: any;

    /**
     * The current field on the row
     */
    field: ICustomCollectionField;

    /**
     * Handler when a field value is updated
     */
    onUpdate: (fieldId: string, value: any) => {};

    /**
     * Handler to validate the field at row level
     * @param fieldId the field id
     * @param errorMsg the error message to display
     */
    onCustomFieldValidation(fieldId: string, errorMsg: string);

    /**
     * Callback when the list of managed properties is fetched by the control
     */
    onUpdateAvailableProperties: (properties: IComboBoxOption[]) => void;

    /**
     * The list of available manged properties
     */
    availableProperties: IComboBoxOption[];

    /**
     * Indicates whether or not we should check if the selected proeprty is sortable or not
     */
    validateSortable?: boolean;
}

export interface ISearchManagedPropertiesState {

    /**
     * Error message to display in the field
     */
    errorMessage: string;

    /**
     * The current selected key
     */
    selectedOptionKey?: string | number;

    /**
     * The initial value to show in the combo box
     */
    initialDisplayValue: string;

    /**
     * Current options to display in the combo box
     */
    options: IComboBoxOption[];
}

export class SearchManagedProperties extends React.Component<ISearchManagedPropertiesProps, ISearchManagedPropertiesState> {

    public constructor(props: ISearchManagedPropertiesProps) {
        
        super(props);

        this.state = {
            errorMessage: null,
            options: props.availableProperties,
            initialDisplayValue: props.currentItem.sortField ? props.currentItem.sortField : ''
        };

        this.getAvailableSearchProperties = this.getAvailableSearchProperties.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.onRenderOption = this.onRenderOption.bind(this);
    }

    public render() {
        
        return <ComboBox
            allowFreeform={true}
            autoComplete='on'
            selectedKey={this.state.selectedOptionKey}
            text={this.state.initialDisplayValue}
            onChanged={this.onChanged}
            useComboBoxAsMenuWidth={true}
            onResolveOptions={this.getAvailableSearchProperties}
            errorMessage={this.state.errorMessage}
            placeholder='Select managed property'
            options={this.state.options}
            onRenderOption={this.onRenderOption}
        />;
    }

    public componentDidUpdate(prevProps: ISearchManagedPropertiesProps, prevState: ISearchManagedPropertiesState) {

        if (this.props.availableProperties && !isEqual(this.props.availableProperties, prevProps.availableProperties)) {

            // Initializes the options with the ones fetched from other fields (only for performance purpose to avoid re fecthing it)
            this.setState({
                options: this.props.availableProperties
            });
        }
    }

    public async onChanged(option: IComboBoxOption, index: number, value: string, submitPendingValueEvent: any) {

        this.setState({
            selectedOptionKey: option.key,
            initialDisplayValue: undefined
        });

        if (this.props.validateSortable) {
            const isSortable = await this.validateSortableProperty(option.text);

            if (!isSortable) {
                this.props.onCustomFieldValidation(this.props.field.id, "Error");
            } else {
                this.props.onUpdate(this.props.field.id, option.text);
                this.props.onCustomFieldValidation(this.props.field.id, '');
            }

        } else {
            this.props.onUpdate(this.props.field.id, option.text);
        }     
    }

    /**
     * Gets all available search managed properties
     */
    private async getAvailableSearchProperties(): Promise<IComboBoxOption[]> {

        let properties: IComboBoxOption[] = [];

        // Case when user opens the dropdown multiple times on the same field
        if (this.state.options.length > 0) {
            properties = this.state.options;
        } else {

            try {

                // Create a special item to display a spinner (see onRenderOption method)
                this.setState({
                    options: [
                        {
                            key: LOADING_KEY,
                            text: '',
                            disabled: true,
                            styles: {
                                flexContainer: {
                                    selectors: {
                                        'span': {
                                            margin: '0 auto',
                                        }
                                    }
                                }
                            }
                        }
                    ]
                });

                const spSearchConfig: ISPHttpClientConfiguration = {
                    defaultODataVersion: ODataVersion.v3
                };
                    
                const clientConfigODataV3: SPHttpClientConfiguration = SPHttpClient.configurations.v1.overrideWith(spSearchConfig);
                
                const url = `${this.props.pageContext.web.absoluteUrl}/_api/search/query?querytext='*'&refiners='ManagedProperties(filter=1000/0/*)'&RowLimit=1`;
                const response = await this.props.spHttpClient.get(url, clientConfigODataV3);
    
                if (response.ok) {
                    const searchResponse: any = await response.json();
    
                    let refinementResultsRows = searchResponse.PrimaryQueryResult.RefinementResults;
                    const refinementRows: IRefinementResult[] = refinementResultsRows ? refinementResultsRows.Refiners : [];
                    
                    refinementRows.map((refiner) => {
    
                        properties = refiner.Values.map((item) => {
                            return {
                                text: item.RefinementName,
                                key: item.RefinementName                            
                            } as IComboBoxOption;
                        });
                    });
                    
                } else {
                    throw new Error(response.statusText);
                }
    
            } catch (error) {
                const errorMessage = error ? error.message : `Failed to get all avaialble managed properties`;
                Log.error("ValoSearchDataSource::getAvailableSearchProperties", new Error(`Error: '${error}'`));
                throw new Error(errorMessage);
            }
        }
        
        // Return managed properties sorted alphabetically (ascending)
        properties = properties.sort((a, b) => {
            if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
            if (b.text.toLowerCase() > a.text.toLowerCase()) return -1;
            return 0;
        });

        // Pass list to the parent to save it for other fields
        this.props.onUpdateAvailableProperties(properties);

        this.setState({
            options: properties
        });

        return properties;
    }

    /**
     * Checks if the provided manage property is sortable
     * @param property the managed property to verify
     */
    private async validateSortableProperty(property: string): Promise<boolean> {

        if (property) {

            try {
                            
                const url = `${this.props.pageContext.web.absoluteUrl}/_api/search/query?querytext='*'&sortlist='${property}:ascending'&RowLimit=1&selectproperties='Path'`;
                const response = await this.props.spHttpClient.get(url, SPHttpClient.configurations.v1);
                
                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                const errorMessage = error ? error.message : `Failed to get managed property sortable behavior`;
                Log.error("ValoSearchDataSource::validateSortableProperty", new Error(`Error: '${error}'`));
                throw new Error(errorMessage);
            }
        }
            
        return true;
    }

    private onRenderOption(option: IComboBoxOption): JSX.Element {

        if (option.key === LOADING_KEY) {
            return (
                <Spinner size={SpinnerSize.small}></Spinner>
              );
        } else {
            return <span>{option.text}</span>;
        }
    }
}