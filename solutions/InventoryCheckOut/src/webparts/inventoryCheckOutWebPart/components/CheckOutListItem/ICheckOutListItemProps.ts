import { ICheckOut } from '../../models/InventoryCheckOutModel';
import { CheckOutEditOperationCallback } from '../../models/ItemOperationCallback';

interface ICheckOutListItemProps {
  item: ICheckOut;
  onEdit: CheckOutEditOperationCallback;
  onCheckIn: CheckOutEditOperationCallback;
}

export default ICheckOutListItemProps;