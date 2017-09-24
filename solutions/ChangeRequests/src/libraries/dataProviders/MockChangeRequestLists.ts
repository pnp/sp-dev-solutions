import * as lodash from '@microsoft/sp-lodash-subset';
import { IMyChangeRequestItem, IChangeDiscussionItem, IPerson, ChangeRequestStatus } from "../models/ChangeRequestModel";

export class MockChangeRequestLists {
    private static _personitems: IPerson[];
    private static _critems: IMyChangeRequestItem[];
    private static _cditems: IChangeDiscussionItem[];
    private static _idcrCounter: number;
    private static _idcdCounter: number;

    public static createMockChangeRequestItem(item: IMyChangeRequestItem) {
        var mockItem = this._createMockChangeRequestItem(item);
        mockItem.createdby = this._personitems[0].id;
        this._critems = this._critems.concat(mockItem);
    }

    public static updateMockChangeRequestItem(itemUpdated: IMyChangeRequestItem): boolean {
        const index: number =
            lodash.findIndex(
                this._critems,
                (item: IMyChangeRequestItem) => item.id === itemUpdated.id
            );

        if (index !== -1) {
            this._critems[index] = itemUpdated;
            return true;
        }
        else {
            return false;
        }
    }

    public static getCurrentPerson(): IPerson {
        return this._personitems[0];
    }

    public static isTriageTeamMember(): boolean{
        return this.getCurrentPerson().isInTriage;
    }

    public static getCRItems(): IMyChangeRequestItem[]{
        return this._critems;
    }

    public static getCDItems(): IChangeDiscussionItem[]{
        return this._cditems;
    }

    //mock Katie->Change Request User
    public static getMockChangeRequestItem(): IMyChangeRequestItem[] {
        let queryItems: IMyChangeRequestItem[] = this._critems.filter(item => item.createdby == this.getCurrentPerson().id);
        return queryItems;
    }

    public static getAllUsers(): IPerson[] {
        return this._personitems;
    }

    public static initMockChangeListsItems() {
        if (this._personitems == null) {
            //Katie->Change Request User 
            //Ron->Change Request Team
            //Alisa->Change Request Team
            this._personitems = [
                { id: 1, firstName: "Katie", lastName: "Jordan", isInTriage: true, displayName: 'Katie Jordan' },
                { id: 2, firstName: "Ron", lastName: "Gabel", isInTriage: false, displayName: 'Ron Gabel'  },
                { id: 3, firstName: "Alisa", lastName: "Lawyer", isInTriage: false, displayName: 'Alisa Lawyer'  }];
        }
        if (this._critems == null) {
            this._idcrCounter = 0;
            this._critems = [
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Open, createdby: 1 }),
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Progress, createdby: 1 }),
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Closed, createdby: 1 }),
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Open, createdby: 2 }),
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Progress, createdby: 2 }),
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Closed, createdby: 2 }),
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Open, createdby: 3 }),
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Progress, createdby: 3 }),
                this._createMockChangeRequestItem({ status: ChangeRequestStatus.Closed, createdby: 3 })];
        }
        if (this._cditems == null) {
            this._idcdCounter = 0;
            this._cditems = [
                this._createMockChangeDiscussionItem({ changeid: 1, substatus: "Untriaged", priority: "High", assignedto: null }),
                this._createMockChangeDiscussionItem({ changeid: 2, substatus: "Investigating", priority: "Medium", assignedto: 1 }),
                this._createMockChangeDiscussionItem({ changeid: 3, substatus: "Fix in Progress", priority: "Low", assignedto: 1 }),
                this._createMockChangeDiscussionItem({ changeid: 4, substatus: "Untriaged", priority: "High", assignedto: null }),
                this._createMockChangeDiscussionItem({ changeid: 5, substatus: "Investigating", priority: "Medium", assignedto: 1 }),
                this._createMockChangeDiscussionItem({ changeid: 6, substatus: "Fix in Progress", priority: "Low", assignedto: 1 }),
                this._createMockChangeDiscussionItem({ changeid: 7, substatus: "Untriaged", priority: "High", assignedto: null }),
                this._createMockChangeDiscussionItem({ changeid: 8, substatus: "Investigating", priority: "Medium", assignedto: 1 }),
                this._createMockChangeDiscussionItem({ changeid: 9, substatus: "Fix in Progress", priority: "Low", assignedto: 1 })
            ];
        }
    }

    private static _createMockChangeRequestItem(item: IMyChangeRequestItem): IMyChangeRequestItem {
        let id: number = ++this._idcrCounter;
        let mockItem: IMyChangeRequestItem = {
            id: id,
            title: `Change Request Mock Item Title ${id}`,
            description: `Change Request Mock Item Description ${id}`,
            status: item.status,
            statusupdates: `Mock Status Update ${id}`,
            createdby: item.createdby,
            createddate: new Date()
        };
        return mockItem;
    }

    private static _createMockChangeDiscussionItem(item: IChangeDiscussionItem): IChangeDiscussionItem {
        let id: number = ++this._idcdCounter;
        let mockItem: IChangeDiscussionItem = {
            id: item.changeid,
            changeid: item.changeid,
            triagecomments: `Change Discussion Mock Item triage comments ${item.changeid}`,
            substatus: item.substatus,
            priority: item.priority,
            assignedto: item.assignedto
        };
        return mockItem;
    }
}

MockChangeRequestLists.initMockChangeListsItems();