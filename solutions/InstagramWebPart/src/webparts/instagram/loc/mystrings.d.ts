declare interface IInstagramWebPartStrings {
  PropertyPaneDescription: string;
  InstagramGroupName: string;
  OperationalGroupName: string;
  ClientIdDescription: string;
  AuthUrlDescription: string;
  FeedUrlDescription: string;
  SignInButtonText: string;
  SignOutButtonText: string;
  WebPartNeedsToLogin: string;
  WebPartToBeConfiguredTitle: string;
  WebPartToBeConfiguredDescription: string;
  WebPartToBeConfiguredAction: string;
  NoPostsFound: string;
}

declare module 'InstagramWebPartStrings' {
  const strings: IInstagramWebPartStrings;
  export = strings;
}
