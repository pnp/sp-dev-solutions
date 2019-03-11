import * as React from 'react';
import { ISearchPaginationContainerProps } from './ISearchPaginationContainerProps';
import Paging from '../Paging/Paging';
import styles from '../SearchPaginationWebPart.module.scss';

export default class SearchPaginationContainer extends React.Component<ISearchPaginationContainerProps, {}> {
  public render(): React.ReactElement<ISearchPaginationContainerProps> {
    return (<div className={ styles.searchPagination }>
      <Paging
        totalItems={this.props.totalItems}
        itemsCountPerPage={this.props.itemsCountPerPage}
        onPageUpdate={this.props.onPageUpdate}
        currentPage={this.props.currentPage} />
      </div>
    );
  }
}
