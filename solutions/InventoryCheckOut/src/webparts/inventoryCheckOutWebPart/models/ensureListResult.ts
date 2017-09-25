// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export class EnsureListResult {
    public constructor(init?: Partial<EnsureListResult>) {
        if (init) {
            this.contentlistExists = init.contentlistExists || this.contentlistExists;
            this.hasPermission = init.hasPermission || this.hasPermission;
            this.message = init.message || this.message;
        }
    }
    public contentlistExists: boolean;
    public hasPermission: boolean;
    public message: string;
}