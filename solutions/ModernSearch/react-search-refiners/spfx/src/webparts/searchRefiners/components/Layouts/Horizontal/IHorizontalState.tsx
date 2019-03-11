import { IRefinementFilter } from "../../../../../models/ISearchResult";

interface IHorizontalState {
    expandedGroups?: number[];
    selectedFilters: IRefinementFilter[];
}

export default IHorizontalState;