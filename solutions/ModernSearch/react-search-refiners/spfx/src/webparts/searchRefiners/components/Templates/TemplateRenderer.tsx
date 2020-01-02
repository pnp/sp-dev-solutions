import * as React from 'react';
import RefinerTemplateOption from '../../../../models/RefinerTemplateOption';
import CheckboxTemplate from "./Checkbox/CheckboxTemplate";
import DateRangeTemplate from "./DateRange/DateRangeTemplate";
import FixedDateRangeTemplate from "./FixedDateRange/FixedDateRangeTemplate";
import { IRefinementResult, IRefinementValue } from "../../../../models/ISearchResult";
import RefinementFilterOperationCallback from '../../../../models/RefinementValueOperationCallback';

export interface ITemplateRendererProps {

    /**
     * The template type to render
     */
    templateType: RefinerTemplateOption;

    /**
     * The current refinement result to display
     */
    refinementResult: IRefinementResult;

    /**
     * Callback method to update selected filters
     */
    onFilterValuesUpdated: RefinementFilterOperationCallback;

    /**
     * Indicates if the current filters should be reset
     */
    shouldResetFilters: boolean;

    /**
     * A single to remove from the selection
     */
    valueToRemove?: IRefinementValue;

    /**
     * The current UI language
     */
    language: string;

    /**
     * The current selected values for this refinement result
     * Used to build local state for sub components
     */
    selectedValues: IRefinementValue[];
}

export default class TemplateRenderer extends React.Component<ITemplateRendererProps> {

    public render() {

        let renderTemplate: JSX.Element = null;

        // Choose the right template according to the template type
        switch (this.props.templateType) {
            case RefinerTemplateOption.CheckBox:
                renderTemplate = <CheckboxTemplate
                    refinementResult={this.props.refinementResult}
                    onFilterValuesUpdated={this.props.onFilterValuesUpdated}
                    shouldResetFilters={this.props.shouldResetFilters}
                    isMultiValue={false}
                    removeFilterValue={this.props.valueToRemove}
                    selectedValues={this.props.selectedValues}
                />;
                break;

            case RefinerTemplateOption.CheckBoxMulti:
                renderTemplate = <CheckboxTemplate
                    refinementResult={this.props.refinementResult}
                    onFilterValuesUpdated={this.props.onFilterValuesUpdated}
                    shouldResetFilters={this.props.shouldResetFilters}
                    isMultiValue={true}
                    removeFilterValue={this.props.valueToRemove}
                    selectedValues={this.props.selectedValues}
                />;
                break;

            case RefinerTemplateOption.DateRange:
                renderTemplate = <DateRangeTemplate
                    refinementResult={this.props.refinementResult}
                    onFilterValuesUpdated={this.props.onFilterValuesUpdated}
                    shouldResetFilters={this.props.shouldResetFilters}
                    isMultiValue={true}
                    removeFilterValue={this.props.valueToRemove}
                    language={this.props.language}
                    selectedValues={this.props.selectedValues}
                />;
                break;

            case RefinerTemplateOption.FixedDateRange:
                renderTemplate = <FixedDateRangeTemplate
                    refinementResult={this.props.refinementResult}
                    onFilterValuesUpdated={this.props.onFilterValuesUpdated}
                    shouldResetFilters={this.props.shouldResetFilters}
                    isMultiValue={false}
                    removeFilterValue={this.props.valueToRemove}
                    language={this.props.language}
                    selectedValues={this.props.selectedValues} />;
                break;

            default:

        }

        return renderTemplate;
    }
}