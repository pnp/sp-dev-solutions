import * as React from                                                 'react';
import IFilterPanelProps from                                          './IFilterPanelProps';
import IFilterPanelState from                                          './IFilterPanelState';
import { Panel, PanelType } from                                       'office-ui-fabric-react/lib/Panel';
import * as strings from                                               'SearchResultsWebPartStrings';
import { IRefinementFilter } from '../../../../models/ISearchResult';
import { Label } from                                                  'office-ui-fabric-react/lib/Label';
import { Scrollbars } from                                             'react-custom-scrollbars';
import {ActionButton} from 'office-ui-fabric-react';
import styles from '../SearchResultsWebPart.module.scss';
import { Filters } from '../../../controls/Filters';
import { DisplayMode } from '@microsoft/sp-core-library';

export default class FilterPanel extends React.Component<IFilterPanelProps, IFilterPanelState> {

    public constructor(props) {
        super(props);

        this.state = {
            showPanel: false
        };

        this._onTogglePanel = this._onTogglePanel.bind(this);
        this._onClosePanel = this._onClosePanel.bind(this);
        this._removeFilter = this._removeFilter.bind(this);
    }

    public render(): React.ReactElement<IFilterPanelProps> {

        if (this.props.availableFilters.length === 0) return <span />;

        const renderSelectedFilters: JSX.Element[] = this.props.selectedFilters.map((filter) => {

            return (
                <Label className={styles.filter}>
                    <i className='ms-Icon ms-Icon--ClearFilter' onClick={() => { this._removeFilter(filter); }}></i>
                    {filter.Value.RefinementName}
                </Label>
            );
        });

        const renderFilters = <Filters
                                availableFilters={this.props.availableFilters} 
                                refinersConfiguration={this.props.refinersConfiguration}
                                selectedFilters={this.props.selectedFilters}
                                onUpdateFilters={this.props.onUpdateFilters}
                                showBlank={true}
                                displayMode={DisplayMode.Read}
                                strings={{
                                    noFilterConfiguredLabel: strings.NoFilterConfiguredLabel,
                                    removeAllFiltersLabel: strings.RemoveAllFiltersLabel,
                                    showBlankEditInfoMessage: strings.ShowBlankEditInfoMessage
                                }}
                            />;

        return (
            <div>
                <div className={`${styles.searchWp__buttonBar__button} ms-textAlignRight`}>
                    <ActionButton
                        className={`${styles.searchWp__filterResultBtn} ms-fontWeight-semibold`}
                        iconProps={{ iconName: 'Filter' }}
                        text={strings.FilterResultsButtonLabel}
                        onClick={this._onTogglePanel}
                    />
                </div>
                {(this.props.selectedFilters.length > 0) ?

                    <div className={styles.searchWp__selectedFilters}>
                        {renderSelectedFilters}
                    </div>
                    : null
                }
                <Panel
                        isOpen={this.state.showPanel}
                        type={PanelType.medium}
                        isLightDismiss={true}
                        onDismiss={this._onClosePanel}
                        headerText={strings.FilterPanelTitle}
                        onRenderBody={() => {
                            if (this.props.availableFilters.length > 0) {
                                return (
                                    <Scrollbars style={{height: '100%'}}>
                                        {renderFilters}
                                    </Scrollbars>
                                );
                            } else {
                                return renderFilters;
                            }
                        }}>
                    </Panel>
            </div>
        );
    }

    private _onClosePanel() {
        this.setState({ showPanel: false });
    }

    private _onTogglePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }

    private _removeFilter(filterToRemove: IRefinementFilter): void {

        // Remove the filter from the selected filters collection
        let newFilters = this.props.selectedFilters.filter((elt) => {
            return elt.Value.RefinementToken !== filterToRemove.Value.RefinementToken;
        });

        this._applyFilters(newFilters);
    }

    /**
     * Inner method to effectivly apply the refiners by calling back the parent component
     * @param selectedFilters The filters to apply
     */
    private _applyFilters(selectedFilters: IRefinementFilter[]): void {
        this.props.onUpdateFilters(selectedFilters);
    }
}