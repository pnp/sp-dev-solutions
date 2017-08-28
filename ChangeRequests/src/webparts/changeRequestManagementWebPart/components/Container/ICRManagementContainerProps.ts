import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ICRManagementDataProvider } from '../../dataProviders/ICRManagementDataProvider';

export interface ICRManagementContainerProps {
  context: IWebPartContext;
  isInitialized: boolean;
  displayMode: number;
  dataProvider: ICRManagementDataProvider;
}