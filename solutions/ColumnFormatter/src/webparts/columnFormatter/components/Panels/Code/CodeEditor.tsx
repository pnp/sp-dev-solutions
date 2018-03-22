import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '../../../state/State';
import { updateEditorString } from './../../../state/Actions';
import { MonacoEditor } from './MonacoEditor';

export interface ICodeEditorProps {
	theme?:string;
	editorString?:string;
	readOnly?: boolean;
	showLineNumbers?: boolean;
	showMiniMap?: boolean;
	showIndentGuides?: boolean;

	updateEditorString?: (editorString:string, validationErrors:Array<string>) => void;

	//only subscribed so that the editor will be updated and know to
	// recalculate layout
	mainPane?:number;
	splitPane?:number;
	uiHeight?:number;
}

export interface ICodeEditorState {
	//code: string;
}

class CodeEditor_ extends React.Component<ICodeEditorProps, ICodeEditorState> {

	constructor(props: ICodeEditorProps) {
		super(props);
	}

	public render(): React.ReactElement<ICodeEditorProps> {
		return (
			<MonacoEditor
				value={this.props.editorString}
				theme={this.props.theme}
				readOnly={this.props.readOnly}
				onValueChange={this.props.updateEditorString}
				showLineNumbers={this.props.showLineNumbers}
				showMiniMap={this.props.showMiniMap}
				showIndentGuides={this.props.showIndentGuides}
			/>
		);
	}
}

function mapStateToProps(state: IApplicationState): ICodeEditorProps{
	return {
		theme: state.code.editorTheme,
		editorString: state.code.editorString,
		readOnly: state.ui.tabs.wizardTabVisible,
		mainPane: state.ui.panes.main,
		splitPane: state.ui.panes.split,
		uiHeight: state.ui.height,
		showLineNumbers: state.code.showLineNumbers,
		showMiniMap: state.code.showMiniMap,
		showIndentGuides: state.code.showIndentGuides
	};
}

function mapDispatchToProps(dispatch: Dispatch<ICodeEditorProps>): ICodeEditorProps{
	return {
		updateEditorString: (editorString:string, validationErrors:Array<string>) => {
			dispatch(updateEditorString(editorString, validationErrors));
		}
    };
}

export const CodeEditor = connect(mapStateToProps, mapDispatchToProps)(CodeEditor_);