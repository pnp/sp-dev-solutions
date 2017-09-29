declare interface IBoxButtonWebPartStrings {
  PropertyPaneBaseDescription: string;
  PropertyGroupName: string;
  NameFieldLabel: string;
  ColorFieldLabel: string;
  UrlFieldLabel: string;
  IconFieldLabel: string;
  NewTabFieldLabel: string;
  TitlePlaceholder:string;
  AddNewButtonText:string;
  PlaceholderButtonText:string;
  SaveButtonText:string;

  EditItemGeneralLabel:string;
  EditItemGeneralTitleLabel:string;
  EditItemGeneralTitlePreCountLabel:string;
  EditItemGeneralTitlePostCountLabel:string;
  EditItemGeneralTitleErrorText:string;
  EditItemGeneralSelectLinkLabel:string;
  EditItemGeneralSelectLinkButtonText:string;
  EditItemGeneralOpenTabLabel:string;
  EditItemIconLabel:string;
  EditItemIconEntryLabel:string;
  EditItemIconEntryPlaceholder:string;
  EditItemIconEntryLinkText:string;
  EditItemColorLabel:string;
  EditItemColorFieldLabel:string;
  EditItemColorOnLabel:string;
  EditItemColorOffLabel:string;
  EditItemGuidanceLabel:string;
  RequiredValueErrorText: string;

  DeleteItemConfirmMessage:string;

  WebPartPropertySwitcherGroupLabel:string;
  SwitchToBasicLabel:string;
  SwitchToBasicButtonText:string;
  SwitchToAdvancedLabel:string;
  SwitchToAdvancedButtonText:string;

  AdvancedListModeGroupLabel:string;
  AdvancedEnableListModeLabel:string;
  AdvancedEnableListModeInfo:string;
}

declare module 'boxButtonWebPartStrings' {
  const strings: IBoxButtonWebPartStrings;
  export = strings;
}