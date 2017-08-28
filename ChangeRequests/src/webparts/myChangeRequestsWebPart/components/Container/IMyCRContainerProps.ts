import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyCRDataProvider } from '../../dataProviders/IMyCRDataProvider';

interface IMyCRContainerProps {
    context: IWebPartContext;
    dataProvider: IMyCRDataProvider;
    newcrdisplays: string;
    newcrtext: string;
    newcrsubmissiontext: string;
    newcrbuttontext: string;
    isInitialized: boolean;
}
export default IMyCRContainerProps;