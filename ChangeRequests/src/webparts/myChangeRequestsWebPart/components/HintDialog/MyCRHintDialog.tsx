import * as React from 'react';
import { Dialog, DialogType, DialogFooter, PrimaryButton } from 'office-ui-fabric-react';
import IMyCRHintDialogProps from './IMyCRHintDialogProps';

export default class MyCRHintDialog extends React.Component<IMyCRHintDialogProps, any> {
    constructor(props: IMyCRHintDialogProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Dialog
                isOpen={this.props.isOpen}
                type={DialogType.normal}
                onDismiss={this._closeDialog.bind(this)}
                title='Success'
                subText={this.props.newcrsubmissiontext}
                isBlocking={true}
                containerClassName='ms-dialogMainOverride'>
                <DialogFooter>
                    <PrimaryButton onClick={this._closeDialog.bind(this)} text='OK' />
                </DialogFooter>
            </Dialog>
        );
    }

    private _closeDialog() {
        this.props.itemCloseOperationCallback();
    }
}
