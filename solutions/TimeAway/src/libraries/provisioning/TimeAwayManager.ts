import * as ca from "../solutions/SharePointUtility";
import {Constants} from "../provisioning/Constants";
import { EnsureListResult } from "../models/timeAwayModel";
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class TimeAwayManager {
  public static checkSPListTimeAway(ctx: IWebPartContext): Promise<EnsureListResult> {
    let listTitle = Constants.TimeAwayListTitle;
    let listExisted = true;
    var self = this;
    var utility = ca.SharePointUtilityModule.SharePointUtility;

    //check list
    return utility.checkListExists(ctx, listTitle)
      .then((isExisted: boolean): Promise<EnsureListResult> => {
        if (!isExisted) {
          console.log("The SharePoint list " + listTitle + " does not exist.");
          let isAbleCreateList = utility.checkCurrentUserIsAbleToManageList(ctx);
          if (!isAbleCreateList) {
            return Promise.resolve(new EnsureListResult({ contentlistExists: false, hasPermission: false, message: "Time Away is not configured yet." }));
          }
          else {
            return Promise.resolve(new EnsureListResult({ contentlistExists: false, hasPermission: true })); 
          }
        } else {
          console.log("The SharePoint list " + listTitle + " exists.");
          return Promise.resolve(new EnsureListResult({ contentlistExists: true }));
        }
      });
  }
  
  public static ensureSPListTimeAway(ctx: IWebPartContext): Promise<EnsureListResult> {
    let listTitle = Constants.TimeAwayListTitle;
    let listExisted = true;
    var self = this;
    var utility = ca.SharePointUtilityModule.SharePointUtility;

    //check list
    return utility.checkListExists(ctx, listTitle)
      .then((isExisted: boolean): Promise<EnsureListResult> => {
        if (!isExisted) {
          console.log("The SharePoint list " + listTitle + " does not exist.");

          return utility.createList(ctx, listTitle, "", 100)
            .then((value: any): any => {
              let listGuid = value.Id;
              return utility.createListField(ctx, listGuid, "First Name", "taFirstName", false, "SP.FieldText", 2)
                .then((): Promise<void> => {
                  return utility.createListField(ctx, listGuid, "Last Name", "taLastName", false, "SP.FieldText", 2);
                })
                .then((): Promise<void> => {
                  return utility.createListField(ctx, listGuid, "Person", "taPerson", false, "SP.FieldUser", 20);
                })
                .then((): Promise<void> => {
                  return utility.createListField(ctx, listGuid, "Start", "taStart", false, "SP.FieldDateTime", 4);
                })
                .then((): Promise<void> => {
                  return utility.createListField(ctx, listGuid, "End", "taEnd", false, "SP.FieldDateTime", 4);
                })
                .then((): Promise<void> => {
                  return utility.createListField(ctx, listGuid, "Comments", "taComments", false, "SP.FieldMultiLineText", 3);
                })
                .then((): Promise<EnsureListResult> => {
                  return Promise.resolve(new EnsureListResult({ contentlistExists: true, hasPermission: true }));
                });
            });
        } else {
          console.log("The SharePoint list " + listTitle + " exists.");
          return Promise.resolve(new EnsureListResult({ contentlistExists: true }));
        }
      });
  }
}