import { IMyTimeAwayItem, TimePeriod } from "./timeAwayModel";

export type ItemTabOperationCallback = (period: TimePeriod) => void;
export type ItemConfirmOperationCallback = () => void;
export type ItemOperationCallback = (item: IMyTimeAwayItem) => void;
export type ItemPromiseOperationCallback = (item: IMyTimeAwayItem) => Promise<any>;
export type ItemValidOperationCallback = (item: IMyTimeAwayItem) => Promise<Boolean>;
export type ItemGetItemsCallback = (period: TimePeriod) => IMyTimeAwayItem[];
