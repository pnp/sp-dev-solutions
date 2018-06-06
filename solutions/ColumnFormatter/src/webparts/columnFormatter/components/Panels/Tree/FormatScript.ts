export const formatScriptId: string = "FormatScript";

/**
 * Provides the rules for Syntax Highlighting for FormatScript
 */
export const formatScriptTokens = ():any => {
	return {
		defaultToken: "invalid",

		keywords: [
			'SWITCH', 'Switch', 'CONCATENATE', 'Concatenate', 'CONCAT', 'Concat',
			'AND', 'And', 'OR', 'Or', 'IF', 'If', 'TOSTRING', 'ToString', 'toString',
			'NUMBER', 'Number', 'DATE', 'Date', 'COS', 'Cos', 'cos', 'SIN', 'Sin', 'sin',
			'TOLOCALESTRING', 'ToLocaleString', 'toLocaleString',
			'TOLOCALEDATESTRING', 'ToLocaleDateString', 'toLocaleDateString',
			'TOLOCALETIMESTRING', 'ToLocaleTimeString', 'toLocaleTimeString',
			'true', 'false',
		],

		operators: [
			'>', '<', '?', ':', '==', '<=', '>=', '!=',
			'&&', '||', '+', '-', '*', '/', '&',
		],

		brackets: [
			['(', ')', 'bracket.parenthesis'],
		],

		// common regular expressions
		symbols: /[~!@#%\^&*-+=|\\:`<>.?\/]+/,
		escapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
		exponent: /[eE][\-+]?[0-9]+/,

		tokenizer: {
			root: [
				// identifiers and keywords
				[/([a-zA-Z_\$][\w\$]*)(\s*)(:?)/, {
					cases: {
						'$1@keywords': ['keyword', 'white', 'delimiter'],
						'$3': ['key.identifier', 'white', 'delimiter'],   // followed by :
						/*'@default': ['identifier','white','delimiter']*/
					}
				}],

				// Special String values
				['(?<![\w"])[@]currentField(\.email|\.id|\.title|\.sip|\.picture|\.lookupId|\.lookupValue|\.desc)*(?![\w"])', "magic"],
				['(?<![\w"])[@](now|me)(?![\w"])', "magic"],

				// whitespace
				{ include: '@whitespace' },

				// delimiters and operators
				[/[{}()\[\]]/, '@brackets'],
				[/[,.]/, 'delimiter'],
				[/@symbols/, {
					cases: {
						'@operators': 'operator',
						'@default': ''
					}
				}],

				// numbers
				[/\d+\.\d*(@exponent)?/, 'number.float'],
				[/\.\d+(@exponent)?/, 'number.float'],
				[/\d+@exponent/, 'number.float'],
				[/0[xX][\da-fA-F]+/, 'number.hex'],
				[/0[0-7]+/, 'number.octal'],
				[/\d+/, 'number'],

				// strings: recover on non-terminated strings
				[/".*?"".*?"/, 'string.invalid'],
				[/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
				[/"sp-field-(severity--(good|low|warning|severeWarning|blocked)|dataBars|customFormatBackground|trending--(up|down)|quickAction)"/, 'specialclass'],
				[/"/, 'string', '@string."'],

			],

			whitespace: [
				[/[ \t\r\n]+/, 'white'],
			],

			string: [
				[/[^\\"']+/, 'string'],
				[/@escapes/, 'string.escape'],
				[/\\./, 'string.escape.invalid'],
				[/["']/, {
					cases: {
						'$#==$S2': { token: 'string', next: '@pop' },
						'@default': 'string'
					}
				}]
			],

		},
	};
};

/**
 * Provides the colors for Syntax Highlighting for FormatScript
 */
export const formatScriptTheme = (useDark:boolean):any => {
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
				foreground: '0078d4', //blue
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
		],
		colors: {
			"editor.background": "#" + background,
			"editor.foreground": "#" + foreground,
			"editorCursor.foreground": '#00bcf2', //blueLight
			"editor.lineHighlightBorder": useDark ? "#666666" : "#f4f4f4", //neutralSecondary or neutralLighter
			"editor.lineHighlightBackground": "#" + background,
			"editor.selectionBackground": useDark ? "#666666" : "#eaeaea", //neutralSecondary or neutralLight
			"editor.selectionHighlightBackground": useDark ? "#3c3c3c" : "#f4f4f4", //neutralPrimaryAlt or neutralLighter
			"editorBracketMatch.background": useDark ? "#5c2d91" : "#b4a0ff", //purple or purpleLight
			"editorBracketMatch.border": "#" + background,
		}
	};
};

/**
 * Provides the language configuration for FormatScript
 */
export const formatScriptConfig = ():any => {
	return {
		autoClosingPairs: [
			{
				open: "(",
				close: ")",
			},
			{
				open: '"',
				close: '"',
			}
		],
		surroundingPairs: [
			{
				open: "(",
				close: ")",
			},
			{
				open: '"',
				close: '"',
			}
		],
		brackets: [["(", ")"]],
	};
};