import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn, IUserContext } from '../../state/State';
import { generatePictureLink } from '../../state/ValueGeneration';
import { IWizard, standardWizardStartingColumns } from './WizardCommon';

export const WizardRoundImage: IWizard = {
	name: strings.WizardRoundImage_Name,
	description: strings.WizardRoundImage_Description,
	iconName: 'Soccer',
	fieldTypes: [
		columnTypes.picture,
		columnTypes.person
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes, user?:IUserContext): Array<Array<any>> => {
		if(colType == columnTypes.picture) {
			return [
				[generatePictureLink(160,160)],
				[generatePictureLink(160,160)],
				[generatePictureLink(160,160)],
				[generatePictureLink(160,160)]
			];
		}
		return [
			[{
				title: user.displayName,
				id: 1,
				email: user.email,
				sip: user.email,
				picture: ''
			}]
		];
	},
	startingCode: (colType:columnTypes): string => {
		let src:string = '            "src": "@currentField"';
		if(colType == columnTypes.person) {
			src = [
				'            "src": {',
				'              "operator": "+",',
				'              "operands": [',
				'                "/_layouts/15/userphoto.aspx?size=S&accountname=",',
				'                "@currentField.email"',
				'              ]',
				'            },',
				'            "title": "@currentField.title"'
			].join('\n');
		}

		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "children": [',
			'    {',
			'      "elmType": "div",',
			'      "style": {',
			'        "width": "32px",',
			'        "height": "32px",',
			'        "overflow": "hidden",',
			'        "border-radius": "50%"',
			'      },',
			'      "children": [',
			'        {',
			'          "elmType": "img",',
			'          "attributes": {',
			src,
			'          },',
			'          "style": {',
			'            "position": "relative",',
			'            "top": "50%",',
			'            "left": "50%",',
			'            "width": "100%",',
			'            "height": "auto",',
			'            "margin-left": "-50%",',
			'            "margin-top": "-50%"',
			'          }',
			'        }',
			'      ]',
			'    }',
			'  ]',
			'}'
		].join('\n');
	}
};