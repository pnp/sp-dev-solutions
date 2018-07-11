import * as strings from "ColumnFormatterWebPartStrings";
import { Icon, IIconStyles } from "office-ui-fabric-react/lib/Icon";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { connect } from "react-redux";
import { Treebeard } from "react-treebeard";
import { ITreeNode } from "./ITreeNode";

import { IApplicationState } from "../../../state/State";
import styles from "../../ColumnFormatter.module.scss";

const treeStyles: any = {
	tree: {
		base: {
			listStyle: 'none',
			backgroundColor: '#f4f4f4',
			margin: 0,
			padding: 0,
			color: '#333333',
			fontSize: '14px',
			width: "100%",
		},
		node: {
			base: {
				position: 'relative',
				marginTop: '-1px',
			},
			subtree: {
				listStyle: 'none',
				paddingLeft: '14px',
			},
			loading: {
				color: '#666666',
			}
		}
	}
};

const treeIconStyles: Partial<IIconStyles> = {
	root: {
		width: "14px",
		height: "100%",
		padding: "2px 4px",
		fontSize: "14px",
		lineHeight: "14px",
		verticalAlign: "bottom",
	},
};


export interface ITreeViewProps {
	onSelectNode?: (nodeId:string|undefined) => void;
	nodes?: ITreeNode;
	error?: string;
	activeNodeId?: string;
}

export class TreeView extends React.Component<ITreeViewProps, {}> {

	public render(): React.ReactElement<ITreeViewProps> {
		return (
			<div className={styles.panel + " " + styles.tree}>
				<span className={styles.panelHeader}>{strings.TreeView_Header}</span>
				{this.props.error == undefined && this.props.nodes !== undefined && (
					<Treebeard
						data={this.props.nodes}
						onToggle={this.activateNode}
						style={treeStyles}
						decorators={{
							Container: (props) => {
								return (
									<div
									className={styles.node + (props.node.id == this.props.activeNodeId ? " " + styles.active : "")}
									onClick={props.onClick}>

										<Icon
										iconName={props.node.icon}
										styles={treeIconStyles}
										title={props.node.id}/>
										<span>{props.node.name}</span>
									</div>
								);
							}
						}} />
				)}
				{this.props.error !== undefined && (
					<span className={styles.errorMessage}>{strings.TreeView_Error + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + this.props.error}</span>
				)}
			</div>
		);
	}

	@autobind
	private activateNode(node: ITreeNode, toggled: boolean): void {
		this.props.onSelectNode(node.id);
	}

}