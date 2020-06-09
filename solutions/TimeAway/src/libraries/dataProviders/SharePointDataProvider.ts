import * as moment from 'moment';
import { IMyTimeAwayDataProvider } from '../dataProviders/IMyTimeAwayDataProvider';
import { TimePeriod, IMyTimeAwayItem, IPerson, WeekType } from "../models/timeAwayModel";
import { sp } from '../../pnp-preset';
import { IItemAddResult, IItemUpdateResult } from '@pnp/sp/items';

export class SharePointDataProvider implements IMyTimeAwayDataProvider {
  private _weekType: WeekType;
  private _period: TimePeriod;

  private _listName: string;

  private _currentUser: IPerson;

  public constructor(listName: string, normalWeekToggleField: boolean, period: TimePeriod) {
    this.updateWeekType(normalWeekToggleField);
    this._period = period;

    this._listName = listName;
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
      .then(() => this._createItem(item))
      .then(() => this._getItems(item.personId));
  }

  // update item
  public updateMyTimeAwayItem(itemUpdated: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    return this._checkItemPerson(itemUpdated)
      .then(() => this._updateItem(itemUpdated))
      .then(() => this._getItems(itemUpdated.personId));
  }

  //delete item
  public deleteMyTimeAwayItem(itemDeleted: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    return this._checkItemPerson(itemDeleted)
      .then(() => this._deleteItem(itemDeleted))
      .then(() => this._getItems(itemDeleted.personId));
  }

  private _getItems(userId: string): Promise<IMyTimeAwayItem[]> {
    return sp.web
      .lists.getByTitle(this._listName)
      .items
      .filter(this._getFilterString(userId))
      .select('Id', 'First_x0020_Name', 'Last_x0020_Name', 'Start', 'End', 'Comments', 'PersonId', 'OData__ModerationStatus')
      .get()
      .then(items => {
        return items.map(item => {
          return {
            id: item.Id,
            firstName: item.First_x0020_Name,
            lastName: item.Last_x0020_Name,
            start: item.Start,
            end: item.End,
            personId: item.PersonId,
            comments: item.Comments,
            status: item.OData__ModerationStatus,
            link: `../lists/${this._listName}/DispForm.aspx?ID=${item.Id}`
          };
        });
      });
  }

  private _createItem(item: IMyTimeAwayItem): Promise<IItemAddResult> {
    return sp.web
      .lists.getByTitle(this._listName)
      .items.add({
        'Title': 'My Time Away',
        'First_x0020_Name': item.firstName,
        'Last_x0020_Name': item.lastName,
        'Start': item.start.toJSON(),
        'End': item.end.toJSON(),
        'PersonId': item.personId,
        'Comments': item.comments
      });
  }

  private _updateItem(item: IMyTimeAwayItem): Promise<IItemUpdateResult> {
    return sp.web
      .lists.getByTitle(this._listName)
      .items.getById(item.id)
      .update({
        'Title': 'My Time Away',
        'First_x0020_Name': item.firstName,
        'Last_x0020_Name': item.lastName,
        'Start': item.start.toJSON(),
        'End': item.end.toJSON(),
        'PersonId': item.personId,
        'Comments': item.comments
      });
  }

  private _deleteItem(item: IMyTimeAwayItem): Promise<void> {
    return sp.web
      .lists.getByTitle(this._listName)
      .items.getById(item.id)
      .delete();
  }

  //get current login user
  private _getCurrentUser(): Promise<IPerson> {
    if (this._currentUser != null) {
      return Promise.resolve(this._currentUser);
    }
    else {
      return sp.web.currentUser.get()
        .then(user => {
          if (!user.Title) {
            return null;
          }

          const nameChunks: string[] = user.Title.split(' ');

          return {
            id: user.Id.toString(),
            firstName: nameChunks[0],
            lastName: nameChunks.length > 1 ? nameChunks[1] : ''
          };
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
      filterUrl = `((PersonId eq ${userId}) and ((Start ge '${condition}') or (End ge '${condition}')))`;
    }
    else {
      let condition: string = '';
      if (this._weekType == WeekType.FiveDays) {
        condition = moment.utc().startOf('week').add(1, 'days').format();
      }
      else {
        condition = moment.utc().startOf('week').subtract(1, 'days').format();
      }
      filterUrl = `((PersonId eq ${userId}) and ((Start lt '${condition}') or (End lt '${condition}')))`;
    }
    return filterUrl;
  }

  //Check range of date/times overlaps with an existing Time Away.
  public checkTimeSlot(item: IMyTimeAwayItem): Promise<boolean> {
    return this._getCurrentUser()
      .then((person: IPerson) => {
        let filter: string;

        if (item.id != null && item.id > 0) {
          filter = `Id ne ${item.id} and PersonId eq ${person.id} and '${item.start.toJSON()}' lt End and '${item.end.toJSON()}' gt Start`;
        }
        else {
          filter = `PersonId eq ${person.id} and '${item.start.toJSON()}' lt End and '${item.end.toJSON()}' gt Start`;
        }

        return sp.web
          .lists.getByTitle(this._listName)
          .items.select('Start', 'End').filter(filter);
      })
      .then(items => items.length === 0);
  }
}