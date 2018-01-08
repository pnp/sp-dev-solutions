import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn } from '../../state/State';
import { generateRowValue } from '../../state/ValueGeneration';
import { IWizard } from './WizardCommon';

export const WizardNumberTending: IWizard = {
	name: strings.WizardNumberTrendingName,
	description: strings.WizardNumberTrendingDescription,
	iconName: 'Sort',
	fieldTypes: [
		columnTypes.number
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {
		return [
			{
				name: strings.WizardNumberTrendingCurrent,
				type: colType
			},
			{
				name: strings.WizardNumberTrendingPrevious,
				type: columnTypes.number
			}
		];
	},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		return [
			[400, 500],
			[200, 100],
			[300, 300],
			[10, 5]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "debugMode": true,',
			'  "elmType": "div",',
			'  "children": [',
			'    {',
			'      "elmType": "span",',
			'      "attributes": {',
			'        "class": {',
			'          "operator": "?",',
			'          "operands": [',
			'            {',
			'              "operator": ">",',
			'              "operands": [',
			'                "@currentField",',
			'                "[$' + strings.WizardNumberTrendingPrevious + ']"',
			'              ]',
			'            },',
			'            "sp-field-trending--up",',
			'            {',
			'              "operator": "?",',
			'              "operands": [',
			'                {',
			'                  "operator": "<",',
			'                  "operands": [',
			'                    "@currentField",',
			'                    "[$' + strings.WizardNumberTrendingPrevious + ']"',
			'                  ]',
			'                },',
			'                "sp-field-trending--down",',
			'                ""',
			'              ]',
			'            }',
			'          ]',
			'        },',
			'        "iconName": {',
			'          "operator": "?",',
			'          "operands": [',
			'            {',
			'              "operator": ">",',
			'              "operands": [',
			'                "@currentField",',
			'                "[$' + strings.WizardNumberTrendingPrevious + ']"',
			'              ]',
			'            },',
			'            "SortUp",',
			'            {',
			'              "operator": "?",',
			'              "operands": [',
			'                {',
			'                  "operator": "<",',
			'                  "operands": [',
			'                    "@currentField",',
			'                    "[$' + strings.WizardNumberTrendingPrevious + ']"',
			'                  ]',
			'                },',
			'                "SortDown",',
			'                ""',
			'              ]',
			'            }',
			'          ]',
			'        }',
			'      },',
			'      "style": {',
			'        "padding-left": {',
			'          "operator": "?",',
			'          "operands": [',
			'            {',
			'              "operator": "==",',
			'              "operands": [',
			'                "@currentField",',
			'                "[$' + strings.WizardNumberTrendingPrevious + ']"',
			'              ]',
			'            },',
			'            "12px",',
			'            "0"',
			'          ]',
			'        }',
			'      }',
			'    },',
			'    {',
			'      "elmType": "span",',
			'      "txtContent": "@currentField"',
			'    }',
			'  ]',
			'}'
		].join('\n');
	}
};