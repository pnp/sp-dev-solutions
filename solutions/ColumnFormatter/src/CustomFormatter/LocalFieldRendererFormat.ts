import * as strings from 'ColumnFormatterWebPartStrings';

export const LocalCustomFormatterStrings = {
	default: {
		ariaError: strings.CFSariaError,
		elmTypeInvalid: strings.CFSelmTypeInvalid,
		elmTypeMissing: strings.CFSelmTypeMissing,
		invalidProtocol: strings.CFSinvalidProtocol,
		invalidStyleAttribute: strings.CFSinvalidStyleAttribute,
		invalidStyleValue: strings.CFSinvalidStyleValue,
		nan: strings.CFSnan,
		operandMissing: strings.CFSoperandMissing,
		operandNOnly: strings.CFSoperandNOnly,
		operatorInvalid: strings.CFSoperatorInvalid,
		operatorMissing: strings.CFSoperatorMissing,
		unsupportedType: strings.CFSunsupportedType,
		userFieldError: strings.CFSuserFieldError
	}
};

export interface IFormatterFieldInfo {
	currentFieldName: string;
	errorStrings?: any; //this is likely a string object based on n
	fieldRendererFormat: any; //the actual columnformatting.json
	pageContextInfo: any; //full page context, not sure what's used yet though
	row: any; //actual data from the row
		//will need to map all sample data in specific formats
		// including doing the
		//   BoolName: "No"
		//   BoolName.value: "0"
		//   ID
		//   PersonName:[{IPersonFieldValue}]
		//   linkName: "url value"
		//   linkName.desc: "display value"
		//   lookupName: [{Ilookupfieldvalue,isSecretFieldValue:false}]
		//   datevalue?
		//   numberName: "4"
		//   numberName.: "4.00000000000000" (14 precision)
	rowSchema: any; //internalname as prop then type as value
		//Boolean, Choice, Number, User, Title, Hyperlink, Lookup
		//_calloutInvoker: "DotDotDot"
		//_shareHeroCommand: "ShareCommand"
}

//export interface ILimitedPageContext