// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IInventoryItem, ICheckOut, IPerson } from "../../models/InventoryCheckOutModel";
interface ICheckOutContainerState {
    submitting: boolean;
    hasAdminPermission: boolean;
    isInitialized: boolean; 

    myCheckoutItems:IInventoryItem[];
    myCheckoutItemsOriginal:IInventoryItem[];
    allItems: IInventoryItem[];
    currentItem:IInventoryItem;
    currentCheckOuts: ICheckOut[];
    selectCheckOut: ICheckOut;
    displayMode:number;
    //Item detail page
    myOpenCheckOut: ICheckOut;
    checkOutStatus: string[];
    allUsers: IPerson[];
    showInventoryDetail: boolean;
    showDialogType: boolean;
    isNewInvForm: boolean;

    currentUser: IPerson;
}

export default ICheckOutContainerState;