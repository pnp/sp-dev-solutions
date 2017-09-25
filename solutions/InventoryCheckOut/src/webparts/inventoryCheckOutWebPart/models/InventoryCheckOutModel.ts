// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export class Constants{
   public static readonly ItemsListTitle: string = "Items";
   public static readonly CheckOutsListTitle: string = "Check-Outs";
}

export class CheckOutStatus{
   public static readonly Active: string = "Active";
   public static readonly Closed: string = "Closed";
}

export enum DialogType {
    Hidden = 0,
    ConfirmDelete,
    CreateInventoryItem,
    CreateCheckOut,
    CheckIn
}

export interface IPerson {
    id: number;
    displayName: string;
}

export interface ICheckOut {
    id: number;
    itemId: number;
    checkedOutTo?: IPerson;
    checkedOutDate: Date;
    scheduledCheckInDate?: Date;
    actualCheckInDate?: Date;
    status: string;
    notes?: string;
    quantity: number;
}

export interface IInventoryItem {
    id: number;
    title: string;
    imageUrl: string;
    description?: string;
    location?: string;
    totalQuantity: number;
}

export interface IInventoryItemCheckOut{
    item:IInventoryItem;
    checkOuts?: ICheckOut[];
}