// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as lodash from '@microsoft/sp-lodash-subset';

import { ICrmDataProvider } from './ICrmDataProvider';

import { ISPUser } from '../data/ISPUser';

import { IPerson } from '../data/IPerson';
import { IOrganization } from '../data/IOrganization';
import { ITag } from '../data/ITag';
import { ISPView } from '../data/ISPView';

import { IOrganizationSet } from './IOrganizationSet';

import OrganizationSet from './OrganizationSet';

import { ITagSet } from './ITagSet';

import TagSet from './TagSet';

import { BaseCrmDataProvider } from './BaseCrmDataProvider';

import Utility from '../utilities/Utility';

export default class MockCrmDataProvider extends BaseCrmDataProvider implements ICrmDataProvider {
  private _maxNumberOfPersons: number;

  private _usersStore: { [listTitle: string]: ISPUser[] };
  private _personItemsStore: { [listTitle: string]: IPerson[] };
  private _organizationItemsStore: { [listTitle: string]: IOrganization[] };
  private _tagItemsStore: { [listTitle: string]: ITag[] };

  constructor() {
    super();

    this._idCounter = 0;

    // generate a healthy amount of mock data
    let orgs : IOrganization[] = new Array();

    for (let i=0; i< 10; i++)
    {
      orgs.push(this._generateOrganizationItem('Contoso.' + i + '.' + Utility.generateRandomId(), 'Alpha'));
    }

    for (let i=0; i< 10; i++)
    {
      orgs.push(this._generateTagItem('Contoso.' + i + '.' + Utility.generateRandomId()));
    }

    orgs.push(this._generateOrganizationItem('Fabrikam', 'Bravo'));
    orgs.push(this._generateOrganizationItem('VanArsdel Ltd', 'Bravo'));
    
    let people: IPerson[] = new Array();
    
    for (let i=0; i< 20; i++)
    {
      let org : IOrganization = null;

      if (i % 20 > 0)
      {
        org = orgs[i % 40];
      }

      let orgId = org ? org.Id : null;

      people.push(this._generatePersonItem('John.' + i + '.' + Utility.generateRandomId(), 'Doe.' + i + '.' + Utility.generateRandomId(), 'Contoso' + (orgId ?  orgId : 'none'), orgId));
    }

    let tags: ITag[] = new Array();

    tags.push(this._generateTagItem("tagA"));
    tags.push(this._generateTagItem("tagB"));
    
    for (let i=0; i< 20; i++)
    {
      let tag : ITag = null;

      if (i % 20 > 0)
      {
        tag = tags[i % 40];
      }

      tags.push(this._generateTagItem('tag' + i + '.' + Utility.generateRandomId()));
    }


    let users: ISPUser[] = new Array();
    
    for (let i=0; i< 20; i++)
    {
      users.push(this._generateUserItem('Sarah.' + i + '.' + Utility.generateRandomId(), 'Roberts.' + i + '.' + Utility.generateRandomId(), 'sarah' + Utility.generateRandomId() + "@contoso.com"));
    }

    this._organizationItemsStore = {
      'Organizations': orgs
    };

    this._personItemsStore = {
      'Contacts': people
    };

    this._tagItemsStore = {
      'Tags': tags
    };
    
    this._usersStore = {
      'Users': users
    };

  }
  
  public updateAll(): Promise<boolean> {    
    return new Promise<boolean>( (resolve) => { resolve(true); });
  }

  public addPersonItem(newPerson : IPerson) : Promise<IPerson[]> {
    this._personItemsStore[this._selectedPersonList.Title] =
      this._personItemsStore[this._selectedPersonList.Title].concat(newPerson);

    this._onPersonAdded.dispatch(this, newPerson);

    return new Promise<IPerson[]>((resolve) => {
      setTimeout(() => {
        resolve([newPerson]);
      }, 500);
    });
  }

  public readPersonItems(): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve) => {
      setTimeout(() => resolve(this._personItemsStore[this._selectedPersonList.Title]), 500);
    });
  }

  public readUsersByIds(ids: number[]): Promise<ISPUser[]> {
    const items: ISPUser[] =
      this._usersStore["Users"].slice(0, this._maxNumberOfPersons);

    const filteredItems : ISPUser[] = new Array();

    for (let item of items)
    {
      if (ids != null)
      {
        for (let id of ids)
        {
          if (id == item.Id)
          {
            filteredItems.push(item);
          }
        }
      }
    }

    return new Promise<ISPUser[]>((resolve) => {
      setTimeout(() => resolve(filteredItems), 500);
    });
  }

  public readUsersByUserName(userName : string): Promise<ISPUser[]> {
    const items: ISPUser[] = this._usersStore["Users"].slice(0, this._maxNumberOfPersons);

    const filteredItems : ISPUser[] = new Array();

    for (let item of items)
    {
      if (item.Name == userName || item.EMail == userName)
      {
        filteredItems.push(item);
      }
    }

    return new Promise<ISPUser[]>((resolve) => {
      setTimeout(() => resolve(filteredItems), 500);
    });
  }

  public readUsersBySearch(search : string): Promise<ISPUser[]> {
    const items: ISPUser[] =
      this._usersStore["Users"].slice(0, this._maxNumberOfPersons);

    const filteredItems : ISPUser[] = new Array();
    search = search.toLowerCase();

    for (let item of items)
    {
      var searchBody = item.Title + "|" + item.EMail;

      searchBody = searchBody.toLowerCase();

      if (searchBody.indexOf(search) >= 0)
      {
        filteredItems.push(item);
      }
    }

    return new Promise<ISPUser[]>((resolve) => {
      setTimeout(() => resolve(filteredItems), 500);
    });
  }
  
  public readPersonItemsBySearch(search : string): Promise<IPerson[]> {
    const items: IPerson[] =
      this._personItemsStore[this._selectedPersonList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : IPerson[] = new Array();
    search = search.toLowerCase();

    for (let item of items)
    {
      var searchBody = item.Title + "|" + item.FirstName + "|" + item.Company;

      searchBody = searchBody.toLowerCase();

      if (searchBody.indexOf(search) >= 0)
      {
        filteredItems.push(item);
      }
    }

    return new Promise<IPerson[]>((resolve) => {
      setTimeout(() => resolve(filteredItems), 500);
    });
  }

  public readPersonItemsByIds(ids : number[]): Promise<IPerson[]> {
    const items: IPerson[] =
      this._personItemsStore[this._selectedPersonList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : IPerson[] = new Array();

    for (let item of items)
    {
      for (var id of ids)
      {
        if (item.Id == id)
        {
          filteredItems.push(item);
        }
      }
    }

    return new Promise<IPerson[]>((resolve) => {
      setTimeout(() => resolve(filteredItems), 500);
    });
  }

  public readPersonItemsByOrganizationId(organizationId : number): Promise<IPerson[]> {
    const items: IPerson[] =
      this._personItemsStore[this._selectedPersonList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : IPerson[] = new Array();

    for (let item of items)
    {
      if (item.OrganizationId == organizationId)
      {
        filteredItems.push(item);
      }
    }

    return new Promise<IPerson[]>((resolve) => {
      setTimeout(() => resolve(filteredItems), 500);
    });
  }

  public updatePersonItem(itemUpdated: IPerson): Promise<IPerson[]> {
    const index: number =
      lodash.findIndex(
        this._personItemsStore[this._selectedPersonList.Title],
        (item: IPerson) => item.Id === itemUpdated.Id
      );

    if (index !== -1) {
      this._personItemsStore[this._selectedPersonList.Title][index] = itemUpdated;

      return this.readPersonItems();
    } else {
      return Promise.reject(new Error(`Item to update doesn't exist.`));
    }
  }

  public deletePersonItem(itemDeleted: IPerson): Promise<IPerson[]> {
    this._personItemsStore[this._selectedPersonList.Title] =
      this._personItemsStore[this._selectedPersonList.Title].filter((item: IPerson) => item.Id !== itemDeleted.Id);

    return this.readPersonItems();
  }

  private _generatePersonItem(firstName: string, lastName: string, company: string, organizationId? : number): IPerson {
    return {
      Id: this._idCounter--,
      Company: company,
      FirstName: firstName,
      Title: lastName,
      OrganizationId : organizationId,
      AuthorId: 1,
      Created: new Date(),
      Modified: new Date(),
      EditorId: 1
    };
  }

  private _generateUserItem(firstName: string, lastName: string, email: string): ISPUser {
    return {
      Id: this._idCounter--,
      EMail: email,
      FirstName: firstName,
      LastName: lastName,
      Title: firstName + " " + lastName,
      AuthorId: 1,
      Created: new Date(),
      Modified: new Date(),
      EditorId: 1
    };
  }

  public addOrganizationItem(newOrganization : IOrganization) : Promise<IOrganizationSet> {
    this._organizationItemsStore[this._selectedOrganizationList.Title] =
      this._organizationItemsStore[this._selectedOrganizationList.Title].concat(newOrganization);

    this._onOrganizationAdded.dispatch(this, newOrganization);

    let ose : OrganizationSet = this._ensureOrganizationSet("NEW" + newOrganization.Id);
    
    ose.apply( [ newOrganization ], true );

    return new Promise<IOrganizationSet>((resolve) => {
      setTimeout(() => resolve(ose), 500);
    });
  }

  public init(): Promise<void>
  {    
    return this._loadListData();
  }
  
  public _loadListData(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  }

  public readOrganizationItems(): Promise<IOrganizationSet> {
    const items: IOrganization[] =
      this._organizationItemsStore[this._selectedOrganizationList.Title].slice(0, this._maxNumberOfPersons);

    return new Promise<IOrganizationSet>((resolve) => {

      let orgSet = this._ensureOrganizationSet("");
      
      this.notifyOrganizationsChanged(items, orgSet);

      setTimeout(() => resolve(orgSet), 500);
    });
  }

  public readRecentOrganizationItems(): Promise<IOrganizationSet>
  {
    return this.readOrganizationItems();
  }

  public readMyOrganizationItems(): Promise<IOrganizationSet>
  {
    return this.readOrganizationItems();
  }

  public readOrganizationItemsByIds(ids : number[]): Promise<IOrganizationSet> {
    const items: IOrganization[] =
      this._organizationItemsStore[this._selectedOrganizationList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : IOrganization[] = new Array();

    for (let item of items)
    {
      for (var id of ids)
      {
        if (item.Id == id)
        {
          filteredItems.push(item);
        }
      }
    }

    return new Promise<IOrganizationSet>((resolve) => {
      var sId = "";

      for (var idA of ids)
      {
        sId += idA + ".";
      }

      let orgSet = this._ensureOrganizationSet(sId);
      
      this.notifyOrganizationsChanged(filteredItems, orgSet);
      
      setTimeout(() => resolve(orgSet), 500);
    });
  }

  public readOrganizationItemsByView(view : ISPView): Promise<IOrganizationSet> {
    const items: IOrganization[] =
      this._organizationItemsStore[this._selectedOrganizationList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : IOrganization[] = new Array();

    for (let item of items)
    {
      if (view.query != null && view.query.matches(item))
      {
        filteredItems.push(item);
      }
    }

    return new Promise<IOrganizationSet>((resolve) => {
      let orgSet = this._ensureOrganizationSet(view.query.getOdataQuery(this.selectedOrganizationList));

      this.notifyOrganizationsChanged(filteredItems, orgSet);
      
      setTimeout(() => resolve(orgSet), 500);
    });
  }

  public readOrganizationItemsByPriority(chosenPriority : number): Promise<IOrganizationSet> {
    const items: IOrganization[] =
      this._organizationItemsStore[this._selectedOrganizationList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : IOrganization[] = new Array();

    for (let item of items)
    {
      var itemPri = item["Organizational_x0020_Priority"];

      if (chosenPriority >= 30 && (itemPri == null || itemPri > 32)) 
      {
        filteredItems.push(item);
      }
      else if (itemPri == chosenPriority)
      {
        filteredItems.push(item);
      }
    }

    return new Promise<IOrganizationSet>((resolve) => {
      let orgSet = this._ensureOrganizationSet("PRIO" + chosenPriority);

      this.notifyOrganizationsChanged(filteredItems, orgSet);
      
      setTimeout(() => resolve(orgSet), 500);
    });
  }

  public readOrganizationItemsBySearch(search : string, tagItems : number[]): Promise<IOrganizationSet> {
    const items: IOrganization[] =
      this._organizationItemsStore[this._selectedOrganizationList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : IOrganization[] = new Array();

    if (search != null && search.length > 3)
    {
      search = search.toLowerCase();

      for (let item of items)
      {
        var searchBody = item.Title;
        searchBody = searchBody.toLowerCase();

        if (searchBody.indexOf(search) >= 0)
        {
          filteredItems.push(item);
        }
      }
    }

    if (tagItems != null && tagItems.length >= 0)
    {      
      for (let item of items)
      {
        var tags = item["TagsId"];

        if (tags != null && tags.length != null && tags.length > 0)
        {
          for (var itemTagId of tags)
          {
            for (var searchTagItemId of tagItems)
            {
              if (itemTagId == searchTagItemId)
              {
                filteredItems.push(item);
              }
            }
          }
        }
      }
    }

    return new Promise<IOrganizationSet>((resolve) => {
      let orgSet = this._ensureOrganizationSet("SEARCH" + search);

      this.notifyOrganizationsChanged(filteredItems, orgSet);
      
      setTimeout(() => resolve(orgSet), 500);
    });
  }

  public updateOrganizationItem(itemUpdated: IOrganization): Promise<IOrganizationSet> {
    const index: number =
      lodash.findIndex(
        this._organizationItemsStore[this._selectedOrganizationList.Title],
        (item: IOrganization) => item.Id === itemUpdated.Id
      );

    if (index !== -1) {
      this._organizationItemsStore[this._selectedOrganizationList.Title][index] = itemUpdated;

      return this.readOrganizationItems();
    } else {
      return Promise.reject(new Error(`Item to update doesn't exist.`));
    }
  }

  public deleteOrganizationItem(itemDeleted: IOrganization): Promise<IOrganizationSet> {
    this._organizationItemsStore[this._selectedOrganizationList.Title] =
      this._organizationItemsStore[this._selectedOrganizationList.Title].filter((item: IOrganization) => item.Id !== itemDeleted.Id);

    return this.readOrganizationItems();
  }

  private _generateOrganizationItem(title: string, type: string): IOrganization {
    return {
      Id: this._idCounter--,
      Title: title,
      AuthorId: 1,
      Created: new Date(),
      Modified: new Date(),
      EditorId: 1
    };
  }

  private _generateTagItem(title: string): ITag {
    return {
      Id: this._idCounter--,
      Title: title,
      AuthorId: 1,
      Created: new Date(),
      Modified: new Date(),
      EditorId: 1
    };
  }
  
  
  public addTagItem(newTag : ITag) : Promise<ITagSet> {
    this._tagItemsStore[this._selectedTagList.Title] =
      this._tagItemsStore[this._selectedTagList.Title].concat(newTag);

    this._onTagAdded.dispatch(this, newTag);

    let ose : TagSet = this._ensureTagSet("NEW" + newTag.Id);
    
    ose.apply( [ newTag ], true );

    return new Promise<ITagSet>((resolve) => {
      setTimeout(() => resolve(ose), 500);
    });
  }

  public readTagItems(): Promise<ITagSet> {
    const items: ITag[] =
      this._tagItemsStore[this._selectedTagList.Title].slice(0, this._maxNumberOfPersons);

    return new Promise<ITagSet>((resolve) => {

      let orgSet = this._ensureTagSet("");
      
      this.notifyTagsChanged(items, orgSet);

      setTimeout(() => resolve(orgSet), 500);
    });
  }

  public readRecentTagItems(): Promise<ITagSet>
  {
    return this.readTagItems();
  }

  public readMyTagItems(): Promise<ITagSet>
  {
    return this.readTagItems();
  }

  public readTagItemsByIds(ids : number[]): Promise<ITagSet> {
    const items: ITag[] =
      this._tagItemsStore[this._selectedTagList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : ITag[] = new Array();

    for (let item of items)
    {
      for (var id of ids)
      {
        if (item.Id == id)
        {
          filteredItems.push(item);
        }
      }
    }

    return new Promise<ITagSet>((resolve) => {
      let tagSet = this._ensureTagSet(id + "");
      
      this.notifyTagsChanged(filteredItems, tagSet);
      
      setTimeout(() => resolve(tagSet), 500);
    });
  }

  public readTagItemsBySearch(search : string): Promise<ITagSet> {
    const items: ITag[] = this._tagItemsStore[this._selectedTagList.Title].slice(0, this._maxNumberOfPersons);

    const filteredItems : ITag[] = new Array();

    search = search.toLowerCase();

    for (let item of items)
    {
      var searchBody = item.Title;
      searchBody = searchBody.toLowerCase();

      if (searchBody.indexOf(search) >= 0)
      {
        filteredItems.push(item);
      }
    }

    return new Promise<ITagSet>((resolve) => {
      let orgSet = this._ensureTagSet("SEARCH" + search);

      this.notifyTagsChanged(filteredItems, orgSet);
      
      setTimeout(() => resolve(orgSet), 500);
    });
  }

  public updateTagItem(itemUpdated: ITag): Promise<ITagSet> {
    const index: number =
      lodash.findIndex(
        this._tagItemsStore[this._selectedTagList.Title],
        (item: ITag) => item.Id === itemUpdated.Id
      );

    if (index !== -1) {
      this._tagItemsStore[this._selectedTagList.Title][index] = itemUpdated;

      return this.readTagItems();
    } else {
      return Promise.reject(new Error(`Item to update doesn't exist.`));
    }
  }

  public deleteTagItem(itemDeleted: ITag): Promise<ITagSet>
  {
    this._tagItemsStore[this._selectedTagList.Title] =
      this._tagItemsStore[this._selectedTagList.Title].filter((item: ITag) => item.Id !== itemDeleted.Id);

    return this.readTagItems();
  }
}
