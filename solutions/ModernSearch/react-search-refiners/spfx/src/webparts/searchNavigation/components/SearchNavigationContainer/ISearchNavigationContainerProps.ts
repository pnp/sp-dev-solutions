import { INavigationNodeProps } from "../../../../models/INavigationNodeProps";
import { PageOpenBehavior, QueryPathBehavior } from "../../../../helpers/UrlHelper";

export interface ISearchNavigationContainerProps {
  nodes: INavigationNodeProps[];
  color: string;
  queryKeywords: string;
  useThemeColor: boolean;
  currentPageUrl: string;
  openBehavior: PageOpenBehavior;
  queryPathBehavior: QueryPathBehavior;
  queryStringParameter: string;
}
