import * as React from                                                 'react';
import RefinerTemplateOption from '../../../../models/RefinerTemplateOption'
import CheckboxTemplate from "./Checkbox/CheckboxTemplate";
import { IRefinementResult, IRefinementFilter } from "../../../../models/ISearchResult";

export interface ITemplateHostProps {
    templateType: RefinerTemplateOption;
    refinementResult: IRefinementResult;
    selectedRefinementFilters: IRefinementFilter[];
    onFiltersAdded: (filters: IRefinementFilter[]) => void;
    onFiltersRemoved: (filters: IRefinementFilter[]) => void;
}

export default class TemplateHost extends React.Component<ITemplateHostProps, {null}> {

    public render() {

        let renderTemplate: JSX.Element = null;
        
        // Choose the right template according to the type
        switch (this.props.templateType) {
            case RefinerTemplateOption.CheckBox:
            renderTemplate =        <CheckboxTemplate 
                                        refinementResult={this.props.refinementResult}
                                        selectedRefinementFilters={this.props.selectedRefinementFilters}
                                        onFiltersAdded={this.props.onFiltersAdded}
                                        onFiltersRemoved={this.props.onFiltersRemoved}
                                        isMultiValue={false}
                                    />;
                break;

            case RefinerTemplateOption.CheckBoxMulti:
                renderTemplate =    <CheckboxTemplate 
                                    refinementResult={this.props.refinementResult} 
                                    selectedRefinementFilters={this.props.selectedRefinementFilters}
                                    onFiltersAdded={this.props.onFiltersAdded}
                                    onFiltersRemoved={this.props.onFiltersRemoved}
                                    isMultiValue={true}
                                />;
                break;

            default:

        }

        return renderTemplate;
    }
}