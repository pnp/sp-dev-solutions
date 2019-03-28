import * as React from                                                 'react';
import RefinerTemplateOption from '../../../../models/RefinerTemplateOption'
import CheckboxTemplate from "./Checkbox/CheckboxTemplate";
import { IRefinementResult } from "../../../../models/ISearchResult";
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
}

export default class TemplateRenderer extends React.Component<ITemplateRendererProps> {

    public render() {

        let renderTemplate: JSX.Element = null;
        
        // Choose the right template according to the template type
        switch (this.props.templateType) {
            case RefinerTemplateOption.CheckBox:
                renderTemplate =    <CheckboxTemplate 
                                    refinementResult={this.props.refinementResult}
                                    onFilterValuesUpdated={this.props.onFilterValuesUpdated}
                                    shouldResetFilters={this.props.shouldResetFilters}
                                    isMultiValue={false}
                                />;
                break;

            case RefinerTemplateOption.CheckBoxMulti:
                renderTemplate =    <CheckboxTemplate 
                                    refinementResult={this.props.refinementResult}
                                    onFilterValuesUpdated={this.props.onFilterValuesUpdated}
                                    shouldResetFilters={this.props.shouldResetFilters}
                                    isMultiValue={true}
                                />;
                break;

            default:

        }

        return renderTemplate;
    }
}