// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IPerson, IMyChangeRequestItem } from '../../../../libraries/index';

export interface ICRManagementPublicSectionState {
    item: IMyChangeRequestItem;
    allUsers: IPerson[];
}