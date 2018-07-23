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
		const styleProps = this.buildPropsStyle(this.props.node, this.props.isRoot, this.props.formatType).filter(this.filterPropsForView);
		propGroups.push(["style", styleProps]);
		propGroups.push(["customRowAction", this.buildPropsCustomRowAction(this.props.node, this.props.isRoot, this.props.formatType).filter(this.filterPropsForView)]);
		let propCount:number = 0;
		propGroups.forEach((group:[string,Array<INodeProperty>]) => {
			propCount += group["1"].length;
		});
		const setStyles = new Array<string>();
		styleProps.forEach((value: INodeProperty) => {
			setStyles.push(value.name);
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
								const isStyle:boolean = (group["0"] == "style") && !(this.props.isRoot && this.props.formatType == formatterType.View);
								if((group["0"].length > 0 && group["1"].length > 0) || isStyle) {
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
												{this.renderPropLabel(nodeProp)}
											</td>
											<td className={styles.propertyValue}>
												{this.renderPropEditor(nodeProp)}
											</td>
										</tr>
									);
								}));
								if (isStyle) {
									rows.push((
										<tr key="addStyle">
											<td className={styles.propertyLabel}>
											<ComboBox
											 value=""
											 allowFreeform={true}
											 autoComplete="on"
											 options={this.stringsToOptions(this.styleAttributes.filter((value:string) => {
												 return setStyles.indexOf(value) == -1;
											 }))}
											 comboBoxOptionStyles={{
												root: {
													padding: "0 6px",
													fontSize: "10px",
													minHeight: "16px",
													lineHeight: "14px",
												},
											 }}
											 onChanged={(option?: IComboBoxOption, index?: number, value?: string) => {
												if(typeof option !== "undefined") {
													this.props.propUpdated(`style.${option.key.toString()}`, "inherit");
												} else if(typeof value !== "undefined") {
													this.props.propUpdated(`style.${value}`, "inherit");
												}
											 }}/>
											</td>
											<td className={styles.propertyValue}>
												
											</td>
										</tr>
									));
								}
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

			const knownProps = [];

			//ViewFormatting root properties
			if(isRoot && formatType == formatterType.View) {
				const rootProps = [
					"$schema","hideSelection","hideListHeader","additionalRowClass",
				];
				rootProps.forEach((value:string) => {
					props.push(this.buildProp(value,addressPrefix,node,elmType,formatType));
				});
				knownProps.push(...rootProps);
			}
			
			//ColumnFormatting additional Root Properties
			if(isRoot && formatType == formatterType.Column) {
				const rootProps = [
					"$schema","debugMode",
				];
				rootProps.forEach((value:string) => {
					props.push(this.buildProp(value,addressPrefix,node,elmType,formatType));
				});
				knownProps.push(...rootProps);
			}

			//Column Formatting/RowFormatter properties
			if(!(isRoot && formatType == formatterType.View)) {
				const elmProps = [
					"elmType","txtContent",
				];
				elmProps.forEach((value:string) => {
					props.push(this.buildProp(value,addressPrefix,node,elmType,formatType));
				});
				knownProps.push(...elmProps);
			}

			//These are parent containers
			const ignoreProps = [
				"attributes","style","rowFormatter","customRowAction","children",
			];
			knownProps.push(...ignoreProps);

			//Process any leftover props
			for(const key in node) {
				if(knownProps.indexOf(key) == -1) {
					props.push(this.buildProp(key,addressPrefix,node,elmType,formatType));
					knownProps.push(key);
				}
			}
		}

		return props;
	}

	private buildPropsAttributes(node:any, isRoot:boolean, formatType:formatterType): Array<INodeProperty> {
		const props = new Array<INodeProperty>();

		if(typeof node !== "undefined" && !(isRoot && formatType == formatterType.View)) {
			const elmType: string = node.hasOwnProperty("elmType") ? node.elmType : this.defaultPropValue("elmType", formatType);

			const addressPrefix = "attributes.";
			const knownAttributes = [
				"class","iconName","href","target","src","d","title","role","rel",
			];
			//Column Formatting/RowFormatter element attributes
			knownAttributes.forEach((value:string) => {
				props.push(this.buildProp(value,addressPrefix,node.attributes,elmType,formatType));
			});
			//Process any leftover props
			const relevantPattern = new RegExp('^aria\\-[a-z]+$');
			for(const key in node.attributes) {
				if(knownAttributes.indexOf(key) == -1) {
					props.push(this.buildProp(key,addressPrefix,node.attributes,elmType,formatType,relevantPattern));
					knownAttributes.push(key);
				}
			}
		}

		return props;
	}

	private buildPropsCustomRowAction(node:any, isRoot:boolean, formatType:formatterType): Array<INodeProperty> {
		const props = new Array<INodeProperty>();

		if(typeof node !== "undefined" && !(isRoot && formatType == formatterType.View)) {
			const elmType: string = node.hasOwnProperty("elmType") ? node.elmType : this.defaultPropValue("elmType", formatType);

			const addressPrefix = "customRowAction.";
			const knownProps = [
				"action","actionParams",
			];

			knownProps.forEach((value:string) => {
				props.push(this.buildProp(value,addressPrefix,node.customRowAction,elmType,formatType));
			});
			//Process any leftover props
			for(const key in node.customRowAction) {
				if(knownProps.indexOf(key) == -1) {
					props.push(this.buildProp(key,addressPrefix,node.customRowAction,elmType,formatType));
					knownProps.push(key);
				}
			}

		}

		return props;
	}

	private buildPropsStyle(node:any, isRoot:boolean, formatType:formatterType): Array<INodeProperty> {
		const props = new Array<INodeProperty>();

		if(typeof node !== "undefined" && !(isRoot && formatType == formatterType.View)) {
			const elmType: string = node.hasOwnProperty("elmType") ? node.elmType : this.defaultPropValue("elmType", formatType);

			const addressPrefix = "style.";

			//Process props
			const relevantPattern = new RegExp(".*?");
			for(const key in node.style) {
				props.push(this.buildProp(key,addressPrefix,node.style,elmType,formatType,relevantPattern));
			}
		}

		return props;
	}

	private styleAttributes = [
		"align-items","background-color","background-image","border","border-bottom","border-bottom-color",
		"border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width",
		"border-collapse","border-color","border-left","border-left-color","border-left-style","border-left-width",
		"border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing",
		"border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style",
		"border-top-width","border-width","bottom","box-align","box-decoration-break","box-direction","box-flex",
		"box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-shadow","box-sizing","caption-side",
		"clear","clip","color","column-count","column-fill","column-gap","column-rule","column-rule-color",
		"column-rule-style","column-rule-width","column-span","column-width","columns","direction","display",
		"empty-cells","float","font","font-family","font-size","font-size-adjust","font-stretch","font-variant",
		"font-weight","fill","height","grid-columns","grid-rows","hanging-punctuation","left","letter-spacing",
		"line-height","margin","margin-bottom","margin-left","margin-right","margin-top","max-height","max-width",
		"min-height","min-width","opacity","outline","outline-color","outline-style","outline-width","overflow",
		"overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","position",
		"punctuation-trim","right","rotation","rotation-point","table-layout","text-align","text-align-last","text-decoration",
		"text-indent","text-justify","text-outline","text-shadow","text-transform","text-wrap","top","unicode-bidi",
		"vertical-align","visibility","white-space","width","word-break","word-spacing","word-wrap","z-index",
	];
	
	private buildProp(propertyName:string, addressPrefix:string, node:any, elmType:string, formatType:formatterType, relevantPattern?:RegExp): INodeProperty {
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
			relevant:this.isRelevantProp(propertyName, elmType, formatType, relevantPattern),
			supportsExpression: doesSupportExpression,
			valueIsExpression: isExpression,
		};
	}

	private propType(propertyName:string, formatType:formatterType): NodePropType {
		switch (propertyName) {
			case "elmType":
			case "target":
			case "action":
			case "align-items":
			case "border-bottom-style":
			case "border-left-style":
			case "border-right-style":
			case "border-style":
			case "border-top-style":
			case "box-align":
			case "box-decoration-break":
			case "box-direction":
			case "box-lines":
			case "box-orient":
			case "box-pack":
			case "box-sizing":
			case "caption-side":
			case "clear":
			case "column-fill":
			case "column-rule-style":
			case "column-span":
			case "direction":
			case "display":
			case "empty-cells":
			case "float":
			case "font-stretch":
			case "font-variant":
			case "hanging-punctuation":
			case "outline-style":
			case "overflow":
			case "overflow-x":
			case "overflow-y":
			case "position":
			case "punctuation-trim":
			case "table-layout":
			case "text-align":
			case "text-align-last":
			case "text-decoration":
			case "text-justify":
			case "text-transform":
			case "text-wrap":
			case "unicode-bidi":
			case "visibility":
			case "white-space":
			case "word-break":
			case "word-wrap":
				return NodePropType.dropdown;
			case "class":
			case "role":
			case "rel":
			case "additionalRowClass":
				return NodePropType.dropdownMS;
			case "debugMode":
			case "hideSelection":
			case "hideListHeader":
				return NodePropType.toggle;
			case "background-color":
			case "border-bottom-color":
			case "border-color":
			case "border-left-color":
			case "border-right-color":
			case "border-top-color":
			case "color":
			case "column-rule-color":
			case "fill":
			case "outline-color":
				return NodePropType.color;
			case "background-image":
			case "border":
			case "border-bottom":
			case "border-bottom-left-radius":
			case "border-bottom-right-radius":
			case "border-bottom-width":
			case "border-left":
			case "border-left-width":
			case "border-radius":
			case "border-right":
			case "border-right-width":
			case "border-spacing":
			case "border-top":
			case "border-top-left-radius":
			case "border-top-right-radius":
			case "border-top-width":
			case "border-width":
			case "bottom":
			case "box-flex":
			case "box-flex-group":
			case "box-ordinal-group":
			case "box-shadow":
			case "clip":
			case "column-count":
			case "column-gap":
			case "column-rule":
			case "column-rule-width":
			case "column-width":
			case "columns":
			case "font":
			case "font-family":
			case "font-size":
			case "font-size-adjust":
			case "font-weight":
			case "height":
			case "grid-columns":
			case "grid-rows":
			case "left":
			case "letter-spacing":
			case "line-height":
			case "margin":
			case "margin-bottom":
			case "margin-left":
			case "margin-right":
			case "margin-top":
			case "max-height":
			case "max-width":
			case "min-height":
			case "min-width":
			case "opacity":
			case "outline":
			case "outline-width":
			case "padding":
			case "padding-bottom":
			case "padding-left":
			case "padding-right":
			case "padding-top":
			case "right":
			case "rotation":
			case "rotation-point":
			case "text-indent":
			case "text-outline":
			case "text-shadow":
			case "top":
			case "vertical-align":
			case "width":
			case "word-spacing":
			case "z-index":
				return NodePropType.combobox;
			default:
				return NodePropType.text;
		}
	}

	private defaultPropValue(propertyName:string, formatType:formatterType): any {
		switch (propertyName) {
			case "$schema":
				return formatType == formatterType.Column ? ColumnFormattingSchemaURI : ViewFormattingSchemaURI;
			case "debugMode":
			case "hideSelection":
			case "hideListHeader":
				return false;
			case "elmType":
				return "div";
			case "target":
				return "_blank";
			default:
				return "";
		}
	}

	private isRelevantProp(propertyName:string, elmType: string, formatType:formatterType, relevantPattern?:RegExp): boolean {
		switch (propertyName) {
			case "$schema":
			case "debugMode":
			case "elmType":
			case "class":
			case "title":
			case "hideSelection":
			case "hideListHeader":
			case "additionalRowClass":
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
		//Generally for aria props, but could be extended in the future
		if(typeof relevantPattern !== "undefined") {
			if(relevantPattern.test(propertyName)) {
				return true;
			}
		}
		return false;
	}

	private supportsExpression(propertyName:string, formatType:formatterType): boolean {
		switch (propertyName) {
			case "$schema":
			case "debugMode":
			case "elmType":
			case "action":
			case "hideSelection":
			case "hideListHeader":
				return false;
			default:
				return true;
		}
	}


	@autobind
	private renderPropLabel(nodeProp:INodeProperty): JSX.Element {

		//styles for remove button
		const propButtonStyles: Partial<IButtonStyles> = {
			root: {
				width: "9px",
				height: "16px",
				padding: "0",
			},
			icon: {
				fontSize: "9px",
				lineHeight: "16px",
				marginTop: "1px",
			},
		};

		return (
			<div className={styles.propAndButtonBox}>
				<div className={styles.mainBox}>
					<span>{nodeProp.name}</span>
				</div>
				
				<div className={styles.buttonBox}>
					{nodeProp.current && 
						<IconButton
						 iconProps={{
							iconName: "Blocked2",
							className: "ms-fontColor-redDark"}}
						 title="FormatScript"
						 styles={propButtonStyles}
						 onClick={()=>{
							this.props.propUpdated(nodeProp.address, undefined);
						 }}/>
					}
				</div>
			</div>
		);
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
			},
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
					 value={nodeProp.valueIsExpression ? undefined : nodeProp.value}
					 autoComplete="on"
					 allowFreeform={true}
					 options={this.getPropOptions(nodeProp)}
					 comboBoxOptionStyles={{
						 root: {
							 padding: "0 6px",
							 fontSize: "10px",
							 minHeight: "16px",
							 lineHeight: "14px",
						 },
					 }}
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
			case "additionalRowClass":
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

			
			//Style attributes	
			case "align-items":
				return this.styleStringsToOptions([
					"stretch","center","flex-start","flex-end","baseline",
				]);
			case "background-color":
			case "border-bottom-color":
			case "border-color":
			case "border-left-color":
			case "border-right-color":
			case "border-top-color":
			case "color":
			case "column-rule-color":
			case "fill":
				return this.styleStringsToOptions(this.namedColors);
			case "background-image":
			case "column-count":
			case "font-size-adjust":
			case "grid-columns":
			case "grid-rows":
			case "max-height":
			case "max-width":
			case "text-shadow":
				return this.styleStringsToOptions([
					"none"
				]);
			case "border": //styleStandard
			case "border-bottom":
			case "border-bottom-left-radius":
			case "border-bottom-right-radius":
			case "border-left":
			case "border-radius":
			case "border-right":
			case "border-spacing":
			case "border-top":
			case "border-top-left-radius":
			case "border-top-right-radius":
			case "box-flex":
			case "box-flex-group":
			case "box-ordinal-group":
			case "column-rule":
			case "font-family":
			case "min-height":
			case "min-width":
			case "opacity":
			case "outline":
			case "padding":
			case "padding-bottom":
			case "padding-left":
			case "padding-right":
			case "padding-top":
			case "rotation":
			case "rotation-point":
			case "text-indent":
			case "text-outline":
				return this.stringsToOptions(this.styleBasic);
			case "border-bottom-style":
			case "border-left-style":
			case "border-right-style":
			case "border-style":
			case "border-top-style":
			case "column-rule-style":
			case "outline-style":
				return this.styleStringsToOptions([
					"none","hidden","dotted","dashed","solid","double","groove","ridge","inset","outset",
				]);
			case "border-bottom-width":
			case "border-left-width":
			case "border-right-width":
			case "border-top-width":
			case "border-width":
			case "column-rule-width":
			case "outline-width":
				return this.styleStringsToOptions([
					"thin","medium","thick",
				]);
			case "border-collapse":
				return this.styleStringsToOptions([
					"separate","collapse",
				]);
			case "bottom": //styleStandardAuto
			case "clip":
			case "column-width":
			case "columns":
			case "height":
			case "left":
			case "margin":
			case "margin-bottom":
			case "margin-left":
			case "margin-right":
			case "margin-top":
			case "right":
			case "top":
			case "width":
			case "z-index":
				return this.styleStringsToOptions([],true);
			case "box-align":
				return this.styleStringsToOptions([
					"start","center","end","baseline","stretch",
				]);
			case "box-decoration-break":
				return this.styleStringsToOptions([
					"slice","clone",
				]);
			case "box-direction":
				return this.styleStringsToOptions([
					"normal","reverse",
				]);
			case "box-lines":
				return this.styleStringsToOptions([
					"single","multiple",
				]);
			case "box-orient":
				return this.styleStringsToOptions([
					"horizontal","vertical","inline-axis","block-axis",
				]);
			case "box-pack":
				return this.styleStringsToOptions([
					"start","center","end","justify",
				]);
			case "box-shadow":
				return this.styleStringsToOptions([
					"none","inset",
				]);
			case "box-sizing":
				return this.styleStringsToOptions([
					"content-box","border-box",
				]);
			case "caption-side":
				return this.styleStringsToOptions([
					"top","bottom",
				]);
			case "clear":
				return this.styleStringsToOptions([
					"none","left","right","both",
				]);
			case "column-fill":
				return this.styleStringsToOptions([
					"balance",
				],true);
			case "column-gap":
				return this.styleStringsToOptions([
					"normal",
				]);
			case "column-span":
				return this.styleStringsToOptions([
					"none","all",
				]);
			case "direction":
				return this.styleStringsToOptions([
					"ltr","rtl",
				]);
			case "display":
				return this.styleStringsToOptions([
					"inline","block","flex","inline-block","inline-flex","inline-table","list-item",
					"run-in","table","table-caption","table-column-group","table-header-group",
					"table-row-group","table-cell","table-column","table-row","none",
				]);
			case "empty-cells":
				return this.styleStringsToOptions([
					"show","hide",
				]);
			case "float":
				return this.styleStringsToOptions([
					"none","left","right",
				]);
			case "font":
				return this.styleStringsToOptions([
					"caption","icon","menu","message-box","small-caption","status-bar",
				]);
			case "font-size":
				return this.styleStringsToOptions([
					"medium","xx-small","x-small","small","large","x-large","xx-large","smaller","larger",
				]);
			case "font-stretch":
				return this.styleStringsToOptions([
					"ultra-condensed","extra-condensed","condensed","semi-condensed",
					"normal","semi-expanded","expanded","extra-expanded","ultra-expanded",
				]);
			case "font-variant":
				return this.styleStringsToOptions([
					"normal","small-caps",
				]);
			case "font-weight":
				return this.styleStringsToOptions([
					"normal","bold","bolder","lighter",
				]);
			case "hanging-puncuation":
				return this.styleStringsToOptions([
					"none","first","last","allow-end","force-end",
				]);
			case "letter-spacing":
			case "line-height":
			case "word-spacing":
				return this.styleStringsToOptions([
					"normal",
				]);
			case "outline-color":
				return this.styleStringsToOptions([
					"invert",
				].concat(this.namedColors));
			case "overflow":
			case "overflow-x":
			case "overflow-y":
				return this.styleStringsToOptions([
					"visible","hidden","scroll",
				],true);
			case "position":
				return this.styleStringsToOptions([
					"static","absolute","fixed","relative","sticky",
				]);
			case "punctuation-trim":
				return this.styleStringsToOptions([
					"none","start","end","allow-end","adjacent",
				]);
			case "table-layout":
				return this.styleStringsToOptions([
					"auto","fixed",
				]);
			case "text-align":
				return this.styleStringsToOptions([
					"left","right","center","justify",
				]);
			case "text-align-last":
				return this.styleStringsToOptions([
					"auto","left","right","center","justify","start","end",
				]);
			case "text-decoration":
				return this.styleStringsToOptions([
					"none","underline","overline","line-through",
				]);
			case "text-justify":
				return this.styleStringsToOptions([
					"auto","none","inter-word","inter-ideograph","inter-cluster","distribute","kashida","trim",
				]);
			case "text-transform":
				return this.styleStringsToOptions([
					"none","capitalize","uppercase","lowercase",
				]);
			case "text-wrap":
				return this.styleStringsToOptions([
					"normal","none","unrestricted","suppress",
				]);
			case "unicode-bidi":
				return this.styleStringsToOptions([
					"normal","embed","bidi-override",
				]);
			case "vertical-align":
				return this.styleStringsToOptions([
					"baseline","sub","super","top","text-top","middle","bottom","text-bottom",
				]);
			case "visibility":
				return this.styleStringsToOptions([
					"visible","hidden","collapse",
				]);
			case "white-space":
				return this.styleStringsToOptions([
					"normal","nowrap","pre","pre-line","pre-wrap",
				]);
			case "word-break":
				return this.styleStringsToOptions([
					"normal","break-all","keep-all",
				]);
			case "word-wrap":
				return this.styleStringsToOptions([
					"normal","break-word",
				]);
			default:
				return undefined;
		}
	}

	private styleBasic = [
		"initial","inherit","unset"
	];

	private namedColors = [
		"transparent","currentColor",
		"aqua","black","blue","fuchsia","gray","green","lime","maroon","navy","olive","purple","red","silver","teal","white","yellow",
		"aliceblue","antiquewhite","aquamarine","azure","beige","bisque","blanchedalmond","blueviolet","brown","burlywood","cadetblue",
		"chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray",
		"darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen",
		"darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick",
		"floralwhite","forestgreen","gainsboro","ghostwhite","gold","goldenrod","greenyellow","honeydew","hotpink","indianred","indigo",
		"ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow",
		"lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow",
		"limegreen","linen","magenta","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue",
		"mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","oldlace",
		"olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff",
		"peru","pink","plum","powderblue","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna",
		"skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","thistle","tomato","turquoise","violet","wheat",
		"whitesmoke","yellowgreen","rebeccapurple"
	];

	private styleStringsToOptions(values: Array<string>, auto:boolean = false): Array<IDropdownOption> {
		if(auto) {
			values.push("auto");
		}
		values.push(...this.styleBasic);
		return this.stringsToOptions(values);
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