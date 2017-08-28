import { IMyChangeRequestItem } from '../../../libraries/index';
export interface IMyCRDataProvider {
  getMyChangeRequestItems(): Promise<IMyChangeRequestItem[]>;
  createMyChangeRequestItem(title: IMyChangeRequestItem): Promise<IMyChangeRequestItem[]>;
  updateMyChangeRequestItem(itemUpdated: IMyChangeRequestItem): Promise<IMyChangeRequestItem[]>;
}