import {
  SPHttpClient,
  SPHttpClientBatch,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import ITodoDataProvider from '../dataProviders/ITodoDataProvider';
import ITodoItem from '../models/ITodoItem';
import ITodoTaskList from '../models/ITodoTaskList';

export default class SharePointDataProvider implements ITodoDataProvider {

  private _selectedList: ITodoTaskList;
  private _taskLists: ITodoTaskList[];
  private _listsUrl: string;
  private _listItemsUrl: string;
  private _webPartContext: IWebPartContext;

  public set selectedList(value: ITodoTaskList) {
    this._selectedList = value;
    this._listItemsUrl = `${this._listsUrl}(guid'${value.Id}')/items`;
  }

  public get selectedList(): ITodoTaskList {
    return this._selectedList;
  }

  public set webPartContext(value: IWebPartContext) {
    this._webPartContext = value;
    this._listsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists`;
  }

  public get webPartContext(): IWebPartContext {
    return this._webPartContext;
  }

  public getTaskLists(): Promise<ITodoTaskList[]> {
    const queryUrl: string = this._listsUrl + '?$select=Title,Id,ListItemEntityTypeFullName';

    return this._webPartContext.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITodoTaskList[] }) => {
        return this._taskLists = json.value;
      });
  }

  public getItems(): Promise<ITodoItem[]> {
    return this._getItems(this.webPartContext.spHttpClient);
  }

  public createItem(title: string): Promise<ITodoItem[]> {
    return this
      ._createItem(title, this.webPartContext.spHttpClient)
      .then(_ => {
        return this.getItems();
      });
  }

  public deleteItem(itemDeleted: ITodoItem): Promise<ITodoItem[]> {
    return this
      ._deleteItem(itemDeleted, this.webPartContext.spHttpClient)
      .then(_ => {
        return this.getItems();
      });
  }

  public updateItem(itemUpdated: ITodoItem): Promise<ITodoItem[]> {
    return this
      ._updateItem(itemUpdated, this.webPartContext.spHttpClient)
      .then(_ => {
        return this.getItems();
      });
  }

  private _getItems(requester: SPHttpClient): Promise<ITodoItem[]> {
    const queryString: string = `?$select=Id,Title,PercentComplete`;
    const queryUrl: string = this._listItemsUrl + queryString;

    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: ITodoItem[] }) => {
        return json.value.map((task: ITodoItem) => {
          return task;
        });
      });
  }

  private _createItem(title: string, client: SPHttpClient): Promise<SPHttpClientResponse> {
    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'Title': title
    };

    return client.post(
      this._listItemsUrl,
      SPHttpClient.configurations.v1,
      { body: JSON.stringify(body) }
    );
  }

  private _deleteItem(item: ITodoItem, client: SPHttpClient): Promise<SPHttpClientResponse> {
    const itemDeletedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    return client.fetch(itemDeletedUrl,
      SPHttpClient.configurations.v1,
      {
        headers,
        method: 'DELETE'
      }
    );
  }

  private _updateItem(item: ITodoItem, client: SPHttpClient): Promise<SPHttpClientResponse> {

    const itemUpdatedUrl: string = `${this._listItemsUrl}(${item.Id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    const body: {} = {
      '@data.type': `${this._selectedList.ListItemEntityTypeFullName}`,
      'PercentComplete': item.PercentComplete
    };

    return client.fetch(itemUpdatedUrl,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'PATCH'
      }
    );
  }
}