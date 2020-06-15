// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ICrmDataProvider } from './ICrmDataProvider';

import { ISPField } from '../data/ISPField';
import { ISPView } from '../data/ISPView';
import { ISPUser } from '../data/ISPUser';
import { ISharePointItem } from '../data/ISharePointItem';

import { IPerson } from '../data/IPerson';

import { IOrganization } from '../data/IOrganization';
import { IOrganizationSet } from './IOrganizationSet';
import OrganizationSet from './OrganizationSet';

import { DataProviderErrorCodes } from './DataError';

import { ITag } from '../data/ITag';
import { ITagSet } from './ITagSet';

import { BaseCrmDataProvider } from './BaseCrmDataProvider';

import { IEvent } from '../utilities/Events';

import { sp } from '../pnp-preset';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IItemAddResult, IItemUpdateResult, IItems } from '@pnp/sp/items';
import { IListInfo } from '@pnp/sp/lists';
import { IFieldInfo } from '@pnp/sp/fields';

export default class SharePointCrmDataProvider extends BaseCrmDataProvider implements ICrmDataProvider {
  private _meUserLoginName: string;

  private _personFieldListSelect = "$select=Id,Title,FirstName,Company,OrganizationId";
  private _organizationFieldListSelect = "$select=Id,Title";

  public get meUserLoginName(): string { return this._meUserLoginName; }
  public set meUserLoginName(newValue: string) {
    this._meUserLoginName = newValue;
  }

  constructor(context: IWebPartContext) {
    super();

    sp.setup(context);
    sp.configure({
      headers: [
        ['X-ClientTag', 'SPCommunityCrmWebPart']
      ]
    });

    this._idCounter = 0;
  }

  public updateAll(): Promise<boolean> {
    return new Promise<boolean>((resolve) => { resolve(true); });
  }

  private _addPersonItem(person: IPerson): Promise<IItemAddResult> {
    return sp.web
      .lists.getByTitle('Contacts')
      .items.add(person, this._selectedPersonList.ListItemEntityTypeFullName);
  }

  private _getUsers(filter: string): Promise<ISPUser[]> {
    return sp.web.siteUserInfoList
      .items.filter(filter).get();
  }

  private _getPersonItems(filter?: string, orderBy?: string, orderAsc?: boolean, top?: number): Promise<IPerson[]> {
    let personItems: IItems = sp.web
      .lists.getByTitle('Contacts')
      .items.select('Id', 'Title', 'FirstName', 'Company', 'OrganizationId');

    if (filter) {
      personItems = personItems.filter(filter);
    }
    if (orderBy) {
      personItems = personItems.orderBy(orderBy, orderAsc);
    }
    if (top) {
      personItems = personItems.top(top);
    }

    return personItems.get();
  }

  private _fixupItem(item: ISharePointItem) {
    // for lookup fields, make sure "FooStringId" matches the value of "FooId" so that updates don't get confused.
    for (var key in item) {
      if (key.length >= 9 && key.substring(key.length - 8, key.length) == "StringId") {
        if (item[key.substring(0, key.length - 8) + "Id"] != null) {
          item[key] = item[key.substring(0, key.length - 8) + "Id"].toString();
        }
        else {
          item[key] = null;
        }
      }
    }
  }

  private _updatePersonItem(item: IPerson): Promise<IItemUpdateResult> {
    return sp.web
      .lists.getByTitle('Contacts')
      .items.getById(item.Id).update(item, '*', this._selectedPersonList.ListItemEntityTypeFullName);
  }

  public addPersonItem(newPerson: IPerson): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve: (people: IPerson[]) => void, reject: (error: any) => void): void => {
      this
        ._addPersonItem(newPerson)
        .then((): Promise<IPerson[]> => {
          return this._getPersonItems(undefined, 'Created', false, 1);
        })
        .then((people: IPerson[]): void => {
          this._onPersonAdded.dispatch(this, newPerson);
          resolve(people);
        });
    });
  }

  public notifyPersonChanged(person: IPerson) {
    this._onPersonChanged.dispatch(this, person);
  }

  public readUsersByIds(ids: number[]): Promise<ISPUser[]> {
    var query = "";

    for (var id of ids) {
      if (query.length > 0) {
        query += " or ";
      }

      query += "Id eq " + id;
    }

    return this._getUsers(query);
  }

  public readUsersByUserName(userName: string): Promise<ISPUser[]> {
    return this._getUsers(`substringof('${userName}', Name)`);
  }

  public readUsersBySearch(search: string): Promise<ISPUser[]> {
    return this._getUsers("substringof('" + search + "', Title)");
  }

  public readPersonItemsBySearch(search: string): Promise<IPerson[]> {
    return this._getPersonItems("substringof('" + search + "', Full_x0020_Name)");
  }

  public readPersonItems(): Promise<IPerson[]> {
    return this._getPersonItems(null);
  }

  public readPersonItemsByOrganizationId(organizationId: number): Promise<IPerson[]> {
    return this._getPersonItems("OrganizationId eq " + organizationId);
  }

  public readPersonItemsByIds(ids: number[]): Promise<IPerson[]> {
    var searchQuery = "";

    for (var id of ids) {
      if (searchQuery.length > 0) {
        searchQuery += " or ";
      }

      searchQuery += "Id eq " + id.toString();
    }

    return this._getPersonItems(searchQuery);
  }

  public get onPersonAdded(): IEvent<ICrmDataProvider, IPerson> {
    return this._onPersonAdded.asEvent();
  }

  public get onPersonChanged(): IEvent<ICrmDataProvider, IPerson> {
    return this._onPersonChanged.asEvent();
  }

  public get onPersonRemoved(): IEvent<ICrmDataProvider, IPerson> {
    return this._onPersonRemoved.asEvent();
  }

  public updatePersonItem(itemUpdated: IPerson): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve: (people: IPerson[]) => void, reject: (error: any) => void): void => {
      this
        ._updatePersonItem(itemUpdated)
        .then((): Promise<IPerson[]> => {
          return this._getPersonItems(undefined, 'Modified', false, 1);
        })
        .then((people: IPerson[]): void => {
          resolve(people);
        });
    });
  }

  public deletePersonItem(itemDeleted: IPerson): Promise<IPerson[]> {
    return this.readPersonItems();
  }

  public get onOrganizationAdded(): IEvent<ICrmDataProvider, IOrganization> {
    return this._onOrganizationAdded.asEvent();
  }

  public get onOrganizationChanged(): IEvent<ICrmDataProvider, IOrganization> {
    return this._onOrganizationChanged.asEvent();
  }

  public get onOrganizationRemoved(): IEvent<ICrmDataProvider, IOrganization> {
    return this._onOrganizationRemoved.asEvent();
  }

  public get onTagAdded(): IEvent<ICrmDataProvider, ITag> {
    return this._onTagAdded.asEvent();
  }

  public get onTagChanged(): IEvent<ICrmDataProvider, ITag> {
    return this._onTagChanged.asEvent();
  }

  public get onTagRemoved(): IEvent<ICrmDataProvider, ITag> {
    return this._onTagRemoved.asEvent();
  }

  private _addTagItem(tag: ITag): Promise<IItemAddResult> {
    return sp.web
      .lists.getByTitle('Tags')
      .items.add(tag, this.selectedTagList.ListItemEntityTypeFullName);
  }

  public init(): Promise<void> {
    return this._loadListData();
  }

  private _loadListData(): Promise<void> {
    const orgListDataPromise = sp.web
      .lists.getByTitle('Organizations').select('Id').get()
      .then((list: IListInfo): void => {
        this._selectedOrganizationList.Id = list.Id;
      }, _ => {
        this.pushError("The Organization list was not found.", DataProviderErrorCodes.OrganizationListDoesNotExist);
      });

    const tagsListDataPromise = sp.web
      .lists.getByTitle('Tags').select('Id').get()
      .then((list: IListInfo): void => {
        this._selectedTagList.Id = list.Id;
      });

    const meUserListDataPromise = sp.web.siteUserInfoList
      .items.filter(`substringof('${this.meUserLoginName}', Name)`).get()
      .then(items => {
        if (items.length > 0) {
          this.meUser = items[0];
        }
      });

    const orgListFieldDataPromise = sp.web
      .lists.getByTitle('Organizations')
      .fields
      .filter("Hidden eq false and FieldTypeKind ne 12 and InternalName ne 'AppEditor' and InternalName ne 'AppAuthor'")
      .select('ID', 'InternalName', 'Title', 'FieldTypeKind', 'Choices', 'RichText', 'AllowMultipleValues', 'MaxLength', 'LookupList')
      .get()
      .then((fields: IFieldInfo[]): void => {
        this._organizationFieldListSelect = "?$select=";

        for (let listField of fields) {
          this._organizationFieldListSelect += listField.InternalName + ", ";
        }

        this._organizationFieldListSelect = this._organizationFieldListSelect.substring(0, this._organizationFieldListSelect.length - 2);

        this._selectedOrganizationList.Fields = (fields as any) as ISPField[];
      });

    const personListFieldDataPromise = sp.web
      .lists.getByTitle('Contacts')
      .fields
      .filter("Hidden eq false and FieldTypeKind ne 12 and InternalName ne 'AppEditor' and InternalName ne 'AppAuthor'")
      .select('ID', 'InternalName', 'Title', 'FieldTypeKind', 'Choices', 'RichText', 'AllowMultipleValues', 'MaxLength', 'LookupList')
      .get()
      .then((fields: IFieldInfo[]): void => {
        this._personFieldListSelect = "?$select=";

        for (let listField of fields) {
          this._personFieldListSelect += listField.InternalName + ", ";
        }

        this._personFieldListSelect = this._personFieldListSelect.substring(0, this._personFieldListSelect.length - 2);

        this._selectedPersonList.Fields = (fields as any) as ISPField[];
      });

    const promises: Promise<void>[] = [
      orgListDataPromise,
      tagsListDataPromise,
      orgListFieldDataPromise,
      meUserListDataPromise,
      personListFieldDataPromise
    ];

    return Promise
      .all(promises)
      .then((): void => {
        this.validate();
      });
  }

  private _getOrganizationItems(query: string, orderBy: string, orderAsc?: boolean): Promise<IOrganizationSet> {
    let organizationItems: IItems = sp.web
      .lists.getByTitle('Organizations')
      .items
      .select('Id', 'Title');

    if (query) {
      organizationItems = organizationItems.filter(query);
    }
    if (orderBy) {
      organizationItems = organizationItems.orderBy(orderBy, orderAsc);
    }

    return organizationItems
      .get()
      .then((organizations: IOrganization[]) => {
        let orgSet = this._ensureOrganizationSet(query + "|" + orderBy);

        this.notifyOrganizationsChanged(organizations, orgSet);

        return orgSet;
      })
      .catch(_ => {
        this.pushError("Couldn't retrieve lists for the app.", DataProviderErrorCodes.Unknown);
        return null;
      });
  }

  private _updateOrganizationItem(item: IOrganization): Promise<IItemUpdateResult> {
    return sp.web
      .lists.getByTitle('Organizations')
      .items.getById(item.Id)
      .update(item, '*', this._selectedOrganizationList.ListItemEntityTypeFullName);
  }

  public addOrganizationItem(newOrganization: IOrganization): Promise<IOrganizationSet> {
    this._fixupItem(newOrganization);

    return new Promise<IOrganizationSet>((resolve: (organizationSet: IOrganizationSet) => void, reject: (error: any) => void): void => {
      this
        ._addOrganizationItem(newOrganization)
        .then((): Promise<IOrganizationSet> => {
          return this._getOrganizationItems(null, 'Created', false);
        })
        .then((organizationSet: OrganizationSet): void => {
          resolve(organizationSet);
        }, (err: any): void => {
          reject(err);
        });
    });
  }

  public notifyOrganizationChanged(person: IOrganization) {
    this._onOrganizationChanged.dispatch(this, person);
  }

  public readOrganizationItemsByView(view: ISPView): Promise<IOrganizationSet> {

    var query = "";

    if (view.query != null) {
      query = view.query.getOdataQuery(this.selectedOrganizationList);
    }

    return this._getOrganizationItems(query, null);
  }

  public readOrganizationItemsByPriority(priority: number): Promise<IOrganizationSet> {
    if (priority > 20) {
      return this._getOrganizationItems("Organizational_x0020_Priority gt " + priority + " or Organizational_x0020_Priority eq null", null);
    }
    else {
      return this._getOrganizationItems("Organizational_x0020_Priority eq " + priority, null);
    }
  }

  public readOrganizationItemsBySearch(search: string, tagItemIds: number[]): Promise<IOrganizationSet> {
    var tagItemQuery = "";
    var searchQuery = "";

    if (tagItemIds != null) {
      for (var tagItemId of tagItemIds) {
        tagItemQuery += " or Tags eq " + tagItemId;
      }
    }

    if (search.length >= 3) {
      searchQuery = "substringof('" + search + "', Title)";
    }

    if (tagItemQuery.length > 0 && searchQuery.length == 0) {
      tagItemQuery = tagItemQuery.substring(4, tagItemQuery.length);
    }

    return this._getOrganizationItems(searchQuery + tagItemQuery, null);
  }

  public readOrganizationItems(): Promise<IOrganizationSet> {
    return this._getOrganizationItems(null, null);
  }

  public readOrganizationItemsByIds(ids: number[]): Promise<IOrganizationSet> {
    var searchQuery = "";

    for (var id of ids) {
      if (searchQuery.length > 0) {
        searchQuery += " or ";
      }

      searchQuery += "Id eq " + id.toString();
    }

    return this._getOrganizationItems(searchQuery, null);
  }

  public readRecentOrganizationItems(): Promise<IOrganizationSet> {
    return this._getOrganizationItems(null, "Modified", false);
  }

  public readMyOrganizationItems(): Promise<IOrganizationSet> {
    return this.readOrganizationItems();
  }

  public updateOrganizationItem(itemUpdated: IOrganization): Promise<IOrganizationSet> {
    return new Promise<IOrganizationSet>((resolve: (organizationSet: IOrganizationSet) => void, reject: (error: any) => void): void => {
      this
        ._updateOrganizationItem(itemUpdated)
        .then((): Promise<IOrganizationSet> => {
          return this._getOrganizationItems(null, "Modified", false);
        })
        .then((organizationSet: IOrganizationSet): void => {
          resolve(organizationSet);
        }, (err: any): void => {
          reject(err);
        });
    });
  }

  public deleteOrganizationItem(itemDeleted: IOrganization): Promise<IOrganizationSet> {
    return this.readOrganizationItems();
  }

  private _getTagItems(query: string, orderBy: string, orderAsc?: boolean): Promise<ITagSet> {
    return sp.web
      .lists.getByTitle('Tags')
      .items
      .filter(query)
      .orderBy(orderBy, orderAsc)
      .select('Id', 'Title', 'Description')
      .get()
      .then((tags: ITag[]) => {
        let tagSet = this._ensureTagSet(query + "|" + orderBy);

        this.notifyTagsChanged(tags, tagSet);

        return tagSet;
      });
  }

  private _updateTagItem(item: ITag): Promise<IItemUpdateResult> {
    return sp.web
      .lists.getByTitle('Organizations')
      .items.getById(item.Id)
      .update(item, this._selectedTagList.ListItemEntityTypeFullName);
  }

  private _addOrganizationItem(organization: IOrganization): Promise<IItemAddResult> {
    return sp.web
      .lists.getByTitle('Organizations')
      .items.add(organization, this.selectedOrganizationList.ListItemEntityTypeFullName);
  }

  public addTagItem(newTag: ITag): Promise<ITagSet> {
    return new Promise<ITagSet>((resolve: (tagItem: ITagSet) => void, reject: (error: any) => void): void => {
      this
        ._addTagItem(newTag)
        .then((): Promise<ITagSet> => {
          return this._getTagItems(null, "Created", false);
        })
        .then((tagSet: ITagSet): void => {
          resolve(tagSet);
        }, (err: any): void => {
          reject(err);
        });
    });
  }

  public notifyTagChanged(person: ITag) {
    this._onTagChanged.dispatch(this, person);
  }

  public readTagItemsBySearch(search: string): Promise<ITagSet> {
    return this._getTagItems("substringof('" + search + "', Title)", null);
  }

  public readTagItems(): Promise<ITagSet> {
    return this._getTagItems(null, null);
  }

  public readTagItemsByIds(ids: number[]): Promise<ITagSet> {
    var searchQuery = "";

    for (var id of ids) {
      if (searchQuery.length > 0) {
        searchQuery += " or ";
      }

      searchQuery += "Id eq " + id.toString();
    }

    return this._getTagItems(searchQuery, null);
  }

  public readRecentTagItems(): Promise<ITagSet> {
    return this._getTagItems(null, "Modified", false);
  }

  public readMyTagItems(): Promise<ITagSet> {
    return this.readTagItems();
  }

  public updateTagItem(itemUpdated: ITag): Promise<ITagSet> {
    return new Promise<ITagSet>((resolve: (tagSet: ITagSet) => void, reject: (error: any) => void): void => {
      this
        ._updateTagItem(itemUpdated)
        .then((): Promise<ITagSet> => {
          return this._getTagItems(null, "Modified", false);
        })
        .then((tagSet: ITagSet): void => {
          resolve(tagSet);
        }, (err: any): void => {
          reject(err);
        });
    });
  }

  public deleteTagItem(itemDeleted: ITag): Promise<ITagSet> {
    return this.readTagItems();
  }
}
