import * as React from 'react';
import styles from '../SearchRefinersWebPart.module.scss';
import { ISearchRefinersContainerProps } from './ISearchRefinersContainerProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import Vertical from '../Layouts/Vertical/Vertical';
import RefinersLayoutOption from '../../../../models/RefinersLayoutOptions';
import { MessageBarType, MessageBar } from 'office-ui-fabric-react';
import * as strings from 'SearchRefinersWebPartStrings';
import { ISearchRefinersContainerState } from './ISearchRefinersContainerState';
import { IRefinementFilter } from '../../../../models/ISearchResult';
import * as update from 'immutability-helper';

export default class SearchRefinersContainer extends React.Component<ISearchRefinersContainerProps, ISearchRefinersContainerState> {
  
  public constructor(props: ISearchRefinersContainerProps) {
    super(props);

    this.state = {
      currentQuery: '',
      lastQuery: '',
      selectedRefinementFilters: []
    };

    this.onFiltersAdded = this.onFiltersAdded.bind(this);
    this.onFiltersRemoved = this.onFiltersRemoved.bind(this);
  }

  public componentDidMount() {

    this.setState({
      currentQuery: this.props.queryKeywords + this.props.queryTemplate + this.props.selectedProperties.join(','),
      lastQuery: this.props.queryKeywords + this.props.queryTemplate + this.props.selectedProperties.join(','),
      selectedRefinementFilters: []
    });
  }

  public componentWillReceiveProps(nextProps: ISearchRefinersContainerProps) {

    let nextQuery = nextProps.queryKeywords + nextProps.queryTemplate + nextProps.selectedProperties.join(',');
    this.setState((s) => ({
      currentQuery: nextQuery,
      lastQuery: s.currentQuery
    }));

    if (this.state.lastQuery !== this.state.currentQuery ? true : false) {
      this.setState({
        selectedRefinementFilters: []
      });
    }
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
          renderWpContent = <Vertical 
                              onFiltersAdded={this.onFiltersAdded}
                              onFiltersRemoved={this.onFiltersRemoved}
                              selectedRefinementFilters={this.state.selectedRefinementFilters}
                              refinementResults={this.props.availableRefiners}
                              refinersConfiguration={this.props.refinersConfiguration}
                            />;
            break;

        case RefinersLayoutOption.LinkAndPanel:
         /* renderWpContent = <LinkPanel
                              availableFilters={this.props.availableRefiners}
                              refinersConfiguration={this.props.refinersConfiguration}
    
                              resetSelectedFilters={ this.state.lastQuery !== this.state.currentQuery ? true : false}
                            />;*/
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

  private onFiltersAdded(filtersToAdd: IRefinementFilter[]): void {

    // Add the filter to the selected filters collection
    let newFilters = update(this.state.selectedRefinementFilters, {$push: filtersToAdd});

    this._applyFilters(newFilters);
  }

  private onFiltersRemoved(filtersToRemove: IRefinementFilter[]): void {

      // Remove the filter from the selected filters collection
      let newFilters = this.state.selectedRefinementFilters.filter((elt) => {
          return filtersToRemove.filter(filter => {
            return elt.Value.RefinementToken !== filter.Value.RefinementToken;
          }).length > 0;
      });

      this._applyFilters(newFilters);
  }

  /**
   * Inner method to effectivly apply the refiners by calling back the parent component
   * @param selectedFilters The filters to apply
   */
  private _applyFilters(selectedFilters: IRefinementFilter[]): void {

    this.setState({
      selectedRefinementFilters: selectedFilters
    });

    this.props.onUpdateFilters(selectedFilters);
  }
}
