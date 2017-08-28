import { IMyChangeRequestItem } from '../../../../libraries/index';
import {ItemSaveOperationCallback, ItemOperationCallback} from '../../models/ItemOperationCallback';
import {NewCRFormShowIn} from '../../models/MyCRModel';

interface IMyCRNewFormProps {
    showIn: NewCRFormShowIn;
    isOpen: boolean;
    newcrtext: string;
    item: IMyChangeRequestItem;
    newcrsubmissiontext: string;
    newcrbuttontext: string;

    itemSaveOperationCallback: ItemSaveOperationCallback;
    itemCloseDialogOperationCallback?:ItemOperationCallback;
}
export default IMyCRNewFormProps;