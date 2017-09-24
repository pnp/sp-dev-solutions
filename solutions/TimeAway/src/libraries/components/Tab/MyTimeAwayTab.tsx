import * as React from 'react';
import { TimePeriod } from "../../models/timeAwayModel";
import IMyTimeAwayTabProps from './IMyTimeAwayTabProps';
import { Pivot, PivotItem, PivotLinkSize, css } from 'office-ui-fabric-react';
import MyTimeAwayList from '../List/MyTimeAwayList';


export default class MyTimeAwayTab extends React.Component<IMyTimeAwayTabProps, {}> {

  constructor(props: IMyTimeAwayTabProps) {
    super(props);
  }

  public render() {
    return (
      <Pivot linkSize={PivotLinkSize.large} onLinkClick={this._handleTabClick.bind(this)} selectedKey={`${this.props.period}`}>
        <PivotItem linkText='Current and Upcoming' itemKey={`${TimePeriod.Current}`}>
          <MyTimeAwayList
            items={this.props.period == TimePeriod.Current ? this.props.items : []}
            itemDeleteIconClickCallback={this.props.itemDeleteIconClickCallback}
            itemEditIconClickCallback = {this.props.itemEditIconClickCallback}
          />
        </PivotItem>
        <PivotItem linkText='Previous' itemKey={`${TimePeriod.Previous}`}>
          <MyTimeAwayList items={this.props.period == TimePeriod.Previous ? this.props.items : []}
            itemDeleteIconClickCallback={this.props.itemDeleteIconClickCallback}
            itemEditIconClickCallback = {this.props.itemEditIconClickCallback}
          />
        </PivotItem>
      </Pivot>
    );
  }
  
  private _handleTabClick(item: PivotItem): void {
    const selectTab: TimePeriod = (item.props.itemKey == `${TimePeriod.Current}` ? TimePeriod.Current : TimePeriod.Previous);
    if (selectTab != this.props.period) {
      this.props.tabOperationClickCallback(selectTab);
    }
  }
}