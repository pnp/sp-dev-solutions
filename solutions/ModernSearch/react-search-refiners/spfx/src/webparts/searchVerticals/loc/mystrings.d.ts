declare interface ISearchVerticalsWebPartStrings {
  SearchVerticalsGroupName: string;
  PlaceHolderEditLabel: string;
  PlaceHolderConfigureBtnLabel: string;
  PlaceHolderIconText: string;
  PlaceHolderDescription: string;
  PropertyPane: {
    Verticals: {
      PropertyLabel: string;
      PanelHeader: string;
      PanelDescription: string;
      ButtonLabel: string;
      Fields: {
        TabName: string;
        QueryTemplate: string;
        ResultSource: string;
        IconName: string;
      }
    },
    ShowCounts: {
      PropertyLabel: string;
    },
    SearchResultsDataSource:{
      PropertyLabel: string;
    } 
  }
}

declare module 'SearchVerticalsWebPartStrings' {
  const strings: ISearchVerticalsWebPartStrings;
  export = strings;
}
