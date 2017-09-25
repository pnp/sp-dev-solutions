// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export interface ISharePointItem {
    Title: string;
    Id: number;
    Modified?: Date;
    Created?: Date;
    AuthorId?: number;
    EditorId?: number;
}
