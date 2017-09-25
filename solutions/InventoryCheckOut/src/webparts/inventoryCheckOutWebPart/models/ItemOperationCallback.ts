// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IInventoryItem, ICheckOut } from './InventoryCheckOutModel';

export type ItemConfirmOperationCallback = () => void;
export type ItemValidOperationCallback = (item: IInventoryItem) => Promise<Boolean>;
export type ItemPromiseOperationCallback = (item: IInventoryItem) => Promise<any>;

export type CheckOutEditOperationCallback = (item: ICheckOut) => void;
export type CheckOutSaveOperationCallback = (item: ICheckOut) => Promise<any>;
export type CancelDialogOperationCallback = () => void;