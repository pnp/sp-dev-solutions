import { IMyTimeAwayItem } from "../../models/timeAwayModel";
import {TimePeriod}  from "../../models/timeAwayModel";
import { ItemOperationCallback, ItemTabOperationCallback } from "../../models/ItemOperationCallback";


export interface IMyTimeAwayTabProps {
  period: TimePeriod;
  items: IMyTimeAwayItem[];
  tabOperationClickCallback: ItemTabOperationCallback;
  itemDeleteIconClickCallback: ItemOperationCallback;
  itemEditIconClickCallback: ItemOperationCallback;
}

export default IMyTimeAwayTabProps;