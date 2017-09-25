// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export default class Utility
{
    public static stripTags(value : string) : string
    {
        var nextLess = value.indexOf("<");
        var nextGreater = value.indexOf(">", nextLess + 1);

        while (nextLess >= 0 && nextGreater > nextLess)
        {
            value = value.substring(0, nextLess) + value.substring(nextGreater + 1, value.length);

            nextLess = value.indexOf("<");
            nextGreater = value.indexOf(">", nextLess);
        }

        return value;        
    }


    public static ensureNoBraces(value : string) : string
    {
        if (value[0] == '{')
        {
            value = value.substring(1, value.length);
        }

        if (value[value.length - 1] == '}')
        {
            value = value.substring(0, value.length - 1);
        }

        return value;
    }

    public static getNumericArray(val : any) : number[] 
    {
      if (val.length == null)
      {
        var valN = new Number(val);

        if (!isNaN(valN.valueOf()))
        {
          return [valN.valueOf()];
        }
      }
      else
      {
        var newNumbers = new Array();

        for (var num of val)
        {
            var valNa = new Number(num);

            if (!isNaN(valNa.valueOf()))
            {
              newNumbers.push(valNa);
            }   
        }

        return newNumbers;
      }
    }

    public static generateRandomId() : string {
        var id = "";

        for (var i=0; i<6; i++)
        {
            let seed = Math.random() * 3;
            if (seed < 1.1)
            {
                id += String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
            else if (seed < 2.2)
            {
                id += String.fromCharCode(97 + Math.floor(Math.random() * 26));
            }
            else
            {
                id += String.fromCharCode(48 + Math.floor(Math.random() * 10));
            }
        }

        return id;
    }
}