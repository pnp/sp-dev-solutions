// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ISPView } from './ISPView';
import Query from './Query';

export type ViewCallback = (view: View) => void;

export default class View implements ISPView
{
    public query : Query;
    public title: string;

    public onViewChange? : ViewCallback;

    public constructor()
    {
        this.query = new Query();

        this._handleQueryChange = this._handleQueryChange.bind(this);
    }

    public static fromData(incomingView : ISPView) : View
    {
        var newView = new View();

        if (incomingView == null)
        {
            return newView;
        }

        if (incomingView.query != null)
        {
            newView.query = Query.fromData(incomingView.query);
        }

        newView.title = incomingView.title;

        return newView;
    }

    private _handleQueryChange() : void
    {
        if (this.onViewChange != null)
        {
            this.onViewChange(this);
        }
    }

    public setTitle(newTitle : string) 
    {
        this.title = newTitle;

        if (this.onViewChange != null)
        {
            this.onViewChange(this);
        }
    }
}