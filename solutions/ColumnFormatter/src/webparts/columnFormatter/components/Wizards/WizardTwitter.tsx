import * as strings from 'ColumnFormatterWebPartStrings';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { columnTypes, IDataColumn, IUserContext } from '../../state/State';
import { SpinButtonWithSuffix } from './Controls/SpinButtonWithSuffix';
import { addIndent, IWizard, standardWizardStartingColumns } from './WizardCommon';

/*
Wizard Tab Rendering
*/

export interface IWizardTwitterPanelProps {
	size: string;
	rounding: number;
	linkToProfile: boolean;
	showTooltip: boolean;
	updateValues:(size:string, rounding:number, linkToProfile:boolean, showTooltip:boolean) => void;
}

export interface IWizardTwitterPanelState {
	size: string;
	rounding: number;
	linkToProfile: boolean;
	showTooltip: boolean;
}

export class WizardTwitterPanel extends React.Component<IWizardTwitterPanelProps, IWizardTwitterPanelState> {
	
	public constructor(props:IWizardTwitterPanelProps){
		super(props);

		this.state = {
			size: props.size,
			rounding: props.rounding,
			linkToProfile: props.linkToProfile,
			showTooltip: props.showTooltip
		};
	}

	public render(): React.ReactElement<IWizardTwitterPanelProps> {
		return (
			<div>
				<ChoiceGroup
				 selectedKey={this.state.size}
				 onChange={this.onSizeChanged}
				 options={[
					{key:'mini', text:'Mini (24x24)'},
					{key:'normal', text:'Normal (48x48)'},
					{key:'bigger', text:'Bigger (73x73)'}
				 ]}/>
				<SpinButtonWithSuffix
				 label={strings.WizardTwitter_Rounding}
				 initialValue={this.state.rounding}
				 onChanged={this.onRoundingChanged}
				 suffix='%'
				 min={0}
				 max={50}/>
				<Toggle
				 checked={this.state.linkToProfile}
				 onChanged={this.onLinkToProfileChanged}
				 onText={strings.WizardTwitter_LinkOn}
				 offText={strings.WizardTwitter_LinkOff}/>
				<Toggle
				 checked={this.state.showTooltip}
				 onChanged={this.onShowTooltipChanged}
				 onText={strings.Wizard_TooltipOn}
				 offText={strings.Wizard_TooltipOff}/>
			</div>
		);
	}


	@autobind
	private onSizeChanged(ev: React.FormEvent<HTMLInputElement>, option: any) {
		this.setState({
			size: option.key
		});
		this.props.updateValues(option.key, this.state.rounding, this.state.linkToProfile, this.state.showTooltip);
	}

	@autobind
	private onRoundingChanged(value: number): void {
		this.setState({
			rounding: value
		});
		this.props.updateValues(this.state.size, value, this.state.linkToProfile, this.state.showTooltip);
	}

	@autobind
	private onLinkToProfileChanged(checked: boolean): void {
		this.setState({ 
			linkToProfile: checked!
		});
		this.props.updateValues(this.state.size, this.state.rounding, checked, this.state.showTooltip);
	}

	@autobind
	private onShowTooltipChanged(checked: boolean): void {
		this.setState({ 
			showTooltip: checked!
		});
		this.props.updateValues(this.state.size, this.state.rounding, this.state.linkToProfile, checked);
	}
}


/*
	Wizard Definition
*/

const calculateCode = (colType:columnTypes, size:string, rounding:number, linkToProfile:boolean, showTooltip:boolean): string => {
	let sizePx: string;
	switch(size){
		case "mini":
			sizePx = "24";
			break;
		case "normal":
			sizePx = "48";
			break;
		case "bigger":
			sizePx = "73";
			break;
	}

	let currentField:string = '@currentField';
	if(colType == columnTypes.lookup) {
		currentField = '@currentField.lookupValue';
	}

	let json:Array<string> = [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "children": [',
			'    {',
			'      "elmType": "div",',
			'      "style": {',
			'        "margin": "2px",',
			'        "width": "' + sizePx + 'px",',
			'        "height": "' + sizePx + 'px",',
			'        "overflow": "hidden",',
			'        "border-radius": "' + rounding.toString() + '%"',
			'      },',
			'      "children": ['];

	let imgJson:Array<string> = [
			'        {',
			'          "elmType": "img",',
			'          "attributes": {',
			'            "src": {',
			'              "operator": "+",',
			'              "operands": [',
			'                "https://twitter.com/",',
			'                "' + currentField + '",',
			'                "/profile_image?size=' + size + '"',
			'              ]',
			'            }' + (showTooltip ? ',' : '')];

	if(showTooltip){
		imgJson.push(...[
			'            "title": {',
			'              "operator": "+",',
			'              "operands": [',
			'                "@",',
			'                "' + currentField + '"',
			'              ]',
			'            }']);
	}

	imgJson.push(...[
			'          },',
			'          "style": {',
			'            "position": "relative",',
			'            "top": "50%",',
			'            "left": "50%",',
			'            "width": "100%",',
			'            "height": "auto",',
			'            "margin-left": "-50%",',
			'            "margin-top": "-50%"',
			'          }',
			'        }']);
		

	if(linkToProfile){
		json.push(...[
			'        {',
			'          "elmType": "a",',
			'          "attributes": {',
			'            "href": {',
			'              "operator": "+",',
			'              "operands": [',
			'                "https://twitter.com/",',
			'                "' + currentField + '"',
			'              ]',
			'            },',
			'            "target": "_blank"',
			'          },',
			'          "children": [']);
		
		json.push(...addIndent(imgJson,'    '));

		json.push(...[
			'          ]',
			'        }']);
	} else {
		json.push(...imgJson);
	}

	json.push(...[
			'      ]',
			'    }',
			'  ]',
			'}']);
		
	return json.join('\n');
};


export const WizardTwitter: IWizard = {
	name: strings.WizardTwitter_Name,
	description: strings.WizardTwitter_Description,
	iconName: 'Feedback',
	fieldTypes: [
		columnTypes.choice,
		columnTypes.lookup,
		columnTypes.text
	],
	isTemplate: false,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes, user?:IUserContext): Array<Array<any>> => {
		if(colType == columnTypes.lookup) {
			return [
				[{lookupId: 1, lookupValue: 'theChrisKent'}],
				[{lookupId: 1, lookupValue: 'vesajuvonen'}],
				[{lookupId: 1, lookupValue: 'sympmarc'}],
				[{lookupId: 1, lookupValue: 'thomyg'}]
			];	
		}
		return [
			['theChrisKent'],
			['vesajuvonen'],
			['sympmarc'],
			['thomyg']
		];
	},
	startingCode: (colType:columnTypes): string => {
		return calculateCode(colType, "normal", 50, true, true);
	},
	onWizardRender: (updateEditorString:(editorString:string) => void, colType:columnTypes): JSX.Element => {
		return (
			<WizardTwitterPanel
			 size="normal"
			 rounding={50}
			 linkToProfile={true}
			 showTooltip={true}
			 updateValues={(size:string, rounding:number, linkToProfile:boolean, showTooltip:boolean) => {
				updateEditorString(calculateCode(colType, size, rounding, linkToProfile, showTooltip));
			 }}/>
		);
	}
};