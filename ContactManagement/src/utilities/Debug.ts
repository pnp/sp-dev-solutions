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
/*
    private static _getStackTrace() 
    {
        var callstack = [];
        var isCallstackPopulated = false;
        
        try 
        {
            var foo = null;
            foo.indexOf("F"); // trigger an exception
        } 
        catch(e) 
        {
            
            if (e.stack)  //Firefox 
            {
                var lines = e.stack.split('\n');
                for (var i=0, len=lines.length; i<len; i++) 
                {
                    if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) 
                    {
                        callstack.push(lines[i]);
                    }
                }
            callstack.shift();
            isCallstackPopulated = true;
            }
  
            //Remove call to printStackTrace()
            callstack.shift();
            isCallstackPopulated = true;
        }
  

        if (!isCallstackPopulated) //IE and Safari 
        {
            var currentFunction = arguments.callee.caller;
            while (currentFunction) 
            {
                var fn = currentFunction.toString();
                var fname = fn.substring(fn.indexOf("function") + 8, fn.indexOf('')) || 'anonymous';
                callstack.push(fname);
                currentFunction = currentFunction.caller;
            }
        }

        let cs = "";

        for (var csline of callstack)
        {
            cs += csline +"\r\n";
        }

        return cs;
    }*/
}
