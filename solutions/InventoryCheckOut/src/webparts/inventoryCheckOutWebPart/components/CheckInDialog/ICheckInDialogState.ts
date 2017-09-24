import { ICheckOut } from '../../models/InventoryCheckOutModel';

interface ICheckInDialogState {
    item: ICheckOut;
    submitting?: boolean;
    errorMessage?:string;
}
export default ICheckInDialogState;