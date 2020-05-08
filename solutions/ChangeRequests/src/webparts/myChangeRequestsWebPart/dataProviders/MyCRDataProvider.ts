import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyCRDataProvider } from './IMyCRDataProvider';
import { IMyChangeRequestItem, Constants } from '../../../libraries/index';
import { sp } from '../../../pnp-preset';

export class MyCRDataProvider implements IMyCRDataProvider {
  public constructor(context: IWebPartContext) {
    sp.setup(context);
  }

  public getChangeRequestStatusField(): Promise<Array<string>> {
    return sp.web
      .lists.getByTitle(`${Constants.ChangeRequestListTitle}`)
      .fields.getByInternalNameOrTitle('Status')()
      .then(
          (field: any) => Promise.resolve(field.Choices),
          err => Promise.reject(err)
      );
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
    return sp.web
      .lists.getByTitle(Constants.ChangeRequestListTitle)
      .items.add({
        'Title': item.title,
        'Status': item.status,
        'Description': item.description
      })
      .then(_ => Promise.resolve(true), _ => Promise.resolve(false));
  }

  private _updateItem(item: IMyChangeRequestItem): Promise<boolean> {
    return sp.web
      .lists.getByTitle(Constants.ChangeRequestListTitle)
      .items.getById(item.id)
      .update({
        'Title': item.title,
        'Status': item.status,
        'Description': item.description,
      })
      .then(_ => Promise.resolve(true), _ => Promise.resolve(false));
  }

  private _getItems(): Promise<IMyChangeRequestItem[]> {
    return sp.web
      .lists.getByTitle(Constants.ChangeRequestListTitle)
      .items
        .select('ID', 'Title', 'Description', 'Status', 'Status_x0020_Updates')
        .orderBy('Status', false)
        .orderBy('ID', true)()
      .then(
        crItems => crItems.map(item => {
          return {
            id: item.ID,
            title: item.Title,
            description: item.Description,
            status: item.Status,
            statusupdates: item.Status_x0020_Updates
          };
        }),
        err => Promise.reject(err)
      );
  }
}