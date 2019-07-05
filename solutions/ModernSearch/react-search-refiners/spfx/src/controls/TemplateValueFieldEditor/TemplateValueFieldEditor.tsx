import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as strings from 'SearchResultsWebPartStrings';
import { PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { TextDialog } from '../TextDialog';
import { ICustomCollectionField } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface ITemplateValueFieldEditorState {
}

export interface ITemplateValueFieldEditorProps {
    
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
            renderField = <TextField styles={{
                root: {
                    width: '100%',
                    marginRight: 10
                }
            }}
            onChange={(ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
                this.props.onUpdate(this.props.field.id, newValue);
            }}
            defaultValue={this.props.value}
            />;
        }
            
        return renderField;
    }
}