// https://docs.microsoft.com/en-us/previous-versions/office/sharepoint-server/ee537784(v=office.15)
export interface IChangeQuery {
    query: {        
        Add?: boolean;
        Update?: boolean;
        SystemUpdate?: boolean;
        DeleteObject?: boolean;
        Move?: boolean;
        Rename?: boolean;
        Restore?: boolean;
        Item?: boolean;
        File?: boolean;
        RecursiveAll?: boolean;
        ChangeTokenStart?: {
            StringValue: string;
        };
    }
}

export enum ChangeType {
    NoChange,
    Add,
    Update,
    DeleteObject,
    Rename,
    MoveAway,
    MoveInto,
    Restore,
    RoleAdd,
    RoleDelete,
    RoleUpdate,
    AssignmentAdd,
    AssignmentDelete,
    MemberAdd,
    MemberDelete,
    SystemUpdate,
    Navigation,
    ScopeAdd,
    ScopeDelete,
    ListContentTypeAdd,
    ListContentTypeDelete,
    Dirty,
    Activity
}