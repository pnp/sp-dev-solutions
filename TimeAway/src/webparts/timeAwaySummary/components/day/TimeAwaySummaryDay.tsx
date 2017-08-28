import * as React from 'react';
import ITimeAwaySummaryDayProps from "./ITimeAwaySummaryDayProps";
import styles from './TimeAwaySummaryDay.module.scss';

export default class TimeAwaySummaryDay extends React.Component<ITimeAwaySummaryDayProps, any> {
  constructor(props: ITimeAwaySummaryDayProps){
    super(props);

    this.state = { 
      WeekDay: props.item.WeekDay,
      MonthDate: props.item.MonthDate,
      PersonNameArray: props.item.PersonNameArray
    };
  }

  public componentWillReceiveProps(props: ITimeAwaySummaryDayProps) {
    this.setState({ 
      WeekDay: props.item.WeekDay,
      MonthDate: props.item.MonthDate,
      PersonNameArray: props.item.PersonNameArray
    });
  }

  public render(){
    let { WeekDay, MonthDate, PersonNameArray } = this.state;

    if (this.props.item.PersonNameArray.length === 0)
      return(null);
    else
      return(
          <div className={ styles.timeawaySummaryDay }>
            <div className={ styles.day }>
              <div className= { styles.timeawayCalendarBox}>
                <div className={styles.timeawayDayOfWeek}>{WeekDay}</div>
                <div className={styles.timeawayDayNumber}>{MonthDate}</div> 
              </div>
            </div>
            <div className={ styles.description }>{PersonNameArray.join(', ')}</div>
          </div>
      );
  }
}