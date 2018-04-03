import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn } from '../../state/State';
import { IWizard, standardWizardStartingColumns, standardWizardStartingRows } from './WizardCommon';

export const WizardActionLink: IWizard = {
	name: strings.WizardActionLink_Name,
	description: strings.WizardActionLink_Description,
	iconName: 'Lightbulb',
	fieldTypes: [
		columnTypes.link
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes): Array<Array<any>> => {return standardWizardStartingRows(colType);},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "children": [',
			'    {',
			'      "elmType": "span",',
			'      "style": {',
			'        "padding-right": "8px"',
			'      },',
			'      "txtContent": "Do Action"',
			'    },',
			'    {',
			'      "elmType": "a",',
			'      "attributes": {',
			'        "iconName": "Lightbulb",',
			'        "class": "sp-field-quickAction",',
			'        "href": "@currentField",',
			'        "target": "_blank"',
			'      },',
			'      "style": {',
			'        "text-decoration": "none"',
			'      }',
			'    }',
			'  ]',
			'}'
		].join('\n');
	}
};