// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as Update from 'immutability-helper';
import * as moment from 'moment';
import styles from './CRManagementPublicSection.module.scss';
import { ICRManagementPublicSectionProps } from './ICRManagementPublicSectionProps';
import { ICRManagementPublicSectionState } from './ICRManagementPublicSectionState';
import { css, TextField, Label, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { IPerson } from '../../../../libraries/models/ChangeRequestModel';
import * as _ from "lodash";

export default class CRManagementPublicSection extends React.Component<ICRManagementPublicSectionProps, ICRManagementPublicSectionState> {
  constructor(props: ICRManagementPublicSectionProps) {
    super(props);

    this.state = {
      item: props.selectedItem,
      allUsers: props.allUsers
    };
  }

  public componentWillReceiveProps(props: ICRManagementPublicSectionProps) {
    this.setState(
      Update(this.state, {
        item: {
          $set: props.selectedItem
        },
        allUsers: {
          $set: props.allUsers
        }
      })
    );
  }

  public render(): React.ReactElement<ICRManagementPublicSectionProps> {
    let { item, allUsers } = this.state;
    let createdBy: IPerson = _.find(allUsers, ["id" , item.createdby]);
    let description: string = item.description ? item.description: "";

    return (
      <div className={styles.crmanagementpublicsection}>
        <h2>{`${item.id} ${item.title}`}</h2>
        <div className={css('ms-Grid')}>
            <div className={css('ms-Grid-row')}>
              <div className={css('ms-Grid-col ms-u-lg12 ms-u-xl6')}>
                <div className={css('ms-Grid')}>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                      <div className={styles.formHeader}>Description:</div>
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm8')}>
                      <TextField multiline autoAdjustHeight value = { description } onChanged = { this._handleDescriptionChanged.bind(this) } />
                    </div>
                  </div>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                    <div className={styles.formHeader}>Last Update:</div>
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm8')}>
                      <TextField multiline autoAdjustHeight value = { item.statusupdates? item.statusupdates: "" } onChanged = { this._handleLastUpdatesChanged.bind(this) } />
                    </div>
                  </div>
                </div>
              </div>
              <div className={css('ms-Grid-col ms-u-lg12 ms-u-xl6')}>
                <div className={css('ms-Grid')}>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                    <div className={styles.formHeader}>Status:</div>
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm8')}>
                      <Dropdown
                        id='Basicdrop1'
                        options={this._buildDropdownOptions(this.props.statusItems)}
                        selectedKey = { item.status }
                        onChanged = {this._handleStatusChanged.bind(this)}
                      />
                    </div>
                  </div>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                      Created Date:
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm8')}>
                      { moment(item.createddate).format('h:mm A, MMM Do YYYY') }
                    </div>
                  </div>
                  <div className={css('ms-Grid-row')}>
                    <div className={css('ms-Grid-col ms-u-sm4')}>
                      Created By:
                    </div>
                    <div className={css('ms-Grid-col ms-u-sm8')}>
                      { createdBy.displayName  }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }

  private _buildDropdownOptions(items: string[]): IDropdownOption[]{
    let options: IDropdownOption[] = [];

    items.map((option: string) => {
      options.push({
        key: option,
        text: option
      });
    });

    return options;
  }

  private _handleDescriptionChanged(value: string) {
    let {item} = this.state;
    item.description = value;
    this.setState(
      Update(this.state, {
        item: {
          $set: item
        },
      })
    );
    this.props.itemChangeHandler("IMyChangeRequestItem", this.state.item);
  }

  private _handleStatusChanged(value: IDropdownOption) {
    let {item} = this.state;
    item.status = value.key.toString();
    this.setState(
      Update(this.state, {
        item: {
          $set: item
        },
      })
    );
    this.props.itemChangeHandler("IMyChangeRequestItem", this.state.item);
  }

  private _handleLastUpdatesChanged(value: string) {
    let {item} = this.state;
    item.statusupdates = value;
    this.setState(
      Update(this.state, {
        item: {
          $set: item
        },
      })
    );
    this.props.itemChangeHandler("IMyChangeRequestItem", this.state.item);
  }
}