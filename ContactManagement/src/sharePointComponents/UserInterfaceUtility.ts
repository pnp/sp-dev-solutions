export default class UserInterfaceUtility
{
    private static _outerElement : Element;

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

 // if (Environment.type === EnvironmentType.ClassicSharePoint) 
 // {
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
 // }

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