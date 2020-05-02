import { HttpClient } from "@microsoft/sp-http";
import { LeadView } from "..";

export interface ILeadsProps {
  demo: boolean;
  httpClient: HttpClient;
  leadsApiUrl: string;
  needsConfiguration: boolean;
  view?: LeadView;
}
