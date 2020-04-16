import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import DialogUtility from './DialogUtility';
import styles from '../webparts/crm/Crm.module.scss';
import DialogOptions from './DialogOptions';

export interface CustomDialogOptions {
  elt: React.ReactElement<any>;
  options?: DialogOptions;
}

export class CustomDialog extends React.Component<CustomDialogOptions, {}> {
  public render(): JSX.Element {
        return <Dialog  hidden={ !DialogUtility.isShowingDialog }
                    dialogContentProps={{
                      type: DialogType.largeHeader
                    }}
                    className = { styles.dialogOuter}
                    title= { this.props.options && this.props.options.dialogTitle ? this.props.options.dialogTitle : "Dialog" }
                    subText= { this.props.options && this.props.options.dialogSubtext ? this.props.options.dialogSubtext : "" }
                    ref={ (input) => { DialogUtility.dialogHostElement = input; }}
                    modalProps={{isBlocking: false}}>
                    {this.props.elt}
              <DialogFooter>
                <DefaultButton style={{ border: "solid 1px #D0D0D0" }} onClick={ DialogUtility.saveDialog }>Save</DefaultButton>
                <DefaultButton style={{ border: "solid 1px #D0D0D0" }} onClick={ DialogUtility.hideDialog }>Cancel</DefaultButton>
              </DialogFooter>
            </Dialog>;
  }
}