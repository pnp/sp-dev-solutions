import * as React from 'react';
import {
    Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, Spinner,
    SpinnerSize
} from 'office-ui-fabric-react';
import DeleteInvDialogPorps from './DeleteInvDialogPorps';



export default class DeleteInvDialog extends React.Component<DeleteInvDialogPorps, any>{
    constructor(props: DeleteInvDialogPorps) {
        super(props);
        this.state = { showDialog: this.props.showDialog };
    }
    public componentWillReceiveProps(props: DeleteInvDialogPorps) {
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
