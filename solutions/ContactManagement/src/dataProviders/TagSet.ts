// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ITag } from '../data/ITag';
import Tag  from '../data/Tag';
import { ITagSet } from './ITagSet';

import TagSetChange from './TagSetChange';
import { EventDispatcher, IEvent } from '../utilities/Events';

export default class TagSet implements ITagSet {
    public key : string;

    private _tags : ITag[];
    private _tagsById : { [id: number]: ITag };
    private _onSetChanged : EventDispatcher<ITagSet, TagSetChange>;

    constructor()
    {
        this._tags = new Array();
        this._tagsById = {};
        this._onSetChanged = new EventDispatcher<ITagSet, TagSetChange>(this);
    }

    public get tags() : ITag[]
    {
        return this._tags;
    };

    public apply(newTags : ITag[], removeAndAdd : boolean)
    {
        if (newTags == null)
        {
            return;
        }

        let osc = new TagSetChange(); 
        let hasChanged = false;

        let unusedItemIds = new Array();

        if (removeAndAdd)
        {
            for (var i=0; i<this._tags.length; i++)
            {
                unusedItemIds.push(this._tags[i].Id);
            }            
        }

        for (var iA=0; iA<newTags.length; iA++)
        {   
            let tag = newTags[iA];

            let existingTag = this._tagsById[tag.Id];

            if (existingTag == null)
            {
                if (removeAndAdd)
                {
                    osc.addedItems.push(tag);
                    hasChanged = true;

                    this._tags.push(tag);
                    this._tagsById[tag.Id] = tag;
                }
            }
            else
            {
                if (removeAndAdd)
                {
                    for (var jA=0; jA<unusedItemIds.length; jA++)
                    {
                        if (unusedItemIds[jA] == tag.Id)
                        {
                            unusedItemIds[jA] = null;
                            break;
                        }
                    }
                }

                if (Tag.compareAndUpdate(existingTag, tag))
                {
                    hasChanged = true;
                    osc.changedItems.push(existingTag);
                }
            }
        }
        
        if (removeAndAdd)
        {
            for (var iB=0; iB<unusedItemIds.length; iB++)
            {
                let oldId = unusedItemIds[iB];

                // was this existing item not in the list of newly updated items?
                if (oldId != null)
                {       
                    hasChanged = true;             
                    osc.removedItems.push(this._tagsById[oldId]);

                    this._tagsById[oldId] = null;

                    var newTagList = new Array();

                    for (var jB=0; jB<this._tags.length; jB++)
                    {
                        if (this._tags[jB].Id != oldId )
                        {
                            newTagList.push(this._tags[jB]);
                        }
                    }

                    this._tags = newTagList;
                }   
            }
        }

        if (hasChanged)
        {
            this._onSetChanged.dispatch(this, osc);
        }
    }

    public get onSetChanged(): IEvent<ITagSet, TagSetChange> {
        return this._onSetChanged.asEvent();
    }
}
