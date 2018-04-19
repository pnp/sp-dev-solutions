import * as React from 'react';
import { Dropdown, TextField, Toggle, Label, Icon } from 'office-ui-fabric-react';
import styles from '../SiteDesignsStudio.module.scss';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import * as strings from 'SiteDesignsStudioWebPartStrings';

export interface ISchemaProperty {
	type?: string;
	enum?: string[];
}

export interface IGenericObjectEditorProps {
	schema: any;
	object: any;
	defaultValues?: any;
	customRenderers?: any;
	ignoredProperties?: string[];
	readOnlyProperties?: string[];
	onObjectChanged?: (object: any) => void;
	updateOnBlur?: boolean;
	fieldLabelGetter?: (field: string) => string;
}

export default class GenericObjectEditor extends React.Component<IGenericObjectEditorProps, {}> {
	private objectProperties: string[];
	private customPropertyRenderers = {};

	constructor(props: IGenericObjectEditorProps) {
		super(props);
		this._refreshObjectProperties(props);
		// this._initializeCustomPropertyRenderers();
	}

	public componentWillReceiveProps(nextProps: IGenericObjectEditorProps) {
		this._refreshObjectProperties(nextProps);
	}

	private _refreshObjectProperties(props: IGenericObjectEditorProps) {
		let { schema, ignoredProperties, object, defaultValues } = props;
		if (schema.type != 'object') {
			throw new Error('Cannot generate Object Editor from a non-object type');
		}

		if (!schema.properties || Object.keys(schema.properties).length == 0) {
			return;
		}

		this.objectProperties = Object.keys(schema.properties);

		if (ignoredProperties && ignoredProperties.length > 0) {
			this.objectProperties = this.objectProperties.filter((p) => ignoredProperties.indexOf(p) < 0);
		}

		// Initialize properties of the argument object is not set
		this.objectProperties.forEach((p) => {
			// Get the property type

			let defaultValue =
				defaultValues && defaultValues[p]
					? defaultValues[p]
					: this._getPropertyDefaultValueFromSchema(props, p);

			if (!object[p] && object[p] != false && object[p] != 0) {
				object[p] = defaultValue;
			}
		});
	}

	private _getPropertyDefaultValueFromSchema(props: IGenericObjectEditorProps, propertyName: string): any {
		let { schema, ignoredProperties } = props;
		let propSchema = schema.properties[propertyName];
		if (propSchema) {
			switch (propSchema.type) {
				case 'string':
					return '';
				case 'boolean':
					return false;
				case 'number':
					return 0;
				case 'object':
					return {};
				default:
					return null;
			}
		} else {
			return null;
		}
	}

	private _getPropertyTypeFromSchema(props: IGenericObjectEditorProps, propertyName: string): any {
		let { schema, ignoredProperties } = props;
		let propSchema = schema.properties[propertyName];
		if (propSchema) {
			return propSchema.type;
		} else {
			return null;
		}
	}

	public render(): React.ReactElement<IGenericObjectEditorProps> {
		let { schema, ignoredProperties } = this.props;

		let propertyEditors = this.objectProperties.map((p) => this._renderPropertyEditor(p, schema.properties[p]));

		return <div>{propertyEditors}</div>;
	}

	private _isPropertyReadOnly(propertyName: string): boolean {
		if (!this.props.readOnlyProperties || !this.props.readOnlyProperties.length) return false;

		return this.props.readOnlyProperties.indexOf(propertyName) > -1;
	}

	private _onObjectPropertyChange(propertyName: string, newValue: any) {
		let { object, onObjectChanged } = this.props;
		if (!onObjectChanged) {
			return;
		}
		let newObject = assign({}, object);

		let propertyType = this._getPropertyTypeFromSchema(this.props, propertyName);
		if (propertyType == 'number') {
			newValue = Number(newValue);
		}

		newObject[propertyName] = newValue;
		onObjectChanged(newObject);
	}

	private _getFieldLabel(field: string): string {
		if (this.props.fieldLabelGetter) {
			let foundLabel = this.props.fieldLabelGetter(field);
			if (foundLabel) {
				return foundLabel;
			}
		}

		// Try translate from built-in resources
		let key = 'PROP_' + field;
		return strings[key] || field;
	}

	private editTextValues: any;
	private _onTextFieldValueChanged(fieldName: string, value: any) {
		if (this.props.updateOnBlur) {
			if (!this.editTextValues) {
				this.editTextValues = {};
			}
			this.editTextValues[fieldName] = value;
		} else {
			this._onObjectPropertyChange(fieldName, value);
		}
	}

	private _onTextFieldEdited(fieldName: string) {
		let value = this.editTextValues && this.editTextValues[fieldName];
		this._onObjectPropertyChange(fieldName, value);
		if (value) {
			delete this.editTextValues[fieldName];
		}
	}

	private _renderPropertyEditor(propertyName: string, property: ISchemaProperty) {
		let { schema, object, customRenderers, defaultValues } = this.props;

		// Has custom renderer for the property
		if (customRenderers && customRenderers[propertyName]) {
			// If a default value is specified for current property and it is null, apply it
			if (!object[propertyName] && defaultValues && defaultValues[propertyName]) {
				object[propertyName] = defaultValues[propertyName];
			}

			return customRenderers[propertyName](object[propertyName]);
		}

		let isPropertyRequired =
			(schema.required && schema.required.length && schema.required.indexOf(propertyName) > -1) || false;

		if (property.enum) {
			if (property.enum.length > 1 || !this._isPropertyReadOnly(propertyName)) {
				return (
					<Dropdown
						label={this._getFieldLabel(propertyName)}
						selectedKey={object[propertyName]}
						options={property.enum.map((p) => ({ key: p, text: p }))}
						onChanged={(value) => this._onObjectPropertyChange(propertyName, value.key)}
					/>
				);
			} else {
				return (
					<TextField
						label={this._getFieldLabel(propertyName)}
						value={object[propertyName]}
						readOnly={true}
						onChanged={(value) => this._onTextFieldValueChanged(propertyName, value)}
						onBlur={() => this._onTextFieldEdited(propertyName)}
					/>
				);
			}
		} else {
			switch (property.type) {
				case 'boolean':
					return (
						<Toggle
							label={this._getFieldLabel(propertyName)}
							checked={object[propertyName] as boolean}
							disabled={this._isPropertyReadOnly(propertyName)}
							onChanged={(value) => this._onObjectPropertyChange(propertyName, value)}
						/>
					);
				case 'array': // TODO Render a ArrayEditor for compl
				case 'object': // TODO If object is a simple dictionary (key/non-complex object values) => Display a custom control
					return (
						<div>
							<div className="ms-Grid-row">
								<div className="ms-Grid-col ms-sm12">
									<Label>{this._getFieldLabel(propertyName)}</Label>
								</div>
							</div>
							<div className="ms-Grid-row">
								<div className="ms-Grid-col ms-sm2">
									<Icon iconName="InfoSolid" className={styles.infoIcon} />
								</div>
								<div className="ms-Grid-col ms-sm10">
									{strings.PropertyIsComplexTypeMessage}
									<br />
									{strings.UseJsonEditorMessage}
								</div>
							</div>
						</div>
					);
				case 'number':
				case 'string':
				default:
					return (
						<TextField
							label={this._getFieldLabel(propertyName)}
							value={object[propertyName]}
							readOnly={this._isPropertyReadOnly(propertyName)}
							onChanged={(value) => this._onTextFieldValueChanged(propertyName, value)}
							onBlur={() => this._onTextFieldEdited(propertyName)}
						/>
					);
			}
		}
	}
}
