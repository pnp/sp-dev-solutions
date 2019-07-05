import * as React from 'react';
import { ComboBox, IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { ICustomCollectionField } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { isEqual } from '@microsoft/sp-lodash-subset';
import ISearchService from '../../services/SearchService/ISearchService';
import * as strings from 'SearchResultsWebPartStrings';

const LOADING_KEY = 'LOADING';

export interface ISearchManagedPropertiesProps {

    /**
     * The search service instance
     */
    searchService: ISearchService;

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
     * The list of available managed properties already fetched once
     */
    availableProperties: IComboBoxOption[];

    /**
     * Indicates whether or not we should check if the selected proeprty is sortable or not
     */
    validateSortable?: boolean;

    /**
     * Indicates whether or not we should allow multiple selection
     */
    allowMultiSelect?: boolean;
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

        let initialValue: string = '';

        // Initializes default value
        if (props.currentItem && props.field) {
            if (props.currentItem[props.field.id]) {
                initialValue = props.currentItem[props.field.id];
            }
        }

        this.state = {
            errorMessage: null,
            options: props.availableProperties ? props.availableProperties : [],
            initialDisplayValue: initialValue
        };

        this.getAvailableSearchProperties = this.getAvailableSearchProperties.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.onRenderOption = this.onRenderOption.bind(this);
    }

    public render() {
        
        return <ComboBox
            allowFreeform={true}
            multiSelect={this.props.allowMultiSelect !== null ? this.props.allowMultiSelect : false }
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
            const isSortable = await this.props.searchService.validateSortableProperty(option.text);

            if (!isSortable) {
                this.props.onCustomFieldValidation(this.props.field.id, strings.);
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

        let options: IComboBoxOption[] = [];

        // Case when user opens the dropdown multiple times on the same field
        if (this.state.options.length > 0) {
            options = this.state.options;
        } else {

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

            // Get managed properties and build dropdown options
            const searchManagedProperties = await this.props.searchService.getAvailableManagedProperties();

            searchManagedProperties.map(managedProperty => {

                options.push({
                    key: managedProperty.name,
                    text: managedProperty.name
                } as IComboBoxOption);
            });                      
        }
        
        // Pass list to the parent to save it for other fields
        this.props.onUpdateAvailableProperties(options);

        this.setState({
            options: options
        });

        return options;
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