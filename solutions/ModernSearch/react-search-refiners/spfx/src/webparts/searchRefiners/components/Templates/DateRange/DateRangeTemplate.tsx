import * as React from "react";
import IBaseRefinerTemplateProps from '../IBaseRefinerTemplateProps';
import IBaseRefinerTemplateState from '../IBaseRefinerTemplateState';
import { IRefinementValue, RefinementOperator } from "../../../../../models/ISearchResult";
import { DatePicker, IDatePickerProps } from "office-ui-fabric-react/lib/DatePicker";
import { Link } from "office-ui-fabric-react/lib/Link";
import * as update from 'immutability-helper';
import * as strings from 'SearchRefinersWebPartStrings';
import { Loader } from "../../../../../services/TemplateService/LoadHelper";

export interface IDateRangeTemplateState extends IBaseRefinerTemplateState {
    selectedFromDate: Date;
    selectedToDate: Date;
    haveMoment: boolean;
}

export interface IDateRangeTemplateProps extends IBaseRefinerTemplateProps {
    language: string;
}

export default class DateRangeTemplate extends React.Component<IDateRangeTemplateProps, IDateRangeTemplateState> {

    public constructor(props: IDateRangeTemplateProps) {
        super(props);

        this.state = {
            refinerSelectedFilterValues: [],
            selectedFromDate: null,
            selectedToDate: null,
            haveMoment: ((window as any).searchHBHelper) ? true : false
        };

        this._updateFromDate = this._updateFromDate.bind(this);
        this._updateToDate = this._updateToDate.bind(this);
        this._updateFilter = this._updateFilter.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
        this._onFormatDate = this._onFormatDate.bind(this);
    }

    public render() {
        if (!this.state.haveMoment) return null;

        const fromProps: IDatePickerProps = {
            placeholder: strings.Refiners.Templates.DateFromLabel,
            onSelectDate: this._updateFromDate,
            value: this.state.selectedFromDate,
            showGoToToday: true,
            borderless: true,
            strings: strings.Refiners.Templates.DatePickerStrings
        };

        let toProps: IDatePickerProps = {
            placeholder: strings.Refiners.Templates.DateTolabel,
            onSelectDate: this._updateToDate,
            value: this.state.selectedToDate,
            showGoToToday: true,
            borderless: true,
            strings: strings.Refiners.Templates.DatePickerStrings
        };

        // Check if moment js is present on the current page (loaded from a search results WP)
        if ((window as any).searchHBHelper) {
            toProps.formatDate = this._onFormatDate;
            fromProps.formatDate = this._onFormatDate;
        }

        if (this.state.selectedFromDate) {
            const minDdate = new Date(this.state.selectedFromDate.getTime());
            minDdate.setDate(this.state.selectedFromDate.getDate() + 1);
            toProps.minDate = minDdate;
        }

        if (this.state.selectedToDate) {
            const maxDate = new Date(this.state.selectedToDate.getTime());
            maxDate.setDate(this.state.selectedToDate.getDate() - 1);
            fromProps.maxDate = maxDate;
        }

        return <div>
            <DatePicker {...fromProps} />
            <DatePicker {...toProps} />
            <Link onClick={this._clearFilters} disabled={!this.state.selectedToDate && !this.state.selectedFromDate}>{strings.Refiners.ClearFiltersLabel}</Link>
        </div>;
    }

    public async componentWillMount() {
        if (!this.state.haveMoment) {
            await Loader.LoadHandlebarsHelpers();
            this.setState({ haveMoment: true });
        }
    }

    public componentDidMount() {

        // This scenario happens due to the behavior of the Office UI Fabric GroupedList component who recreates child components when a greoup is collapsed/expanded, causing a state reset for sub components
        // In this case we use the refiners global state to recreate the 'local' state for this component
        if (this.props.selectedValues.length === 1) {

            // Means a data has been already selected. Should be only one value in this case (i.e date range)
            const value = this.props.selectedValues[0].RefinementToken;
            const matches = /range\((.+)\,(.+)\)/.exec(value);

            if (matches[1] !== 'min') {
                this.setState({
                    selectedFromDate: new Date(matches[1])
                });
            }

            if (matches[2] !== 'max') {
                this.setState({
                    selectedToDate: new Date(matches[2])
                });
            }
        }
    }

    public UNSAFE_componentWillReceiveProps(nextProps: IBaseRefinerTemplateProps) {

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

        const rangeConditions = `range(${startDate},${endDate})`;

        let filterDisplayValue: string[] = [];

        if ((window as any).searchHBHelper) {

            if (startDate.localeCompare('min') !== 0) {
                filterDisplayValue.push(`> ${this._onFormatDate(new Date(startDate))}`);
            }

            if (endDate.localeCompare('max') !== 0) {
                filterDisplayValue.push(`< ${this._onFormatDate(new Date(endDate))}`);
            }
        }

        const refinementValue: IRefinementValue = {
            RefinementCount: 0,
            RefinementName: this.props.refinementResult.FilterName,
            RefinementToken: rangeConditions,
            RefinementValue: filterDisplayValue.length > 0 ? `(${filterDisplayValue.join(",")})` : this.props.refinementResult.FilterName
        };

        if (this.state.refinerSelectedFilterValues.length > 0) {
            // Replace the value
            updatedValues = update(this.state.refinerSelectedFilterValues, { [0]: { $set: refinementValue } });
        } else {
            // Check if the value already exists
            updatedValues = update(this.state.refinerSelectedFilterValues, { $push: [refinementValue] });
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

    private _onFormatDate(date: Date): string {
        if ((window as any).searchHBHelper) {
            return (window as any).searchMoment(date).locale(this.props.language).format('LL');
        }
    }
}