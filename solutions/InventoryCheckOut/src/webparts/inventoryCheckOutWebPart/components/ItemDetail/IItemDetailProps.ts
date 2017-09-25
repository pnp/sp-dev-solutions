// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IInventoryItem, ICheckOut } from "../../models/InventoryCheckOutModel";

interface IItemDetailProps {
    currentItem:IInventoryItem;
    myOpenCheckOut: ICheckOut;
    onEditClickEvent:any;
    onDeleteClickEvent:any;
    available:number;
    onBackClickEvent: any;
    onCreateCheckOutClickEvent: any;
    onCheckMyItemButtonClick: any;
}

export default IItemDetailProps;