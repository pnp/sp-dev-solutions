declare interface ILeadsWebPartStrings {
  PropertyPaneDescription: string;
  ConnectionGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'LeadsWebPartStrings' {
  const strings: ILeadsWebPartStrings;
  export = strings;
}
