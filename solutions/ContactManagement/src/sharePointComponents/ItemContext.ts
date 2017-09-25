// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import ListContext from './ListContext';
import { ISharePointDataProvider } from '../data/ISharePointDataProvider';
import { ISharePointItem } from '../data/ISharePointItem';
import { ISPUser } from '../data/ISPUser';

export default class ItemContext extends ListContext
{
    private _itemId : number;
    private _hasChanged : boolean;
    private _dataProvider : ISharePointDataProvider;
    private _itemObject? : any;


    public get itemObject() : any { return this._itemObject; }
    public set itemObject(newValue : any) {  this._itemObject = newValue; }

    public get dataProvider() : ISharePointDataProvider { return this._dataProvider; }
    public set dataProvider(newDataProvider : ISharePointDataProvider) { this._dataProvider = newDataProvider; }

    public get hasChanged() : boolean { return this._hasChanged; }
    public set hasChanged(newValue : boolean) {  this._hasChanged = newValue; }

    public get itemId() : number { return this._itemId; }
    public set itemId(newItemId : number) { this._itemId = newItemId; }


    public readListItems(listName : string): Promise<ISharePointItem[]>
    {
        return this._dataProvider.readListItems(listName);
    }

    public readListItemsBySearch(listName : string, searchTerm : string): Promise<ISharePointItem[]>
    {
        return this._dataProvider.readListItemsBySearch(listName, searchTerm);
    }

    public readListItemsByIds(listName : string, id : number[]): Promise<ISharePointItem[]>
    {
        return this._dataProvider.readListItemsByIds(listName, id);
    }

    public readUsersBySearch(searchTerm : string): Promise<ISPUser[]>
    {
        return this._dataProvider.readUsersBySearch(searchTerm);
    }

    public readUsersByIds(id : number[]): Promise<ISPUser[]>
    {
        if (this._dataProvider == null)
        {
            return Promise.reject(null);
        }
        
        return this._dataProvider.readUsersByIds(id);
    }
}