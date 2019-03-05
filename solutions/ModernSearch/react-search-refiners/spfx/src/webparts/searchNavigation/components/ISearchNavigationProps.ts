import { INavigationNodeProps } from '../SearchNavigationWebPart';
export interface ISearchNavigationProps {
  nodes: INavigationNodeProps[];
  color: string;
  queryKeywords: string;
  useThemeColor: boolean;
}
