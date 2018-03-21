import * as strings from 'ColumnFormatterWebPartStrings';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { columnTypes, IDataColumn } from '../../state/State';
import styles from '../ColumnFormatter.module.scss';
import { conditionalValues, IConditionalValue, IWizard, standardWizardStartingColumns } from './WizardCommon';

/*
Wizard Tab Rendering
*/

export interface IWizardSeverityPanelProps {
	showValue: boolean;
	showIcon: boolean;
	goodValue: string;
	lowValue: string;
	warningValue: string;
	severeWarningValue: string;
	blockedValue: string;
	updateValues:(showValue:boolean, showIcon:boolean, levels:Array<ISeverityLevel>, defaultClass:string, defaultIcon:string) => void;
}

export interface IWizardSeverityPanelState {
	showValue: boolean;
	showIcon: boolean;
	goodValue: string;
	lowValue: string;
	warningValue: string;
	severeWarningValue: string;
	blockedValue: string;
	defaultSeverity: string;
}

export class WizardSeverityPanel extends React.Component<IWizardSeverityPanelProps, IWizardSeverityPanelState> {
	
	public constructor(props:IWizardSeverityPanelProps){
		super(props);

		this.state = {
			showValue: props.showValue,
			showIcon: props.showIcon,
			goodValue: props.goodValue,
			lowValue: props.lowValue,
			warningValue: props.warningValue,
			severeWarningValue: props.severeWarningValue,
			blockedValue: props.blockedValue,
			defaultSeverity: 'blocked'
		};
	}

	public render(): React.ReactElement<IWizardSeverityPanelProps> {
		return (
			<div>
				<span className={styles.wizardGroupLabel}>{strings.Wizard_GroupLabelConditionalValues}</span>
				<TextField
				 label={strings.WizardSeverity_GoodLabel + ':'}
				 value={this.state.goodValue}
				 iconProps={{iconName:'CheckMark'}}
				 onChanged={this.onGoodValueChanged}
				 disabled={this.state.defaultSeverity=='good'}/>
				<TextField
				 label={strings.WizardSeverity_LowLabel + ':'}
				 value={this.state.lowValue}
				 iconProps={{iconName:'Forward'}}
				 onChanged={this.onLowValueChanged}
				 disabled={this.state.defaultSeverity=='low'}/>
				<TextField
				 label={strings.WizardSeverity_WarningLabel + ':'}
				 value={this.state.warningValue}
				 iconProps={{iconName:'Error'}}
				 onChanged={this.onWarningValueChanged}
				 disabled={this.state.defaultSeverity=='warning'}/>
				<TextField
				 label={strings.WizardSeverity_SevereWarningLabel + ':'}
				 value={this.state.severeWarningValue}
				 iconProps={{iconName:'Warning'}}
				 onChanged={this.onSevereWarningValueChanged}
				 disabled={this.state.defaultSeverity=='severeWarning'}/>
				<TextField
				 label={strings.WizardSeverity_BlockedLabel + ':'}
				 value={this.state.blockedValue}
				 iconProps={{iconName:'ErrorBadge'}}
				 onChanged={this.onBlockedValueChanged}
				 disabled={this.state.defaultSeverity=='blocked'}/>

				<Dropdown
				 label={strings.WizardSeverity_DefaultSeverityLabel + ':'}
				 selectedKey={this.state.defaultSeverity}
				 options={[
					 { key: 'good', text: strings.WizardSeverity_GoodLabel },
					 { key: 'low', text: strings.WizardSeverity_LowLabel },
					 { key: 'warning', text: strings.WizardSeverity_WarningLabel },
					 { key: 'severeWarning', text: strings.WizardSeverity_SevereWarningLabel },
					 { key: 'blocked', text: strings.WizardSeverity_BlockedLabel}
				 ]}
				 onChanged={this.onDefaultSeverityChanged}/>

				<span className={styles.wizardGroupLabel}>{strings.Wizard_GroupLabelDisplay}</span>
				<Toggle
				 checked={this.state.showValue}
				 onChanged={this.onShowValueChanged}
				 onText={strings.Wizard_ValueVisibleOn}
				 offText={strings.Wizard_ValueVisibleOff}/>
				<Toggle
				 checked={this.state.showIcon}
				 onChanged={this.onShowIconChanged}
				 onText={strings.Wizard_IconVisibleOn}
				 offText={strings.Wizard_IconVisibleOff}/>
			</div>
		);
	}

	@autobind
	private onGoodValueChanged(text: string) {
		this.setState({
			goodValue: text
		});
		this.calculateValues(this.state.showValue, this.state.showIcon, this.state.defaultSeverity, text, this.state.lowValue, this.state.warningValue, this.state.severeWarningValue, this.state.blockedValue);
	}

	@autobind
	private onLowValueChanged(text: string) {
		this.setState({
			lowValue: text
		});
		this.calculateValues(this.state.showValue, this.state.showIcon, this.state.defaultSeverity, this.state.goodValue, text, this.state.warningValue, this.state.severeWarningValue, this.state.blockedValue);
	}

	@autobind
	private onWarningValueChanged(text: string) {
		this.setState({
			warningValue: text
		});
		this.calculateValues(this.state.showValue, this.state.showIcon, this.state.defaultSeverity, this.state.goodValue, this.state.lowValue, text, this.state.severeWarningValue, this.state.blockedValue);
	}

	@autobind
	private onSevereWarningValueChanged(text: string) {
		this.setState({
			severeWarningValue: text
		});
		this.calculateValues(this.state.showValue, this.state.showIcon, this.state.defaultSeverity, this.state.goodValue, this.state.lowValue, this.state.warningValue, text, this.state.blockedValue);
	}

	@autobind
	private onBlockedValueChanged(text: string) {
		this.setState({
			blockedValue: text
		});
		this.calculateValues(this.state.showValue, this.state.showIcon, this.state.defaultSeverity, this.state.goodValue, this.state.lowValue, this.state.warningValue, this.state.severeWarningValue, text);
	}

	@autobind
	public onDefaultSeverityChanged(item: IDropdownOption) {
		this.setState({
			defaultSeverity: item.key.toString()
		});
		this.calculateValues(this.state.showValue, this.state.showIcon, item.key.toString(), this.state.goodValue, this.state.lowValue, this.state.warningValue, this.state.severeWarningValue, this.state.blockedValue);
	}

	@autobind
	private onShowValueChanged(checked: boolean): void {
		this.setState({ 
			showValue: checked!
		});
		this.calculateValues(checked!, this.state.showIcon, this.state.defaultSeverity, this.state.goodValue, this.state.lowValue, this.state.warningValue, this.state.severeWarningValue, this.state.blockedValue);
	}

	@autobind
	private onShowIconChanged(checked: boolean): void {
		this.setState({ 
			showIcon: checked!
		});
		this.calculateValues(this.state.showValue, checked!, this.state.defaultSeverity, this.state.goodValue, this.state.lowValue, this.state.warningValue, this.state.severeWarningValue, this.state.blockedValue);
	}

	private calculateValues(showValue:boolean, showIcon:boolean, defaultSeverity:string, goodValue:string, lowValue:string, warningValue:string, severeWarningValue:string, blockedValue:string){
		let levels:Array<ISeverityLevel> = new Array<ISeverityLevel>();
		let defaultClass:string;
		let defaultIcon:string;

		let goodLevel:ISeverityLevel = {
			value: goodValue,
			class: 'sp-field-severity--good',
			icon: 'CheckMark'
		};
		let lowLevel:ISeverityLevel = {
			value: lowValue,
			class: 'sp-field-severity--low',
			icon: 'Forward'
		};
		let warningLevel:ISeverityLevel = {
			value: warningValue,
			class: 'sp-field-severity--warning',
			icon: 'Error'
		};
		let severeWarningLevel:ISeverityLevel = {
			value: severeWarningValue,
			class: 'sp-field-severity--severeWarning',
			icon: 'Warning'
		};
		let blockedLevel:ISeverityLevel = {
			value: blockedValue,
			class: 'sp-field-severity--blocked',
			icon: 'ErrorBadge'
		};

		switch (defaultSeverity) {
			case 'good':
				defaultClass = goodLevel.class;
				defaultIcon = goodLevel.icon;
				break;
			case 'low':
				defaultClass = lowLevel.class;
				defaultIcon = lowLevel.icon;
				break;
			case 'warning':
				defaultClass = warningLevel.class;
				defaultIcon = warningLevel.icon;
				break;
			case 'severeWarning':
				defaultClass = severeWarningLevel.class;
				defaultIcon = severeWarningLevel.icon;
				break;
			case 'blocked':
				defaultClass = blockedLevel.class;
				defaultIcon = blockedLevel.icon;
				break;
		}

		if(defaultSeverity !== 'good') {
			levels.push(goodLevel);
		}
		if(defaultSeverity !== 'low') {
			levels.push(lowLevel);
		}
		if(defaultSeverity !== 'warning') {
			levels.push(warningLevel);
		}
		if(defaultSeverity !== 'severeWarning') {
			levels.push(severeWarningLevel);
		}
		if(defaultSeverity !== 'blocked') {
			levels.push(blockedLevel);
		}

		this.props.updateValues(showValue, showIcon, levels, defaultClass, defaultIcon);
	}
	
}


/*
	Wizard Definition
*/

export interface ISeverityLevel {
	value: string;
	class: string;
	icon: string;
}

const calculateCode = (colType:columnTypes, showValue:boolean, showIcon:boolean, levels:Array<ISeverityLevel>, defaultClass:string, defaultIcon:string): string => {
	let currentField:string = '@currentField';
	let ensureString:boolean = false;
	if(colType == columnTypes.lookup) {
		currentField = '@currentField.lookupValue';
	}
	if(colType == columnTypes.number) {
		ensureString = true;
	}

	let logic: Array<string> = [
		'  "attributes": {',
		conditionalValues('class', '    ', levels.map((value:ISeverityLevel):IConditionalValue => {
			return {
				compareTo: value.value,
				result: value.class
			};
		}), defaultClass, currentField, ensureString),
		'  }' + (showIcon || showValue ? ',' : '') 
	];
	if(showIcon || showValue) {
		logic.push('  "children": [');

		if(showIcon) {
			logic.push(...[
				'    {',
				'      "elmType": "span",',
				'      "style": {',
				'        "display": "inline-block",',
				'        "padding-left": "4px"',
				'      },',
				'      "attributes": {',
				conditionalValues('iconName', '        ', levels.map((value:ISeverityLevel):IConditionalValue => {
					return {
						compareTo: value.value,
						result: value.icon
					};
				}), defaultIcon, currentField, ensureString),
				'      }',
				'    }' + (showValue ? ',' : '') 
			]);
		}

		if(showValue) {
			logic.push(...[
				'    {',
				'      "elmType": "span",',
				'      "txtContent": "' + currentField + '",',
				'      "style": {',
				'        "padding-left": "4px"',
				'      }',
				'    }',
			]);
		}

		logic.push('  ]');
	}

	return [
		'{',
		'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
		'  "elmType": "div",',
		...logic,
		'}'
	].join('\n');
};


export const WizardSeverity: IWizard = {
	name: strings.WizardSeverity_Name,
	description: strings.WizardSeverity_Description,
	iconName: 'Info',
	fieldTypes: [
		columnTypes.text,
		columnTypes.choice,
		columnTypes.lookup,
		columnTypes.number
	],
	isTemplate: false,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		if(colType == columnTypes.lookup) {
			return [
				[{lookupId:1, lookupValue: strings.WizardSeverity_Good}],
				[{lookupId:2, lookupValue: strings.WizardSeverity_Low}],
				[{lookupId:3, lookupValue: strings.WizardSeverity_Warning}],
				[{lookupId:4, lookupValue: strings.WizardSeverity_SevereWarning}],
				[{lookupId:5, lookupValue: strings.WizardSeverity_Blocked}],
				[{lookupId:6, lookupValue: strings.WizardSeverity_Other}]
			];
		}
		if(colType == columnTypes.number) {
			return [
				[1],
				[2],
				[3],
				[4],
				[5],
				[6]
			];
		}
		return [
			[strings.WizardSeverity_Good],
			[strings.WizardSeverity_Low],
			[strings.WizardSeverity_Warning],
			[strings.WizardSeverity_SevereWarning],
			[strings.WizardSeverity_Blocked],
			[strings.WizardSeverity_Other]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return calculateCode(colType, true, true, [
			{
				value: colType == columnTypes.number ? "1" : strings.WizardSeverity_Good,
				class: 'sp-field-severity--good',
				icon: 'CheckMark'
			},
			{
				value: colType == columnTypes.number ? "2" : strings.WizardSeverity_Low,
				class: 'sp-field-severity--low',
				icon: 'Forward'
			},
			{
				value: colType == columnTypes.number ? "3" : strings.WizardSeverity_Warning,
				class: 'sp-field-severity--warning',
				icon: 'Error'
			},
			{
				value: colType == columnTypes.number ? "4" : strings.WizardSeverity_SevereWarning,
				class: 'sp-field-severity--severeWarning',
				icon: 'Warning'
			}
		], 'sp-field-severity--blocked', 'ErrorBadge');
	},
	onWizardRender: (updateEditorString:(editorString:string) => void, colType:columnTypes): JSX.Element => {
		return (
			<WizardSeverityPanel
			 showValue={true}
			 showIcon={true}
			 goodValue={colType == columnTypes.number ? "1" : strings.WizardSeverity_Good}
			 lowValue={colType == columnTypes.number ? "2" : strings.WizardSeverity_Low}
			 warningValue={colType == columnTypes.number ? "3" : strings.WizardSeverity_Warning}
			 severeWarningValue={colType == columnTypes.number ? "4" : strings.WizardSeverity_SevereWarning}
			 blockedValue={colType == columnTypes.number ? "5" : strings.WizardSeverity_Blocked}
			 updateValues={(showValue:boolean, showIcon:boolean, levels:Array<ISeverityLevel>, defaultClass:string, defaultIcon:string) => {
				updateEditorString(calculateCode(colType, showValue, showIcon, levels, defaultClass, defaultIcon));
			 }}/>
		);
	}
};