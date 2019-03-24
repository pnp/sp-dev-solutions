import { IRefinementFilter } from "../../../../models/ISearchResult";

interface IBaseRefinerTemplateState {
    
    /**
     * The current selected filters for the current refiner 
     */
    refinerSelectedFilters: IRefinementFilter[];
} 

export default IBaseRefinerTemplateState;