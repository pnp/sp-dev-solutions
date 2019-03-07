import { IRefinementFilter } from "../../../../models/ISearchResult";

interface IFiltersState {
    expandedGroups?: number[];
    appliedRefiners: IRefinementFilter[];
}

export default IFiltersState;