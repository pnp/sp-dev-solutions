import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IBoxButton } from './IBoxButton';

export interface IBoxButtonWebPartProps {
  name:string;
  fontAwesomeIcon:string;
  url: string;
  isThemed:boolean;
  newTab:boolean;
  data: IBoxButton[];
  isEdit: boolean;
  title:string;
  usesListMode:boolean;
  advancedCamlQuery:string;
  advancedCamlData:string;
  links: any[];
  setTitle: Function;
  setUrl: Function;
  editItem: Function;
  deleteItem: Function;
  rearrangeItems: Function;
  context: IWebPartContext;
}
