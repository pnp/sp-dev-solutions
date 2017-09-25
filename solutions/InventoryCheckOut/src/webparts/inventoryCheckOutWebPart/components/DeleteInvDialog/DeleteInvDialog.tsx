// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import {
    Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, Spinner,
    SpinnerSize
} from 'office-ui-fabric-react';
import DeleteInvDialogProps from './DeleteInvDialogProps';

export default class DeleteInvDialog extends React.Component<DeleteInvDialogProps, any>{
    constructor(props: DeleteInvDialogProps) {
        super(props);
        this.state = { showDialog: this.props.showDialog };
    }
    public componentWillReceiveProps(props: DeleteInvDialogProps) {
        this.setState({ showDialog: props.showDialog });
    }

        public render() {
            let title = "Delete " + this.props.title + " and its associated check-outs?";
        return (
            <Dialog
                isOpen={this.state.showDialog}
                type={DialogType.normal}
                onDismiss={this._closeDialog.bind(this)}
                title=''
                subText={title}
                isBlocking={true}
                containerClassName='ms-dialogMainOverride'>
                {null /** You can also include null values as the result of conditionals */}
                <DialogFooter>
                    <PrimaryButton onClick={this._confirmDialog.bind(this)} text='OK' />
                    <DefaultButton onClick={this._closeDialog.bind(this)} text='Cancel' />
                </DialogFooter>
            </Dialog>
        );
    }
    private _confirmDialog(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({ showDialog: false });
        this.props.itemDeleteConfirmOperationCallback();
    }

    private _closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({ showDialog: false });
    }
}
