import * as React from 'react';
import { Suspense } from 'react';
import * as strings from 'SearchResultsWebPartStrings';
const TextDialog = React.lazy(() => import('../TextDialog/TextDialog'));
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
            let lang: any = "handlebars";
            renderField = <Suspense fallback={""}><TextDialog
                language={lang}
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
            /></Suspense>;
        } else {

            renderField = <SearchManagedProperties
                defaultSelectedKey={this.props.value}
                onUpdate={(newValue: string, isSortable?: boolean) => {

                    if (this.props.validateSortable) {
                        if (!isSortable) {
                            this.props.onCustomFieldValidation(this.props.field.id, strings.Sort.SortInvalidSortableFieldMessage);
                        } else {
                            this.props.onUpdate(this.props.field.id, newValue);
                            this.props.onCustomFieldValidation(this.props.field.id, '');
                        }
                    } else {
                        this.props.onUpdate(this.props.field.id, newValue);
                    }
                }}
                availableProperties={this.props.availableProperties}
                onUpdateAvailableProperties={this.props.onUpdateAvailableProperties}
                searchService={this.props.searchService}
                validateSortable={this.props.validateSortable}
            />;
        }

        return renderField;
    }
}