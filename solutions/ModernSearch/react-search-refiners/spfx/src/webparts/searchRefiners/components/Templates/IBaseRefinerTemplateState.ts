import { IRefinementFilter } from "../../../../models/ISearchResult";

interface IBaseRefinerTemplateState {

    /**
     * The  selected values for the current refiner 
     */
    refinerSelectedFilters: IRefinementFilter[];
} 

export default IBaseRefinerTemplateState;