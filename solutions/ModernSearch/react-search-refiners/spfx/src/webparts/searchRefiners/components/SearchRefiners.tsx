import * as React from 'react';
import styles from './SearchRefiners.module.scss';
import { ISearchRefinersProps } from './ISearchRefinersProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Filters } from '../../controls/Filters';
import * as strings from 'SearchRefinersWebPartStrings';

//TODO: loading animation
export default class SearchRefiners extends React.Component<ISearchRefinersProps, {}> {
  public render(): React.ReactElement<ISearchRefinersProps> {

    let renderWebPartTitle: JSX.Element = null;
    if (this.props.webPartTitle 
        && this.props.webPartTitle.length > 0 
        && ((this.props.availableFilters.length === 0 && !this.props.showBlank) || this.props.availableFilters.length > 0)
      ) {
      renderWebPartTitle = <WebPartTitle title={this.props.webPartTitle} updateProperty={null} displayMode={DisplayMode.Read} />;
    }

    return (
      <div className={ styles.searchRefiners }>
        {renderWebPartTitle}
        <Filters 
          selectedFilters={this.props.selectedFilters}
          availableFilters={this.props.availableFilters}
          refinersConfiguration={this.props.refinersConfiguration}
          onUpdateFilters={this.props.onUpdateFilters}  
          showBlank={this.props.showBlank}
          displayMode={this.props.displayMode}
          strings={{
            noFilterConfiguredLabel: strings.NoFilterConfiguredLabel,
            removeAllFiltersLabel: strings.RemoveAllFiltersLabel,
            showBlankEditInfoMessage: strings.ShowBlankEditInfoMessage
          }}
        />
      </div>
    );
  }
}
