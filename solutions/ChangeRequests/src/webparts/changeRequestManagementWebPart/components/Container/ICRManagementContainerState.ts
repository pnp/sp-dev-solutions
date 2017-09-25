// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { CRMTab, IChangeRequestManagementItem } from '../../models/CRManagementModel';
import { IPerson } from '../../../../libraries/models/ChangeRequestModel';

interface ICRManagementContainerState {
    allTriageUsers: IPerson[];
    allPersons: IPerson[];
    displayMode: number;
    submitting: boolean;
    hasAdminPermission: boolean;
    isInitialized: boolean;
    isTriageTeamMember: boolean;  
    selectedTab: CRMTab; 
    items: IChangeRequestManagementItem[];
    showSections: boolean;
    selectedItem: IChangeRequestManagementItem;
    status: string[];
    loading: boolean;
    showModal: boolean;
}

export default ICRManagementContainerState;