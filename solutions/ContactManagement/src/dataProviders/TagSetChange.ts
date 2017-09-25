// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ITag } from '../data/ITag';

export default class TagSetChange {
    public removedItems: ITag[]; 
    public changedItems: ITag[];
    public addedItems: ITag[];

    constructor()
    {
        this.removedItems = new Array();        
        this.changedItems = new Array();
        this.addedItems = new Array();
    }
}
