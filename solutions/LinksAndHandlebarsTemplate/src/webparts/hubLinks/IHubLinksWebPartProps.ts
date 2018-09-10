import {IHubLinksItem} from './components/IHubLinksItem';
import { HubLinksLayout } from './components/layouts/HubLinksLayout';

export interface IHubLinksWebPartProps {
  listQuery: string;  //advancedCAMLQuery
  data: string;  //advancedCAMLData
  title: string;
  defaultExpand: boolean;
  hubLinksItems: IHubLinksItem[];
  usesListMode:boolean;
  layoutMode: HubLinksLayout;
  groups: string[];  //For Group Layout, list of groups identified with sort order
  showDescription: boolean;
  version: string;
  tileColor: string;
  tileColorProp: string;
  tileBorderColor:string;
  tileBorderColorProp: string;
  tileBackgroundColor: string;
  tileBackgroundColorProp: string;
}
