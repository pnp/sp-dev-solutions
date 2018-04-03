import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn } from '../../state/State';
import { IWizard, standardWizardStartingColumns } from './WizardCommon';

export const WizardMiniMap: IWizard = {
	name: strings.WizardMiniMap_Name,
	description: strings.WizardMiniMap_Description,
	iconName: 'MapPin',
	fieldTypes: [
		columnTypes.text,
		columnTypes.choice,
		columnTypes.lookup
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		if(colType == columnTypes.lookup) {
			return [
				[{lookupId: 1, lookupValue: 'Indianapolis, IN'}],
				[{lookupId: 1, lookupValue: 'Knoxville, TN'}],
				[{lookupId: 1, lookupValue: 'Tokyo, Japan'}],
				[{lookupId: 1, lookupValue: 'Pittsburgh, PA'}]
			];	
		}
		return [
			['Indianapolis, IN'],
			['Knoxville, TN'],
			['Tokyo, Japan'],
			['Pittsburgh, PA']
		];
	},
	startingCode: (colType:columnTypes): string => {
		let currentField:string = '@currentField';
		if(colType == columnTypes.lookup) {
			currentField = '@currentField.lookupValue';
		}

		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "style": {',
			'    "border": "2px solid #666666",',
			'    "width": "128px",',
			'    "height": "64px"',
			'  },',
			'  "children": [',
			'    {',
			'      "elmType": "a",',
			'      "attributes": {',
			'        "href": {',
			'          "operator": "+",',
			'          "operands": [',
			'            "https://www.google.com/maps/place/",',
			'            "' + currentField + '",',
			'            "/"',
			'          ]',
			'        },',
			'        "target": "_blank"',
			'      },',
			'      "style": {',
			'        "height": "100%"',
			'      },',
			'      "children": [',
			'        {',
			'          "elmType": "img",',
			'          "attributes": {',
			'            "src": {',
			'              "operator": "+",',
			'              "operands": [',
			'                "https://maps.googleapis.com/maps/api/staticmap?",',
			'                "center=",',
			'                "' + currentField + '",',
			'                "&size=128x64",',
			'                "&key=AIzaSyDKNauYNcs4ZOq7sQMWYDyz1x82l00ek34"',
			'              ]',
			'            }',
			'          }',
			'        }',
			'      ]',
			'    }',
			'  ]',
			'}'
		].join('\n');
	}
};