import { HttpClient } from "@microsoft/sp-http";
import * as microsoftTeams from '@microsoft/teams-js';
import { LeadView } from "..";

export interface ILeadsProps {
  demo: boolean;
  httpClient: HttpClient;
  host?: any;
  leadsApiUrl: string;
  needsConfiguration: boolean;
  teamsContext?: typeof microsoftTeams;
  view?: LeadView;
}
