import * as strings from "ColumnFormatterWebPartStrings";
import { IButtonStyles, IconButton } from "office-ui-fabric-react/lib/Button";
import { Icon, IIconStyles } from "office-ui-fabric-react/lib/Icon";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { Treebeard } from "react-treebeard";

import styles from "../../ColumnFormatter.module.scss";
import { ITreeNode } from "./ITreeNode";

const treeStyles: any = {
	tree: {
		base: {
			listStyle: 'none',
			backgroundColor: 'transparent',
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

const propButtonStyles: Partial<IButtonStyles> = {
	root: {
		width: "14px",
		height: "18px",
		padding: "0",
		marginRight: "2px",
	},
	icon: {
		fontSize: "11px",
		lineHeight: "18px",
	},
};


export interface ITreeViewProps {
	onSelectNode?: (nodeId:string|undefined) => void;
	removeNode?: (nodeId:string) => void;
	addNode?: (parentNodeId:string) => void;
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
									<div className={styles.node + (props.node.id == this.props.activeNodeId ? " " + styles.active : "")}>

										<div className={styles.floatingContent} onClick={props.onClick}>
											<Icon
											 iconName={props.node.icon}
											 styles={treeIconStyles}/>
											<span>{props.node.name}</span>
										</div>

										
										<div className={styles.floatingButton}>
											{props.node.id !== "0" &&
												<IconButton
												 iconProps={{
													iconName: "Delete",
													className: "ms-fontColor-redDark--hover"}}
												 title={strings.TreeView_RemoveElement}
												 styles={propButtonStyles}
												 onClick={()=>{
													this.props.removeNode(props.node.id);
												 }}/>
											}
											{props.node.id == "0" && 
												<span>&nbsp;</span>
											}
										</div>

										<div className={styles.floatingButton}>
											<IconButton
											 iconProps={{
												iconName: "RowsChild",
												className: "ms-fontColor-themeDark--hover"}}
											 title={strings.TreeView_AddElement}
											 styles={propButtonStyles}
											 onClick={()=>{
												this.props.addNode(props.node.id);
											 }}/>
										</div>
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