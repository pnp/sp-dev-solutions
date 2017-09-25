// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IMyChangeRequestItem, IChangeDiscussionItem } from '../../../libraries/index';

export enum CRMTab {
    ActiveIssues = 1,
    MyIssues,
    ClosedIssues
}

export interface IChangeRequestManagementItem {
    critem: IMyChangeRequestItem;
    cditem: IChangeDiscussionItem; 
}