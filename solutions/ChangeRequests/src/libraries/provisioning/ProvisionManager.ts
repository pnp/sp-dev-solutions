import { SharePointUtilityModule as ca } from '../solutions/SharePointUtility';
import { Constants } from "./Constants";
import { EnsureListResult } from "../models/EnsureListResult";
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class ProvisionManager {
  public static utility = ca.SharePointUtility;
  public static crlistTitle: string = Constants.ChangeRequestListTitle;
  public static cdlistTitle: string = Constants.ChangeDiscussionListTitle;
  public static crListId: string;
  public static cdListId: string;
  public static cruGroupTitle: string = Constants.ChangeRequestUsersGroupName;
  public static crtGroupTitle: string = Constants.ChangeRequestTriageTeamGroupName;
  public static cruGroupId: string;
  public static crtGroupId: string;
  public static cruRoleTitle: string = Constants.ChangeRequestUsersRoleName;
  public static crtRoleTitle: string = Constants.ChangeRequestTriageTeamRoleName;
  public static cruRoleId: string;
  public static crtRoleId: string;
  
  
  public static checkSPlistsExist(ctx: IWebPartContext): Promise<boolean>{
    let crListExists: boolean = false;
    
    // note that we don't check for the change discussion list explicitly, since the user
    // may have been restricted access to the list.
    return ProvisionManager.utility.checkListExists(ctx, ProvisionManager.crlistTitle)
    .then((listExists: boolean) => {
      crListExists = listExists;

      if (crListExists){
        console.log("The lists exist");
        return Promise.resolve(true);
      }
      else{
        console.log("The lists not exist");
        return Promise.resolve(false);
      }
    });
  }

  public static siteProvisoning(ctx: IWebPartContext): Promise<EnsureListResult>{
    let canProvisoning = ProvisionManager.utility.checkCurrentUserIsAbleToManageList(ctx);

    if (!canProvisoning)
       return Promise.resolve(new EnsureListResult({ hasPermission: false }));

    return this.listsProvisoning(ctx)
      .then(() => {
        return this.rolesProvisoning(ctx);
      })
      .then(() => {
        return this.groupsProvisoning(ctx);
      })
      .then(() => {
        return this.addRoleAssignment(ctx);
      })
      .then(()=> {
        return this.assignPermissionForRequestUsers(ctx);
      })
      .then(() => {
        return Promise.resolve(new EnsureListResult({ contentlistExists: true, hasPermission: true }));
      });
  }

  private static assignPermissionForRequestUsers(ctx: IWebPartContext): Promise<void>{
    let permissionId: string;

    return ProvisionManager.utility.getRoleId(ctx, "Contribute")
      .then((value: string) => {
        permissionId = value;
        return ProvisionManager.utility.breakRoleInheritanceOfList(ctx, this.crlistTitle);
      })
      .then(() => {
        return ProvisionManager.utility.setNewPermissionsForGroup(ctx, this.crlistTitle, this.cruGroupId, permissionId);
      });
  }

  private static addRoleAssignment(ctx: IWebPartContext): Promise<void>{
    return ProvisionManager.utility.addRoleAssignment(ctx, this.cruGroupId, this.cruRoleId)
      .then(() => {
        return ProvisionManager.utility.addRoleAssignment(ctx, this.crtGroupId, this.crtRoleId);
      });
  }

  private static rolesProvisoning(ctx: IWebPartContext): Promise<void>{
     return ProvisionManager.utility.createRole(ctx, this.crtRoleTitle, "432", "1011031039")
     .then((value: any) => {
        this.crtRoleId = value.Id;
        return ProvisionManager.utility.createRole(ctx, this.cruRoleTitle, "176", "138612833");
     })
     .then((value: any) => {
        this.cruRoleId = value.Id;
     });
  }

  private static groupsProvisoning(ctx: IWebPartContext): Promise<void> {
    return ProvisionManager.utility.createGroup(ctx, this.cruGroupTitle)
      .then((value: any) => {
        this.cruGroupId = value.Id;
        return ProvisionManager.utility.createGroup(ctx, this.crtGroupTitle);
      })
      .then((value: any) => {
        this.crtGroupId = value.Id;
      });
  }

  private static listsProvisoning(ctx: IWebPartContext): Promise<void> {
    //Create Change Request list
    return ProvisionManager.utility.createList(ctx, ProvisionManager.crlistTitle, "", 100, false, true)
      .then((value: any): any => {
        this.crListId = value.Id;
        return ProvisionManager.utility.setListSecurity(ctx, ProvisionManager.crlistTitle, "2", "2");
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.crListId , "Description", "taDescription", false, "SP.FieldMultiLineText", 3, {
          'RichText': true
        });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.crListId , "Status", "taStatus", false, "SP.FieldChoice", 6,
          {"Choices": [
            "Open",
            "In Progress",
            "Closed"],
            "DefaultValue": "Lead"});
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.crListId , "Status Updates", "taStatusUpdates", false, "SP.FieldMultiLineText", 3, {
          "RichText": true
        });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createList(ctx, ProvisionManager.cdlistTitle, "", 100, false); 
      })
      .then((value: any): any => {
        this.cdListId = value.Id;
        return ProvisionManager.utility.createListField(ctx, this.cdListId, "Change", "crmChange", true, "SP.FieldLookup", 7, null, this.crListId, "Title");
      })
      .then((value: string): any => {
        return ProvisionManager.utility.updateListField(ctx, this.cdListId, value, "SP.FieldLookup", {Indexed: true, RelationshipDeleteBehavior : 1});
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.cdListId, "Triage Comments", "taTriageComments", false, "SP.FieldMultiLineText", 3, {'RichText': true});
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.cdListId, "Sub Status", "taSubStatus", false, "SP.FieldChoice", 6,
          {"Choices": [
            "Untriaged",
            "Investigating",
            "Fix in Progress",
            "Resolved – Won’t Fix",
            "Resolved – Cannot reproduce request",
            "Resolved – Duplicate"],
            "DefaultValue": "Untriaged"});
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.cdListId, "Priority", "taPriority", false, "SP.FieldChoice", 6,
          {"Choices": [
            "High",
            "Medium",
            "Low"],
            "DefaultValue": "Medium"});
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(ctx, this.cdListId, "Assigned To", "taAssignedTo", false, "SP.FieldUser", 20);
      });
  }
}