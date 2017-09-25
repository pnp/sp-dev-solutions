// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IOrganization } from '../data/IOrganization';

export default class OrganizationSetChange {
    public removedItems: IOrganization[]; 
    public changedItems: IOrganization[];
    public addedItems: IOrganization[];

    constructor()
    {
        this.removedItems = new Array();        
        this.changedItems = new Array();
        this.addedItems = new Array();
    }
}
