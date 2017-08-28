import { IMyTimeAwayDataProvider } from '../../dataProviders/IMyTimeAwayDataProvider';
import { TimePeriod } from "../../models/timeAwayModel";
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IMyTimeAwayContainerProps {
  period: TimePeriod;
  dataProvider: IMyTimeAwayDataProvider;
  context: IWebPartContext;
  isInitialized: boolean;
}
