// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { css, Label, TextField, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import * as DateTimePicker from 'react-datetime';
import ICheckInDialogProps from './ICheckInDialogProps';
import ICheckInDialogState from './ICheckInDialogState';
import styles from './CheckInDialog.module.scss';
import * as update from 'immutability-helper';
import { ICheckOut, CheckOutStatus } from '../../models/InventoryCheckOutModel';
import { Moment } from 'moment';
import *as moment from 'moment';

export default class CheckInDialog extends React.Component<ICheckInDialogProps, ICheckInDialogState> {
  constructor(props: ICheckInDialogProps) {
    super(props);
    this.state = {
      item: props.item,
      errorMessage: '',
      submitting: false
    };
  }

  public componentWillReceiveProps(props: ICheckInDialogProps) {
    this.setState({
      item: props.item
    });
  }

  public render(): JSX.Element {
    let submitting: boolean = this.state.submitting;
    let item: ICheckOut = this.state.item;
    let date ='';
    if(item && item.checkedOutDate){
      date =  moment(item.checkedOutDate).format('M/D/YYYY, h:mm a').toString() + '';      
    }
    let errorMessage: string = this.state.errorMessage;
    let title = this.props.parentTitle;
    if(item && item.checkedOutTo){
      if(this.props.currentUser != item.checkedOutTo.displayName){
          title +=" from " + item.checkedOutTo.displayName;
      }
    }

    return (
      <Dialog
        isOpen={this.props.isOpen}
        type={DialogType.normal}
        onDismiss={this._closeDialog.bind(this)}
        isBlocking={true} title={"Check-In"} containerClassName={styles.checkInDialog}>
        <div>Would you like to check in {title}?</div>

        <div className={"ms-Grid"}>
          <div className={styles.item}>
            <div className={"ms-Grid-row "}>
              <div className={"ms-Grid-col ms-u-lg3"}>Check Out Date</div>
              <div className={"ms-Grid-col  ms-u-lg9"}>{date}</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={"ms-Grid-row"}>

              <div className={"ms-Grid-col ms-u-lg3"}>Check-in Date</div>
              <div className={"ms-Grid-col ms-u-lg9"}>
                <DateTimePicker onChange={this._setCheckedInDate.bind(this)}  /></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={"ms-Grid-row"}>

              <div className={"ms-Grid-col ms-u-lg3"}>Notes:</div>
              <div className={"ms-Grid-col  ms-u-lg9"}>
                <TextField autoFocus={true} value={item && item.notes ? item.notes : ""} multiline resizable={false} onChanged={this._setNotes.bind(this)} />
              </div>
            </div>
          </div>
        </div>

        <p className={styles.row}>
          {errorMessage}
        </p>
        <DialogFooter>
          <PrimaryButton text='OK' onClick={this._saveChange.bind(this)} disabled={submitting} />
          <DefaultButton text='Cancel' onClick={this._closeDialog.bind(this)} disabled={submitting} />
        </DialogFooter>
      </Dialog>
    );
  }
  private _closeDialog() {
    this.props.itemCloseOperationCallback();
  }

  private _saveChange() {
    let item: ICheckOut = this.state.item;
    let error: string = "";

    if (item.actualCheckInDate == null) {
      error = "The check-in date field is required.";
    }
      
      if(moment(item.checkedOutDate)>moment(item.actualCheckInDate)){
         error = "The check-in date cannot be before the check-out date.";
      }

    var noError = error === "";
    this.setState(update(this.state, {
      errorMessage: {
        $set: error
      },
      submitting: {
        $set: noError
      }
    })
    );

    if (!noError) {
      return;
    }
    this.setState(
      update(this.state, {
        item: {
          status: {
            $set: CheckOutStatus.Closed
          }
        }
      })
      , () => {
        this.props.itemSaveOperationCallback(this.state.item)
          .then(() => {
            this.setState(update(this.state, {
              submitting: {
                $set: false
              }
            })
            );
          });
      }
    );
  }

  private _setCheckedInDate(date: Moment) {
    this.setState(
      update(this.state, {
        item: {
          actualCheckInDate: {
            $set: date.toDate()
          }
        }
      })
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
}
