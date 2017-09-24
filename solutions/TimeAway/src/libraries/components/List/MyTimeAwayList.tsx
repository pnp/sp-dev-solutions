import * as React from 'react';
import { List, FocusZone, FocusZoneDirection } from 'office-ui-fabric-react';
import IMyTimeAwayListProps from './IMyTimeAwayListProps';
import { IMyTimeAwayItem } from "../../models/timeAwayModel";
import MyTimeAwayListItem from '../ListItem/MyTimeAwayListItem';
import styles from './MyTimeAwayList.module.scss';

export default class MyTimeAwayList extends React.Component<IMyTimeAwayListProps, {}> {
  constructor(props: IMyTimeAwayListProps) {
    super(props);
    this._onRenderCell = this._onRenderCell.bind(this);
  }


  public render(): JSX.Element {
    const timeList = this.props.items;
    return (
      <div className={styles.mytimeawaylist} >
        <List items={this.props.items}
          onRenderCell={this._onRenderCell} />
      </div>
    );
  }

  private _onRenderCell(item: IMyTimeAwayItem, index: number) {
    return (
      <MyTimeAwayListItem key={item.id} item={item} 
      itemDeleteIconClickCallback = {this.props.itemDeleteIconClickCallback}
      itemEditIconClickCallback = {this.props.itemEditIconClickCallback}
      />
    );
  }
}