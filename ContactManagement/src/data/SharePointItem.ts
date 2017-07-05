import { ISharePointItem } from './ISharePointItem';

export default class SharePointItem implements ISharePointItem {
    public Title: string; 
    public Type: string;
    public Id: number;
    public Modified: Date;
    public Created: Date;
    public AuthorId: number;
    public EditorId: number;
}
