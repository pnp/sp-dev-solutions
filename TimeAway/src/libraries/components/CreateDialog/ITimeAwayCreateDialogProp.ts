import { IMyTimeAwayItem } from "../../models/timeAwayModel";
import { ItemValidOperationCallback, ItemPromiseOperationCallback } from "../../models/ItemOperationCallback";

interface ITimeAwayCreateDialogProp {
    item?: IMyTimeAwayItem;
    isOpen: boolean;
    itemSaveOperationCallback: ItemPromiseOperationCallback;
    itemValidOperationCallback: ItemValidOperationCallback;
}

export default ITimeAwayCreateDialogProp;