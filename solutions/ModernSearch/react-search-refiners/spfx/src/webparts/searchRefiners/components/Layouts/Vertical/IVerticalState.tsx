import { IRefinementFilter } from "../../../../../models/ISearchResult";

interface IVerticalState {
    expandedGroups?: number[];
    selectedFilters: IRefinementFilter[];
}

export default IVerticalState;