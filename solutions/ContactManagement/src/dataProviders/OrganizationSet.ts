// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IOrganization } from '../data/IOrganization';
import Organization  from '../data/Organization';
import { IOrganizationSet } from './IOrganizationSet';

import OrganizationSetChange from './OrganizationSetChange';
import { EventDispatcher, IEvent } from '../utilities/Events';

export default class OrganizationSet implements IOrganizationSet {
    public key : string;

    private _orgs : IOrganization[];
    private _orgsById : { [id: number]: IOrganization };
    private _onSetChanged : EventDispatcher<IOrganizationSet, OrganizationSetChange>;

    constructor()
    {
        this._orgs = new Array();
        this._orgsById = {};
        this._onSetChanged = new EventDispatcher<IOrganizationSet, OrganizationSetChange>(this);
    }

    public get organizations() : IOrganization[]
    {
        return this._orgs;
    };

    public apply(newOrgs : IOrganization[], removeAndAdd : boolean)
    {
        if (newOrgs == null)
        {
            return;
        }

        let osc = new OrganizationSetChange(); 
        let hasChanged = false;

        let unusedItemIds = new Array();

        if (removeAndAdd)
        {
            for (var i=0; i<this._orgs.length; i++)
            {
                unusedItemIds.push(this._orgs[i].Id);
            }            
        }

        for (var iA=0; iA<newOrgs.length; iA++)
        {   
            let org = newOrgs[iA];

            let existingOrg = this._orgsById[org.Id];

            if (existingOrg == null)
            {
                if (removeAndAdd)
                {
                    osc.addedItems.push(org);
                    hasChanged = true;

                    this._orgs.push(org);
                    this._orgsById[org.Id] = org;
                }
            }
            else
            {
                if (removeAndAdd)
                {
                    for (var j=0; j<unusedItemIds.length; j++)
                    {
                        if (unusedItemIds[j] == org.Id)
                        {
                            unusedItemIds[j] = null;
                            break;
                        }
                    }
                }

                if (Organization.compareAndUpdate(existingOrg, org))
                {
                    hasChanged = true;
                    osc.changedItems.push(existingOrg);
                }
            }
        }
        
        if (removeAndAdd)
        {
            for (var iC=0; iC<unusedItemIds.length; iC++)
            {
                let oldId = unusedItemIds[iC];

                // was this existing item not in the list of newly updated items?
                if (oldId != null)
                {       
                    hasChanged = true;             

                    osc.removedItems.push(this._orgsById[oldId]);

                    this._orgsById[oldId] = null;

                    var newOrgList = new Array();

                    for (var jA=0; jA<this._orgs.length; jA++)
                    {
                        if (this._orgs[jA].Id != oldId )
                        {
                            newOrgList.push(this._orgs[jA]);
                        }
                    }

                    this._orgs = newOrgList;
                }   
            }
        }

        if (hasChanged)
        {
            this._onSetChanged.dispatch(this, osc);
        }
    }

    public get onSetChanged(): IEvent<IOrganizationSet, OrganizationSetChange> {
        return this._onSetChanged.asEvent();
    }
}
