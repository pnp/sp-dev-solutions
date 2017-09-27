// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IOrganization } from './IOrganization';
import SharePointItem from './SharePointItem';
import SPUrl from '../data/SPUrl';

export default class Organization extends SharePointItem implements IOrganization {
    public Type : string;
    public Logo? : string;
    public Notes? : string;
    public Organizational_x0020_Priority? : number;
    public About? : SPUrl;
    public HomePage? : string;    
    public PrimaryAddress? : string;
    public PrimaryCity? : string;
    public PrimaryStateProvince? : string;
    public PrimaryCountry? : string;
    public PrimaryZipPostalCode? : string;
    public AssignedToId? : number;

    public static compareAndUpdate(existingOrg : IOrganization, newOrg : IOrganization) : boolean
    {
        let wasChanged = false;

        if (existingOrg.Title != newOrg.Title)
        {
            existingOrg.Title = newOrg.Title;
            wasChanged = true;
        }

        return wasChanged;
    }
}
