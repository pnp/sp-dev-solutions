import { IRefinementFilter, IRefinementValue } from "../../../../models/ISearchResult";

interface IBaseRefinerTemplateState {

    /**
     * The current selected values for the refiner 
     */
    refinerSelectedFilterValues: IRefinementValue[];

    /**
     * Value on which refinement values will be filtered
     */
    valueFilter?: string;
} 

export default IBaseRefinerTemplateState;