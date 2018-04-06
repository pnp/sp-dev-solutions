import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	DialogContent,
	DialogFooter,
	DefaultButton,
	PrimaryButton,
	autobind,
	Pivot,
	PivotItem,
	TextField
} from 'office-ui-fabric-react';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { MonacoEditor } from '../monacoEditor/MonacoEditor';
import { PropertyPaneFieldType, IPropertyPaneCustomFieldProps, IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { assign } from '@microsoft/sp-lodash-subset';

import styles from '../SiteDesignsStudio.module.scss';
import * as strings from 'SiteDesignsStudioWebPartStrings';
import { HttpClient } from '@microsoft/sp-http';
import { IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';

const jsonSchemaDraft06 = require('ajv/lib/refs/json-schema-draft-06.json');

export interface ISchemaPropertyEditorProps extends IServiceConsumerComponentProps {
	value: string;
	onSchemaPropertyChanged: (value: string) => void;
	label: string;
	stateKey?: string;
}
export interface ISchemaPropertyEditorDialogProps extends ISchemaPropertyEditorProps {
	onClose: () => void;
}

export interface ISchemaPropertyEditorInternalProps extends ISchemaPropertyEditorProps, IPropertyPaneCustomFieldProps {}

interface ISchemaEditorDialogComponentState {
	selectedTab: string;
	jsonMetaSchema: any;
}
class SchemaEditorDialogComponent extends React.Component<
	ISchemaPropertyEditorDialogProps,
	ISchemaEditorDialogComponentState
> {
  private savedPropertyValue: string;

	constructor(props: ISchemaPropertyEditorDialogProps) {
		super(props);

		this.state = {
			selectedTab: this._isUrl(this.props.value) ? 'url' : 'direct',
			jsonMetaSchema: {}
		};
	}

	public componentWillMount() {
		setTimeout(() => {
			this.setState({
				jsonMetaSchema: jsonSchemaDraft06
			});
		}, 100);
	}

	public render() {
		let { value } = this.props;
		let { selectedTab } = this.state;
		let isUrl = this._isUrl(value);
		let isJsonSchema = !isUrl && this._isJsonSchema(value);
		return (
			<DialogContent
				title={strings.SchemaPropertyEditorDialogTitle}
				onDismiss={() => this._onClose()}
				showCloseButton={true}
			>
				<div className={styles.settingsDialogContent}>
					<Pivot selectedKey={selectedTab} onLinkClick={(tab) => this._onTabChange(tab)}>
						<PivotItem linkText="Url" itemKey="url" />
						<PivotItem linkText="Direct" itemKey="direct" />
					</Pivot>
					{selectedTab == 'url' && (
						<TextField
							label={'Url'}
							width={300}
							value={isUrl ? value : ''}
							placeholder="(e.g. /siteassets/site-design-schema.json)"
							onChanged={(v) => this._onValueChanged(v)}
						/>
					)}
					{selectedTab == 'direct' && (
						<div className={styles.codeEditorContainer}>
							<div className={styles.codeEditor}>
								<MonacoEditor
									schemaUri="http://json-schema.org/draft-06/schema#"
									schema={this.state.jsonMetaSchema}
									value={isJsonSchema ? value : '{\n}'}
									onValueChange={(content, errors) => this._onValueChanged(content)}
									readOnly={false}
								/>
							</div>
						</div>
					)}
				</div>
				<DialogFooter>
        <DefaultButton
						text={strings.SchemaPropertyEditorCancelButtonLabel}
						title={strings.SchemaPropertyEditorCancelButtonLabel}
						onClick={() => this._onClose()}
					/>
					<PrimaryButton
						text={strings.SchemaPropertyEditorOkButtonLabel}
						title={strings.SchemaPropertyEditorOkButtonLabel}
						onClick={() => this._onClose(true)}
					/>
				</DialogFooter>
			</DialogContent>
		);
	}

	private _onTabChange(item: PivotItem) {
		this.setState({
			selectedTab: item.props.itemKey
		});
	}

	@autobind
	private _onClose(saveProperty: boolean=false) {
    if (this.props.onSchemaPropertyChanged && saveProperty) {
			this.props.onSchemaPropertyChanged(this.savedPropertyValue);
		}
		this.props.onClose();
	}

	private _isUrl(value: string): boolean {
		return value && (value.indexOf('http://') == 0 || value.indexOf('https://') == 0 || value.indexOf('/') == 0);
	}

	private _isJsonSchema(value: string): boolean {
		return value && value.indexOf('{') == 0;
	}

	private _onValueChanged(value: string) {
		this.savedPropertyValue = value;
	}
}

export class SchemaEditorDialog extends BaseDialog {
	constructor(public properties: ISchemaPropertyEditorDialogProps) {
		super();
	}

	public render(): void {
		ReactDOM.render(
			<SchemaEditorDialogComponent
				onClose={() => this.close()}
				onSchemaPropertyChanged={this.properties.onSchemaPropertyChanged}
				label={this.properties.label}
        value={this.properties.value}
        serviceScope={this.properties.serviceScope}
			/>,
			this.domElement
		);
	}

	public getConfig(): IDialogConfiguration {
		return {
			isBlocking: false
		};
	}
}

export class SchemaPropertyEditor extends React.Component<ISchemaPropertyEditorProps, {}> {
	constructor(props: ISchemaPropertyEditorProps) {
		super(props);
	}
	public render(): React.ReactElement<ISchemaPropertyEditorProps> {
		return <PrimaryButton text={this.props.label} onClick={() => this._showDialog()} />;
	}

	private _showDialog() {
		let dialogProps = assign({}, this.props) as ISchemaPropertyEditorDialogProps;
		const dialog: SchemaEditorDialog = new SchemaEditorDialog(dialogProps);
		dialog.show();
	}
}

export class PropertyPaneSchemaEditor implements IPropertyPaneField<ISchemaPropertyEditorInternalProps> {
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: ISchemaPropertyEditorInternalProps;
	private elem: HTMLElement;

	constructor(targetProperty: string, properties: ISchemaPropertyEditorProps) {
		this.targetProperty = targetProperty;
		this.properties = {
			label: properties.label,
			onSchemaPropertyChanged: properties.onSchemaPropertyChanged,
			onRender: this.onRender.bind(this),
			key: properties.label,
      value: properties.value,
      serviceScope: properties.serviceScope
		};
	}

	public render(): void {
		if (!this.elem) {
			return;
		}

		this.onRender(this.elem);
	}

	private onRender(elem: HTMLElement): void {
		if (!this.elem) {
			this.elem = elem;
		}

		ReactDOM.render(
			<SchemaPropertyEditor
				onSchemaPropertyChanged={(value) => this.onChanged(value)}
				value={this.properties.value}
        label={this.properties.label}
        serviceScope={this.properties.serviceScope}
				stateKey={new Date().toString()}
			/>,
			elem
		);
	}

	private onChanged(value: string): void {
		console.log('schema property changed: ', value);
		this.properties.onSchemaPropertyChanged(value);
	}
}
