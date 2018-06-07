import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

import styles from "../ColumnFormatter.module.scss";
import {
    formatScriptCompletionProvider,
    formatScriptConfig,
    formatScriptId,
    formatScriptTheme,
    formatScriptToJSON,
    formatScriptTokens,
    IFSParseError,
    IFSParseResult,
} from "./FormatScript";

const monaco = require('../../../../MonacoCustomBuild');

export interface IFormatScriptEditorProps {
	initialValue: string;
	theme: string;
	onValueChanged: (IFSParseResult) => void;
}

export class FormatScriptEditor extends React.Component<IFormatScriptEditorProps, {}> {

	private _container: HTMLElement;
	private _editor: any;
	
	public componentDidMount(): void {

		//Register the FormatScript language
		monaco.languages.register({
			id: formatScriptId,
		});

		//Register custom tokens for FormatScript
		monaco.languages.setMonarchTokensProvider(formatScriptId, formatScriptTokens());

		//Customize theme for FormatScript
		monaco.editor.defineTheme(formatScriptId + 'Theme', formatScriptTheme(this.props.theme!=='vs'));

		//Provide configuration for FormatScript
		monaco.languages.setLanguageConfiguration(formatScriptId, formatScriptConfig());

		//Register Completion Provider FormatScript
		monaco.languages.registerCompletionItemProvider(formatScriptId, formatScriptCompletionProvider());

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
			value: this.props.initialValue,
			scrollBeyondLastLine: false,
			theme: formatScriptId + 'Theme',
			language: formatScriptId,
			renderIndentGuides: false,
			lineNumbers: false,
			minimap: {
				enabled: false,
			},
			wordWrap: "on",
		});

		//Subscribe to changes
		this._editor.onDidChangeModelContent(this.onDidChangeModelContent);
	}

	public componentDidUpdate(prevProps:IFormatScriptEditorProps) {
		/*if(this.props.value !== prevProps.value) {
			if(this._editor) {
				this._editor.setValue(this.props.value);
			}
		}*/
		if(this.props.theme !== prevProps.theme) {
			monaco.editor.setTheme(this.props.theme);
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

	public render(): React.ReactElement<IFormatScriptEditorProps> {
		return (
			<div ref={(container) => this._container = container!} className={styles.formatScriptEditor} />
		);
	}

	@autobind
	private onDidChangeModelContent(e:any): void {
		if(this._editor) {
			const curVal:string = this._editor.getValue();
			// Attempt Transpile
			const parseResult:IFSParseResult = formatScriptToJSON(curVal);
			const editorErrors = new Array<any>();
			if (parseResult.errors.length > 0) {
				//Build Editor Errors
				parseResult.errors.forEach((val:IFSParseError) => {
					if (typeof val.loc !== "undefined") {
						editorErrors.push({
							severity: 8, //Error
							startLineNumber: val.loc.start.line,
							startColumn: val.loc.start.column,
							endLineNumber: val.loc.end.line,
							endColumn: val.loc.end.column,
							message: val.message,
						});
					}
				});
			}
			// Will either create errors, or remove (by sending empty array)
			monaco.editor.setModelMarkers(this._editor.getModel(), "FS", editorErrors);

			this.props.onValueChanged(parseResult);
		}
	}
}