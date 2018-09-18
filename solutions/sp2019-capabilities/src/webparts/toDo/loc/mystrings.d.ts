declare interface IToDoWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
}

declare module 'ToDoWebPartStrings' {
  const strings: IToDoWebPartStrings;
  export = strings;
}
