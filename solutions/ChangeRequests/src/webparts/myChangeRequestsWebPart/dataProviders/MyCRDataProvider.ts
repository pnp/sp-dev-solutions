import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyCRDataProvider } from './IMyCRDataProvider';
import { IMyChangeRequestItem, Constants, IPerson } from '../../../libraries/index';

export class MyCRDataProvider implements IMyCRDataProvider {
  private _webPartContext: IWebPartContext;
  private _listName: string;
  private _listUrl: string;
  private _listItemsUrl: string;
  private _currentUser: IPerson;

  public constructor(context: IWebPartContext) {
    this._webPartContext = context;
    this._listName = Constants.ChangeRequestListTitle;
    this._listUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${this._listName}')`;
    this._listItemsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${this._listName}')/items`;
    this._currentUser = null;
  }

  public getChangeRequestStatusField(): Promise<Array<string>> {
    const requester: SPHttpClient = this._webPartContext.spHttpClient;
    const queryString: string = `?$filter=EntityPropertyName eq 'Status'`;
    const queryUrl: string = this._listUrl + `/fields` + queryString;

    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json) => {
        return Promise.resolve(json.value[0].Choices);
      });
  }

  public getMyChangeRequestItems(): Promise<IMyChangeRequestItem[]> {
    return this._getItems();
  }

  public createMyChangeRequestItem(itemCreated: IMyChangeRequestItem): Promise<IMyChangeRequestItem[]> {
    return this._createItem(itemCreated)
      .then((success) => {
        console.log("createMyChangeRequestItem " + success);
        return this._getItems();
      });
  }

  public updateMyChangeRequestItem(itemUpdated: IMyChangeRequestItem): Promise<IMyChangeRequestItem[]> {
    return this._updateItem(itemUpdated)
      .then((success) => {
        console.log("updateMyChangeRequestItem " + success);
        return this._getItems();
      });
  }

  private _createItem(item: IMyChangeRequestItem): Promise<boolean> {
    let requester: SPHttpClient = this._webPartContext.spHttpClient;
    const body: {} = {
      'Title': item.title,
      'Status': item.status,
      'Description': item.description
    };

    return requester.post(this._listItemsUrl, SPHttpClient.configurations.v1,
      {
        body: JSON.stringify(body)
      })
      .then((response: SPHttpClientResponse) => {
        return response.ok;
      });
  }

  private _updateItem(item: IMyChangeRequestItem): Promise<boolean> {
    const itemUpdatedUrl: string = `${this._listItemsUrl}(${item.id})`;
    let requester: SPHttpClient = this._webPartContext.spHttpClient;
    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    const body: {} = {
      'Title': item.title,
      'Status': item.status,
      'Description': item.description,
    };

    return requester.fetch(itemUpdatedUrl, SPHttpClient.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'PATCH'
      })
      .then((response: SPHttpClientResponse) => {
        return response.ok;
      });
  }

  private _getItems(): Promise<IMyChangeRequestItem[]> {
    const requester: SPHttpClient = this._webPartContext.spHttpClient;
    const queryString: string = `?$select=ID,Title,Description,Status,Status_x0020_Updates&$orderby=Status desc,ID asc`;
    const queryUrl: string = this._listItemsUrl + queryString;
    console.log(queryUrl);
    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: any[] }) => {
        if (json.value != null) {
          return json.value.map((item: any) => {
            const myItem: IMyChangeRequestItem = {
              id: item.ID,
              title: item.Title,
              description: item.Description,
              status: item.Status,
              statusupdates: item.Status_x0020_Updates
            };
            return myItem;
          });
        }
        else {
          return null;
        }
      });
  }
  
  private _getCurrentUser(): Promise<IPerson> {
    if (this._currentUser != null) {
      return Promise.resolve(this._currentUser);
    }
    else {
      return this._webPartContext.spHttpClient.
        get(this._webPartContext.pageContext["web"]["absoluteUrl"] + `/_api/web/currentuser`, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((json: any) => {
          let userId: string = json['Id'], userTitle: string = json['Title'];
          let firstName: string = '', lastName: string = '';
          let person: IPerson = null;
          if (userTitle != null) {
            let strArray: string[] = userTitle.split(' ');
            firstName = strArray[0];
            lastName = strArray.length > 1 ? strArray[1] : '';
            person = { id: Number(userId), firstName: firstName, lastName: lastName, displayName: userTitle };
          }
          return person;
        });
    }
  }
}