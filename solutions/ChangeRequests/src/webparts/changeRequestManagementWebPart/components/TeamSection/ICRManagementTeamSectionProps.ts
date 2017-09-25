// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IPerson, IChangeDiscussionItem } from '../../../../libraries/models/ChangeRequestModel';

export interface ICRManagementTeamSectionProps {
    selectedItem: IChangeDiscussionItem;
    isTriageTeamMember: boolean;
    itemChangeHandler: any;
    allTriageUser: IPerson[];
}