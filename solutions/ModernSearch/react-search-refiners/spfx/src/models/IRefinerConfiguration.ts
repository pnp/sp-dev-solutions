import RefinersSortOption from './RefinersSortOptions';
import RefinerTemplateOption from './RefinerTemplateOption';
import RefinerSortDirection from './RefinersSortDirection';

interface IRefinerConfiguration {

    /**
     * The SharePoint refiner name
     */
    refinerName: string;


    /**
     * The refiner name to display in the UI
     */
    displayValue: string;

    /**
     * The selected template for this refiner
     */
    template: RefinerTemplateOption;

    /**
     * How the refiner values should be sorted
     */
    refinerSortType: RefinersSortOption;

    /**
     * Direction of sorting values
     */
    refinerSortDirection: RefinerSortDirection;

    /** 
     * Allow refiners to be expanded by default
     */
    showExpanded: boolean;

    /** 
     * Show filter textbox to search inside the refiner values
     */
    showValueFilter: boolean;

    /** 
     * 
     * The filter to apply for reducing refinement values
     */
    valueFilter: string;
}

export default IRefinerConfiguration;