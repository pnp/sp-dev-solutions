define([], function() {
  return {
    SearchVerticalsGroupName: "Search verticals settings",
    PlaceHolderEditLabel: "Edit",
    PlaceHolderConfigureBtnLabel: "Configure",
    PlaceHolderIconText: "Search Verticals Web Part",
    PlaceHolderDescription: "This component allows you to search within scopes (i.e verticals)",
    PropertyPane: {
      Verticals: {
        PropertyLabel: "Search verticals",
        PanelHeader: "Configure search verticals",
        PanelDescription: "Add a new vertical to allow users to search in a predefined scope.",
        ButtonLabel: "Configure",
        Fields: {
          TabName: "Tab name",
          QueryTemplate: "Query Template",
          ResultSource: "Result Source Identifier",
          IconName: "Office UI Fabric icon name"
        }
      },
      ShowCounts: {
        PropertyLabel: "Show result counts"
      },
      SearchResultsDataSource: {
        PropertyLabel: "Connect to a search results Web Part"
      }
    }
  }
});