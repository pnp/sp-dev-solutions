// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import DialogCallback from './DialogUtility';

export default class DialogOptions {
    public onCloseCancelCallout? : DialogCallback;
    public onSaveCallout? : DialogCallback;
    public displaySaveButton? : boolean;
    public saveButtonText? : string;
    public dialogTitle? : string;
    public dialogSubtext? : string;
    public closeCancelButtonText? : string;
    public tag? : Object;
    public parent? : any;
}