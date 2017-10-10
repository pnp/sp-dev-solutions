// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import SPUrl from './SPUrl';
import { ISPList } from './ISPList';
import { ISPField } from './ISPField';
import { FieldTypeKind } from './FieldTypeKind';

export default class SharePointUtility
{
    public static getFieldTypeFriendlyName(kind : FieldTypeKind) : string
    {
        switch (kind)
        {

            case FieldTypeKind.Text:
                return "Text";

            case FieldTypeKind.Number:
                return "Number";

            case FieldTypeKind.Choice:
                return "Choice";

            case FieldTypeKind.Lookup:
                return "Lookup";

            case FieldTypeKind.Url:
                return "Web Link";

            case FieldTypeKind.User:
                return "Person";

            case FieldTypeKind.Boolean:
                return "True/False";

            case FieldTypeKind.DateTime:
                return "Date/Time";

            default:
                return "Unknown";
        }
    }
  
    public static getField(list : ISPList, name : string) : ISPField 
    {
        for (var field of list.Fields)
        {
            if (field.InternalName == name)
            {
                return field;
            }
        }

        return null;
    }

    public static getUrl(itemObject : any, fieldName: string) : string 
    {
        if (itemObject == null)
        {
          return null;
        }

        var urlVal = itemObject[fieldName];

        if (urlVal == null)
        {
            return null;
        }

        if (typeof urlVal === "string")
        {
          return urlVal as string;
        }
        else if (urlVal instanceof SPUrl)
        {
          return (urlVal as SPUrl).Url;
        }
        else if (typeof urlVal == "object")
        {
          return urlVal.Url;
        }

        return "";
    }
}