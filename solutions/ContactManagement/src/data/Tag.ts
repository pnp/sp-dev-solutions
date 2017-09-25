// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ITag } from '../data/ITag';
import SharePointItem from '../data/SharePointItem';

export default class Tag extends SharePointItem implements ITag {
    
    public static compareAndUpdate(existingTag : ITag, newTag : ITag) : boolean
    {
        let wasChanged = false;

        if (existingTag.Title != newTag.Title)
        {
            existingTag.Title = newTag.Title;
            wasChanged = true;
        }

        return wasChanged;
    }
}

export type TagCallback = (item: ITag) => void;
