import {
  SPHttpClient,
  SPHttpClientBatch,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import * as moment from 'moment';
import { IMyTimeAwayDataProvider } from '../dataProviders/IMyTimeAwayDataProvider';
import { TimePeriod, IMyTimeAwayItem, IPerson, WeekType } from "../models/timeAwayModel";

export class SharePointDataProvider implements IMyTimeAwayDataProvider {
  private _weekType: WeekType;
  private _period: TimePeriod;

  private _listName: string;
  private _listItemsUrl: string;

  private _webPartContext: IWebPartContext;
  private _currentUser: IPerson;

  public constructor(context: IWebPartContext, listName: string, normalWeekToggleField: boolean, period: TimePeriod) {
    this._webPartContext = context;
    this.updateWeekType(normalWeekToggleField);
    this._period = period;

    this._listName = listName;
    this._listItemsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${this._listName}')/items`;
    this._currentUser = null;

  }

  public updateWeekType(value: boolean) {
    this._weekType = value ? WeekType.FiveDays : WeekType.SevenDays;
  }

  public updatePeriod(value: TimePeriod) {
    this._period = value;
  }

  //get items
  public getMyTimeAwayItems(): Promise<IMyTimeAwayItem[]> {
    return this._getCurrentUser()
      .then((person: IPerson) => {
        return this._getItems(person.id);
      });
  }
 
  //create items
  public createMyTimeAwayItem(item: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    return this._checkItemPerson(item)
      .then(() => {
        const batch: SPHttpClientBatch = this._webPartContext.spHttpClient.beginBatch();
        const batchPromises: Promise<{}>[] = [
          this._createItem(batch, item),
          this._getItemsBatched(batch, item.personId)
        ];
        return this._resolveBatch(batch, batchPromises);
      });
  }
 
  // update item
  public updateMyTimeAwayItem(itemUpdated: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    return this._checkItemPerson(itemUpdated)
      .then(() => {
        const batch: SPHttpClientBatch = this._webPartContext.spHttpClient.beginBatch();
        const batchPromises: Promise<{}>[] = [
          this._updateItem(batch, itemUpdated),
          this._getItemsBatched(batch, itemUpdated.personId)
        ];
        return this._resolveBatch(batch, batchPromises);
      });
  }
 
  //delete item
  public deleteMyTimeAwayItem(itemDeleted: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    return this._checkItemPerson(itemDeleted)
      .then(() => {
        const batch: SPHttpClientBatch = this._webPartContext.spHttpClient.beginBatch();
        const batchPromises: Promise<{}>[] = [
          this._deleteItem(batch, itemDeleted),
          this._getItemsBatched(batch, itemDeleted.personId)
        ];
        return this._resolveBatch(batch, batchPromises);
      });
  }

  private _getItems(userId: string): Promise<IMyTimeAwayItem[]> {
    const requester: SPHttpClient = this._webPartContext.spHttpClient;
    const queryString: string = `?$select=Id,First_x0020_Name,Last_x0020_Name,Start,End,Comments,PersonId,OData__ModerationStatus`;
    const queryUrl: string = this._listItemsUrl + queryString + this._getFilterString(userId);
    console.log(queryUrl);
    return requester.get(queryUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: any[] }) => {
        if (json.value != null) {
          return json.value.map((item: any) => {
            const myTimeAwayItem: IMyTimeAwayItem = {
              id: item.Id,
              firstName: item.First_x0020_Name,
              lastName: item.Last_x0020_Name,
              start: item.Start,
              end: item.End,
              personId: item.PersonId,
              comments: item.Comments,
              status: item.OData__ModerationStatus,
              link: `${this._webPartContext.pageContext.web.absoluteUrl}/lists/${this._listName}/DispForm.aspx?ID=${item.Id}`
            };
            return myTimeAwayItem;
          });
        }
        else {
          return null;
        }
      });
  }

  private _getItemsBatched(requester: SPHttpClientBatch, userId: string): Promise<IMyTimeAwayItem[]> {
    const queryString: string = `?$select=Id,First_x0020_Name,Last_x0020_Name,Start,End,Comments,PersonId,OData__ModerationStatus`;
    const queryUrl: string = this._listItemsUrl + queryString + this._getFilterString(userId);

    return requester.get(queryUrl, SPHttpClientBatch.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: any[] }) => {
        return json.value.map((item: any) => {
          const myTimeAwayItem: IMyTimeAwayItem = {
            id: item.Id,
            firstName: item.First_x0020_Name,
            lastName: item.Last_x0020_Name,
            start: item.Start,
            end: item.End,
            personId: item.PersonId,
            comments: item.Comments,
            status: item.OData__ModerationStatus,
            link: `${this._webPartContext.pageContext.web.absoluteUrl}/lists/${this._listName}/DispForm.aspx?ID=${item.Id}`
          };
          return myTimeAwayItem;
        });
      });
  }
  private _createItem(batch: SPHttpClientBatch, item: IMyTimeAwayItem): Promise<SPHttpClientResponse> {
    const body: {} = {
      'Title': 'My Time Away',
      'First_x0020_Name': item.firstName,
      'Last_x0020_Name': item.lastName,
      'Start': item.start.toJSON(),
      'End': item.end.toJSON(),
      'PersonId': item.personId,
      'Comments': item.comments
    };

    return batch.post(
      this._listItemsUrl,
      SPHttpClientBatch.configurations.v1, { body: JSON.stringify(body) }
    );
  }

  private _updateItem(batch: SPHttpClientBatch, item: IMyTimeAwayItem): Promise<SPHttpClientResponse> {
    const itemUpdatedUrl: string = `${this._listItemsUrl}(${item.id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    const body: {} = {
      'Title': 'My Time Away',
      'First_x0020_Name': item.firstName,
      'Last_x0020_Name': item.lastName,
      'Start': item.start.toJSON(),
      'End': item.end.toJSON(),
      'PersonId': item.personId,
      'Comments': item.comments
    };

    return batch.fetch(itemUpdatedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        body: JSON.stringify(body),
        headers,
        method: 'PATCH'
      }
    );
  }

  private _deleteItem(batch: SPHttpClientBatch, item: IMyTimeAwayItem): Promise<SPHttpClientResponse> {
    const itemDeletedUrl: string = `${this._listItemsUrl}(${item.id})`;

    const headers: Headers = new Headers();
    headers.append('If-Match', '*');

    return batch.fetch(itemDeletedUrl,
      SPHttpClientBatch.configurations.v1,
      {
        headers,
        method: 'DELETE'
      }
    );
  }

  private _resolveBatch(batch: SPHttpClientBatch, promises: Promise<{}>[]): Promise<IMyTimeAwayItem[]> {
    return batch.execute()
      .then(() => Promise.all(promises).then((values: any) => {
        return values[values.length - 1];
      }
      ));
  }

  //get current login user
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
            person = { id: userId, firstName: firstName, lastName: lastName };
          }
          return person;
        });
    }
  }

  private _checkItemPerson(item: IMyTimeAwayItem): Promise<string> {
    if (item.personId != null && item.firstName != null && item.lastName != null) {
      let person: IPerson = { id: item.personId, firstName: item.firstName, lastName: item.lastName };
      return Promise.resolve(person.id);
    }
    else {
      return this._getCurrentUser()
        .then((person: IPerson) => {
          item.personId = person.id;
          item.firstName = person.firstName;
          item.lastName = person.lastName;
          return Promise.resolve(item.personId);
        });
    }
  }

  //Use 5 day weeks?(Monday-):(Last Saturday-)
  private _getFilterString(userId: string): string {
    let filterUrl: string = '';
    if (this._period == TimePeriod.Current) {
      let condition: string = '';
      if (this._weekType == WeekType.FiveDays) {
        condition = moment.utc().startOf('week').add(1, 'days').format();
      }
      else {
        condition = moment.utc().startOf('week').subtract(1, 'days').format();
      }
      filterUrl = `&$filter=((PersonId eq ${userId}) and ((Start ge '${condition}') or (End ge '${condition}')))`;
    }
    else {
      let condition: string = '';
      if (this._weekType == WeekType.FiveDays) {
        condition = moment.utc().startOf('week').add(1, 'days').format();
      }
      else {
        condition = moment.utc().startOf('week').subtract(1, 'days').format();
      }
      filterUrl = `&$filter=((PersonId eq ${userId}) and ((Start lt '${condition}') or (End lt '${condition}')))`;
    }
    return filterUrl;
  }

  //Check range of date/times overlaps with an existing Time Away.
  public checkTimeSlot(item: IMyTimeAwayItem): Promise<boolean> {
    const requester: SPHttpClient = this._webPartContext.spHttpClient;
    const queryString: string = `?$select=Start,End`;
    let queryUrl: string = this._listItemsUrl + queryString;

    return this._getCurrentUser()
      .then((person: IPerson) => {
        if (item.id != null && item.id > 0) {
          queryUrl += `&$filter=Id ne ${item.id} and PersonId eq ${person.id} and '${item.start.toJSON()}' lt End and '${item.end.toJSON()}' gt Start`;
        }
        else {
          queryUrl += `&$filter=PersonId eq ${person.id} and '${item.start.toJSON()}' lt End and '${item.end.toJSON()}' gt Start`;
        }

        return requester.get(queryUrl, SPHttpClient.configurations.v1);
      })
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json: { value: any[] }) => {
        return Promise.resolve(json.value.length === 0);
      });
  }
}