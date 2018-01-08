import { columnTypes, editorThemes, ISaveDetails, uiState } from './State';

//** All the action interfaces */
export type ActionTypes = 
	| ISetContextAction
	| ISetHeightAction
	| ILaunchEditorAction
	| ILaunchEditorWithCodeAction
	| IChangeUIStateAction
	| IDisconnectWizardAction
	| IUpdateDataRowAction
	| IUpdateDataColumnNameAction
	| IUpdateDataColumnTypeAction
	| IAddDataRowAction
	| IRemoveDataRowAction
	| IAddDataColumnAction
	| IRemoveDataColumnAction
	| ISelectTabAction
	| IPaneResizeAction
	| IChooseThemeAction
	| IUpdateEditorStringAction
	| IUpdateFormatterErrorsAction
	| IOtherAction;

//** Action keys (by using strings, TS can deduce the action interface in the reducer which is convienent)*/
export enum typeKeys {
	SET_CONTEXT = "SET_CONTEXT",
	SET_HEIGHT = "SET_HEIGHT",
	LAUNCH_EDITOR = "LAUNCH_EDITOR",
	LAUNCH_EDITOR_WITH_CODE = "LAUNCH_EDITOR_WITH_CODE",
	CHANGE_UISTATE = "CHANGE_UISTATE",
	DISCONNECT_WIZARD = "DISCONNECT_WIZARD",

	UPDATE_DATA_ROW = "UPDATE_DATA_ROW",
	UPDATE_DATA_COLUMN_NAME = "UPDATE_DATA_COLUMN_NAME",
	UPDATE_DATA_COLUMN_TYPE = "UPDATE_DATA_COLUMN_TYPE",
	ADD_DATA_ROW = "ADD_DATA_ROW",
	REMOVE_DATA_ROW = "REMOVE_DATA_ROW",
	ADD_DATA_COLUMN = "ADD_DATA_COLUMN",
	REMOVE_DATA_COLUMN = "REMOVE_DATA_COLUMN",

	SELECT_TAB = "SELECT_TAB",
	PANE_RESIZE = "PANE_RESIZE",
	CHOOSE_THEME = "CHOOSE_THEME",

	UPDATE_EDITOR_STRING = "UPDATE_EDITOR_STRING",
	UPDATE_FORMATTER_ERRORS = "UPDATE_FORMATTER_ERRORS",

	OTHER_ACTION = "ANY_OTHER_ACTION"
}


export interface ISetContextAction {
	type: typeKeys.SET_CONTEXT;
	isOnline: boolean;
	webAbsoluteUrl: string;
	userDisplayName: string;
	userEmail: string;
	height: number;
}
export const setContext = (isOnline:boolean, webAbsoluteUrl:string, userDisplayName:string, userEmail:string, height:number): ISetContextAction => ({
	type: typeKeys.SET_CONTEXT,
	isOnline,
	webAbsoluteUrl,
	userDisplayName,
	userEmail,
	height
});

export interface ISetHeightAction {
	type: typeKeys.SET_HEIGHT;
	height: number;
}
export const setHeight = (height:number): ISetHeightAction => ({
	type: typeKeys.SET_HEIGHT,
	height
});

export interface ILaunchEditorAction {
	type: typeKeys.LAUNCH_EDITOR;
	wizardName: string;
	colType: columnTypes;
}
export const launchEditor = (wizardName:string, colType:columnTypes): ILaunchEditorAction => ({
	type: typeKeys.LAUNCH_EDITOR,
	wizardName,
	colType
});

export interface ILaunchEditorWithCodeAction {
	type: typeKeys.LAUNCH_EDITOR_WITH_CODE;
	wizardName: string;
	colType: columnTypes;
	editorString: string;
	validationErrors: Array<string>;
	saveDetails: ISaveDetails;
}
export const launchEditorWithCode = (wizardName:string, colType:columnTypes, editorString:string, validationErrors:Array<string>, saveDetails:ISaveDetails): ILaunchEditorWithCodeAction => ({
	type: typeKeys.LAUNCH_EDITOR_WITH_CODE,
	wizardName,
	colType,
	editorString,
	validationErrors,
	saveDetails
});

export interface IChangeUIStateAction {
	type: typeKeys.CHANGE_UISTATE;
	state: uiState;
}
export const changeUIState = (state:uiState): IChangeUIStateAction => ({
	type: typeKeys.CHANGE_UISTATE,
	state
});

export interface IDisconnectWizardAction {
	type: typeKeys.DISCONNECT_WIZARD;
}
export const disconnectWizard = (): IDisconnectWizardAction => ({
	type: typeKeys.DISCONNECT_WIZARD
});


export interface IUpdateDataRowAction {
	type: typeKeys.UPDATE_DATA_ROW;
	rowIndex: number;
	colIndex: number;
	value: any;
}
export const updateDataRow = (rowIndex: number, colIndex: number, value: any): IUpdateDataRowAction => ({
	type: typeKeys.UPDATE_DATA_ROW,
	rowIndex,
	colIndex,
	value
});

export interface IUpdateDataColumnNameAction {
	type: typeKeys.UPDATE_DATA_COLUMN_NAME;
	colIndex: number;
	name: string;
}
export const updateDataColumnName = (colIndex: number, name: string): IUpdateDataColumnNameAction => ({
	type: typeKeys.UPDATE_DATA_COLUMN_NAME,
	colIndex,
	name
});

export interface IUpdateDataColumnTypeAction {
	type: typeKeys.UPDATE_DATA_COLUMN_TYPE;
	colIndex: number;
	colType: columnTypes;
}
export const updateDataColumnType = (colIndex: number, colType: columnTypes): IUpdateDataColumnTypeAction => ({
	type: typeKeys.UPDATE_DATA_COLUMN_TYPE,
	colIndex,
	colType
});

export interface IAddDataRowAction {
	type: typeKeys.ADD_DATA_ROW;
}
export const addDataRow = (): IAddDataRowAction => ({
	type: typeKeys.ADD_DATA_ROW
});

export interface IRemoveDataRowAction {
	type: typeKeys.REMOVE_DATA_ROW;
	rowIndex: number;
}
export const removeDataRow = (rowIndex:number): IRemoveDataRowAction => ({
	type: typeKeys.REMOVE_DATA_ROW,
	rowIndex
});

export interface IAddDataColumnAction {
	type: typeKeys.ADD_DATA_COLUMN;
}
export const addDataColumn = (): IAddDataColumnAction => ({
	type: typeKeys.ADD_DATA_COLUMN
});

export interface IRemoveDataColumnAction {
	type: typeKeys.REMOVE_DATA_COLUMN;
	colIndex: number;
}
export const removeDataColumn = (colIndex:number): IRemoveDataColumnAction => ({
	type: typeKeys.REMOVE_DATA_COLUMN,
	colIndex
});


export interface ISelectTabAction {
	type: typeKeys.SELECT_TAB;
	tabName: string;
	index: number;
}
export const selectTab = (tabName:string, index:number): ISelectTabAction => ({
	type: typeKeys.SELECT_TAB,
	tabName,
	index
});

export interface IPaneResizeAction {
	type: typeKeys.PANE_RESIZE;
	paneName: string;
	size: number;
}
export const resizePane = (paneName:string, size:number): IPaneResizeAction => ({
	type: typeKeys.PANE_RESIZE,
	paneName,
	size
});

export interface IChooseThemeAction {
	type: typeKeys.CHOOSE_THEME;
	theme: editorThemes;
}
export const chooseTheme = (theme:editorThemes): IChooseThemeAction => ({
	type: typeKeys.CHOOSE_THEME,
	theme
});


export interface IUpdateEditorStringAction {
	type: typeKeys.UPDATE_EDITOR_STRING;
	editorString: string;
	validationErrors: Array<string>;
}
export const updateEditorString = (editorString:string, validationErrors: Array<string>): IUpdateEditorStringAction => ({
	type: typeKeys.UPDATE_EDITOR_STRING,
	editorString,
	validationErrors
});

export interface IUpdateFormatterErrorsAction {
	type: typeKeys.UPDATE_FORMATTER_ERRORS;
	formatterErrors: Array<string>;
}
export const updateFormatterErrors = (formatterErrors:Array<string>): IUpdateFormatterErrorsAction => ({
	type: typeKeys.UPDATE_FORMATTER_ERRORS,
	formatterErrors
});


export interface IOtherAction {
	type: typeKeys.OTHER_ACTION;
}