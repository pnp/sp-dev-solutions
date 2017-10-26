// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { Constants } from "../models/InventoryCheckOutModel";
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { EnsureListResult } from "../../../libraries/solutions/EnsureListResult";
import { SharePointUtilityModule as ca } from '../../../libraries/solutions/SharePointUtility';

export class ProvisionManager {
  public static utility = ca.SharePointUtility;
  public static itemslistTitle: string = Constants.ItemsListTitle;
  public static checkoutslistTitle: string = Constants.CheckOutsListTitle;
  public static itemslistId: string;
  public static checkoutslistId: string;

  public static checkSPlistsExist(ctx: IWebPartContext): Promise<boolean> {
    let itemsListExists: boolean = false;
    let checkoutsListExists: boolean = false;

    return ProvisionManager.utility.checkListExists(ctx, ProvisionManager.itemslistTitle)
      .then((listExists: boolean) => {
        itemsListExists = listExists;
        return ProvisionManager.utility.checkListExists(ctx, ProvisionManager.checkoutslistTitle);
      })
      .then((listExists: boolean) => {
        checkoutsListExists = listExists;

        if (itemsListExists && checkoutsListExists) {
          return Promise.resolve(true);
        }
        else {
          return Promise.resolve(false);
        }
      });
  }

  public static siteProvisoning(ctx: IWebPartContext): Promise<EnsureListResult> {
    let canProvisoning = ProvisionManager.utility.checkCurrentUserIsAbleToManageList(ctx);

    if (!canProvisoning)
      return Promise.resolve(new EnsureListResult({ hasPermission: false }));

    return this.listsProvisoning(ctx).then(() => {
      return Promise.resolve(new EnsureListResult({ contentlistExists: true, hasPermission: true }));
    });
  }

  private static listsProvisoning(ctx: IWebPartContext): Promise<void> {
    //Create Change Request list
    return ProvisionManager.utility.createList(ctx, ProvisionManager.itemslistTitle, "", 100, false, true)
      .then((value: any): any => {
        this.itemslistId = value.Id;
        return ProvisionManager.utility.createListField(ctx, this.itemslistId, "Description", "icoDescription", false, "SP.FieldMultiLineText", 3);
      })

      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.itemslistId, "Location", "icoLocation", false, "SP.FieldText", 2);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.itemslistId, "Image Url", "Image Url", false, "SP.FieldUrl", 11);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.itemslistId, "Total Quantity", "icoTotalQuantity", true, "SP.FieldNumber", 9, { "MinimumValue": 1 });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createList(ctx, ProvisionManager.checkoutslistTitle, "", 100, false);
      })
      .then((value: any): any => {
        this.checkoutslistId = value.Id;
        return ProvisionManager.utility.createListField(ctx, this.checkoutslistId, "Item", "icoItem", true, "SP.FieldLookup", 7, null, this.itemslistId, "Title");
      })
      .then((value: string): any => {
        return ProvisionManager.utility.updateListField(ctx, this.checkoutslistId, value, "SP.FieldLookup", { Indexed: true, RelationshipDeleteBehavior: 1 });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.checkoutslistId, "Checked Out To", "icoCheckedOutTo", false, "SP.FieldUser", 20);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.checkoutslistId, "Checked Out Date", "icoCheckedOutDate", true, "SP.FieldDateTime", 4);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.checkoutslistId, "Scheduled Check-In Date", "icoScheduledCheckInDate", false, "SP.FieldDateTime", 4);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.checkoutslistId, "Actual Check-In Date", "icoActualCheckInDate", false, "SP.FieldDateTime", 4);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.checkoutslistId, "Status", "icoStatus", false, "SP.FieldChoice", 6,
          {
            "Choices": [
              "Active",
              "Closed"],
            "DefaultValue": ""
          });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.checkoutslistId, "Notes", "icoNotes", false, "SP.FieldMultiLineText", 3);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.checkoutslistId, "Quantity", "icoQuantity", true, "SP.FieldNumber", 9, { "MinimumValue": 1 });
      });
  }
}