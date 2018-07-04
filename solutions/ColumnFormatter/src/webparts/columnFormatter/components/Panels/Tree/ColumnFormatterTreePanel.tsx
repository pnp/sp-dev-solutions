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
			//fontFamily: 'unset',
			fontSize: '14px'
		},
		node: {
			base: {
				position: 'relative'
			},
			/*link: {
				cursor: 'pointer',
				position: 'relative',
				padding: '0px 5px',
				display: 'block',
				whiteSpace: 'nowrap'
			},
			activeLink: {
				background: '#ffffff'
			},
			toggle: {
				base: {
					position: 'relative',
					display: 'inline-block',
					verticalAlign: 'top',
					marginLeft: '-5px',
					height: '24px',
					width: '24px'
				},
				wrapper: {
					position: 'absolute',
					top: '50%',
					left: '50%',
					margin: '-9px 0 0 -3px',
					height: '14px'
				},
				height: 10,
				width: 10,
				arrow: {
					fill: '#666666',
					strokeWidth: 0
				}
			},
			header: {
				base: {
					display: 'inline-block',
					verticalAlign: 'top',
					color: '#333333'
				},
				connector: {
					width: '2px',
					height: '12px',
					borderLeft: 'solid 2px black',
					borderBottom: 'solid 2px black',
					position: 'absolute',
					top: '0px',
					left: '-21px'
				},
				title: {
					lineHeight: '24px',
					verticalAlign: 'middle'
				}
			},*/
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

const rootToggleStyle: Partial<IStyle> = {
	width: "14px",
	height: "14px",
	padding: "0",
	paddingRight: "3px",
};

const expandedToggleStyles: Partial<IButtonStyles> = {
	root: {
		...rootToggleStyle,
		verticalAlign: "sub",
	},
	icon: {
		fontSize: "15px",
		lineHeight: "14px",
	}
};

const collapsedToggleStyles: Partial<IButtonStyles> = {
	...expandedToggleStyles,
	root: {
		...rootToggleStyle,
		verticalAlign: "middle",
	},
	icon: {
		fontSize: "10px",
		lineHeight: "14px",
	}
};

const rootIconStyle: Partial<IStyle> = {
	width: "14px",
	height: "100%",
	padding: "0",
	paddingRight: "2px",
	fontSize: "14px",
	lineHeight: "14px",
	cursor: "default",
	verticalAlign: "middle",
};

const parentIconStyles: Partial<IIconStyles> = {
	root: {
		...rootIconStyle
	}
};

const terminalIconStyles: Partial<IIconStyles> = {
	root: {
		...rootIconStyle,
		paddingLeft: "16px",
	}
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
								console.log(props);
								return (
									<div className={styles.node + (props.node.active ? " " + styles.active : "")}>
										{!props.terminal &&
											<IconButton
												iconProps={{iconName: props.node.toggled ? "CaretSolid" : "CaretSolidRight"}}
												onClick={props.onClick}
												styles={props.node.toggled ? expandedToggleStyles : collapsedToggleStyles}/>
										}
										<span
											className={styles.nodeBody}
											onClick={() => {this.onSelectNode(props.node.id);}}>
											<Icon
												iconName={props.node.icon}
												styles={props.terminal ? terminalIconStyles : parentIconStyles}
												title={props.node.id}/>
											<span className={styles.nodeName}>{props.node.name}</span>
										</span>
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
	private onToggle(node: any, toggled: boolean): void {
		//node.active = true;
		if (node.children) {
			node.toggled = toggled;
		}
	}

	@autobind
	private onSelectNode(nodeId:string): void {
		this.setState({
			activeNodeId: nodeId,
		});
	}

	private codeToTreeData(): ITreeNode | undefined {
		let root: ITreeNode;
		this._treeError = undefined;
		try {
			let curObj: any = JSON.parse(this.props.codeString);
			root = this.objToNode(curObj, "", 1);
		} catch (e) {
			this._treeError = e.message;
			return undefined;
		}
		return root;
	}

	private objToNode(obj: any, parentId:string, index:number): ITreeNode | undefined {
		if (obj.elmType) {
			const nodeId: string = parentId == "" ? index.toString() : `${parentId}.${index}-${obj.elmType.toLowerCase()}`;
			const children: Array<ITreeNode> = new Array<ITreeNode>();
			if (obj.children && obj.children.length) {
				for (var i = 0; i < obj.children.length; i++) {
					let node: ITreeNode = this.objToNode(obj.children[i], nodeId, i+1);
					if (node !== undefined) {
						children.push(node);
					}
				}
			}

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