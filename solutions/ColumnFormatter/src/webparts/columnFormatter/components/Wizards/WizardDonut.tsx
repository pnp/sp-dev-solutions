import * as strings from 'ColumnFormatterWebPartStrings';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import * as React from 'react';

import { columnTypes, IDataColumn, IUserContext } from '../../state/State';
import styles from '../ColumnFormatter.module.scss';
import { SpinButtonWithSuffix } from './Controls/SpinButtonWithSuffix';
import { StandardColorsDropdown } from './Controls/StandardColorsDropdown';
import { IWizard, standardWizardStartingColumns, standardWizardStartingRows } from './WizardCommon';

/*
Wizard Tab Rendering
*/

export interface IWizardDonutPanelProps {
	outerColor: string;
	innerColor: string;
	textColor: string;
	valueDisplay: string;
	size: number;
	showAsDonut: boolean;
	rangeEmpty: number;
	rangeFull: number;
	updateValues:(showAsDonut:boolean, size:number, valueDisplay:string, outerColor:string, innerColor:string, textColor:string, rangeEmpty:number, rangeFull:number) => void;
}

export interface IWizardDonutPanelState {
	outerColor: string;
	innerColor: string;
	textColor: string;
	valueDisplay: string;
	size: number;
	showAsDonut: boolean;
	rangeEmpty: number;
	rangeFull: number;
}

export class WizardDonutPanel extends React.Component<IWizardDonutPanelProps, IWizardDonutPanelState> {
	
	public constructor(props:IWizardDonutPanelProps){
		super(props);

		this.state = {
			outerColor: props.outerColor,
			innerColor: props.innerColor,
			textColor: props.textColor,
			valueDisplay: props.valueDisplay,
			size: props.size,
			showAsDonut: props.showAsDonut,
			rangeEmpty: props.rangeEmpty,
			rangeFull: props.rangeFull
		};
	}

	public render(): React.ReactElement<IWizardDonutPanelProps> {
		return (
			<div>
				<span className={styles.wizardGroupLabel}>{strings.Wizard_GroupLabelRange}</span>
				<SpinButtonWithSuffix
				 label={strings.Wizard_PercentRangeEmptyLabel + ':'}
				 title={strings.Wizard_PercentRangeEmptyTooltip}
				 initialValue={this.state.rangeEmpty}
				 onChanged={this.onRangeEmptyChanged}
				 labelPosition={Position.start}
				 labelWidth={33}
				 min={0}
				 max={this.state.rangeFull-1}/>
				<SpinButtonWithSuffix
				 label={strings.Wizard_PercentRangeFullLabel + ':'}
				 title={strings.Wizard_PercentRangeFullTooltip}
				 initialValue={this.state.rangeFull}
				 onChanged={this.onRangeFullChanged}
				 labelPosition={Position.start}
				 labelWidth={33}
				 min={this.state.rangeEmpty+1}/>

				<span className={styles.wizardGroupLabel}>{strings.Wizard_GroupLabelDisplay}</span>
				<Toggle
				 checked={this.state.showAsDonut}
				 onChanged={this.onShowAsDonutChanged}
				 onText={strings.WizardDonut_Donut}
				 offText={strings.WizardDonut_Pie}/>
				<SpinButtonWithSuffix
				 label={strings.Wizard_Size + ':'}
				 initialValue={this.state.size}
				 onChanged={this.onSizeChanged}
				 labelPosition={Position.start}
				 labelWidth={33}
				 suffix=' px'
				 min={40}
				 max={134}/>
				<StandardColorsDropdown
				 label={strings.WizardDonut_OuterColor + ':'}
				 onChanged={this.onOuterColorChanged}
				 selectedKey={this.state.outerColor}/>
				<StandardColorsDropdown
				 label={strings.WizardDonut_InnerColor + ':'}
				 onChanged={this.onInnerColorChanged}
				 selectedKey={this.state.innerColor}/>
				
				<span className={styles.wizardGroupLabel}>{strings.Wizard_GroupLabelValueDisplay}</span>
				<ChoiceGroup
				 selectedKey={this.state.valueDisplay}
				 onChange={this.onValueDisplayChange}
				 options={[
					{ key: 'value', text: strings.Wizard_ValueDisplayActual},
					{ key: 'percentage', text: strings.Wizard_ValueDisplayPercentage},
					{ key: 'none', text: strings.Wizard_ValueDisplayNone}
				 ]}/>
				{!this.state.showAsDonut &&
					<StandardColorsDropdown
					 label={strings.WizardDonut_TextColor + ':'}
					 onChanged={this.onTextColorChanged}
					 selectedKey={this.state.textColor}/>
				}
			</div>
		);
	}

	
	@autobind
	private onShowAsDonutChanged(checked: boolean): void {
		this.setState({ 
			showAsDonut: checked!
		});
		this.props.updateValues(checked, this.state.size, this.state.valueDisplay, this.state.outerColor, this.state.innerColor, this.state.textColor, this.state.rangeEmpty, this.state.rangeFull);
	}

	@autobind
	private onSizeChanged(value: number): void {
		this.setState({
			size: value
		});
		this.props.updateValues(this.state.showAsDonut, value, this.state.valueDisplay, this.state.outerColor, this.state.innerColor, this.state.textColor, this.state.rangeEmpty, this.state.rangeFull);
	}

	@autobind
	private onValueDisplayChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
		this.setState({ 
			valueDisplay: option.key
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, option.key, this.state.outerColor, this.state.innerColor, this.state.textColor, this.state.rangeEmpty, this.state.rangeFull);
	}

	@autobind
	private onOuterColorChanged(text: string) {
		this.setState({
			outerColor: text
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, this.state.valueDisplay, text, this.state.innerColor, this.state.textColor, this.state.rangeEmpty, this.state.rangeFull);
	}

	@autobind
	private onInnerColorChanged(text: string) {
		this.setState({
			innerColor: text
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, this.state.valueDisplay, this.state.outerColor, text, this.state.textColor, this.state.rangeEmpty, this.state.rangeFull);
	}

	@autobind
	private onTextColorChanged(text: string) {
		this.setState({
			textColor: text
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, this.state.valueDisplay, this.state.outerColor, this.state.innerColor, text, this.state.rangeEmpty, this.state.rangeFull);
	}

	@autobind
	private onRangeEmptyChanged(value: number): void {
		this.setState({
			rangeEmpty: value
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, this.state.valueDisplay, this.state.outerColor, this.state.innerColor, this.state.textColor, value, this.state.rangeFull);
	}

	@autobind
	private onRangeFullChanged(value: number): void {
		this.setState({
			rangeFull: value
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, this.state.valueDisplay, this.state.outerColor, this.state.innerColor, this.state.textColor, this.state.rangeEmpty, value);
	}
}


/*
	Wizard Definition
*/

const calculateCode = (showAsDonut:boolean, size:number, valueDisplay:string, outerColor:string, innerColor:string, textColor:string, rangeEmpty:number, rangeFull:number): string => {
	let full:string = size.toString();
	let half:string = (size/2).toString();
	let quarter:string = (size/4).toString();
	let fSize:string = (size/5).toString();

	let showValue:boolean = (valueDisplay != "none");

	let json:Array<string> = [
		'{',
		'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
		'  "elmType": "div",',
		'  "style": {',
		'    "padding": "4px",',
		'    "height": "' + full + 'px",',
		'    "width": "' + full + 'px"',
		'  },',
		'  "children": [',
		'    {',
		'      "elmType": "div",',
		'      "style": {',
		'        "display": "inline-block",',
		'        "background-color": "' + outerColor + '",',
		'        "border-radius": "100%",',
		'        "fill": "'+ innerColor + '",',
		'        "width": "' + full + 'px",',
		'        "height": "' + full + 'px",',
		'        "position": "absolute"',
		'      },',
		'      "children": [',
		'        {',
		'          "elmType": "svg",',
		'          "children": [',
		'            {',
		'              "elmType": "path",',
		'              "attributes": {',
		'                "d": {',
		'                  "operator": "+",',
		'                  "operands": [',
		'                    "M' + half + ',' + half +' L' + half + ',0, A' + half +',' + half + ' 0 ",',
		'                    {',
		'                      "operator": ":",',
		'                      "operands": [',
		'                        {',
		'                          "operator": "<=",',
		'                          "operands": [',
		'                            "@currentField",',
		'                            ' + (((rangeFull-rangeEmpty)/2) + rangeEmpty).toString(),
		'                          ]',
		'                        },',
		'                        "0",',
		'                        "1"',
		'                      ]',
		'                    },',
		'                    ",1 ",',
		'                    {',
		'                      "operator": "toString()",',
		'                      "operands": [',
		'                        {',
		'                          "operator": "+",',
		'                          "operands": [',
		'                            ' + half + ',',
		'                            {',
		'                              "operator": "*",',
		'                              "operands": [',
		'                                {',
		'                                  "operator": "sin",',
		'                                  "operands": [',
		'                                    {',
		'                                      "operator": "*",',
		'                                      "operands": [',
		'                                        6.2831853,',
		'                                        {',
		'                                          "operator": "/",',
		'                                          "operands": [',
		'                                            {',
		'                                              "operator": "-",',
		'                                              "operands": [',
		'                                                {',
		'                                                  "operator": "?",',
		'                                                  "operands": [',
		'                                                    {',
		'                                                      "operator": ">=",',
		'                                                      "operands": [',
		'                                                        "@currentField",',
		'                                                        ' + rangeFull.toString(),
		'                                                      ]',
		'                                                    },',
		'                                                    ' + (rangeFull - .0001).toString() + ',',
		'                                                    {',
		'                                                      "operator": "?",',
		'                                                      "operands": [',
		'                                                        {',
		'                                                          "operator": "<",',
		'                                                          "operands": [',
		'                                                            "@currentField",',
		'                                                            ' + rangeEmpty.toString(),
		'                                                          ]',
		'                                                        },',
		'                                                        ' + rangeEmpty.toString() + ',',
		'                                                        "@currentField"',
		'                                                      ]',
		'                                                    }',
		'                                                  ]',
		'                                                },',
		'                                                ' + rangeEmpty.toString(),
		'                                              ]',
		'                                            },',
		'                                            ' + (rangeFull-rangeEmpty).toString(),
		'                                          ]',
		'                                        }',
		'                                      ]',
		'                                    }',
		'                                  ]',
		'                                },',
		'                                ' + half,
		'                              ]',
		'                            }',
		'                          ]',
		'                        }',
		'                      ]',
		'                    },',
		'                    ",",',
		'                    {',
		'                      "operator": "toString()",',
		'                      "operands": [',
		'                        {',
		'                          "operator": "-",',
		'                          "operands": [',
		'                            ' + half + ',',
		'                            {',
		'                              "operator": "*",',
		'                              "operands": [',
		'                                {',
		'                                  "operator": "cos",',
		'                                  "operands": [',
		'                                    {',
		'                                      "operator": "*",',
		'                                      "operands": [',
		'                                        6.2831853,',
		'                                        {',
		'                                          "operator": "/",',
		'                                          "operands": [',
		'                                            {',
		'                                              "operator": "-",',
		'                                              "operands": [',
		'                                                {',
		'                                                  "operator": "?",',
		'                                                  "operands": [',
		'                                                    {',
		'                                                      "operator": ">=",',
		'                                                      "operands": [',
		'                                                        "@currentField",',
		'                                                        ' + rangeFull.toString(),
		'                                                      ]',
		'                                                    },',
		'                                                    ' + (rangeFull - .0001).toString() + ',',
		'                                                    {',
		'                                                      "operator": "?",',
		'                                                      "operands": [',
		'                                                        {',
		'                                                          "operator": "<",',
		'                                                          "operands": [',
		'                                                            "@currentField",',
		'                                                            ' + rangeEmpty.toString(),
		'                                                          ]',
		'                                                        },',
		'                                                        ' + rangeEmpty.toString() + ',',
		'                                                        "@currentField"',
		'                                                      ]',
		'                                                    }',
		'                                                  ]',
		'                                                },',
		'                                                ' + rangeEmpty.toString(),
		'                                              ]',
		'                                            },',
		'                                            ' + (rangeFull-rangeEmpty).toString(),
		'                                          ]',
		'                                        }',
		'                                      ]',
		'                                    }',
		'                                  ]',
		'                                },',
		'                                ' + half,
		'                              ]',
		'                            }',
		'                          ]',
		'                        }',
		'                      ]',
		'                    },',
		'                    " z"',
		'                  ]',
		'                }',
		'              }',
		'            }',
		'          ]',
		'        }',
		'      ]',
		'    },',
		'    {',
		'      "elmType": "div",',
		'      "style": {',
		'        "background-color": "' + (showAsDonut ? 'white' : 'transparent') + '",',
		'        "position": "relative",',
		'        "width": "' + half + 'px",',
		'        "height": "' + half + 'px",',
		'        "top": "0px",',
		'        "left": "' + quarter + 'px",',
		'        "border-radius": "100%",',
		'        "text-align": "center"',
		'      }' + (showValue ? ',' : '')];
	
	if(showValue){
		json.push(...[
		'      "children": [',
		'        {',
		'          "elmType": "div",']);
		if(valueDisplay == "value") {
			json.push(...[
		'          "txtContent": "@currentField",',
			]);
		} else {
			if(rangeEmpty == 0 && rangeFull == 100) {
				json.push(...[
		'          "txtContent": {',
		'            "operator": "+",',
		'            "operands": [',
		'              "@currentField",',
		'              "%"',
		'            ]',
		'          },']);
			} else {
				json.push(...[
		'          "txtContent": {',
		'            "operator": "+",',
		'            "operands": [',
		'              {',
		'                "operator": "*",',
		'                "operands": [',
		'                  100,',
		'                  {',
		'                    "operator": "/",',
		'                    "operands": [',
		'                      {',
		'                        "operator": "-",',
		'                        "operands": [',
		'                          "@currentField",',
		'                          ' + rangeEmpty.toString(),
		'                        ]',
		'                      },',
		'                      ' + (rangeFull-rangeEmpty).toString(),
		'                    ]',
		'                  }',
		'                ]',
		'              },',
		'              "%"',
		'            ]',
		'          },']);
			}
		}

		json.push(...[
		'          "style": {',
		'            "position": "relative",',
		'            "text-align": "center",',
		'            "width": "' + full + 'px",',
		'            "display": "inline",',
		'            "line-height":"' + half + 'px",',
		'            "font-size":"' + fSize + 'px"' + (!showAsDonut ? ',' : '')]);

		if(!showAsDonut){
			json.push(...[
		'            "color":"' + textColor + '"']);	
		}

		json.push(...[
		'          }',
		'        }',
		'      ]']);
	}

	json.push(...[
		'    }',
		'  ]',
		'}']);

	return json.join('\n');
};


export const WizardDonut: IWizard = {
	name: strings.WizardDonut_Name,
	description: strings.WizardDonut_Description,
	iconName: 'DonutChart',
	fieldTypes: [columnTypes.number],
	isTemplate: false,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes, user?:IUserContext): Array<Array<any>> => {return standardWizardStartingRows(colType);},
	startingCode: (colType:columnTypes): string => {
		return calculateCode(true,60,'percentage','#c8c8c8','#ff8c00','white',0,100);
	},
	onWizardRender: (updateEditorString:(editorString:string) => void, colType:columnTypes): JSX.Element => {
		return (
			<WizardDonutPanel
			 showAsDonut={true}
			 size={60}
			 valueDisplay="percentage"
			 outerColor='#c8c8c8'
			 innerColor='#ff8c00'
			 textColor='white'
			 rangeEmpty={0}
			 rangeFull={100}
			 updateValues={(showAsDonut:boolean, size:number, valueDisplay:string, outerColor:string, innerColor:string, textColor:string, rangeEmpty:number, rangeFull:number) => {
				updateEditorString(calculateCode(showAsDonut,size,valueDisplay,outerColor,innerColor,textColor,rangeEmpty,rangeFull));
			 }}/>
		);
	}
};