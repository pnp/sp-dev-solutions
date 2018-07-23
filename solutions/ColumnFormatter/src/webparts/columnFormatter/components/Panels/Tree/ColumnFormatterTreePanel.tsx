import { set, update } from "@microsoft/sp-lodash-subset";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { updateEditorString } from "../../../state/Actions";
import { formatterType, IApplicationState } from "../../../state/State";
import styles from "../../ColumnFormatter.module.scss";
import { ITreeNode } from "./ITreeNode";
import { NodeProperties } from "./NodeProperties";
import { TreeView } from "./TreeView";

var SplitPane = require('react-split-pane');


export interface IColumnFormatterTreePanelProps {
	codeString?: string;
	formatType?: formatterType;

	updateEditorString?: (editorString:string, validationErrors:Array<string>) => void;
}

export interface IColumnFormatterTreePanelState {
	treeData?: ITreeNode;
	treeError?: string;
	activeNodeId?: string;
	activeNode?: any;
	paneSize: number;
}

class ColumnFormatterTreePanel_ extends React.Component<IColumnFormatterTreePanelProps, IColumnFormatterTreePanelState> {

	private _treeError?: string;
	private _formatObj?: any;

	constructor(props: IColumnFormatterTreePanelProps) {
		super(props);

		this.state = {
			paneSize: 150,
			treeData: this.codeToTreeData(),
			treeError: this._treeError,
		};
	}

	public render(): React.ReactElement<IColumnFormatterTreePanelProps> {
		return (
			<SplitPane
			 split="horizontal"
			 className={styles.SplitPaneInTab}
			 size={this.state.paneSize}
			 onDragFinished={(size:number) => {this.setState({paneSize:size});}}
			 minSize={60}
			 maxSize={-60}>
				<TreeView
				 nodes={this.state.treeData}
				 error={this.state.treeError}
				 onSelectNode={this.selectNode}
				 removeNode={this.removeNode}
				 addNode={this.addNode}
				 activeNodeId={this.state.activeNodeId}/>
				<NodeProperties
				 node={this.state.activeNode}
				 isRoot={this.state.activeNodeId == "0"}
				 formatType={this.props.formatType}
				 propUpdated={this.propUpdated}/>
			</SplitPane>
		);
	}

	public componentDidUpdate(prevProps: IColumnFormatterTreePanelProps) {
		if (prevProps.codeString !== this.props.codeString) {
			let newTree: ITreeNode = this.codeToTreeData();
			let node: any = this.getElemById(this.state.activeNodeId,[this._formatObj]);
			this.setState({
				treeData: newTree,
				treeError: this._treeError,
				activeNodeId: typeof node == "undefined" ? undefined : this.state.activeNodeId,
				activeNode: node,
			});
		}
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

	@autobind
	private selectNode(nodeId:string|undefined): void {
		this.setState({
			activeNodeId: nodeId,
			activeNode: this.getElemById(nodeId,[this._formatObj]),
		});
	}

	private getElemById(nodeId:string, siblings:Array<any>): any {
		if(typeof nodeId == "undefined" || typeof siblings == "undefined") {
			return undefined;
		}
		let index:number = parseInt(nodeId);
		if(siblings.length-1 < index) {
			return undefined;
		}

		if(nodeId.indexOf(".") !== -1) {
			return this.getElemById(nodeId.substring(nodeId.indexOf(".")+1),siblings[index].children);
		}
		return siblings[index];
	}

	private idToPath(nodeId:string, property:string = undefined): string {
		if(nodeId.indexOf(".") == -1) {
			return property || "";
		}
		const childId = nodeId.substring(nodeId.indexOf(".")+1);
		const address = `children[${childId.replace(/\./g,"].children[")}]`;
		if (typeof property !== "undefined" && property.length > 0) {
			return `${address}.${property}`;
		}
		return address;
	}

	@autobind
	private propUpdated(propertyAddress:string, value:any): void {
		let validationErrors:Array<string> = new Array<string>();
		try {
			set(this._formatObj, this.idToPath(this.state.activeNodeId, propertyAddress), value);
		} catch (e) {
			validationErrors.push(e.message);
		}
		this.props.updateEditorString(JSON.stringify(this._formatObj, null, 2), validationErrors);
	}

	@autobind 
	private removeNode(nodeId:string): void {
		let validationErrors:Array<string> = new Array<string>();
		try {
			if (nodeId.indexOf(".") !== -1) {
				const parentId = nodeId.substring(0,nodeId.lastIndexOf("."));
				const childIndex = parseInt(nodeId.substring(nodeId.lastIndexOf(".")+1));

				if(parentId == "0") {
					if(this._formatObj.children.length > 1) {
						this._formatObj.children.splice(childIndex,1);
					} else {
						delete(this._formatObj.children);
					}
				} else {
					update(this._formatObj, this.idToPath(parentId), (parent:any) => {
						if(parent.children.length > 1) {
							parent.children.splice(childIndex,1);
						} else {
							delete(parent.children);
						}
						return parent;
					});
				}
			}
		} catch (e) {
			validationErrors.push(e.message);
		}
		this.props.updateEditorString(JSON.stringify(this._formatObj, null, 2), validationErrors);
	}

	@autobind 
	private addNode(parentNodeId:string): void {
		let validationErrors:Array<string> = new Array<string>();
		let newNodeId:string = parentNodeId;
		try {
			if(parentNodeId == "0") {
				if(!this._formatObj.hasOwnProperty("children")) {
					this._formatObj.children = [];
				}
				this._formatObj.children.push({elmType:"div"});
				newNodeId = `${parentNodeId}.${this._formatObj.children.length - 1}`;
			} else {
				update(this._formatObj, this.idToPath(parentNodeId), (parent:any) => {
					if(!parent.hasOwnProperty("children")) {
						parent.children = [];
					}
					parent.children.push({elmType:"div"});
					newNodeId = `${parentNodeId}.${parent.children.length - 1}`;
					return parent;
				});
			}
		} catch (e) {
			validationErrors.push(e.message);
		}
		this.selectNode(newNodeId);
		this.props.updateEditorString(JSON.stringify(this._formatObj, null, 2), validationErrors);
	}
	
}

function mapStateToProps(state: IApplicationState): IColumnFormatterTreePanelProps {
	return {
		codeString: state.code.formatterString,
		formatType: state.code.formatType,
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterTreePanelProps>): IColumnFormatterTreePanelProps{
	return {
		updateEditorString: (editorString:string, validationErrors:Array<string>) => {
			dispatch(updateEditorString(editorString, validationErrors));
		},
    };
}

export const ColumnFormatterTreePanel = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterTreePanel_);
