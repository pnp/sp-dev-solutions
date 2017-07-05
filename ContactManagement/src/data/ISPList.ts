import { ISPField } from './ISPField';

export interface ISPListList {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  ListItemEntityTypeFullName?: string;
  Id?: string;
  ListItemCount? : number;
  Fields?: ISPField[]; 
}