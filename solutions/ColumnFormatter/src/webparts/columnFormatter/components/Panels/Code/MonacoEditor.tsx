import * as strings from "ColumnFormatterWebPartStrings";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

import { ColumnFormattingSchema, ColumnFormattingSchemaURI } from "../../../helpers/ColumnFormattingSchema";
import { ViewFormattingSchema, ViewFormattingSchemaURI } from "../../../helpers/ViewFormattingSchema";
import { formatterType } from "../../../state/State";
import styles from "../../ColumnFormatter.module.scss";

const monaco = require('../../../../../MonacoCustomBuild');

export interface IMonacoEditorProps {
	value: string;
	theme: string;
	readOnly: boolean;
	showLineNumbers: boolean;
	showMiniMap: boolean;
	showIndentGuides: boolean;
	formatType: formatterType;
	onValueChange: (newValue:string, validationErrors:Array<string>) => void;
}

export class MonacoEditor extends React.Component<IMonacoEditorProps, {}> {

	private _container: HTMLElement;
	private _editor: any;

	public componentDidMount(): void {
		//Add Column Formatter Schema for validation
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			schemas: [
				{
					uri: ColumnFormattingSchemaURI,
					schema: ColumnFormattingSchema
				},
				{
					uri: ViewFormattingSchemaURI,
					schema: ViewFormattingSchema
				},
			],
			validate: true,
			allowComments: false
		});

		//Adjust tab size once things are ready
		monaco.editor.onDidCreateModel((m:any) => {
			m.updateOptions({
				tabSize: 2
			});
		});

		this.createEditor();
	}

	private createEditor() {
		if(this._editor) {
			this._editor.dispose();
		}

		//Create the editor
		this._editor = monaco.editor.create(this._container, {
			value: this.props.value,
			scrollBeyondLastLine: false,
			theme: this.props.theme,
			language: 'json',
			folding: true,
			renderIndentGuides: this.props.showIndentGuides,
			readOnly: this.props.readOnly,
			lineNumbers: this.props.showLineNumbers,
			lineNumbersMinChars: 4,
			minimap: {
				enabled: this.props.showMiniMap
			}
		});

		//Add Ensure Schema Action
		this._editor.addAction({
			id: 'ensure-schema',
			label: strings.Editor_EnsureSchemaCommand,
			contextMenuGroupId: 'navigation',
			contextMenuOrder: 0,
			precondition: '!editorReadOnly',
			run: this.ensureSchema,
		});

		//Subscribe to changes
		this._editor.onDidChangeModelContent(this.onDidChangeModelContent);
	}

	public componentDidUpdate(prevProps:IMonacoEditorProps) {
		if(this.props.value !== prevProps.value) {
			if(this._editor) {
				this._editor.setValue(this.props.value);
			}
		}
		if(this.props.theme !== prevProps.theme) {
			monaco.editor.setTheme(this.props.theme);
		}
		if(this.props.showLineNumbers != prevProps.showLineNumbers ||
			this.props.showMiniMap != prevProps.showMiniMap ||
			this.props.showIndentGuides != prevProps.showIndentGuides) {
			this.createEditor();
		}
		if(this._editor) {
			this._editor.layout();
		}
	}

	public componentWillUnmount(): void {
		if(this._editor) {
			this._editor.dispose();
		}
	}

	public render(): React.ReactElement<IMonacoEditorProps> {
		return (
		  <div ref={(container) => this._container = container!} className={styles.codeEditor} />
		);
	}

	@autobind
	private onDidChangeModelContent(e:any): void {
		if(this._editor) {
			let curVal:string = this._editor.getValue();
			if(curVal !== this.props.value) {
				let validationErrors:Array<string> = new Array<string>();
				try {
					let curObj:any = JSON.parse(curVal);
				} catch (e) {
					validationErrors.push(e.message);
				}
				this.props.onValueChange(curVal, validationErrors);
			}
		}
	}

	@autobind
	private ensureSchema(ed:any): null {
		try {
			const schemaVal:string = this.props.formatType == formatterType.Column ? ColumnFormattingSchemaURI : ViewFormattingSchemaURI;
			let curVal:string = ed.getValue();
			curVal = curVal.trimStart();
			const curObj:any = JSON.parse(curVal);

			if (!curObj.hasOwnProperty("$schema")) {
				// Missing the schema, so add it
				curVal = `{\n  "$schema": "${schemaVal}",\n  ` +
						  curVal.substring(curVal.indexOf('"'));
				ed.setValue(curVal);
			} else {
				// Schema is wrong, so fix it
				if (curObj.$schema !== schemaVal) {

					//webpack is throwing up whenever I use look aheads/behinds. Ugh.
					//curVal.replace(/(?<="\$schema"\s*?:\s*?")[^"]*?(?=")/, schemaVal);

					//Replaces the schema value regardless of weird tabs/spaces or where it is in the object
					const sMatch:RegExpMatchArray = curVal.match(/"\$schema"\s*?:\s*?"/);
					if (sMatch) {
						curVal = curVal.substring(0,sMatch.index) +
								 sMatch[0] +
								 schemaVal + 
								 curVal.substring(sMatch.index + sMatch[0].length + curObj.$schema.length);
						ed.setValue(curVal);
					}
				}
			}
		} catch (e) {
			//Don't do anything if the object isn't valid
		}
		return null;
	}
}