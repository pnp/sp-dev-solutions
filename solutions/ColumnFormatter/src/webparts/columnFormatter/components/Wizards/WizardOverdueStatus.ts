import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn } from '../../state/State';
import { IWizard } from './WizardCommon';

export const WizardOverdueStatus: IWizard = {
	name: strings.WizardOverdueStatus_Name,
	description: strings.WizardOverdueStatus_Description,
	iconName: 'RingerOff',
	fieldTypes: [
		columnTypes.datetime
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {
		return [
			{
				name: strings.DataColumn_DefaultName,
				type: colType
			},
			{
				name: strings.WizardOverdueStatus_StatusColumn,
				type: columnTypes.choice
			}
		];
	},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		let today:Date = new Date();
		let tomorrow:Date = new Date(new Date().setTime(today.getTime() + 1 * 86400000));
		let old = new Date(new Date().setTime(today.getTime() - 5 * 86400000));
		let older = new Date(new Date().setTime(today.getTime() - 30 * 86400000));
		today = new Date(new Date().setTime(today.getTime() + 3600000));
		return [
			[today, strings.WizardOverdueStatus_Complete],
			[old, strings.WizardOverdueStatus_Complete],
			[tomorrow, strings.WizardOverdueStatus_InProgress],
			[older, strings.WizardOverdueStatus_InProgress]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "txtContent": "@currentField",',
			'  "style": {',
			'    "color": {',
			'      "operator": "?",',
			'      "operands": [',
			'        {',
			'          "operator": "&&",',
			'          "operands": [',
			'            {',
			'              "operator": "<=",',
			'              "operands": [',
			'                "@currentField",',
			'                "@now"',
			'              ]',
			'            },',
			'            {',
			'              "operator": "!=",',
			'              "operands": [',
			'                "[$' + strings.WizardOverdueStatus_StatusColumn + ']",',
			'                "' + strings.WizardOverdueStatus_Complete + '"',
			'              ]',
			'            }',
			'          ]',
			'        },',
			'        "#a80000",',
			'        ""',
			'      ]',
			'    }',
			'  }',
			'}'
		].join('\n');
	}
};