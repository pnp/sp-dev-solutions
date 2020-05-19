import { HttpClient, SPHttpClient } from "@microsoft/sp-http";

export interface ILeadsSettingsProps {
  httpClient: HttpClient;
  spHttpClient: SPHttpClient;
  webUrl: string;
}
