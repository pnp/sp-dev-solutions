import { IPerson } from './IPerson';
import SharePointItem from './SharePointItem';

export default class Person extends SharePointItem implements IPerson {
    public FullName: string;
    public FirstName: string;
    public Company: string;
    public OrganizationId?: number;
    public Comments?: string;
}
