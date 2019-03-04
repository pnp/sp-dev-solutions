import { IRefinementResult, IRefinementFilter } from             '../../../../models/ISearchResult';
import RefinementFilterOperationCallback from '../../../../models/RefinementValueOperationCallback';
import IRefinerConfiguration from '../../../../models/IRefinerConfiguration';

interface IFilterPanelProps {
    availableFilters: IRefinementResult[];
    selectedFilters?: IRefinementFilter[];
    refinersConfiguration: IRefinerConfiguration[];
    onUpdateFilters: RefinementFilterOperationCallback;
}
  
export default IFilterPanelProps;