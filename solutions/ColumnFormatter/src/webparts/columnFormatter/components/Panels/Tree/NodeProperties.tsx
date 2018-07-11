import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { formatterType } from "../../../state/State";
import { ColumnFormattingSchemaURI } from "../../../helpers/ColumnFormattingSchema";
import { ViewFormattingSchemaURI } from "../../../helpers/ViewFormattingSchema";

import styles from "../../ColumnFormatter.module.scss";
import { FormatScriptEditorDialog } from "../../FormatScript/FormatScriptEditorDialog";

export interface INodePropertiesProps {
	propUpdated?: (property:string, value:any) => void;
	isRoot: boolean;
	node?: any;
	formatType: formatterType;
}

export interface INodePropertiesState {
	propFilter: string;

	//TO BE MOVED
	formatScriptDialogVisible: boolean;
}

export class NodeProperties extends React.Component<INodePropertiesProps, INodePropertiesState> {

	constructor(props: INodePropertiesProps) {
		super(props);

		console.log('Props Node:');
		console.log(this.props.node);

		this.state = {
			propFilter: "relevant",
			formatScriptDialogVisible: false,
		};
	}

	public render(): React.ReactElement<INodePropertiesProps> {
		const nodeProps = this.buildProps(this.props.node, this.props.isRoot, this.props.formatType);

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
								 disabled={typeof this.props.node == "undefined"}
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
				<table className={styles.propertyTable} cellPadding={0} cellSpacing={0}>
					<tbody>
						{nodeProps.filter((nodeProp:INodeProperty) => {
							return this.state.propFilter == "all"
								|| (this.state.propFilter == "current" && nodeProp.current)
								|| (this.state.propFilter == "relevant" && nodeProp.relevant);
						}).map((nodeProp:INodeProperty) => {
							return (
								<tr>
									<td>
										<span>{nodeProp.name}</span>
									</td>
									<td>
										<span>{nodeProp.value}</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<DefaultButton text="fx" onClick={this.onFxButtonClick} />
							<FormatScriptEditorDialog
								initialValue='SWITCH(@currentField,"Done","green","In Progress","yellow","red")'
								visible={this.state.formatScriptDialogVisible}
								dialogTitle="Format Script"
								onCancel={() => { this.setState({ formatScriptDialogVisible: false }); }}
								onSave={this.onFormatScriptEditorSave}
							/>
			</div>
		);
	}

	private buildProps(node:any, isRoot:boolean, formatType:formatterType): Array<INodeProperty> {
		const props = new Array<INodeProperty>();

		if(typeof node !== "undefined") {
			let elmType: string = node.hasOwnProperty("elmType") ? node.elmType : this.defaultPropValue("elmType", formatType);

			//ViewFormatting root properties
			if(isRoot && formatType == formatterType.View) {
				return [
					
				];
			}
			
			//ColumnFormatting additional Root Properties
			if(isRoot) {
				props.push(...[
					this.buildProp("$schema",node,elmType,formatType),
					this.buildProp("debugMode",node,elmType,formatType)
				]);
			}

			//Column Formatting/RowFormatter properties
			props.push(...[
				this.buildProp("elmType",node,elmType,formatType),
				this.buildProp("txtContent",node,elmType,formatType)
			]);
		}

		return props;
	}
	
	private buildProp(propertyName:string, node:any, elmType:string, formatType:formatterType): INodeProperty {
		return {
			name:propertyName,
			type:this.propType(propertyName, formatType),
			value:node.hasOwnProperty(propertyName) ? node[propertyName] : this.defaultPropValue(propertyName, formatType),
			current:node.hasOwnProperty(propertyName),
			relevant:this.isRelevantProp(propertyName, elmType, formatType),
			supportsExpression: this.supportsExpression(propertyName, formatType)
		};
	}

	private propType(propertyName:string, formatType:formatterType): NodePropType {
		switch (propertyName) {
			case "elmType":
				return NodePropType.dropdown;
			case "debugMode":
				return NodePropType.toggle;
			default:
				return NodePropType.text;
		}
	}

	private defaultPropValue(propertyName:string, formatType:formatterType): any {
		switch (propertyName) {
			case "$schema":
				return formatType == formatterType.Column ? ColumnFormattingSchemaURI : ViewFormattingSchemaURI;
			case "debugMode":
				return false;
			case "elmType":
				return "div";
		}
	}

	private isRelevantProp(propertyName:string, elmType: string, formatType:formatterType): boolean {
		switch (propertyName) {
			case "$schema":
			case "debugMode":
			case "elmType":
				return true;
		}
		return false;
	}

	private supportsExpression(propertyName:string, formatType:formatterType): boolean {
		switch (propertyName) {
			case "$schema":
			case "debugMode":
			case "elmType":
			case "style":
			case "customRowAction":
				return false;
			default:
				return true;
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

export enum NodePropType {
	text,
	dropdown,
	combobox,
	toggle
}

export interface INodeProperty {
	name: string;
	type: NodePropType;
	value: any;
	current: boolean;
	relevant: boolean;
	supportsExpression: boolean;
	expression?: string;
}