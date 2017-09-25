// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ISharePointItem }  from '../data/ISharePointItem';

export interface ITagList {
    value: ITag[];
}

export interface ITag extends ISharePointItem
{
}