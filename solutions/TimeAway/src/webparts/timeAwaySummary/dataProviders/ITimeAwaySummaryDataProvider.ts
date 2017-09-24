import { IWebPartContext } from '@microsoft/sp-webpart-base';
import {TimeAwaySummaryItem} from "../models/TimeAwaySummaryItem";
import {
    WeekType, Phase
} from '../../../libraries/index';

export interface ITimeAwaySummaryDataProvider {
  getTimeAwaySummaryList(weekType: WeekType, phase: Phase, statusFilter: boolean): Promise<TimeAwaySummaryItem[]>;
  webPartContext: IWebPartContext;
}
