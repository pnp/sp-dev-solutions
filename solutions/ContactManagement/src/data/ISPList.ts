// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ISPField } from './ISPField';

export interface ISPListList {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  ListItemEntityTypeFullName?: string;
  Id?: string;
  ListItemCount? : number;
  Fields?: ISPField[]; 
}