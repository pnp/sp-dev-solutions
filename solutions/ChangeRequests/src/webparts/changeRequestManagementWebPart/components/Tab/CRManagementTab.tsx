// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ICRManagementTabProps from './ICRManagementTabProps';
import { Pivot, PivotItem, PivotLinkSize, css } from 'office-ui-fabric-react';
import { CRMTab } from '../../models/CRManagementModel';
import styles from './CRManagementTab.module.scss';

export default class CRManagementTab extends React.Component<ICRManagementTabProps, {}> {

    constructor(props: ICRManagementTabProps) {
        super(props);
    }

    public render() {
        return (
            <div className={styles.crmanagementtab}>
                <Pivot linkSize={PivotLinkSize.large} onLinkClick={this._handleTabClick.bind(this)} selectedKey={`${this.props.selectedTab}`}>
                    <PivotItem linkText='Active Issues' itemKey={`${CRMTab.ActiveIssues}`}>

                    </PivotItem>
                    <PivotItem linkText='My Issues' itemKey={`${CRMTab.MyIssues}`}>

                    </PivotItem>
                    <PivotItem linkText='Closed Issues' itemKey={`${CRMTab.ClosedIssues}`}>

                    </PivotItem>
                </Pivot>
            </div>
        );
    }

    private _handleTabClick(item: PivotItem): void {
        if (this.props.selectedTab.toString() !== item.props.itemKey) {
            this.props.tabOperationClickCallback(Number(item.props.itemKey));
        }
    }
}