import * as React from "react";
import IBaseRefinerTemplateProps from '../IBaseRefinerTemplateProps';
import IBaseRefinerTemplateState from '../IBaseRefinerTemplateState';
import { IRefinementValue, RefinementOperator } from "../../../../../models/ISearchResult";
import { IChoiceGroupOption, ChoiceGroup } from "office-ui-fabric-react/lib/ChoiceGroup";
import { Guid } from '@microsoft/sp-core-library';
import * as update from 'immutability-helper';
import { Loader } from "../../../../../services/TemplateService/LoadHelper";
import * as strings from 'SearchRefinersWebPartStrings';


export interface IFixedDateRangeTemplateState extends IBaseRefinerTemplateState {
    haveMoment: boolean;
}

export interface IFixedDateRangeTemplateProps extends IBaseRefinerTemplateProps {
    language: string;
}

export enum Interval {
    AnyTime,
    Past24,
    PastWeek,
    PastMonth,
    Past3Months,
    PastYear,
    OlderThanAYear
}

const labelId = "refinerDate" + Guid.newGuid().toString();

export default class FixedDateRangeTemplate extends React.Component<IFixedDateRangeTemplateProps, IFixedDateRangeTemplateState> {

    private _options = [
        {
            key: Interval.AnyTime.toString(),
            text: strings.Refiners.Templates.DateIntervalStrings.AnyTime
        },
        {
            key: Interval.Past24.toString(),
            text: strings.Refiners.Templates.DateIntervalStrings.PastDay
        },
        {
            key: Interval.PastWeek.toString(),
            text: strings.Refiners.Templates.DateIntervalStrings.PastWeek,
        },
        {
            key: Interval.PastMonth.toString(),
            text: strings.Refiners.Templates.DateIntervalStrings.PastMonth
        },
        {
            key: Interval.Past3Months.toString(),
            text: strings.Refiners.Templates.DateIntervalStrings.Past3Months
        },
        {
            key: Interval.PastYear.toString(),
            text: strings.Refiners.Templates.DateIntervalStrings.PastYear
        },
        {
            key: Interval.OlderThanAYear.toString(),
            text: strings.Refiners.Templates.DateIntervalStrings.Older
        }
    ];

    public constructor(props: IFixedDateRangeTemplateProps) {
        super(props);

        this.state = {
            refinerSelectedFilterValues: [],
            haveMoment: ((window as any).searchHBHelper) ? true : false
        };

        this._updateFilter = this._updateFilter.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    public render() {
        if (!this.state.haveMoment) return null;

        if (this.props.refinementResult.Values.length !== 6) {
            return <div>This template only works for Created, LastModifiedTime, LastModifiedTimeForRetention and RefinableDateXX properties</div>;
        }

        if (this.state.refinerSelectedFilterValues.length > 1) {
            return <div>This template only works when 1 refinement value is selected</div>;
        }

        var refinementResultValues = [...this.props.refinementResult.Values].reverse(); // ensure first interval is most recent
        var options = [...this._options];

        for (let i = 0; i < refinementResultValues.length - 1; i++) {
            const element = refinementResultValues[i];
            if (element.RefinementCount === 0) {
                options.splice(1, 1);
            } else {
                break;
            }
        }

        // remove last option if no old docs
        if (refinementResultValues[5].RefinementCount === 0) {
            options.pop();
        }

        return <div>
            <ChoiceGroup
                selectedKey={this._getIntervalKeyForValue()}
                options={options}
                onChange={this._onChange}
                ariaLabelledBy={labelId}
            />
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
        // Useful when the remove filter action is also present in the parent control
        if (nextProps.removeFilterValue) {

            const newFilterValues = this.state.refinerSelectedFilterValues.filter((elt) => {
                return elt.RefinementToken !== nextProps.removeFilterValue.RefinementToken;
            });

            this.setState({
                refinerSelectedFilterValues: newFilterValues
            });

            nextProps.onFilterValuesUpdated(nextProps.refinementResult.FilterName, [], RefinementOperator.AND);
        }
    }

    private _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
        this._updateFilter(parseInt(option.key));
    }

    private _updateFilter(interval: Interval) {

        let updatedValues = [];

        let startDate = "min";
        let endDate = "max";
        let filterDisplayValue = '';
        switch (interval) {
            case Interval.Past24: {
                startDate = this._getISOString("days", 1);
                filterDisplayValue = this._options.find(x => x.key === Interval.Past24.toString()).text;
                break;
            }
            case Interval.PastWeek: {
                startDate = this._getISOString("weeks", 1);
                filterDisplayValue = this._options.find(x => x.key === Interval.PastWeek.toString()).text;
                break;
            }
            case Interval.PastMonth: {
                startDate = this._getISOString("months", 1);
                filterDisplayValue = this._options.find(x => x.key === Interval.PastMonth.toString()).text;
                break;
            }
            case Interval.Past3Months: {
                startDate = this._getISOString("months", 3);
                filterDisplayValue = this._options.find(x => x.key === Interval.Past3Months.toString()).text;
                break;
            }
            case Interval.PastYear: {
                startDate = this._getISOString("years", 1);
                filterDisplayValue = this._options.find(x => x.key === Interval.PastYear.toString()).text;
                break;
            }
            case Interval.OlderThanAYear: {
                endDate = this._getISOString("years", 1);
                filterDisplayValue = this._options.find(x => x.key === Interval.OlderThanAYear.toString()).text;
                break;
            }
        }

        const rangeConditions = `range(${startDate},${endDate})`;

        const refinementValue: IRefinementValue = {
            RefinementCount: 0,
            RefinementName: this.props.refinementResult.FilterName,
            RefinementToken: rangeConditions,
            RefinementValue: filterDisplayValue
        };

        if (interval == Interval.AnyTime) {
            updatedValues = [];
        } else if (this.state.refinerSelectedFilterValues.length > 0) {
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

    private _getISOString(unit: string, count: number): string {
        return this._getIntervalDate(unit, count).toISOString();
    }

    private _getIntervalDate(unit: string, count: number): Date {
        return this._getIntervalDateFromStartDate(new Date(), unit, count);
    }

    private _getIntervalDateFromStartDate(startDate: Date, unit: string, count: number): Date {
        if ((window as any).searchHBHelper) {
            return (window as any).searchMoment(startDate).subtract(count, unit).toDate();
        }
    }

    private _getIntervalKeyForValue(): string {
        if (this.state.refinerSelectedFilterValues.length === 1) {
            const value = this.props.selectedValues[0].RefinementToken;
            const matches = /range\((.+)\,(.+)\)/.exec(value);
            
            if (matches[1] === 'min') {
                return Interval.OlderThanAYear.toString();
            }
            else {
                const selectedStartDate = new Date(matches[1]);
                const past24Date = this._getIntervalDateFromStartDate(this._getIntervalDate("days", 1), 'minutes', 2);
                const pastWeekDate = this._getIntervalDateFromStartDate(this._getIntervalDate("weeks", 1), 'minutes', 2);
                const pastMonthDate = this._getIntervalDateFromStartDate(this._getIntervalDate("months", 1), 'minutes', 2);
                const past3MonthsDate = this._getIntervalDateFromStartDate(this._getIntervalDate("months", 3), 'minutes', 2);
                const pastYearDate = this._getIntervalDateFromStartDate(this._getIntervalDate("years", 1), 'minutes', 2);

                if (selectedStartDate >= past24Date) {
                    return Interval.Past24.toString();
                } else if (selectedStartDate >= pastWeekDate) {
                    return Interval.PastWeek.toString();
                } else if (selectedStartDate >= pastMonthDate) {
                    return Interval.PastMonth.toString();
                } else if (selectedStartDate >= past3MonthsDate) {
                    return Interval.Past3Months.toString();
                } else if (selectedStartDate >= pastYearDate) {
                    return Interval.PastYear.toString();
                }
            }
        }
        return Interval.AnyTime.toString();
    }
}