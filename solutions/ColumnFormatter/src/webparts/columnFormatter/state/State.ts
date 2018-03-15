import { IColumnFormatterWebPartProps } from '../ColumnFormatterWebPart';

//#region Enums
export enum columnTypes {
	text,
	number,
	choice,
	person,
	boolean,
	link,
	picture,
	datetime,
	lookup
}

export enum uiState {
	welcome,
	editing
}

export enum saveMethod {
	Download,
	Copy,
	Library,
	ListField,
	SiteColumn
}
//#endregion

export interface ILookupFieldValue {
	lookupValue: string;
	lookupId: number;
}

export interface ILinkFieldValue {
	URL: string;
	desc: string;
}

export interface IPersonFieldValue {
	title: string;
	id: number;
	email: string;
	sip: string;
	picture: string;
}

export interface IDataColumn {
	name: string;
	type: columnTypes;
}

export interface IData {
	columns: Array<IDataColumn>;
	rows: Array<Array<any>>;
}

export interface IPaneState {
	main: number;
	split: number;
}

export interface ITabState {
	propertyTab: number;
	viewTab: number;
	wizardTabVisible: boolean;
}

export interface ISaveDetails {
	activeSaveMethod?: saveMethod;
	libraryUrl?: string;
	libraryFolderPath?: string;
	libraryFilename?: string;
	list?: string;
	field?: string;
	siteColumnGroup?: string;
	siteColumn?: string;
}

export interface IUI {
	state: uiState;
	panes: IPaneState;
	tabs: ITabState;
	height: number;
	saveDetails: ISaveDetails;
}

export interface ICode {
	validationErrors: Array<string>;
	formatterErrors: Array<string>;
	editorString: string;
	formatterString: string;
	wizardName: string;
	editorTheme: string;
	showLineNumbers: boolean;
	showMiniMap: boolean;
	showIndentGuides: boolean;
}

export interface IUserContext {
	displayName: string;
	email: string;
}

export interface IContext {
	isOnline: boolean;
	webAbsoluteUrl: string;
	user: IUserContext;
	jsomLoaded: boolean;
	properties?: IColumnFormatterWebPartProps;
}

export interface IApplicationState {
	data: IData;
	ui: IUI;
	code: ICode;
	context: IContext;
}

export const initialState: IApplicationState = {
	data: {
		columns: [],
		rows: [],
	},
	ui: {
		state: uiState.welcome,
		panes: {
			main: 0,
			split: 0
		},
		tabs: {
			propertyTab: 0,
			viewTab: 0,
			wizardTabVisible: true
		},
		height: 340,
		saveDetails: {
			activeSaveMethod: undefined,
			libraryUrl: undefined,
			libraryFolderPath: '',
			libraryFilename: '',
			list: undefined,
			field: undefined
		}
	},
	code: {
		validationErrors: [],
		formatterErrors: [],
		editorString: '',
		formatterString:'',
		wizardName: undefined,
		editorTheme: 'vs',
		showLineNumbers: false,
		showMiniMap: false,
		showIndentGuides: false
	},
	context: {
		isOnline: false,
		webAbsoluteUrl:'',
		user: {
			displayName: undefined,
			email: undefined
		},
		jsomLoaded: false
	}
};