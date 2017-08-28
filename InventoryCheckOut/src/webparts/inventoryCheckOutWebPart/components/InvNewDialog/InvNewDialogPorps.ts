import { IInventoryItem } from "../../models/InventoryCheckOutModel";

interface InvNewDialogPorps {
    item?: IInventoryItem;
    isOpen: boolean;
    isNew: boolean;
    location:string;
    itemSaveOperationCallback: any;
    itemCancelOperationCallback: any;
    itemValidOperationCallback: any;
}

export default InvNewDialogPorps;