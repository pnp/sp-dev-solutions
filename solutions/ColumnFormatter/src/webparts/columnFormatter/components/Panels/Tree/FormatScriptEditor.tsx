import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import styles from '../../ColumnFormatter.module.scss';
import { formatScriptTokens, formatScriptThemeRules } from './FormatScript';

const monaco = require('../../../../../MonacoCustomBuild');

export interface IFormatScriptEditorProps {
	value: string;
	theme: string;
	//onValueChange: (newValue:string, validationErrors:Array<string>) => void;
}

export class FormatScriptEditor extends React.Component<IFormatScriptEditorProps, {}> {

	private _container: HTMLElement;
	private _editor: any;

	public componentDidMount(): void {

		//Register the FormatScript language
		monaco.languages.register({
			id: 'FormatScript'
		});

		//Register custom tokens for FormatScript
		monaco.languages.setMonarchTokensProvider('FormatScript', formatScriptTokens());

		//Customize theme for FormatScript
		monaco.editor.defineTheme('FormatScriptTheme', {
			base: this.props.theme,
			inherit: true,
			rules: formatScriptThemeRules()
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
			theme: 'FormatScriptTheme',
			language: 'FormatScript',
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
		if(this.props.value !== prevProps.value) {
			if(this._editor) {
				this._editor.setValue(this.props.value);
			}
		}
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
			let curVal:string = this._editor.getValue();
			// Attempt Transpile
		}
	}
}