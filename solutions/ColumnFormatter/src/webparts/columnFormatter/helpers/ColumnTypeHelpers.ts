import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes } from '../state/State';

export const iconForType = (type:columnTypes): string => {
	switch(type){
		case columnTypes.boolean:
			return 'SkypeCheck';
		case columnTypes.choice:
			return 'Filter';
		case columnTypes.datetime:
			return 'DateTime2';
		case columnTypes.link:
			return 'Link';
		case columnTypes.picture:
			return 'Camera';
		case columnTypes.lookup:
			return 'SortUp';
		case columnTypes.number:
			return 'NumberField';
		case columnTypes.person:
			return 'Emoji2';
		case columnTypes.text:
			return 'Font';
		default:
			return 'IncidentTriangle';
	}
};

export const textForType = (type:columnTypes): string => {
	switch(type){
		case columnTypes.boolean:
			return strings.ColumnType_Boolean;
		case columnTypes.choice:
			return strings.ColumnType_Choice;
		case columnTypes.datetime:
			return strings.ColumnType_DateTime;
		case columnTypes.link:
			return strings.ColumnType_Link;
		case columnTypes.picture:
			return strings.ColumnType_Picture;
		case columnTypes.lookup:
			return strings.ColumnType_Lookup;
		case columnTypes.number:
			return strings.ColumnType_Number;
		case columnTypes.person:
			return strings.ColumnType_Person;
		case columnTypes.text:
			return strings.ColumnType_Text;
		default:
			return strings.ColumnType_Unknown;
	}
};

export const supportedTypes: Array<string> = [
	'Text','Number','Choice','Boolean','User','URL','Lookup','DateTime','Integer'
];

export const typeForTypeAsString = (TypeAsString:string, DisplayFormat:number): columnTypes | undefined => {
	switch(TypeAsString) {
		case 'Text':
			return columnTypes.text;
		case 'Number':
		case 'Integer':
			return columnTypes.number;
		case 'Choice':
			return columnTypes.choice;
		case 'Boolean':
			return columnTypes.boolean;
		case 'User':
			return columnTypes.person;
		case 'URL':
			if(DisplayFormat == 0) {
				return columnTypes.link;
			} else {
				return columnTypes.picture;
			}
		case 'Lookup':
			return columnTypes.lookup;
		case 'DateTime':
			return columnTypes.datetime;
		default:
			return undefined;
	}
};