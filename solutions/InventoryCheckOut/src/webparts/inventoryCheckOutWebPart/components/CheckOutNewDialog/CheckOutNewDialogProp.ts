// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IPerson, ICheckOut } from "../../models/InventoryCheckOutModel";
import { CheckOutSaveOperationCallback, CancelDialogOperationCallback } from "../../models/ItemOperationCallback";

interface ICheckOutNewDialogProp {
    item?: ICheckOut;
    isOpen: boolean;
    statuses: string[];
    users: IPerson[];
    standardCheckoutLength: string;
    allowCheckoutIntheFuture: boolean;
    available: number;
    itemSaveOperationCallback: CheckOutSaveOperationCallback;
    itemCloseOperationCallback: CancelDialogOperationCallback;
}

export default ICheckOutNewDialogProp;