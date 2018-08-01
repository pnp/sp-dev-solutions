declare interface IHandlebarTemplateDisplayStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitlePlaceholder: string;
  QueryFieldLabel: string;
  ContainerClassLabel: string;
  TemplateFieldLabel: string;
  TemplateFieldButtonText: string;
  StyleFieldLabel: string;
  StyleFieldButtonText: string;
  ScriptFieldLabel: string;
  ScriptFieldButtonText: string;
  DownloadButtonText: string;
  ConfigureWebPartButtonText: string;
  SearchFieldLabel: string;
  SearchLabel: string;
  ListLabel:string;
  SearchToggleLabel: string;
  OptimizedTemplateLabel: string;
  OptimizedTemplateDescription: string;
}

declare module 'handlebarTemplateDisplayStrings' {
  const strings: IHandlebarTemplateDisplayStrings;
  export = strings;
}
