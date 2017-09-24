import { ISharePointItem } from './ISharePointItem';
import SPUrl from './SPUrl';
    
export interface ISPUser extends ISharePointItem {
    FirstName?: string;
    LastName?: string;
    EMail?: string;
    MobilePhone?: string;
    Name?: string;
    Notes?: string;
    SipAddress?: string;
    WorkPhone?: string;
    IsSiteAdmin?: boolean;
    Picture?: SPUrl;
    Department?: string;
    JobTitle?: string;                  
}

