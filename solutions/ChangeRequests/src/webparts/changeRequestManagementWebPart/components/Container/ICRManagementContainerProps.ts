// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ICRManagementDataProvider } from '../../dataProviders/ICRManagementDataProvider';

export interface ICRManagementContainerProps {
  context: IWebPartContext;
  isInitialized: boolean;
  displayMode: number;
  dataProvider: ICRManagementDataProvider;
}