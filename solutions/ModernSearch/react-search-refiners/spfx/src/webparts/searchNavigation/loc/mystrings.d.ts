declare interface ISearchNavigationWebPartStrings {
  DynamicFieldLabel: string;
  NavNodeLabel: string;
  NavNodeHeader: string;
  NavNodeManageBtnLabel: string;
  NavNodeDisplayTextFieldLabel: string;
  NavNodeUrlFieldLabel: string;
  ColorPickerLabel: string;
  UseThemeColorLabel: string;
  PlaceHolderEditLabel: string;
  PlaceHolderConfigureBtnLabel: string;
  PlaceHolderIconText: string;
  PlaceHolderDescription: string;
  UseNlpValueLabel: string;
  SearchBoxQueryPathBehaviorLabel: string;
  SearchBoxUrlFragmentQueryPathBehavior: string;
  SearchBoxQueryStringQueryPathBehavior: string;
  SearchBoxQueryStringParameterName: string;
  SearchBoxQueryParameterNotEmpty: string;
  SearchNavigationDataSettings: string;
  SearchNavigationColorSettings: string;
  SearchNavigationQueryPathBehaviorSettings: string;
}

declare module 'SearchNavigationWebPartStrings' {
  const strings: ISearchNavigationWebPartStrings;
  export = strings;
}
