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
	TextField,
  Label,
  Icon
} from 'office-ui-fabric-react';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { MonacoEditor } from '../monacoEditor/MonacoEditor';
import { PropertyPaneFieldType, IPropertyPaneCustomFieldProps, IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { assign } from '@microsoft/sp-lodash-subset';

import styles from '../SiteDesignsStudio.module.scss';
import * as strings from 'SiteDesignsStudioWebPartStrings';
import { HttpClient } from '@microsoft/sp-http';
import { IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import { SiteScriptSchemaServiceKey, ISiteScriptSchemaService } from '../../services/siteScriptSchema/SiteScriptSchemaService';

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
  useBuiltInSchema: boolean;
  builtInSchemaString: string;
  refreshKey: string;
}
class SchemaEditorDialogComponent extends React.Component<
	ISchemaPropertyEditorDialogProps,
	ISchemaEditorDialogComponentState
> {
  private savedPropertyValue: string;
  private schemaService: ISiteScriptSchemaService;

	constructor(props: ISchemaPropertyEditorDialogProps) {
		super(props);

		this.state = {
      selectedTab: !props.value ? 'direct' : this._isUrl(props.value) ? 'url' : 'direct',
      useBuiltInSchema: (!props.value || false) && true,
      builtInSchemaString: null,
      jsonMetaSchema: {},
      refreshKey: null
		};
	}

	public componentWillMount() {
    this.schemaService = this.props.serviceScope.consume(SiteScriptSchemaServiceKey);
    const builtInSchema = this.schemaService.getSiteScriptSchema();
    console.log('Built in schema', builtInSchema);
		setTimeout(() => {
			this.setState({
        jsonMetaSchema: jsonSchemaDraft06,
        builtInSchemaString: JSON.stringify(builtInSchema, null, 2)
			});
    }, 100);

	}

	public render() {
		let { value } = this.props;
		let { selectedTab, useBuiltInSchema, builtInSchemaString } = this.state;
		let isUrl = !useBuiltInSchema && this._isUrl(value);
		let isCustomJsonSchema = !useBuiltInSchema && !isUrl && this._isJsonSchema(value);
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
									value={useBuiltInSchema ? builtInSchemaString : (isCustomJsonSchema ? value : '{\n}')}
									onValueChange={(content, errors) => this._onValueChanged(content)}
									readOnly={false}
								/>
							</div>
              {useBuiltInSchema && <Label><Icon iconName="InfoSolid" /> The built-in schema is used.</Label>}
						</div>
					)}
				</div>
				<DialogFooter>
          <PrimaryButton
						text={strings.SchemaPropertyEditorOkButtonLabel}
						title={strings.SchemaPropertyEditorOkButtonLabel}
						onClick={() => this._onClose(true)}
					/>
           <DefaultButton
						text={strings.SchemaPropertyEditorResetButtonLabel}
						title={strings.SchemaPropertyEditorResetButtonLabel}
						onClick={() => this._resetToDefault()}
					/>
					<DefaultButton
						text={strings.SchemaPropertyEditorCancelButtonLabel}
						title={strings.SchemaPropertyEditorCancelButtonLabel}
						onClick={() => this._onClose()}
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
	private _resetToDefault() {
		if (this.props.onSchemaPropertyChanged) {
      this.props.onSchemaPropertyChanged(null);
      this.setState({refreshKey: new Date().toString()});
		}
	}

	@autobind
	private _onClose(saveProperty: boolean = false) {
		if (this.props.onSchemaPropertyChanged && saveProperty) {
      this.props.onSchemaPropertyChanged(this.savedPropertyValue);
      this.setState({refreshKey: new Date().toString()});
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
    // if (value) {
    //   this.setState({useBuiltInSchema: false});
    // }
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
