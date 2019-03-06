import * as React from 'react';
import styles from '../SearchRefinersWebPart.module.scss';
import { ISearchRefinersContainerProps } from './ISearchRefinersContainerProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Filters } from '../../../controls/Filters';
import * as strings from 'SearchRefinersWebPartStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { ISearchRefinersContainerState } from './ISearchRefinersContainerState';
import { IRefinementFilter } from '../../../../models/ISearchResult';

export default class SearchRefinersContainer extends React.Component<ISearchRefinersContainerProps, ISearchRefinersContainerState> {
  public constructor(props: ISearchRefinersContainerProps) {
    super(props);

    this.state = {
      areResultsLoading: false
    };
  }

  public async componentWillReceiveProps(nextProps: ISearchRefinersContainerProps) {
    if (JSON.stringify(this.props.availableFilters) !== JSON.stringify(nextProps.availableFilters)
       || JSON.stringify(this.props.selectedFilters) !== JSON.stringify(nextProps.selectedFilters)) {
      this.setState({
        areResultsLoading: false
      });
    }
  }

  public render(): React.ReactElement<ISearchRefinersContainerProps> {
    let renderWpContent: JSX.Element = null;
    let renderWebPartTitle: JSX.Element = null;
    let renderOverlay: JSX.Element = null;

    if (this.props.webPartTitle 
        && this.props.webPartTitle.length > 0 
        && ((this.props.availableFilters.length === 0 && !this.props.showBlank) || this.props.availableFilters.length > 0)
      ) {
      renderWebPartTitle = <WebPartTitle title={this.props.webPartTitle} updateProperty={null} displayMode={DisplayMode.Read} />;
    }

    if (this.state.areResultsLoading) {
          renderOverlay = <div>
              <Overlay isDarkThemed={false} className={styles.overlay}>
                  <Spinner size={SpinnerSize.medium} />
              </Overlay>
          </div>;
    }

    renderWpContent = <Filters 
      selectedFilters={this.props.selectedFilters}
      availableFilters={this.props.availableFilters}
      refinersConfiguration={this.props.refinersConfiguration}
      onUpdateFilters={(filters: IRefinementFilter[]) => {
        this.setState({
          areResultsLoading: true
        });
        this.props.onUpdateFilters(filters);
      }}  
      showBlank={this.props.showBlank}
      displayMode={this.props.displayMode}
      strings={{
        noFilterConfiguredLabel: strings.NoFilterConfiguredLabel,
        removeAllFiltersLabel: strings.RemoveAllFiltersLabel,
        showBlankEditInfoMessage: strings.ShowBlankEditInfoMessage
      }}
    />;

    return (
      <div className={ styles.searchRefiners }>
        {renderWebPartTitle}
        {renderOverlay}
        {renderWpContent}
      </div>
    );
  }
}
