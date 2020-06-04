// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPPermission } from '@microsoft/sp-page-context';
import { sp } from '../../pnp-preset';
import { DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType, IFields, IFieldAddResult, ChoiceFieldFormatType, FieldUserSelectionMode, IField } from '@pnp/sp/fields';

export namespace SharePointUtilityModule {
    export class SharePointUtility {
        private static pnpSetUp: boolean = false;

        constructor() { }

        private static ensurePnpSetUp(context: IWebPartContext): void {
            if (!this.pnpSetUp) {
                sp.setup(context);
                this.pnpSetUp = true;
            }
        }

        // Checks if the current user has permissions to manage lists.
        public static checkCurrentUserIsAbleToManageList(context: IWebPartContext): boolean {
            let currentPermission = context.pageContext.web.permissions;
            var isAbleToProvision = currentPermission.hasPermission(SPPermission.manageLists) && currentPermission.hasPermission(SPPermission.managePermissions);
            console.log("Current user permission: { High:" + currentPermission.value.High + ",Low:" + currentPermission.value.Low + "}");
            console.log("Current user is" + (isAbleToProvision ? " " : "not ") + "able to manage lists and permissions.");
            return isAbleToProvision;
        }

        // Determines if a SharePoint list exists
        public static checkListExists(context: IWebPartContext, listTitle: string): Promise<boolean> {
            this.ensurePnpSetUp(context);
            return sp.web
                .lists.getByTitle(listTitle).select('Title')()
                .then(_ => true, _ => false);
        }

        // Creates a SharePoint list
        public static createList(context: IWebPartContext,
            listTitle: string,
            listDescription: string,
            baseTemplate: number,
            enableApproval: boolean = true,
            enableVersioning: boolean = false): Promise<any> {
            this.ensurePnpSetUp(context);
            console.log(`create list ${listTitle}`);

            return sp.web
                .lists.add(listTitle, listDescription, baseTemplate, true, {
                    EnableModeration: enableApproval,
                    EnableVersioning: enableVersioning
                })
                .then(listResponse => listResponse.data);
        }

        // Creates a field in a SharePoint list
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
            this.ensurePnpSetUp(context);
            console.log(`create list field ${title}`);

            const fieldProperties: any = {
                FieldTypeKind: fieldTypeKind,
                Required: required
            };

            if (more != null) {
                for (let i: number = 0; i < Object.getOwnPropertyNames(more).length; i++) {
                    const propertyName = Object.getOwnPropertyNames(more)[i];
                    fieldProperties[propertyName] = more[propertyName];
                }
            }

            const fields: IFields = sp.web.lists.getById(listGuid).fields;
            let fieldAddResult: Promise<IFieldAddResult>;

            switch (fieldTypeKind) {
                case 3:
                    const richText: boolean = typeof fieldProperties.RichText !== 'undefined' ? fieldProperties.RichText : false;
                    delete fieldProperties.RichText;
                    fieldAddResult = fields.addMultilineText(title, undefined, richText);
                    break;
                case 4:
                    fieldAddResult = fields.addDateTime(
                        title,
                        DateTimeFieldFormatType.DateTime,
                        CalendarType.Gregorian,
                        DateTimeFieldFriendlyFormatType.Disabled,
                        fieldProperties);
                    break;
                case 6:
                    const choices: string[] = typeof fieldProperties.Choices !== 'undefined' ? fieldProperties.Choices : [];
                    delete fieldProperties.Choices;
                    fieldAddResult = fields.addChoice(title, choices, ChoiceFieldFormatType.Dropdown, false, fieldProperties);
                    break;
                case 7:
                    fieldAddResult = fields.addLookup(title, lookuplistGuid, lookupFieldName, fieldProperties);
                    break;
                case 20:
                    fieldAddResult = fields.addUser(title, FieldUserSelectionMode.PeopleOnly, fieldProperties);
                    break;
                default:
                    fieldAddResult = fields.add(title, fieldType, fieldProperties);
            }

            return fieldAddResult.then(fieldResult => fieldResult.data.Id);
        }

        // Modifies a field in a SharePoint list
        public static updateListField(context: IWebPartContext, listGuid: string, fieldGuid: string, fieldType: string, change: Object)
            : Promise<any> {
            this.ensurePnpSetUp(context);
            console.log(`Modify a field ${fieldGuid} in a SharePoint list ${listGuid}`);

            return sp.web
                .lists.getById(listGuid)
                .fields.getById(fieldGuid)
                .update(change, fieldType);
        }

        // Creates a SharePoint Group in a SharePoint site
        public static createGroup(context: IWebPartContext, groupTitle: string): Promise<any> {
            this.ensurePnpSetUp(context);
            console.log(`create group ${groupTitle}`);

            return sp.web.siteGroups.add({
                Title: groupTitle
            })
            .then(groupAddResult => groupAddResult.data);
        }

        // Creates a Role definition in a SharePoint site
        public static createRole(context: IWebPartContext, roleTitle: string, high: string, low: string): Promise<any> {
            this.ensurePnpSetUp(context);
            console.log(`create role ${roleTitle}`);

            return sp.web
                .roleDefinitions.add(roleTitle, '', 255, {
                    High: high,
                    Low: low
                } as any)
                .then(roleDefinitionAddResult => roleDefinitionAddResult.data);
        }

        // Assigns a role definition to a user or group in SharePoint site
        public static addRoleAssignment(context: IWebPartContext, principalid: string, roleId: string): Promise<any> {
            this.ensurePnpSetUp(context);
            console.log(`Assign role ${roleId} to group/user ${principalid}`);

            return sp.web
                .roleAssignments.add(Number(principalid), Number(roleId))
                .then(_ => Promise.resolve(true), _ => Promise.resolve(false));
        }

        // Gets the role id for a role in the current web
        public static getRoleId(context: IWebPartContext, roleName: string): Promise<string> {
            this.ensurePnpSetUp(context);

            return sp.web
                .roleDefinitions.filter(`Name eq '${roleName}'`).get()
                .then(roleDefinitions => {
                    if (roleDefinitions && roleDefinitions.length > 0) {
                        return Promise.resolve(roleDefinitions[0].Id.toString());
                    }
                    else {
                        return Promise.resolve('');
                    }
                });
        }

        // Breaks role inheritance on a SharePoint list
        public static breakRoleInheritanceOfList(context: IWebPartContext, listTitle: string): Promise<void> {
            this.ensurePnpSetUp(context);

            return sp.web
                .lists.getByTitle(listTitle)
                .breakRoleInheritance(true);
        }

        // Adds a new role assignment for the group on a SharePoint list
        public static setNewPermissionsForGroup(context: IWebPartContext, listTitle: string, principalid: string, roleid: string): Promise<void> {
            this.ensurePnpSetUp(context);

            return sp.web
                .lists.getByTitle(listTitle)
                .roleAssignments.add(Number(principalid), Number(roleid));
        }

        // Sets or updates ReadSecurity or WriteSecurity on a SharePoint list
        public static setListSecurity(context: IWebPartContext, listTitle: string, readSecurity: string, writeSecurity: string): Promise<void> {
            this.ensurePnpSetUp(context);
            
            return sp.web
                .lists.getByTitle(listTitle)
                .update({
                    ReadSecurity: Number(readSecurity),
                    WriteSecurity: Number(writeSecurity)
                })
                .then(_ => Promise.resolve());
        }
    }
}
