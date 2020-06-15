// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as lodash from '@microsoft/sp-lodash-subset';
import { IInventoryCheckOutDataProvider } from './IInventoryCheckOutDataProvider';
import { IPerson, ICheckOut, IInventoryItem, CheckOutStatus, Constants } from "../models/InventoryCheckOutModel";
import { sp } from '../../../pnp-preset';
import { IFieldInfo } from '@pnp/sp/fields';

export class InventoryCheckOutDataProvider implements IInventoryCheckOutDataProvider {
    public getCurrentUser(): Promise<IPerson> {
        return sp.web.currentUser
            .get()
            .then(person => {
                return {
                    id: person.Id,
                    displayName: person.Title
                };
            });
    }

    public getCheckOutStatusField(): Promise<string[]> {
        return sp.web
            .lists.getByTitle(Constants.CheckOutsListTitle)
            .fields.filter(`EntityPropertyName eq 'Status'`)
            .get()
            .then((fields: IFieldInfo[]): Promise<string[]> => {
                return Promise.resolve((fields[0] as any).Choices);
            });
    }

    public getAllInventoryItems(): Promise<IInventoryItem[]> {
        return this._getInventoryItems("");
    }

    //checkout to eq me
    public getAllMyInventoryItems(personId: number): Promise<IInventoryItem[]> {
        return sp.web
            .lists.getByTitle(Constants.CheckOutsListTitle)
            .items
            .filter(`Checked_x0020_Out_x0020_ToId eq ${personId} and Status ne '${CheckOutStatus.Closed}'`)
            .select('ItemId')
            .get()
            .then((items: { ItemId: number }[]) => {
                let itemIdArray: number[] = items.map(checkout => {
                    return checkout.ItemId;
                });

                if (itemIdArray.length > 0) {
                    itemIdArray = lodash.uniq(itemIdArray);
                    let filterString: string = "";
                    for (let itemId of itemIdArray) {
                        filterString += `ID eq ${itemId} or `;
                    }
                    filterString = filterString.substring(0, filterString.length - " or ".length);
                    return this._getInventoryItems(filterString);
                }
                else {
                    return [];
                }
            });
    }

    //create Inventory item
    public createInventoryItem(item: IInventoryItem): Promise<IInventoryItem> {
        return sp.web
            .lists.getByTitle(Constants.ItemsListTitle)
            .items.add({
                'Title': item.title,
                'Description': item.description,
                'Location': item.location,
                'Total_x0020_Quantity': item.totalQuantity,
                'Image_x0020_Url': {
                    Url: item.imageUrl
                }
            })
            .then(result => {
                return {
                    id: result.data.Id,
                    title: result.data.Title,
                    description: result.data.Description,
                    location: result.data.Location,
                    totalQuantity: result.data.Total_x0020_Quantity,
                    imageUrl: result.data.Image_x0020_Url ? result.data.Image_x0020_Url.Url : undefined
                };
            });
    }

    //update Inventory item
    public updateInventoryItem(item: IInventoryItem): Promise<IInventoryItem> {
        return sp.web
            .lists.getByTitle(Constants.ItemsListTitle)
            .items.getById(item.id)
            .update({
                'Title': item.title,
                'Description': item.description,
                'Location': item.location,
                'Total_x0020_Quantity': item.totalQuantity,
                'Image_x0020_Url': {
                    Url: item.imageUrl
                }
            })
            .then(result => {
                return item;
            })
            .catch(_ => null);
    }

    //delete Inventory item
    public deleteInventoryItem(item: IInventoryItem): Promise<boolean> {
        return sp.web
            .lists.getByTitle(Constants.ItemsListTitle)
            .items.getById(item.id)
            .delete()
            .then(_ => true)
            .catch(_ => false);
    }

    //get check Outs by iventory item
    public getCheckOutsByInventory(ivItemId: number): Promise<ICheckOut[]> {
        let currentDate = new Date();
        return this._getCheckOuts(`ItemId eq ${ivItemId} and Status ne '${CheckOutStatus.Closed}' and ((Actual_x0020_Check_x002d_In_x002 eq null) or (Actual_x0020_Check_x002d_In_x002 gt '${currentDate.toJSON()}'))`);
    }

    public createAdnUpdateCheckOutItem(item: ICheckOut): Promise<ICheckOut> {
        if (item.id > 0) {
            return this._updateCheckOutItem(item);
        }
        else {
            return this._createCheckOutItem(item);
        }
    }

    //delete CheckOut item
    public deleteCheckOutItem(item: ICheckOut): Promise<boolean> {
        return sp.web
            .lists.getByTitle(Constants.CheckOutsListTitle)
            .items.getById(item.id)
            .delete()
            .then(_ => true)
            .catch(_ => false);
    }

    //get site users
    public getSiteUsers(): Promise<IPerson[]> {
        return sp.web.siteUsers.get()
            .then(users => {
                return users.map(user => {
                    return {
                        id: user.Id,
                        displayName: user.Title
                    };
                });
            });
    }

    private _getCheckOuts(filterString: string): Promise<ICheckOut[]> {
        return sp.web
            .lists.getByTitle(Constants.CheckOutsListTitle)
            .items
            .filter(filterString)
            .select('Id','ItemId','Checked_x0020_Out_x0020_To/Title','Checked_x0020_Out_x0020_To/Id','Checked_x0020_Out_x0020_Date','Scheduled_x0020_Check_x002d_In_x','Actual_x0020_Check_x002d_In_x002','Status','Notes','Quantity')
            .expand('Checked_x0020_Out_x0020_To')
            .orderBy('ID', true)
            .get()
            .then(items => {
                return items.map(item => {
                    return {
                        id: item.Id,
                        itemId: item.ItemId,
                        checkedOutDate: item.Checked_x0020_Out_x0020_Date,
                        scheduledCheckInDate: item.Scheduled_x0020_Check_x002d_In_x,
                        actualCheckInDate: item.Actual_x0020_Check_x002d_In_x002,
                        status: item.Status,
                        notes: item.Notes,
                        quantity: item.Quantity,
                        checkedOutTo: { id: item.Checked_x0020_Out_x0020_To.Id, displayName: item.Checked_x0020_Out_x0020_To.Title }
                    };
                });
            });
    }

    //create checkout
    private _createCheckOutItem(item: ICheckOut): Promise<ICheckOut> {
        return sp.web
            .lists.getByTitle(Constants.CheckOutsListTitle)
            .items.add({
                'ItemId': item.itemId,
                'Checked_x0020_Out_x0020_ToId': item.checkedOutTo.id,
                'Checked_x0020_Out_x0020_Date': item.checkedOutDate,
                'Scheduled_x0020_Check_x002d_In_x': item.scheduledCheckInDate,
                'Actual_x0020_Check_x002d_In_x002': item.actualCheckInDate,
                'Status': item.status,
                'Notes': item.notes,
                'Quantity': item.quantity
            })
            .then(result => {
                return {
                    id: result.data.Id,
                    itemId: result.data.ItemId,
                    checkedOutDate: result.data.Checked_x0020_Out_x0020_Date,
                    scheduledCheckInDate: result.data.Scheduled_x0020_Check_x002d_In_x,
                    actualCheckInDate: result.data.Actual_x0020_Check_x002d_In_x002,
                    status: result.data.Status,
                    notes: result.data.Notes,
                    quantity: result.data.Quantity,
                    checkedOutTo: item.checkedOutTo
                };
            });
    }

    //update CheckOut item
    private _updateCheckOutItem(item: ICheckOut): Promise<ICheckOut> {
        return sp.web
            .lists.getByTitle(Constants.CheckOutsListTitle)
            .items.getById(item.id)
            .update({
                'ItemId': item.itemId,
                'Checked_x0020_Out_x0020_ToId': item.checkedOutTo.id,
                'Checked_x0020_Out_x0020_Date': item.checkedOutDate,
                'Scheduled_x0020_Check_x002d_In_x': item.scheduledCheckInDate,
                'Actual_x0020_Check_x002d_In_x002': item.actualCheckInDate,
                'Status': item.status,
                'Notes': item.notes,
                'Quantity': item.quantity
            })
            .then(_ => item)
            .catch(_ => null);
    }

    private _getInventoryItems(filterString: string): Promise<IInventoryItem[]> {
        return sp.web
            .lists.getByTitle(Constants.ItemsListTitle)
            .items
            .filter(filterString)
            .select('Id','Title','Description','Location','Total_x0020_Quantity','Image_x0020_Url')
            .get()
            .then(items => {
                return items.map(item => {
                    return {
                        id: item.Id,
                        title: item.Title,
                        description: item.Description,
                        location: item.Location,
                        totalQuantity: item.Total_x0020_Quantity,
                        imageUrl: item.Image_x0020_Url ? item.Image_x0020_Url.Url : undefined
                    };
                });
            });
    }
}