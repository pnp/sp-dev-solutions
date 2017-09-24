import * as React from 'react';
import { css, Label, TextField, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import IMyCRNewDialogProps from './IMyCRNewDialogProps';
import MyCRNewForm from '../NewForm/MyCRNewForm';
import styles from './MyCRNewDialog.module.scss';
import { NewCRFormShowIn } from '../../models/MyCRModel';


export default class MyCRNewDialog extends React.Component<IMyCRNewDialogProps, any> {
    constructor(props: IMyCRNewDialogProps) {
        super(props);
    }
    public render(): JSX.Element {
        return (
            <Dialog
                isOpen={this.props.isOpen}
                type={DialogType.normal}
                onDismiss={this._closeDialog.bind(this)}
                isBlocking={true}
                title="New Issue"
                containerClassName={styles.mycrdialog}>
                <MyCRNewForm
                    showIn={NewCRFormShowIn.Dialog}
                    isOpen={this.props.isOpen}
                    newcrtext={this.props.newcrtext}
                    item={this.props.item}
                    newcrsubmissiontext={this.props.newcrsubmissiontext}
                    newcrbuttontext={this.props.newcrbuttontext}
                    itemSaveOperationCallback={this.props.itemSaveOperationCallback}
                    itemCloseDialogOperationCallback={this._closeDialog.bind(this)}
                />
            </Dialog>
        );
    }
    private _closeDialog() {
        this.props.itemCloseOperationCallback();
    }
}
