// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';

import DialogOptions from './DialogOptions';
import { DialogBase } from 'office-ui-fabric-react/lib/Dialog';
import { CustomDialog, CustomDialogOptions } from './CustomDialog';

export type DialogCallback = (options? : DialogOptions) => void;

export default class DialogUtility {
    
    private static activeDialog : Element;
    public static dialogHostElement : DialogBase;
    private static activeOptions : DialogOptions;

    public static isShowingDialog : boolean;

    public static showDialog(elt : React.ReactElement<any>, options? : DialogOptions) : void {
        
        options.parent = elt;

        if (options != null)
        {
            DialogUtility.pushOptions(options);
        }

        DialogUtility.isShowingDialog = true;

        let divOuter = document.createElement("DIV");
        divOuter.style.zIndex = "100";
        divOuter.style.minWidth = "600px";
        divOuter.style.width = "80vw";

        const customDialog = React.createElement<CustomDialogOptions>(CustomDialog, {
            elt: elt,
            options: options
        });

        ReactDom.render(customDialog, divOuter, () => {
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
