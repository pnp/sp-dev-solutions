import * as React from 'react';
import * as Update from 'immutability-helper';
import ITimeAwayCreateDialogProp from './ITimeAwayCreateDialogProp';
import ITimeAwayCreateDialogState from './ITimeAwayCreateDialogState';
import { IMyTimeAwayItem } from "../../models/timeAwayModel";
import styles from './TimeAwayCreateDialog.module.scss';
import { SPComponentLoader } from '@microsoft/sp-loader';


import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, ChoiceGroup, TextField, Icon, autobind, Label } from 'office-ui-fabric-react';


//Import DateTime picker
import * as DateTimePicker from 'react-datetime';
import { Moment } from 'moment';



//TimeAwayDialog react component
export default class TimeAwayCreateDialog extends React.Component<ITimeAwayCreateDialogProp, ITimeAwayCreateDialogState> {
  private _saveCallback: Function;
  private _validCallback: Function;

  constructor(props: ITimeAwayCreateDialogProp) {
    super(props);
    SPComponentLoader.loadCss('https://raw.githack.com/YouCanBookMe/react-datetime/master/css/react-datetime.css');

    this.state = {
      showDialog: false,
      isNewForm: true,
      item: { comments: "", start: null, end: null, id: null },
      errorMessage: "",
      submitting: false
    } as ITimeAwayCreateDialogState;
  }

  public componentWillReceiveProps(props: ITimeAwayCreateDialogProp) {
    if (props.item != null) {
      if (typeof (props.item.start) === "string") props.item.start = new Date(props.item.start);
      if (typeof (props.item.end) === "string") props.item.end = new Date(props.item.end);
    }

    this.setState(
      Update(this.state, {
        showDialog: {
          $set: props.isOpen
        },
        isNewForm: {
          $set: props.item ? false : true
        },
        item: {
          $set: props.item || { comments: "", start: null, end: null, id: null }
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
    this._validCallback = props.itemValidOperationCallback;
  }

  public render() {
    let dialogTitle: string = this.state.isNewForm ? 'Add Time Away' : "Edit Time Away";
    let item: IMyTimeAwayItem = this.state.item;
    let errorMessage: string = this.state.errorMessage;
    let submitting: boolean = this.state.submitting;

    return (
      <div className={styles.timeawaydialog}>
        <Dialog
          isOpen={this.state.showDialog}
          type={DialogType.normal}
          onDismiss={this._closeDialog.bind(this)}
          title={dialogTitle}
          isBlocking={true}
          containerClassName={styles.timeawaydialog}
        >
          <div style={{ visibility: "hidden", height: 0 }}>
            <input type="text" />
          </div>

          <div className={styles.formArea}>
            <div className={styles.row}>
              <div className={styles.dataCell}>
                <Label>Start Time:</Label>
              </div>
              <div className={styles.dataCell}>
                <DateTimePicker value={item.start} onChange={this._handleStartDateChange.bind(this)} />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.dataCell}>
                <Label>End Time:</Label>
              </div>
              <div className={styles.dataCell}>
                <DateTimePicker value={item.end} onChange={this._handleEndDateChange.bind(this)} />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.dataCell}>
                <Label>Commments:</Label>
              </div>
              <div className={styles.dataCell}>
                <TextField value={item.comments} multiline resizable={false} onChanged={this._handleCommentsChange.bind(this)} />
              </div>
            </div>
          </div>

          <p>
            {errorMessage ? errorMessage : <span>&#160;</span> }
          </p>

          <DialogFooter>
            <PrimaryButton onClick={this._saveChange.bind(this)} text='Save' disabled={submitting} />
            <DefaultButton onClick={this._closeDialog.bind(this)} text='Cancel' />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _handleStartDateChange(date: Moment) {
    this.setState(
      Update(this.state, {
        item: {
          start: {
            $set: date.toDate()
          }
        }
      })
    );
  }

  private _handleEndDateChange(date: Moment) {
    this.setState(
      Update(this.state, {
        item: {
          end: {
            $set: date.toDate()
          }
        }
      })
    );
  }

  private _handleCommentsChange(text: string) {
    this.setState(
      Update(this.state, {
        item: {
          comments: {
            $set: text
          }
        }
      })
    );
  }

  private _saveChange() {
    let item: IMyTimeAwayItem = this.state.item;
    let error: string = "";

    if (item.start == null) {
      error = "The start datetime field is required.";
    }
    else if (item.end == null) {
      error = "The end datetime field is required.";
    }
    else if (item.end < item.start) {
      error = "The end datetime must be after the start datetime.";
    }

    this.setState(Update(this.state, {
      errorMessage: {
        $set: error
      },
      submitting: {
        $set: true
      }
    })
    );

    if (error !== "") {
      this.setState(Update(this.state, {
        errorMessage: {
          $set: error
        },
        submitting: {
          $set: false
        }
      }));
      return;
    }

    this.forceUpdate(() => {
      this._validCallback(this.state.item)
        .then((isValid: boolean): void => {
          if (isValid) {
            this._saveCallback(this.state.item)
              .then((): void => {
                this.setState(
                  Update(this.state, {
                    showDialog: {
                      $set: false
                    }
                  })
                );
              });
          }
          else {
            error = "There is already a conflicting Time Away entry during this time period.";
            this.setState(Update(this.state, {
              errorMessage: {
                $set: error
              },
              submitting: {
                $set: false
              }
            })
            );
          }
        });
    });
  }

  private _closeDialog() {
    this.setState(
      Update(this.state,
        {
          showDialog: {
            $set: false
          }
        })
    );
  }
}