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

export const formatScriptThemeRules = ():Array<any> => {
	return [
		{
			token: 'invalid',
			foreground: 'e81123',
		},
		{
			token: 'string.invalid',
			foreground: 'e81123',
		},
		{
			token: 'keyword',
			foreground: '0078d4',
			fontStyle: 'bold',
		},
		{
			token: 'string',
			foreground: '333333',
		},
		{
			token: 'number',
			foreground: '5c2d91',
		},
		{
			token: 'operator',
			foreground: '0078d4',
			fontStyle: 'bold',
		},
		{
			token: 'delimiter',
			foreground: '212121',
		},
		{
			token: 'bracket',
			foreground: '212121',
			fontStyle: 'bold',
		},
		{
			token: 'specialclass',
			foreground: '008272',
			fontStyle: 'bold',
		},
		{
			token: 'magic',
			foreground: 'e3008c',
			fontStyle: 'bold',
		},
	];
};