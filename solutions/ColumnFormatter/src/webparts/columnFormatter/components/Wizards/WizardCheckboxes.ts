import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn } from '../../state/State';
import { IWizard, standardWizardStartingColumns } from './WizardCommon';

export const WizardCheckboxes: IWizard = {
	name: strings.WizardCheckboxes_Name,
	description: strings.WizardCheckboxes_Description,
	iconName: 'CheckboxComposite',
	fieldTypes: [
		columnTypes.boolean
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		return [
			[true],
			[false],
			[true],
			[false]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "attributes": {',
			'    "iconName": {',
			'      "operator": "?",',
			'      "operands": [',
			'        "@currentField",',
			'        "CheckboxComposite",',
			'        "Checkbox"',
			'      ]',
			'    }',
			'  },',
			'  "style": {',
			'    "font-size":"large",',
			'    "color":"black"',
			'  }',
			'}'
		].join('\n');
	}
};