import { IRefinementValue } from "../../../../../models/ISearchResult";

interface ILinkPanelState {
    showPanel?: boolean;
    valueToRemove: IRefinementValue;
    expandedGroups?: string[];
}

export default ILinkPanelState;