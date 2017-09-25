// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export default class Debug
{
    public static assert(condition : boolean, messageToShowIfNotCondition? : string) {

        if (DEBUG)
        {
            if (!condition)
            {
                alert("Assertion failed: " + messageToShowIfNotCondition);
            }
        }
    }
  
    public static fail(message : string)
    {
        if (DEBUG)
        {
            alert("DEBUG: " + message);
        }
    }
    
    public static message(message : string)
    {
        if (DEBUG)
        {
            alert("DEBUG: " + message);
        }
    }
}
