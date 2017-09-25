// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as Update from 'immutability-helper';
import * as _ from "lodash";
import * as moment from 'moment';

import { ICRManagementListProps } from './ICRManagementListProps';
import { IChangeRequestManagementItem } from '../../models/CRManagementModel';
import { IPerson } from '../../../../libraries/models/ChangeRequestModel';
import { css, DetailsList, MarqueeSelection, SelectionMode, Selection, IColumn, CheckboxVisibility, ConstrainMode } from 'office-ui-fabric-react';
import styles from './CRManagementList.module.scss';

export default class CRManagementList extends React.Component<ICRManagementListProps, any> {
  private _selection: Selection;
  private _selectKey: string;

  constructor(props: ICRManagementListProps) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this._onSelectionChanged()
    });
    this._selectKey = undefined;

    this.state = {
      sortedItems: [],
      columns: [],
      sortColumnFieldName: "id",
      sorted: "desc"
    };
  }

  public componentWillReceiveProps(props: ICRManagementListProps) {
    this.setState(
      Update(this.state, {
        sortedItems: {
          $set: this._buildSortedItems(props.items, props.allUsers)
        },
        columns: {
          $set: this._buildColumns(props.isTriageTeamMember)
        },
        selectedItem: {
          $set: props.selectedItem
        }
      })
    );
  }

  public render(): React.ReactElement<ICRManagementListProps> {
    let { sortedItems, columns, sortColumnFieldName, sorted, selectedItem } = this.state;
    this._selectKey = selectedItem && selectedItem.critem ? selectedItem.critem.id : undefined;

    return (
      <DetailsList
        columns={columns}
        items={sortedItems}
        onColumnHeaderClick={this._onColumnClick.bind(this)}
        selectionMode={SelectionMode.single}
        selectionPreservedOnEmptyClick={true}
        constrainMode={ConstrainMode.unconstrained}
        className={styles.list}
        selection={this._selection}
        onDidUpdate={this._onDidUpdate.bind(this)}
      />
    );
  }

  private _onDidUpdate(detaiList: DetailsList) {
    if (detaiList.props.items.length > 0 && this._selectKey !== undefined) {
      this._selection.setKeySelected(this._selectKey, true, false);
    }
  }


  private _onColumnClick(ev: any, column: IColumn) {
    let { sortedItems, columns, isTriageTeamMember } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = _.orderBy(sortedItems, [column.fieldName], isSortedDescending ? ['desc'] : ['asc']);

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns.map(col => {
        col.isSorted = (col.key === column.key);

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      }),
      sortColumnFieldName: column.fieldName,
      sorted: isSortedDescending ? 'desc' : 'asc'
    });
  }

  private _buildColumns(isTriageTeamMember: boolean): IColumn[] {
    let columns: IColumn[] = [];
    columns.push({ key: "id", className: "", name: "ID", fieldName: "id", minWidth: 40, maxWidth: 40, isSortedDescending: true, isSorted: true } as IColumn);
    columns.push({ key: "title", name: "Title", fieldName: "title", minWidth: 150 } as IColumn);
    columns.push({ key: "status", name: "Status", fieldName: "status", minWidth: 90, maxWidth: 90 } as IColumn);
    if (isTriageTeamMember) {
      columns.push({ key: "assignedTo", name: "Assigned To", fieldName: "assignedTo", minWidth: 120, maxWidth: 120 } as IColumn);
      columns.push({ key: "priority", name: "Priority", fieldName: "priority", minWidth: 60, maxWidth: 60 } as IColumn);
    }
    columns.push({ key: "createdBy", name: "Created By", fieldName: "createdBy", minWidth: 120, maxWidth: 120 } as IColumn);
    columns.push({ key: "createdDate", name: "Created Date", fieldName: "createdDate", minWidth: 150, maxWidth: 150 } as IColumn);
    return columns;
  }

  private _buildSortedItems(items: IChangeRequestManagementItem[], allUsers: IPerson[]): Array<any> {
    let sortedItems: Array<any> = [];

    items.forEach((item: IChangeRequestManagementItem) => {
      let assignedto: IPerson = item.cditem && item.cditem.assignedto ? _.find(allUsers, ['id', item.cditem.assignedto]) : null;
      let createdBy: IPerson = item.critem.createdby ? _.find(allUsers, ['id', item.critem.createdby]) : null;

      sortedItems.push({
        key: item.critem.id,
        id: item.critem.id,
        title: item.critem.title,
        status: item.critem.status,
        assignedTo: assignedto ? assignedto.displayName : "",
        priority: item.cditem ? item.cditem.priority : "",
        createdBy: createdBy ? createdBy.displayName : "",
        createdDate: moment(item.critem.createddate).format('h:mm A, MMM Do YYYY')
      });
    });

    return _.orderBy(sortedItems, this.state.sortColumnFieldName, this.state.sorted);
  }

  private _onSelectionChanged() {
    let selectionCount = this._selection.getSelectedCount();
    if (selectionCount > 0 && (this._selection.getSelection()[0] as any).key != this._selectKey) {
      let selectItem = this._selection.getSelection()[0] as any;
      this.props.itemClickCallback(selectItem);
    }
  }
}