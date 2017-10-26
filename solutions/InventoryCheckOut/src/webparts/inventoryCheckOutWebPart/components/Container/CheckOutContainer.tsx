// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { css, Label, PrimaryButton, DefaultButton, TextField, CommandButton } from 'office-ui-fabric-react';
import { SharePointUtilityModule } from '../../../../libraries/solutions/SharePointUtility';
import { ProvisionManager } from '../../provisioning/ProvisionManager';
import * as lodash from 'lodash';
import * as moment from 'moment';

import styles from './CheckOutContainer.module.scss';
import ICheckOutContainerProps from './ICheckOutContainerProps';
import { IInventoryItem, ICheckOut, DialogType, IPerson, CheckOutStatus } from "../../models/InventoryCheckOutModel";
import InventoryList from "../InventoryList/InventoryList";
import ItemDetail from '../ItemDetail/ItemDetail';
import InvNewDialog from "../InvNewDialog/InvNewDialog";
import DeleteInvDialog from '../DeleteInvDialog/DeleteInvDialog';
import CheckOutList from '../CheckOutList/CheckOutList';
import CheckInDialog from '../CheckInDialog/CheckInDialog';
import CheckOutNewDialog from '../CheckOutNewDialog/CheckOutNewDialog';

export default class MyCRContainer extends React.Component<ICheckOutContainerProps, any> {
  constructor(props: ICheckOutContainerProps) {
    super(props);
    this.state = {
      submitting: false,
      hasAdminPermission: SharePointUtilityModule.SharePointUtility.checkCurrentUserIsAbleToManageList(this.props.context),
      isInitialized: this.props.isInitialized,
      myCheckoutItems: [],
      myCheckoutItemsOriginal: [],
      allItems: [],
      allItemsOriginal: [],
      currentItem: null,
      currentCheckOuts: [],
      selectCheckOut: null,
      checkOutStatus: [],
      allUsers: [],
      showInventoryDetail: false,
      showDialogType: DialogType.Hidden,
      isNewInvForm: true,
      currentUser: null,
      available:0
    };
  }

  public componentDidMount() {
    if (this.props.isInitialized) {
      this._initData();
    }
  }

  public render(): JSX.Element {
    let { isInitialized, hasAdminPermission, submitting, myCheckoutItems,
      allItems, currentItem, showInventoryDetail } = this.state;
    if (isInitialized) {
      return (
        <div className={styles.inventorycheckout}>
          <div className={styles.topcontrol}>
            <div className={"ms-Grid"}>
              <div className={"ms-Grid-row"}>
                <div className={"ms-Grid-col ms-u-lg4"}>
                  <TextField onChanged={this._handleSearchChange.bind(this)} placeholder="Search"/>
                </div>
                <div className={"ms-Grid-col ms-u-lg4"}>
                  <DefaultButton text='New' onClick={this._handleNewInvClick.bind(this)} />
                </div>
              </div>
            </div>
          </div>

          { 
            !this.state.showInventoryDetail ?
              <div className={styles.leftpanelcontent}>
                <InventoryList myCheckoutItems={myCheckoutItems} allItems={allItems} onClickEvent={this._handleInventoryListItemClick.bind(this)} />
              </div> :
              <div>
                <ItemDetail currentItem={currentItem}
                  myOpenCheckOut={this.state.myOpenCheckOut}
                  onDeleteClickEvent={this._handleDeleteInvClick.bind(this)}
                  onBackClickEvent={this._handleBackClick.bind(this)}
                  onEditClickEvent={this._handleEditInvClick.bind(this)}
                  onCreateCheckOutClickEvent={this._handleCheckOutCreateButtonClick.bind(this)}
                  onCheckMyItemButtonClick={this._handleCheckMyItemButtonClick.bind(this)} available={this.state.available}/>
                  {
                    this.state.currentCheckOuts != null && this.state.currentCheckOuts.length > 0 ?
                  
                    <div className={styles.checkOutList}>
                      <CheckOutList checkouts={this.state.currentCheckOuts}                   
                        checkOutEditIconClickCallback={this._handleCheckOutEditButtonClick.bind(this)}
                        checkOutMarkconClickCallback={this._handleCheckOutMarkButtonClick.bind(this)} />
                    </div>
                    : ''
                  }
              </div>
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
          <DeleteInvDialog showDialog={this.state.showDialogType == DialogType.ConfirmDelete}
            itemDeleteConfirmOperationCallback={this._handleDeleteInvConfirmClick.bind(this)} title={currentItem ? currentItem.title : ""} />
          <InvNewDialog item={this.state.isNewInvForm == true ? null : currentItem} isOpen={this.state.showDialogType == DialogType.CreateInventoryItem}
            itemSaveOperationCallback={this._invItemSaveEditCallback.bind(this)} itemValidOperationCallback={null} isNew={this.state.isNewInvForm}
            itemCancelOperationCallback={this._itemCloseDialogCallback.bind(this)} location={this.props.location} />
          <CheckInDialog item={this.state.selectCheckOut}
            isOpen={this.state.showDialogType == DialogType.CheckIn}
            itemSaveOperationCallback={this._handleCheckOutSaveOperationCallback.bind(this)}
            itemCloseOperationCallback={this._itemCloseDialogCallback.bind(this)} parentTitle={this.state.currentItem ? this.state.currentItem.title : ''}
            currentUser={this.state.currentUser ? this.state.currentUser.displayName : ''}
          />
          <CheckOutNewDialog item={this.state.selectCheckOut}
            isOpen={this.state.showDialogType === DialogType.CreateCheckOut}
            statuses={this.state.checkOutStatus}
            users={this.state.allUsers}
            standardCheckoutLength={this.props.standardCheckoutLength}
            allowCheckoutIntheFuture={this.props.allowCheckoutIntheFuture}
            available={this.state.available}
            itemSaveOperationCallback={this._handleCheckOutSaveOperationCallback.bind(this)}
            itemCloseOperationCallback={this._itemCloseDialogCallback.bind(this)} />
        </div>

      );
    }
    else {
      return (
        <div className={styles.inventorycheckout}>
          {hasAdminPermission ? (
            <div className={styles.page}>
              <p className={styles.error}>The Change Request lists are not fully configured within this site.</p>
              <PrimaryButton text={'Create Inventory Item and Check-Out Lists'} onClick={this._provisioningLists.bind(this)} disabled={submitting} />
            </div>
          ) : (
              <div className={styles.error}>
                <p>Inventory lists are not configured yet.</p>
              </div>
            )}
        </div>
      );
    }
  }

  //provision list
  private _provisioningLists() {
    var utility = SharePointUtilityModule.SharePointUtility;
    this.setState({ submitting: true });
    ProvisionManager.siteProvisoning(this.props.context)
      .then(() => {
        this.setState({ isInitialized: true, submitting: false });
      });
  }
  //prepare init data
  private _initData() {
    let { currentUser, allItems, allItemsOriginal, myCheckoutItems, myCheckoutItemsOriginal, checkOutStatus, allUsers } = this.state;
    this.props.dataProvider.getCurrentUser().
      then((person: IPerson) => {
        currentUser = person;
        //get all inventory items
        return this.props.dataProvider.getAllInventoryItems().then(
          (items: IInventoryItem[]) => {
            return this.sortItemsByTitle(items);
          });
      })
      .then((allinventoryitems: IInventoryItem[]) => {
        allItems = allinventoryitems;
        allItemsOriginal = allinventoryitems;
        //get my checkout inventory items
        return this.props.dataProvider.getAllMyInventoryItems(currentUser.id).then(
          (myInventoryItems: IInventoryItem[]) => {
            return this.sortItemsByTitle(myInventoryItems);
          });
      })
      .then((myinventoryitems) => {
        myCheckoutItems = myinventoryitems;
        myCheckoutItemsOriginal = myinventoryitems;
        //get status field values
        return this.props.dataProvider.getCheckOutStatusField();
      })
      .then((status: string[]) => {
        checkOutStatus = status;
        //get all site users
        return this.props.dataProvider.getSiteUsers();
      })
      .then((users: IPerson[]) => {
        allUsers = users;
        return this.setState({ currentUser: currentUser, allItems: allItems, myCheckoutItems: myCheckoutItems, checkOutStatus: checkOutStatus, allUsers: allUsers, myCheckoutItemsOriginal: myCheckoutItems, allItemsOriginal: allItems });
      });

  }

  //get current check outs
  private _getCurrentCheckOuts(ivItemId: number): Promise<any> {
    let currentCheckOuts = [];
    return this.props.dataProvider
      .getCheckOutsByInventory(ivItemId)
      .then((checkouts: ICheckOut[]) => {
        currentCheckOuts = checkouts;
        return this._getMyOpenCheckOut(checkouts);
      })
      .then((myopencheckout: ICheckOut) => {
        let available = this._getAvailableCount(currentCheckOuts);
        return this.setState({ currentCheckOuts: currentCheckOuts, myOpenCheckOut: myopencheckout, available:available });
      });
  }

private _getAvailableCount(checkouts: ICheckOut[]): number {
    let myCheckOut: ICheckOut;
    let filterChekouts: ICheckOut[] = lodash.filter(checkouts, (checkoutitem: ICheckOut) => {
      let checkedOutDate = moment(checkoutitem.checkedOutDate);
      let nowDate = moment();
      return checkedOutDate < nowDate;
    });
    if(this.state.currentItem){
      let count = 0;
       lodash.forEach(filterChekouts,(checkout)=>{
          count +=checkout.quantity;
       });
        let result = this.state.currentItem.totalQuantity -  count;
        return result>0?result:0;
    }else{
      return 0;
    }
}

  private _handleKeyPress(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'Enter') {
      event.preventDefault();
      return;
    }
  }
  //hand event
  private _handleSearchChange(eventValue) {

    this.hideDialog();

    let filter = lodash.toLower(eventValue);

    if (filter.length > 0) {
      let myCheckoutItems = [];
      let count = this.state.myCheckoutItemsOriginal.length;
      for (var i = 0; i < count; i++) {
        if (lodash.toLower(this.state.myCheckoutItemsOriginal[i].title).indexOf(filter) >= 0) {
          myCheckoutItems.push(this.state.myCheckoutItemsOriginal[i]);
        }
      }
      let allItems = [];
      count = this.state.allItemsOriginal.length;

      for (var j = 0; j < count; j++) {
        if (lodash.toLower(this.state.allItemsOriginal[j].title).indexOf(filter) >= 0) {
          allItems.push(this.state.allItemsOriginal[j]);
        }
      }

      this.setState({ myCheckoutItems: myCheckoutItems, allItems: allItems });
    } else {
      this.setState({ myCheckoutItems: this.state.myCheckoutItemsOriginal, allItems: this.state.allItemsOriginal });
    }
  }

  //inventory item list item click
  private _handleInventoryListItemClick(id) {
    if (id) {
      let item = lodash.filter(this.state.allItems, ['id', parseInt(id)]);
      if (item && item.length > 0) {
        this.setState({ currentItem: item[0], showInventoryDetail: true }, () => {
          this._getCurrentCheckOuts(this.state.currentItem.id);
        });
      }
    }
  }

  // create inventory item button click
  private _handleNewInvClick(e) {
    this.setState({
      isNewInvForm: true,
      showDialogType: DialogType.CreateInventoryItem
    });
  }
  // edit inventory item button click
  private _handleBackClick(item: IInventoryItem) {
    this.setState({
      showInventoryDetail: false,
      currentItem: item
    });
  }
  // edit inventory item button click
  private _handleEditInvClick(item: IInventoryItem) {
    this.setState({
      isNewInvForm: false,
      showDialogType: DialogType.CreateInventoryItem,
      currentItem: item
    });
  }
  // delete inventory item button click
  private _handleDeleteInvClick() {
    this.hideDialog();
    this.setState({
      showDialogType: DialogType.ConfirmDelete
    });

  }

  private _handleDeleteInvConfirmClick() {
    this.setState({
      showDialogType: DialogType.Hidden,
      showInventoryDetail: false
    });
    let itemToDelete = this.state.currentItem;
    this.props.dataProvider.deleteInventoryItem(itemToDelete).then((bsuccess: boolean) => {
      if (bsuccess) {
        let items = lodash.clone(this.state.allItems);
        items = lodash.remove(items, (item) => {
          return item["id"] != itemToDelete.id;
        });
        
        let itemsOriginal = lodash.clone(this.state.allItems);
        itemsOriginal = lodash.remove(items, (item) => {
          return item["id"] != itemToDelete.id;
        });

        this.setState({ showDialogType: DialogType.Hidden, allItems: this.sortItemsByTitle(items), allItemsOriginal: this.sortItemsByTitle(itemsOriginal) });
      }
      else {
        alert("Delete failed!");
      }
    });

  }

  //create check out button click
  private _handleCheckOutCreateButtonClick(item: IInventoryItem) {
    this.setState({ showDialogType: DialogType.CreateCheckOut, selectCheckOut: { id: 0, itemId: item.id } });
  }

  // check Check my item inbutton click
  private _handleCheckMyItemButtonClick(checkout: ICheckOut) {
    this.setState({ showDialogType: DialogType.CheckIn, selectCheckOut: checkout });
  }

  //check out list edit button click
  private _handleCheckOutEditButtonClick(checkout: ICheckOut) {
    this.setState({ showDialogType: DialogType.CreateCheckOut, selectCheckOut: checkout });
  }
  //check out list mark click=>show check in dialog
  //checkOutMarkconClickCallback
  private _handleCheckOutMarkButtonClick(checkout: ICheckOut) {
    this.setState({ showDialogType: DialogType.CheckIn, selectCheckOut: checkout });
  }

  // create/edit check out
  private _handleCheckOutSaveOperationCallback(checkout: ICheckOut): Promise<any> {
    return this.props.dataProvider.createAdnUpdateCheckOutItem(checkout).then((retCheckOut) => {
      return this._getCurrentCheckOuts(checkout.itemId).then(() => {
        let {myCheckoutItems } = this.state;
        let currentUser = this.state.currentUser;
        this.props.dataProvider.getAllMyInventoryItems(currentUser.id)    
        .then((myinventoryitems) => {        
          return  this.setState({ myCheckoutItems: myinventoryitems,  myCheckoutItemsOriginal: myinventoryitems });    
        });
        this.hideDialog();
      });
    });
  }


  //close dialog
  private _itemCloseDialogCallback() {
    this.hideDialog();
  }

  //create/edit an new inventory item
  private _invItemSaveEditCallback(invItem) {
    let items = this.state.allItems;
    let itemsOrig = this.state.allItemsOriginal;

    if (invItem.id != 0) {
      //Edit an item.
      this.props.dataProvider.updateInventoryItem(invItem).then((item: IInventoryItem) => {
        invItem = item;
        items = lodash.remove(items,
        (removeitem) => {
          return removeitem["id"] != invItem.id;
        });
        itemsOrig = lodash.remove(itemsOrig,
        (removeitem) => {
          return removeitem["id"] != invItem.id;
        });
      items.push(invItem);
      itemsOrig.push(invItem);
      items = this.sortItemsByTitle(items);
      itemsOrig = this.sortItemsByTitle(itemsOrig);
      this.setState({ showDialogType: DialogType.Hidden, allItems: items,allItemsOriginal: itemsOrig,currentItem: invItem });
      });
    }
    else {
      //Create a new item.
      this.props.dataProvider.createInventoryItem(invItem).then((item: IInventoryItem) => {
        items.push(item);
        items = this.sortItemsByTitle(items);
        itemsOrig.push(item);
        itemsOrig = this.sortItemsByTitle(itemsOrig);
        this.setState({ showDialogType: DialogType.Hidden, allItemsOriginal: itemsOrig, allItems: items });
      });
    }
  }

  private hideDialog() {
    this.setState({
      showDialogType: DialogType.Hidden
    });
  }

  private sortItemsByTitle(items) {
    return lodash.orderBy(items, ['title'], ['asc']);
  }
  private _getMyOpenCheckOut(checkouts: ICheckOut[]): Promise<ICheckOut> {
    let myCheckOut: ICheckOut;
    let filterChekouts: ICheckOut[] = lodash.filter(checkouts, (checkoutitem: ICheckOut) => {
      let checkedOutDate = moment(checkoutitem.checkedOutDate);
      let nowDate = moment();
      return checkedOutDate < nowDate
        && checkoutitem.status != CheckOutStatus.Closed
        && checkoutitem.checkedOutTo != null
        && checkoutitem.checkedOutTo.id == this.state.currentUser.id;
    });
    if (filterChekouts.length > 0) {
      lodash.orderBy(filterChekouts, ['id'], ['asc']);
      myCheckOut = filterChekouts[0];
    }
    return Promise.resolve(myCheckOut);
  }
}
