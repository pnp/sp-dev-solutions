import { IWebPartContext } from '@microsoft/sp-webpart-base';
import * as lodash from '@microsoft/sp-lodash-subset';
import * as moment from 'moment';
import { IMyTimeAwayDataProvider } from '../dataProviders/IMyTimeAwayDataProvider';
import { IMyTimeAwayItem, TimePeriod, WeekType } from "../models/timeAwayModel";
import { MockTimeAwayList } from './MockTimeAwayList';

export class MockDataProvider implements IMyTimeAwayDataProvider {
  private _webPartContext: IWebPartContext;
  private _weekType: WeekType;
  private _period: TimePeriod;

  constructor(value: IWebPartContext, listName: string, normalWeekToggleField: boolean, period: TimePeriod) {
    this.updateWeekType(normalWeekToggleField);
    this._period = period;
  }
  public updateWeekType(value: boolean) {
    this._weekType = value ? WeekType.FiveDays : WeekType.SevenDays;
  }

  public updatePeriod(value: TimePeriod) {
    this._period = value;
  }

  public getMyTimeAwayItems(): Promise<IMyTimeAwayItem[]> {
    let items = MockTimeAwayList.getMockTimeAwayListItems();
    let queryItems: IMyTimeAwayItem[];
    let condition: Date;

    if (this._period == TimePeriod.Current) {
      if (this._weekType == WeekType.FiveDays) {
        condition = moment().startOf('week').add(1, 'days').toDate();
      }
      else {
        condition = moment().startOf('week').subtract(1, 'days').toDate();
      }
      queryItems = lodash.clone(items.filter(item => item.start > condition || item.end > condition));
    }
    else {
      if (this._weekType == WeekType.FiveDays) {//5 days
        condition = moment().startOf('week').add(1, 'days').toDate();// thisMO
      }
      else {
        condition = moment.utc().startOf('week').subtract(1, 'days').toDate();// last saturday
      }
      queryItems = lodash.clone(items.filter(item => item.start < condition || item.end < condition));
    }
    return new Promise<IMyTimeAwayItem[]>((resolve) => {
      setTimeout(() => resolve(queryItems), 500);
    });
  }

  public createMyTimeAwayItem(item: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    MockTimeAwayList.createMockTimeAwayListItem(item);
    return this.getMyTimeAwayItems();
  }

  public updateMyTimeAwayItem(itemUpdated: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    if (MockTimeAwayList.updateMyTimeAwayItem(itemUpdated)) {
      return this.getMyTimeAwayItems();
    }
    else {
      return Promise.reject(new Error(`Item to update doesn't exist.`));
    }
  }

  public deleteMyTimeAwayItem(itemDeleted: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    MockTimeAwayList.deleteMyTimeAwayItem(itemDeleted);
    return this.getMyTimeAwayItems();
  }

  public checkTimeSlot(checkitem: IMyTimeAwayItem): Promise<boolean> {
    let items = MockTimeAwayList.getMockTimeAwayListItems();
    let queryItems: IMyTimeAwayItem[];

    if (checkitem.id != null && checkitem.id > 0) {
      queryItems = items.filter(item => checkitem.id !== item.id && checkitem.start < item.end && checkitem.end > item.start);
    }
    else {
      queryItems = items.filter(item => checkitem.start < item.end && checkitem.end > item.start);
    }
    return Promise.resolve(queryItems.length === 0);
  }
}
