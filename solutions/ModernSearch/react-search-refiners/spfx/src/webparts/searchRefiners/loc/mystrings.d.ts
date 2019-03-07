declare interface ISearchRefinersWebPartStrings {
  RefinersConfigurationGroupName: string;
  ShowBlankLabel: string;
  StylingSettingsGroupName: string;
  WebPartTitle: string;
  AppliedRefinersLabel: string;
  PlaceHolderEditLabel: string;
  PlaceHolderConfigureBtnLabel: string;
  PlaceHolderIconText: string;
  PlaceHolderDescription: string;
  NoFilterConfiguredLabel: string;
  RemoveAllFiltersLabel: string;
  ShowBlankEditInfoMessage: string;
  RefinersConfiguration: string;
  AvailableRefinersLabel: string;
  Refiners: {
    RefinersFieldLabel: string;
    RefinersFieldDescription: string;
    RefinerManagedPropertyField: string;
    RefinerDisplayValueField: string;
    EditRefinersLabel: string;
    EditSortLabel: string;
    AvailableRefinersLabel: string;
  },
}

declare module 'SearchRefinersWebPartStrings' {
  const strings: ISearchRefinersWebPartStrings;
  export = strings;
}
