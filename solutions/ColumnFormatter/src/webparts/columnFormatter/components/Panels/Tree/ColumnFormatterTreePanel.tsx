import * as strings from 'ColumnFormatterWebPartStrings';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { Treebeard } from 'react-treebeard';
import { DefaultButton, IButtonProps, Button, PrimaryButton, IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";

import { IApplicationState } from '../../../state/State';
import styles from '../../ColumnFormatter.module.scss';
import { FormatScriptEditorDialog } from '../../FormatScript/FormatScriptEditorDialog';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import {IStyle} from 'office-ui-fabric-react/lib/Styling';

export interface ITreeNode {
	name: string;
	toggled: boolean;
	active: boolean;
	children?: Array<ITreeNode>;
	icon: string;
	id: string;
}

const treeStyles: any = {
	tree: {
		base: {
			listStyle: 'none',
			backgroundColor: '#f4f4f4',
			margin: 0,
			padding: 0,
			color: '#333333',
			fontSize: '14px'
		},
		node: {
			base: {
				position: 'relative',
				marginTop: '-1px',
			},
			subtree: {
				listStyle: 'none',
				paddingLeft: '14px'
			},
			loading: {
				color: '#666666'
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


export interface IColumnFormatterTreePanelProps {
	codeString: string;
	theme?: string;
}

export interface IColumnFormatterTreePanelState {
	treeData?: any;
	activeNodeId?: string;
	treeError?: string;
	formatScriptDialogVisible: boolean;
}

class ColumnFormatterTreePanel_ extends React.Component<IColumnFormatterTreePanelProps, IColumnFormatterTreePanelState> {

	private _treeError?: string;
	private _formatObj?: any;
	private _activeNode?: any;

	constructor(props: IColumnFormatterTreePanelProps) {
		super(props);

		this.state = {
			treeData: this.codeToTreeData(),
			treeError: this._treeError,
			formatScriptDialogVisible: false,
		};
	}

	public render(): React.ReactElement<IColumnFormatterTreePanelProps> {
		return (
			<div className={styles.panel + " " + styles.tree}>
				<span className={styles.panelHeader}>{strings.TreeView_Header}</span>
				{this.state.treeError == undefined && this.state.treeData !== undefined && (
					<Treebeard
						data={this.state.treeData}
						onToggle={this.onToggle}
						style={treeStyles}
						decorators={{
							Container: (props) => {
								return (
									<div
									 className={styles.node + (props.node.active ? " " + styles.active : "")}
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
				{this.state.treeError !== undefined && (
					<span className={styles.errorMessage}>{strings.TreeView_Error + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + this.state.treeError}</span>
				)}
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

	public componentDidUpdate(prevProps: IColumnFormatterTreePanelProps) {
		if (prevProps.codeString !== this.props.codeString) {
			let newTree: ITreeNode = this.codeToTreeData();
			this.setState({
				treeData: newTree,
				treeError: this._treeError
			});
		}
	}

	@autobind
	private onToggle(node: ITreeNode, toggled: boolean): void {
		if(typeof this._activeNode !== "undefined") {
			this._activeNode.active = false;
		}
		this._activeNode = node;
		node.active = true;
		this.setState({
			activeNodeId: node.id,
		});
		console.log(this.getElemById(node.id,[this._formatObj]));
	}

	private codeToTreeData(): ITreeNode | undefined {
		let root: ITreeNode;
		this._treeError = undefined;
		try {
			this._formatObj = JSON.parse(this.props.codeString);
			root = this.objToNode(this._formatObj, "", 0);
		} catch (e) {
			this._treeError = e.message;
			return undefined;
		}
		return root;
	}

	private objToNode(obj: any, parentId:string, index:number): ITreeNode | undefined {
		if (obj.elmType) {
			//Assign it an id
			const nodeId: string = parentId == "" ? index.toString() : `${parentId}.${index}`;

			//Process all children into nodes
			const children: Array<ITreeNode> = new Array<ITreeNode>();
			if (obj.children && obj.children.length) {
				for (var i = 0; i < obj.children.length; i++) {
					let node: ITreeNode = this.objToNode(obj.children[i], nodeId, i);
					if (node !== undefined) {
						children.push(node);
					}
				}
			}

			//Display text for the node
			let name: string = '<' + obj.elmType.toLowerCase() + '>';

			return {
				name: name,
				toggled: true,
				active: false,
				children: children.length > 0 ? children : undefined,
				icon: this.elmIcon(obj.elmType),
				id: nodeId,
			};
		}
		return undefined;
	}

	private elmIcon(elmType: string): string {
		switch (elmType.toLowerCase()) {
			case "div":
				return "Product";
			case "button":
				return "ToggleBorder";
			case "span":
				return "AlignLeft";
			case "a":
				return "Link";
			case "img":
				return "Photo2";
			case "svg":
				return "Puzzle";
			case "path":
				return "MapDirections";
			default:
				return "Unknown";
		}
	}

	private getElemById(nodeId:string, siblings:Array<any>): any {
		let index:number = parseInt(nodeId);
		if(nodeId.indexOf(".") !== -1) {
			return this.getElemById(nodeId.substring(nodeId.indexOf(".")+1),siblings[index].children);
		}
		return siblings[index];
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

function mapStateToProps(state: IApplicationState): IColumnFormatterTreePanelProps {
	return {
		codeString: state.code.formatterString,
		theme: state.code.editorTheme,
	};
}

export const ColumnFormatterTreePanel = connect(mapStateToProps, null)(ColumnFormatterTreePanel_);