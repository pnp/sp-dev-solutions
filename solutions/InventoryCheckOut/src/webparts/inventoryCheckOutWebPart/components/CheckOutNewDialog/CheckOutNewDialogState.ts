// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IPerson, ICheckOut } from "../../models/InventoryCheckOutModel";

interface ICheckOutNewDialogState {
    showDialog: boolean;
    isNewForm: boolean;
    item: ICheckOut;
    statuses: string[];
    users: IPerson[];
    errorMessages: string[];
    submitting: boolean;
}

export default ICheckOutNewDialogState;