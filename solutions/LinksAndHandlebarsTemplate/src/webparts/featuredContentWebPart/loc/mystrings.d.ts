declare interface IFeaturedContentWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ContentListFieldLabel: string;
  ManageContentLabel: string;
  TitlePlaceholder: string;

  AddNewButtonText: string;
  PlaceholderButtonText: string;
  SaveButtonText: string;
  SelectButtonText: string;
  CancelButtonText: string;
  SelectFromLinkLabel: string;
  SelectFromLinkDescription: string;
  SelectFromSiteTitle: string;

  EditItemGeneralLabel: string;
  EditItemGeneralTitleLabel: string;
  EditItemGeneralTitlePreCountLabel: string;
  EditItemGeneralTitlePostCountLabel: string;
  EditItemGeneralTitleErrorText: string;
  EditItemGeneralDescriptionLabel: string;
  EditItemGeneralAlternateLabel: string;
  EditItemGeneralDescriptionPreCountLabel: string;
  EditItemGeneralDescriptionPostCountLabel: string;
  EditItemGeneralDescriptionErrorText: string;
  EditItemGeneralContentLabel: string;
  EditItemGeneralSelectLinkLabel: string;
  EditItemGeneralSelectLinkButtonText: string;
  EditItemGeneralOpenTabLabel: string;
  EditItemImageLabel: string;
  EditItemImageEntryLabel: string;
  EditItemImageEntryPlaceholder: string;
  EditItemImageEntryLinkText: string;
  EditItemGuidanceLabel: string;
  RequiredValueErrorText: string;

  DeleteItemConfirmMessage: string;

  WebPartPropertySwitcherGroupLabel: string;
  SwitchToBasicLabel: string;
  SwitchToBasicButtonText: string;
  SwitchToAdvancedLabel: string;
  SwitchToAdvancedButtonText: string;
  OnLabel: string;
  OffLabel: string;

  AdvancedListModeGroupLabel: string;
  AdvancedEnableListModeLabel: string;
  AdvancedEnableListModeInfo: string;

  LayoutLabel: string;
  LayoutSelectorLabel: string;
  TitleOnlyLabel: string;
  TitleDescriptionLabel: string;
  StackedLabel: string;
  AltStackedLabel: string;

  RetiredMessage: string;
}

declare module 'featuredContentWebPartStrings' {
  const strings: IFeaturedContentWebPartStrings;
  export = strings;
}
