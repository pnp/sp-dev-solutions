// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ICheckOut } from '../../models/InventoryCheckOutModel';

interface ICheckInDialogState {
    item: ICheckOut;
    submitting?: boolean;
    errorMessage?:string;
}
export default ICheckInDialogState;