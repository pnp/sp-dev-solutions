import { IRefinementValue } from "../../../../../models/ISearchResult";

interface ILinkPanelState {
    showPanel?: boolean;
    valueToRemove: IRefinementValue;
    expandedGroups?: number[];
}

export default ILinkPanelState;