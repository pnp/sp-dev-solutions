// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export enum DataProviderErrorCodes
{
  Unknown = 0,
  OrganizationListDoesNotExist = 1,
  PersonListDoesNotExist = 2,
  TagListDoesNotExist = 3,
  FieldNotFound = 4,
  FieldNotConifguredProperly = 5
}

export default class DataError
{
    public id: number;
    public message: string;
    public code: number;
}