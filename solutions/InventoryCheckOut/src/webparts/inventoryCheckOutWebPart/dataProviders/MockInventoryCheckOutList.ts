// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as lodash from '@microsoft/sp-lodash-subset';
import { IPerson, CheckOutStatus, ICheckOut, IInventoryItem } from "../models/InventoryCheckOutModel";

export class MockInventoryCheckOutList {
    private static _personitems: IPerson[];
    private static _inventoryItems: IInventoryItem[];
    private static _idInventoryCounter: number;
    private static _checkOutItems: ICheckOut[];
    private static _idCheckOutCounter: number;

    public static initMockChangeListsItems() {
        if (this._personitems == null) {
            this._personitems = [
                { id: 1, displayName: "Katie Jordan" },
                { id: 2, displayName: "Ron Gabel" },
                { id: 3, displayName: "Alisa Lawyer" }];
        }
        if (this._inventoryItems == null) {
            this._idInventoryCounter = 0;
            this._inventoryItems = [
                this._createMockInventoryItem({ id: -1, title: 'Contoso Small Phone', description: 'The quick brown fox jumps over the lazy dog.', location: "Mike's Storage Cabinet near 1044", totalQuantity: 1, imageUrl: null }),
                this._createMockInventoryItem({ id: -2, title: 'Fabrikam Small Phone', description: 'The quick brown fox jumps over the lazy dog.', location: "Mike's Storage Cabinet near 1044", totalQuantity: 2, imageUrl: null  }),
                this._createMockInventoryItem({ id: -3, title: 'VanArsdel Large Tablet', description: 'The quick brown fox jumps over the lazy dog.', location: "Hallway Storage Closet near 1171", totalQuantity: 3, imageUrl: null  }),
                this._createMockInventoryItem({ id: -4, title: 'Wingtip Large Tablet', description: 'The quick brown fox jumps over the lazy dog.', location: "Hallway Storage Closet near 1171", totalQuantity: 4, imageUrl: null  }),
                this._createMockInventoryItem({ id: -5, title: 'Fabrikam 2-in-1 PC ', description: 'The quick brown fox jumps over the lazy dog.', location: "Offsite Storage", totalQuantity: 5, imageUrl: null  }),
                this._createMockInventoryItem({ id: -6, title: 'Fabrikam Tablet', description: 'The quick brown fox jumps over the lazy dog.', location: "Offsite Storage", totalQuantity: 6, imageUrl: null  }),
                this._createMockInventoryItem({ id: -7, title: 'Contoso All-in-one', description: 'The quick brown fox jumps over the lazy dog.', location: "Device Lab", totalQuantity: 7, imageUrl: null  }),
            ];
        }
        if (this._checkOutItems == null) {
            this._idCheckOutCounter = 0;
            let currentDate = new Date();
            this._checkOutItems = [
                this._createMockCheckOut({
                    id: -1, itemId: 1, checkedOutTo: this._personitems[0], checkedOutDate: this._addDays(currentDate, -3),
                    scheduledCheckInDate: this._addDays(currentDate, 1), status: CheckOutStatus.Active, quantity: 1
                }),
                this._createMockCheckOut({
                    id: -1, itemId: 2, checkedOutTo: this._personitems[0], checkedOutDate: this._addDays(currentDate, -6),
                    scheduledCheckInDate: this._addDays(currentDate, 3), status: CheckOutStatus.Active, quantity: 1
                }),
                this._createMockCheckOut({
                    id: -1, itemId: 2, checkedOutTo: this._personitems[1], checkedOutDate: this._addDays(currentDate, 0),
                    scheduledCheckInDate: this._addDays(currentDate, 3), status: CheckOutStatus.Active, quantity: 1
                }),
                this._createMockCheckOut({
                    id: -1, itemId: 3, checkedOutTo: this._personitems[0], checkedOutDate: this._addDays(currentDate, -1),
                    scheduledCheckInDate: this._addDays(currentDate, 5), status: CheckOutStatus.Active, quantity: 1
                }),
                this._createMockCheckOut({
                    id: -1, itemId: 3, checkedOutTo: this._personitems[1], checkedOutDate: this._addDays(currentDate, -2),
                    scheduledCheckInDate: this._addDays(currentDate, 5), status: CheckOutStatus.Active, quantity: 1
                }),
                this._createMockCheckOut({
                    id: -1, itemId: 3, checkedOutTo: this._personitems[2], checkedOutDate: this._addDays(currentDate, -1),
                    scheduledCheckInDate: this._addDays(currentDate, 5), status: CheckOutStatus.Active, quantity: 1
                }),
                this._createMockCheckOut({
                    id: -1, itemId: 4, checkedOutTo: this._personitems[0], checkedOutDate: this._addDays(currentDate, -1),
                    scheduledCheckInDate: this._addDays(currentDate, 5), status: CheckOutStatus.Active, quantity: 2
                }),
                this._createMockCheckOut({
                    id: -1, itemId: 4, checkedOutTo: this._personitems[1], checkedOutDate: this._addDays(currentDate, -2),
                    scheduledCheckInDate: this._addDays(currentDate, 5), status: CheckOutStatus.Active, quantity: 1
                }),
                this._createMockCheckOut({
                    id: -1, itemId: 4, checkedOutTo: this._personitems[2], checkedOutDate: this._addDays(currentDate, -1),
                    scheduledCheckInDate: this._addDays(currentDate, 5), status: CheckOutStatus.Active, quantity: 1
                }),
            ];
        }
    }
    public static getCurrentUser(): IPerson {
        return this._personitems[0];
    }
    public static getAllUser(): IPerson[] {
        return this._personitems;
    }
    public static getMockInventoryItemCheckOuts(ivItemId: number): ICheckOut[] {
        return this._checkOutItems.filter(coitem => coitem.itemId == ivItemId);
    }
    public static getAllCheckOuts(): ICheckOut[] {
        return this._checkOutItems;
    }

    public static createMockCheckOut(item: ICheckOut): ICheckOut {
        var mockItem = this._createMockCheckOut(item);
        this._checkOutItems = this._checkOutItems.concat(mockItem);
        return mockItem;
    }

    public static updateCheckOut(itemUpdated: ICheckOut): ICheckOut {
        const index: number =
            lodash.findIndex(
                this._checkOutItems,
                (item: ICheckOut) => item.id === itemUpdated.id
            );

        if (index !== -1) {
            this._checkOutItems[index] = itemUpdated;
            return itemUpdated;
        }
        else {
            return null;
        }
    }

    public static deleteCheckOut(itemDeleted: ICheckOut) {
        this._checkOutItems = this._checkOutItems.filter((item: ICheckOut) => item.id !== itemDeleted.id);
    }

    public static getMockInventoryItems(): IInventoryItem[] {
        return this._inventoryItems;
    }
    public static searchMockInventoryItem(searchText: string): IInventoryItem[] {
        return this._inventoryItems.filter((item: IInventoryItem) => item.title.indexOf(searchText) > -1 || item.description.indexOf(searchText) > -1);
    }

    public static createMockInventoryItem(item: IInventoryItem): IInventoryItem {
        var mockItem = this._createMockInventoryItem(item);
        mockItem.title += " New";
        this._inventoryItems = this._inventoryItems.concat(mockItem);
        return mockItem;
    }
    public static updateMockInventoryItem(itemUpdated: IInventoryItem): IInventoryItem {
        const index: number =
            lodash.findIndex(
                this._inventoryItems,
                (item: IInventoryItem) => item.id === itemUpdated.id
            );

        if (index !== -1) {
            this._inventoryItems[index] = itemUpdated;
            return itemUpdated;
        }
        else {
            return null;
        }
    }

    public static deleteMockInventoryItem(deleteitem: IInventoryItem): boolean {
        this._inventoryItems = this._inventoryItems.filter((item: IInventoryItem) => item.id !== deleteitem.id);
        return true;
    }
    private static _addDays(date: Date, days: number): Date {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    private static _createMockInventoryItem(item: IInventoryItem): IInventoryItem {
        const mockInventoryItem: IInventoryItem = {
            id: ++this._idInventoryCounter,
            title: item.title,
            description: item.description,
            location: item.location,
            totalQuantity: item.totalQuantity,
            imageUrl: item.imageUrl
        };
        return mockInventoryItem;
    }
    private static _createMockCheckOut(item: ICheckOut): ICheckOut {
        const mockCheckOutItem: ICheckOut = {
            id: ++this._idCheckOutCounter,
            itemId: item.itemId,
            checkedOutTo: item.checkedOutTo,
            checkedOutDate: item.checkedOutDate,
            scheduledCheckInDate: item.scheduledCheckInDate,
            actualCheckInDate: item.actualCheckInDate,
            status: item.status,
            notes: item.notes,
            quantity: item.quantity
        };
        return mockCheckOutItem;
    }
}
