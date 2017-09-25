// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { TimeAwaySummaryItem } from "../models/TimeAwaySummaryItem";
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import * as _ from "lodash";
import { ITimeAwaySummaryDataProvider } from './ITimeAwaySummaryDataProvider';
import { ITimeAwaySummaryWebPartProps } from '../ITimeAwaySummaryWebPartProps';
import * as moment from 'moment';
import { IMyTimeAwayItem, ApprovalStatus } from "../../../libraries/models/timeAwayModel";
import {
    WeekType, Phase, MockTimeAwayList
} from '../../../libraries/index';


export default class MockTimeAwaySummaryDataProvider implements ITimeAwaySummaryDataProvider {

  private _webPartContext: IWebPartContext;

  constructor(webPartProps: ITimeAwaySummaryWebPartProps, webPartContext: IWebPartContext) {
     this.webPartContext = webPartContext;
  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  // will return caculated data for rendering in TimeawaySummary web part
  // parameters:
  // weektype: determine 5 days or 7 days
  // phase: determine this week or next week
  // statusFilter: determine if only show approved timeawayitems or not
  public getTimeAwaySummaryList(weekType: WeekType, phase: Phase, statusFilter: boolean): Promise<TimeAwaySummaryItem[]>{
    let results: TimeAwaySummaryItem[] = [];

    // get the first day according to weektype parameter and phase parameter
    const date: moment.Moment = this._getFirstDay(weekType, phase);
    let days: number = weekType === WeekType.FiveDays ? 5 : 7;
    let myTimeAwayItems: Array<IMyTimeAwayItem> = MockTimeAwayList.getMockTimeAwayListItems();
    let weekItems: Array<Array<IMyTimeAwayItem>> = [];
    let calculatorItems: Array<IMyTimeAwayItem> = [];

    // split all timeaway items to each day of the week
    // according to week type parameter to create 5 or 7 items in weekItems collection and then insert proper(start time < item < end time) items to each weekitem
    // sort by last name
    while (days-- > 0) {
      let start: Date = date.toDate();
      let end: Date = date.add(1, 'days').toDate();
      
      if (statusFilter){
        calculatorItems = _.orderBy(_.filter(myTimeAwayItems, (item) => {
          return item.status === ApprovalStatus.Approved && item.start < end && item.end > start;
        }), (item) => {
          return item.lastName;
        }, ['asc']);
      }
      else{
        calculatorItems = _.orderBy(_.filter(myTimeAwayItems, (item) => {
          return item.start < end && item.end > start;
        }), (item) => {
          return item.lastName;
        }, ['asc']);
      }

      weekItems.push(calculatorItems);
    }

    // handle time format and duration of time away
    // if duration > 8 hours while on duty, will show "All Day"
    weekItems.map((items: Array<IMyTimeAwayItem>, index: number) => {
      let day = this._getFirstDay(weekType, phase).add(index, 'days');
      let nextDay = this._getFirstDay(weekType, phase).add(index + 1, 'days');
      let timeAwaySummaryItem: TimeAwaySummaryItem = new TimeAwaySummaryItem();

      timeAwaySummaryItem.WeekDay = day.format('dddd');
      timeAwaySummaryItem.MonthDate = day.format('D');
      timeAwaySummaryItem.Month = day.format('MMM');
      timeAwaySummaryItem.PersonNameArray = items.map((item: IMyTimeAwayItem) => {
        let start1: moment.Moment =  moment(item.start);
        let end1: moment.Moment =  moment(item.end);
        let timestring: string = "";
        let current = day.clone();

        if (start1 <= day) {
          timestring = "(12:00am";
        }
        else{
          timestring ="(" + start1.format("h:mma");
        }

        if (end1 >= nextDay){
          timestring += " - 11:59pm)";
        }
        else{
          timestring += ` - ${end1.format("h:mma")})`;
        }
        
        if (moment.duration(end1.diff(start1)).asHours() >= 8 && moment.duration(end1.diff(current.hours(6))).asHours() >= 8){
          timestring = "(All Day)";
        }

        return item.firstName + ' ' + item.lastName + ' ' + timestring;
      });

      results.push(timeAwaySummaryItem);
    });
    
    return Promise.resolve(results);
  }

  //get first day, when weekType equal 5, the first day is Monday, and when weekType equal 7, the first day is saturday
  private _getFirstDay(weekType: WeekType, phase: Phase): moment.Moment {
    return moment().isoWeekday(phase === Phase.ThisWeek? 1 : 8).add(weekType === WeekType.FiveDays? 0 : -2, 'days').set({hour:0,minute:0,second:0});
  }
  
}