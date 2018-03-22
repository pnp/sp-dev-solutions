import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn, IUserContext } from '../../state/State';
import { generateRowValue } from '../../state/ValueGeneration';
import { WizardActionLink } from './WizardActionLink';
import { WizardCheckboxes } from './WizardCheckboxes';
import { WizardCurrentUser } from './WizardCurrentUser';
import { WizardDataBars } from './WizardDataBars';
import { WizardDonut } from './WizardDonut';
import { WizardFlow } from './WizardFlow';
import { WizardMailTo } from './WizardMailTo';
import { WizardMiniMap } from './WizardMiniMap';
import { WizardNumberTending } from './WizardNumberTrending';
import { WizardOverdue } from './WizardOverdue';
import { WizardOverdueStatus } from './WizardOverdueStatus';
import { WizardRoundImage } from './WizardRoundImage';
import { WizardSeverity } from './WizardSeverity';
import { WizardTwitter } from './WizardTwitter';

//** Implement this interface to create your own wizard/template */
export interface IWizard {
	//** Name of the wizard */
	name: string;

	//** Description of the wizard (shown in a tooltip) */
	description: string;

	//** The name of the UI Fabric icon to use for the wizard */
	iconName: string;

	//** field types supported, leave empty to support all */
	fieldTypes: Array<columnTypes>;

	//** Indicates if this is a wizard with a custom render or just starter code */
	isTemplate: boolean;

	//** callback that should return the initial json for the wizard */
	startingCode: (colType:columnTypes) => string;

	//** callback that should return the initial sample data */
	startingRows: (colType:columnTypes, user?:IUserContext) => Array<Array<any>>;

	//** callback that should return the initial sample column definitions */
	startingColumns: (colType:columnTypes) => Array<IDataColumn>;

	//** callback that allows wizards (not templates) to create a custom interface in the Wizard tab */
	onWizardRender?: (updateEditorString:(editorString:string) => void, colType:columnTypes) => JSX.Element;
}

//** The actual array of wizards/templates. Add yours here */
export const Wizards: Array<IWizard> = [
	WizardNumberTending,
	WizardActionLink,
	WizardCheckboxes,
	WizardCurrentUser,
	WizardDataBars,
	WizardDonut,
	WizardFlow,
	WizardMailTo,
	WizardMiniMap,
	WizardOverdue,
	WizardOverdueStatus,
	WizardRoundImage,
	WizardSeverity,
	WizardTwitter
];


//** Helper function that generates 3 random rows, use it for simple wizards/templates */
export const standardWizardStartingRows = (colType:columnTypes): Array<Array<any>> => {
	return [
		[generateRowValue(colType)],
		[generateRowValue(colType)],
		[generateRowValue(colType)]
	];
};

//** Helper function that generates a single column, use it for simple wizards/templates */
export const standardWizardStartingColumns = (colType:columnTypes): Array<IDataColumn> => {
	return [{
		name: strings.WizardDefaultField,
		type: colType
	}];
};

//** Helper function that generates the most basic json */
export const standardWizardStartingCode = (colType:columnTypes): string => {
	let currentField:string = '@currentField';
	switch(colType) {
		case columnTypes.lookup:
			currentField = '@currentField.lookupValue';
			break;
		case columnTypes.person:
			currentField = '@currentField.title';
			break;
		default:
			break;
	}
	return [
		'{',
		'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
		'  "elmType": "div",',
		'  "txtContent": "' + currentField + '"',
		'}'
	].join('\n');
};


//** Helper function used to get a wizard from the wizards array by name */
export const getWizardByName = (name:string): IWizard | undefined => {
	for(var wizard of Wizards) {
		if(wizard.name == name) {
			return wizard;
		}
	}
	return undefined;
};

//** Helper function used to filter the wizards by supported field types */
export const getWizardsForColumnType = (colType: columnTypes): Array<IWizard> => {
	return Wizards.filter((value: IWizard, index:number) => {
		if(colType !== undefined) {
			if(value.fieldTypes.length == 0 || value.fieldTypes.indexOf(colType) >= 0) {
				return true;
			}
			return false;
		}
		return true;
	});
};


/** Helper function to add an indention string to the front of every value in an array */
export const addIndent = (values:Array<string>, indent:string): Array<string> => {
	return values.map((value:string, index:number) => {
		return indent + value;
	});
};

/** Helper function to properly format a value for json code whether it's a single string or several lines of code */
export const singleOrMultiValue = (value:string|Array<string>, indent:string, addComma:boolean): Array<string> => {
	if(typeof value == 'string') {
		return [indent + '"' + value + '"' + (addComma ? ',' : '')];
	} else {
		let values:Array<string> = addIndent(<Array<string>>value, indent);
		if(addComma) {
			values[values.length-1] = values[values.length-1] + ',';
		}
		return values;
	}
};

export interface IConditionalValue {
	compareTo: string | Array<string>;
	result: string | Array<string>;
}

export const conditionalValues = (property:string, startingIndentation: string, conditionals:Array<IConditionalValue>, defaultResult:string|Array<string>, value:string|Array<string>, ensureStringValue:boolean): string => {

	//No conditions means always use the default
	if (conditionals.length == 0) {
		return singleOrMultiValue(defaultResult, startingIndentation, false).join('\n');
	}
	
	let logic: Array<string> = [
		startingIndentation + '"' + property +'": {'
	];
	let logicAppend: Array<string> = [
		startingIndentation + '}'
	];

	for(var c = 0; c < conditionals.length; c++){
		let indent:string = startingIndentation + '  ';
		for(var i = 1; i <= c; i++) {
			indent += '    ';
		}
		logic.push(indent + '"operator": "?",');
		logic.push(indent + '"operands": [');
		logic.push(indent + '  {');
		logic.push(indent + '    "operator": "==",');
		logic.push(indent + '    "operands": [');
		if(ensureStringValue) {
			logic.push(indent + '      {');
			logic.push(indent + '        "operator": "toString()",');
			logic.push(indent + '        "operands": [');
			logic.push(...singleOrMultiValue(value, indent + '          ', false));
			logic.push(indent + '        ]');
			logic.push(indent + '      },');
		} else {
			logic.push(...singleOrMultiValue(value, indent + '      ', true));
		}
		logic.push(...singleOrMultiValue(conditionals[c].compareTo, indent + '      ', false));
		logic.push(indent + '    ]');
		logic.push(indent + '  },');
		logic.push(...singleOrMultiValue(conditionals[c].result, indent + '  ', true));
		if(c < conditionals.length - 1) {
			logic.push(indent + '  {');
			logicAppend.push(indent + ']');
			logicAppend.push(indent + '  }');
		} else {
			logic.push(...singleOrMultiValue(defaultResult, indent + '  ', false));
			logic.push(indent + ']');
		}
	}

	logic.push(...logicAppend.reverse());

	return logic.join('\n');
};