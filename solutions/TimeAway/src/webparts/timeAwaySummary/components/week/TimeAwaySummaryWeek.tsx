// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ITimeAwaySummaryWeekProps from './ITimeAwaySummaryWeekProps';
import * as moment from 'moment';
import { Label } from 'office-ui-fabric-react';
import {
    WeekType, Phase
} from '../../../../libraries/index';

export default class TimeAwaySummaryWeek extends React.Component<ITimeAwaySummaryWeekProps, any> {
  constructor(props: ITimeAwaySummaryWeekProps){
    super(props);

    this.state= {
      weekString: this._getWeekString(props.weekType, props.phase)
    };
  }

  public componentWillReceiveProps(props: ITimeAwaySummaryWeekProps) {
    this.setState({
      weekString: this._getWeekString(props.weekType, props.phase)
    });
  }
  
  private _getFirstDay(weekType: WeekType, phase: Phase): moment.Moment {
    return moment().isoWeekday(phase === Phase.ThisWeek? 1 : 8).add(weekType === WeekType.FiveDays? 0 : -2, 'days').set({hour:0,minute:0,second:0});
  }

  private _getWeekString(weekType: WeekType, phase: Phase){
    let days: number = weekType  === WeekType.FiveDays ? 4 : 6;
    let firstDay: moment.Moment = this._getFirstDay(weekType, phase);
    let lastDay: moment.Moment = firstDay.clone().add(days, 'days').set({hour:23,minute:59,second:59});

    if (phase === Phase.ThisWeek) {
      return `Out of Office - This Week (${firstDay.format('M/DD')}-${lastDay.format('M/DD')})`;

    }
    else {
      return `Out of Office - Next Week (${firstDay.format('M/DD')}-${lastDay.format('M/DD')})`;
    }
  }

  public render(){
    let weekString = this.state.weekString;
    return (
      <div>
          <Label className={"ms-fontWeight-semibold"}>{weekString}</Label>
      </div>
    );
  }
}