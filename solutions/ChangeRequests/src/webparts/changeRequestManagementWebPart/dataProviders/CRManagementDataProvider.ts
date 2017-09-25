// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import * as lodash from 'lodash';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ICRManagementDataProvider } from './ICRManagementDataProvider';
import { IMyChangeRequestItem, IChangeDiscussionItem, Constants, IPerson } from '../../../libraries/index';
import { IChangeRequestManagementItem, CRMTab } from '../models/CRManagementModel';

export class CRManagementDataProvider implements ICRManagementDataProvider {
    private _webPartContext: IWebPartContext;
    private _crlistUrl: string;
    private _cdlistUrl: string;
    private _crlistItemsUrl: string;
    private _cdlistItemsUrl: string;
    private _currentUser: IPerson;

    public constructor(context: IWebPartContext) {
        this._webPartContext = context;
        this._crlistUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${Constants.ChangeRequestListTitle}')`;
        this._cdlistUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${Constants.ChangeDiscussionListTitle}')`;
        this._crlistItemsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${Constants.ChangeRequestListTitle}')/items`;
        this._cdlistItemsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${Constants.ChangeDiscussionListTitle}')/items`;
        this._currentUser = null;
    }

    public getChangeRequestStatusField(): Promise<Array<string>> {
        const requester: SPHttpClient = this._webPartContext.spHttpClient;
        const queryString: string = `?$filter=EntityPropertyName eq 'Status'`;
        const queryUrl: string = this._crlistUrl + `/fields` + queryString;

        return requester.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json) => {
                return Promise.resolve(json.value[0].Choices);
            });
    }
    public getChangeDiscussionStatusField(): Promise<Array<string>> {
        const requester: SPHttpClient = this._webPartContext.spHttpClient;
        const queryString: string = `?$filter=EntityPropertyName eq 'Sub_x0020_Status'`;
        const queryUrl: string = this._cdlistUrl + `/fields` + queryString;

        return requester.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json) => {
                return Promise.resolve(json.value[0].Choices);
            });
    }
    public getCRMItems(tab: CRMTab): Promise<IChangeRequestManagementItem[]> {
        return this._getCurrentUser()
            .then((person: IPerson) => {
                if (tab == CRMTab.ActiveIssues) {
                    return this._getCRMItems(person, `&$filter=Status ne 'Closed'`);
                }
                else if (tab == CRMTab.MyIssues) {
                    if (person.isInTriage) {
                        return this._getMyCRMItems(person);
                    }
                    else {
                        return Promise.resolve([]);
                    }
                }
                else {
                    return this._getCRMItems(person, `&$filter=Status eq 'Closed'`);
                }

            });
    }
    public getUserById(uid: Number): Promise<IPerson> {
        return this._webPartContext.spHttpClient.
            get(this._webPartContext.pageContext["web"]["absoluteUrl"] + `/_api/web/GetUserById(${uid})`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: any) => {
                return this._analyseAndGetPersonGroup(json);
            });
    }

    public isTriageTeamUser(): Promise<Boolean> {
        return this._getCurrentUser().then((person: IPerson) => {
            return person.isInTriage;
        });
    }

    public saveCRMItem(item: IChangeRequestManagementItem): Promise<boolean> {
        return this._updateCRItem(item.critem)
            .then((sucess) => {
                if (sucess) {
                    return item.cditem.id > 0 ? this._updateCDItem(item.cditem) : this._createCDItem(item.cditem);
                }
                else {
                    return false;
                }
            });
    }

    private _getCurrentUser(): Promise<IPerson> {
        if (this._currentUser != null) {
            return Promise.resolve(this._currentUser);
        }
        else {
            return this._webPartContext.spHttpClient.
                get(this._webPartContext.pageContext["web"]["absoluteUrl"] + `/_api/web/currentuser`, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    return response.json();
                })
                .then((json: any) => {
                    return this._analyseAndGetPersonGroup(json);
                });
        }
    }
    //get site users
    public getTriageSiteUsers(): Promise<IPerson[]> {
        return this._webPartContext.spHttpClient.
            get(this._webPartContext.pageContext["web"]["absoluteUrl"] + `/_api/web/siteusers`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: { value: any[] }) => {
                if (json.value != null) {
                    let peoplePromiseArray: Array<Promise<IPerson>> = [];
                    json.value.forEach((item: any) => {
                        peoplePromiseArray.push(this._analyseAndGetPersonGroup(item));
                    });
                    return Promise.all(peoplePromiseArray)
                        .then((users: IPerson[]) => {
                            return lodash.filter(users, (user: IPerson) => {
                                return user.isInTriage;
                            });
                        });
                }
                else {
                    return [];
                }
            });
    }
    //Active Issues will display only active issues.
    //Closed issues will display only closed issues.
    private _getCRMItems(person: IPerson, filter: string): Promise<IChangeRequestManagementItem[]> {
        return this._getCRItems(filter)
            .then((critems: IMyChangeRequestItem[]) => {
                if (critems != null && critems.length > 0) {
                    if (person.isInTriage) {
                        let cdPromiseArray: Array<Promise<IChangeDiscussionItem>> = [];
                        critems.forEach((item: IMyChangeRequestItem) => {
                            let filterString: string = `&$filter=ChangeId eq ${item.id}`;
                            cdPromiseArray.push(this._getCDItem(filterString));
                        });
                        return Promise.all(cdPromiseArray)
                            .then((cditems: IChangeDiscussionItem[]) => {
                                return critems.map((critem: IMyChangeRequestItem, index: number) => {
                                    let cditem: IChangeDiscussionItem;
                                    let cdindex = lodash.findIndex(cditems, (filtercditem: IChangeDiscussionItem) => filtercditem != null && filtercditem.changeid === critem.id);
                                    if (cdindex != -1) {
                                        cditem = cditems[cdindex];
                                    }
                                    return { critem: critem, cditem: cditem } as IChangeRequestManagementItem;
                                });
                            });
                    }
                    else {
                        return critems.map((critem: IMyChangeRequestItem, index: number) => {
                            return { critem: critem, cditem: null } as IChangeRequestManagementItem;
                        });
                    }
                }
                else {
                    return [];
                }
            });
    }
    //My Issues will display all issues that are assigned to the current user viewing the issues
    private _getMyCRMItems(person: IPerson): Promise<IChangeRequestManagementItem[]> {
        return this._getCDItems(`&$filter=Assigned_x0020_ToId eq ${person.id}`)
            .then((cditems: IChangeDiscussionItem[]) => {
                if (cditems != null && cditems.length > 0) {
                    let crPromiseArray: Array<Promise<IMyChangeRequestItem>> = [];
                    cditems.forEach((item: IChangeDiscussionItem) => {
                        let filterString: string = `&$filter=Id eq ${item.changeid}`;
                        crPromiseArray.push(this._getCRItem(filterString));
                    });
                    return Promise.all(crPromiseArray)
                        .then((critems: IMyChangeRequestItem[]) => {
                            return critems.map((critem: IMyChangeRequestItem) => {
                                if (critem != null) {
                                    let cditem: IChangeDiscussionItem;
                                    let cdindex = lodash.findIndex(cditems, (filtercditem: IChangeDiscussionItem) => filtercditem != null && filtercditem.changeid === critem.id);
                                    if (cdindex != -1) {
                                        cditem = cditems[cdindex];
                                    }
                                    return { critem: critem, cditem: cditem } as IChangeRequestManagementItem;
                                }
                            });
                        });
                }
                else {
                    return [];
                }
            });
    }
    private _getCRItems(crfilter: string): Promise<IMyChangeRequestItem[]> {
        const requester: SPHttpClient = this._webPartContext.spHttpClient;
        const queryString: string = `?$select=ID,Title,Description,Status,Status_x0020_Updates,Created,AuthorId`;
        const queryUrl: string = this._crlistItemsUrl + queryString + crfilter + "&$orderby=ID desc";

        return requester.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: { value: any[] }) => {
                if (json.value != null) {
                    return json.value.map((item: any) => {
                        const crItem: IMyChangeRequestItem = {
                            id: item.ID,
                            title: item.Title,
                            description: item.Description,
                            status: item.Status,
                            statusupdates: item.Status_x0020_Updates,
                            createdby: item.AuthorId,
                            createddate: item.Created
                        };
                        return crItem;
                    });
                }
                else {
                    return [];
                }
            });
    }
    private _getCRItem(crfilter: string): Promise<IMyChangeRequestItem> {
        return this._getCRItems(crfilter)
            .then((critems: IMyChangeRequestItem[]) => {
                if (critems.length > 0) {
                    return critems[0];
                }
                else {
                    return null;
                }
            });
    }


    private _updateCRItem(item: IMyChangeRequestItem): Promise<SPHttpClientResponse> {
        const body: {} = {
            'Title': item.title,
            'Status': item.status,
            'Description': item.description,
            'Status_x0020_Updates': item.statusupdates
        };
        const itemUpdatedUrl: string = `${this._crlistItemsUrl}(${item.id})`;
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        const headers: Headers = new Headers();
        headers.append('If-Match', '*');
        return requester.fetch(itemUpdatedUrl, SPHttpClient.configurations.v1,
            {
                body: JSON.stringify(body),
                headers,
                method: 'PATCH'
            });
    }

    private _getCDItems(cdfilter: string): Promise<IChangeDiscussionItem[]> {
        const requester: SPHttpClient = this._webPartContext.spHttpClient;
        const queryString: string = `?$select=ID,ChangeId,Triage_x0020_Comments,Sub_x0020_Status,Priority,Assigned_x0020_ToId`;
        const queryUrl: string = this._cdlistItemsUrl + queryString + cdfilter;

        return requester.get(queryUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: { value: any[] }) => {
                if (json.value != null) {
                    return json.value.map((item: any) => {
                        const cdItem: IChangeDiscussionItem = {
                            id: item.ID,
                            changeid: item.ChangeId,
                            triagecomments: item.Triage_x0020_Comments,
                            substatus: item.Sub_x0020_Status,
                            priority: item.Priority,
                            assignedto: item.Assigned_x0020_ToId
                        };
                        return cdItem;
                    });
                }
                else {
                    return [];
                }
            });
    }

    private _getCDItem(cdfilter: string): Promise<IChangeDiscussionItem> {
        return this._getCDItems(cdfilter)
            .then((cditems: IChangeDiscussionItem[]) => {
                if (cditems.length > 0) {
                    return cditems[0];
                }
                else {
                    return null;
                }
            });
    }

    private _updateCDItem(item: IChangeDiscussionItem): Promise<boolean> {
        const itemUpdatedUrl: string = `${this._cdlistItemsUrl}(${item.id})`;
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        const headers: Headers = new Headers();
        headers.append('If-Match', '*');

        const body: {} = {
            'Assigned_x0020_ToId': item.assignedto,
            'Priority': item.priority,
            'Sub_x0020_Status': item.substatus,
            'Triage_x0020_Comments': item.triagecomments
        };
        return requester.fetch(itemUpdatedUrl, SPHttpClient.configurations.v1,
            {
                body: JSON.stringify(body),
                headers,
                method: 'PATCH'
            })
            .then((response: SPHttpClientResponse) => {
                return response.ok;
            });
    }

    private _createCDItem(item: IChangeDiscussionItem): Promise<boolean> {
        const body: {} = {
            'ChangeId': item.changeid,
            'Triage_x0020_Comments': item.triagecomments,
            'Sub_x0020_Status': item.substatus,
            'Priority': item.priority,
            'Assigned_x0020_ToId': item.assignedto
        };
        let requester: SPHttpClient = this._webPartContext.spHttpClient;
        return requester.post(this._cdlistItemsUrl, SPHttpClient.configurations.v1,
            {
                body: JSON.stringify(body)
            })
            .then((response: SPHttpClientResponse) => {
                return response.ok;
            });

    }
    
    private _analyseAndGetPersonGroup(item: any): Promise<IPerson> {
        let userId: string = item['Id'], userTitle: string = item['Title'], isSiteAdmin: boolean = item["IsSiteAdmin"];
        let firstName: string = '', lastName: string = '';
        let person: IPerson = null;
        if (userTitle != null) {
            let strArray: string[] = userTitle.split(' ');
            firstName = strArray[0];
            lastName = strArray.length > 1 ? strArray[1] : '';
        }
        person = { id: Number(userId), firstName: firstName, lastName: lastName, isInTriage: false, displayName: userTitle };
        if (isSiteAdmin) {
            person.isInTriage = true;
            return Promise.resolve(person);
        }
        else {
            return this._webPartContext.spHttpClient.
                get(this._webPartContext.pageContext["web"]["absoluteUrl"] + `/_api/web/GetUserById(${person.id})/Groups`, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    return response.json();
                })
                .then((groupjson: any) => {
                    let filterGroups = lodash.filter(groupjson.value, (group: any) => {
                        return group.Title == Constants.ChangeRequestTriageTeamGroupName;
                    });
                    if (groupjson.value.length > 0 && filterGroups.length > 0) {
                        person.isInTriage = true;
                    }
                    return person;
                });
        }
    }
}