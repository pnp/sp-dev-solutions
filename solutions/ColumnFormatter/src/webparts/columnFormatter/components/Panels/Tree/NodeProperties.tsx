import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../../../state/State";
import styles from "../../ColumnFormatter.module.scss";
import { FormatScriptEditorDialog } from "../../FormatScript/FormatScriptEditorDialog";

var SplitPane = require('react-split-pane');

export interface INodePropertiesProps {
	activeNodeId?: string;
	theme?: string;
}

export interface INodePropertiesState {
	propFilter: string;

	formatScriptDialogVisible: boolean;
}

class NodeProperties_ extends React.Component<INodePropertiesProps, INodePropertiesState> {

	constructor(props: INodePropertiesProps) {
		super(props);

		this.state = {
			propFilter: "relevant",
			formatScriptDialogVisible: false,
		};
	}

	public render(): React.ReactElement<INodePropertiesProps> {
		return (
			<div className={styles.panel + " " + styles.treeProps}>
				<table className={styles.headerTable} cellPadding={0} cellSpacing={0}>
					<tbody>
						<tr>
							<td>
								<span className={styles.panelHeader}>Properties</span>
							</td>
							<td>
								<Dropdown
								 selectedKey={this.state.propFilter}
								 onChanged={(item:IDropdownOption): void => {this.setState({propFilter:item.key.toString()});}}
								 calloutProps={{className:styles.treeProps}}
								 options={[
									{key:"relevant", text:"Relevant"},
									{key: "current", text:"Current"},
									{key: "all", text:"All"}
								 ]}/>
							</td>
						</tr>
					</tbody>
				</table>
				<DefaultButton text="fx" onClick={this.onFxButtonClick} />
							<FormatScriptEditorDialog
								initialValue='SWITCH(@currentField,"Done","green","In Progress","yellow","red")'
								theme={this.props.theme}
								visible={this.state.formatScriptDialogVisible}
								dialogTitle="Format Script"
								onCancel={() => { this.setState({ formatScriptDialogVisible: false }); }}
								onSave={this.onFormatScriptEditorSave}
							/>
			</div>
		);
	}

	@autobind
	private onFxButtonClick(): void {
		this.setState({
			formatScriptDialogVisible: true,
		});
	}

	@autobind
	private onFormatScriptEditorSave(result: any): void {
		//TODO add node ref to properly map changes to virtualFormat
		console.log('Saved!');
		console.log(JSON.stringify(result));

		this.setState({
			formatScriptDialogVisible: false,
		});
	}

}

function mapStateToProps(state: IApplicationState): INodePropertiesProps {
	return {
		activeNodeId:"",
		theme: state.code.editorTheme,
	};
}

export const NodeProperties = connect(mapStateToProps, null)(NodeProperties_);