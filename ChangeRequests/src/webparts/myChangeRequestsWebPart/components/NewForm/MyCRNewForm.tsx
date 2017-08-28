import * as React from 'react';
import * as Update from 'immutability-helper';
import * as lodash from '@microsoft/sp-lodash-subset';
import { css, Label, TextField, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import IMyCRNewFormProps from './IMyCRNewFormProps';
import IMyCRNewFormState from './IMyCRNewFormState';
import styles from './MyCRNewForm.module.scss';

import { IMyChangeRequestItem, ChangeRequestStatus } from '../../../../libraries/index';
import MyCRHintDialog from '../HintDialog/MyCRHintDialog';
import { NewCRFormShowIn } from '../../models/MyCRModel';


export default class MyCRNewDialog extends React.Component<IMyCRNewFormProps, IMyCRNewFormState> {
    constructor(props: IMyCRNewFormProps) {
        super(props);

        this.state = {
            isNewForm: this._checkIsNewCR(props.item),
            submitting: false,
            errorMessage: "",
            item: props.item,

            showHintDialog: false
        };
    }

    public componentWillReceiveProps(props: IMyCRNewFormProps) {
        if (this.props.showIn == NewCRFormShowIn.Dialog) {
            this.setState(
                {
                    isNewForm: this._checkIsNewCR(props.item),
                    item: props.item,
                }
            );
        }
        else {
            this.setState(
                {
                    isNewForm: this._checkIsNewCR(props.item),
                }
            );
        }


    }

    public render(): JSX.Element {
        let boldTitleClass: string = css(styles.title, styles.boldtitle);
        return (
            <div>
                <div hidden={!this.props.isOpen} className={styles.mycrnewform}>
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-lg12">
                                {
                                    this.state.isNewForm ? (<Label className={styles.title}>{this.props.newcrtext ? this.props.newcrtext : ""}</Label>)
                                        : (<Label className={boldTitleClass}>Issue {this.state.item.id}</Label>)
                                }
                            </div>
                        </div>

                        <div className="ms-Grid-row">
                            <div className={`ms-Grid-col ${styles.mycrnewformcell} ms-u-sm12 ms-u-lg3`}>Title:</div>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-lg9">
                                <TextField value={this.state.item.title} onChanged={this._handleTitleChange.bind(this)} />
                            </div>
                        </div>
                        <div className="ms-Grid-row" >
                            <div className={`ms-Grid-col ${styles.mycrnewformcell} ms-u-sm12 ms-u-lg3`}>Description:</div>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-lg9">
                                <TextField value={this.state.item.description} multiline resizable={false} onChanged={this._handleDescriptionChange.bind(this)} />
                            </div>
                        </div>
                        <div className="ms-Grid-row" hidden={this.state.isNewForm}>
                            <div className={`ms-Grid-col ${styles.mycrnewformcell} ms-u-sm12 ms-u-lg3`}>Status:</div>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-lg9">
                                <Label>{this.state.item.status ? this.state.item.status : ""}</Label>
                            </div>
                        </div>
                        <div className="ms-Grid-row" hidden={this.state.isNewForm}>
                            <div className={`ms-Grid-col ${styles.mycrnewformcell} ms-u-sm12 ms-u-lg3`}>Update:</div>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-lg9">
                                <Label>{this.state.item.statusupdates ? this.state.item.statusupdates : ""}</Label>
                            </div>
                        </div>
                        <div className="ms-Grid-row" hidden={this.state.errorMessage.length == 0}>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-lg12">
                                <label className={styles.errorMessage}>{this.state.errorMessage}</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mycrdialogButtons}>                        
                        <PrimaryButton onClick={this._saveButtonClick.bind(this)} text={this._itemIsClosedStatus() ? 'Reactivate' : this.props.showIn == NewCRFormShowIn.Dialog?(this.state.isNewForm?'Create':'Update'):this.props.newcrbuttontext} disabled={this.state.submitting} />
                        <DefaultButton onClick={this._cancelButtonClick.bind(this)} text='Cancel' disabled={this.state.submitting} />
                    </div>
                </div>
                <MyCRHintDialog
                    newcrsubmissiontext={this.props.newcrsubmissiontext}
                    isOpen={this.state.showHintDialog}
                    itemCloseOperationCallback={this._closeHintDialogButtonClick.bind(this)} />
            </div>
        );
    }

    private _closeHintDialogButtonClick() {
        this.setState({ showHintDialog: false }, () => {
            this._cancelButtonClick();
        });
    }

    private _cancelButtonClick() {
        if (this.props.itemCloseDialogOperationCallback != null) {
            this.props.itemCloseDialogOperationCallback();
        }
        this._resetItem();
    }
    private _handleTitleChange(text: string) {
        this.setState(
            Update(this.state, {
                item: {
                    title: {
                        $set: text
                    }
                }
            })
        );
    }
    private _handleDescriptionChange(text: string) {
        this.setState(
            Update(this.state, {
                item: {
                    description: {
                        $set: text
                    }
                }
            })
        );
    }
    private _saveButtonClick() {
        let error: string = "";
        if (this.state.item.title == null || this.state.item.title.length == 0) {
            error = "Title value canot be empty.";
        }
        else if (this.state.item.description != null && this.state.item.description.length == 0) {
            error = "Description value canot be empty.";
        }
        if (error !== "") {
            this.setState({
                errorMessage: error,
                submitting: false
            });
            return;
        }

        this.setState({
            errorMessage: error,
            submitting: true
        });
        this._saveItem();
    }
    private _resetItem() {
        this.setState(
            {
                item: { title: "", description: "", id: 0 },
                submitting: false
            }
        );
    }
    private _saveItem() {
        let saveItem: IMyChangeRequestItem = lodash.clone(this.state.item);
        if(this._itemIsClosedStatus()){
            saveItem.status = ChangeRequestStatus.Open;
        }
        
        this.props.itemSaveOperationCallback(saveItem).then(() => {
            this.setState({ showHintDialog: true });
        });
    }
    private _checkIsNewCR(item: IMyChangeRequestItem): boolean {
        return (item.id == 0) ? true : false;
    }

    private _itemIsClosedStatus(): boolean {
        return this.state.item != null
            && this.state.item.status != null
            && lodash.isEqual(this.state.item.status, ChangeRequestStatus.Closed);
    }
}
