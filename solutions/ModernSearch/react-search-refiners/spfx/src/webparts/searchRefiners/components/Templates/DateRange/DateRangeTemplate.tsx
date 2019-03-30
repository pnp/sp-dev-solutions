import * as React from "react";
import IBaseRefinerTemplateProps from '../IBaseRefinerTemplateProps';
import IBaseRefinerTemplateState from '../IBaseRefinerTemplateState';
import { IRefinementValue, RefinementOperator } from "../../../../../models/ISearchResult";
import { DatePicker, IDatePickerProps } from "office-ui-fabric-react/lib/DatePicker";
import { Link } from "office-ui-fabric-react/lib/Link";
import * as update from 'immutability-helper';
import * as strings from 'SearchRefinersWebPartStrings';

export interface IDateRangeTemplateState extends IBaseRefinerTemplateState {
    selectedFromDate: Date;
    selectedToDate: Date;
}

export default class DateRangeTemplate extends React.Component<IBaseRefinerTemplateProps, IDateRangeTemplateState> {

    public constructor(props: IBaseRefinerTemplateProps) {
        super(props);

        this.state = {
            refinerSelectedFilterValues: [],
            selectedFromDate: null,
            selectedToDate: null
        };

        this._updateFromDate = this._updateFromDate.bind(this);
        this._updateToDate = this._updateToDate.bind(this);
        this._updateFilter = this._updateFilter.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
    }
    
    public render() {

        const fromProps: IDatePickerProps  = {
            placeholder: strings.Refiners.Templates.DateFromLabel,
            onSelectDate:this._updateFromDate,
            value:this.state.selectedFromDate,
            showGoToToday:true,
            borderless:true,
        };

        let toProps: IDatePickerProps = {
            placeholder: strings.Refiners.Templates.DateTolabel,
            onSelectDate:this._updateToDate,
            value:this.state.selectedToDate,
            showGoToToday:true,
            borderless:true  
        };

        if (this.state.selectedFromDate) {
            const date = new Date();
            date.setDate(this.state.selectedFromDate.getDate() + 1);
            toProps.minDate = date;
        }

        if (this.state.selectedToDate) {
            const date = new Date();
            date.setDate(this.state.selectedToDate.getDate() -1);
            fromProps.maxDate = date;
        }

        return  <div>
                    <DatePicker {...fromProps}/>
                    <DatePicker {...toProps}/>
                    <Link onClick={this._clearFilters} disabled={!this.state.selectedToDate && !this.state.selectedFromDate}>{strings.Refiners.ClearFiltersLabel}</Link>
                </div>;
    }

    public componentWillReceiveProps(nextProps: IBaseRefinerTemplateProps) {
        
        if (nextProps.shouldResetFilters) {
            this.setState({
                refinerSelectedFilterValues: [],
                selectedFromDate: null,
                selectedToDate: null
            });
        }

        // Remove an arbitrary value from the inner state
        // Useful when the remove filter action is also present in the parent control
        if (nextProps.removeFilterValue) {
            
            const newFilterValues = this.state.refinerSelectedFilterValues.filter((elt) => {
                return elt.RefinementToken !== nextProps.removeFilterValue.RefinementToken;
            });
    
            this.setState({
                refinerSelectedFilterValues: newFilterValues,
                selectedFromDate: null,
                selectedToDate: null
            });

            nextProps.onFilterValuesUpdated(nextProps.refinementResult.FilterName, [], RefinementOperator.AND);
        }
    }

    private _updateFromDate(fromDate: Date) {

        this.setState({
            selectedFromDate: fromDate
        });

        this._updateFilter(fromDate, this.state.selectedToDate);
    }

    private _updateToDate(toDate: Date) {

        this.setState({
            selectedToDate: toDate
        });

        this._updateFilter(this.state.selectedFromDate, toDate);
    }

    private _updateFilter(selectedFromDate: Date, selectedToDate: Date) {

        let updatedValues = [];

        let startDate = selectedFromDate ? selectedFromDate.toISOString() : "min";
        let endDate = selectedToDate ? selectedToDate.toISOString() : "max";

        const rangeConditions =  `range(${startDate},${endDate})`;

        const refinementValue: IRefinementValue = {
            RefinementCount: 0,
            RefinementName: this.props.refinementResult.FilterName,
            RefinementToken: rangeConditions,
            RefinementValue: this.props.refinementResult.FilterName
        };

        if (this.state.refinerSelectedFilterValues.length > 0) {
            // Replace the value
            updatedValues = update(this.state.refinerSelectedFilterValues, { [0]: { $set: refinementValue }});
        } else {
            // Check if the value already exists
            updatedValues = update(this.state.refinerSelectedFilterValues, {$push: [refinementValue]});
        }

        this.setState({
            refinerSelectedFilterValues: updatedValues
        });

        this.props.onFilterValuesUpdated(this.props.refinementResult.FilterName, updatedValues, RefinementOperator.AND);
    }

    private _clearFilters() {

        this.setState({
            refinerSelectedFilterValues: [],
            selectedFromDate: null,
            selectedToDate: null
        });

        this.props.onFilterValuesUpdated(this.props.refinementResult.FilterName, [], RefinementOperator.AND);
    }
}