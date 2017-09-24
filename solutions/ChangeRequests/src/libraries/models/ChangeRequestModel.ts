export interface IMyChangeRequestItem {
    id?: number;
    title?: string;
    description?: string;
    status?: string;
    statusupdates?: string;
    createdby?: number;
    createddate?: Date;
}
export interface IChangeDiscussionItem {
    id?: number;
    changeid: number;
    triagecomments?: string;
    substatus?: string;
    priority: string;
    assignedto?: number;
}

export interface IPerson {
    id: number;
    displayName: string;
    firstName: string;
    lastName: string;
    isInTriage?: boolean;
}

export class ChangeRequestStatus{
   public static readonly Open: string = "Open";
   public static readonly Progress: string = "Progress";
   public static readonly Closed: string = "Closed";
}
