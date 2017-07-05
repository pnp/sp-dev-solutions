import SPUrl from './SPUrl';
import { ISPList } from './ISPList';
import { ISPField } from './ISPField';

export default class SharePointUtility
{
  
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