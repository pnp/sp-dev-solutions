// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export default class UrlUtility
{
    public static ensureUrlEndsWithSlash(url: string) : string {
        
        if (url[url.length - 1] != '/')
        {
            url += '/';
        }

        return url;
    }
}