import { Guid } from '@microsoft/sp-core-library';
import { MSGraphClientFactory } from '@microsoft/sp-http';

export interface IPagesApiWebPartProps {
  msGraphClientFactory: MSGraphClientFactory,
  description: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
  siteId: Guid;
}
