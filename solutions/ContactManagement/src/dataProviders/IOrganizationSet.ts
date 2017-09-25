// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IOrganization } from '../data/IOrganization';

export interface IOrganizationSet
{
    key : string;
    organizations : IOrganization[];

    apply(newOrgs : IOrganization[], removeAndAdd : boolean);
}