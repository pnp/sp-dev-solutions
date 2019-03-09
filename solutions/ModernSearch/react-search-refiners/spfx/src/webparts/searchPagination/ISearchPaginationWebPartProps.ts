import { ISearchPagination } from "../../models/ISearchResult";
import { DynamicProperty } from "@microsoft/sp-component-base";

export interface ISearchPaginationWebPartProps {
    searchPagination: DynamicProperty<ISearchPagination>;
    searchPaginationSourceId: string;
    searchPaginationPropertyId: string;
    searchPaginationPropertyPath: string;
}