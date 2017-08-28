import { ICheckOut } from "../../models/InventoryCheckOutModel";
import {CheckOutEditOperationCallback} from '../../models/ItemOperationCallback';
interface ICheckOutListProps {
    checkouts: ICheckOut[];
    checkOutEditIconClickCallback: CheckOutEditOperationCallback;
    checkOutMarkconClickCallback: CheckOutEditOperationCallback;
}
export default ICheckOutListProps;