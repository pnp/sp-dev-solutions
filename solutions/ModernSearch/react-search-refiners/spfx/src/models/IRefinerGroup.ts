import {
    IGroup
} from 'office-ui-fabric-react/lib/components/GroupedList/index';

export interface IRefinerGroup extends IGroup {
    /**
     * If the refiner value filter should be shown.
     */
    showValueFilter: boolean;
    /**
     * The value on which to filter.
     */
    valueFilter: string;
}