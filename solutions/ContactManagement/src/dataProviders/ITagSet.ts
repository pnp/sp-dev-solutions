// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {
  ITag
} from '../data/ITag';

export interface ITagSet
{
    key : string;
    tags : ITag[];

    apply(newTag : ITag[], removeAndAdd : boolean);
}