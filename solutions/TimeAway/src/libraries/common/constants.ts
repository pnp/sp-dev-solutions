import { TimePeriod } from "../models/timeAwayModel";

export class Constants{
   public static readonly Default_DateTimeFormat:string = "HH MM SS MM DD YYYY";
   public static readonly TimeAwayListTitle:string = "Time Away";
   public static readonly LockCreateListKey: string = "Time Away Lock SP create list key";
   public static readonly Default_TimePeriod =  TimePeriod.Current;
}