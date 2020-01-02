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
        RefinerTemplateField: string;
        EditRefinersLabel: string;
        EditSortLabel: string;
        AvailableRefinersLabel: string;
        ApplyFiltersLabel: string;
        ClearFiltersLabel: string;
        ShowExpanded: string;
        Templates: {
            RefinementItemTemplateLabel: string;
            MutliValueRefinementItemTemplateLabel: string;
            DateRangeRefinementItemLabel: string;
            FixedDateRangeRefinementItemLabel: string;
            DateFromLabel: string;
            DateTolabel: string;
            DatePickerStrings: {
                months: string[],
                shortMonths: string[],
                days: string[],
                shortDays: string[],
                goToToday: string,
                prevMonthAriaLabel: string,
                nextMonthAriaLabel: string,
                prevYearAriaLabel: string,
                nextYearAriaLabel: string,
                closeButtonAriaLabel: string,
                isRequiredErrorMessage: string,
                invalidInputErrorMessage: string
            };
            DateIntervalStrings: {
                AnyTime: string;
                PastDay: string;
                PastWeek: string;
                PastMonth: string;
                Past3Months: string;
                PastYear: string;
                Older: string;
            },
            RefinerSortTypeLabel: string,
            RefinerSortTypeAlphabetical: string,
            RefinerSortTypeByNumberOfResults: string,
            RefinerSortTypeSortOrderLabel: string,
            RefinerSortTypeSortDirectionAscending: string,
            RefinerSortTypeSortDirectionDescending: string
        }
    },
}

declare module 'SearchRefinersWebPartStrings' {
    const strings: ISearchRefinersWebPartStrings;
    export = strings;
}
