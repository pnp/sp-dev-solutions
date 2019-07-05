import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as strings from 'SearchResultsWebPartStrings';
import { PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { TextDialog } from '../TextDialog';
import { ICustomCollectionField } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { SearchManagedProperties } from '../SearchManagedProperties/SearchManagedProperties';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import ISearchService from '../../services/SearchService/ISearchService';

export interface ITemplateValueFieldEditorState {
}

export interface ITemplateValueFieldEditorProps {

    /**
     * The search service instance
     */
    searchService: ISearchService;
    
    /**
     * The field mode to render
     */
    useHandlebarsExpr: boolean;

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
     * The default value to display in the field
     */
    value: any;

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

export class TemplateValueFieldEditor extends React.Component<ITemplateValueFieldEditorProps, ITemplateValueFieldEditorState> {

    public constructor(props: ITemplateValueFieldEditorProps) {
        super(props);
    }

    public render(): JSX.Element {

        let renderField: JSX.Element = null;

        if (this.props.useHandlebarsExpr) {
            renderField =   <TextDialog
                                language={PropertyFieldCodeEditorLanguages.Handlebars}
                                dialogTextFieldValue={this.props.value}
                                onChanged={(fieldValue) => {
                                    this.props.onUpdate(this.props.field.id, fieldValue);
                                }}
                                strings={{
                                    cancelButtonText: strings.CancelButtonText,
                                    dialogButtonText: "Edit Handlebars expression",
                                    dialogTitle: "Add Handlebars expression",
                                    saveButtonText: strings.SaveButtonText
                                }}
                            />;
        } else {

           /* renderField = <TextField styles={{
                root: {
                    width: '100%',
                    marginRight: 10
                }
            }}
            onChange={(ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
                this.props.onUpdate(this.props.field.id, newValue);
            }}
            defaultValue={this.props.value}
            />;*/

            renderField =   <SearchManagedProperties 
                                currentItem={this.props.currentItem} 
                                field={this.props.field} 
                                onUpdate={this.props.onUpdate}
                                availableProperties={this.props.availableProperties}
                                onUpdateAvailableProperties={this.props.onUpdateAvailableProperties}
                                searchService={this.props.searchService}
                                validateSortable={this.props.validateSortable}
                                onCustomFieldValidation={this.props.onCustomFieldValidation}
                            />;
        }
            
        return renderField;
    }
}