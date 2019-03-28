import { IRefinementFilter, IRefinementValue, RefinementOperator } from './ISearchResult';

type RefinementFilterOperationCallback = (filterName: string, filterValues: IRefinementValue[], Operatr: RefinementOperator) => void;

export default RefinementFilterOperationCallback;