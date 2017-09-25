// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as update from 'immutability-helper';
import ICheckOutNewDialogProp from './CheckOutNewDialogProp';
import ICheckOutNewDialogState from './CheckOutNewDialogState';
import { IPerson, ICheckOut } from "../../models/InventoryCheckOutModel";
import { CheckOutSaveOperationCallback, CancelDialogOperationCallback } from "../../models/ItemOperationCallback";
import styles from './CheckOutNewDialog.module.scss';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, ChoiceGroup, TextField, Icon, Label, Dropdown, IDropdownOption, NormalPeoplePicker, IPersonaProps, autobind, css } from 'office-ui-fabric-react';

//Import DateTime picker
import * as DateTimePicker from 'react-datetime';
import * as moment from 'moment';
import { Moment } from 'moment';

//CheckOutNewDialog react component
export default class CheckOutNewDialog extends React.Component<ICheckOutNewDialogProp, ICheckOutNewDialogState> {
  private _standardCheckoutLength: number;
  private _saveCallback: CheckOutSaveOperationCallback;
  private _closeCallback: CancelDialogOperationCallback;

  constructor(props: ICheckOutNewDialogProp) {
    super(props);
    require('../../../../../node_modules/react-datetime/css/react-datetime.css');

    this.state = {
      showDialog: false,
      isNewForm: true,
      item: { id: 0,
         itemId: 0,
         checkedOutTo: null,
         checkedOutDate: new Date(),
         scheduledCheckInDate: null,
         actualCheckInDate: null,
         status: null,
         notes: "",
         quantity: null } as ICheckOut,
      statuses: [],
      errorMessages: [],
      submitting: false
    } as ICheckOutNewDialogState;
  }

  public componentWillReceiveProps(props: ICheckOutNewDialogProp) {
    let scheduledCheckInDate = null;
    let standardCheckoutLength: string = props.standardCheckoutLength;
    if (standardCheckoutLength && standardCheckoutLength.length > 0) {
      let standardCheckoutLengthNum: number = Number(standardCheckoutLength);
      if (!isNaN(standardCheckoutLengthNum)) {
        this._standardCheckoutLength = standardCheckoutLengthNum;
        scheduledCheckInDate = moment(this.state.item.checkedOutDate).add(this._standardCheckoutLength, "hour").toDate();
      }
    }
    else {
      this._standardCheckoutLength = null;
    }
    this.setState(
      update(this.state, {
        showDialog: {
          $set: props.isOpen
        },
        isNewForm: {
          $set: props.item && props.item.id ? false : true
        },
        item: {
          id: {$set: props.item && props.item.id ? props.item.id : 0},
          itemId: {$set: props.item && props.item.itemId ? props.item.itemId : null},
          checkedOutTo: {$set: props.item && props.item.checkedOutTo ? props.item.checkedOutTo : null},
          checkedOutDate: {$set: props.item && props.item.checkedOutDate ? new Date(props.item.checkedOutDate) : new Date()},
          scheduledCheckInDate: {$set: props.item && props.item.scheduledCheckInDate ? new Date(props.item.scheduledCheckInDate) : scheduledCheckInDate},
          actualCheckInDate: {$set: props.item && props.item.actualCheckInDate ? new Date(props.item.actualCheckInDate) : null},
          status: {$set: props.item && props.item.status ? props.item.status : null},
          notes: {$set: props.item && props.item.notes ? props.item.notes : ""},
          quantity: {$set: props.item && props.item.quantity ? props.item.quantity : null}
        },
        statuses: {
          $set: props.statuses || this.state.statuses
        },
        users: {
          $set: props.users || this.state.users
        },
        errorMessage: {
          $set: ""
        },
        submitting: {
          $set: false
        }
      })
    );

    this._saveCallback = props.itemSaveOperationCallback;
    this._closeCallback = props.itemCloseOperationCallback;
  }

  public render() {
    const isNewForm: boolean = this.state.isNewForm;
    const dialogTitle: string = isNewForm ? 'New Check Out' : "Edit Check Out";
    const item: ICheckOut = this.state.item;
    let showQuantity: boolean = true;
    if (isNewForm && this.props.available === 1) {
      item.quantity = 1;
      showQuantity = false;
    }
    const errorMessages: string[] = this.state.errorMessages;
    const submitting: boolean = this.state.submitting;
    const statuses: IDropdownOption[] = this.state.statuses ? this.state.statuses.map(status => { return {key: status, text: status}; }) : [];
    const selectedStatus: string | number = this.state.item.status || (statuses.length > 0 ? statuses[0].key : null);
    let standardCheckoutLengthTip = "";
    const hasStandardCheckoutLength: boolean = this._standardCheckoutLength && !isNaN(this._standardCheckoutLength);
    if (hasStandardCheckoutLength) {
      const convert2Days: boolean = this._standardCheckoutLength > 72 && this._standardCheckoutLength % 24 === 0;
      standardCheckoutLengthTip = "Standard check-out period is " + (convert2Days ? this._standardCheckoutLength / 24 + " days" : this._standardCheckoutLength + " hours");
    }
    const selectedUsers: IPersonaProps[] = [];
    if (item.checkedOutTo) {
      selectedUsers.push({id: item.checkedOutTo.id.toString(), primaryText: item.checkedOutTo.displayName});
    }
    return (
      <div className={styles.checkOutDialog}>
        <Dialog
          isOpen={this.state.showDialog}
          type={DialogType.normal}
          onDismiss={this._closeDialog.bind(this)}
          title={dialogTitle}
          isBlocking={true}
          containerClassName={styles.checkOutDialog}
        >
          <div className={styles.row}>
            <Label>Checked Out By</Label>
            <NormalPeoplePicker
              defaultSelectedItems = {selectedUsers}
              onResolveSuggestions={ this._searchPeople.bind(this) }
              pickerSuggestionsProps={ {
                noResultsFoundText: 'No results found',
                loadingText: 'Loading...'
              } }
              getTextFromItem={ (persona) => persona.primaryText }
              onChange={ this._setCheckedOutTo.bind(this) }
              className='ms-PeoplePicker'
              key='normal-people-picker' />
          </div>

          <div className={styles.row}>
            <Label>Checked Out Date</Label>
            <DateTimePicker className="checkedOutDatePicker" value={item.checkedOutDate} onChange={this._setCheckedOutDate.bind(this)} />
            <i className="ms-Icon ms-Icon--Calendar" onClick={this._showDatePicker.bind(this, ".checkedOutDatePicker")}></i>
          </div>

          <div className={styles.row}>
            <Label>Scheduled Check-in Date</Label>
            <DateTimePicker className="scheduledCheckInDatePicker"  value={item.scheduledCheckInDate} onChange={this._setSheduledCheckedInDate.bind(this)} />
            <i className="ms-Icon ms-Icon--Calendar" onClick={this._showDatePicker.bind(this, ".scheduledCheckInDatePicker")}></i>
          </div>
           <div className={css(styles.row, styles.standardCheckoutLengthTip)}>{standardCheckoutLengthTip}</div>

          <div className={styles.row}>
            <Label>Actual Check-in Date</Label>
            <DateTimePicker className="actualCheckINDatePicker"  value={item.actualCheckInDate} onChange={this._setactualCheckINDate.bind(this)} />
            <i className="ms-Icon ms-Icon--Calendar" onClick={this._showDatePicker.bind(this, ".actualCheckINDatePicker")}></i>
          </div>

          <div className={styles.row} style={{ display: showQuantity ? "block" : "none" }}>
            <Label>Checked Out Quantity</Label>
            <TextField className={styles.quantity} inputClassName="form-control quantityInput"  disabled={!isNewForm} value={(item.quantity || item.quantity === 0) ? item.quantity.toString() : ""} onChanged={this._setQuantity.bind(this)} />
          </div>

          <div className={styles.row}>
            <Label>Status</Label>
            <Dropdown
              selectedKey={ selectedStatus }
              onChanged={this._setStatus.bind(this)}
              options={ statuses }
            />
          </div>

          <div className={styles.row}>
            <Label className={styles.noteLabel}>Notes</Label>
            <TextField value={item.notes} multiline resizable={false} onChanged={this._setNotes.bind(this)} />
          </div>

          <ul className={styles.row} style={{ display: errorMessages.length > 0 ? "block" : "none" }}>
              {errorMessages.map((message, index) => {
                  return <li key={index}>{message}</li>;
                })}
          </ul>

          <DialogFooter>
            <PrimaryButton onClick={this._saveChange.bind(this)} text='Save' disabled={submitting || errorMessages.length > 0} />
            <DefaultButton onClick={this._closeDialog.bind(this)} text='Cancel' disabled={submitting}/>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _setCheckedOutDate(date: Moment) {
    if (!date || !date.toDate) {
      return;
    }

    const checkedOutDate: Date = date.toDate();
    let scheduledCheckInDate: Date = this.state.item.scheduledCheckInDate;
    if (!isNaN(this._standardCheckoutLength) && moment(scheduledCheckInDate).isSame(moment(checkedOutDate).add(this._standardCheckoutLength, "hour"))){
      scheduledCheckInDate = date.add(this._standardCheckoutLength, "hour").toDate();
    }
    let updateParam: any = {
        item: {
          checkedOutDate: {
            $set: checkedOutDate
          },
          scheduledCheckInDate: {
            $set: scheduledCheckInDate
          }
        }
      };
    const invalid: boolean = !this.props.allowCheckoutIntheFuture && moment(checkedOutDate).isAfter(new Date());
    const message: string = "Checked out date cannot be set to a future date.";
    this._updateErrorSpec(invalid, message, updateParam);

    this.setState(
      update(this.state, updateParam)
    );
  }

  private _setSheduledCheckedInDate(date: Moment) {
    if (!date || !date.toDate) {
      return;
    }
    let updateParam: any = {
        item: {
          scheduledCheckInDate: {
            $set: date.toDate()
          }
        }
      };

    const invalid: boolean = moment(this.state.item.checkedOutDate).isAfter(date);
    const message: string = "Scheduled check-in date cannot be before the check-out date.";
    this._updateErrorSpec(invalid, message, updateParam);

    this.setState(
      update(this.state, updateParam)
    );
  }

  private _setactualCheckINDate(date: Moment) {
    if (!date || !date.toDate) {
      return;
    }

    const invalid: boolean = moment(this.state.item.checkedOutDate).isAfter(date);
    const message: string = "Actual check-in date cannot be before the check-out date.";
    let updateParam: any = {
        item: {
          actualCheckInDate: {
            $set: date.toDate()
          }
        }
      };
    this._updateErrorSpec(invalid, message, updateParam);
    this.setState(
      update(this.state, updateParam)
    );
  }

  private _setNotes(text: string) {
    this.setState(
      update(this.state, {
        item: {
          notes: {
            $set: text
          }
        }
      })
    );
  }

    private _setQuantity(text: string) {
      const quantity: number = parseInt(text);
      if (isNaN(quantity)) {
        return;
      }

      const invalid: boolean = quantity < 1 || quantity > this.props.available;
      const message: string = quantity < 1 ? "Checked out quantity must be 1 or greater." : "Checked out quantity must be less or equal than " + this.props.available;
      let updateParam: any = {
          item: {
            quantity: {
              $set: quantity
            }
          }
        };
      this._updateErrorSpec(invalid, message, updateParam);
      this.setState(
        update(this.state, updateParam)
      );
  }

  private _setStatus(status: IDropdownOption) {
    this.setState(update(this.state, { item: { status: { $set: status.text } } }));
  }

  private _setCheckedOutTo(items: IPersonaProps[]) {
    const checkedOutTo: IPerson = items.length > 0 ? { id: Number(items[0].id), displayName: items[0].primaryText } : null;
    this.setState(update(this.state, { item: {checkedOutTo: { $set: checkedOutTo } } }));
  }

  private _showDatePicker(selector) {
    (document.querySelector(selector + " input") as  HTMLElement).focus();
  }

  private _searchPeople(filterText, selectedUsers) {
    var users = this.state.users;
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

  private _saveChange() {
    if (this.state.errorMessages.length > 0) {
      return;
    }

    const item: ICheckOut = this.state.item;
    const errors: string[] = [];

    if (!this.props.allowCheckoutIntheFuture && moment(item.checkedOutDate).isAfter(new Date())) {
      errors.push("Checked out date cannot be set to a future date.");
    }
    if (moment(item.checkedOutDate).isAfter(moment(item.scheduledCheckInDate))) {
      errors.push("Scheduled check-in date cannot be before the check-out date.");
    }
    if (moment(item.checkedOutDate).isAfter(moment(item.actualCheckInDate))) {
      errors.push("Actual check-in date cannot be before the check-out date.");
    }
    if (isNaN(item.quantity) || item.quantity < 1) {
      errors.push("Checked out quantity must be 1 or greater.");
    }
    else if (item.quantity > this.props.available && this.state.isNewForm) {
      errors.push("Checked out quantity must be less or equal than " + this.props.available);
    }
    if (errors.length > 0) {
      this.setState(update(this.state, {
        errorMessages: {$push: errors}
      }));
      return;
    }

    this.setState(update(this.state, {
        submitting: {
          $set: true
        }
      })
    );

    this.forceUpdate(() => {
      this._saveCallback(this.state.item)
        .then((): void => {
            this.setState(update(this.state, {
              submitting: {
                $set: false
              }
            })
          );
        }, (): void => {
            this.setState(update(this.state, {
              errorMessages: {
                $push: "Save failed."
              },
              submitting: {
                $set: false
              }
            })
          );
        });
    });
  }

  private _closeDialog() {
    this._closeCallback();
  }

  private _updateErrorSpec(invalid: boolean, message: string, spec: any): void {
    const index: number = this.state.errorMessages.indexOf(message);
    if (invalid) {
      if (index === -1) {
        spec.errorMessages = {$push: [message]};
      }
    }
    else if (index > -1) {
      spec.errorMessages = {$splice: [[index, 1]]};
    }
  }

}