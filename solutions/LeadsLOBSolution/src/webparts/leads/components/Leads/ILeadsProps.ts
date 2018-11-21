import { HttpClient } from "@microsoft/sp-http";

export interface ILeadsProps {
  demo: boolean;
  httpClient: HttpClient;
  leadsApiUrl: string;
  needsConfiguration: boolean;
}
