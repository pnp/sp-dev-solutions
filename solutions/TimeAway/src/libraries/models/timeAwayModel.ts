export enum ApprovalStatus {
    Approved = 0,
    Rejected,
    Pending,
}

export enum TimeAwayDialogType {
    Hidden = 0,
    ConfirmDelete,
    Create
}

export enum TimePeriod {
    Current = 0,
    Previous
}

export enum WeekType {
    FiveDays = 5,
    SevenDays = 7
}

export enum Phase {
    ThisWeek = 0,
    NextWeek = 1
}


export class EnsureListResult {
    public constructor(init?: Partial<EnsureListResult>) {
        if (init) {
            this.contentlistExists = init.contentlistExists || this.contentlistExists;
            this.hasPermission = init.hasPermission || this.hasPermission;
            this.message = init.message || this.message;
        }
    }
    public contentlistExists: boolean;
    public hasPermission: boolean;
    public message: string;
}


export interface IMyTimeAwayItem {
    id?: number;
    firstName?: string;
    lastName?: string;
    personId?: string;
    start?: Date;
    end?: Date;
    comments?: string;
    status?: ApprovalStatus;
    link?: string;
}
export interface IPerson {
    id: string;
    firstName: string;
    lastName: string;
}
export class timeAway {
    public firstName: string;
    public lastName: string;
    public start: Date;
    public end: Date;
    public comments: string;
    //approvalStatus: approvalStatus;
}