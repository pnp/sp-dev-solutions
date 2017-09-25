// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IChangeRequestManagementItem, CRMTab } from '../models/CRManagementModel';
import { IPerson } from '../../../libraries/models/ChangeRequestModel';

export interface ICRManagementDataProvider {
  getChangeRequestStatusField(): Promise<Array<string>>;
  getCRMItems(tab: CRMTab): Promise<IChangeRequestManagementItem[]>;
  getUserById(id: number): Promise<IPerson>;
  isTriageTeamUser(): Promise<Boolean>;
  saveCRMItem(item: IChangeRequestManagementItem): Promise<Boolean>;
  getTriageSiteUsers(): Promise<IPerson[]>;
}