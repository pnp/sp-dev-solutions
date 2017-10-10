// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { FieldTypeKind } from './FieldTypeKind';

export interface ISPField {
  Title: string;
  FieldTypeKind?: FieldTypeKind;
  InternalName: string;
  Id?: string;
  Choices?: string[];
  RichText?: boolean;
  MaxLength?: number;
  AllowMultipleValues?: boolean;
  LookupList?: string; /* this is the GUID of the list */
}