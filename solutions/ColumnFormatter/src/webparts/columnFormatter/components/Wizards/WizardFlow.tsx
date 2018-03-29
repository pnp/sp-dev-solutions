import * as strings from 'ColumnFormatterWebPartStrings';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { columnTypes, IDataColumn, IUserContext } from '../../state/State';
import styles from '../ColumnFormatter.module.scss';
import { StandardColorsDropdown } from './Controls/StandardColorsDropdown';
import { IconsDropdown } from './Controls/IconsDropdown';
import { IWizard, standardWizardStartingColumns, standardWizardStartingRows } from './WizardCommon';

/*
Wizard Tab Rendering
*/

export interface IWizardFlowPanelProps {
	flowId: string;
	showIcon: boolean;
	iconName?: string;
	color?: string;
	displayValue: string;
	updateValues:(flowId:string, showIcon:boolean, iconName:string, color:string, displayValue:string) => void;
}

export interface IWizardFlowPanelState {
	flowId: string;
	showIcon: boolean;
	iconName: string;
	color: string;
	displayValue: string;
}

export class WizardFlowPanel extends React.Component<IWizardFlowPanelProps, IWizardFlowPanelState> {
	
	public constructor(props:IWizardFlowPanelProps){
		super(props);

		this.state = {
			flowId: props.flowId,
			showIcon: props.showIcon,
			iconName: props.iconName || 'Flow',
			color: props.color || '#0078d7',
			displayValue: props.displayValue
		};
	}

	public render(): React.ReactElement<IWizardFlowPanelProps> {
		return (
			<div>
				<TextField
				 label={strings.WizardFlow_FlowId + ':'}
				 value={this.state.flowId}
				 onChanged={this.onFlowIdChanged}
				 title={strings.WizardFlow_FlowIdInstructions}/>
				<TextField
				 label={strings.Wizard_Text + ':'}
				 value={this.state.displayValue}
				 onChanged={this.onDisplayValueChanged}/>

				<span className={styles.wizardGroupLabel}>{strings.Wizard_GroupLabelDisplay}</span>
				<StandardColorsDropdown
				 label={strings.Wizard_Color}
				 onChanged={this.onColorChanged}
				 selectedKey={this.state.color}/>
				<IconsDropdown
				 label={strings.Wizard_Icon}
				 onChanged={this.onIconNameChanged}
				 selectedKey={this.state.iconName}
				 color={this.state.color}/>
				<Toggle
				 checked={this.state.showIcon}
				 onChanged={this.onShowIconChanged}
				 onText={strings.Wizard_IconVisibleOn}
				 offText={strings.Wizard_IconVisibleOff}/>
			</div>
		);
	}

	
	@autobind
	private onFlowIdChanged(text: string) {
		this.setState({
			flowId: text
		});
		this.props.updateValues(text, this.state.showIcon, this.state.iconName, this.state.color, this.state.displayValue);
	}

	@autobind
	private onDisplayValueChanged(text: string) {
		this.setState({
			displayValue: text
		});
		this.props.updateValues(this.state.flowId, this.state.showIcon, this.state.iconName, this.state.color, text);
	}

	@autobind
	private onShowIconChanged(checked: boolean): void {
		this.setState({ 
			showIcon: checked!
		});
		this.props.updateValues(this.state.flowId, checked, this.state.iconName, this.state.color, this.state.displayValue);
	}

	@autobind
	private onColorChanged(text: string) {
		this.setState({
			color: text
		});
		this.props.updateValues(this.state.flowId, this.state.showIcon, this.state.iconName, text, this.state.displayValue);
	}

	@autobind
	private onIconNameChanged(text: string) {
		this.setState({
			iconName: text
		});
		this.props.updateValues(this.state.flowId, this.state.showIcon, text, this.state.color, this.state.displayValue);
	}
}


/*
	Wizard Definition
*/

const calculateCode = (flowId:string, showIcon:boolean, iconName:string, color:string, displayValue:string): string => {
	let json:Array<string> = [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "button",',
			'  "customRowAction": {',
			'    "action": "executeFlow",',
			'    "actionParams": "{\\"id\\": \\"' + flowId + '\\"}"',
			'  },',
			'  "style": {',
			'    "border": "none",',
			'    "background-color": "transparent",',
			'    "color": "' + color + '",',
			'    "cursor": "pointer"',
			'  },',
			'  "children": ['];
	if(showIcon) {
		json.push(...[
			'    {',
			'      "elmType": "span",',
			'      "attributes": {',
			'        "iconName": "' + iconName + '"',
			'      },',
			'      "style": {',
			'        "padding-right": "6px"',
			'      }',
			'    },',
		]);
	}
	json.push(...[
			'    {',
			'      "elmType": "span",',
			'      "txtContent": "' + displayValue + '"',
			'    }',
			'  ]',
			'}'
	]);
	return json.join('\n');
};


export const WizardFlow: IWizard = {
	name: strings.WizardFlow_Name,
	description: strings.WizardFlow_Description,
	iconName: 'Flow',
	fieldTypes: [], //all
	isTemplate: false,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes, user?:IUserContext): Array<Array<any>> => {return standardWizardStartingRows(colType);},
	startingCode: (colType:columnTypes): string => {
		return calculateCode('',true,'Flow','#0078d7',"It's Flow Time!");
	},
	onWizardRender: (updateEditorString:(editorString:string) => void, colType:columnTypes): JSX.Element => {
		return (
			<WizardFlowPanel
			 displayValue="It's Flow Time!"
			 showIcon={true}
			 flowId=''
			 color='#0078d7'
			 iconName='Flow'
			 updateValues={(flowId:string, showIcon:boolean, iconName:string, color:string, displayValue:string) => {
				updateEditorString(calculateCode(flowId, showIcon, iconName, color, displayValue));
			 }}/>
		);
	}
};