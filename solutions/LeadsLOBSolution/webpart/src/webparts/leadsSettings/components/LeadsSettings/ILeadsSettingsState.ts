import { LeadsSettings } from "../../../../LeadsSettings";

export interface ILeadsSettingsState extends LeadsSettings {
  apiUrl?: string;
  connectionStatus?: string;
  demo: boolean;
  needsConfiguration: boolean;
  quarterlyOnly: boolean;
  region?: string;
}