// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import * as lodash from '@microsoft/sp-lodash-subset';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IInventoryCheckOutDataProvider } from './IInventoryCheckOutDataProvider';
import { IPerson, ICheckOut, IInventoryItem, CheckOutStatus, Constants } from "../models/InventoryCheckOutModel";

export class InventoryCheckOutDataProvider implements IInventoryCheckOutDataProvider {
    private _webPartContext: IWebPartContext;
    private _ivItemlistUrl: string;
    private _checkOutlistUrl: string;
    private _ivItemlistItemsUrl: string;
    private _checkOutlistItemsUrl: string;

    public constructor(context: IWebPartContext) {
        this._webPartContext = context;
        this._ivItemlistUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${Constants.ItemsListTitle}')`;
        this._checkOutlistUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${Constants.CheckOutsListTitle}')`;
        this._ivItemlistItemsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${Constants.ItemsListTitle}')/items`;
        this._checkOutlistItemsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${Constants.CheckOutsListTitle}')/items`;
    }

    public getCurrentUser(): Promise<IPerson> {
        return this._webPartContext.spHttpClient.
            get(this._webPartContext.pageContext["web"]["absoluteUrl"] + `/_api/web/currentuser`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: any) => {
                let userId: string = json['Id'], userTitle: string = json['Title'];
                let person: IPerson = null;
                person = { id: Number(userId), displayName: userTitle };
                return person;
            });
    }
    public getCheckOutStatusField(): Promise<string[]> {
        const requester: SPHttpClient = this._webPartContext.spHttpClient;
        const queryString: string = `?$filter=EntityPropertyName eq 'Status'`;
        const queryUrl: string = this._checkOutlistUrl + `/fields` + queryString;

        return requester.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json) => {
                return Promise.resolve(json.value[0].Choices);
            });
    }

    public getAllInventoryItems(): Promise<IInventoryItem[]> {
        return this._getInventoryItems("");
    }
    //checkout to eq me
    public getAllMyInventoryItems(personId: number): Promise<IInventoryItem[]> {
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        let queryString: string =
            `?$select=ItemId&$filter=Checked_x0020_Out_x0020_ToId eq ${personId} and Status ne '${CheckOutStatus.Closed}'`;
        const queryUrl: string = this._checkOutlistItemsUrl + queryString;
        console.log(queryUrl);
        return requester.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: { value: any[] }) => {
                if (json.value != null) {
                    let itemIdArray: number[] = json.value.map((checkout: any) => {
                        return checkout.ItemId;
                    });
                    if (itemIdArray.length > 0) {
                        itemIdArray = lodash.uniq(itemIdArray);
                        let filterString: string = "&$filter=";
                        for (let itemId of itemIdArray) {
                            filterString += `ID eq ${itemId} or `;
                        }
                        filterString = filterString.substring(0, filterString.length - " or ".length);
                        return this._getInventoryItems(filterString);
                    }
                    else {
                        return [];
                    }

                }
                else {
                    return [];
                }
            });
    }
    //create Inventory item
    public createInventoryItem(item: IInventoryItem): Promise<IInventoryItem> {
        const body: {} = {
            'Title': item.title,
            'Description': item.description,
            'Location': item.location,
            'Total_x0020_Quantity': item.totalQuantity,
            'Image_x0020_Url' : item.imageUrl
        };
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        return requester.post(`${this._ivItemlistItemsUrl}`, SPHttpClient.configurations.v1,
            {
                body: JSON.stringify(body)
            })
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: any) => {
                let ivItem: IInventoryItem = {
                    id: json.Id,
                    title: json.Title,
                    description: json.Description,
                    location: json.Location,
                    totalQuantity: json.Total_x0020_Quantity,
                    imageUrl: json.Image_x0020_Url
                };
                return ivItem;
            });
    }

    //update Inventory item
    public updateInventoryItem(item: IInventoryItem): Promise<IInventoryItem> {
        const body: {} = {
            'Title': item.title,
            'Description': item.description,
            'Location': item.location,
            'Total_x0020_Quantity': item.totalQuantity,
            'Image_x0020_Url': item.imageUrl
        };
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        let headers: Headers = new Headers();
        headers.append('If-Match', '*');
        return requester.fetch(`${this._ivItemlistItemsUrl}(${item.id})`, SPHttpClient.configurations.v1,
            {
                body: JSON.stringify(body),
                headers,
                method: 'PATCH'
            })
            .then((response: SPHttpClientResponse) => {
                return response.ok ? item : null;
            });
    }
    //delete Inventory item
    public deleteInventoryItem(item: IInventoryItem): Promise<boolean> {
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        let headers: Headers = new Headers();
        headers.append('If-Match', '*');
        return requester.fetch(`${this._ivItemlistItemsUrl}(${item.id})`, SPHttpClient.configurations.v1,
            {
                headers,
                method: 'DELETE'
            })
            .then((response: SPHttpClientResponse) => {
                return response.ok;
            });
    }

    //get check Outs by iventory item
    public getCheckOutsByInventory(ivItemId: number): Promise<ICheckOut[]> {
        let currentDate = new Date();
        return this._getCheckOuts(`&$filter=ItemId eq ${ivItemId} and Status ne '${CheckOutStatus.Closed}' and ((Actual_x0020_Check_x002d_In_x002 eq null) or (Actual_x0020_Check_x002d_In_x002 gt '${currentDate.toJSON()}'))`);
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
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        let headers: Headers = new Headers();
        headers.append('If-Match', '*');
        return requester.fetch(`${this._checkOutlistItemsUrl}(${item.id})`, SPHttpClient.configurations.v1,
            {
                headers,
                method: 'DELETE'
            })
            .then((response: SPHttpClientResponse) => {
                return response.ok;
            });
    }
    //get site users
    public getSiteUsers(): Promise<IPerson[]> {
        return this._webPartContext.spHttpClient.
            get(this._webPartContext.pageContext["web"]["absoluteUrl"] + `/_api/web/siteusers`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: { value: any[] }) => {
                if (json.value != null) {
                    return json.value.map((item: any) => {
                        let userId: string = item['Id'], userTitle: string = item['Title'];
                        let person: IPerson = null;
                        person = { id: Number(userId), displayName: userTitle };
                        return person;
                    });
                }
                else {
                    return [];
                }
            });
    }
    private _getCheckOuts(filterString: string): Promise<ICheckOut[]> {
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        let queryString: string = `?$select=Id,ItemId,Checked_x0020_Out_x0020_To/Title,Checked_x0020_Out_x0020_To/Id,Checked_x0020_Out_x0020_Date,Scheduled_x0020_Check_x002d_In_x,Actual_x0020_Check_x002d_In_x002,Status,Notes,Quantity&$expand=Checked_x0020_Out_x0020_To&$orderby=ID asc`;
        const queryUrl: string = this._checkOutlistItemsUrl + queryString + filterString;
        console.log(queryUrl);
        return requester.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: { value: any[] }) => {
                if (json.value != null) {
                    return json.value.map((item: any) => {
                        let checkOutItem: ICheckOut = {
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
                        return checkOutItem;
                    });
                }
                else {
                    return [];
                }
            });
    }
    //create checkout
    private _createCheckOutItem(item: ICheckOut): Promise<ICheckOut> {
        const body: {} = {
            'ItemId': item.itemId,
            'Checked_x0020_Out_x0020_ToId': item.checkedOutTo.id,
            'Checked_x0020_Out_x0020_Date': item.checkedOutDate,
            'Scheduled_x0020_Check_x002d_In_x': item.scheduledCheckInDate,
            'Actual_x0020_Check_x002d_In_x002': item.actualCheckInDate,
            'Status': item.status,
            'Notes': item.notes,
            'Quantity': item.quantity
        };
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        return requester.post(`${this._checkOutlistItemsUrl}`, SPHttpClient.configurations.v1,
            {
                body: JSON.stringify(body)
            })
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: any) => {
                let checkoutItem: ICheckOut = {
                    id: json.Id,
                    itemId: json.ItemId,
                    checkedOutDate: json.Checked_x0020_Out_x0020_Date,
                    scheduledCheckInDate: json.Scheduled_x0020_Check_x002d_In_x,
                    actualCheckInDate: json.Actual_x0020_Check_x002d_In_x002,
                    status: json.Status,
                    notes: json.Notes,
                    quantity: json.Quantity,
                    checkedOutTo: item.checkedOutTo
                };
                return checkoutItem;
            });
    }
    //update CheckOut item
    private _updateCheckOutItem(item: ICheckOut): Promise<ICheckOut> {
        const body: {} = {
            'ItemId': item.itemId,
            'Checked_x0020_Out_x0020_ToId': item.checkedOutTo.id,
            'Checked_x0020_Out_x0020_Date': item.checkedOutDate,
            'Scheduled_x0020_Check_x002d_In_x': item.scheduledCheckInDate,
            'Actual_x0020_Check_x002d_In_x002': item.actualCheckInDate,
            'Status': item.status,
            'Notes': item.notes,
            'Quantity': item.quantity
        };
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        let headers: Headers = new Headers();
        headers.append('If-Match', '*');
        return requester.fetch(`${this._checkOutlistItemsUrl}(${item.id})`, SPHttpClient.configurations.v1,
            {
                body: JSON.stringify(body),
                headers,
                method: 'PATCH'
            })
            .then((response: SPHttpClientResponse) => {
                return response.ok ? item : null;
            });
    }
    private _getInventoryItems(filterString: string): Promise<IInventoryItem[]> {
        const requester: SPHttpClient = this._webPartContext.spHttpClient;
        const queryString: string = `?$select=Id,Title,Description,Location,Total_x0020_Quantity,Image_x0020_Url`;
        const queryUrl: string = this._ivItemlistItemsUrl + queryString + filterString;
        console.log(queryUrl);
        return requester.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: { value: any[] }) => {
                if (json.value != null) {
                    return json.value.map((item: any) => {
                        let ivItem: IInventoryItem = {
                            id: item.Id,
                            title: item.Title,
                            description: item.Description,
                            location: item.Location,
                            totalQuantity: item.Total_x0020_Quantity,
                            imageUrl: item.Image_x0020_Url
                        };
                        return ivItem;
                    });
                }
                else {
                    return [];
                }
            });
    }
    private _getUserById(uid: Number): Promise<IPerson> {
        return this._webPartContext.spHttpClient.
            get(this._webPartContext.pageContext["web"]["absoluteUrl"] + `/_api/web/GetUserById(${uid})`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: any) => {
                let userId: string = json['Id'], userTitle: string = json['Title'];
                let person: IPerson = null;
                person = { id: Number(userId), displayName: userTitle };
                return person;
            });
    }
}