import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyCRDataProvider } from './IMyCRDataProvider';
import { IMyChangeRequestItem, MockChangeRequestLists } from '../../../libraries/index';
import * as lodash from 'lodash';

export class MockMyCRDataProvider implements IMyCRDataProvider {
    private _webPartContext: IWebPartContext;

    public constructor(context: IWebPartContext) {
        this._webPartContext = context;
        MockChangeRequestLists.initMockChangeListsItems();
    }

    public getMyChangeRequestItems(): Promise<IMyChangeRequestItem[]> {
        let mockItems: IMyChangeRequestItem[] = MockChangeRequestLists.getMockChangeRequestItem();
        return new Promise<IMyChangeRequestItem[]>((resolve) => {
            setTimeout(() => resolve(lodash.orderBy(mockItems,['status','id'],['desc','asc'])), 500);
        });
    }
    public createMyChangeRequestItem(itemCreated: IMyChangeRequestItem): Promise<IMyChangeRequestItem[]> {
        MockChangeRequestLists.createMockChangeRequestItem(itemCreated);
        return this.getMyChangeRequestItems();
    }
    public updateMyChangeRequestItem(itemUpdated: IMyChangeRequestItem): Promise<IMyChangeRequestItem[]> {
        if (MockChangeRequestLists.updateMockChangeRequestItem(itemUpdated)) {
            return this.getMyChangeRequestItems();
        }
        else {
            return Promise.reject(new Error(`Item to update doesn't exist.`));
        }
    }
}