import { IMyChangeRequestItem } from '../../../../libraries/index';
import {ItemNormalOperationCallback} from '../../models/ItemOperationCallback';

interface IMyCRItemProps {
    item: IMyChangeRequestItem;
    itemEditIconClickCallback: ItemNormalOperationCallback;
}
export default IMyCRItemProps;