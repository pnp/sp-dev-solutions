// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export class TimeAwaySummaryItem{
    public constructor(init?:Partial<TimeAwaySummaryItem>){
        if (init) {
            this.WeekDay = init.WeekDay || this.WeekDay;       
            this.MonthDate = init.MonthDate || this.MonthDate;       
            this.Month = init.Month || this.Month;       
            this.PersonNameArray = init.PersonNameArray || this.PersonNameArray;        
        }
    }
    public WeekDay: string;
    public MonthDate: string;
    public Month:string;
    public PersonNameArray: string[];
}