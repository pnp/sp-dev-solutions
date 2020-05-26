// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { Constants } from "../models/InventoryCheckOutModel";
import { EnsureListResult } from "../../../libraries/solutions/EnsureListResult";
import { SharePointUtilityModule as ca } from '../../../libraries/solutions/SharePointUtility';
import { SPPermission } from "@microsoft/sp-page-context";

export class ProvisionManager {
  public static utility = ca.SharePointUtility;
  public static itemslistTitle: string = Constants.ItemsListTitle;
  public static checkoutslistTitle: string = Constants.CheckOutsListTitle;
  public static itemslistId: string;
  public static checkoutslistId: string;

  public static checkSPlistsExist(): Promise<boolean> {
    let itemsListExists: boolean = false;
    let checkoutsListExists: boolean = false;

    return ProvisionManager.utility.checkListExists(ProvisionManager.itemslistTitle)
      .then((listExists: boolean) => {
        itemsListExists = listExists;
        return ProvisionManager.utility.checkListExists(ProvisionManager.checkoutslistTitle);
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

  public static siteProvisoning(currentPermissions: SPPermission): Promise<EnsureListResult> {
    let canProvisoning = ProvisionManager.utility.checkCurrentUserIsAbleToManageList(currentPermissions);

    if (!canProvisoning)
      return Promise.resolve(new EnsureListResult({ hasPermission: false }));

    return this.listsProvisoning().then(() => {
      return Promise.resolve(new EnsureListResult({ contentlistExists: true, hasPermission: true }));
    });
  }

  private static listsProvisoning(): Promise<void> {
    //Create Change Request list
    return ProvisionManager.utility.createList(ProvisionManager.itemslistTitle, "", 100, false, true)
      .then((value: any): any => {
        this.itemslistId = value.Id;
        return ProvisionManager.utility.createListField(this.itemslistId, "Description", "icoDescription", false, "SP.FieldMultiLineText", 3);
      })

      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.itemslistId, "Location", "icoLocation", false, "SP.FieldText", 2);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.itemslistId, "Image Url", "Image Url", false, "SP.FieldUrl", 11);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.itemslistId, "Total Quantity", "icoTotalQuantity", true, "SP.FieldNumber", 9, { "MinimumValue": 1 });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createList(ProvisionManager.checkoutslistTitle, "", 100, false);
      })
      .then((value: any): any => {
        this.checkoutslistId = value.Id;
        return ProvisionManager.utility.createListField(this.checkoutslistId, "Item", "icoItem", true, "SP.FieldLookup", 7, null, this.itemslistId, "Title");
      })
      .then((value: string): any => {
        return ProvisionManager.utility.updateListField(this.checkoutslistId, value, "SP.FieldLookup", { Indexed: true, RelationshipDeleteBehavior: 1 });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.checkoutslistId, "Checked Out To", "icoCheckedOutTo", false, "SP.FieldUser", 20);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.checkoutslistId, "Checked Out Date", "icoCheckedOutDate", true, "SP.FieldDateTime", 4);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.checkoutslistId, "Scheduled Check-In Date", "icoScheduledCheckInDate", false, "SP.FieldDateTime", 4);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.checkoutslistId, "Actual Check-In Date", "icoActualCheckInDate", false, "SP.FieldDateTime", 4);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.checkoutslistId, "Status", "icoStatus", false, "SP.FieldChoice", 6,
          {
            "Choices": [
              "Active",
              "Closed"],
            "DefaultValue": ""
          });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.checkoutslistId, "Notes", "icoNotes", false, "SP.FieldMultiLineText", 3);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.checkoutslistId, "Quantity", "icoQuantity", true, "SP.FieldNumber", 9, { "MinimumValue": 1 });
      });
  }
}