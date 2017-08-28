import { IMyTimeAwayItem } from "../../models/timeAwayModel";
import { ItemOperationCallback } from "../../models/ItemOperationCallback";
interface IMyTimeAwayListProps{
  items: IMyTimeAwayItem[];
  itemDeleteIconClickCallback: ItemOperationCallback;
  itemEditIconClickCallback: ItemOperationCallback;
}

export default IMyTimeAwayListProps;
