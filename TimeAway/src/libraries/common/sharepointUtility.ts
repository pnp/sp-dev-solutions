//Import Web Part properties
import { IWebPartContext } from '@microsoft/sp-webpart-base';
//Import SPHttpClient
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { SPPermission } from '@microsoft/sp-page-context';

export namespace SharePointUtilityModule {
    export class SharePointUtility {
        constructor() { }

        public static checkCurrentUserIsAbleManageList(context: IWebPartContext): boolean {
            let result = false;
            let currentPermission = context.pageContext.web.permissions;
            var isAbleManageList = currentPermission.hasPermission(SPPermission.manageLists);
            console.log("Current user permission: { High:" + currentPermission.value.High + ",Low:" + currentPermission.value.Low + "}");
            console.log("Current user is" + (isAbleManageList ? " " : "not ") + "able to manage list.");
            return isAbleManageList;
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
            baseTemplate: number): Promise<any> {
            console.log(`create list ${listTitle}`);

            const reqJSON: any = JSON.parse(
                `{
                "@odata.type": "#SP.List",
                "AllowContentTypes": true,
                "EnableModeration": true,
                "BaseTemplate": ${baseTemplate},
                "ContentTypesEnabled": true,
                "Description": "${listDescription}",
                "Title": "${listTitle}"
                }`);

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
            : Promise<void> {

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
                    return response.json();
                });
        }

    }
}
