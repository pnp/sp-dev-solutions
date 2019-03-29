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
  SearchResultsLabel: string;
  SearchQueryLabel: string;
  FilterPanelTitle: string;
  FilterResultsButtonLabel: string;
  RefinerLayoutLabel: string;
  ConnectToSearchResultsLabel: string;
  Refiners: {
    RefinersFieldLabel: string;
    RefinersFieldDescription: string;
    RefinerManagedPropertyField: string;
    RefinerDisplayValueField: string;
    EditRefinersLabel: string;
    EditSortLabel: string;
    AvailableRefinersLabel: string;
    ApplyFiltersLabel: string;
    ClearFiltersLabel: string;
    Templates: {
      RefinementItemTemplateLabel: string;
      MutliValueRefinementItemTemplateLabel: string;
      DateFromLabel: string;
      DateTolabel: string;
    }
  },
}

declare module 'SearchRefinersWebPartStrings' {
  const strings: ISearchRefinersWebPartStrings;
  export = strings;
}
