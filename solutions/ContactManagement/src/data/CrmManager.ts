// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import { ICrmDataProvider } from '../dataProviders/ICrmDataProvider';

import MockCrmDataProvider from '../dataProviders/MockCrmDataProvider';
import SharePointCrmDataProvider from '../dataProviders/SharePointCrmDataProvider';


export default class CrmManager
{
    private _context: IWebPartContext;
    private _data: ICrmDataProvider;

	public get data(): ICrmDataProvider { return this._data; }

    public get userLoginName() : string { return this._context.pageContext.user.loginName; }
    
    constructor(context : IWebPartContext)
    {
        this._context = context;

        if (Environment.type == EnvironmentType.Local) 
        {
            this._data = new MockCrmDataProvider();
        }
        else
        {
            let spcrmdata = new SharePointCrmDataProvider();

            spcrmdata.httpClient = this._context.spHttpClient;
            spcrmdata.meUserLoginName = this._context.pageContext.user.loginName;            
            spcrmdata.webUrl = this._context.pageContext.web.serverRelativeUrl;

            this._data = spcrmdata;
        }

        this._data.selectedOrganizationList = this._data.defaultOrganizationList;
        this._data.selectedPersonList = this._data.defaultPersonList;
        this._data.selectedTagList =  this._data.defaultTagList;
    }
}