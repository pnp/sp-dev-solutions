import { IMyChangeRequestItem } from '../../../../libraries/index';
import { NewCRDialogShowType } from '../../models/MyCRModel';

interface IMyCRContainerState {
    submitting?: boolean;
    hasAdminPermission?: boolean;
    newCRDialogShowType?: NewCRDialogShowType;
    isInitialized?: boolean;    
    items?: IMyChangeRequestItem[];
}
export default IMyCRContainerState;