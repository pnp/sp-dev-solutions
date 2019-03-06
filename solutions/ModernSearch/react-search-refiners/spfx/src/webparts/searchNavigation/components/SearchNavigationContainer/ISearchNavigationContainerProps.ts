import { INavigationNodeProps } from '../../SearchNavigationWebPart';
export interface ISearchNavigationContainerProps {
  nodes: INavigationNodeProps[];
  color: string;
  queryKeywords: string;
  useThemeColor: boolean;
}
