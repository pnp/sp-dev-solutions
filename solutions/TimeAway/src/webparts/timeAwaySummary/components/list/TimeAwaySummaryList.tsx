// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as Update from 'immutability-helper';
import ITimeAwaySummaryListProps from './ITimeAwaySummaryListProps';
import TimeAwaySummaryDay from '../day/TimeAwaySummaryDay';
import { TimeAwaySummaryItem } from "../../models/TimeAwaySummaryItem";
import { List, FocusZone, FocusZoneDirection } from 'office-ui-fabric-react';
import styles from './TimeAwaySummaryList.module.scss';

export default class TimeAwaySummaryList extends React.Component<ITimeAwaySummaryListProps, any> {
  constructor(props: ITimeAwaySummaryListProps) {
    super(props);

    this.state = {
      items: []
    };
  }

  public componentWillReceiveProps(props: ITimeAwaySummaryListProps) {
    this._getTimeAwaySummaryList();
  }

  public componentDidMount() {
    this._getTimeAwaySummaryList();
  }

  public render() {
    let items: TimeAwaySummaryItem[] = this.state.items;
    let isEmpty: number = items == null ? 0 : (items.filter((item) => {
      return item.PersonNameArray.length !== 0;
    })).length;

    if (isEmpty > 0) {
      return (
        <FocusZone direction={FocusZoneDirection.vertical}>
          <List items={items}
            className={styles.list}
            onRenderCell={this._onRenderCell} />
        </FocusZone>
      );
    }
    else {
      return (
        <p>No one is away this week.</p>
      );
    }
  }

  private _onRenderCell(item: TimeAwaySummaryItem) {
    return (
      <TimeAwaySummaryDay item={item} />
    );
  }

  private _getTimeAwaySummaryList(): any {
    this.props.dataProvider.getTimeAwaySummaryList(this.props.weekType, this.props.phase, this.props.statusFilter).then(
      (items: TimeAwaySummaryItem[]) => {
        this.setState(Update(this.state, {
          items: {
            $set: items
          }
        }));
      });
  }
}