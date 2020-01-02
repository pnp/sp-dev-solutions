import { INavigationNodeProps } from "../../models/INavigationNodeProps";
import { QueryPathBehavior, PageOpenBehavior } from "../../helpers/UrlHelper";

export interface ISearchNavigationWebPartProps {
    nodes: INavigationNodeProps[];
    queryKeywordsDataSourceReference: string;
    color: string;
    useThemeColor: boolean;
    useNlpValue: boolean;
    openBehavior: PageOpenBehavior;
    passQuery: boolean;
    queryPathBehavior: QueryPathBehavior;
    queryStringParameter: string;
}