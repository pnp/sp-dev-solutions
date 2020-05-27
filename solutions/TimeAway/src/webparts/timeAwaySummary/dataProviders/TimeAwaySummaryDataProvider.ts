// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {TimeAwaySummaryItem} from "../models/TimeAwaySummaryItem";
import {ITimeAwaySummaryDataProvider} from './ITimeAwaySummaryDataProvider';
import * as moment from 'moment';
import {
    WeekType, Phase, Constants
} from '../../../libraries/index';
import { sp } from "../../../pnp-preset";

export default class TimeAwaySummaryDataProvider implements ITimeAwaySummaryDataProvider {
  // will return calculated data for rendering in TimeawaySummary web part
  // parameters:
  // weektype: determine 5 days or 7 days
  // phase: determine this week or next week
  // statusFilter: determine if only show approved timeawayitems or not
  public getTimeAwaySummaryList(weekType: WeekType, phase: Phase, statusFilter: boolean): Promise<TimeAwaySummaryItem[]> {
    const promise: Array<Promise<any>> = [];
    const date: moment.Moment = this._getFirstDay(weekType, phase);
    let days: number = weekType === WeekType.FiveDays ? 5 : 7;

    // split all timeaway items to each day of the week
    // according to week type parameter to create 5 or 7 items in weekItems collection and then insert proper(start time < item < end time) items to each weekitem
    // sort by last name
    while(days-- > 0){
      let start: Date = date.toDate();
      let end: Date = date.add(1, 'days').toDate();

      const filter: string = statusFilter ?
      `OData__ModerationStatus eq 'Approved' and Start lt '${end.toJSON()}' and End gt '${start.toJSON()}'` :
      `Start lt '${end.toJSON()}' and End gt '${start.toJSON()}'`;
      promise.push(sp.web
        .lists.getByTitle(Constants.TimeAwayListTitle)
        .items
        .select('First_x0020_Name', 'Last_x0020_Name', 'Start', 'End')
        .filter(filter)
        .orderBy('Last_x0020_Name')
        .get());
    }

    // handle time format and duration of time away
    // if duration > 8 hours while on duty, will show "All Day"
    return Promise
      .all(promise)
      .then((responses: Array<any>) => {
        return responses.map((response: any[], index: number) => {
          let day = this._getFirstDay(weekType, phase).add(index, 'days');
          let nextDay = this._getFirstDay(weekType, phase).add(index + 1, 'days');
          return {
            WeekDay : day.format('dddd'),
            MonthDate : day.format('D'),
            Month : day.format('MMM'),
            PersonNameArray : response.map((item: any) => {
              let start: moment.Moment =  moment(item.Start);
              let end: moment.Moment =  moment(item.End);
              let timestring: string = "";
              let current = day.clone();

              if (start <= day) {
                timestring = "(12:00am";
              }
              else{
                timestring ="(" + start.format("h:mma");
              }

              if (end >= nextDay){
                timestring += " - 11:59pm)";
              }
              else{
                timestring += ` - ${end.format("h:mma")})`;
              }
              
              if (moment.duration(end.diff(start)).asHours() >= 8 && moment.duration(end.diff(current.hours(6))).asHours() >= 8){
                timestring = "(All Day)";
              }

              return item.First_x0020_Name + ' ' + item.Last_x0020_Name + ' ' + timestring;
            })
          } as TimeAwaySummaryItem;
        });
      });
  }

  //get first day, when weekType equal 5, the first day is Monday, and when weekType equal 7, the first day is saturday
  private _getFirstDay(weekType: WeekType, phase: Phase): moment.Moment {
    return moment().isoWeekday(phase === Phase.ThisWeek? 1 : 8).add(weekType === WeekType.FiveDays? 0 : -2, 'days').set({hour:0,minute:0,second:0});
  }
}