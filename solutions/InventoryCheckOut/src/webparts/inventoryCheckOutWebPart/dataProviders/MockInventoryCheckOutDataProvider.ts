// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IPerson, ICheckOut, IInventoryItem, CheckOutStatus } from "../models/InventoryCheckOutModel";
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IInventoryCheckOutDataProvider } from "./IInventoryCheckOutDataProvider";
import { MockInventoryCheckOutList } from '../dataProviders/MockInventoryCheckOutList';
import * as lodash from 'lodash';
import * as moment from 'moment';

export class MockInventoryCheckOutDataProvider implements IInventoryCheckOutDataProvider {

  public constructor(context: IWebPartContext) {
    MockInventoryCheckOutList.initMockChangeListsItems();
  }
  public getCurrentUser(): Promise<IPerson>{
    return Promise.resolve(MockInventoryCheckOutList.getCurrentUser());
  }
  public getCheckOutStatusField(): Promise<string[]> {
    let status: string[] = [CheckOutStatus.Active, CheckOutStatus.Closed];
    return Promise.resolve(status);
  }
  public getAllInventoryItems(): Promise<IInventoryItem[]> {
    return Promise.resolve(MockInventoryCheckOutList.getMockInventoryItems());
  }
  public getAllMyInventoryItems(personId:number): Promise<IInventoryItem[]> {
    let mycheckouts: ICheckOut[] = MockInventoryCheckOutList.getAllCheckOuts().filter((item: ICheckOut) => (item.checkedOutTo != null && item.checkedOutTo.id == personId
      && !lodash.isEqual(item.status, CheckOutStatus.Closed)));
    return Promise.resolve(MockInventoryCheckOutList.getMockInventoryItems().filter((ivitem: IInventoryItem) =>
      lodash.findIndex(mycheckouts, (item: ICheckOut) => item.itemId === ivitem.id) !== -1
    ));
  }

  public createInventoryItem(data: IInventoryItem): Promise<IInventoryItem> {
    return Promise.resolve(MockInventoryCheckOutList.createMockInventoryItem(data));
  }

  public updateInventoryItem(data: IInventoryItem): Promise<IInventoryItem> {
    return Promise.resolve(MockInventoryCheckOutList.updateMockInventoryItem(data));
  }

  public deleteInventoryItem(item: IInventoryItem): Promise<boolean> {
    return Promise.resolve(MockInventoryCheckOutList.deleteMockInventoryItem(item));
  }

  public getCheckOutsByInventory(ivItemId: number): Promise<ICheckOut[]> {
    let filterCheckOuts = lodash.cloneDeep(MockInventoryCheckOutList.getMockInventoryItemCheckOuts(ivItemId));
    let nowMoment = moment();
    filterCheckOuts = lodash.filter(filterCheckOuts, (ck: ICheckOut) => {
      let actualCheckInDate = moment(ck.actualCheckInDate);
      return ck.status != CheckOutStatus.Closed && (ck.actualCheckInDate == null || actualCheckInDate > nowMoment);
    });
    return Promise.resolve(filterCheckOuts);
  }
  public createAdnUpdateCheckOutItem(item: ICheckOut): Promise<ICheckOut> {
    if (item.id > 0) {
      return this._updateCheckOutItem(item);
    }
    else {
      return this._createCheckOutItem(item);
    }
  }
  public getSiteUsers(): Promise<IPerson[]> {
    return Promise.resolve(MockInventoryCheckOutList.getAllUser());
  }
  private _createCheckOutItem(item: ICheckOut): Promise<ICheckOut> {
    return Promise.resolve(MockInventoryCheckOutList.createMockCheckOut(item));
  }

  private _updateCheckOutItem(item: ICheckOut): Promise<ICheckOut> {
    return Promise.resolve(MockInventoryCheckOutList.updateCheckOut(item));
  }
}