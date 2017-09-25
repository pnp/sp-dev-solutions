// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ISharePointItem } from '../data/ISharePointItem';

export interface IPersonList {
    value: IPerson[];
}

export interface IPerson extends ISharePointItem {
    FullName?: string;
    FirstName?: string;
    Company: string;
    OrganizationId?: number;
    Email? : string;
    JobTitle? : string;
    WorkPhone? : string;
    HomePhone? : string;
    CellPhone? : string;
    WorkFax? : string;
    WorkAddress?: string;
    WorkCity? : string;
    WorkState? : string;
    WorkZip? : string;
    WorkCountry? : string;
    WebPage? : string;
    Comments? : string; 
}

export type PersonCallback = (item: IPerson) => void;
