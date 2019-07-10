import * as React from 'react';
import { ILeadCardActionsProps } from ".";
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import styles from './LeadCardActions.module.scss';

export class LeadCardActions extends React.Component<ILeadCardActionsProps, {}> {
  private getPercentCompleteIconName(percentComplete: number): string {
    switch (percentComplete) {
      case 0:
        return 'CircleRing';
      case 100:
        return 'CircleFill';
      default:
        return 'CircleHalfFull';
    }
  }

  private getChangeIconName(change: number): string {
    if (change >= 0) {
      return 'StockUp';
    }
    else {
      return 'StockDown';
    }
  }

  public render(): React.ReactElement<ILeadCardActionsProps> {
    const { actions, percentComplete, change } = this.props;

    return (
      <div className={css('ms-DocumentCardActions', styles.actions)}>
        {actions &&
          actions.map((a, i) => <div className={css('ms-DocumentCardActions-action', styles.action)} key={i}>
            <IconButton {...a} />
          </div>)}
        <div className={styles.metrics}>
          <div className={css('ms-DocumentCardActions-views', styles.metric, styles.change, change >= 0 ? styles.up : styles.down)}>
            <Icon iconName={this.getChangeIconName(change)} /> {(change >= 0 ? '+' : '')}{change}%
          </div>
          <div className={css('ms-DocumentCardActions-views', styles.metric)}>
            <Icon iconName={this.getPercentCompleteIconName(percentComplete)} /> {percentComplete}%
          </div>
        </div>
      </div>
    );
  }
}