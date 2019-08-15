import { INavigationNodeProps } from "../../models/INavigationNodeProps";
import { QueryPathBehavior } from "../../helpers/UrlHelper";

export interface ISearchNavigationWebPartProps {
    nodes: INavigationNodeProps[];
    queryKeywordsDataSourceReference: string;
    color: string;
    useThemeColor: boolean;
    useNlpValue: boolean;
    queryPathBehavior: QueryPathBehavior;
    queryStringParameter: string;
}