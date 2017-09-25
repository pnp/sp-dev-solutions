import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ICRManagementDataProvider } from '../../dataProviders/ICRManagementDataProvider';

export interface ICRManagementContainerProps {
  context: IWebPartContext; // (MG) in the newer releases, WebPart context shold be used. IWebPartContext is being deprecated.
  isInitialized: boolean;
  displayMode: number; // (MG) this should be there in the context
  dataProvider: ICRManagementDataProvider;
}