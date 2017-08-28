export class TimeAwaySummaryItem{
    public constructor(init?:Partial<TimeAwaySummaryItem>){
        if (init) {
            this.WeekDay = init.WeekDay || this.WeekDay;       
            this.MonthDate = init.MonthDate || this.MonthDate;       
            this.PersonNameArray = init.PersonNameArray || this.PersonNameArray;        
        }
    }
    public WeekDay: string;
    public MonthDate: string;
    public PersonNameArray: string[];
}