import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { ColumnFormattingSchema, ColumnFormattingSchemaURI } from '../../../helpers/ColumnFormattingSchema';
import styles from '../../ColumnFormatter.module.scss';

const monaco = require('../../../../../MonacoCustomBuild');

export interface IMonacoEditorProps {
	value: string;
	theme: string;
	readOnly: boolean;
	showLineNumbers: boolean;
	showMiniMap: boolean;
	showIndentGuides: boolean;
	onValueChange: (newValue:string, validationErrors:Array<string>) => void;
}

export class MonacoEditor extends React.Component<IMonacoEditorProps, {}> {

	private _container: HTMLElement;
	private _editor: any;

	public componentDidMount(): void {
		//Add Column Formatter Schema for validation
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			schemas: [{
				uri: ColumnFormattingSchemaURI,
				schema: ColumnFormattingSchema
			}],
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
}