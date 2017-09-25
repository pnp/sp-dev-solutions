// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import View, { ViewCallback } from './View';

export type ViewSetCallback = (viewSet: ViewSet) => void;

export default class ViewSet
{
    public views : View[];

    public onViewSetAdded : ViewCallback;

    public constructor() {
        this.views = new Array();
    }

    public addView(view: View)
    {
        this.views.push(view);

        if (this.onViewSetAdded != null)
        {
            this.onViewSetAdded(view);
        }
    }
}