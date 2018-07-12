import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

import { ColumnFormattingSchemaURI } from "../../../helpers/ColumnFormattingSchema";
import { ViewFormattingSchemaURI } from "../../../helpers/ViewFormattingSchema";
import { formatterType } from "../../../state/State";
import styles from "../../ColumnFormatter.module.scss";
import { FormatScriptEditorDialog } from "../../FormatScript/FormatScriptEditorDialog";
import { INodeProperty, NodePropType } from "./INodeProperty";

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

		this.state = {
			propFilter: "relevant",
			formatScriptDialogVisible: false,
		};
	}

	public render(): React.ReactElement<INodePropertiesProps> {
		const nodeProps = this.buildProps(this.props.node, this.props.isRoot, this.props.formatType).filter(this.filterPropsForView);
		const nodePropsAttributes = this.buildPropsAttributes(this.props.node, this.props.isRoot, this.props.formatType).filter(this.filterPropsForView);

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
				{(nodeProps.length > 0 || nodePropsAttributes.length > 0) &&
					<table className={styles.propertyTable} cellPadding={0} cellSpacing={0}>
						<tbody>
							{nodeProps.map((nodeProp:INodeProperty) => {
								return (
									<tr key={nodeProp.name}>
										<td className={styles.propertyLabel + (nodeProp.current ? " " + styles.current : "") + (nodeProp.relevant ? " " + styles.relevant : "")}>
											<span>{nodeProp.name}</span>
										</td>
										<td>
											<span>{nodeProp.value}</span>
										</td>
									</tr>
								);
							})}
							{nodePropsAttributes.map((nodeProp:INodeProperty) => {
								return (
									<tr key={nodeProp.name}>
										<td className={styles.propertyLabel + (nodeProp.current ? " " + styles.current : "") + (nodeProp.relevant ? " " + styles.relevant : "")  + (nodeProp.invalidValue ? " " + styles.invalid : "")}>
											<span>{nodeProp.name}</span>
										</td>
										<td>
											<span>{nodeProp.invalidValue ? "INVALID" : nodeProp.value}</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				}
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

	@autobind
	private filterPropsForView(nodeProp:INodeProperty):boolean {
		return this.state.propFilter == "all"
			|| (this.state.propFilter == "current" && nodeProp.current)
			|| (this.state.propFilter == "relevant" && nodeProp.relevant);
	}

	private buildProps(node:any, isRoot:boolean, formatType:formatterType): Array<INodeProperty> {
		const props = new Array<INodeProperty>();

		if(typeof node !== "undefined") {
			const elmType: string = node.hasOwnProperty("elmType") ? node.elmType : this.defaultPropValue("elmType", formatType);

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

	private buildPropsAttributes(node:any, isRoot:boolean, formatType:formatterType): Array<INodeProperty> {
		const props = new Array<INodeProperty>();

		if(typeof node !== "undefined" && !(isRoot && formatType == formatterType.View)) {
			const elmType: string = node.hasOwnProperty("elmType") ? node.elmType : this.defaultPropValue("elmType", formatType);

			//Column Formatting/RowFormatter element attributes
			props.push(...[
				this.buildProp("class",node.attributes,elmType,formatType),
				this.buildProp("iconName",node.attributes,elmType,formatType),
				this.buildProp("href",node.attributes,elmType,formatType),
				this.buildProp("target",node.attributes,elmType,formatType),
				this.buildProp("src",node.attributes,elmType,formatType),
				this.buildProp("d",node.attributes,elmType,formatType),
				this.buildProp("title",node.attributes,elmType,formatType),
				this.buildProp("role",node.attributes,elmType,formatType),
				this.buildProp("rel",node.attributes,elmType,formatType),
			]);
		}

		return props;
	}
	
	private buildProp(propertyName:string, node:any, elmType:string, formatType:formatterType): INodeProperty {
		const isCurrent:boolean = (typeof node !== "undefined" && node.hasOwnProperty(propertyName));
		const doesSupportExpression:boolean = this.supportsExpression(propertyName, formatType);
		let value:any;
		let isInvalidValue:boolean = false;
		if(isCurrent) {
			value = node[propertyName];
			if (!(typeof value == "string" || typeof value == "number" || typeof value == "boolean")) {
				if (this.supportsExpression && typeof value == "object") {
					//Convert to FormatScript (and verify)
					//TEMP just declare it is an expression and ignore problems
					value = JSON.stringify(value);
				} else {
					isInvalidValue = true;
				}
			}
		} else {
			value = this.defaultPropValue(propertyName, formatType);
		}

		return {
			name:propertyName,
			type:this.propType(propertyName, formatType),
			value: value,
			invalidValue: isInvalidValue,
			current: isCurrent,
			relevant:this.isRelevantProp(propertyName, elmType, formatType),
			supportsExpression: doesSupportExpression,
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
			case "target":
				return "_blank";
			default:
				return "";
		}
	}

	private isRelevantProp(propertyName:string, elmType: string, formatType:formatterType): boolean {
		switch (propertyName) {
			case "$schema":
			case "debugMode":
			case "elmType":
			case "class":
			case "title":
				return true;
			case "txtContent":
				switch(elmType) {
					case "img":
					case "svg":
					case "path":
						return false;
					default:
						return true;
				}
			case "iconName":
				switch(elmType) {
					case "button":
					case "img":
					case "svg":
					case "path":
						return false;
					default:
						return true;
				}
			case "href":
			case "target":
			case "rel":
				return elmType == "a";
			case "src":
				return elmType == "img";
			case "d":
				return elmType == "path";
			case "action":
			case "actionParams":
				return elmType == "button";
		}
		return false;
	}

	private supportsExpression(propertyName:string, formatType:formatterType): boolean {
		switch (propertyName) {
			case "$schema":
			case "debugMode":
			case "elmType":
			case "action":
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