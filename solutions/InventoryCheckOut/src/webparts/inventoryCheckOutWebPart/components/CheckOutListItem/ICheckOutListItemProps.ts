// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ICheckOut } from '../../models/InventoryCheckOutModel';
import { CheckOutEditOperationCallback } from '../../models/ItemOperationCallback';

interface ICheckOutListItemProps {
  item: ICheckOut;
  onEdit: CheckOutEditOperationCallback;
  onCheckIn: CheckOutEditOperationCallback;
}

export default ICheckOutListItemProps;