import * as React from "react";
import IBaseRefinerTemplateProps from '../IBaseRefinerTemplateProps';
import IBaseRefinerTemplateState from '../IBaseRefinerTemplateState';
import { IRefinementValue, IRefinementFilter } from "../../../../../models/ISearchResult";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Text } from '@microsoft/sp-core-library';
import { Link } from "office-ui-fabric-react";
import * as update from 'immutability-helper';
import * as _ from '@microsoft/sp-lodash-subset';

export default class CheckboxTemplate extends React.Component<IBaseRefinerTemplateProps, IBaseRefinerTemplateState> {

    public constructor(props: IBaseRefinerTemplateProps) {
        super(props);

        this.state = {
            refinerSelectedFilters: []
        };

        this._onFilterAdded = this._onFilterAdded.bind(this);
        this._onFilterRemoved = this._onFilterRemoved.bind(this);
        this._applyFilters = this._applyFilters.bind(this);
    }
    
    public render() {

        return <div>
                    {
                        this.props.refinementResult.Values.map((refinementValue: IRefinementValue, j) => {

                            // Create a new IRefinementFilter with only the current refinement information
                            const currentRefinement: IRefinementFilter = {
                                FilterName: this.props.refinementResult.FilterName,
                                Value: refinementValue,
                            };

                            return (
                                <Checkbox
                                    key={j}                                    
                                    checked={this._isInFilterSelection(currentRefinement)}
                                    disabled={false}
                                    label={Text.format(refinementValue.RefinementValue + ' ({0})', refinementValue.RefinementCount)}
                                    onChange={(ev, checked: boolean) => {
                                        checked ? this._onFilterAdded(currentRefinement) : this._onFilterRemoved(currentRefinement);
                                    }} />
                            );
                        })
                    }
                    {
                        this.props.isMultiValue ? 
                        
                            <Link onClick={() => { this._applyFilters()}}>Apply</Link> 
                        
                        : null
                    }
                </div>
    }

    /**
     * Checks if the current filter value is present in the list of the selected values for the current filter
     * @param filterToCheck The filter to check
     */
    private _isInFilterSelection(filterToCheck: IRefinementFilter): boolean {

        let newFilters = this.state.refinerSelectedFilters.filter((filter) => {
            return filter.Value.RefinementToken === filterToCheck.Value.RefinementToken;
        });

        return newFilters.length === 0 ? false : true;
    }

    public componentDidMount() {

        this.setState({
            refinerSelectedFilters: []
        });
    }

    private _onFilterAdded(filterAdded: IRefinementFilter) {

        let newFilters = update(this.state.refinerSelectedFilters, {$push: [filterAdded]});

        this.setState({
            refinerSelectedFilters: newFilters
        });

        if (!this.props.isMultiValue) {
            this.props.onFiltersAdded(newFilters);
        }
    }

    private _onFilterRemoved(removedFilter: IRefinementFilter) {
        
        const newFilters = this.state.refinerSelectedFilters.filter((elt) => {
            return elt.Value.RefinementToken !== removedFilter.Value.RefinementToken;
        });

        this.setState({
            refinerSelectedFilters: newFilters
        });

        if (!this.props.isMultiValue) {
            this.props.onFiltersRemoved(newFilters);
        }
    }

    private _applyFilters() {

        const comparer = (otherArray: IRefinementFilter[]) => {
            return (current: IRefinementFilter) => {
                return otherArray.filter((other) => {
                    return other.Value.RefinementToken == current.Value.RefinementToken
                }).length == 0;
            }
        };
          
        const onlyInA = this.state.refinerSelectedFilters.filter(comparer(this.props.selectedRefinementFilters));
        const onlyInB = this.props.selectedRefinementFilters.filter(comparer(this.state.refinerSelectedFilters));

        if (onlyInA.length > 0) {
            this.props.onFiltersAdded(onlyInA);
        }

        if (onlyInB.length > 0) {
            this.props.onFiltersRemoved(onlyInB);
        }
    }
}