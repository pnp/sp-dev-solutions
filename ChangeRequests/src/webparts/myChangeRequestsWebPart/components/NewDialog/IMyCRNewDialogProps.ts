import { IMyChangeRequestItem } from '../../../../libraries/index';
import {ItemSaveOperationCallback, ItemOperationCallback} from '../../models/ItemOperationCallback';

interface IMyCRNewDialogProp {
    newcrtext: string;
    item: IMyChangeRequestItem;
    isOpen: boolean;
    newcrsubmissiontext: string;
    newcrbuttontext: string;
    
    itemSaveOperationCallback: ItemSaveOperationCallback;
    itemCloseOperationCallback: ItemOperationCallback;
}
export default IMyCRNewDialogProp;