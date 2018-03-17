import * as strings from 'ColumnFormatterWebPartStrings';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ISpinButtonStyles, SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import * as React from 'react';

import { columnTypes, IDataColumn } from '../../state/State';
import styles from '../ColumnFormatter.module.scss';
import { IWizard, standardWizardStartingColumns } from './WizardCommon';

/*
Wizard Tab Rendering
*/

const emptyBarStyle: Partial<ISpinButtonStyles> = {
	labelWrapper: {
		paddingRight: '5px'
	},
	spinButtonWrapper: {
		paddingLeft: '1px'
	}
};

export interface IWizardDataBarsPanelProps {
	emptyBarValue:number;
	fullBarValue:number;
	updateValues:(emptyBarValue:number, fullBarValue:number, valueDisplay:string) => void;
}

export interface IWizardDataBarsPanelState {
	emptyBarValue:number;
	fullBarValue:number;
	valueDisplay:string;
}

export class WizardDataBarsPanel extends React.Component<IWizardDataBarsPanelProps, IWizardDataBarsPanelState> {
	
	public constructor(props:IWizardDataBarsPanelProps){
		super(props);

		this.state = {
			emptyBarValue: props.emptyBarValue,
			fullBarValue: props.fullBarValue,
			valueDisplay: 'value'
		};
	}

	public render(): React.ReactElement<IWizardDataBarsPanelProps> {
		return (
			<div>
				<span className={styles.wizardGroupLabel}>{strings.Wizard_GroupLabelRange}</span>
				<SpinButton
				 value={this.state.emptyBarValue.toString()}
				 label={strings.Wizard_PercentRangeEmptyLabel}
				 labelPosition={Position.start}
				 title={strings.Wizard_PercentRangeEmptyTooltip}
				 styles={emptyBarStyle}
				 onValidate={this.onValidateEmptyBarValue}
				 onIncrement={this.onIncrementEmptyBarValue}
				 onDecrement={this.onDecrementEmptyBarValue}/>
				<SpinButton
				 value={this.state.fullBarValue.toString()}
				 label={strings.Wizard_PercentRangeFullLabel}
				 title={strings.Wizard_PercentRangeFullTooltip}
				 labelPosition={Position.start}
				 onValidate={this.onValidateFullBarValue}
				 onIncrement={this.onIncrementFullBarValue}
				 onDecrement={this.onDecrementFullBarValue}/>

				<span className={styles.wizardGroupLabel}>{strings.Wizard_GroupLabelValueDisplay}</span>
				<ChoiceGroup
				 selectedKey={this.state.valueDisplay}
				 onChange={this.onValueDisplayChange}
				 options={[
					{ key: 'value', text: strings.Wizard_ValueDisplayActual},
					{ key: 'percentage', text: strings.Wizard_ValueDisplayPercentage},
					{ key: 'none', text: strings.Wizard_ValueDisplayNone}
				 ]}/>
			</div>
		);
	}

	@autobind
	private onValidateEmptyBarValue(value:string): string {
		if(isNaN(+value)){
			value = this.props.emptyBarValue.toString();
		}
		let numValue: number = +value;
		if(numValue < 0) {
			numValue = 0;
		}
		this.props.updateValues(numValue, this.state.fullBarValue, this.state.valueDisplay);
		this.setState({
			emptyBarValue: numValue
		});
		return numValue.toString();
	}

	@autobind
	private onIncrementEmptyBarValue(value:string): string {
		let newValue: number = +value + 1;
		return this.onValidateEmptyBarValue(newValue.toString());
	}

	@autobind
	private onDecrementEmptyBarValue(value:string): string {
		let newValue: number = +value - 1;
		return this.onValidateEmptyBarValue(newValue.toString());
	}

	@autobind
	private onValidateFullBarValue(value:string): string {
		if(isNaN(+value)){
			value = this.props.fullBarValue.toString();
		}
		let numValue: number = +value;
		if(numValue < this.state.emptyBarValue) {
			numValue = this.state.emptyBarValue + 1;
		}
		this.props.updateValues(this.state.emptyBarValue, numValue, this.state.valueDisplay);
		this.setState({
			fullBarValue: numValue
		});
		return numValue.toString();
	}

	@autobind
	private onIncrementFullBarValue(value:string): string {
		let newValue: number = +value + 1;
		return this.onValidateFullBarValue(newValue.toString());
	}

	@autobind
	private onDecrementFullBarValue(value:string): string {
		let newValue: number = +value - 1;
		return this.onValidateFullBarValue(newValue.toString());
	}

	@autobind
	private onValueDisplayChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
	  this.props.updateValues(this.state.emptyBarValue, this.state.fullBarValue, option.key);
	  this.setState({
		  valueDisplay: option.key
	  });
	}
}


/*
	Wizard Definition
*/

const calculateCode = (emptyBarValue:number, fullBarValue:number, valueDisplay:string): string => {
	let percentage:number = 100 / (fullBarValue - emptyBarValue);
	
	let txtContent:string = '  "txtContent": "@currentField",';
	if(valueDisplay == 'none') {
		txtContent = '  "txtContent": "",';
	}
	if(valueDisplay == 'percentage') {
		txtContent = ['  "txtContent": {',
		              '    "operator": "+",',
					  '    "operands": [',
					  '      {',
					  '        "operator": "toString()",',
					  '        "operands": [',
					  '          {',
					  '            "operator": "*",',
					  '            "operands": [',
					  '              ' + percentage + ',',
					  '              {',
					  '                "operator": "-",',
					  '                "operands":[',
					  '                  "@currentField",',
					  '                 ' + emptyBarValue,
					  '                ]',
					  '              }',
					  '            ]',
					  '          }',
					  '        ]',
					  '      },',
					  '      " %"',
					  '    ]',
					  '  },'
					].join('\n');
	}

	return [
		'{',
		'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
		'  "debugMode": true,',
		'  "elmType": "div",',
		txtContent,
		'  "attributes": {',
		'    "class": "sp-field-dataBars"',
		'  },',
		'  "style": {',
		'    "width": {',
		'      "operator": "?",',
		'      "operands": [',
		'        {',
		'          "operator": ">",',
		'          "operands": [',
		'            "@currentField",',
		'            ' + fullBarValue.toString(),
		'          ]',
		'        },',
		'        "100%",',
		'        {',  
		'          "operator": "?",',
		'          "operands": [',
		'            {',
		'              "operator": "<",',
		'              "operands": [',
		'                "@currentField",',
		'                ' + emptyBarValue.toString(),
		'              ]',
		'            },',
		'            "0",',
		'            {',
		'              "operator": "+",',
		'              "operands": [',
		'                {',
		'                  "operator": "toString()",',
		'                  "operands": [',
		'                    {',
		'                      "operator": "*",',
		'                      "operands": [',
		'                        ' + percentage + ',',
		'                        {',
		'                          "operator": "-",',
		'                          "operands":[',
	    '                            "@currentField",',
		'                            ' + emptyBarValue.toString(),
		'                          ]',
		'                        }',
		'                      ]',
		'                    }',
		'                  ]',
		'                },',
		'                "%"',
		'              ]',
		'            }',
		'          ]',
		'        }',
		'      ]',
		'    }',
		'  }',
		'}'
	].join('\n');
};


export const WizardDataBars: IWizard = {
	name: strings.WizardDataBarsName,
	description: strings.WizardDataBarsDescription,
	iconName: 'BarChartHorizontal',
	fieldTypes: [
		columnTypes.number
	],
	isTemplate: false,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		return [
			[10],
			[4],
			[20],
			[1]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return calculateCode(0,20,'value');
	},
	onWizardRender: (updateEditorString:(editorString:string) => void, colType:columnTypes): JSX.Element => {
		return (
			<WizardDataBarsPanel
			 emptyBarValue={0}
			 fullBarValue={20}
			 updateValues={(emptyBarValue:number, fullBarValue:number, valueDisplay:string) => {
				updateEditorString(calculateCode(emptyBarValue, fullBarValue, valueDisplay));
			 }}/>
		);
	}
};