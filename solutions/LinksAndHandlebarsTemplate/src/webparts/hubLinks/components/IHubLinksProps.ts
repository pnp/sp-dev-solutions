import { HubLinksLayout } from './layouts/HubLinksLayout';
import{ IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IHubLinksProps {
  defaultExpand:boolean;
  links: any[];
  title: string;
  setTitle: any;
  setUrl: Function;
  isEdit: boolean;
  hubLinksItems: any[];
  usesListMode:boolean;
  editItem: Function;
  deleteItem: Function;
  rearrangeItems: Function;
  setGroup: Function;
  resetActiveIndex: Function;
  advancedCamlData: string; 
  context: IWebPartContext;
  layoutMode: HubLinksLayout;
  showDescription: boolean;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}
