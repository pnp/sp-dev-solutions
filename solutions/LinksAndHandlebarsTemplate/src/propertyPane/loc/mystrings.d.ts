declare interface IPropertyFieldStrings {
  CreateButton: string;
  CancelButton: string;
  SPListCreate: string;
  SPListCreatePlaceholder: string;
  SPListQueryOpenList: string;
  SPListQueryList: string;
  SPListQueryOrderBy: string;
  SPListQueryArranged: string;
  SPListQueryMax: string;
  SPListQueryAdd: string;
  SPListQueryRemove: string;
  SPListQueryOperatorEq: string;
  SPListQueryOperatorNe: string;
  SPListQueryOperatorStartsWith: string;
  SPListQueryOperatorSubstringof: string;
  SPListQueryOperatorLt: string;
  SPListQueryOperatorLe: string;
  SPListQueryOperatorGt: string;
  SPListQueryOperatorGe: string;
  SPListFilterCompareType: string;
  SPListFilterCompareAll: string;
  SPListFilterCompareAny: string;

  ImageSelectorTypeAuto: string;
  ImageSelectorTypeCustom: string;

  CustomImageLabel: string;
  ChangeImageButtonText: string;

  SelectButtonText:string;
  CancelButtonText:string;
  SelectFromLinkLabel:string;
  SelectFromLinkDescription:string;
  SelectFromSiteTitle:string;
  NoPreviewText: string;

  OpenModalTitle: string;
  RichTextToolbarBoldTitle: string;
  RichTextToolbarItalicTitle: string;
  RichTextToolbarNumberedListTitle: string;
  RichTextToolbarBulletedListTitle: string;
  RichTextModalRTEPivotLabel: string;
  RichTextModalHTMLPivotLabel: string;
  RichTextModalSaveText: string;
  RichTextModalCancelText: string;
  GroupSortMessageSegment1: string;

  RichTextCreateLinkTitle: string;

  SearchQueryLabel:string;
  SelectPropertiesLabel:string;
  SortLabel:string;
  ResultsLabel:string;
  SortPropertyLabel: string;
  SortDirectionLabel:string;

  Ascending: string;
  Descending: string;
}

declare module 'propertyFieldStrings' {
  const strings: IPropertyFieldStrings;
  export = strings;
}
