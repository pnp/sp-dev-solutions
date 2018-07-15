import {
    formatScriptCompletionProvider,
    formatScriptConfig,
    formatScriptId,
    formatScriptTokens,
} from "../components/FormatScript/FormatScript";
import { ColumnFormattingSchema, ColumnFormattingSchemaURI } from "./ColumnFormattingSchema";
import { ViewFormattingSchema, ViewFormattingSchemaURI } from "./ViewFormattingSchema";

const monaco = require('../../../MonacoCustomBuild');


/**
 * Provides the colors for Syntax Highlighting that matches the UI Fabric color scheme
 */
const fabricTheme = (useDark:boolean):any => {
	const background:string = useDark ? '212121' : 'FFFFFF';
	const foreground:string = useDark ? 'FFFFFF' : '212121';
	return {
		base: 'vs',
		inherit: false,
		rules: [
			{
				background: background,
				foreground: foreground,
			},
			{
				token: 'invalid',
				foreground: 'e81123', //red
				fontStyle: 'italic',
			},
			{
				token: 'string.invalid',
				foreground: 'e81123', //red
				fontStyle: 'italic',
			},
			{
				token: 'keyword',
				foreground: '0078d7', //blue
				fontStyle: 'bold',
			},
			{
				token: 'string',
				foreground: foreground,
			},
			{
				token: 'number',
				foreground: 'ff8c00', //orangeLighter
			},
			{
				token: 'operator',
				foreground: '0078d4', //blue
				fontStyle: 'bold',
			},
			{
				token: 'delimiter',
				foreground: useDark ? 'f4f4f4' : '333333', //neutralLighter or neutralPrimary
			},
			{
				token: 'bracket',
				foreground: foreground,
				fontStyle: 'bold',
			},
			{
				token: 'specialclass',
				foreground: useDark ? '00B294' : '008272', //tealLight or teal
				fontStyle: 'bold',
			},
			{
				token: 'magic',
				foreground: 'e3008c', //magentaLight
				fontStyle: 'bold',
			},
			{
				token: 'string.key.json',
				foreground: 'ea4300',// useDark ? 'ea4300' : 'd83b01', //orangeLight or orange
			},
			{
				token: 'string.value.json',
				foreground: useDark ? '00bcf2' : '0078d7', //blueLight or blue
			},
		],
		colors: {
			"editor.background": "#" + background,
			"editor.foreground": "#" + foreground,
			"editorCursor.foreground": "#00bcf2", //blueLight
			"editor.lineHighlightBorder": useDark ? "#666666" : "#f4f4f4", //neutralSecondary or neutralLighter
			"editor.lineHighlightBackground": "#" + background,
			"editor.selectionBackground": useDark ? "#666666" : "#eaeaea", //neutralSecondary or neutralLight
			"editor.selectionHighlightBackground": useDark ? "#3c3c3c" : "#f4f4f4", //neutralPrimaryAlt or neutralLighter
			"editorBracketMatch.background": useDark ? "#5c2d91" : "#eaeaea",//"#b4a0ff", //purple or purpleLight
			"editorBracketMatch.border": "#" + background,
			"editorHoverWidget.background": useDark ? "#666666" : "#f4f4f4", //neutralSecondary or neutralLighter
			"list.focusBackground": "#ffb900", //yellow
			"list.highlightForeground": "#00bcf2", //blueLight
			"list.hoverBackground": useDark ? "#a6a6a6" : "#dadada", //neutralTertiary or neutralQuaternaryAlt
			"editorWidget.background": useDark ? "#3c3c3c" : "#eaeaea", //neutralPrimaryAlt or neutralLight
			"editorWidget.border": useDark ? "#a6a6a6" : "#dadada", //neutralTertiary or neutralQuaternaryAlt
		}
	};
};

export const setupMonaco = () => {

	//GENERAL

	monaco.editor.defineTheme('fabric', fabricTheme(false));
	monaco.editor.defineTheme('fabric-dark', fabricTheme(true));

	//Adjust tab size once things are ready
	monaco.editor.onDidCreateModel((m:any) => {
		m.updateOptions({
			tabSize: 2
		});
	});


	//JSON CONFIGURATION

	//Add Column Formatter Schema for validation
	monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
		schemas: [
			{
				uri: ColumnFormattingSchemaURI,
				schema: ColumnFormattingSchema
			},
			{
				uri: ViewFormattingSchemaURI,
				schema: ViewFormattingSchema
			},
		],
		validate: true,
		allowComments: false
	});


	//FORMATSCRIPT CONFIGURATION

	// Register the FormatScript language
	monaco.languages.register({
		id: formatScriptId,
	});

	//Register custom tokens for FormatScript
	monaco.languages.setMonarchTokensProvider(formatScriptId, formatScriptTokens());

	//Provide configuration for FormatScript
	monaco.languages.setLanguageConfiguration(formatScriptId, formatScriptConfig());

	//Register Completion Provider FormatScript
	monaco.languages.registerCompletionItemProvider(formatScriptId, formatScriptCompletionProvider());
};