import { IBoxButton } from './components/IBoxButton';

export interface IBoxButtonWebPartWebPartProps {
  name:string;
  fontAwesomeIcon:string;
  url: string;
  isThemed: boolean;
  newTab: boolean;
  data: IBoxButton[];
  title:string;
  usesListMode:boolean;
  advancedCamlQuery:string;
  advancedCamlData:string;
}
