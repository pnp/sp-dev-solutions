// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ICheckOut } from "../../models/InventoryCheckOutModel";
import {CheckOutEditOperationCallback} from '../../models/ItemOperationCallback';
interface ICheckOutListProps {
    checkouts: ICheckOut[];
    checkOutEditIconClickCallback: CheckOutEditOperationCallback;
    checkOutMarkconClickCallback: CheckOutEditOperationCallback;
}
export default ICheckOutListProps;