import { ITimeAwaySummaryDataProvider } from '../../dataProviders/ITimeAwaySummaryDataProvider';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import {
  IMyTimeAwayDataProvider,
  WeekType
} from '../../../../libraries/index';


interface ITimeAwaySummaryContainerProps {
  context: IWebPartContext;
  dataProvider: ITimeAwaySummaryDataProvider;
  myTimeAwaydataProvider: IMyTimeAwayDataProvider;
  weekType: WeekType;
  displayMode: number;
  statusFilter: boolean;
  showMyTimeAwayLink: boolean;
  isInitialized: boolean;
}

export default ITimeAwaySummaryContainerProps;