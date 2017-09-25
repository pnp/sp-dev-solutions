// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IInventoryItem } from "../../models/InventoryCheckOutModel";

interface IInventoryListProps {
    myCheckoutItems:IInventoryItem[];
    allItems:IInventoryItem[];    
    onClickEvent:any;
}

export default IInventoryListProps;