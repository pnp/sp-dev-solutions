import * as strings from 'ColumnFormatterWebPartStrings';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import * as React from 'react';

import { columnTypes, IDataColumn } from '../../state/State';
import styles from '../ColumnFormatter.module.scss';
import { SpinButtonWithSuffix } from './Controls/SpinButtonWithSuffix';
import { IWizard, standardWizardStartingColumns } from './WizardCommon';

/*
Wizard Tab Rendering
*/

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
				<SpinButtonWithSuffix
				 label={strings.Wizard_PercentRangeEmptyLabel + ':'}
				 initialValue={this.state.emptyBarValue}
				 onChanged={this.onEmptyBarValueChanged}
				 labelPosition={Position.start}
				 title={strings.Wizard_PercentRangeEmptyTooltip}
				 labelWidth={33}
				 min={0}
				 max={this.state.fullBarValue-1}/>
				<SpinButtonWithSuffix
				 label={strings.Wizard_PercentRangeFullLabel + ':'}
				 initialValue={this.state.fullBarValue}
				 onChanged={this.onFullBarValueChanged}
				 labelPosition={Position.start}
				 title={strings.Wizard_PercentRangeFullTooltip}
				 labelWidth={33}
				 min={this.state.emptyBarValue+1}/>

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
	private onEmptyBarValueChanged(value:number): void {
		this.setState({
			emptyBarValue: value
		});
		this.props.updateValues(value, this.state.fullBarValue, this.state.valueDisplay);
	}

	@autobind
	private onFullBarValueChanged(value:number): void {
		this.setState({
			fullBarValue: value
		});
		this.props.updateValues(this.state.emptyBarValue, value, this.state.valueDisplay);
	}

	@autobind
	private onValueDisplayChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
	  this.setState({
		  valueDisplay: option.key
	  });
	  this.props.updateValues(this.state.emptyBarValue, this.state.fullBarValue, option.key);
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
	name: strings.WizardDataBars_Name,
	description: strings.WizardDataBars_Description,
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