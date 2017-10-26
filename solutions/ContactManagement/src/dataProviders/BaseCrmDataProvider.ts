// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ICrmDataProvider } from './ICrmDataProvider';

import { ISPList } from '../data/ISPList';

import { ISharePointItem } from '../data/ISharePointItem';
import { IPerson } from '../data/IPerson';
import { ISPUser } from '../data/ISPUser';

import { IOrganization } from '../data/IOrganization';
import { ISPView } from '../data/ISPView';
import { ISPField } from '../data/ISPField';
import { IOrganizationSet } from './IOrganizationSet';
import OrganizationSetChange from './OrganizationSetChange';
import OrganizationSet from './OrganizationSet';
import DataError, { DataProviderErrorCodes } from './DataError';
import { FieldTypeKind } from '../data/FieldTypeKind';

import { ITag } from '../data/ITag';
import { ITagSet } from './ITagSet';
import TagSetChange from './TagSetChange';
import TagSet from './TagSet';

import { EventDispatcher, IEvent } from '../utilities/Events';

import SharePointUtility from '../data/SharePointUtility';
import Utility from '../utilities/Utility';


export abstract class BaseCrmDataProvider implements ICrmDataProvider {
    
    protected _idCounter = 0;
    protected _selectedPersonList: ISPList;

    protected _selectedOrganizationList: ISPList;
    protected _allOrganizations : OrganizationSet;
    protected _organizationSets: { [query: string]: OrganizationSet };

    protected _selectedTagList: ISPList;
    protected _allTags : TagSet;
    private _errors : DataError[];

    protected _tagSets: { [query: string]: TagSet };

    public get selectedPersonList(): ISPList { return this._selectedPersonList; }
    public set selectedPersonList(value: ISPList) { this._selectedPersonList = value; }

    public get selectedOrganizationList(): ISPList { return this._selectedOrganizationList; }
    public set selectedOrganizationList(value: ISPList) { this._selectedOrganizationList = value; }

    public get selectedTagList(): ISPList { return this._selectedTagList; }
    public set selectedTagList(value: ISPList) { this._selectedTagList = value; }

    public meUser : ISPUser;

    protected _onPersonAdded;
    protected _onPersonChanged;
    protected _onPersonRemoved;

    protected _onOrganizationAdded;
    protected _onOrganizationChanged;
    protected _onOrganizationRemoved;

    protected _onTagAdded;
    protected _onTagChanged;
    protected _onTagRemoved;

    constructor() {
        this._organizationsUpdated = this._organizationsUpdated.bind(this);    

        this._allOrganizations = new OrganizationSet();
        this._allOrganizations.onSetChanged.sub(this._organizationsUpdated);

        this._organizationSets = {};

        this._tagsUpdated = this._tagsUpdated.bind(this);    

        this._allTags = new TagSet();
        this._allTags.onSetChanged.sub(this._tagsUpdated);

        this._tagSets = {};

        this._selectedPersonList = null;
        this._selectedOrganizationList = null;
        this._selectedTagList = null;

        this._onPersonAdded = new EventDispatcher<ICrmDataProvider, IPerson>(this);
        this._onPersonChanged = new EventDispatcher<ICrmDataProvider, IPerson>(this);
        this._onPersonRemoved = new EventDispatcher<ICrmDataProvider, IPerson>(this);

        this._onOrganizationAdded = new EventDispatcher<ICrmDataProvider, IOrganization>(this);
        this._onOrganizationChanged = new EventDispatcher<ICrmDataProvider, IOrganization>(this);
        this._onOrganizationRemoved = new EventDispatcher<ICrmDataProvider, IOrganization>(this);    

        this._onTagAdded = new EventDispatcher<ICrmDataProvider, ITag>(this);
        this._onTagChanged = new EventDispatcher<ICrmDataProvider, ITag>(this);
        this._onTagRemoved = new EventDispatcher<ICrmDataProvider, ITag>(this);    
    }

    public getErrors() : DataError[]
    {
        return this._errors;
    }

    protected pushError(message : string, code: number)
    {
        var de = {
            message: message,
            id: this.nextNewId(),
            code: code
        };

        if (this._errors == null)
        {
            this._errors = new Array(); 
        }

        this._errors.push(de);
    }

    public readFields(listName : string) : Promise<ISPField[]>
    {
        listName = Utility.ensureNoBraces(listName);

        if (listName == Utility.ensureNoBraces(this._selectedOrganizationList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedOrganizationList.Id))
        {
            return new Promise<ISPField[]>((resolve) => resolve(this._selectedOrganizationList.Fields ));
        }

        if (listName == Utility.ensureNoBraces(this._selectedPersonList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedPersonList.Id))
        {
            return new Promise<ISPField[]>((resolve) => resolve(this._selectedPersonList.Fields ));
        }


        if (listName == Utility.ensureNoBraces(this._selectedTagList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedTagList.Id))
        {
            return new Promise<ISPField[]>((resolve) => resolve(this._selectedTagList.Fields ));
        }

        return Promise.reject(null);

    }
    
    public nextNewId() : number {
        return this._idCounter--;
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
        return this._onPersonRemoved.asEvent();
    }

    public readListItems(listName : string): Promise<ISharePointItem[]>
    {
        listName = Utility.ensureNoBraces(listName);

        if (listName == this._selectedOrganizationList.Title || listName == Utility.ensureNoBraces(this._selectedOrganizationList.Id))
        {
            return this.readOrganizationItems().then(
                (organizationSet : OrganizationSet) =>
                {
                    return organizationSet.organizations;
                }
            );
        }

        if (listName == this._selectedPersonList.Title || listName == Utility.ensureNoBraces(this._selectedPersonList.Id))
        {
            return this.readPersonItems().then(
                (people : IPerson[]) =>
                {
                    return people;
                }
            );
        }

        if (listName == this._selectedTagList.Title || listName == Utility.ensureNoBraces(this._selectedTagList.Id))
        {
            return this.readTagItems().then(
                (tagSet : TagSet) =>
                {
                    return tagSet.tags;
                }
            );
        }

        return Promise.reject(null);
    }

   public readListItemsByIds(listName : string, ids : number[]): Promise<ISharePointItem[]>
    {        
        listName = Utility.ensureNoBraces(listName);

        if (listName == Utility.ensureNoBraces(this._selectedOrganizationList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedOrganizationList.Id))
        {
            return this.readOrganizationItemsByIds(ids).then(
                (organizationSet : OrganizationSet) =>
                {                    
                    var filteredItems : ISharePointItem[] = new Array();

                    for (let org of organizationSet.organizations)
                    {
                        for (var id of ids)
                        {
                            if (org.Id == id)
                            {
                                filteredItems.push(org);
                            }
                        }
                    }

                    return filteredItems;
                }
            );
        }

        if (listName == Utility.ensureNoBraces(this._selectedPersonList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedPersonList.Id))
        {
            return this.readPersonItemsByIds(ids).then(
                (persons :IPerson[]) =>
                {
                    var filteredItems : ISharePointItem[] = new Array();
                    for (let person of persons)
                    {
                        for (var id of ids)
                        {
                            if (person.Id == id)
                            {
                                filteredItems.push(person);
                            }
                        }
                    }

                    return filteredItems;
                }
            );
        }


        if (listName == Utility.ensureNoBraces(this._selectedTagList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedTagList.Id))
        {

            return this.readTagItemsByIds(ids).then(
                (tagSet :ITagSet) =>
                {
                    var filteredItems : ISharePointItem[] = new Array();

                    for (let tag of tagSet.tags)
                    {
                        for (var id of ids)
                        {
                            if (tag.Id == id)
                            {
                                filteredItems.push(tag);
                            }
                        }
                    }

                    return filteredItems;
                }
            );
        }

        return Promise.reject(null);
    }

    public readListItemsBySearch(listName : string, searchTerm : string): Promise<ISharePointItem[]>
    {
        listName = Utility.ensureNoBraces(listName);

        if (listName == Utility.ensureNoBraces(this._selectedOrganizationList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedOrganizationList.Id))
        {
            return this.readOrganizationItemsBySearch(searchTerm, null).then(
                (organizationSet : OrganizationSet) =>
                {
                    return organizationSet.organizations;
                }
            );
        }

        if (listName == Utility.ensureNoBraces(this._selectedPersonList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedPersonList.Id))
        {
            return this.readPersonItemsBySearch(searchTerm).then(
                (people : IPerson[]) =>
                {
                    return people;
                }
            );
        }

        if (listName == Utility.ensureNoBraces(this._selectedTagList.Title) || 
            listName == Utility.ensureNoBraces(this._selectedTagList.Id))
        {
            return this.readTagItemsBySearch(searchTerm).then(
                (tagSet : TagSet) =>
                {
                    return tagSet.tags;
                }
            );
        }

        return Promise.reject(null);
    }

    public validate() : void
    {
        this.validateList(this.selectedOrganizationList, this.defaultOrganizationList);
        this.validateList(this.selectedPersonList, this.defaultPersonList);
        this.validateList(this.selectedTagList, this.defaultTagList);
    }

    private validateList(source : ISPList, original : ISPList)
    {
        for (var field of original.Fields)
        {
            var compareField = SharePointUtility.getField(source, field.InternalName);

            if (compareField == null)
            {
                this.pushError("Required field '" + field.Title + "' in list '" + source.Title + "' was not found.", DataProviderErrorCodes.FieldNotFound );                
            }
            else
            {
                if (compareField.FieldTypeKind != field.FieldTypeKind || 
                    compareField.AllowMultipleValues != field.AllowMultipleValues)
                {
                    this.pushError("Field '" + field.Title + "' in list '" + source.Title + "' is not configured properly.", DataProviderErrorCodes.FieldNotFound );                
                }
            }
        }
    }

    public notifyPersonChanged(person : IPerson)
    {
        this._onPersonChanged.dispatch(this, person);
    }
    
    public notifyOrganizationChanged(organization : IOrganization)
    {
        this.notifyOrganizationsChanged([organization]);
    }

    protected _ensureOrganizationSet(query : string) : OrganizationSet
    {
        let orgSet = null;
        
        if (query != "NEW")
        {
            orgSet = this._organizationSets[query];
        }

        if (orgSet != null)
        {
            return orgSet;
        }

        orgSet = new OrganizationSet();
        this._organizationSets[query] = orgSet;

        return orgSet;  
    }

    protected _organizationsUpdated(orgSet : IOrganizationSet, changes : OrganizationSetChange)
    {
        for (let i=0; i<changes.removedItems.length; i++)
        {
            this._onOrganizationRemoved.dispatch(this, changes.removedItems[i]);
        }

        for (let i=0; i<changes.changedItems.length; i++)
        {
            this._onOrganizationChanged.dispatch(this, changes.changedItems[i]);
        }
    
        for (let i=0; i<changes.addedItems.length; i++)
        {
            this._onOrganizationAdded.dispatch(this, changes.addedItems[i]);
        }
    
    }
  
    public notifyOrganizationsChanged(updates : IOrganization[], sourceSet? : IOrganizationSet)
    {
        this._allOrganizations.apply(updates, false);

        for (var key in this._organizationSets)
        {
            var updateSet = this._organizationSets[key];
            
            updateSet.apply(updates, sourceSet == updateSet);
        }
    }

    public abstract init(): Promise<void>;

    public abstract updateAll(): Promise<boolean>;
    
  public createPersonItem(lastName: string, firstName: string, company: string): Promise<IPerson[]> {
    const newItem: IPerson  = {
      Id: this._idCounter--,
      Title: lastName,
      FirstName: firstName,
      Company: company,
      AuthorId: 1,
      Created: new Date(),
      Modified: new Date(),
      EditorId: 1
        };

        return new Promise<IPerson[]>((resolve) => {
            setTimeout(() => resolve( [ newItem ] ), 1);
        });
    }
    
  public createOrganizationItem(title: string, type: string): Promise<OrganizationSet> {
    const newItem: IOrganization  = {
      Id: this._idCounter--,
      Title: title,
      AuthorId: 1,
      Created: new Date(),
      Modified: new Date(),
      EditorId: 1
    };

    let ose : OrganizationSet = this._ensureOrganizationSet("NEW");
    
    ose.apply( [ newItem ], true );

    return new Promise<OrganizationSet>((resolve) => {
      setTimeout(() => resolve(ose), 1);
    });
  }

    
  public createTagItem(title: string, type: string): Promise<TagSet> {
    const newItem: ITag  = {
      Id: this._idCounter--,
      Title: title,
      AuthorId: 1,
      Created: new Date(),
      Modified: new Date(),
      EditorId: 1
    };

    let tse : TagSet = this._ensureTagSet("NEW");
    
    tse.apply( [ newItem ], true );

    return new Promise<TagSet>((resolve) => {
      setTimeout(() => resolve(tse), 1);
    });
  }
  
    public notifyTagChanged(tag : ITag)
    {
        this.notifyTagsChanged([tag]);
    }

    protected _ensureTagSet(query : string) : TagSet
    {
        let tagSet = null;
        
        if (query != "NEW")
        {
            tagSet = this._tagSets[query];
        }

        if (tagSet != null)
        {
            return tagSet;
        }

        tagSet = new TagSet();
        this._tagSets[query] = tagSet;

        return tagSet;  
    }


    protected _tagsUpdated(orgSet : ITagSet, changes : TagSetChange)
    {
        for (let i=0; i<changes.removedItems.length; i++)
        {
            this._onTagRemoved.dispatch(this, changes.removedItems[i]);
        }

        for (let i=0; i<changes.changedItems.length; i++)
        {
            this._onTagChanged.dispatch(this, changes.changedItems[i]);
        }
    
        for (let i=0; i<changes.addedItems.length; i++)
        {
            this._onTagAdded.dispatch(this, changes.addedItems[i]);
        }
    
    }
  
    public notifyTagsChanged(updates : ITag[], sourceSet? : ITagSet)
    {
        this._allTags.apply(updates, false);

        for (var key in this._tagSets)
        {
            var updateSet = this._tagSets[key];
            
            updateSet.apply(updates, sourceSet == updateSet);
        }
    }

    public abstract addPersonItem(newPerson : IPerson): Promise<IPerson[]>;
  
    public abstract readUsersByUserName(userName : string): Promise<ISPUser[]>;
    public abstract readUsersBySearch(search : string): Promise<ISPUser[]>;
    public abstract readUsersByIds(ids : number[]): Promise<ISPUser[]>;

    public abstract readOrganizationItemsByPriority(priority : number): Promise<IOrganizationSet>;
    public abstract readOrganizationItemsByView(view : ISPView): Promise<IOrganizationSet>;
    public abstract readPersonItemsBySearch(search : string): Promise<IPerson[]>;
    public abstract readPersonItems(): Promise<IPerson[]>;
    public abstract readPersonItemsByOrganizationId(organizationId : number): Promise<IPerson[]>;
    public abstract readPersonItemsByIds(id : number[]): Promise<IPerson[]>;
    public abstract updatePersonItem(itemUpdated: IPerson): Promise<IPerson[]>;
    public abstract deletePersonItem(itemDeleted: IPerson): Promise<IPerson[]>;
  
    public abstract addOrganizationItem(newOrganization : IOrganization): Promise<IOrganizationSet>;
  
    public abstract readOrganizationItemsBySearch(search : string, tagItems : number[]): Promise<IOrganizationSet>;
    public abstract readOrganizationItems(): Promise<IOrganizationSet>;
    public abstract readOrganizationItemsByIds(ids : number[]): Promise<IOrganizationSet>;
    public abstract readRecentOrganizationItems(): Promise<IOrganizationSet>;
    public abstract readMyOrganizationItems(): Promise<IOrganizationSet>;

    public abstract updateOrganizationItem(itemUpdated: IOrganization): Promise<IOrganizationSet>;
    public abstract deleteOrganizationItem(itemDeleted: IOrganization): Promise<IOrganizationSet>;

  
    public abstract addTagItem(newTag : ITag): Promise<ITagSet>;
  
    public abstract readTagItemsBySearch(search : string): Promise<ITagSet>;
    public abstract readTagItems(): Promise<ITagSet>;
    public abstract readTagItemsByIds(id : number[]): Promise<ITagSet>;
    public abstract readRecentTagItems(): Promise<ITagSet>;
    public abstract readMyTagItems(): Promise<ITagSet>;

    public abstract updateTagItem(itemUpdated: ITag): Promise<ITagSet>;
    public abstract deleteTagItem(itemDeleted: ITag): Promise<ITagSet>;
    
    public defaultTagList = {
        Title: 'Tags',
        ListItemEntityTypeFullName: '#SP.Data.TagsListItem',
        Id: 'f3c61a58-44a8-4f87-bf5b-03668af15ea7',
        Fields: [
            { 
                Title: "Title",
                InternalName: "Title",
                FieldTypeKind: FieldTypeKind.Text
            },
            { 
                Title: "Description",
                InternalName: "Description",
                FieldTypeKind: FieldTypeKind.Text
            }                
        ]            
   };

    public defaultOrganizationList = {
      Title : "Organizations", 
      ListItemEntityTypeFullName: '#SP.Data.OrganizationsListItem',
      Id: '01c78e45-06c2-4384-be9e-caa23912ebda',
      Fields: [
      { 
        Title: "Title",
        InternalName: "Title",
        FieldTypeKind: FieldTypeKind.Text
      },
      { 
        Title: "Description",
        InternalName: "Description",
        FieldTypeKind: FieldTypeKind.Text
      },
      { 
        Title: "Primary Address",
        InternalName: "PrimaryAddress",
        FieldTypeKind: FieldTypeKind.Text
      },
      { 
        Title: "Primary City",
        InternalName: "PrimaryCity",
        FieldTypeKind: FieldTypeKind.Text
      },
      { 
        Title: "Primary State/Province",
        InternalName: "PrimaryStateProvince",
        FieldTypeKind: FieldTypeKind.Text
      },
      { 
        Title: "Primary Country",
        InternalName: "PrimaryCountry",
        FieldTypeKind: FieldTypeKind.Text
      },
      { 
        Title: "Primary Zip/Postal Code",
        InternalName: "PrimaryZipPostalCode",
        FieldTypeKind: FieldTypeKind.Text
      },
      { 
        Title: "Logo",
        InternalName: "Logo",
        FieldTypeKind: FieldTypeKind.Url
      },
      { 
        Title: "Notes",
        InternalName: "Notes",
        FieldTypeKind: FieldTypeKind.Text,
        RichText: true  
      },
      { 
        Title: "Status",
        InternalName: "Status",
        FieldTypeKind: FieldTypeKind.Choice,
        Choices: [ "Active", "Closed" ]
      },
      { 
        Title: "Updates",
        InternalName: "Updates",
        FieldTypeKind: FieldTypeKind.Text,
        RichText: true  
      },
      { 
        Title: "Priority",
        InternalName: "Organizational_x0020_Priority",
        FieldTypeKind: FieldTypeKind.Number
      },                        
      { 
        Title: "Owner",
        InternalName: "Owner",
        FieldTypeKind: FieldTypeKind.User
      },                        
      { 
        Title: "Home Page",
        InternalName: "HomePage",
        FieldTypeKind: FieldTypeKind.Text
      },                        
      { 
        Title: "About",
        InternalName: "About",
        FieldTypeKind: FieldTypeKind.Url
      },
      { 
        Title: "Tags",
        InternalName: "Tags",
        FieldTypeKind: FieldTypeKind.Lookup,
        AllowMultipleValues: true,
        LookupList: this.defaultTagList.Id
      },
      { 
        Title: "Created",
        InternalName: "Created",
        FieldTypeKind: FieldTypeKind.DateTime
      },
      { 
        Title: "Modified",
        InternalName: "Modified",
        FieldTypeKind: FieldTypeKind.DateTime
      },
      { 
        Title: "Author",
        InternalName: "Author",
        FieldTypeKind: FieldTypeKind.User
      },
      { 
        Title: "Editor",
        InternalName: "Editor",
        FieldTypeKind: FieldTypeKind.User
      }
    ]
   };

   public defaultPersonList = {
       Title: "Contacts", 
       ListItemEntityTypeFullName: '#SP.Data.ContactsListItem',
       Id: 'f3c61a58-44a8-4f87-bf5b-03668af15ea6',
       Fields: [
          { 
            Title: "First Name",
            InternalName: "FirstName",
            FieldTypeKind: FieldTypeKind.Text
          },         
          { 
            Title: "Last Name",
            InternalName: "Title",
            FieldTypeKind: FieldTypeKind.Text
          },
          { 
            Title: "Company",
            InternalName: "Company",
            FieldTypeKind: FieldTypeKind.Text
          },         
          { 
            Title: "Email",
            InternalName: "Email",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "JobTitle",
            InternalName: "JobTitle",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "WorkPhone",
            InternalName: "WorkPhone",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "HomePhone",
            InternalName: "HomePhone",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "CellPhone",
            InternalName: "CellPhone",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "WorkFax",
            InternalName: "WorkFax",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "WorkAddress",
            InternalName: "WorkAddress",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "WorkCity",
            InternalName: "WorkCity",
            FieldTypeKind: FieldTypeKind.Text
          },              
          { 
            Title: "WorkZip",
            InternalName: "WorkZip",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "WorkState",
            InternalName: "WorkState",
            FieldTypeKind: FieldTypeKind.Text
          },         
          { 
            Title: "WorkCountry",
            InternalName: "WorkCountry",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "WebPage",
            InternalName: "WebPage",
            FieldTypeKind: FieldTypeKind.Text
          },               
          { 
            Title: "PersonalWebsite",
            InternalName: "PersonalWebsite",
            FieldTypeKind: FieldTypeKind.Url
          },               
          { 
            Title: "Comments",
            InternalName: "Comments",
            FieldTypeKind: FieldTypeKind.Text,
            RichText: true
          },               
          { 
            Title: "LinkedIn",
            InternalName: "LinkedIn",
            FieldTypeKind: FieldTypeKind.Text,
            RichText: true
          },               
          { 
            Title: "Facebook",
            InternalName: "Facebook",
            FieldTypeKind: FieldTypeKind.Text,
            RichText: true
          },               
          { 
            Title: "Twitter",
            InternalName: "Twitter",
            FieldTypeKind: FieldTypeKind.Text,
            RichText: true
          },               
          { 
            Title: "Logo",
            InternalName: "Logo",
            FieldTypeKind: FieldTypeKind.Url
          },                        
          { 
            Title: "Organization",
            InternalName: "Organization",
            FieldTypeKind: FieldTypeKind.Lookup,
            LookupList: this.defaultOrganizationList.Id
          },
          { 
            Title: "Tags",
            InternalName: "Tags",
            FieldTypeKind: FieldTypeKind.Lookup,
            AllowMultipleValues: true,
            LookupList: this.defaultTagList.Id
          }
          
        ]
   };


}