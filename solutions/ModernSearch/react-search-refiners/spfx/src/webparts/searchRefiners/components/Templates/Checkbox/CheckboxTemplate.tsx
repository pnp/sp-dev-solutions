import * as React from "react";
import IBaseRefinerTemplateProps from '../IBaseRefinerTemplateProps';
import IBaseRefinerTemplateState from '../IBaseRefinerTemplateState';
import { IRefinementValue, RefinementOperator } from "../../../../../models/ISearchResult";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Text } from '@microsoft/sp-core-library';
import { Link } from 'office-ui-fabric-react/lib/Link';
import * as strings from 'SearchRefinersWebPartStrings';
import * as update from 'immutability-helper';

export default class CheckboxTemplate extends React.Component<IBaseRefinerTemplateProps, IBaseRefinerTemplateState> {

    private _operator: RefinementOperator;

    public constructor(props: IBaseRefinerTemplateProps) {
        super(props);

        this.state = {
            refinerSelectedFilterValues: []
        };

        this._onFilterAdded = this._onFilterAdded.bind(this);
        this._onFilterRemoved = this._onFilterRemoved.bind(this);
        this._applyFilters = this._applyFilters.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
    }

    public render() {
        return <div>
            {
                this.props.refinementResult.Values.map((refinementValue: IRefinementValue, j) => {

                    if (refinementValue.RefinementCount === 0) {
                        return null;
                    }

                    return (
                        <Checkbox
                            styles={{
                                root: {
                                    padding: 10
                                }
                            }}
                            key={j}
                            checked={this._isValueInFilterSelection(refinementValue)}
                            label={Text.format(refinementValue.RefinementValue + ' ({0})', refinementValue.RefinementCount)}
                            onChange={(ev, checked: boolean) => {
                                checked ? this._onFilterAdded(refinementValue) : this._onFilterRemoved(refinementValue);
                            }} />
                    );
                })
            }
            {
                this.props.isMultiValue ?

                    <div>
                        <Link onClick={() => { this._applyFilters(this.state.refinerSelectedFilterValues); }} disabled={this.state.refinerSelectedFilterValues.length === 0}>{strings.Refiners.ApplyFiltersLabel}</Link>|<Link onClick={this._clearFilters} disabled={this.state.refinerSelectedFilterValues.length === 0}>{strings.Refiners.ClearFiltersLabel}</Link>
                    </div>

                    : null
            }
        </div>;
    }

    public componentDidMount() {

        // Determine the operator according to multi value setting
        this._operator = this.props.isMultiValue ? RefinementOperator.OR : RefinementOperator.AND;

        // This scenario happens due to the behavior of the Office UI Fabric GroupedList component who recreates child components when a greoup is collapsed/expanded, causing a state reset for sub components
        // In this case we use the refiners global state to recreate the 'local' state for this component
        this.setState({
            refinerSelectedFilterValues: this.props.selectedValues
        });
    }

    public UNSAFE_componentWillReceiveProps(nextProps: IBaseRefinerTemplateProps) {

        if (nextProps.shouldResetFilters) {
            this.setState({
                refinerSelectedFilterValues: []
            });
        }

        // Remove an arbitrary value from the inner state
        // Useful when the remove filter action is also present in the parent layout component
        if (nextProps.removeFilterValue) {

            const newFilterValues = this.state.refinerSelectedFilterValues.filter((elt) => {
                return elt.RefinementName !== nextProps.removeFilterValue.RefinementName;
            });

            this.setState({
                refinerSelectedFilterValues: newFilterValues
            });

            this._applyFilters(newFilterValues);
        }
    }

    /**
     * Checks if the current filter value is present in the list of the selected values for the current refiner
     * @param valueToCheck The filter value to check
     */
    private _isValueInFilterSelection(valueToCheck: IRefinementValue): boolean {

        let newFilters = this.state.refinerSelectedFilterValues.filter((filter) => {
            return filter.RefinementToken === valueToCheck.RefinementToken && filter.RefinementName === valueToCheck.RefinementName;
        });

        return newFilters.length === 0 ? false : true;
    }

    /**
     * Handler when a new filter value is selected
     * @param addedValue the filter value added
     */
    private _onFilterAdded(addedValue: IRefinementValue) {

        let newFilterValues = update(this.state.refinerSelectedFilterValues, { $push: [addedValue] });

        this.setState({
            refinerSelectedFilterValues: newFilterValues
        });

        if (!this.props.isMultiValue) {
            this._applyFilters(newFilterValues);
        }
    }

    /**
     * Handler when a filter value is unselected
     * @param removedValue the filter value removed
     */
    private _onFilterRemoved(removedValue: IRefinementValue) {

        const newFilterValues = this.state.refinerSelectedFilterValues.filter((elt) => {
            return elt.RefinementName !== removedValue.RefinementName;
        });

        this.setState({
            refinerSelectedFilterValues: newFilterValues
        });

        if (!this.props.isMultiValue) {
            this._applyFilters(newFilterValues);
        }
    }

    /**
     * Applies all selected filters for the current refiner 
     */
    private _applyFilters(updatedValues: IRefinementValue[]) {
        this.props.onFilterValuesUpdated(this.props.refinementResult.FilterName, updatedValues, this._operator);
    }

    /**
     * Clears all selected filters for the current refiner
     */
    private _clearFilters() {

        this.setState({
            refinerSelectedFilterValues: []
        });

        this._applyFilters([]);
    }
}