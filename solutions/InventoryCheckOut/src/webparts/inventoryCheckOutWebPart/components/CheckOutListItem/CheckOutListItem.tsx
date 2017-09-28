// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import {
  css,
  Checkbox,
  Button,
  ButtonType
} from 'office-ui-fabric-react';
import styles from './CheckOutListItem.module.scss';
import { ICheckOut } from '../../models/InventoryCheckOutModel';
import ICheckOutListItemProps from './ICheckOutListItemProps';
import * as moment from 'moment';

export default class CheckOutListItem extends React.Component<ICheckOutListItemProps, {}> {

  constructor(props: ICheckOutListItemProps) {
    super(props);

    this._handleCheckIn = this._handleCheckIn.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
  }

  public shouldComponentUpdate(newProps: ICheckOutListItemProps): boolean {
    return this.props.item !== newProps.item;
  }

  public render(): JSX.Element {
    const checkoutgridrow = css('ms-Grid-row', styles.checkoutgridrow);
    const checkoutgridLabel = css('ms-Label', styles.checkoutgridLabel);
    const btcol = css('ms-Grid-col ms-u-lg2', styles.btcol);
    const item: ICheckOut = this.props.item;
    return (
      <div className={checkoutgridrow}>
        <div className={`ms-Grid-col ${styles.itemcell} ms-u-lg4`}>
          <span className={checkoutgridLabel}>{
            item.quantity > 1 ?
              `${item.checkedOutTo.displayName} (${item.quantity})` : `${item.checkedOutTo.displayName}`}</span>
        </div>
        <div className={`ms-Grid-col ${styles.itemcell} ms-u-lg6`}>
          <span className={checkoutgridLabel}>{moment(item.checkedOutDate).format("M/D/YYYY")}</span>
        </div>
        <div className={btcol}>
          <div className={styles.buttonArea}>
            <Button buttonType={ButtonType.icon} icon='CheckMark' onClick={this._handleCheckIn}/>
            <Button buttonType={ButtonType.icon} icon='Edit' onClick={this._handleEdit}/>
          </div>
        </div>
      </div>
    );
  }

  private _handleEdit(ev: React.MouseEvent<HTMLButtonElement>): void {
    this.props.onEdit(this.props.item);
  }

  private _handleCheckIn(event: React.MouseEvent<HTMLButtonElement>) {
    this.props.onCheckIn(this.props.item);
  }
}