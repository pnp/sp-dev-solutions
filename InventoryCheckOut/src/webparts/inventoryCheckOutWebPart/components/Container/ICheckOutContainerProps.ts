import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IInventoryCheckOutDataProvider } from '../../dataProviders/IInventoryCheckOutDataProvider';

interface ICheckOutContainerProps {
    dataProvider: IInventoryCheckOutDataProvider;
    context: IWebPartContext;
    isInitialized: boolean;
    location:string;
    displayMode:number;
    standardCheckoutLength:string;
    allowCheckoutIntheFuture:boolean;

}
export default ICheckOutContainerProps;