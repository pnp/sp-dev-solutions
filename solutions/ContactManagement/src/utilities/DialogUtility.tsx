// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';

import styles from '../webparts/crm/Crm.module.scss';
import DialogOptions from './DialogOptions';

import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button } from 'office-ui-fabric-react/lib/Button';

export type DialogCallback = (options? : DialogOptions) => void;

export default class DialogUtility {
    
    private static activeDialog : Element;
    public static dialogHostElement : Dialog;
    private static activeOptions : DialogOptions;

    public static isShowingDialog : boolean;

    public static showDialog(elt : React.ReactElement<any>, options? : DialogOptions) : void {
        
        options.parent = elt;

        if (options != null)
        {
            DialogUtility.pushOptions(options);
        }

        DialogUtility.isShowingDialog = true;

        var CustomDialog = React.createClass({
            render: () => {
                return <Dialog  isOpen={ DialogUtility.isShowingDialog }
                            type={ DialogType.largeHeader }
                            className = { styles.dialogOuter}
                            title= { options && options.dialogTitle ? options.dialogTitle : "Dialog" }
                            subText= { options && options.dialogSubtext ? options.dialogSubtext : "" }
                            ref={ (input) => { DialogUtility.dialogHostElement = input; }}
                            isBlocking={ false } >
                            {elt}
                      <DialogFooter>
                        <Button style={{ border: "solid 1px #D0D0D0" }} onClick={ DialogUtility.saveDialog }>Save</Button>
                        <Button style={{ border: "solid 1px #D0D0D0" }} onClick={ DialogUtility.hideDialog }>Cancel</Button>
                      </DialogFooter>
                    </Dialog>;
                }
            });

        let divOuter = document.createElement("DIV");
        divOuter.style.zIndex = "100";
        divOuter.style.minWidth = "600px";
        divOuter.style.width = "80vw";

        ReactDom.render(<CustomDialog/>, divOuter, (eltA) => {
            DialogUtility.dialogHostElement.setState( { isOpen: true });
            DialogUtility.dialogHostElement.forceUpdate();
        });

    
        DialogUtility.activeDialog = divOuter;
    }

    public static pushOptions(options : DialogOptions)
    {
        this.activeOptions = options;
    }

    public static doSaveCallout()
    {
        let diaOptions = DialogUtility.activeOptions;
        
        (diaOptions.onSaveCallout as DialogCallback)(diaOptions); 
    }

    public static setActions(closeCancelCallout? : DialogCallback, saveCallout? : DialogCallback)
    {
        if (this.activeOptions != null)
        {
            this.activeOptions.onSaveCallout = saveCallout;
            this.activeOptions.onCloseCancelCallout = closeCancelCallout;          
        }
        else
        {
            this.pushOptions({
                onSaveCallout: saveCallout,
                onCloseCancelCallout: closeCancelCallout
            });
        }
    }

    public static hideDialog() : void 
    {
        if (DialogUtility.activeOptions != null && DialogUtility.activeOptions.onCloseCancelCallout != null)
        {
            let diaOptions = DialogUtility.activeOptions;

            (diaOptions.onCloseCancelCallout as DialogCallback)(diaOptions); 
        }

        DialogUtility.clearDialog();
    }


    public static saveDialog() : void 
    {
        if (DialogUtility.activeOptions != null && DialogUtility.activeOptions.onSaveCallout != null)
        {
           DialogUtility.doSaveCallout();
        }

        DialogUtility.clearDialog();
    }

    private static clearDialog() : void
    {
        // Note: despite this code, doesn't seem to update
        DialogUtility.isShowingDialog = false;
        DialogUtility.dialogHostElement.setState( { isOpen: false });
        DialogUtility.dialogHostElement.forceUpdate();

        // ... therefore, remove element by force.
        if (DialogUtility.dialogHostElement != null)
        {
            let elts =  window.document.getElementsByClassName("ms-Dialog");

            for (var i=0; i<elts.length; i++)
            {
                elts[i].setAttribute("style", "display:none");
            }
        }

        DialogUtility.activeOptions  = null;
        DialogUtility.activeDialog = null;
    }
}
