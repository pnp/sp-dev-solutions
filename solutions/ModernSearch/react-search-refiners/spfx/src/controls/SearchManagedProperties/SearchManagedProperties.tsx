import * as React from 'react';
import { ComboBox, IComboBoxOption, IComboBox, SelectableOptionMenuItemType, IComboBoxStyles } from 'office-ui-fabric-react/lib/ComboBox';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { isEqual } from '@microsoft/sp-lodash-subset';
import ISearchService from '../../services/SearchService/ISearchService';
import * as strings from 'SearchResultsWebPartStrings';
import * as update from 'immutability-helper';

const LOADING_KEY = 'LOADING';

export interface ISearchManagedPropertiesProps {

    /**
     * The search service instance
     */
    searchService: ISearchService;

    /**
     * The default selected key
     */
    defaultSelectedKey?: string;

    /**
     * The default selected key
     */
    defaultSelectedKeys?: string [];

    /**
     * Handler when a field value is updated
     */
    onUpdate: (value: any, isSortable?: boolean) => void;

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

    /**
     * The field label
     */
    label?: string;

}

export interface ISearchManagedPropertiesState {

    /**
     * The current selected keys if the control is multiline
     */
    selectedOptionKeys?: string[];

    /**
     * The initial value to show in the combo box for a single value
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
            selectedOptionKeys: [],
            options: [],
            initialDisplayValue: null
        };

        this.getAvailableSearchProperties = this.getAvailableSearchProperties.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeMulti = this.onChangeMulti.bind(this);
        this.onRenderOption = this.onRenderOption.bind(this);
    }

    public render() {

        let renderCombo = null;

        if (!this.props.allowMultiSelect) {

            renderCombo =   <ComboBox
                                text={ this.state.initialDisplayValue }                      
                                label={this.props.label}
                                allowFreeform={true}
                                autoComplete='on'                                
                                onChange={this.onChange}
                                useComboBoxAsMenuWidth={true}
                                onMenuOpen={this.getAvailableSearchProperties}
                                options={this.state.options}
                                placeholder={ strings.ManagedPropertiesListPlaceHolder }
                                onRenderOption={this.onRenderOption}
                            />;
        } else {

            renderCombo =   <ComboBox
                                label={this.props.label}
                                allowFreeform={true}
                                selectedKey={ this.state.selectedOptionKeys }
                                autoComplete='on'                                
                                text={ this.state.initialDisplayValue }
                                onChange={this.onChangeMulti}
                                useComboBoxAsMenuWidth={true}
                                onMenuOpen={this.getAvailableSearchProperties}
                                options={this.state.options}
                                placeholder={ strings.ManagedPropertiesListPlaceHolder }
                                multiSelect
                                onRenderOption={this.onRenderOption}
                            />;
        }

        return renderCombo;
    }

    public componentDidMount() {
        
        let initialValue = null;

        if (this.props.allowMultiSelect) {
            initialValue = this.props.defaultSelectedKeys ? this.props.defaultSelectedKeys.toString() : '';
        } else {
            initialValue = this.props.defaultSelectedKey ? this.props.defaultSelectedKey : '';
        }

        this.setState({
            selectedOptionKeys: this.props.defaultSelectedKeys,
            options: this.props.availableProperties ? this.props.availableProperties : [],
            initialDisplayValue: initialValue
        });
    }

    public componentDidUpdate(prevProps: ISearchManagedPropertiesProps, prevState: ISearchManagedPropertiesState) {

        if (this.props.availableProperties && !isEqual(this.props.availableProperties, prevProps.availableProperties)) {

            // Initializes the options with the ones fetched from other fields (only for performance purpose to avoid re fecthing it)
            // https://github.com/OfficeDev/office-ui-fabric-react/issues/9162
            this.setState({
                options: this.props.availableProperties.map(x => ({...x}))
            });
        }
    }

    /**
     * Handler when a value is selected or manually added in the list
     */
    public async onChange(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) {

        let isSortable = null;

        if (option) {

            this.setState({
                initialDisplayValue: option.key as string,
            });

            if (this.props.validateSortable) {
                isSortable = await this.props.searchService.validateSortableProperty(option.text);
            }
            
            this.props.onUpdate(option.key, isSortable);
            
        } else if (value !== undefined) {

            this.setState({
                initialDisplayValue: value
            });

            if (this.props.validateSortable) {
                isSortable = await this.props.searchService.validateSortableProperty(value);
            }

            // User typed a freeform option
            const newOption: IComboBoxOption = { key: value, text: value };
            let options = update(this.state.options, {$push: [newOption] });

            // Re-sort ascending after adding free values
            options = options.sort((a, b) => {

                const aValue = a.text ? a.text : a.key ? a.key.toString() : null;
                const bValue = b.text ? b.text : b.key ? b.key.toString() : null;

                if (aValue && bValue) {
                    if (aValue.toLowerCase() > bValue.toLowerCase()) return 1;
                    if (bValue.toLowerCase() > aValue.toLowerCase()) return -1;
                } 

                return 0;
            });

            this.props.onUpdate(newOption.key, isSortable);

            // Update the shared list with new entry
            this.props.onUpdateAvailableProperties(options);

            this.setState({
                options: options.map(x => ({...x}))
            });
        }
    }

    /**
     * Handler when a value is selected/unselected or manually added in the list
     */
    public async onChangeMulti(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) {

        let selectedKeys = this.state.selectedOptionKeys;

        if (option) {
            const selectedKeyIdx = this.state.selectedOptionKeys.indexOf(option.key as string);

            if (option.selected && selectedKeyIdx === -1) {

                selectedKeys = update(this.state.selectedOptionKeys, {$push: [option.key] });

                this.setState({
                    selectedOptionKeys: selectedKeys,
                    initialDisplayValue: undefined
                });

            } else {

                selectedKeys = update(this.state.selectedOptionKeys, { $splice: [[selectedKeyIdx, 1]] });

                this.setState({
                    selectedOptionKeys: selectedKeys,
                    initialDisplayValue: undefined
                });
            }

            this.props.onUpdate(selectedKeys);

          } else if (value !== undefined) {

            // User typed a freeform option
            const newOption: IComboBoxOption = { key: value, text: value };
            selectedKeys = update(this.state.selectedOptionKeys, {$push: [newOption.key] });
            let options = update(this.state.options, {$push: [newOption] });

            // Re-sort ascending after adding free values
            options = options.sort((a, b) => {

                const aValue = a.text ? a.text : a.key ? a.key.toString() : null;
                const bValue = b.text ? b.text : b.key ? b.key.toString() : null;

                if (aValue && bValue) {
                    if (aValue.toLowerCase() > bValue.toLowerCase()) return 1;
                    if (bValue.toLowerCase() > aValue.toLowerCase()) return -1;
                } 

                return 0;
            });

            this.setState({
                options: options.map(x => ({...x})),
                initialDisplayValue: undefined
            });

           this.props.onUpdate(selectedKeys);

           // Update the shared list with new entry
           this.props.onUpdateAvailableProperties(options);
        } 
    }

    /**
     * Gets all available search managed properties
     */
    private async getAvailableSearchProperties(): Promise<void> {

        // Case when user opens the dropdown multiple times on the same field
        if (this.state.options.length > 0) {
            return;
        } else {

            let options: IComboBoxOption[] = [];

            // Create a special item to display a spinner (see onRenderOption method)
            this.setState({
                options: [
                    {
                        key: LOADING_KEY,
                        text: '',
                        disabled: true,
                        itemType: SelectableOptionMenuItemType.Header,
                        styles: {
                            flexContainer: {                                
                                selectors: {
                                    'span': {
                                        margin: '0 auto',
                                    }
                                }
                            },

                        }
                    }
                ]
            });

            // Get managed properties and build dropdown options
            let searchManagedProperties = await this.props.searchService.getAvailableManagedProperties();
            options.pop();
            searchManagedProperties.map(managedProperty => {

                options.push({
                    key: managedProperty.name,
                    text: managedProperty.name,
                } as IComboBoxOption);
            });      
            
            if (!this.props.allowMultiSelect) {
                // If default selected properties are not in the list we add them a free text
                if (options.filter(e => { return e.key === this.props.defaultSelectedKey; }).length === 0) {
                    options.push({
                        key: this.props.defaultSelectedKey,
                        text:this.props.defaultSelectedKey as string,
                    });
                }
            } else {
                this.props.defaultSelectedKeys.map(defaultKey => {

                    if (options.filter(e => { return e.key === defaultKey; }).length === 0) {
                        options.push({
                            key: defaultKey,
                            text: defaultKey as string,
                        });
                    }
                });
            }

            // Re-sort ascending after adding free values
            options = options.sort((a, b) => {

                const aValue = a.text ? a.text : a.key ? a.key.toString() : null;
                const bValue = b.text ? b.text : b.key ? b.key.toString() : null;

                if (aValue && bValue) {
                    if (aValue.toLowerCase() > bValue.toLowerCase()) return 1;
                    if (bValue.toLowerCase() > aValue.toLowerCase()) return -1;
                } 

                return 0;
            });

            // Remove null values
            options = options.filter((elt) => { return elt.key != null && elt.text !=null; });

            this.setState({
                options: options,
                selectedOptionKeys: this.props.defaultSelectedKeys,
            });

            // Pass list to the parent to save it for other fields
            this.props.onUpdateAvailableProperties(options);
        }
    }

    private onRenderOption(option: IComboBoxOption, defaultRender?: (props?: IComboBoxOption) => JSX.Element): JSX.Element {

        if (option.key === LOADING_KEY) {
            return (
                <div style={{height: '100%'}}>
                    <Spinner styles={{root: { height: '100%' }}} key={option.key} size={SpinnerSize.small}></Spinner>
                </div>
              );
        } else {
            return defaultRender(option);
        }
    }
}