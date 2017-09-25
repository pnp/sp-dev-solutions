// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as Update from 'immutability-helper';
import styles from './CRManagementTeamSection.module.scss';
import { ICRManagementTeamSectionProps } from './ICRManagementTeamSectionProps';
import { ICRManagementTeamSectionState } from './ICRManagementTeamSectionState';
import { css, Icon, Dropdown, IDropdownOption, Pivot, PivotItem, PivotLinkFormat, FocusZone, FocusZoneDirection, ChoiceGroup, TextField, Label, CompactPeoplePicker, IBasePickerSuggestionsProps, ListPeoplePicker, NormalPeoplePicker, IPersonaProps } from 'office-ui-fabric-react';
import { IPerson } from '../../../../libraries/models/ChangeRequestModel';
import * as _ from "lodash";

export default class CRManagementTeamSection extends React.Component<ICRManagementTeamSectionProps, ICRManagementTeamSectionState> {
  constructor(props: ICRManagementTeamSectionProps) {
    super(props);

    this.state = {
      item: props.selectedItem
    };
  }

  public componentWillReceiveProps(props: ICRManagementTeamSectionProps) {
    this.setState(
      Update(this.state, {
        item: {
          $set: props.selectedItem
        }
      })
    );
  }

  private _buildPeoplePicker (selectedUser: IPersonaProps[]): any{
    if (selectedUser){
      return (
        <NormalPeoplePicker
          defaultSelectedItems = {selectedUser}
          onResolveSuggestions={ this._searchPeople.bind(this) }
          pickerSuggestionsProps={ {
            noResultsFoundText: 'No results found',
            loadingText: 'Loading...'
          } }
          getTextFromItem={ (persona) => persona.primaryText }
          onChange={ this._handleAssignedChanged.bind(this) }
          className={`ms-PeoplePicker ${styles.peoplepicker}`}
          key={selectedUser[0].primaryText} />
      );
    }
    else{
       return (
        <NormalPeoplePicker
          onResolveSuggestions={ this._searchPeople.bind(this) }
          pickerSuggestionsProps={ {
            noResultsFoundText: 'No results found',
            loadingText: 'Loading...'
          } }
          getTextFromItem={ (persona) => persona.primaryText }
          onChange={ this._handleAssignedChanged.bind(this) }
          className={`ms-PeoplePicker ${styles.peoplepicker}`}
          key='normal-people-picker' />
      );
    }
  }

  public render(): React.ReactElement<ICRManagementTeamSectionProps> {
    let { item } = this.state;
    let cssHiddenClassName = this.props.isTriageTeamMember ? "": styles.hidden;
    let titleText: string = this.props.isTriageTeamMember ? "": "This section contains working information for the team";
    let selectedUser: IPersonaProps[] = item &&  item.assignedto > 0 ? [{id: item.assignedto.toString(), primaryText: _.find(this.props.allTriageUser, ['id', item.assignedto]).displayName} as IPersonaProps] : null;
    let peoplepicker = this._buildPeoplePicker(selectedUser);
    let triagecomments = (item && item.triagecomments) ? item.triagecomments : "";
    
    return (
      <div className={styles.crmanagementteamsection}>
        <h3>Team Tracking Information
          <span title={titleText} className={styles.infoIcon} ><Icon iconName={"Error"}/></span>
        </h3>
        <div className={`${cssHiddenClassName} ms-Grid`}>
            <div className={css('ms-Grid-row')}>
              <div className={css('ms-Grid-col ms-u-lg12 ms-u-xl6')}>
                <div className={css('ms-Grid')}>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                    <div className={styles.formHeader}>Assigned To:</div>
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm8')}>
                      {peoplepicker}
                    </div>
                  </div>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                      <div className={styles.formHeader}>Status Updates:</div>
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm8')}>
                      <TextField multiline autoAdjustHeight value = { triagecomments } onChanged = {this._handleTriagecommentsChanged.bind(this)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={css('ms-Grid-col ms-u-lg12 ms-u-xl6')}>
                <div className={css('ms-Grid')}>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                    <div className={styles.formHeader}>Sub Status:</div>
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm8')}>
                       <Dropdown
                        id='Basicdrop1'
                        options={this._buildDropdownOptions()}
                        selectedKey = { item ? item.substatus : "" }
                        onChanged = {this._handleSubstatusChanged.bind(this)} />
                    </div>
                  </div>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                    <div className={styles.formHeader}>Priority:</div>
                    </div>
                    <div className={`${css('ms-Grid-col ms-u-sm8')} ${styles.tab}`}>
                      <Pivot linkFormat={ PivotLinkFormat.tabs } selectedKey = { item ? item.priority : "" }  onLinkClick = {this._handlePriorityChanged.bind(this)}>
                        <PivotItem linkText='High' itemKey='High'>
                        </PivotItem>
                        <PivotItem linkText='Medium' itemKey='Medium'>
                        </PivotItem>
                        <PivotItem linkText='Low' itemKey='Low'>
                        </PivotItem>
                      </Pivot>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }

  private _searchPeople(filterText, selectedUsers) {
    var users = this.props.allTriageUser;
    if (users) {
      var filteredUsers = filterText ? users
        .filter(user => user.displayName.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
        .filter(user => !selectedUsers.some((value: IPersonaProps) => { return value.primaryText === user.displayName; })) : [];
        return filteredUsers.map((value: IPerson) => {
           return {id: value.id.toString(), primaryText: value.displayName} as IPersonaProps;
          });
    } 
    else {
      return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(this._searchPeople(filterText, selectedUsers)), 1000));
    }
  }

  private _buildDropdownOptions() {
    let options: IDropdownOption[] = [];

    options.push({
      key: "Untriaged",
      text: "Untriaged"
    });

    options.push({
      key: "Investigating",
      text: "Investigating"
    });

    options.push({
      key: "Fix in Progress",
      text: "Fix in Progress"
    });

    options.push({
      key: "Resolved – Won’t Fix",
      text: "Resolved – Won’t Fix"
    });

    options.push({
      key: "Resolved – Cannot reproduce request",
      text: "Resolved – Cannot reproduce request"
    });

    options.push({
      key: "Resolved – Duplicate",
      text: "Resolved – Duplicate"
    });

    return options;
  }

  private _handleTriagecommentsChanged(value: string) {
    let {item} = this.state;
    item.triagecomments = value;

    this.setState(
      Update(this.state, {
        item: {
          $set: item
        },
      })
    );
    this.props.itemChangeHandler("IChangeDiscussionItem", this.state.item);
  }

  private _handleSubstatusChanged(value: IDropdownOption) {
    let {item} = this.state;
    item.substatus = value.key.toString();

    this.setState(
      Update(this.state, {
        item: {
          $set: item
        },
      })
    );
    this.props.itemChangeHandler("IChangeDiscussionItem", this.state.item);
  }

  private _handleAssignedChanged(values: IPersonaProps[]) {
    let {item} = this.state;
    item.assignedto = values.length > 0 ? Number(values[0].id) : null;

    this.setState(
      Update(this.state, {
        item: {
          $set: item
        },
      })
    );
    this.props.itemChangeHandler("IChangeDiscussionItem", this.state.item);
  }

  private _handlePriorityChanged(pivotItem: PivotItem) {
    let {item} = this.state;
    item.priority = pivotItem.props.itemKey.toString();

    this.setState(
      Update(this.state, {
        item: {
          $set: item
        },
      })
    );
    this.props.itemChangeHandler("IChangeDiscussionItem", this.state.item);
  }
}