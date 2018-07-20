import { autobind } from 'office-ui-fabric-react';
import * as React from 'react';

import styles from '../../components/SiteDesignsStudio.module.scss';


const monaco = require('../../../../MonacoCustomBuild');

export interface IMonacoEditorProps {
	value: string;
  readOnly: boolean;
  schema: any;
  schemaUri?: string;
	onValueChange: (newValue:string, validationErrors:Array<string>) => void;
}

export class MonacoEditor extends React.Component<IMonacoEditorProps, {}> {

	private _container: HTMLElement;
	private _editor: any;

	public componentDidMount(): void {
		//Add Column Formatter Schema for validation
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			schemas: [{
				uri: this.props.schemaUri || 'schema.json',
				schema: this.props.schema
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

		//Create the editor
		this._editor = monaco.editor.create(this._container, {
			value: this.props.value,
      scrollBeyondLastLine: false,
      theme: 'vs',
			language: 'json',
			folding: true,
			renderIndentGuides: true,
			readOnly: this.props.readOnly,
			lineNumbers: true,
			//lineNumbersMinChars: 4,
			minimap: {
				enabled: false
			}
		});

		//Subscribe to changes
    this._editor.onDidChangeModelContent(this.onDidChangeModelContent);

    this._editor.layout();
	}

	public componentDidUpdate(prevProps:IMonacoEditorProps) {
		if(this.props.value !== prevProps.value) {
			if(this._editor) {
				this._editor.setValue(this.props.value);
			}
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
