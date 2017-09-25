// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ISPUser } from './ISPUser';
import { ISharePointItem } from './ISharePointItem';
import { ISPField } from './ISPField';

export interface ISharePointDataProvider {
    readFields(listName : string): Promise<ISPField[]>;

    readListItems(listName : string): Promise<ISharePointItem[]>;
    readListItemsBySearch(listName : string, searchTerm : string): Promise<ISharePointItem[]>;
    
    readUsersByUserName(userName : string): Promise<ISPUser[]>;
    readUsersBySearch(searchTerm : string): Promise<ISPUser[]>;
    readUsersByIds(ids : number[]): Promise<ISPUser[]>;

    readListItemsByIds(listName : string, ids : number[]): Promise<ISharePointItem[]>;
}
