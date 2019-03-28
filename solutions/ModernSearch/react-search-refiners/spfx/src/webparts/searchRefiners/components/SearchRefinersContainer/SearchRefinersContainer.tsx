import * as React from 'react';
import styles from '../SearchRefinersWebPart.module.scss';
import { ISearchRefinersContainerProps } from './ISearchRefinersContainerProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import Vertical from '../Layouts/Vertical/Vertical';
import LinkPanel from '../Layouts/LinkPanel/LinkPanel';
import RefinersLayoutOption from '../../../../models/RefinersLayoutOptions';
import { MessageBarType, MessageBar } from 'office-ui-fabric-react';
import * as strings from 'SearchRefinersWebPartStrings';
import { ISearchRefinersContainerState } from './ISearchRefinersContainerState';
import { IRefinementFilter, IRefinementValue, RefinementOperator } from '../../../../models/ISearchResult';
import * as update from 'immutability-helper';

export default class SearchRefinersContainer extends React.Component<ISearchRefinersContainerProps, ISearchRefinersContainerState> {
  
  public constructor(props: ISearchRefinersContainerProps) {
    super(props);

    this.state = {
      shouldResetFilters: false,
      selectedRefinementFilters: []
    };

    this.onFilterValuesUpdated = this.onFilterValuesUpdated.bind(this);
    this.onRemoveAllFilters = this.onRemoveAllFilters.bind(this);
    this.onRemoveFilterValue = this.onRemoveFilterValue.bind(this);
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
                              onFilterValuesUpdated={this.onFilterValuesUpdated}
                              refinementResults={this.props.availableRefiners}
                              refinersConfiguration={this.props.refinersConfiguration}
                              shouldResetFilters={this.state.shouldResetFilters}
                              onRemoveAllFilters={this.onRemoveAllFilters}
                              hasSelectedValues={this.state.selectedRefinementFilters.length > 0 ? true : false }
                            />;
            break;

        case RefinersLayoutOption.LinkAndPanel:

          // Flatten all selected values
          let selectedValues = [];
          this.state.selectedRefinementFilters.map(refinement => { 
            selectedValues = selectedValues.concat(refinement.Values);
          });

          renderWpContent = <LinkPanel
                              onFilterValuesUpdated={this.onFilterValuesUpdated}
                              refinementResults={this.props.availableRefiners}
                              refinersConfiguration={this.props.refinersConfiguration}
                              shouldResetFilters={this.state.shouldResetFilters}
                              onRemoveAllFilters={this.onRemoveAllFilters}
                              hasSelectedValues={this.state.selectedRefinementFilters.length > 0 ? true : false }
                              selectedFilterValues={selectedValues}                              
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

  public componentWillReceiveProps(nextProps: ISearchRefinersContainerProps) {

      // Reset the flag every time we receive new refinement results
      this.setState({
        shouldResetFilters: false
      });
  }

  /**
   * Update the filter status in the state according to values
   * @param filterName the filter to update
   * @param filterValues the filter values
   * @param operator the operator (FQL)
   */
  private onFilterValuesUpdated(filterName: string, filterValues: IRefinementValue[], operator: RefinementOperator) {

    let newFilters; 

    const refinementFilter: IRefinementFilter = {
      FilterName: filterName,
      Values: filterValues,
      Operator: operator
    };

    // Get the index of the filter in the current filter
    const filterIdx = this.state.selectedRefinementFilters.map(selected => { return selected.FilterName; }).indexOf(filterName);

    if (filterIdx !== -1) {

      if (filterValues.length > 0) {
        // Update value for the specific filters
        newFilters = update(this.state.selectedRefinementFilters, {[filterIdx]: {$set: refinementFilter}});
      } else {
        // // If no values, we remove the filter
        newFilters = update(this.state.selectedRefinementFilters, { $splice: [[filterIdx, 1]] });
      }

    } else {
      newFilters = update(this.state.selectedRefinementFilters, {$push: [refinementFilter]});
    }

    this.setState({
      selectedRefinementFilters: newFilters
    });

    this.props.onUpdateFilters(newFilters);
  }

  private onRemoveFilterValue(filterValue: IRefinementValue) {

    // Get the index of the filter in the current filters
    const filter = this.state.selectedRefinementFilters.filter(selected => { 

      const values = selected.Values.filter(value => {
        return value.RefinementToken === filterValue.RefinementToken;
      });

      if (values.length > 0) {
        return selected; 
      }
    });

    if (filter.length > 0) {

      let refinementFilter: IRefinementFilter = {
        FilterName: filter[0].FilterName,
        Values: filter[0].Values.filter(value => {
          return value.RefinementToken !== filterValue.RefinementToken;
        }),
        Operator: filter[0].Operator
      };
      
      // Get the index of the filter in the current filter
      const filterIdx = this.state.selectedRefinementFilters.map(selected => { return selected.FilterName; }).indexOf(filter[0].FilterName);

      const newFilters = update(this.state.selectedRefinementFilters, {[filterIdx]: {$set: refinementFilter}});

      this.setState({
        selectedRefinementFilters: newFilters
      });

      this.props.onUpdateFilters(newFilters);
    }
  }

  /**
   * Removes all selected filter values for all refiners
   */
  private onRemoveAllFilters() {

    this.setState({
      selectedRefinementFilters: [],
      shouldResetFilters: true
    });

    this.props.onUpdateFilters([]);
  }
}
