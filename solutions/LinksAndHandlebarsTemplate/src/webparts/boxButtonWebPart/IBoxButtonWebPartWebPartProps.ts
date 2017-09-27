import { IBoxButton } from './components/IBoxButton';

export interface IBoxButtonWebPartWebPartProps {
  name:string;
  fontAwesomeIcon:string;
  url: string;
  isBlue: boolean;
  newTab: boolean;
  data: IBoxButton[];
  title:string;
  usesListMode:boolean;
  advancedCamlQuery:string;
  advancedCamlData:string;
}
