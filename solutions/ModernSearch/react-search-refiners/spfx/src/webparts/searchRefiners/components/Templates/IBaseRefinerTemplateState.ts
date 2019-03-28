import { IRefinementFilter, IRefinementValue } from "../../../../models/ISearchResult";

interface IBaseRefinerTemplateState {

    /**
     * The current selected values for the refiner 
     */
    refinerSelectedFilterValues: IRefinementValue[];
} 

export default IBaseRefinerTemplateState;