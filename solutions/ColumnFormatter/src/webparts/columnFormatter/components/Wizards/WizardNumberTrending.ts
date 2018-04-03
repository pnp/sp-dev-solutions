import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn } from '../../state/State';
import { generateRowValue } from '../../state/ValueGeneration';
import { IWizard } from './WizardCommon';

export const WizardNumberTending: IWizard = {
	name: strings.WizardNumberTrending_Name,
	description: strings.WizardNumberTrending_Description,
	iconName: 'Sort',
	fieldTypes: [
		columnTypes.number
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {
		return [
			{
				name: strings.WizardNumberTrending_Current,
				type: colType
			},
			{
				name: strings.WizardNumberTrending_Previous,
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
			'                "[$' + strings.WizardNumberTrending_Previous + ']"',
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
			'                    "[$' + strings.WizardNumberTrending_Previous + ']"',
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
			'                "[$' + strings.WizardNumberTrending_Previous + ']"',
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
			'                    "[$' + strings.WizardNumberTrending_Previous + ']"',
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
			'                "[$' + strings.WizardNumberTrending_Previous + ']"',
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