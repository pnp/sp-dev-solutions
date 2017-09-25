// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ICRManagementDataProvider } from './ICRManagementDataProvider';
import { MockChangeRequestLists } from '../../../libraries/index';
import { IChangeRequestManagementItem, CRMTab } from '../models/CRManagementModel';
import { IPerson } from '../../../libraries/index';
import * as _ from "lodash";

export class MockCRManagementDataProvider implements ICRManagementDataProvider {
    public getChangeRequestStatusField(): Promise<Array<string>> {
        return Promise.resolve(["Open", "In Progress", "Closed"]);
    }

    public getCRMItems(tab: CRMTab): Promise<IChangeRequestManagementItem[]> {
        let critems = MockChangeRequestLists.getCRItems();
        let cditems = MockChangeRequestLists.getCDItems();
        let crmitems: IChangeRequestManagementItem[] = [];
        let result: IChangeRequestManagementItem[] = null;
        let currentUserId: number = MockChangeRequestLists.getCurrentPerson().id;

        for (let i: number = 0; i < critems.length; i++)
            crmitems.push({ critem: critems[i], cditem: cditems[i] });

        switch (tab) {
            case CRMTab.ActiveIssues:
                result = _.filter(crmitems, (item) => { return item.critem.status !== "Closed"; });
                break;
            case CRMTab.ClosedIssues:
                result = _.filter(crmitems, (item) => { return item.critem.status === "Closed"; });
                break;
            case CRMTab.MyIssues:
                result = _.filter(crmitems, (item) => { return item.cditem.assignedto === currentUserId; });
                break;
        }

        return Promise.resolve(result);
    }

    public saveCRMItem(item: IChangeRequestManagementItem): Promise<boolean> {
        let critems = MockChangeRequestLists.getCRItems();
        let cditems = MockChangeRequestLists.getCDItems();
        let isisTriageTeamMember: boolean = false;

        return this.isTriageTeamUser()
            .then((value: boolean) => {

                let crIndex: number = _.findIndex(critems, (crmitem) => { return crmitem.id === item.critem.id; });

                critems.splice(crIndex, 1, item.critem);

                if (value) {
                    let cdIndex: number = _.findIndex(cditems, (cdmitem) => { return cdmitem.changeid === item.critem.id; });
                    cditems.splice(crIndex, 1, item.cditem);
                }

                return Promise.resolve(true);
            });
    }

    public getUserById(id: number): Promise<IPerson> {
        let users = MockChangeRequestLists.getAllUsers();
        return Promise.resolve(_.find(users, ['id', id]));
    }

    public isTriageTeamUser(): Promise<Boolean> {
        return Promise.resolve(MockChangeRequestLists.getCurrentPerson().isInTriage);
    }
    public getTriageSiteUsers(): Promise<IPerson[]> {
        return Promise.resolve(MockChangeRequestLists.getAllUsers().filter((user: IPerson) => user.isInTriage));
    }
}