import * as React from "react";
import IBaseRefinerTemplateProps from '../IBaseRefinerTemplateProps';
import IBaseRefinerTemplateState from '../IBaseRefinerTemplateState';
import { IRefinementValue, RefinementOperator } from "../../../../../models/ISearchResult";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Text } from '@microsoft/sp-core-library';
import { Link } from "office-ui-fabric-react";
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

                                return (
                                <Checkbox
                                    key={j}                                    
                                    checked={this._isValueInFilterSelection(refinementValue)}
                                    disabled={false}
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
                                <Link onClick={this._applyFilters}>{strings.Refiners.ApplyFiltersLabel}</Link>|<Link onClick={this._clearFilters}>{strings.Refiners.ClearFiltersLabel}</Link> 
                            </div>
                        
                        : null
                    }
                </div>
    }

    public componentDidMount() {

        // Determine the operator according to multi value setting
        this._operator = this.props.isMultiValue ? RefinementOperator.OR :RefinementOperator.AND;

        this.setState({
            refinerSelectedFilterValues: []
        });
    }

    public componentWillReceiveProps(nextProps: IBaseRefinerTemplateProps) {
        
        if (nextProps.shouldResetFilters) {
            this.setState({
                refinerSelectedFilterValues: []
            });
        }
    }

    /**
     * Checks if the current filter value is present in the list of the selected values for the current filter
     * @param valueToCheck The filter value to check
     */
    private _isValueInFilterSelection(valueToCheck: IRefinementValue): boolean {

        let newFilters = this.state.refinerSelectedFilterValues.filter((filter) => {
            return filter.RefinementToken === valueToCheck.RefinementToken;
        });

        return newFilters.length === 0 ? false : true;
    }

    /**
     * Handler when a new filter value is selected
     * @param addedValue the filter value added
     */
    private _onFilterAdded(addedValue: IRefinementValue) {

        let newFilterValues = update(this.state.refinerSelectedFilterValues, {$push: [addedValue]});

        this.setState({
            refinerSelectedFilterValues: newFilterValues
        });

        if (!this.props.isMultiValue) {
            this.props.onFilterValuesUpdated(this.props.refinementResult.FilterName, newFilterValues, this._operator);
        }
    }

    /**
     * Handler when a filter value is unselected
     * @param removedValue the filter value removed
     */
    private _onFilterRemoved(removedValue: IRefinementValue) {
        
        const newFilterValues = this.state.refinerSelectedFilterValues.filter((elt) => {
            return elt.RefinementToken !== removedValue.RefinementToken;
        });

        this.setState({
            refinerSelectedFilterValues: newFilterValues
        });

        if (!this.props.isMultiValue) {
            this.props.onFilterValuesUpdated(this.props.refinementResult.FilterName, newFilterValues, this._operator);
        }
    }

    /**
     * Applies all selected filters for the current refiner 
     */
    private _applyFilters() {
        this.props.onFilterValuesUpdated(this.props.refinementResult.FilterName, this.state.refinerSelectedFilterValues, this._operator);
    }

    /**
     * Clears all selected filters for the current refiner
     */
    private _clearFilters() {

        this.setState({
            refinerSelectedFilterValues: []
        });

        this.props.onFilterValuesUpdated(this.props.refinementResult.FilterName, [], this._operator);
    }
}