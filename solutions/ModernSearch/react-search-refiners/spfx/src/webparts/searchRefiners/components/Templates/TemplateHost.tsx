import * as React from                                                 'react';
import RefinerTemplateOption from '../../../../models/RefinerTemplateOption'
import CheckboxTemplate from "./Checkbox/CheckboxTemplate";
import { IRefinementResult, IRefinementFilter } from "../../../../models/ISearchResult";
import RefinementFilterOperationCallback from '../../../../models/RefinementValueOperationCallback';

export interface ITemplateHostProps {
    templateType: RefinerTemplateOption;
    refinementFilter: IRefinementResult;
    onUpdateFilters: RefinementFilterOperationCallback;
}

export default class TemplateHost extends React.Component<ITemplateHostProps, {null}> {

    public render() {

        let renderTemplate: JSX.Element = null;
        
        // Choose the right template according to the type
        switch (this.props.templateType) {
            case RefinerTemplateOption.CheckBox:
            renderTemplate =        <CheckboxTemplate 
                                        refinementFilter={this.props.refinementFilter} 
                                        onUpdateFilters={this.props.onUpdateFilters}
                                        isMultiValue={false}
                                    />;
                break;

            case RefinerTemplateOption.CheckBoxMulti:
                renderTemplate =    <CheckboxTemplate 
                                    refinementFilter={this.props.refinementFilter} 
                                    onUpdateFilters={this.props.onUpdateFilters}
                                    isMultiValue={true}
                                />;
                break;

            default:

        }

        return renderTemplate;
    }
}