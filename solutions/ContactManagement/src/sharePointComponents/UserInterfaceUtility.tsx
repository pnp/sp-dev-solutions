// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import ItemLookupFieldEditor from './ItemLookupFieldEditor';
import ItemLookupFieldDisplay from './ItemLookupFieldDisplay';
import ItemMultiLookupFieldEditor from './ItemMultiLookupFieldEditor';
import ItemMultiLookupFieldDisplay from './ItemMultiLookupFieldDisplay';
import ItemMultilineTextFieldEditor from './ItemMultilineTextFieldEditor';
import ItemPeopleFieldEditor from './ItemPeopleFieldEditor';
import ItemPeopleFieldDisplay from './ItemPeopleFieldDisplay';
import ItemDateFieldEditor from './ItemDateFieldDisplay';
import ItemChoiceFieldEditor from './ItemChoiceFieldEditor';
import ItemDateFieldDisplay from './ItemDateFieldDisplay';
import ItemTextFieldEditor from './ItemTextFieldEditor';
import ItemTextFieldDisplay from './ItemTextFieldDisplay';
import ItemRichTextFieldDisplay from './ItemRichTextFieldDisplay';
import ItemUrlFieldEditor from './ItemUrlFieldEditor';
import ItemUrlFieldDisplay from './ItemUrlFieldDisplay';

import ItemContext from './ItemContext';
import { FieldValueChangeCallback} from './FieldComponent';

import { ISPField } from '../data/ISPField';
import { FieldTypeKind } from '../data/FieldTypeKind';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

export default class UserInterfaceUtility
{
  private static _outerElement : Element;

  public static getFieldElement(itemContext : ItemContext, field : ISPField, displayOnly : boolean, onChanged? : FieldValueChangeCallback) : JSX.Element
  {
    if (displayOnly)
    {
      switch (field.FieldTypeKind)
      {
        case FieldTypeKind.DateTime:
          return <ItemDateFieldDisplay itemContext={ itemContext } field={ field } onChanged={ onChanged } />;

        case FieldTypeKind.Url:
          return <ItemUrlFieldDisplay itemContext={ itemContext } field={ field } onChanged={ onChanged } />;

        case FieldTypeKind.Lookup:
          if (field.AllowMultipleValues)
          {
            return <ItemMultiLookupFieldDisplay itemContext={ itemContext } field={ field } onChanged={ onChanged } />;
          }
          
          return <ItemLookupFieldDisplay itemContext={ itemContext } field={ field } onChanged={ onChanged } />;
        
        case FieldTypeKind.User:
          return <ItemPeopleFieldDisplay itemContext={ itemContext } field={ field } onChanged={ onChanged } />;

        default:
          if (field.RichText == true)
          {
            return <ItemRichTextFieldDisplay itemContext={ itemContext } field={ field } onChanged={ onChanged } />;
          }

          return <ItemTextFieldDisplay itemContext={ itemContext } field={ field } onChanged={ onChanged } />;
      }
    }
    else
    {
      switch (field.FieldTypeKind)
      {
        case FieldTypeKind.DateTime:
          return <ItemDateFieldEditor itemContext={ itemContext } field={ field } onChanged={ onChanged } />;

        case FieldTypeKind.Choice:
          return <ItemChoiceFieldEditor itemContext={ itemContext } field={ field } onChanged={ onChanged } />;

        case FieldTypeKind.Url:
          return <ItemUrlFieldEditor itemContext={ itemContext } field={ field } onChanged={ onChanged } />;

        case FieldTypeKind.Lookup:
          if (field.AllowMultipleValues)
          {
            return <ItemMultiLookupFieldEditor itemContext={ itemContext } field={ field } onChanged={ onChanged } />;
          }
         else if (itemContext.list.ListItemCount > 220)
          {
            return <ItemMultiLookupFieldEditor allowOnlySingleSelection={ true } itemContext={ itemContext } field={ field } onChanged={ onChanged } />;
          }
          
          return <ItemLookupFieldEditor itemContext={ itemContext } field={ field } onChanged={ onChanged } />;
        
        case FieldTypeKind.User:
          return <ItemPeopleFieldEditor itemContext={ itemContext } field={ field } onChanged={ onChanged } />;

        default:
          if (field.RichText == true)
          {
            //return <ItemRichTextFieldEditor itemContext={ itemContext } field={ field } />;
            return <ItemMultilineTextFieldEditor itemContext={ itemContext } stripHtml={ true } field={ field } />;
          }

          return <ItemTextFieldEditor itemContext={ itemContext } field={ field } onChanged={ onChanged } />;
      }
    }
  }

    public static padLeft(existing : string, padChar : string, length :  number) : string
    {
        while (existing.length < length)
        {
          existing = padChar + existing;
        }

        return existing;
    }
    public static setOuterElement(elt : Element)
    {
      UserInterfaceUtility._outerElement = elt;
    }
    
    public static applyWorkarounds() 
    {
      // https://github.com/sharepoint/sp-dev-docs/issues/492

      if (Environment.type === EnvironmentType.ClassicSharePoint) 
      {
          window.setTimeout( (elt) => 
          {
            const buttons = elt.getElementsByTagName('button');
  
            if (buttons && buttons.length) 
            {
              for (let i: number = 0; i < buttons.length; i++) 
              {      
                if (buttons[i]) 
                {
                  // Disable the button onclick postback
                  buttons[i].onclick = () => { return false; };
                }
              }
            }
          }, 50, UserInterfaceUtility._outerElement);
      }

    }

    public static getFriendlyDate(date : Date) : string
    {
      let dateVal = "";

      dateVal = date.getHours() + ":" + UserInterfaceUtility.padLeft(date.getMinutes() + "", "0", 2) + " " + 
                UserInterfaceUtility.getMonthDescription(date.getMonth()) + " " + 
                date.getDate() + " "  + 
                date.getFullYear();

      return dateVal;
    }

    public static getDayDescription(index : number) : string 
    {
      switch (index)
      { 
        case 0:
          return "Sunday";

        case 1:
          return "Monday";

        case 2:
          return "Tuesday";

        case 3:
          return "Wednesday";

        case 4:
          return "Thursday";

        case 5:
          return "Friday";

        default:
          return "Saturday";
      }
    }

    public static getMonthDescription(index : number) : string 
    {
      switch (index)
      { 
        case 0:
          return "January";

        case 1:
          return "February";

        case 2:
          return "March";

        case 3:
          return "April";

        case 4:
          return "May";

        case 5:
          return "June";

        case 6:
          return "July";

        case 7:
          return "August";

        case 8:
          return "September";

        case 9:
          return "October";

        case 10:
          return "November";

        default:
          return "December";
      }
    }
    
}