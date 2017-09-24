import { IMyChangeRequestItem } from '../../../../libraries/index';
import {ItemNormalOperationCallback} from '../../models/ItemOperationCallback';
interface IMyCRListProps {
    items: IMyChangeRequestItem[];
    itemEditIconClickCallback: ItemNormalOperationCallback;
}
export default IMyCRListProps;