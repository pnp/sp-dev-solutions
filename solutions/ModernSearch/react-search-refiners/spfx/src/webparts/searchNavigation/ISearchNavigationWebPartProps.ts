import { INavigationNodeProps } from "../../models/INavigationNodeProps";

export interface ISearchNavigationWebPartProps {
    nodes: INavigationNodeProps[];
    queryKeywordsDataSourceReference: string;
    color: string;
    useThemeColor: boolean;
    useNlpValue: boolean;
}