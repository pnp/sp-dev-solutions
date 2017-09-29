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

  GuidanceMessageSegment1: string;
  GuidanceMessageSegment2: string;
  GuidanceMessageLink1Text: string;

  ImageSelectorMessageSegment1: string;
  ImageSelectorMessageSegment2: string;
  ImageSelectorMessageLink1Text: string;
  ImageSelectorMessageLink2Text: string;
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
}

declare module 'propertyFieldStrings' {
  const strings: IPropertyFieldStrings;
  export = strings;
}
