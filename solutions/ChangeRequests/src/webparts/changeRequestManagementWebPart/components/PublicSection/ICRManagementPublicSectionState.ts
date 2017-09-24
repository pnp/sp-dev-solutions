import { IPerson, IMyChangeRequestItem } from '../../../../libraries/index';

export interface ICRManagementPublicSectionState {
    item: IMyChangeRequestItem;
    allUsers: IPerson[];
}