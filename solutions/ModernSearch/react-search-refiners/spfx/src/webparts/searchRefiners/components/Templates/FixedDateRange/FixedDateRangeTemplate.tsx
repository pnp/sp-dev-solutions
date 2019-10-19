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

    public constructor(props: IFixedDateRangeTemplateProps) {
        super(props);

        this.state = {
            refinerSelectedFilterValues: [],
            haveMoment: ((window as any).searchHBHelper) ? true : false
        };

        this._updateFilter = this._updateFilter.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    public async componentWillMount() {
        if (!this.state.haveMoment) {
            await Loader.LoadHandlebarsHelpers();
            this.setState({ haveMoment: true });
        }
    }

    public render() {
        if (!this.state.haveMoment) return null;

        if (this.props.refinementResult.Values.length !== 6) {
            return <div>This template only works for Created, LastModifiedTime and RefinableDateXX properties</div>;
        }

        let options =
            [

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
                }
            ];

        this.props.refinementResult.Values.reverse(); // ensure first interval is most recent

        for (let i = 0; i < this.props.refinementResult.Values.length - 1; i++) {
            const element = this.props.refinementResult.Values[i];
            if (element.RefinementCount === 0) {
                options.splice(0, 1);
            } else {
                break;
            }
        }

        // add last option if old docs
        if (this.props.refinementResult.Values[5].RefinementCount > 0) {
            options.push({
                key: Interval.OlderThanAYear.toString(),
                text: strings.Refiners.Templates.DateIntervalStrings.Older
            });
        }

        // add any time options
        options.splice(0, 0, {
            key: Interval.AnyTime.toString(),
            text: strings.Refiners.Templates.DateIntervalStrings.AnyTime
        });

        return <div>
            <ChoiceGroup
                defaultSelectedKey={Interval.AnyTime.toString()}
                options={options}
                onChange={this._onChange}
                ariaLabelledBy={labelId}
            />
        </div>;
    }

    public componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.refinerSelectedFilterValues.length > 0 && this.props.shouldResetFilters) {
            this.setState({
                refinerSelectedFilterValues: [],
            });
        }
    }

    private _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
        this._updateFilter(parseInt(option.key));
    }

    private _updateFilter(interval: Interval) {

        let updatedValues = [];

        let startDate = "min";
        let endDate = "max";
        switch (interval) {
            case Interval.Past24: {
                startDate = this._getISOString("days", 1);
                break;
            }
            case Interval.PastWeek: {
                startDate = this._getISOString("weeks", 1);
                break;
            }
            case Interval.PastMonth: {
                startDate = this._getISOString("months", 1);
                break;
            }
            case Interval.Past3Months: {
                startDate = this._getISOString("months", 3);
                break;
            }
            case Interval.PastYear: {
                startDate = this._getISOString("years", 1);
                break;
            }
            case Interval.OlderThanAYear: {
                endDate = this._getISOString("years", 1);
                break;
            }
        }

        const rangeConditions = `range(${startDate},${endDate})`;

        let filterDisplayValue: string[] = [];

        const refinementValue: IRefinementValue = {
            RefinementCount: 0,
            RefinementName: this.props.refinementResult.FilterName,
            RefinementToken: rangeConditions,
            RefinementValue: filterDisplayValue.length > 0 ? `(${filterDisplayValue.join(",")})` : this.props.refinementResult.FilterName
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

    private _getISOString(unit: string, count: number) {
        if ((window as any).searchHBHelper) {
            return (window as any).searchMoment(new Date()).subtract(count, unit).toDate().toISOString();
        }
    }
}