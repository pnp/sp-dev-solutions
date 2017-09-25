// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IInventoryItem } from "../../models/InventoryCheckOutModel";

interface InvNewDialogProps {
    item?: IInventoryItem;
    isOpen: boolean;
    isNew: boolean;
    location:string;
    itemSaveOperationCallback: any;
    itemCancelOperationCallback: any;
    itemValidOperationCallback: any;
}

export default InvNewDialogProps;