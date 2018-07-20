import { IButtonStyles, IconButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ComboBox, IComboBoxOption } from "office-ui-fabric-react/lib/ComboBox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IToggleStyles, Toggle } from "office-ui-fabric-react/lib/Toggle";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

import { ColumnFormattingSchemaURI } from "../../../helpers/ColumnFormattingSchema";
import { ViewFormattingSchemaURI } from "../../../helpers/ViewFormattingSchema";
import { formatterType } from "../../../state/State";
import styles from "../../ColumnFormatter.module.scss";
import { JSONToFormatScript } from "../../FormatScript/FormatScript";
import { FormatScriptEditorDialog } from "../../FormatScript/FormatScriptEditorDialog";
import { INodeProperty, NodePropType } from "./INodeProperty";

export interface INodePropertiesProps {
	propUpdated: (propertyAddress:string, value:any) => void;
	isRoot: boolean;
	node?: any;
	formatType: formatterType;
}

export interface INodePropertiesState {
	propFilter: string;

	formatScriptDialogVisible: boolean;
	formatScriptExpression?: string;
	formatScriptPropertyAddress?: string;
	formatScriptPropertyName?: string;
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
		const propGroups = new Array<[string, Array<INodeProperty>]>();
		propGroups.push(["", this.buildProps(this.props.node, this.props.isRoot, this.props.formatType).filter(this.filterPropsForView)]);
		propGroups.push(["attributes", this.buildPropsAttributes(this.props.node, this.props.isRoot, this.props.formatType).filter(this.filterPropsForView)]);
		propGroups.push(["customRowAction", this.buildPropsCustomRowAction(this.props.node, this.props.isRoot, this.props.formatType).filter(this.filterPropsForView)]);
		let propCount:number = 0;
		propGroups.forEach((group:[string,Array<INodeProperty>]) => {
			propCount += group["1"].length;
		});

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
				{(propCount > 0) &&
					<table className={styles.propertyTable} cellPadding={0} cellSpacing={0}>
						<tbody>
							{propGroups.map((group:[string,Array<INodeProperty>]) => {
								const rows = new Array<JSX.Element>();
								if(group["0"].length > 0 && group["1"].length > 0) {
									rows.push((
										<tr>
											<td className={styles.groupHeader} colSpan={2}>
												<span>{group["0"]}</span>
											</td>
										</tr>
									));
								}
								rows.push(...group["1"].map((nodeProp:INodeProperty) => {
									return (
										<tr key={nodeProp.name}>
											<td className={styles.propertyLabel + (nodeProp.current ? " " + styles.current : "") + (nodeProp.relevant ? " " + styles.relevant : "")  + (nodeProp.invalidValue ? " " + styles.invalid : "")}>
												<span>{nodeProp.name}</span>
											</td>
											<td className={styles.propertyValue}>
												{this.renderPropEditor(nodeProp)}
											</td>
										</tr>
									);
								}));
								return rows;
							})}
						</tbody>
					</table>
				}
				<FormatScriptEditorDialog
				 initialValue={this.state.formatScriptExpression}
				 visible={this.state.formatScriptDialogVisible}
				 dialogTitle={`Format Script: ${this.state.formatScriptPropertyName}`}
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

			const addressPrefix = "";

			//ViewFormatting root properties
			if(isRoot && formatType == formatterType.View) {
				return [
					
				];
			}
			
			//ColumnFormatting additional Root Properties
			if(isRoot) {
				props.push(...[
					this.buildProp("$schema",addressPrefix,node,elmType,formatType),
					this.buildProp("debugMode",addressPrefix,node,elmType,formatType)
				]);
			}

			//Column Formatting/RowFormatter properties
			props.push(...[
				this.buildProp("elmType",addressPrefix,node,elmType,formatType),
				this.buildProp("txtContent",addressPrefix,node,elmType,formatType)
			]);
		}

		return props;
	}

	private buildPropsAttributes(node:any, isRoot:boolean, formatType:formatterType): Array<INodeProperty> {
		const props = new Array<INodeProperty>();

		if(typeof node !== "undefined" && !(isRoot && formatType == formatterType.View)) {
			const elmType: string = node.hasOwnProperty("elmType") ? node.elmType : this.defaultPropValue("elmType", formatType);

			const addressPrefix = "attributes.";
			//Column Formatting/RowFormatter element attributes
			props.push(...[
				this.buildProp("class",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("iconName",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("href",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("target",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("src",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("d",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("title",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("role",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("rel",addressPrefix,node.attributes,elmType,formatType),
			]);
		}

		return props;
	}

	private buildPropsCustomRowAction(node:any, isRoot:boolean, formatType:formatterType): Array<INodeProperty> {
		const props = new Array<INodeProperty>();

		if(typeof node !== "undefined" && !(isRoot && formatType == formatterType.View)) {
			const elmType: string = node.hasOwnProperty("elmType") ? node.elmType : this.defaultPropValue("elmType", formatType);

			const addressPrefix = "customRowAction.";
			//Column Formatting/RowFormatter element attributes
			props.push(...[
				this.buildProp("action",addressPrefix,node.attributes,elmType,formatType),
				this.buildProp("actionParams",addressPrefix,node.attributes,elmType,formatType),
			]);
		}

		return props;
	}
	
	private buildProp(propertyName:string, addressPrefix:string, node:any, elmType:string, formatType:formatterType): INodeProperty {
		const isCurrent:boolean = (typeof node !== "undefined" && node.hasOwnProperty(propertyName));
		const doesSupportExpression:boolean = this.supportsExpression(propertyName, formatType);
		let value:any;
		let isInvalidValue:boolean = false;
		let isExpression:boolean = false;
		if(isCurrent) {
			value = node[propertyName];
			if (!(typeof value == "string" || typeof value == "number" || typeof value == "boolean")) {
				if (this.supportsExpression && typeof value == "object") {
					//Convert to FormatScript (and verify)
					//TEMP just declare it is an expression and ignore problems
					value = JSON.stringify(value);
					isExpression = true;
				} else {
					isInvalidValue = true;
				}
			}
		} else {
			value = this.defaultPropValue(propertyName, formatType);
		}

		return {
			name:propertyName,
			address:addressPrefix + propertyName,
			type:this.propType(propertyName, formatType),
			value: value,
			invalidValue: isInvalidValue,
			current: isCurrent,
			relevant:this.isRelevantProp(propertyName, elmType, formatType),
			supportsExpression: doesSupportExpression,
			valueIsExpression: isExpression,
		};
	}

	private propType(propertyName:string, formatType:formatterType): NodePropType {
		switch (propertyName) {
			case "elmType":
			case "target":
			case "action":
				return NodePropType.dropdown;
			case "class":
			case "role":
			case "rel":
				return NodePropType.dropdownMS;
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
	private renderPropEditor(nodeProp:INodeProperty): JSX.Element {

		//styles for formatscript button
		const propButtonStyles: Partial<IButtonStyles> = {
			root: {
				width: "14px",
				height: "16px",
				padding: "0"
			},
			icon: {
				fontSize: "12px",
				lineHeight: "16px",
			}
		};

		return (
			<div className={styles.propAndButtonBox}>
				<div className={styles.mainBox}>
					{this.renderPropEditorControl(nodeProp)}
				</div>
				
				<div className={styles.buttonBox}>
					{nodeProp.supportsExpression &&
						<IconButton
						 iconProps={{
							 iconName:nodeProp.valueIsExpression ? "TestBeakerSolid" : "TestBeaker",
							className:nodeProp.valueIsExpression ? "ms-fontColor-themeDarkAlt" : "ms-fontColor-neutralPrimaryAlt"}}
						 title="FormatScript"
						 styles={propButtonStyles}
						 onClick={()=>{
							this.setState({
								formatScriptDialogVisible: true,
								formatScriptExpression: nodeProp.valueIsExpression ? JSONToFormatScript(nodeProp.value) : (typeof nodeProp.value == "string" ? `"${nodeProp.value}"` : nodeProp.value),
								formatScriptPropertyAddress: nodeProp.address,
								formatScriptPropertyName: nodeProp.name,
							});
						 }}/>
					}
				</div>
			</div>
		);
	}

	private renderPropEditorControl(nodeProp:INodeProperty): JSX.Element {
		switch (nodeProp.type) {
			case NodePropType.dropdown:
				return (
					<Dropdown
					selectedKey={nodeProp.valueIsExpression ? undefined : nodeProp.value}
					placeHolder={nodeProp.valueIsExpression ? "Using Expression" : undefined}
					options={this.getPropOptions(nodeProp)}
					calloutProps={{className:styles.treePropValue}}
					onChanged={(option:IDropdownOption,index?:number) => {
						this.props.propUpdated(nodeProp.address,option.key.toString());
					}}/>
				);
			case NodePropType.dropdownMS:
				return (
					<Dropdown
					 selectedKeys={nodeProp.valueIsExpression ? undefined : nodeProp.value.split(" ")}
					 placeHolder={nodeProp.valueIsExpression ? "Using Expression" : undefined}
					 options={this.getPropOptions(nodeProp)}
					 calloutProps={{className:styles.treePropValue}}
					 multiSelect={true}
					 multiSelectDelimiter=" "
					 onChanged={(option:IDropdownOption,index?:number) => {
						let values:Array<string> = nodeProp.value.split(" ");
						if(option.selected) {
							if(values.indexOf(option.key.toString()) == -1) {
								values.push(option.key.toString());
							}
						} else {
							if(values.indexOf(option.key.toString()) !== -1) {
								values.splice(values.indexOf(option.key.toString()),1);
							}
						}
						this.props.propUpdated(nodeProp.address,values.filter((val:string)=>{return val.length>0;}).join(" "));
					 }}/>
				);
			case NodePropType.combobox:
				return (
					<ComboBox
					 selectedKey={nodeProp.valueIsExpression ? undefined : nodeProp.value}
					 autoComplete="on"
					 allowFreeform={true}
					 options={this.getPropOptions(nodeProp)}
					 onChanged={(option?: IComboBoxOption, index?: number, value?: string) => {
						if(typeof option !== "undefined") {
							this.props.propUpdated(nodeProp.address, option.key.toString());
						} else {
							this.props.propUpdated(nodeProp.address, value);
						}
					 }}/>
				);
			case NodePropType.text:
				return (
					<TextField
					 value={nodeProp.valueIsExpression ? undefined : nodeProp.value}
					 placeholder={nodeProp.valueIsExpression ? "Using Expression" : undefined}
					 borderless={true}
					 onChanged={(newValue:any) => {this.props.propUpdated(nodeProp.address,newValue);}}/>
				);
			case NodePropType.toggle:
				const toggleStyles: Partial<IToggleStyles> = {
					root: {
						margin: "0",
						position: "relative",
					},
					container: {
						position: "absolute",
						top: "-7px",
						left: "3px"
					},
					pill: {
						height: "14px",
						lineHeight: "12px",
						fontSize: "14px",
					},
					text: {
						fontSize: "10px",
					},
				};

				return (
					<Toggle
					 checked={nodeProp.value}
					 onChanged={(checked:boolean) => {this.props.propUpdated(nodeProp.address,checked);}}
					 styles={toggleStyles}
					 onText="true"
					 offText="false"/>
				);
			default:
				return (
					<span>{nodeProp.invalidValue ? "INVALID" : nodeProp.value}</span>
				);
		}
	}

	private getPropOptions(nodeProp:INodeProperty): Array<IDropdownOption> {
		switch (nodeProp.name) {
			case "elmType":
				return this.stringsToOptions([
					"div","span","a","img","button","svg","path",
				]);
			case "target":
				return this.stringsToOptions([
					"_blank","_self","_parent","_top"
				]);
			case "rel":
				return this.stringsToOptions([
					"alternate","author","bookmark","external","help","license","next",
					"nofollow","noreferrer","noopener","prev","search","tag",
				]);
			case "role":
				return this.stringsToOptions([
					"alert","alertdialog","application","article","button","cell","checkbox","columnheader","combobox",
					"complementary","contentinfo","definition","dialog","directory","document","feed","figure","form",
					"grid","gridcell","group","heading","img","link","list","listbox","listitem","log","main","marquee",
					"math","menu","menubar","menuitem","menuitemcheckbox","menuitemradio","navigation","none","note",
					"option","presentation","progressbar","radio","radiogroup","region","row","rowgroup","rowheader",
					"scrollbar","search","searchbox","separator","slider","spinbutton","status","switch","tab","table",
					"tablist","tabpanel","term","textbox","timer","toolbar","tooltip","tree","treegrid","treeitem",
				]);
			case "action":
				return this.stringsToOptions([
					"defaultClick","executeFlow","delete","share","editProps",
				]);
			case "class":
				const classes = [
					"sp-field-severity--good",
					"sp-field-severity--low",
					"sp-field-severity--warning",
					"sp-field-severity--severeWarning",
					"sp-field-severity--blocked",
					"sp-field-dataBars",
					"sp-field-trending--up",
					"sp-field-trending--down",
					"sp-field-quickAction",
					"sp-field-customFormatBackground",
				];
				const colors = [
					"themePrimary","themeSecondary","themeTertiary","themeLight","themeLighter","themeLighterAlt",
					"themeDarkAlt","themeDark","themeDarker",
					"black","neutralDark","neutralPrimary","neutralPrimaryAlt","neutralSecondary",
					"neutralTertiary","neutralTertiaryAlt","neutralQuaternary","neutralQuarternaryAlt",
					"neutralLight","neutralLighter","neutralLighterAlt","white",
					"yellow","yellowLight","orange","orangeLight","orangeLighter","redDark","red",
					"magentaDark","magenta","magentaLight","purpleDark","purple","purpleLight",
					"blueDark","blueMid","blue","blueLight","tealDark","teal","tealLight","greenDark","green","greenLight",
				];
				colors.forEach((value:string) => {
					classes.push(...[
						"ms-fontColor-"+value, "ms-fontColor-"+value+"--hover",
						"ms-bgColor-"+value, "ms-bgColor-"+value+"--hover",
						"ms-borderColor-"+value, "ms-borderColor-"+value+"--hover",
					]);
				});
				classes.push(...[
					"ms-font-su","ms-font-xxl","ms-font-xl","ms-font-l","ms-font-m-plus",
					"ms-font-m","ms-font-s-plus","ms-font-s","ms-font-xs","ms-font-mi",
					"ms-fontSize-su","ms-fontSize-xxl","ms-fontSize-xl","ms-fontSize-l","ms-fontSize-mPlus",
					"ms-fontSize-m","ms-fontSize-sPlus","ms-fontSize-s","ms-fontSize-xs","ms-fontSize-mi",
					"ms-fontWeight-light","ms-fontWeight-semilight","ms-fontWeight-regular","ms-fontWeight-semibold",
				]);
				classes.push(...[
					"ms-Grid","ms-Grid-row","ms-Grid-col",
				]);
				/*const sizes = [
					"ms-sm","ms-md","ms-lg","ms-xl","ms-xxl","ms-xxxl"
				];*/
				//console.log(classes.join('","'));
				return this.stringsToOptions(classes);
			default:
				return undefined;
		}
	}

	private stringsToOptions(values: Array<string>):  Array<IDropdownOption> {
		return values.map((value:string) => {
			return {key:value, text:value};
		});
	}

	@autobind
	private onFormatScriptEditorSave(result: any): void {
		this.props.propUpdated(this.state.formatScriptPropertyAddress, result);

		this.setState({
			formatScriptDialogVisible: false,
		});
	}

}