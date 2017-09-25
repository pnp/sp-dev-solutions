// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ISPList } from '../data/ISPList';
import { ISPField } from '../data/ISPField';

export default class ListContext
{
    private _list : ISPList;

    public get list() :  ISPList { return this._list; }
    public set list(newList : ISPList) { this._list = newList; }
    
    public getField(internalName : string) : ISPField
    {
        for (let field of this.list.Fields)
        {
            if (field.InternalName == internalName)
            {
                return field;
            }
        }

        alert("Field not found: "+ internalName + " on list " + this.list.Title);

        return null;
    }
}