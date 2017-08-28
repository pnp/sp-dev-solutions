import { IMyTimeAwayItem } from "../../models/timeAwayModel";
import { ItemOperationCallback } from "../../models/ItemOperationCallback";

interface IMyTimeAwayListItemProps {
  item: IMyTimeAwayItem;
  itemDeleteIconClickCallback: ItemOperationCallback;
  itemEditIconClickCallback: ItemOperationCallback;
}

export default IMyTimeAwayListItemProps;