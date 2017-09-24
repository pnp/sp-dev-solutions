import { CRMTab } from '../../models/CRManagementModel';
import { ItemTabOperationCallback } from '../../models/CRMManagementOperationCallback';

export interface ICRManagementTabProps {
    selectedTab: CRMTab;
    tabOperationClickCallback: ItemTabOperationCallback;
}

export default ICRManagementTabProps;