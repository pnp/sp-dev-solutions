// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ICheckOut, IInventoryItem, IPerson } from "../models/InventoryCheckOutModel";

export interface IInventoryCheckOutDataProvider {
  //get current User
  getCurrentUser(): Promise<IPerson>;

  //get check status field
  getCheckOutStatusField(): Promise<string[]>;

  //all inventory items
  getAllInventoryItems(): Promise<IInventoryItem[]>;

  //inventory items and checkout to is me
  getAllMyInventoryItems(personId:number): Promise<IInventoryItem[]>;

  //create inventory item
  createInventoryItem(item: IInventoryItem): Promise<IInventoryItem>;

  //update inventory item
  updateInventoryItem(item: IInventoryItem): Promise<IInventoryItem>;

  //Delete inventory item
  deleteInventoryItem(item: IInventoryItem): Promise<boolean>;

  //get check Outs by iventory item
  getCheckOutsByInventory(ivItemId: number): Promise<ICheckOut[]>;

  //update CheckOut item
  createAdnUpdateCheckOutItem(item: ICheckOut): Promise<ICheckOut>;

  //getSiteUsers
  getSiteUsers(): Promise<IPerson[]>;
}
