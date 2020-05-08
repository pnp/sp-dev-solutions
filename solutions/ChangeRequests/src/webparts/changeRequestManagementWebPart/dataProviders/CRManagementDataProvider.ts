// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as lodash from 'lodash';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ICRManagementDataProvider } from './ICRManagementDataProvider';
import { IMyChangeRequestItem, IChangeDiscussionItem, Constants, IPerson } from '../../../libraries/index';
import { IChangeRequestManagementItem, CRMTab } from '../models/CRManagementModel';
import { sp } from '../../../pnp-preset';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';

export class CRManagementDataProvider implements ICRManagementDataProvider {
    private _currentUser: IPerson;

    public constructor(context: IWebPartContext) {
        sp.setup(context);
        this._currentUser = null;
    }

    public getChangeRequestStatusField(): Promise<Array<string>> {
        return sp.web
            .lists.getByTitle(`${Constants.ChangeRequestListTitle}`)
            .fields.getByInternalNameOrTitle('Status')()
            .then(
                (field: any) => Promise.resolve(field.Choices),
                err => Promise.reject(err)
            );
    }
    public getChangeDiscussionStatusField(): Promise<Array<string>> {
        return sp.web
            .lists.getByTitle(`${Constants.ChangeDiscussionListTitle}`)
            .fields.getByInternalNameOrTitle('Sub_x0020_Status')()
            .then(
                (field: any) => Promise.resolve(field.Choices),
                err => Promise.reject(err)
            );
    }
    public getCRMItems(tab: CRMTab): Promise<IChangeRequestManagementItem[]> {
        return this
            ._getCurrentUser()
            .then((person: IPerson) => {
                if (tab == CRMTab.ActiveIssues) {
                    return this._getCRMItems(person, `Status ne 'Closed'`);
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
                    return this._getCRMItems(person, `Status eq 'Closed'`);
                }
            });
    }
    public getUserById(uid: number): Promise<IPerson> {
        return sp.web
            .getUserById(uid)()
            .then(
                user => this._analyseAndGetPersonGroup(user),
                err => Promise.reject(err)
            );
    }

    public isTriageTeamUser(): Promise<Boolean> {
        return this._getCurrentUser().then((person: IPerson) => {
            return person.isInTriage;
        });
    }

    public saveCRMItem(item: IChangeRequestManagementItem): Promise<boolean> {
        return this._updateCRItem(item.critem)
            .then((success) => {
                if (success) {
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
            return sp.web
                .currentUser()
                .then(
                    user => this._analyseAndGetPersonGroup(user),
                    err => Promise.reject(err)
                );
        }
    }
    //get site users
    public getTriageSiteUsers(): Promise<IPerson[]> {
        return sp.web
            .siteUsers()
            .then((siteUsers: ISiteUserInfo[]) => {
                if (siteUsers && siteUsers.length > 0) {
                    const peoplePromiseArray: Promise<IPerson>[] = siteUsers.map(user => this._analyseAndGetPersonGroup(user));
                    return Promise
                        .all(peoplePromiseArray)
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
                            let filterString: string = `ChangeId eq ${item.id}`;
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
        return this._getCDItems(`Assigned_x0020_ToId eq ${person.id}`)
            .then((cditems: IChangeDiscussionItem[]) => {
                if (cditems != null && cditems.length > 0) {
                    const crPromiseArray: Array<Promise<IMyChangeRequestItem>> = [];
                    cditems.forEach((item: IChangeDiscussionItem) => {
                        const filterString: string = `Id eq ${item.changeid}`;
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
        return sp.web
            .lists.getByTitle(Constants.ChangeRequestListTitle)
            .items
                .filter(crfilter)
                .select('ID', 'Title', 'Description', 'Status', 'Status_x0020_Updates', 'Created', 'AuthorId')
                .orderBy('ID', false)()
            .then(
                crItems => crItems.map(item => {
                    return {
                        id: item.ID,
                        title: item.Title,
                        description: item.Description,
                        status: item.Status,
                        statusupdates: item.Status_x0020_Updates,
                        createdby: item.AuthorId,
                        createddate: item.Created
                    };
                }),
                err => Promise.reject(err)
            );
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


    private _updateCRItem(item: IMyChangeRequestItem): Promise<boolean> {
        return sp.web
            .lists.getByTitle(Constants.ChangeRequestListTitle)
            .items.getById(item.id)
            .update({
                'Title': item.title,
                'Status': item.status,
                'Description': item.description,
                'Status_x0020_Updates': item.statusupdates
            })
            .then(_ => Promise.resolve(true), _ => Promise.resolve(false));
    }

    private _getCDItems(cdfilter: string): Promise<IChangeDiscussionItem[]> {
        return sp.web
        .lists.getByTitle(Constants.ChangeDiscussionListTitle)
        .items
            .filter(cdfilter)
            .select('ID', 'ChangeId', 'Triage_x0020_Comments', 'Sub_x0020_Status', 'Priority', 'Assigned_x0020_ToId')()
        .then(
            crItems => crItems.map(item => {
                return {
                    id: item.ID,
                    changeid: item.ChangeId,
                    triagecomments: item.Triage_x0020_Comments,
                    substatus: item.Sub_x0020_Status,
                    priority: item.Priority,
                    assignedto: item.Assigned_x0020_ToId
                };
            }),
            err => Promise.reject(err)
        );
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
        return sp.web
            .lists.getByTitle(Constants.ChangeDiscussionListTitle)
            .items.getById(item.id)
            .update({
                'Assigned_x0020_ToId': item.assignedto,
                'Priority': item.priority,
                'Sub_x0020_Status': item.substatus,
                'Triage_x0020_Comments': item.triagecomments
            })
            .then(_ => Promise.resolve(true), _ => Promise.resolve(false));
    }

    private _createCDItem(item: IChangeDiscussionItem): Promise<boolean> {
        return sp.web
            .lists.getByTitle(Constants.ChangeDiscussionListTitle)
            .items.add({
                'ChangeId': item.changeid,
                'Triage_x0020_Comments': item.triagecomments,
                'Sub_x0020_Status': item.substatus,
                'Priority': item.priority,
                'Assigned_x0020_ToId': item.assignedto
            })
            .then(_ => Promise.resolve(true), _ => Promise.resolve(false));
    }

    private _analyseAndGetPersonGroup(item: ISiteUserInfo): Promise<IPerson> {
        const userId: number = item.Id, userTitle: string = item.Title, isSiteAdmin: boolean = item.IsSiteAdmin;
        let firstName: string = '', lastName: string = '';
        let person: IPerson = null;
        if (userTitle != null) {
            let strArray: string[] = userTitle.split(' ');
            firstName = strArray[0];
            lastName = strArray.length > 1 ? strArray[1] : '';
        }
        person = { id: userId, firstName: firstName, lastName: lastName, isInTriage: false, displayName: userTitle };
        if (isSiteAdmin) {
            person.isInTriage = true;
            return Promise.resolve(person);
        }
        else {
            return sp.web
                .getUserById(person.id)
                .groups()
                .then(
                    groups => {
                        const filterGroups = lodash.filter(groups, group => {
                            return group.Title == Constants.ChangeRequestTriageTeamGroupName;
                        });
                        if (groups.length > 0 && filterGroups.length > 0) {
                            person.isInTriage = true;
                        }
                        return person;
                    },
                    err => Promise.reject(err));
        }
    }
}