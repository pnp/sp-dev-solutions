import { INavigationNodeProps } from "../../../../models/INavigationNodeProps";

export interface ISearchNavigationContainerProps {
  nodes: INavigationNodeProps[];
  color: string;
  queryKeywords: string;
  useThemeColor: boolean;
}
