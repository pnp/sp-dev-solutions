import * as React from 'react';
import styles from '../SearchRefinersWebPart.module.scss';
import { ISearchRefinersContainerProps } from './ISearchRefinersContainerProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import FiltersPanel from '../FiltersPanel/FiltersPanel';

export default class SearchRefinersContainer extends React.Component<ISearchRefinersContainerProps, {}> {
  
  public constructor(props: ISearchRefinersContainerProps) {
    super(props);
  }

  public render(): React.ReactElement<ISearchRefinersContainerProps> {
    let renderWpContent: JSX.Element = null;
    let renderWebPartTitle: JSX.Element = null;

    if (this.props.webPartTitle 
        && this.props.webPartTitle.length > 0 
        && ((this.props.availableRefiners.length === 0 && !this.props.showBlank) || this.props.availableRefiners.length > 0)
      ) {
      renderWebPartTitle = <WebPartTitle title={this.props.webPartTitle} updateProperty={null} displayMode={DisplayMode.Read} />;
    }

    renderWpContent = <FiltersPanel 
      searchQuery={this.props.searchQuery}
      availableFilters={this.props.availableRefiners}
      refinersConfiguration={this.props.refinersConfiguration}
      onUpdateFilters={this.props.onUpdateFilters}  
      showBlank={this.props.showBlank}
      displayMode={this.props.displayMode}
    />;

    return (
      <div className={ styles.searchRefiners }>
        {renderWebPartTitle}
        {renderWpContent}
      </div>
    );
  }
}
