import * as React from 'react';
import { css, Label, PrimaryButton, CommandButton } from 'office-ui-fabric-react';
import { SharePointUtilityModule as ca } from '../../../../libraries/solutions/SharePointUtility';
import {  ProvisionManager as ProvisionManager, IMyChangeRequestItem, ChangeRequestStatus } from '../../../../libraries/index';
import styles from './MyCRContainer.module.scss';

import IMyCRContainerProps from './IMyCRContainerProps';
import IMyCRContainerState from './IMyCRContainerState';

import MyCRList from '../List/MyCRList';
import MyCRNewForm from '../NewForm/MyCRNewForm';
import MyCRNewDialog from '../NewDialog/MyCRNewDialog';
import { NewCRDialogShowType, NewCRDisplays, NewCRFormShowIn } from '../../models/MyCRModel';

export default class MyCRContainer extends React.Component<IMyCRContainerProps, IMyCRContainerState> {
  private _selectMyCRListItem: IMyChangeRequestItem;

  constructor(props: IMyCRContainerProps) {
    super(props);
    this.state = {
      submitting: false,
      hasAdminPermission: ca.SharePointUtility.checkCurrentUserIsAbleToManageList(this.props.context),
      newCRDialogShowType: NewCRDialogShowType.Closed,
      isInitialized: this.props.isInitialized,
      items: []
    };

  }
  public componentWillReceiveProps(props: IMyCRContainerProps) {
    this._getMyCRRequestItems();
  }

  public componentDidMount() {
    this._getMyCRRequestItems();
  }

  public render(): JSX.Element {
    let { isInitialized, hasAdminPermission, submitting } = this.state;
    if (isInitialized) {
      return (
        <div className={styles.mychangerequest}>
          <div hidden={this.props.newcrdisplays == `${NewCRDisplays.Inline}`}>
            <Label >{this.props.newcrtext}</Label>
          </div>
          <div className={styles.primaryButtonArea} hidden={this.props.newcrdisplays == `${NewCRDisplays.Inline}`}>
            <PrimaryButton
              className={styles.createnewchangerequestbt}
              data-automation-id='CreateNewChangeRequest'
              text={this.props.newcrbuttontext}
              disabled={ false }
              onClick={this._createNewChangeRequestClick.bind(this)} />
          </div>
          <MyCRNewForm
            showIn={NewCRFormShowIn.Inline}
            isOpen={this.props.newcrdisplays == `${NewCRDisplays.Inline}`}
            newcrtext={this.props.newcrtext}
            newcrbuttontext={this.props.newcrbuttontext}
            item={this._getMyCRRequestInitItem()}
            newcrsubmissiontext={this.props.newcrsubmissiontext}
            itemSaveOperationCallback={this._itemSaveOperationCallback.bind(this)} />
          <MyCRList items={this.state.items} itemEditIconClickCallback={this._itemEditClickCallback.bind(this)} />
          <MyCRNewDialog
            newcrtext={this.props.newcrtext}
            item={this._selectMyCRListItem}
            isOpen={this.state.newCRDialogShowType == NewCRDialogShowType.Dialog}
            newcrsubmissiontext={this.props.newcrsubmissiontext}
            newcrbuttontext={this.props.newcrbuttontext}
            itemSaveOperationCallback={this._itemSaveOperationCallback.bind(this)}
            itemCloseOperationCallback={this._itemCloseDialogCallback.bind(this)}
          />
        </div>
      );
    }
    else {
      return (
        <div className={styles.mychangerequest}>
          {hasAdminPermission ? (
            <div className={styles.page}>
              <p className={styles.error}>The Change Request lists are not fully configured within this site.</p>
              <PrimaryButton text='Create Change Request and Change Request Discussion Lists' onClick={this._provisioningLists.bind(this)} disabled={submitting} />
            </div>
          ) : (
              <div className={styles.error}>
                { 
                  this.state.hasAdminPermission ?
                    <p>Change Request lists are not configured yet.</p>
                    :
                    <p>Change Request lists are not configured yet, or you may not have permissions to view them.</p>
                }                    
              </div>
            )}
        </div>
      );
    }
  }
  private _provisioningLists() {
    var utility = ca.SharePointUtility;
    this.setState({ submitting: true });
    ProvisionManager.siteProvisoning(this.props.context)
      .then(() => {
        this.setState({ isInitialized: true, submitting: false });
      });
  }

  private _createNewChangeRequestClick() {
    this._selectMyCRListItem = this._getMyCRRequestInitItem();
    this.setState({ newCRDialogShowType: NewCRDialogShowType.Dialog });
  }
  //edit or create item callback from dialog to update provider item
  private _itemSaveOperationCallback(item: IMyChangeRequestItem): Promise<any> {
    if (item.id != null && item.id > 0) {
      return this.props.dataProvider.updateMyChangeRequestItem(item).then(
        (items: IMyChangeRequestItem[]) => {
          this.setState({ items: items });
          return;
        });
    }
    else {
      return this.props.dataProvider.createMyChangeRequestItem(item).then(
        (items: IMyChangeRequestItem[]) => {
          this.setState({ items: items });
          return;
        });
    }
  }

  private _itemCloseDialogCallback() {
    this.setState({ newCRDialogShowType: NewCRDialogShowType.Closed });
  }
  private _itemEditClickCallback(item: IMyChangeRequestItem) {
    this._selectMyCRListItem = item;
    this.setState({ newCRDialogShowType: NewCRDialogShowType.Dialog });
  }

  private _getMyCRRequestItems(): Promise<any> {
    if (this.props.isInitialized) {
      {
        return this.props.dataProvider.getMyChangeRequestItems().then(
          (items: IMyChangeRequestItem[]) => {
            this.setState({ items: items });
          });
      }
    }
  }

  private _getMyCRRequestInitItem() {
    return { title: "", description: "", id: 0, status: ChangeRequestStatus.Open };
  }
}
