import * as React from                                                 'react';
import IFilterPanelProps from                                          './IFiltersProps';
import IFilterPanelState from                                          './IFiltersState';
import { Checkbox } from                                               'office-ui-fabric-react/lib/Checkbox';
import { Text, DisplayMode } from                                                   '@microsoft/sp-core-library';
import * as update from                                                'immutability-helper';
import {
    GroupedList,
    IGroup,
    IGroupDividerProps
} from                                                                 'office-ui-fabric-react/lib/components/GroupedList/index';
import {Link, MessageBar, MessageBarType} from 'office-ui-fabric-react';
import { IRefinementValue, IRefinementFilter } from '../../../models/ISearchResult';
import styles from './Filters.module.scss';

export default class Filters extends React.Component<IFilterPanelProps, IFilterPanelState> {

    public constructor(props) {
        super(props);

        this.state = {
            expandedGroups: [],
        };

        this._addFilter = this._addFilter.bind(this);
        this._removeFilter = this._removeFilter.bind(this);
        this._isInFilterSelection = this._isInFilterSelection.bind(this);
        this._removeAllFilters = this._removeAllFilters.bind(this);
        this._onRenderHeader = this._onRenderHeader.bind(this);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    public render(): React.ReactElement<IFilterPanelProps> {

        let items: JSX.Element[] = [];
        let groups: IGroup[] = [];
        let noResultsElement: JSX.Element;

        if (this.props.availableFilters.length === 0) {
            if (this.props.displayMode === DisplayMode.Edit && this.props.showBlank) {
                noResultsElement = <MessageBar messageBarType={MessageBarType.info}>{this.props.strings.showBlankEditInfoMessage}</MessageBar>;
            }
            else if (!this.props.showBlank) {
                noResultsElement = (<div className={styles.searchWp__filterPanel__body__noresult}>
                        {this.props.strings.noFilterConfiguredLabel}
                    </div>
                );
            } 
        }

        // Initialize the Office UI grouped list
        this.props.availableFilters.map((filter, i) => {

            // Get group name
            let groupName = filter.FilterName;
            const configuredFilter = this.props.refinersConfiguration.filter(e => { return e.refinerName === filter.FilterName;});
            groupName = configuredFilter.length > 0 && configuredFilter[0].displayValue ? configuredFilter[0].displayValue : groupName;

            groups.push({
                key: i.toString(),
                name: groupName,
                count: 1,
                startIndex: i,
                isDropEnabled: true,
                isCollapsed: this.state.expandedGroups.indexOf(i) === -1 ? true : false,
            });

            items.push(
                <div key={i}>
                        {
                            filter.Values.map((refinementValue: IRefinementValue, j) => {

                                // Create a new IRefinementFilter with only the current refinement information
                                const currentRefinement: IRefinementFilter = {
                                    FilterName: filter.FilterName,
                                    Value: refinementValue,
                                };

                                return (
                                    <Checkbox
                                        key={j}
                                        checked={this._isInFilterSelection(currentRefinement)}
                                        disabled={false}
                                        label={Text.format(refinementValue.RefinementValue + ' ({0})', refinementValue.RefinementCount)}
                                        onChange={(ev, checked: boolean) => {
                                            // Every time we chek/uncheck a filter, a complete new search request is performed with current selected refiners
                                            checked ? this._addFilter(currentRefinement) : this._removeFilter(currentRefinement);
                                        }} />
                                );
                            })
                        }
                </div>
            );
        });

        const renderAvailableFilters = (this.props.availableFilters.length > 0) ? <GroupedList
            ref='groupedList'
            items={items}
            onRenderCell={this._onRenderCell}
            className={styles.searchWp__filterPanel__body__group}
            groupProps={
                {
                    onRenderHeader: this._onRenderHeader,
                }
            }
            groups={groups} /> : noResultsElement;

        const renderLinkRemoveAll = this.props.selectedFilters.length > 0 ?
                                    (<div className={`${styles.searchWp__filterPanel__body__allFiltersToggle} ${this.props.selectedFilters.length === 0 && "hiddenLink"}`}>
                                    <div className='ms-Grid-row'>
                                        <div className='ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1'>
            
                                        </div>
                                        <div className='ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10'>
                                            <Link onClick={this._removeAllFilters}>
                                                {this.props.strings.removeAllFiltersLabel}
                                            </Link>
                                        </div>
                                    </div>
                                </div>) : null;

        return (
                <div className={styles.searchWp__filterPanel__body}>
                    {renderLinkRemoveAll}
                    {renderAvailableFilters}
                </div>
        );
    }

    private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
        return (
            <div className='ms-Grid-row' data-selection-index={itemIndex}>
                <div className='ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10 ms-smPush1 ms-mdPush1 ms-lgPush1'>
                    {item}
                </div>
            </div>
        );
    }

    private _onRenderHeader(props: IGroupDividerProps): JSX.Element {
        return (
            <div className={styles.searchWp__filterPanel__body__group__header}>
                <div className='ms-Grid-row' onClick={() => {

                    // Update the index for expanded groups to be able to keep it open after a re-render
                    const updatedExpandedGroups =
                        props.group.isCollapsed ?
                            update(this.state.expandedGroups, { $push: [props.group.startIndex] }) :
                            update(this.state.expandedGroups, { $splice: [[this.state.expandedGroups.indexOf(props.group.startIndex), 1]] });

                    this.setState({
                        expandedGroups: updatedExpandedGroups,
                    });

                    props.onToggleCollapse(props.group);
                }}>
                    <div className='ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1'>
                        <div className={styles.searchWp__filterPanel__body__headerIcon}>
                            <i className={props.group.isCollapsed ? 'ms-Icon ms-Icon--ChevronDown' : 'ms-Icon ms-Icon--ChevronUp'}></i>
                        </div>
                    </div>
                    <div className='ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10'>
                        <div className='ms-font-l'>{props.group.name}</div>
                    </div>
                </div>
            </div>
        );
    }

    private _addFilter(filterToAdd: IRefinementFilter): void {

        // Add the filter to the selected filters collection
        let newFilters = update(this.props.selectedFilters, {$push: [filterToAdd]});
        this._applyFilters(newFilters);
    }

    private _removeFilter(filterToRemove: IRefinementFilter): void {

        // Remove the filter from the selected filters collection
        let newFilters = this.props.selectedFilters.filter((elt) => {
            return elt.Value.RefinementToken !== filterToRemove.Value.RefinementToken;
        });

        this._applyFilters(newFilters);
    }

    private _removeAllFilters(): void {
        this._applyFilters([]);
    }

    /**
     * Inner method to effectivly apply the refiners by calling back the parent component
     * @param selectedFilters The filters to apply
     */
    private _applyFilters(selectedFilters: IRefinementFilter[]): void {
        this.props.onUpdateFilters(selectedFilters);
    }

    /**
     * Checks if the current filter is present in the list of the selected filters
     * @param filterToCheck The filter to check
     */
    private _isInFilterSelection(filterToCheck: IRefinementFilter): boolean {

        let newFilters = this.props.selectedFilters.filter((filter) => {
            return filter.Value.RefinementToken === filterToCheck.Value.RefinementToken;
        });

        return newFilters.length === 0 ? false : true;
    }
}