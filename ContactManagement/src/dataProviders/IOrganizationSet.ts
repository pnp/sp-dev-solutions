import { IOrganization } from '../data/IOrganization';

export interface IOrganizationSet
{
    key : string;
    organizations : IOrganization[];

    apply(newOrgs : IOrganization[], removeAndAdd : boolean);
}