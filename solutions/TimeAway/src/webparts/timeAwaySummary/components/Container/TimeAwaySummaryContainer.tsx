// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as Update from 'immutability-helper';
import styles from './TimeAwaySummaryContainer.module.scss';

import * as ca from "../../../../libraries/solutions/SharePointUtility";
import ITimeAwaySummaryPagePros from './ITimeAwaySummaryContainerProps';
import TimeAwaySummaryWeek from '../week/TimeAwaySummaryWeek';
import TimeAwaySummaryList from '../list/TimeAwaySummaryList';
import { CommandButton, PrimaryButton } from 'office-ui-fabric-react';

import {
  TimeAwayManager,
  MyTimeAwayContainer,
  Constants,
  Phase
} from '../../../../libraries/index';

export default class TimeAwaySummaryContainer extends React.Component<ITimeAwaySummaryPagePros, any> {
  constructor(props: ITimeAwaySummaryPagePros) {
    super(props);
    const utility = ca.SharePointUtilityModule.SharePointUtility;
    
    this.state = {
      isShowtimeawaySummary: true,
      weekType: this.props.weekType,
      statusFilter: this.props.statusFilter,
      showMyTimeAwayLink: this.props.showMyTimeAwayLink,
      isHaveAdminPermission: utility.checkCurrentUserIsAbleToManageList(this.props.context),
      submitting: false,
      isInitialized: this.props.isInitialized
    };
  }

  public componentWillReceiveProps(props: ITimeAwaySummaryPagePros) {
    this.setState(Update(this.state, {
      weekType: {
        $set: props.weekType
      },
      statusFilter: {
        $set: props.statusFilter
      },
      showMyTimeAwayLink: {
        $set: props.showMyTimeAwayLink
      }
    }));
  }

  public render() {
    let { isShowtimeawaySummary, weekType, statusFilter, showMyTimeAwayLink, isHaveAdminPermission, isInitialized, submitting } = this.state;

    if (isInitialized) {
      return (
        <div className={styles.timeawaySummary}>
          {showMyTimeAwayLink ? (
            <div className={styles.page}>
              <CommandButton
                data-automation-id='ShowMyTimeAway'
                className={styles.timeAwayAction }
                text={isShowtimeawaySummary ? 'Edit Your Time Away' : 'Group Calendar'}
                onClick={this._showMyTimeAway.bind(this)} />

            </div>
          ) : null}
          { isShowtimeawaySummary ? (
            <div className={styles.summaryArea}>
              <div className={styles.row}>
                <TimeAwaySummaryWeek weekType={weekType} phase={Phase.ThisWeek} />
                <TimeAwaySummaryList weekType={weekType} phase={Phase.ThisWeek} dataProvider={this.props.dataProvider} statusFilter={statusFilter} />
              </div>
              <div className={styles.row}>
                <TimeAwaySummaryWeek weekType={weekType} phase={Phase.NextWeek} />
                <TimeAwaySummaryList weekType={weekType} phase={Phase.NextWeek} dataProvider={this.props.dataProvider} statusFilter={statusFilter} />
              </div>
            </div>
          ) : null}
          {
            isShowtimeawaySummary ? null : (
              <MyTimeAwayContainer dataProvider={this.props.myTimeAwaydataProvider} period={Constants.Default_TimePeriod} context={this.props.context} isInitialized={true} />
            )
          }
          { 
            this.props.displayMode != 1 ?
            <div className={styles.brandArea}>
              <a className={styles.brandContent} href="https://aka.ms/sppnpsolutions">
                <span className={styles.iconArea}><i className={`ms-Icon ms-Icon--SharepointLogo`} aria-hidden="true"></i></span>
                <span>SharePoint Patterns and Practices Community Solutions</span>
              </a>
            </div> : 
            <div></div> 
          }          
        </div>
      );
    }
    else {
      return (
        <div>
          {isHaveAdminPermission ? (
            <div className={styles.timeawaySummary}>
              <p className={styles.error}>The Time Away list is not fully configured in this site.</p>
              <PrimaryButton onClick={this._provisioningLists.bind(this)} text='Create Time Away list' disabled={submitting} />
            </div>
          ) : (
            <div className={styles.timeawaySummary}>
              <p className={styles.error}>Time Away is not configured yet.</p>
            </div>
          )}
        </div>
      );
    }
  }

  private _showMyTimeAway() {
    this.setState(Update(this.state, {
      isShowtimeawaySummary: { $set: !this.state.isShowtimeawaySummary }
    }));
  }

  private _provisioningLists(){
    var utility = ca.SharePointUtilityModule.SharePointUtility;
    this.setState(Update(this.state, {
      submitting: { $set: true }
    }));

    TimeAwayManager.ensureSPListTimeAway(this.props.context).then(() => {
      this.setState(Update(this.state, {
        isInitialized: { $set: true }
      }));
    });
  }
}