import { PageUpdateCallback } from "../Paging/IPagingProps";

export interface ISearchPaginationContainerProps {
  totalItems: number;
  itemsCountPerPage: number;
  onPageUpdate: PageUpdateCallback;
  currentPage: number;
}
