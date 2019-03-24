import * as React from "react";
import IBaseRefinerTemplateProps from '../IBaseRefinerTemplateProps';
import IBaseRefinerTemplateState from '../IBaseRefinerTemplateState';
import { IRefinementValue, IRefinementFilter } from "../../../../../models/ISearchResult";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Text } from '@microsoft/sp-core-library';
import { Link } from "office-ui-fabric-react";
import * as update from 'immutability-helper';

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
                        this.props.refinementFilter.Values.map((refinementValue: IRefinementValue, j) => {

                            // Create a new IRefinementFilter with only the current refinement information
                            const currentRefinement: IRefinementFilter = {
                                FilterName: this.props.refinementFilter.FilterName,
                                Value: refinementValue,
                            };

                            return (
                                <Checkbox
                                    key={j}                                    
                                    defaultChecked={this._isInFilterSelection(currentRefinement)}
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
                        
                            <Link onClick={() => { this._applyFilters(this.state.refinerSelectedFilters)}}>Apply</Link> 
                        
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
            this._applyFilters(newFilters);
        }
    }

    private _onFilterRemoved(removedFilter: IRefinementFilter) {

      // Remove the filter from the selected filters collection
        const newFilters = this.state.refinerSelectedFilters.filter((elt) => {
            return elt.Value.RefinementToken !== removedFilter.Value.RefinementToken;
        });

        if (!this.props.isMultiValue) {
            this._applyFilters(newFilters);
        }
    }

    private _applyFilters(newFilters: IRefinementFilter[]) {

        this.setState({
            refinerSelectedFilters: newFilters
        });

        this.props.onUpdateFilters(newFilters);
    }
}