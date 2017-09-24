//Import Web Part properties
import { IWebPartContext } from '@microsoft/sp-webpart-base';
//Import SPHttpClient
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { SPPermission } from '@microsoft/sp-page-context';

export namespace SharePointUtilityModule {
    export class SharePointUtility {
        constructor() { }

        public static checkCurrentUserIsAbleToManageList(context: IWebPartContext): boolean {
            let result = false;
            let currentPermission = context.pageContext.web.permissions;
            var isAbleToProvision = currentPermission.hasPermission(SPPermission.manageLists) && currentPermission.hasPermission(SPPermission.managePermissions);
            console.log("Current user permission: { High:" + currentPermission.value.High + ",Low:" + currentPermission.value.Low + "}");
            console.log("Current user is" + (isAbleToProvision ? " " : "not ") + "able to manage lists and permissions.");
            return isAbleToProvision;
        }

        //Determine if a SharePoint list exists
        public static checkListExists(context: IWebPartContext, listTitle: string): Promise<boolean> {
            return context.spHttpClient.get(context.pageContext.web.absoluteUrl
                + "/_api/web/lists/GetByTitle('"
                + listTitle
                + "')?$select=Title", SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    if (response.status === 404) {
                        return false;
                    }
                    else {
                        return true;
                    }
                });
        }

        //Create a SharePoint list
        public static createList(context: IWebPartContext,
            listTitle: string,
            listDescription: string,
            baseTemplate: number,
            enableApproval: boolean = true,
            enableVersioning: boolean = false): Promise<any> {

            console.log(`create list ${listTitle}`);

            const reqJSON: any = JSON.parse(
                `{
                "@odata.type": "#SP.List",
                "AllowContentTypes": true,
                "BaseTemplate": ${baseTemplate},
                "ContentTypesEnabled": true,
                "Description": "${listDescription}",
                "Title": "${listTitle}"
            }`);

            if (enableApproval){
                reqJSON.EnableModeration = true;
            }

            if (enableVersioning){
                reqJSON.EnableVersioning = true;
            }

            return context.spHttpClient.post(context.pageContext.web.absoluteUrl + "/_api/web/lists",
                SPHttpClient.configurations.v1,
                {
                    body: JSON.stringify(reqJSON),
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/json"
                    }
                })
                .then((response: SPHttpClientResponse): Promise<any> => {
                    console.log("result: " + response.status);
                    return response.json();
                });
        }

        //Create a field in a SharePoint list
        public static createListField(context: IWebPartContext,
            listGuid: string,
            title: string,
            staticName: string,
            required: boolean,
            fieldType: string,
            fieldTypeKind: number,
            more?: Object,
            lookuplistGuid?: string,
            lookupFieldName?: string)
            : Promise<any> {

            console.log(`create list field ${title}`);

            let reqJSON: Object,
                postUrl: string = context.pageContext.web.absoluteUrl
                    + "/_api/web/lists('"
                    + listGuid
                    + "')/Fields";

            const headers: any = {
                "accept": "application/json",
                "content-type": "application/json"
            };

            if (fieldTypeKind == 7) {
                //add lookupfield
                reqJSON = JSON.parse(`{
                  "parameters": {
                    "@odata.type": "#SP.FieldCreationInformation",
                    "Title": "${title}",
                    "FieldTypeKind": ${fieldTypeKind},
                    "LookupListId": "${lookuplistGuid}",
                    "LookupFieldName": "${lookupFieldName}"
                  }
                }`);

                postUrl += "/addfield";
            }
            else {
                //general field
                reqJSON = JSON.parse(`{
                "@odata.type": "#${fieldType}",
                "Title": "${title}",
                "FieldTypeKind": ${fieldTypeKind},
                "Required": ${required},
                "StaticName": "${staticName}"
                }`);
            
                //date field
                if (fieldTypeKind === 4) {
                    reqJSON["DateTimeCalendarType"] = 0;
                    reqJSON["DisplayFormat"] = 1;
                    reqJSON["FriendlyDisplayFormat"] = 1;
                }
            }

            if (more != null) {
                for (let i: number = 0; i < Object.getOwnPropertyNames(more).length; i++)
                    reqJSON[Object.getOwnPropertyNames(more)[i]] = more[Object.getOwnPropertyNames(more)[i]];
            }

            return context.spHttpClient.post(
                postUrl,
                SPHttpClient.configurations.v1,
                {
                    body: JSON.stringify(reqJSON),
                    headers: headers
                })
                .then((response: SPHttpClientResponse): Promise<any> => {
                    console.log("result: " + response.status);
                    return response.json();
                })
                .then((value: any): string => {
                    return value.Id;
                });
        }

        //Modify a field in a SharePoint list
        public static updateListField(context: IWebPartContext, listGuid: string, fieldGuid: string, fieldType: string, change: Object)
            : Promise<any> {

            let restUrl: string = context.pageContext.web.absoluteUrl
                    + `/_api/web/lists('${listGuid}')/fields('${fieldGuid}')`;

            let reqJSON = JSON.parse(`{
                "@odata.type": "#${fieldType}"
            }`);

            if (change != null) {
                for (let i: number = 0; i < Object.getOwnPropertyNames(change).length; i++)
                    reqJSON[Object.getOwnPropertyNames(change)[i]] = change[Object.getOwnPropertyNames(change)[i]];
            }

            console.log(`Modify a field ${fieldGuid} in a SharePoint list ${listGuid}`);

            return context.spHttpClient.post(restUrl,
                SPHttpClient.configurations.v1,
                {
                    body: JSON.stringify(reqJSON),
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/json",
                        "IF-MATCH": "*",
                        "X-HTTP-Method": "MERGE"
                    }
                })
                .then((response: SPHttpClientResponse): void => {
                    console.log("result: " + response.status);
                });
        }

        //Create a SharePoint Group in a SharePoint site
        public static createGroup(context: IWebPartContext, groupTitle: string): Promise<any> {
            console.log(`create group ${groupTitle}`);

            let reqJSON: Object,
                postUrl: string = context.pageContext.web.absoluteUrl
                    + "/_api/web/sitegroups";

            const headers: any = {
                "accept": "application/json",
                "content-type": "application/json"
            };

            reqJSON = JSON.parse(`{
                "@odata.type": "#SP.Group",
                "Title": "${groupTitle}"
                }`);

            return context.spHttpClient.post(
                postUrl,
                SPHttpClient.configurations.v1,
                {
                    body: JSON.stringify(reqJSON),
                    headers: headers
                })
                .then((response: SPHttpClientResponse): Promise<any> => {
                    console.log("result: " + response.status);
                    return response.json();
                });
        }

        //Create a Role defination in a SharePoint site
        public static createRole(context: IWebPartContext, roleTitle: string, high: string, low: string): Promise<void> {
            console.log(`create role ${roleTitle}`);

            let reqJSON: any,
                restUrl: string = context.pageContext.web.absoluteUrl
                    + "/_api/web/roledefinitions";

            const headers: any = {
                "accept": "application/json",
                "content-type": "application/json;IEEE754Compatible=true"
            };

            reqJSON = JSON.parse(
                `{
                    "@odata.type": "#SP.RoleDefinition",
                    "Name": "${roleTitle}",
                    "BasePermissions":
                    {
                        "High": "${high}",
                        "Low": "${low}"
                    }
                }`);

            return context.spHttpClient.post(
                restUrl, 
                SPHttpClient.configurations.v1,{
                body: JSON.stringify(reqJSON),
                headers: headers
            })
            .then((response: SPHttpClientResponse): Promise<any> => {
                console.log("result: " + response.status);
                return response.json();
            });
        }

        //Assign a role defination to a user or group in SharePoint site
        public static addRoleAssignment(context: IWebPartContext, principalid: string, roleId: string): Promise<any> {
            let restUrl: string = context.pageContext.web.absoluteUrl
                    + `/_api/web/roleassignments/addroleassignment(principalid=${principalid}, roledefid=${roleId})`;

            const headers: any = {
                "accept": "application/json",
                "content-type": "application/json;IEEE754Compatible=true"
            };

            console.log(`Assign role ${roleId} to group/user ${principalid}`);

            return context.spHttpClient.post(
                restUrl, 
                SPHttpClient.configurations.v1,{
                headers: headers
            }).then((response: SPHttpClientResponse) =>{
                console.log("result: " + response.status);
                return Promise.resolve(true);
            });
        }

        //Get role id on the web
        public static getRoleId(context: IWebPartContext, roleName: string): Promise<string>{
            let restUrl: string = context.pageContext.web.absoluteUrl
                + `/_api/web/roledefinitions?$filter=Name eq '${roleName}'`;

            const headers: any = {
                "accept": "application/json",
                "content-type": "application/json;IEEE754Compatible=true"
            };

            return context.spHttpClient.get(
                restUrl, 
                SPHttpClient.configurations.v1,{
                headers: headers
            })
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((json: { value: any[] }) => {
                if (json.value != null)
                    return Promise.resolve(json.value[0].Id);
                else
                    return Promise.resolve("");
            });
        }

        // Break role inheritance on the list.
        public static breakRoleInheritanceOfList(context: IWebPartContext, listTitle: string): Promise<void> {
            let restUrl: string = context.pageContext.web.absoluteUrl
                + `/_api/web/lists/getbytitle('${listTitle}')/breakroleinheritance(true)`;
            
            const headers: any = {
                "accept": "application/json",
                "content-type": "application/json;IEEE754Compatible=true"
            };

            console.log(`break role inheritance on the ${listTitle} list`);

            return context.spHttpClient.post(
                restUrl, 
                SPHttpClient.configurations.v1,{
                headers: headers
            }).then((response: SPHttpClientResponse) =>{
                console.log("result: " + response.status);
            });
        }

        // Add the new role assignment for the group on the list.
        public static setNewPermissionsForGroup(context: IWebPartContext, listTitle: string, principalid: string, roleid: string): Promise<void> {
            let restUrl: string = context.pageContext.web.absoluteUrl
                    + `/_api/web/lists/getbytitle('${listTitle}')/roleassignments/addroleassignment(principalid=${principalid},roledefid=${roleid})`;
            
            const headers: any = {
                "accept": "application/json",
                "content-type": "application/json;IEEE754Compatible=true"
            };

            console.log(`Add the new role ${roleid} assignment for the group ${principalid} on the ${listTitle} list`);

            return context.spHttpClient.post(
                restUrl, 
                SPHttpClient.configurations.v1,{
                headers: headers
            }).then((response: SPHttpClientResponse) =>{
                console.log("result: " + response.status);
            });
        }

        // set or update ReadSecurity or WriteSecurity using REST API
        public static setListSecurity(context: IWebPartContext, listTitle: string, readSecurity: string, writeSecurity: string): Promise<void>{
            let restUrl: string = context.pageContext.web.absoluteUrl
                    + `/_api/web/lists/getbytitle('${listTitle}')`;

            let reqJSON: any = JSON.parse(
                `{
                "@odata.type": "#SP.List",
                "ReadSecurity": ${readSecurity},
                "WriteSecurity": ${writeSecurity}
            }`);

            console.log(`set ReadSecurity to ${readSecurity} and WriteSecurity to ${writeSecurity} for ${listTitle} list`);

            return context.spHttpClient.post(restUrl,
                SPHttpClient.configurations.v1,
                {
                    body: JSON.stringify(reqJSON),
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/json",
                        "IF-MATCH": "*",
                        "X-HTTP-Method": "MERGE"
                    }
                })
                .then((response: SPHttpClientResponse): void => {
                    console.log("result: " + response.status);
                });
        }
    }
}
