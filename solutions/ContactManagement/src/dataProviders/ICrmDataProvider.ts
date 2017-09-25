// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ISPList } from '../data/ISPList';
import { ISharePointDataProvider } from '../data/ISharePointDataProvider';
import { IPerson } from '../data/IPerson';

import { IOrganization } from '../data/IOrganization';

import { ITag } from '../data/ITag';

import DataError from './DataError';

import { IOrganizationSet } from './IOrganizationSet';
import { ITagSet } from './ITagSet';
import { ISPView } from '../data/ISPView';

import { ISPUser } from '../data/ISPUser';

import { IEvent } from '../utilities/Events';

export interface ICrmDataProvider extends ISharePointDataProvider {
  selectedPersonList: ISPList;
  selectedOrganizationList: ISPList;
  selectedTagList: ISPList;
  
  defaultPersonList: ISPList;
  defaultOrganizationList: ISPList;
  defaultTagList: ISPList;
  
  meUser : ISPUser;

  init() : Promise<void>;

  updateAll(): Promise<boolean>;

  getErrors() : DataError[];

  nextNewId() : number;
  notifyPersonChanged(person : IPerson);
  
  createPersonItem(lastName: string, firstName: string, organization: string): Promise<IPerson[]>;
  addPersonItem(newPerson : IPerson): Promise<IPerson[]>;

  readPersonItemsBySearch(search : string): Promise<IPerson[]>;
  readPersonItems(): Promise<IPerson[]>;
  readPersonItemsByOrganizationId(organizationId : number): Promise<IPerson[]>;
  readPersonItemsByIds(personId : number[]): Promise<IPerson[]>;
  updatePersonItem(itemUpdated: IPerson): Promise<IPerson[]>;
  deletePersonItem(itemDeleted: IPerson): Promise<IPerson[]>;

  onPersonAdded : IEvent<ICrmDataProvider, IPerson>;
  onPersonChanged : IEvent<ICrmDataProvider, IPerson>;
  onPersonRemoved : IEvent<ICrmDataProvider, IPerson>;
  
  notifyTagChanged(tag : ITag);
  notifyTagChanged(tag : ITag);
  notifyTagsChanged(updates : ITag[], sourceSet? : ITagSet);
  
  createTagItem(name: string, type: string): Promise<ITagSet>;
  addTagItem(newTag : ITag): Promise<ITagSet>;
  
  readTagItemsBySearch(search : string): Promise<ITagSet>;
  readTagItems(): Promise<ITagSet>;
  readRecentTagItems(): Promise<ITagSet>;
  readMyTagItems(): Promise<ITagSet>;
  readTagItemsByIds(id : number[]): Promise<ITagSet>;
  updateTagItem(itemUpdated: ITag): Promise<ITagSet>;
  deleteTagItem(itemDeleted: ITag): Promise<ITagSet>;
  
  onTagAdded : IEvent<ICrmDataProvider, ITag>;
  onTagChanged : IEvent<ICrmDataProvider, ITag>;
  onTagRemoved : IEvent<ICrmDataProvider, ITag>;
  
  notifyOrganizationChanged(organization : IOrganization);
  notifyOrganizationsChanged(updates : IOrganization[], sourceSet? : IOrganizationSet);
  
  createOrganizationItem(name: string, type: string): Promise<IOrganizationSet>;
  addOrganizationItem(newOrganization : IOrganization): Promise<IOrganizationSet>;
  
  readOrganizationItemsByPriority(priority : number): Promise<IOrganizationSet>;
  readOrganizationItemsBySearch(search : string, tagItems : number[]): Promise<IOrganizationSet>;
  readOrganizationItemsByView(view : ISPView): Promise<IOrganizationSet>;
  readOrganizationItems(): Promise<IOrganizationSet>;
  readRecentOrganizationItems(): Promise<IOrganizationSet>;
  readMyOrganizationItems(): Promise<IOrganizationSet>;
  readOrganizationItemsByIds(id : number[]): Promise<IOrganizationSet>;
  updateOrganizationItem(itemUpdated: IOrganization): Promise<IOrganizationSet>;
  deleteOrganizationItem(itemDeleted: IOrganization): Promise<IOrganizationSet>;
  
  onOrganizationAdded : IEvent<ICrmDataProvider, IOrganization>;
  onOrganizationChanged : IEvent<ICrmDataProvider, IOrganization>;
  onOrganizationRemoved : IEvent<ICrmDataProvider, IOrganization>;
}
