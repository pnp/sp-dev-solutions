// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ICrmDataProvider } from './ICrmDataProvider';
import UrlUtility from '../utilities/UrlUtility';

import { ISPField } from '../data/ISPField';
import { ISPView } from '../data/ISPView';
import { ISPList } from '../data/ISPList';
import { ISPUser } from '../data/ISPUser';
import { ISharePointItem } from '../data/ISharePointItem';

import { IPerson } from '../data/IPerson';

import { IOrganization } from '../data/IOrganization';
import { IOrganizationSet } from './IOrganizationSet';
import OrganizationSet from './OrganizationSet';

import { DataProviderErrorCodes } from './DataError';

import { ITag } from '../data/ITag';
import { ITagSet } from './ITagSet';
import TagSet from './TagSet';

import { BaseCrmDataProvider } from './BaseCrmDataProvider';

import { IEvent } from '../utilities/Events';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientBatch, ISPHttpClientOptions  } from '@microsoft/sp-http';


export default class SharePointCrmDataProvider extends BaseCrmDataProvider implements ICrmDataProvider {
  private _httpClient: SPHttpClient;
  private _personListUrl: string;
  private _organizationListUrl: string;
  private _tagListUrl: string;
  private _usersListUrl: string;
  private _webUrl: string;
  private _meUserLoginName : string;

  private _personFieldListSelect = "$select=Id,Title,FirstName,Company,OrganizationId";
  private _organizationFieldListSelect = "$select=Id,Title";
  private _tagFieldListSelect = "$select=Id,Title,Description";

  public get httpClient() : SPHttpClient { return this._httpClient; }
  public set httpClient(value : SPHttpClient) { this._httpClient = value; }

  public get meUserLoginName() : string { return this.webUrl; }
  public set meUserLoginName(newValue : string) 
  {
    this._meUserLoginName = newValue;
  }

  public get webUrl() : string { return this.webUrl; }
  public set webUrl(newValue : string) 
  {
    this._webUrl = newValue;
    this._personListUrl = UrlUtility.ensureUrlEndsWithSlash(this._webUrl) + "_api/lists/getbytitle('Contacts')";
    this._organizationListUrl = UrlUtility.ensureUrlEndsWithSlash(this._webUrl) + "_api/lists/getbytitle('Organizations')";
    this._tagListUrl = UrlUtility.ensureUrlEndsWithSlash(this._webUrl) + "_api/lists/getbytitle('Tags')";
    this._usersListUrl = UrlUtility.ensureUrlEndsWithSlash(this._webUrl) + "_api/Web/SiteUserInfoList";
  }

  constructor() {
    super();

    this._idCounter = 0;

    this._webUrl = null;
    this._personListUrl = null;
    this._organizationListUrl = null;
    this._tagListUrl = null;
    this._usersListUrl = null;
  }

  public updateAll(): Promise<boolean> {    
    return new Promise<boolean>( (resolve) => { resolve(true); });
  }

  private _resolvePersonBatch(batch: SPHttpClientBatch, promises: Promise<{}>[]): Promise<IPerson[]> {
    return batch.execute()
      .then(() => {
          return Promise.all(promises).then( (values) => {
            return values[values.length - 1];
          }
        );
      }
    );
  }

  /**
   * Batch the request to create item in the SharePoint list.
   */
  private _addPersonItem(batch: SPHttpClientBatch, person : IPerson): Promise<SPHttpClientResponse> {
    person["@data.type"] = "$" + this._selectedPersonList.ListItemEntityTypeFullName;
    person["Id"] = 0;

    return batch.post(
      this._personListUrl + "/items",
      SPHttpClientBatch.configurations.v1,
      { 
        headers: this._getStandardHttpClientOptions().headers,
        body: JSON.stringify(person) }
    );
  }

  private _getStandardHttpClientHeaders() : Headers
  {
    var headers : Headers = new Headers(
      {
        "X-ClientTag": "SPCommunityCrmWebPart"
      });

    return headers;
  }

  private _getStandardHttpClientOptions() : ISPHttpClientOptions
  {
    return {
            headers: this._getStandardHttpClientHeaders()
        };
  }

  private _getUsers(query : string, requester: SPHttpClient): Promise<ISPUser[]> {
    let queryString: string = `?`;
        
    if (query != null && query != "")
    {
      queryString += "&$filter=" + query;
    }

    const queryUrl: string = this._usersListUrl + "/items" + queryString;

    return requester.get(queryUrl, SPHttpClient.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ISPUser[] }) => {
        return json.value.map((user: ISPUser) => {
          return user;
        });
      });
  }

  private _getPersonItems(query : string, requester: SPHttpClient): Promise<IPerson[]> {
    let queryString: string = `?` + this._personFieldListSelect;
        
    if (query != null && query != "")
    {
      queryString += "&$filter=" + query;
    }

    const queryUrl: string = this._personListUrl + "/items" + queryString;

    return requester.get(queryUrl, SPHttpClient.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: IPerson[] }) => {
        return json.value.map((person: IPerson) => {
          return person;
        });
      });
  }

  private _getPersonItemsBatched(query : string, requester: SPHttpClientBatch): Promise<IPerson[]> {
    let queryString: string = '?' + this._personFieldListSelect;
        
    if (query != null && query != "")
    {
      queryString += "&" + query;
    }

    const queryUrl: string = this._personListUrl + "/items" + queryString;

    return requester.get(queryUrl, SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: IPerson[] }) => {
        return json.value.map((person: IPerson) => {
          return person;
        });
      });
  }

/*
 private _getUsersBatched(query : string, requester: SPHttpClientBatch): Promise<ISPUser[]> {
    let queryString: string = '?';
        
    if (query != null && query != "")
    {
      queryString += "&" + query;
    }

    const queryUrl: string = this._usersListUrl + "/items" + queryString;

    return requester.get(queryUrl, SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ISPUser[] }) => {
        return json.value.map((user : ISPUser) => {
          return user;
        });
      });
 }*/

  private _fixupItem(item: ISharePointItem)
  {
    // for lookup fields, make sure "FooStringId" matches the value of "FooId" so that updates don't get confused.
    for (var key in item)
    {
      if (key.length >= 9 && key.substring(key.length - 8, key.length) == "StringId")
      {
        if (item[key.substring(0, key.length - 8) + "Id"] != null)
        {
          item[key] = item[key.substring(0, key.length - 8) + "Id"].toString();
        }
        else
        {
          item[key] = null;
        }
      }
    }
  }

  private _updatePersonItem(batch: SPHttpClientBatch, item: IPerson): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._personListUrl + "/items"}(${item.Id})`;

    const headers = this._getStandardHttpClientHeaders();
    headers.append('If-Match', '*');
/*
    const body: {} = {
      '@data.type': `${this._selectedPersonList.ListItemEntityTypeFullName}`,
      'FirstName': item.FirstName,
      'Title': item.Title,
      'Company': item.Company,
      'OrganizationId': item.OrganizationId
    };*/
    
    item["@data.type"] = "$" + this._selectedPersonList.ListItemEntityTypeFullName;

    return batch.fetch(itemUpdatedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        body: JSON.stringify(item),
        headers: headers,
        method: 'PATCH'
      }
    );
  }
/*
  private checkStatus(response: SPHttpClientResponse): Promise<SPHttpClientResponse> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(JSON.stringify(response)));
    }
  }*/

  public addPersonItem(newPerson : IPerson) : Promise<IPerson[]> {
    const batch: SPHttpClientBatch = this._httpClient.beginBatch(this._getStandardHttpClientOptions());

    const batchPromises: Promise<{}>[] = [
      this._addPersonItem(batch, newPerson),
      this._getPersonItemsBatched("$orderby=Created desc&$top=1", batch)
    ];

    return this._resolvePersonBatch(batch, batchPromises).then(
      (people : IPerson[]) =>
      {                  
        this._onPersonAdded.dispatch(this, newPerson);

        return people;
      }
    );
  }

  public notifyPersonChanged(person : IPerson)
  {
    this._onPersonChanged.dispatch(this, person);
  }

  public readUsersByIds(ids : number[]): Promise<ISPUser[]> {
    var query = "";

    for (var id of ids)
    {
      if (query.length > 0)
      {
        query += " or ";
      }

      query += "Id eq " + id;
    }

    return this._getUsers(query, this._httpClient);
  }

  public readUsersByUserName(userName : string): Promise<ISPUser[]> {
    return this._getUsers("UserName eq '" + userName + "'", this._httpClient);
  }

  public readUsersBySearch(search : string): Promise<ISPUser[]> {
    return this._getUsers("substringof('" + search + "', Title)", this._httpClient);
  }

  public readPersonItemsBySearch(search : string): Promise<IPerson[]> {
    return this._getPersonItems("substringof('" + search + "', Full_x0020_Name)", this._httpClient);
  }

  public readPersonItems(): Promise<IPerson[]> {
    return this._getPersonItems(null, this._httpClient);
  }

  public readPersonItemsByOrganizationId(organizationId : number): Promise<IPerson[]> {
    return this._getPersonItems("OrganizationId eq " + organizationId, this._httpClient);
  }

  public readPersonItemsByIds(ids : number[]): Promise<IPerson[]> {
      var searchQuery = "";

    for (var id of ids)
    {
      if (searchQuery.length > 0)
      {
        searchQuery += " or ";
      }

      searchQuery += "Id eq " + id.toString();
    }
 
    return this._getPersonItems(searchQuery, this._httpClient);
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
    const batch: SPHttpClientBatch = this._httpClient.beginBatch(this._getStandardHttpClientOptions());

    const batchPromises: Promise<{}>[] = [
      this._updatePersonItem(batch, itemUpdated),
      this._getPersonItemsBatched(null, batch)
    ];

    return this._resolvePersonBatch(batch, batchPromises);
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

  private _addOrganizationItem(batch: SPHttpClientBatch, organization : IOrganization): Promise<SPHttpClientResponse> {

    organization["@data.type"] = "$" + this.selectedOrganizationList.ListItemEntityTypeFullName;
    organization["Id"] = 0;

    return batch.post(
      this._organizationListUrl + "/items",
      SPHttpClientBatch.configurations.v1,
      { 
        headers: this._getStandardHttpClientOptions().headers,
        body: JSON.stringify(organization) 
      }
    );
  }

    private _addTagItem(batch: SPHttpClientBatch, tag : ITag): Promise<SPHttpClientResponse> {

    tag["@data.type"] = "$" + this.selectedTagList.ListItemEntityTypeFullName;
    tag["Id"] = 0;

    return batch.post(
      this._tagListUrl + "/items",
      SPHttpClientBatch.configurations.v1,
      {
        headers: this._getStandardHttpClientOptions().headers,
         body: JSON.stringify(tag) 
      }
    );
  }
  
  public init(): Promise<void>
  {
    return this._loadListData();
  }
  
  private _loadListData() : Promise<void> {
    const batch: SPHttpClientBatch = this._httpClient.beginBatch(this._getStandardHttpClientOptions());

    let orgListDataPromise = batch.get(this._organizationListUrl, SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      }, (error: any) => { 
        this.pushError("The Organization list was not found.", DataProviderErrorCodes.OrganizationListDoesNotExist); })
      .then((listProto : ISPList) => {
        if (listProto == null)
          {
            this.pushError("The Organization list was not found.", DataProviderErrorCodes.OrganizationListDoesNotExist); 
            return;
          }
        this._selectedOrganizationList.Id = listProto.Id;
      });

    let tagsListDataPromise = batch.get(this._tagListUrl, SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((listProto : ISPList) => {
        this._selectedTagList.Id = listProto.Id.toString();
      });

    let meUserListDataPromise = batch.get(this._usersListUrl + "/items?$filter=UserName eq '" + this._meUserLoginName + "'", SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((users) => {
        if (users.value != null && users.value.length == 1)
        {
          this.meUser = users.value[0];
        }
      });

    let orgListFieldDataPromise = batch.get(this._organizationListUrl + "/fields?$select=ID,InternalName,Title,FieldTypeKind,Choices,RichText,AllowMultipleValues,MaxLength,LookupList&$filter=Hidden eq false and FieldTypeKind ne 12 and InternalName ne 'AppEditor' and InternalName ne 'AppAuthor'", SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ISPField[] }) => {
        let fields = json.value.map((field: ISPField) => {
          return field;
        });

        this._organizationFieldListSelect = "?$select=";
        
        for (let listField of fields)
        {
          this._organizationFieldListSelect += listField.InternalName + ", ";
        }

        this._organizationFieldListSelect = this._organizationFieldListSelect.substring(0, this._organizationFieldListSelect.length - 2);

        this._selectedOrganizationList.Fields = fields;
      });

    let personListFieldDataPromise = batch.get(this._personListUrl + "/fields?$select=ID,InternalName,Title,FieldTypeKind,Choices,RichText,AllowMultipleValues,MaxLength,LookupList&$filter=Hidden eq false and FieldTypeKind ne 12 and InternalName ne 'AppEditor' and InternalName ne 'AppAuthor'", SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ISPField[] }) => {
        let fields = json.value.map((field: ISPField) => {
          return field;
        });

        this._personFieldListSelect = "?$select=";
        
        for (let listField of fields)
        {
          this._personFieldListSelect += listField.InternalName + ", ";
        }

        this._personFieldListSelect = this._personFieldListSelect.substring(0, this._personFieldListSelect.length - 2);

        this._selectedPersonList.Fields = fields;
      });
      
    const batchPromises: Promise<void>[] = [
      orgListDataPromise,
      tagsListDataPromise,
      orgListFieldDataPromise,
      meUserListDataPromise,
      personListFieldDataPromise
    ];

    return batch.execute()
      .then(
        () => Promise.all(batchPromises).then(values => { 
          this.validate();

          return;
        }
      ));
  }

  private _resolveOrganizationBatch(batch: SPHttpClientBatch, promises: Promise<{}>[]): Promise<IOrganizationSet> {
    return batch.execute()
      .then(
        () => Promise.all(promises).then(values => { 
//          let orgSet = this._ensureOrganizationSet("");
      
//          this.notifyOrganizationsChanged(<IOrganization[]> values[values.length - 1], orgSet);

          return <OrganizationSet>values[values.length - 1];
        } )
      
      );
  }

  /**
   * Batch the request to create item in the SharePoint list.
   */
 /* private _createOrganizationItem(batch: SPHttpClientBatch, title: string, type: string): Promise<SPHttpClientResponse> {
    const body: {} = {
      '@data.type': `${this.selectedOrganizationList.ListItemEntityTypeFullName}`,
      'Title': title
      };

    return batch.post(
      this._organizationListUrl + "/items",
      SPHttpClientBatch.configurations.v1,
      { body: JSON.stringify(body) }
    );
  }*/

  private _getOrganizationItems(query : string, orderBy: string, requester: SPHttpClient): Promise<IOrganizationSet> {
    let queryString: string = `?` + this._organizationFieldListSelect;

    if (query != null && query != "")
    {
      queryString += "&$filter=" + query;
    }

    if (orderBy != null && orderBy != "")
    {
      queryString += "&$orderby=" + orderBy;
    }

    const queryUrl: string = this._organizationListUrl + "/items" + queryString;

    return requester.get(queryUrl, SPHttpClient.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      }, (error: any) => {        
        this.pushError("Couldn't retrieve lists for the app.", DataProviderErrorCodes.Unknown);
        })      
      .then((json: { value: IOrganization[] }) => {

        if (json == null || json.value == null)
        {
          this.pushError("Couldn't retrieve lists for the app.", DataProviderErrorCodes.Unknown);
          return null;
        }
        
        let orgs = json.value.map((org: IOrganization) => {
          return org;
        });

        let orgSet = this._ensureOrganizationSet(query + "|" + orderBy);
      
        this.notifyOrganizationsChanged(orgs, orgSet);

        return orgSet;
      });
  }

  private _getOrganizationItemsBatched(query : string, requester: SPHttpClientBatch): Promise<IOrganizationSet> {
    let queryString: string = '?' + this._organizationFieldListSelect;
    
    if (query != null && query != "")
    {
      queryString += "&" + query;
    }
    
    const queryUrl: string = this._organizationListUrl + "/items" +  queryString;

    return requester.get(queryUrl, SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions().headers)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: IOrganization[] }) => {
        let orgs = json.value.map((person: IOrganization) => {
          return person;
        });

        let orgSet = this._ensureOrganizationSet(query);
        this.notifyOrganizationsChanged(orgs, orgSet);

        return orgSet;
      });
  }


  private _updateOrganizationItem(batch: SPHttpClientBatch, item: IOrganization): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._organizationListUrl + "/items"}(${item.Id})`;

    const headers: Headers = this._getStandardHttpClientHeaders();
    headers.append('If-Match', '*');

    item["@data.type"] = "$" + this._selectedOrganizationList.ListItemEntityTypeFullName;
    this._fixupItem(item);

    return batch.fetch(itemUpdatedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        body: JSON.stringify(item),
        headers,
        method: 'PATCH'
      }
    );
  }

  public addOrganizationItem(newOrganization : IOrganization) : Promise<IOrganizationSet> {
    const batch: SPHttpClientBatch = this._httpClient.beginBatch(this._getStandardHttpClientOptions());
    this._fixupItem(newOrganization);

    const batchPromises: Promise<{}>[] = [
      this._addOrganizationItem(batch, newOrganization),
      this._getOrganizationItemsBatched("$orderby=Created desc&$top=1", batch)
    ];

    return this._resolveOrganizationBatch(batch, batchPromises);
  }

  public notifyOrganizationChanged(person : IOrganization)
  {
    this._onOrganizationChanged.dispatch(this, person);
  }
  
  public readOrganizationItemsByView(view : ISPView): Promise<IOrganizationSet> {

    var query = "";

    if (view.query != null)
    {
      query = view.query.getOdataQuery(this.selectedOrganizationList);
    }
    
    return this._getOrganizationItems(query, null, this._httpClient);
  }

  public readOrganizationItemsByPriority(priority : number): Promise<IOrganizationSet> {
    if (priority > 20)
    {
      return this._getOrganizationItems("Organizational_x0020_Priority gt " + priority + " or Organizational_x0020_Priority eq null", null, this._httpClient);
    }
    else
    {
      return this._getOrganizationItems("Organizational_x0020_Priority eq " + priority, null, this._httpClient);
    }
  }

  public readOrganizationItemsBySearch(search : string, tagItemIds : number[]): Promise<IOrganizationSet> {
    var tagItemQuery = "";
    var searchQuery = "";

    if (tagItemIds != null)
    {
        for (var tagItemId of tagItemIds)
        {
          tagItemQuery += " or Tags eq " + tagItemId;        
        }  
    }

    if (search.length >= 3)
    {
      searchQuery = "substringof('" + search + "', Title)";
    }

    if (tagItemQuery.length > 0 && searchQuery.length == 0)
    {
      tagItemQuery = tagItemQuery.substring(4, tagItemQuery.length);
    }

    return this._getOrganizationItems(searchQuery + tagItemQuery, null, this._httpClient);
  }

  public readOrganizationItems(): Promise<IOrganizationSet> {
    return this._getOrganizationItems(null, null, this._httpClient);
  }

  public readOrganizationItemsByIds(ids : number[]): Promise<IOrganizationSet> 
  {
    var searchQuery = ""; 

    for (var id of ids)
    {
      if (searchQuery.length > 0)
      {
        searchQuery += " or ";
      }

      searchQuery += "Id eq " + id.toString();
    }

    return this._getOrganizationItems(searchQuery, null, this._httpClient);
  }
  
  public readRecentOrganizationItems(): Promise<IOrganizationSet>
  {
    return this._getOrganizationItems(null, "Modified desc", this._httpClient);
  }

  public readMyOrganizationItems(): Promise<IOrganizationSet>
  {
    return this.readOrganizationItems();
  }

  public updateOrganizationItem(itemUpdated: IOrganization): Promise<IOrganizationSet> {
    const batch: SPHttpClientBatch = this._httpClient.beginBatch(this._getStandardHttpClientOptions());

    const batchPromises: Promise<{}>[] = [
      this._updateOrganizationItem(batch, itemUpdated),
      this._getOrganizationItemsBatched(null, batch)
    ];

    return this._resolveOrganizationBatch(batch, batchPromises);
  }

  public deleteOrganizationItem(itemDeleted: IOrganization): Promise<IOrganizationSet> {
    return this.readOrganizationItems();
  }
  
  private _resolveTagBatch(batch: SPHttpClientBatch, promises: Promise<{}>[]): Promise<ITagSet> {
    return batch.execute()
      .then(
        () => Promise.all(promises).then(values => { 
//          let orgSet = this._ensureTagSet("");
      
//          this.notifyTagsChanged(<ITag[]> values[values.length - 1], orgSet);

          return <TagSet>values[values.length - 1];
        } )
      
      );
  }

  /**
   * Batch the request to create item in the SharePoint list.
   */
 /* private _createTagItem(batch: SPHttpClientBatch, title: string, type: string): Promise<SPHttpClientResponse> {
    const body: {} = {
      '@data.type': `${this.selectedTagList.ListItemEntityTypeFullName}`,
      'Title': title
      };

    return batch.post(
      this._organizationListUrl + "/items",
      SPHttpClientBatch.configurations.v1,
      { body: JSON.stringify(body) }
    );
  }*/

  private _getTagItems(query : string, orderBy: string, requester: SPHttpClient): Promise<ITagSet> {
    let queryString: string = `?` + this._tagFieldListSelect;

    if (query != null && query != "")
    {
      queryString += "&$filter=" + query;
    }

    if (orderBy != null && orderBy != "")
    {
      queryString += "&$orderby=" + orderBy;
    }

    const queryUrl: string = this._tagListUrl + "/items" + queryString;

    return requester.get(queryUrl, SPHttpClient.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITag[] }) => {

        let tags = json.value.map((tag: ITag) => {
          return tag;
        });

        let tagSet = this._ensureTagSet(query + "|" + orderBy);
      
        this.notifyTagsChanged(tags, tagSet);

        return tagSet;
      });
  }

  private _getTagItemsBatched(query : string, requester: SPHttpClientBatch): Promise<ITagSet> {
    let queryString: string = '?' + this._organizationFieldListSelect;
    
    if (query != null && query != "")
    {
      queryString += "&" + query;
    }
    
    const queryUrl: string = this._organizationListUrl + "/items" +  queryString;

    return requester.get(queryUrl, SPHttpClientBatch.configurations.v1, this._getStandardHttpClientOptions())
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITag[] }) => {
        let tags = json.value.map((person: ITag) => {
          return person;
        });

        let tagSet = this._ensureTagSet(query);
        this.notifyTagsChanged(tags, tagSet);

        return tagSet;
      });
  }


  private _updateTagItem(batch: SPHttpClientBatch, item: ITag): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._organizationListUrl + "/items"}(${item.Id})`;

    const headers: Headers = this._getStandardHttpClientHeaders();
    headers.append('If-Match', '*');

    item["@data.type"] = "$" + this._selectedTagList.ListItemEntityTypeFullName;

    return batch.fetch(itemUpdatedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        body: JSON.stringify(item),
        headers,
        method: 'PATCH'
      }
    );
  }

  public addTagItem(newTag : ITag) : Promise<ITagSet> {
    const batch: SPHttpClientBatch = this._httpClient.beginBatch(this._getStandardHttpClientOptions());

    const batchPromises: Promise<{}>[] = [
      this._addTagItem(batch, newTag),
      this._getTagItemsBatched("$orderby=Created desc&$top=1", batch)
    ];

    return this._resolveTagBatch(batch, batchPromises);
  }

  public notifyTagChanged(person : ITag)
  {
    this._onTagChanged.dispatch(this, person);
  }

  public readTagItemsBySearch(search : string): Promise<ITagSet> {
    return this._getTagItems("substringof('" + search + "', Title)", null, this._httpClient);
  }

  public readTagItems(): Promise<ITagSet> {
    return this._getTagItems(null, null, this._httpClient);
  }

  public readTagItemsByIds(ids : number[]): Promise<ITagSet> {
   var searchQuery = "";

    for (var id of ids)
    {
      if (searchQuery.length > 0)
      {
        searchQuery += " or ";
      }

      searchQuery += "Id eq " + id.toString();
    }

    return this._getTagItems(searchQuery, null, this._httpClient);
  }
  
  public readRecentTagItems(): Promise<ITagSet>
  {
    return this._getTagItems(null, "Modified desc", this._httpClient);
  }

  public readMyTagItems(): Promise<ITagSet>
  {
    return this.readTagItems();
  }

  public updateTagItem(itemUpdated: ITag): Promise<ITagSet> {
    const batch: SPHttpClientBatch = this._httpClient.beginBatch(this._getStandardHttpClientOptions());

    const batchPromises: Promise<{}>[] = [
      this._updateTagItem(batch, itemUpdated),
      this._getTagItemsBatched(null, batch)
    ];

    return this._resolveTagBatch(batch, batchPromises);
  }

  public deleteTagItem(itemDeleted: ITag): Promise<ITagSet> {
    return this.readTagItems();
  }

  
}
