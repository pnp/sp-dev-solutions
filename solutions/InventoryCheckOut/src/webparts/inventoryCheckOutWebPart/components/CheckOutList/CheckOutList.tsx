// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { css, Label, PrimaryButton, CommandButton, FocusZone, FocusZoneDirection, List } from 'office-ui-fabric-react';
import { ICheckOut } from "../../models/InventoryCheckOutModel";
import styles from './CheckOutList.module.scss';
import ICheckOutListProps from './ICheckOutListProps';
import CheckOutListItem from '../CheckOutListItem/CheckOutListItem';

export default class CheckOutList extends React.Component<ICheckOutListProps, any> {
    constructor(props: ICheckOutListProps) {
        super(props);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    public render(): JSX.Element {
        const mycrheadergrid = css('ms-Grid', styles.chekoutList);
        return (
            <div className={styles.chekoutList}>
                <div className={styles.gridheader}>
                    <div className={`ms-Grid-row ${styles.gridheadertitle}`}>
                        <div className={`ms-Grid-col ${styles.gridheadercol} ms-u-lg4`}>Checked Out To</div>
                        <div className={`ms-Grid-col ${styles.gridheadercol} ms-u-lg6`}>Checked Out</div>
                        <div className={`ms-Grid-col ${styles.gridheaderendcol} ms-u-lg2`}>Actions</div>
                    </div>
                </div>
                <List items={this.props.checkouts}
                    onRenderCell={this._onRenderCell} />
            </div>
        );
    }

    private _onRenderCell(item: ICheckOut, index: number) {
        return (
            <CheckOutListItem key={item.id}
                item={item}
                onEdit={this.props.checkOutEditIconClickCallback} 
                onCheckIn = {this.props.checkOutMarkconClickCallback} />
        );
    }
}
