import * as lodash from '@microsoft/sp-lodash-subset';
import { IMyTimeAwayItem, ApprovalStatus } from "../models/timeAwayModel";

export class MockTimeAwayList {
    private static _items: IMyTimeAwayItem[];
    private static _idCounter: number;
    public static getMockTimeAwayListItems(): IMyTimeAwayItem[] {
        if (this._items == null) {
            this._idCounter = 0;
            let currentDate = new Date();
            this._items = [
                this._createMockMyTimeAwayItem({ firstName: 'Katie', lastName: 'Jordan', start: this._addDays(currentDate, -2), end: this._addDays(currentDate, 0), comments: 'Mock My Time Away Item 1', status: ApprovalStatus.Approved }),
                this._createMockMyTimeAwayItem({ firstName: 'Katie', lastName: 'Jordan', start: this._addDays(currentDate, 7), end: this._addDays(currentDate, 9), comments: 'Mock My Time Away Item 2', status: ApprovalStatus.Rejected }),
                this._createMockMyTimeAwayItem({ firstName: 'Ron', lastName: 'Gabel', start: this._addDays(currentDate, 3), end: this._addDays(currentDate, 4), comments: 'Mock My Time Away Item 3', status: ApprovalStatus.Rejected }),
                this._createMockMyTimeAwayItem({ firstName: 'Ron', lastName: 'Gabel', start: this._addDays(currentDate, 1), end: this._addDays(currentDate, 2), comments: 'Mock My Time Away Item 4', status: ApprovalStatus.Approved }),
                this._createMockMyTimeAwayItem({ firstName: 'Alisa', lastName: 'Lawyer', start: this._addDays(currentDate, 7), end: this._addDays(currentDate, 9), comments: 'Mock My Time Away Item 5', status: ApprovalStatus.Rejected }),
                this._createMockMyTimeAwayItem({ firstName: 'Alisa', lastName: 'Lawyer', start: this._addDays(currentDate, -12), end: this._addDays(currentDate, -11), comments: 'Mock My Time Away Item 6', status: ApprovalStatus.Rejected }),
                this._createMockMyTimeAwayItem({ firstName: 'Alisa', lastName: 'Lawyer', start: this._addDays(currentDate, -18), end: this._addDays(currentDate, -16), comments: 'Mock My Time Away Item 7', status: ApprovalStatus.Approved })
            ];
        }
        return this._items;
    }

    public static createMockTimeAwayListItem(item: IMyTimeAwayItem) {
        var mockItem = this._createMockMyTimeAwayItem(item);
        mockItem.firstName = "Dan";
        mockItem.lastName = "Jump";
        this._items = this._items.concat(mockItem);
    }

    public static updateMyTimeAwayItem(itemUpdated: IMyTimeAwayItem): boolean {
        const index: number =
            lodash.findIndex(
                this._items,
                (item: IMyTimeAwayItem) => item.id === itemUpdated.id
            );

        if (index !== -1) {
            this._items[index] = itemUpdated;
            return true;
        }
        else {
            return false;
        }
    }

    public static deleteMyTimeAwayItem(itemDeleted: IMyTimeAwayItem) {
        this._items = this._items.filter((item: IMyTimeAwayItem) => item.id !== itemDeleted.id);
    }

    private static _createMockMyTimeAwayItem(item: IMyTimeAwayItem): IMyTimeAwayItem {
        const mockMyTimeAwayItem: IMyTimeAwayItem = {
            id: this._idCounter++,
            start: item.start,
            end: item.end,
            comments: item.comments,
            status: item.status,
            firstName: item.firstName,
            lastName: item.lastName
        };
        return mockMyTimeAwayItem;
    }
    private static _addDays(date: Date, days: number) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}