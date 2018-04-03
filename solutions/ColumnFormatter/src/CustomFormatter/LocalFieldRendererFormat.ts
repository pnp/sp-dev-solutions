import * as strings from 'ColumnFormatterWebPartStrings';

export const LocalCustomFormatterStrings = {
	default: {
		ariaError: strings.CFS_ariaError,
		elmTypeInvalid: strings.CFS_elmTypeInvalid,
		elmTypeMissing: strings.CFS_elmTypeMissing,
		invalidProtocol: strings.CFS_invalidProtocol,
		invalidStyleAttribute: strings.CFS_invalidStyleAttribute,
		invalidStyleValue: strings.CFS_invalidStyleValue,
		nan: strings.CFS_nan,
		operandMissing: strings.CFS_operandMissing,
		operandNOnly: strings.CFS_operandNOnly,
		operatorInvalid: strings.CFS_operatorInvalid,
		operatorMissing: strings.CFS_operatorMissing,
		unsupportedType: strings.CFS_unsupportedType,
		userFieldError: strings.CFS_userFieldError
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