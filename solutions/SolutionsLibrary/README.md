The **SolutionsLibrary** is a small library of re-usable code used by some of the SharePoint Community web parts.  Code from the src/solutions folder is xcopy'ed and checked into to the ChangeRequest,
ContactManagement, InventorCheckOut, and TimeAway folders respectively.  

Overtime we are looking into moving adjusting solution code to use PnP JS Core library for the needed operations. 

It includes the following functions within SharePointUtility.ts:

- checkCurrentUserIsAbleToManageList - Checks if the current user has permissions to manage lists.
- checkListExists - Determines if a SharePoint list exists.
- createList - Creates a SharePoint list.
- createListField - Creates a field in a SharePoint list.
- updateListField - Modifies a field in a SharePoint list
- createGroup - Creates a SharePoint Group in a SharePoint site
- createRole - Creates a Role definition in a SharePoint site
- addRoleAssignment - Assigns a role definition to a user or group in SharePoint site
- getRoleId - Gets the role id for a role in the current web
- breakRoleInheritanceOfList - Breaks role inheritance on a SharePoint list
- setNewPermissionsForGroup -  Adds a new role assignment for the group on a SharePoint list
- setListSecurity - Sets or updates ReadSecurity or WriteSecurity on a SharePoint list
