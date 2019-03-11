import { IRefinementResult } from             '../../../../../models/ISearchResult';
import RefinementFilterOperationCallback from '../../../../../models/RefinementValueOperationCallback';
import IRefinerConfiguration from '../../../../../models/IRefinerConfiguration';
import { PanelType } from 'office-ui-fabric-react/lib/Panel';

interface ILinkPanelProps {
    availableFilters: IRefinementResult[];
    refinersConfiguration: IRefinerConfiguration[];
    onUpdateFilters: RefinementFilterOperationCallback;
    resetSelectedFilters: boolean;
}

  
export default ILinkPanelProps;