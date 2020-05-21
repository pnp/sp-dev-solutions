import { HttpClient, MSGraphClient } from "@microsoft/sp-http";
import * as microsoftTeams from '@microsoft/teams-js';
import { LeadView } from "..";

export interface ILeadsProps {
  demo: boolean;
  httpClient: HttpClient;
  host?: any;
  leadsApiUrl: string;
  msGraphClient: MSGraphClient;
  needsConfiguration: boolean;
  teamsContext?: typeof microsoftTeams;
  // AAD user ID required to create Planner tasks
  userId: string;
  view?: LeadView;
}
