import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn, IUserContext } from '../../state/State';
import { generateRowValue } from '../../state/ValueGeneration';
import { IWizard, standardWizardStartingColumns } from './WizardCommon';

export const WizardCurrentUser: IWizard = {
	name: strings.WizardCurrentUser_Name,
	description: strings.WizardCurrentUser_Description,
	iconName: 'ReminderPerson',
	fieldTypes: [
		columnTypes.person
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes, user?:IUserContext): Array<Array<any>> => {
		return [
			[generateRowValue(colType)],
			[generateRowValue(colType)],
			[{
				title: user.displayName,
				id: 1,
				email: user.email,
				sip: user.email,
				picture: ''
			}],
			[generateRowValue(colType)]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "txtContent": "@currentField.title",',
			'  "style": {',
			'    "color": {',
			'      "operator": "?",',
			'      "operands": [',
			'        {',
			'          "operator": "==",',
			'          "operands": [',
			'            "@me",',
			'            "@currentField.email"',
			'          ]',
			'        },',
			'        "orangered",',
			'        "inherit"',
			'      ]',
			'    }',
			'  }',
			'}'
		].join('\n');
	}
};