import * as React from 'react';
import styles from './SearchNavigation.module.scss';
import { ISearchNavigationProps } from './ISearchNavigationProps';
import {INavigationNodeProps} from '../SearchNavigationWebPart';

export default class SearchNavigation extends React.Component<ISearchNavigationProps, {}> {
  public render(): React.ReactElement<ISearchNavigationProps> {
    if(this.props.nodes && this.props.nodes.length > 0 ){
      return (
        <div className={styles.navigationNodes}>
         <nav>
           {this.props.nodes.map(node => {
             return this.renderPivotElement(node);
           })}
         </nav>
        </div>
      );
     } else {
       return <div></div>;
     }
 }

 private isNodeSelected(url: string) {
   return (document.location.href.toLocaleLowerCase().indexOf(encodeURI(url.toLocaleLowerCase())) > -1);
 }

 private renderPivotElement(node: INavigationNodeProps) {
   const queryParam = this.props.queryKeywords && this.props.queryKeywords.length > 0 ? `?q=${this.props.queryKeywords}` : ''; 
   const selectedClass = this.isNodeSelected(node.url) ? styles.selected : '';
   return(
     <a className={`${styles.nodeText} ${selectedClass}`} href={node.url + queryParam}>{node.displayText}</a>
   );
 }
}
