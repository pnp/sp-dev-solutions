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

export interface IWizardDonutPanelProps {
	outerColor: string;
	innerColor: string;
	textColor: string;
	showValue: boolean;
	size: number;
	showAsDonut: boolean;
	updateValues:(showAsDonut:boolean, size:number, showValue:boolean, outerColor:string, innerColor:string, textColor:string) => void;
}

export interface IWizardDonutPanelState {
	outerColor: string;
	innerColor: string;
	textColor: string;
	showValue: boolean;
	size: number;
	showAsDonut: boolean;
}

export class WizardDonutPanel extends React.Component<IWizardDonutPanelProps, IWizardDonutPanelState> {
	
	public constructor(props:IWizardDonutPanelProps){
		super(props);

		this.state = {
			outerColor: props.outerColor,
			innerColor: props.innerColor,
			textColor: props.textColor,
			showValue: props.showValue,
			size: props.size,
			showAsDonut: props.showAsDonut
		};
	}

	public render(): React.ReactElement<IWizardDonutPanelProps> {
		return (
			<div>
				<Toggle
				 checked={this.state.showAsDonut}
				 onChanged={this.onShowAsDonutChanged}
				 onText={strings.WizardDonutDonut}
				 offText={strings.WizardDonutPie}/>

				<Toggle
				 checked={this.state.showValue}
				 onChanged={this.onShowValueChanged}
				 onText={strings.WizardDonutValueOn}
				 offText={strings.WizardDonutValueOff}/>
				<StandardColorsDropdown
				 label={strings.WizardDonutOuterColor}
				 onChanged={this.onOuterColorChanged}
				 selectedKey={this.state.outerColor}/>
				<StandardColorsDropdown
				 label={strings.WizardDonutInnerColor}
				 onChanged={this.onInnerColorChanged}
				 selectedKey={this.state.innerColor}/>
				{!this.state.showAsDonut &&
					<StandardColorsDropdown
					 label={strings.WizardDonutTextColor}
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
		this.props.updateValues(checked, this.state.size, this.state.showValue, this.state.outerColor, this.state.innerColor, this.state.textColor);
	}

	@autobind
	private onShowValueChanged(checked: boolean): void {
		this.setState({ 
			showValue: checked!
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, checked, this.state.outerColor, this.state.innerColor, this.state.textColor);
	}

	@autobind
	private onOuterColorChanged(text: string) {
		this.setState({
			outerColor: text
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, this.state.showValue, text, this.state.innerColor, this.state.textColor);
	}

	@autobind
	private onInnerColorChanged(text: string) {
		this.setState({
			innerColor: text
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, this.state.showValue, this.state.outerColor, text, this.state.textColor);
	}

	@autobind
	private onTextColorChanged(text: string) {
		this.setState({
			textColor: text
		});
		this.props.updateValues(this.state.showAsDonut, this.state.size, this.state.showValue, this.state.outerColor, this.state.innerColor, text);
	}
}


/*
	Wizard Definition
*/

const calculateCode = (showAsDonut:boolean, size:number, showValue:boolean, outerColor:string, innerColor:string, textColor:string): string => {
	let full:string = size.toString();
	let half:string = (size/2).toString();
	let quarter:string = (size/4).toString();
	let fSize:string = (size/5).toString();

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
		'                    "M50,50 L50,0, A50,50 0 ",',
		'                    {',
		'                      "operator": ":",',
		'                      "operands": [',
		'                        {',
		'                          "operator": "<=",',
		'                          "operands": [',
		'                            "@currentField",',
		'                            50',
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
		'                            50,',
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
		'                                              "operator": "?",',
		'                                              "operands": [',
		'                                                {',
		'                                                  "operator": ">=",',
		'                                                  "operands": [',
		'                                                    "@currentField",',
		'                                                    100',
		'                                                  ]',
		'                                                },',
		'                                                99.9999,',
		'                                                {',
		'                                                  "operator": "?",',
		'                                                  "operands": [',
		'                                                    {',
		'                                                      "operator": "<",',
		'                                                      "operands": [',
		'                                                        "@currentField",',
		'                                                        0',
		'                                                      ]',
		'                                                    },',
		'                                                    0,',
		'                                                    "@currentField"',
		'                                                  ]',
		'                                                }',
		'                                              ]',
		'                                            },',
		'                                            100',
		'                                          ]',
		'                                        }',
		'                                      ]',
		'                                    }',
		'                                  ]',
		'                                },',
		'                                50',
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
		'                            50,',
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
		'                                              "operator": "?",',
		'                                              "operands": [',
		'                                                {',
		'                                                  "operator": ">=",',
		'                                                  "operands": [',
		'                                                    "@currentField",',
		'                                                    100',
		'                                                  ]',
		'                                                },',
		'                                                99.9999,',
		'                                                {',
		'                                                  "operator": "?",',
		'                                                  "operands": [',
		'                                                    {',
		'                                                      "operator": "<",',
		'                                                      "operands": [',
		'                                                        "@currentField",',
		'                                                        0',
		'                                                      ]',
		'                                                    },',
		'                                                    0,',
		'                                                    "@currentField"',
		'                                                  ]',
		'                                                }',
		'                                              ]',
		'                                            },',
		'                                            100',
		'                                          ]',
		'                                        }',
		'                                      ]',
		'                                    }',
		'                                  ]',
		'                                },',
		'                                50',
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
		'          "elmType": "div",',
		'          "txtContent": {',
		'            "operator": "+",',
		'            "operands": [',
		'              "@currentField",',
		'              "%"',
		'            ]',
		'          },',
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
	name: strings.WizardDonutName,
	description: strings.WizardDonutDescription,
	iconName: 'DonutChart',
	fieldTypes: [columnTypes.number],
	isTemplate: false,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes, user?:IUserContext): Array<Array<any>> => {return standardWizardStartingRows(colType);},
	startingCode: (colType:columnTypes): string => {
		return calculateCode(true,100,true,'#c8c8c8','#ff8c00','white');
	},
	onWizardRender: (updateEditorString:(editorString:string) => void, colType:columnTypes): JSX.Element => {
		return (
			<WizardDonutPanel
			 showAsDonut={true}
			 size={100}
			 showValue={true}
			 outerColor='#c8c8c8'
			 innerColor='#ff8c00'
			 textColor='white'
			 updateValues={(showAsDonut:boolean, size:number, showValue:boolean, outerColor:string, innerColor:string, textColor:string) => {
				updateEditorString(calculateCode(showAsDonut,size,showValue,outerColor,innerColor,textColor));
			 }}/>
		);
	}
};