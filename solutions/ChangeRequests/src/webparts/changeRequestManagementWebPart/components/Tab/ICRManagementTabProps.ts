// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { CRMTab } from '../../models/CRManagementModel';
import { ItemTabOperationCallback } from '../../models/CRMManagementOperationCallback';

export interface ICRManagementTabProps {
    selectedTab: CRMTab;
    tabOperationClickCallback: ItemTabOperationCallback;
}

export default ICRManagementTabProps;