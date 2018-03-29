import * as strings from 'ColumnFormatterWebPartStrings';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { Treebeard } from 'react-treebeard';

import { IApplicationState } from '../../../state/State';
import styles from '../../ColumnFormatter.module.scss';

export interface ITreeNode {
	name: string;
	toggled: boolean;
	active: boolean;
	children?: Array<ITreeNode>;
}

const treeStyles:any = {
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
				link: {
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
				},
				subtree: {
						listStyle: 'none',
						paddingLeft: '19px'
				},
				loading: {
						color: '#666666'
				}
		}
	}
};

export interface IColumnFormatterTreePanelProps {
	codeString:string;
}

export interface IColumnFormatterTreePanelState {
	treeData?: any;
	activeNode?: any;
	treeError?: string;
}

class ColumnFormatterTreePanel_ extends React.Component<IColumnFormatterTreePanelProps, IColumnFormatterTreePanelState> {

	private _treeError?:string;

	constructor(props:IColumnFormatterTreePanelProps) {
		super(props);

		this.state = {
			treeData: this.codeToTreeData(),
			treeError: this._treeError
		};
	}

	public render(): React.ReactElement<IColumnFormatterTreePanelProps> {
		return (
		  <div className={styles.panel}>
				<span className={styles.panelHeader}>{strings.TreeView_Header}</span>
				{this.state.treeError == undefined && this.state.treeData !== undefined && (
					<Treebeard
					 data={this.state.treeData}
					 onToggle={this.onToggle}
					 style={treeStyles}/>
				)}
				{this.state.treeError !== undefined && (
					<span className={styles.errorMessage}>{strings.TreeView_Error + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + this.state.treeError}</span>
				)}
		  </div>
		);
	}

	public componentDidUpdate(prevProps:IColumnFormatterTreePanelProps) {
		if(prevProps.codeString !== this.props.codeString) {
			let newTree:ITreeNode = this.codeToTreeData();
			this.setState({
				treeData: newTree,
				treeError: this._treeError
			});
		}
	}

	@autobind
	private onToggle(node:any, toggled:boolean): void {
		node.active = true;
		if(node.children) {
			node.toggled = toggled;
		}
		this.setState({
			activeNode: node
		});
	}

	private codeToTreeData(): ITreeNode | undefined {
		let root:ITreeNode;
		this._treeError = undefined;
		try {
			let curObj:any = JSON.parse(this.props.codeString);
			root = this.objToNode(curObj);
    } catch (e) {
      this._treeError = e.message;
			return undefined;
		}
		return root;
	}

	private objToNode(obj:any): ITreeNode | undefined {
		let children: Array<ITreeNode> = new Array<ITreeNode>();
		if(obj.children && obj.children.length) {
			for(var i=0; i<obj.children.length; i++) {
				let node:ITreeNode = this.objToNode(obj.children[i]);
				if(node !== undefined) {
					children.push(node);
				}
			}
		}
		if(obj.elmType) {
			let name:string = '<' + obj.elmType + ':';
			if(obj.txtContent) {
				if(typeof obj.txtContent == 'string') {
					name += ' ' + obj.txtContent;
				} else {
					if(obj.txtContent.operator) {
						name += ' [calculated]';
					}
				}
			}
			return {
				name: name,
				toggled: true,
				active: true,
				children: children.length > 0 ? children : undefined
			};
		}
		return undefined;
	}

}

function mapStateToProps(state: IApplicationState): IColumnFormatterTreePanelProps{
	return {
		codeString: state.code.formatterString
	};
}

export const ColumnFormatterTreePanel = connect(mapStateToProps,null)(ColumnFormatterTreePanel_);