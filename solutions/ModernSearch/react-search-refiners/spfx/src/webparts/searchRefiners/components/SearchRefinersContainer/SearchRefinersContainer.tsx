import * as React from 'react';
import styles from '../SearchRefinersWebPart.module.scss';
import { ISearchRefinersContainerProps } from './ISearchRefinersContainerProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import Horizontal from '../Layouts/Horizontal/Horizontal';
import LinkPanel from '../Layouts/LinkPanel/LinkPanel';
import RefinersLayoutOption from '../../../../models/RefinersLayoutOptions';
import { MessageBarType, MessageBar } from 'office-ui-fabric-react';
import * as strings from 'SearchRefinersWebPartStrings';
import { ISearchRefinersContainerState } from './ISearchRefinersContainerState';

export default class SearchRefinersContainer extends React.Component<ISearchRefinersContainerProps, ISearchRefinersContainerState> {
  
  public constructor(props: ISearchRefinersContainerProps) {
    super(props);

    this.state = {
      currentQuery: '',
      lastQuery: ''
    };
  }

  public componentDidMount() {
    this.setState({
      currentQuery: this.props.queryKeywords + this.props.queryTemplate + this.props.selectedProperties.join(','),
      lastQuery: this.props.queryKeywords + this.props.queryTemplate + this.props.selectedProperties.join(',')
    });
  }

  public componentWillReceiveProps(nextProps: ISearchRefinersContainerProps) {
    let nextQuery = nextProps.queryKeywords + nextProps.queryTemplate + nextProps.selectedProperties.join(',');
    this.setState((s) => ({
      currentQuery: nextQuery,
      lastQuery: s.currentQuery
    }));
  }

  public render(): React.ReactElement<ISearchRefinersContainerProps> {
    let renderWpContent: JSX.Element = null;
    let renderWebPartTitle: JSX.Element = null;

    if (this.props.webPartTitle  && this.props.webPartTitle.length > 0) {
      renderWebPartTitle = <WebPartTitle title={this.props.webPartTitle} updateProperty={null} displayMode={DisplayMode.Read} />;
    }

    if (this.props.availableRefiners.length === 0) {

        if (this.props.displayMode === DisplayMode.Edit && this.props.showBlank) {
          renderWpContent = <MessageBar messageBarType={MessageBarType.info}>{strings.ShowBlankEditInfoMessage}</MessageBar>;
        } else if (!this.props.showBlank) {
            renderWpContent = <div className={styles.searchRefiners__noFilter}>
                                {strings.NoFilterConfiguredLabel}
                              </div>;
        } 
    
    } else {

      // Choose the right layout according to the Web Part option
      switch (this.props.selectedLayout) {
        case RefinersLayoutOption.Vertical: 
          renderWpContent = <Horizontal 
                              availableFilters={this.props.availableRefiners}
                              refinersConfiguration={this.props.refinersConfiguration}
                              onUpdateFilters={this.props.onUpdateFilters}  
                              resetSelectedFilters={ this.state.lastQuery !== this.state.currentQuery ? true : false}
                            />;
            break;

        case RefinersLayoutOption.LinkAndPanel:
          renderWpContent = <LinkPanel
                              availableFilters={this.props.availableRefiners}
                              refinersConfiguration={this.props.refinersConfiguration}
                              onUpdateFilters={this.props.onUpdateFilters}  
                              resetSelectedFilters={ this.state.lastQuery !== this.state.currentQuery ? true : false}
                            />;
          break;
      }
    }
    

    return (
      <div className={ styles.searchRefiners }>
        {renderWebPartTitle}
        {renderWpContent}
      </div>
    );
  }
}
