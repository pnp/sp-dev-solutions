import * as React from 'react';
import * as Update from 'immutability-helper';
import * as ca from "../../solutions/SharePointUtility";
import { CommandButton, Label, css, PrimaryButton } from 'office-ui-fabric-react';
import styles from './MyTimeAwayContainer.module.scss';
import { IMyTimeAwayContainerProps } from './IMyTimeAwayContainerProps';
import IMyTimeAwayContainerState from './IMyTimeAwayContainerState';
import MyTimeAwayTab from '../Tab/MyTimeAwayTab';
import DeleteDialog from '../DeleteDialog/MyTimeAwayDeleteDialog';
import TimeAwayCreateDialog from "../CreateDialog/TimeAwayCreateDialog";
import { IMyTimeAwayItem, TimeAwayDialogType, TimePeriod } from "../../models/timeAwayModel";
import { TimeAwayManager } from "../../index";

export class MyTimeAwayContainer extends React.Component<IMyTimeAwayContainerProps, IMyTimeAwayContainerState>{
  private _selectMyTimeAwayItem: IMyTimeAwayItem;

  constructor(props: IMyTimeAwayContainerProps) {
    const utility = ca.SharePointUtilityModule.SharePointUtility;

  super(props);
    this.state = {
      showDialogType: TimeAwayDialogType.Hidden,
      period: this.props.period,
      items: [],
      isHaveAdminPermission: utility.checkCurrentUserIsAbleToManageList(this.props.context),
      submitting: false,
      isInitialized: this.props.isInitialized
    };
  }

  //web part 5days change
  public componentWillReceiveProps(props: IMyTimeAwayContainerProps) {
    this.setState({ showDialogType: TimeAwayDialogType.Hidden });
    this._getMyTimeAwayItems();
  }

  public componentDidMount() {
    this._getMyTimeAwayItems();
  }

  public render() {
    let { isInitialized, isHaveAdminPermission, submitting } = this.state;
    const classBoldWeightFont: string = css(
      'ms-fontSize-l',
      'ms-fontWeight-semibold'
    );

    if (isInitialized) {
      return (
        <div className={styles.page}>
          <MyTimeAwayTab
            period={this.state.period}
            items={this.state.items}
            tabOperationClickCallback={this._tabOperationClickCallback.bind(this)}
            itemDeleteIconClickCallback={this._itemDeleteIconClickCallback.bind(this)}
            itemEditIconClickCallback={this._itemEditIconClickCallback.bind(this)}
          />
          <CommandButton
            data-automation-id='AddMyTimeAway'
            iconProps={{ iconName: 'Add' }}
            className={styles.addNewAction}
            text={'Add New Time Away'}
            onClick={this._addNewMyTimeAwayItemClick.bind(this)} />
          <DeleteDialog showDialog={this.state.showDialogType == TimeAwayDialogType.ConfirmDelete}
            itemDeleteConfirmOperationCallback={this._itemDeleteConfirmOperationCallback.bind(this)} />
          <TimeAwayCreateDialog item={this._selectMyTimeAwayItem}
            isOpen={this.state.showDialogType == TimeAwayDialogType.Create}
            itemSaveOperationCallback={this._itemSaveOperationCallback.bind(this)}
            itemValidOperationCallback={this._itemValidOperationCallback.bind(this)} />
        </div>
      );
    }
    else {
      return (
        <div>
          {isHaveAdminPermission ? (
            <div className={styles.page}>
              <p className={styles.error}>The Time Away list is not fully configured in this site.</p>
              <PrimaryButton onClick={this._provisioningLists.bind(this)} text='Create Time Away list' disabled={submitting} />
            </div>
          ) : (
              <div className={styles.error}>
                <p>Time Away is not configured yet.</p>
              </div>
            )}
        </div>
      );
    }
  }

  private _provisioningLists() {
    var utility = ca.SharePointUtilityModule.SharePointUtility;
    this.setState(Update(this.state, {
      submitting: { $set: true }
    }));

    TimeAwayManager.ensureSPListTimeAway(this.props.context)
      .then(() => {
        this.setState(Update(this.state, {
          isInitialized: { $set: true }
        }));
      });
  }

  //click edit icon call back to show edit dialog 
  private _itemEditIconClickCallback(item: IMyTimeAwayItem) {
    this._selectMyTimeAwayItem = item;
    this.setState({ showDialogType: TimeAwayDialogType.Create });
  }

  //click delete icon call back to show confirm dialog 
  private _itemDeleteIconClickCallback(item: IMyTimeAwayItem): void {
    this._selectMyTimeAwayItem = item;
    this.setState({ showDialogType: TimeAwayDialogType.ConfirmDelete });
  }

  //click add a new item button to show create dialog
  private _addNewMyTimeAwayItemClick(event: React.MouseEvent<HTMLButtonElement>) {
    this._selectMyTimeAwayItem = null;
    this.setState({ showDialogType: TimeAwayDialogType.Create });
    event.preventDefault();
  }

  //edite or create item callback from dialog to update provider item
  private _itemSaveOperationCallback(item: IMyTimeAwayItem): Promise<any> {
    if (item.id != null && item.id > 0) {
      return this.props.dataProvider.updateMyTimeAwayItem(item).then(
        (items: IMyTimeAwayItem[]) => {
          this._selectMyTimeAwayItem = item;
          this.setState({ items: items, showDialogType: TimeAwayDialogType.Hidden });
          return;
        });
    }
    else {
      return this.props.dataProvider.createMyTimeAwayItem(item).then(
        (items: IMyTimeAwayItem[]) => {
          this.setState({ items: items, showDialogType: TimeAwayDialogType.Hidden });
          return;
        });
    }

  }

  //Valid item is valid or not
  private _itemValidOperationCallback(item: IMyTimeAwayItem): Promise<Boolean> {
    return this.props.dataProvider.checkTimeSlot(item)
      .then((isValid: boolean) => {
        return Promise.resolve(isValid);
      });
  }


  //click yes, delete item
  private _itemDeleteConfirmOperationCallback(event: React.MouseEvent<HTMLButtonElement>): Promise<any> {
    return this.props.dataProvider.deleteMyTimeAwayItem(this._selectMyTimeAwayItem).then(
      (items: IMyTimeAwayItem[]) => {
        this.setState({ items: items, showDialogType: TimeAwayDialogType.Hidden });
      });
  }

  // select tab call back
  private _tabOperationClickCallback(period: TimePeriod): void {
    this.props.dataProvider.updatePeriod(period);
    this.props.dataProvider.getMyTimeAwayItems().then(
      (items: IMyTimeAwayItem[]) => {
        this.setState({ items: items, period: period, showDialogType: TimeAwayDialogType.Hidden });
      });
  }

  private _getMyTimeAwayItems(): any {
    if (this.props.isInitialized) {
      this.props.dataProvider.getMyTimeAwayItems().then(
        (items: IMyTimeAwayItem[]) => {
          this.setState({ items: items });
        });
    }
  }
}