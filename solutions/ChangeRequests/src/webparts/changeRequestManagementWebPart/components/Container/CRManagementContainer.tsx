// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as Update from 'immutability-helper';
import { css, Label, PrimaryButton, CommandButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';

import { Modal } from 'office-ui-fabric-react/lib/Modal';
import * as _ from "lodash";
import { SharePointUtilityModule as ca } from '../../../../libraries/solutions/SharePointUtility';
import { ProvisionManager } from '../../../../libraries/index';
import { CRMTab, IChangeRequestManagementItem } from '../../models/CRManagementModel';
import { ICRManagementContainerProps } from './ICRManagementContainerProps';
import ICRManagementContainerState from './ICRManagementContainerState';
import CRManagementTab from '../Tab/CRManagementTab';
import CRManagementList from '../List/CRManagementList';
import CRManagementPublicSection from "../PublicSection/CRManagementPublicSection";
import CRManagementTeamSection from "../TeamSection/CRManagementTeamSection";
import { IPerson, IMyChangeRequestItem, IChangeDiscussionItem } from '../../../../libraries/index';
import styles from './CRManagementContainer.module.scss';

export default class ChangeRequestManagementContainer extends React.Component<ICRManagementContainerProps, ICRManagementContainerState> {
  private _currentClickedItem: any;
  private _tempCRItem: IMyChangeRequestItem;
  private _tempCDItem: IChangeDiscussionItem;
  private _isEdit: boolean;

  constructor(props: ICRManagementContainerProps) {
    super(props);
    
    const utility = ca.SharePointUtility;

    this.state = {
      hasAdminPermission: utility.checkCurrentUserIsAbleToManageList(this.props.context),
      isInitialized: this.props.isInitialized,
      isTriageTeamMember: false,
      displayMode: this.props.displayMode,
      items: [],
      selectedTab: CRMTab.ActiveIssues,
      submitting: false,
      showSections: false,
      selectedItem: null,
      status: [],
      allTriageUsers: [],
      allPersons: [],
      loading: true,
      showModal: false
    };

    this._isEdit = false;
    this._discardChanges.bind(this);
  }

  public componentDidMount() {
    let { status, isTriageTeamMember, items, allTriageUsers, allPersons } = this.state;

    this.props.dataProvider.isTriageTeamUser()
      .then((value: boolean) => {
        isTriageTeamMember = value;
        return this.props.dataProvider.getCRMItems(this.state.selectedTab);
      })
      .then((values: IChangeRequestManagementItem[]) => {
        let peoplePromiseArray: Array<Promise<IPerson>> = [];
        items = values;
        items.forEach((item: IChangeRequestManagementItem) => {
          if (item.cditem == null) {
            item.cditem = {
              id: null,
              changeid: item.critem.id,
              triagecomments: "",
              substatus: "",
              priority: "Medium",
              assignedto: null
            };
          }
          if (item.cditem != null && item.cditem.assignedto > 0) {
            peoplePromiseArray.push(this.props.dataProvider.getUserById(item.cditem.assignedto));
          }
          if (item.critem.createdby > 0) {
            peoplePromiseArray.push(this.props.dataProvider.getUserById(item.critem.createdby));
          }
        });

        return Promise.all(peoplePromiseArray);
      })
      .then((persons: IPerson[]) => {
        allPersons = persons;
        return this.props.dataProvider.getChangeRequestStatusField();
      })
      .then((values: string[]) => {
        status = values;
        return this.props.dataProvider.getTriageSiteUsers();
      })
      .then((values: any) => {
        allTriageUsers = values;

        this.setState(Update(this.state, {
          items: {
            $set: items
          },
          isTriageTeamMember: {
            $set: isTriageTeamMember
          },
          status: {
            $set: status
          },
          allTriageUsers: {
            $set: allTriageUsers
          },
          loading: {
            $set: false
          },
          allPersons: {
            $set: allPersons
          }
        }));
      });
  }

  public render(): React.ReactElement<ICRManagementContainerProps> {
    let { showModal, allPersons, allTriageUsers, hasAdminPermission, loading, isInitialized, submitting, items, selectedTab, isTriageTeamMember, showSections, selectedItem, status } = this.state;
    
    let tempCRItem = selectedItem && selectedItem.critem ? _.cloneDeep(selectedItem.critem) : null;
    let tempCDItem = selectedItem && selectedItem.cditem ? _.cloneDeep(selectedItem.cditem) : null;

    if (isInitialized) {
      return (
        <div className={styles.container}>
          <CRManagementTab selectedTab={selectedTab} tabOperationClickCallback={this._tabOperationClickCallback.bind(this)} />
          <div className={styles.contentAreaClass} >
            <div className={ showSections? styles.halfList : styles.fullList}>
              <CRManagementList allUsers={allPersons} items={items} selectedItem={selectedItem} 
                                itemClickCallback={this._itemClickHandler.bind(this)} 
                                isTriageTeamMember={isTriageTeamMember} 
                                dataProvider={this.props.dataProvider} />
            </div>
            {showSections ? (
              <div className={styles.itemArea}>
                <div className={styles.itemAreaInterior}>
                  <CRManagementPublicSection allUsers={allPersons} selectedItem={tempCRItem} statusItems={status} itemChangeHandler={this._itemChangeHandler.bind(this)} />
                  <CRManagementTeamSection selectedItem={tempCDItem} isTriageTeamMember={isTriageTeamMember} itemChangeHandler={this._itemChangeHandler.bind(this)} allTriageUser={allTriageUsers} />
                  <div className={styles.bottomrow}>
                    <PrimaryButton text='Save' disabled={submitting} onClick={this._saveForm.bind(this)} />
                    <PrimaryButton text='Cancel' disabled={submitting} onClick={this._cancelForm.bind(this)} />
                  </div>
                </div>
              </div>
            ) : (<div></div>)}
          </div>
          <Modal
            isOpen={showModal}
            onDismiss={this._cancelChange.bind(this)}
            isBlocking={false}
            containerClassName={styles.modelcontainer}
          >
            <div>
              <div className={styles.header}>
                <span>Changes to Change Request {tempCRItem ? tempCRItem.id : -1} are not saved.   Would you like to save or discard these changes?</span>
              </div>
              <div className={styles.body}>
                <PrimaryButton text='Save Changes' disabled={submitting} onClick= {this._saveChange.bind(this)} />
                <PrimaryButton text='Discard Changes' disabled={submitting} onClick={this._discardChanges.bind(this)} />
                <PrimaryButton text='Cancel' disabled={submitting} onClick={this._cancelChange.bind(this)}/>
              </div>
            </div>
          </Modal>
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
    } else {
      return (
        <div className={styles.container}>
          {hasAdminPermission ? (
            <div>
              <p className={styles.error}>The Change Request Management lists are not fully configured in this site.</p>
              <PrimaryButton onClick={this._provisioningLists.bind(this)} text='Create Change Request and Change Request Discussion Lists' disabled={submitting} />
            </div>
          ) : (
              <div>
                <p className={styles.error}>Change Request Management is not configured yet.</p>
              </div>
            )}
        </div>
      );
    }
  }

  private _provisioningLists() {
    var utility = ca.SharePointUtility;
    this.setState(Update(this.state, {
      submitting: { $set: true }
    }));

    ProvisionManager.siteProvisoning(this.props.context).then(() => {
      this.setState(Update(this.state, {
        isInitialized: { $set: true }
      }));
    });
  }

  private _closeModal() {
    this.setState(Update(this.state, {
      showModal: { $set: false }
    }));
  }

  // select tab callback
  private _tabOperationClickCallback(tab: CRMTab): void {
    this.setState(Update(this.state, {
      selectedTab: { $set: tab },
      loading: { $set: true }
    }));
    this.props.dataProvider.getCRMItems(tab)
      .then((items: IChangeRequestManagementItem[]) => {
        items.forEach((item: IChangeRequestManagementItem) => {
          if (item.cditem == null) {
            item.cditem = {
              id: null,
              changeid: item.critem.id,
              triagecomments: "",
              substatus: "",
              priority: "Medium",
              assignedto: null
            };
          }
        });
        this.setState(Update(this.state, {
          items: { $set: items },
          loading: { $set: false },
          showSections: { $set: false },
          selectedItem: { $set: null }
        }));
      });
  }

  private _itemClickHandler(item: any): void {
    this._currentClickedItem = item;
    
    if (this.state.selectedItem && this._currentClickedItem.id === this.state.selectedItem.critem.id) {
      return;
    }

    if (this._isEdit) {
      let tempItem: IChangeRequestManagementItem;
      tempItem = _.cloneDeep(this.state.selectedItem);
      tempItem.cditem = this._tempCDItem;
      tempItem.critem = this._tempCRItem;

      if (tempItem.cditem == null) {
        tempItem.cditem = {
          id: 0,
          changeid: tempItem.critem.id,
          triagecomments: "",
          substatus: "",
          priority: "Medium"
        };
      }

      this.setState(Update(this.state, {
        selectedItem: { $set: tempItem },
        showModal: { $set: true }
      }));
    }
    else {
      this.setState(Update(this.state, {
        selectedItem: { $set: _.find(this.state.items, (value) => value.critem.id === item.id) },
        showSections: { $set: true },
        createdBy: { $set: item.createdBy }
      }), () => {
        let { selectedItem } = this.state;
        this._tempCRItem = selectedItem && selectedItem.critem ? _.cloneDeep(selectedItem.critem) : null;
        this._tempCDItem = selectedItem && selectedItem.cditem ? _.cloneDeep(selectedItem.cditem) : null;
      });
    }
  }

  private _discardChanges() {
    this._isEdit = false;

    this.setState(Update(this.state, {
      selectedItem: { $set: _.find(this.state.items, (value) => value.critem.id === this._currentClickedItem.id) },
      showSections: { $set: true },
      createdBy: { $set: this._currentClickedItem.createdBy },
      showModal: { $set: false }
    }));
  }

  private _cancelChange() {
    this.setState(Update(this.state, {
      showModal: { $set: false }
    }));
  }

  private _saveChange() {
    let tempItem: IChangeRequestManagementItem;
    tempItem = _.cloneDeep(this.state.selectedItem);
    tempItem.cditem = this._tempCDItem;
    tempItem.critem = this._tempCRItem;

    if (tempItem.cditem == null) {
      tempItem.cditem = {
        id: 0,
        changeid: tempItem.critem.id,
        triagecomments: "",
        substatus: "",
        priority: "Medium"
      };
    }

    this.setState(Update(this.state, {
      submitting: { $set: true },
      selectedItem: { $set: tempItem }
    }));

    this.forceUpdate(() => {
      this.props.dataProvider.saveCRMItem(tempItem)
        .then(() => {
          return this.props.dataProvider.getCRMItems(this.state.selectedTab);
        })
        .then((items) => {
          this._isEdit = false;
          this.setState(Update(this.state, {
            items: { $set: items },
            selectedItem: { $set: _.find(this.state.items, (value) => value.critem.id === this._currentClickedItem.id) },
            createdBy: { $set: this._currentClickedItem.createdBy },
            submitting: { $set: false },
            showModal: { $set: false }
          }));
        });
    });
  }

  private _itemChangeHandler(type: string, item: any) {
    this._isEdit = true;

    switch (type) {
      case "IMyChangeRequestItem":
        this._tempCRItem = item;
        break;
      case "IChangeDiscussionItem":
        this._tempCDItem = item;
        break;
    }
  }

  private _saveForm(): void {
    let tempItem: IChangeRequestManagementItem;
    tempItem = _.cloneDeep(this.state.selectedItem);
    tempItem.cditem = this._tempCDItem;
    tempItem.critem = this._tempCRItem;
    if (tempItem.cditem == null) {
      tempItem.cditem = {
        id: 0,
        changeid: tempItem.critem.id,
        triagecomments: "",
        substatus: "",
        priority: "Medium"
      };
    }

    this.setState(Update(this.state, {
      submitting: { $set: true },
      selectedItem: { $set: tempItem }
    }));

    this.forceUpdate(() => {
      this.props.dataProvider.saveCRMItem(tempItem)
        .then(() => {
          return this.props.dataProvider.getCRMItems(this.state.selectedTab);
        })
        .then((items) => {
          this._isEdit = false;
          this.setState(Update(this.state, {
            items: { $set: items },
            selectedItem: { $set: null },
            submitting: { $set: false },
            showSections: { $set: false }
          }));
        });
    });
  }

  private _cancelForm(): void {
    this._isEdit = false;

    this.setState(Update(this.state, {
      selectedItem: { $set: null },
      showSections: { $set: false }
    }));
  }
}