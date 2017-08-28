import { IPerson, IChangeDiscussionItem } from '../../../../libraries/models/ChangeRequestModel';

export interface ICRManagementTeamSectionProps {
    selectedItem: IChangeDiscussionItem;
    isTriageTeamMember: boolean;
    itemChangeHandler: any;
    allTriageUser: IPerson[];
}