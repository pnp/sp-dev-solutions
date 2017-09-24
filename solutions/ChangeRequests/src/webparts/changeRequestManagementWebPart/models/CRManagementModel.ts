import { IMyChangeRequestItem, IChangeDiscussionItem } from '../../../libraries/index';

export enum CRMTab {
    ActiveIssues = 1,
    MyIssues,
    ClosedIssues
}

export interface IChangeRequestManagementItem {
    critem: IMyChangeRequestItem;
    cditem: IChangeDiscussionItem; 
}