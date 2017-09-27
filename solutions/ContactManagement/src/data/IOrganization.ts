// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ISharePointItem } from '../data/ISharePointItem';
import SPUrl from '../data/SPUrl';

export interface IOrganizationList {
    value: IOrganization[];
}

export interface IOrganization extends ISharePointItem {
    Logo? : string;
    Notes? : string;
    Organizational_x0020_Priority? : number;
    About? : SPUrl;
    HomePage? : string;        
    PrimaryAddress? : string;
    PrimaryCity? : string;
    PrimaryStateProvince? : string;
    PrimaryCountry? : string;
    PrimaryZipPostalCode? : string;
    Status? : string;
    OwnerId? : number;
}

export type OrganizationCallback = (item: IOrganization) => void;
