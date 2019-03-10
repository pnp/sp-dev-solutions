import { IRefinementFilter } from '../../../../../models/ISearchResult';

interface ILinkPanelState {
    showPanel?: boolean;
    selectedFilters?: IRefinementFilter[];
    expandedGroups?: number[];
}

export default ILinkPanelState;