import * as React from 'react';
import IFilterLayoutProps from '../IFilterLayoutProps';
import IVerticalState from './IVerticalState';
import * as update from 'immutability-helper';
import {
    GroupedList,
    IGroup,
    IGroupDividerProps,
    IGroupedList
} from 'office-ui-fabric-react/lib/components/GroupedList/index';
import {Link} from 'office-ui-fabric-react/lib/Link';
import styles from './Vertical.module.scss';
import * as strings from 'SearchRefinersWebPartStrings';
import TemplateRenderer from '../../Templates/TemplateRenderer';
import { isEqual } from '@microsoft/sp-lodash-subset';

export default class Vertical extends React.Component<IFilterLayoutProps, IVerticalState> {

    private _groupedList: IGroupedList;

    public constructor(props: IFilterLayoutProps) {
        super(props);

        this.state = {
            items: [],
            groups: []
        };

        this._removeAllFilters = this._removeAllFilters.bind(this);
        this._onRenderHeader = this._onRenderHeader.bind(this);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    public render(): React.ReactElement<IFilterLayoutProps> {

        let noResultsElement: JSX.Element;

        const renderAvailableFilters = (this.props.refinementResults.length > 0) ? <GroupedList
            ref='groupedList'
            items={this.state.items}
            componentRef={ (g) => { this._groupedList = g; }}
            onRenderCell={this._onRenderCell}
            className={styles.verticalLayout__filterPanel__body__group}
            groupProps={
                {
                    onRenderHeader: this._onRenderHeader,
                }
            }
            groups={this.state.groups} /> : noResultsElement;

        const renderLinkRemoveAll = this.props.hasSelectedValues ?
            (<div className={`${styles.verticalLayout__filterPanel__body__removeAllFilters} ${this.props.hasSelectedValues && "hiddenLink"}`}>
                <Link onClick={this._removeAllFilters}>
                    {strings.RemoveAllFiltersLabel}
                </Link>
            </div>) : null;

        return (
            <div className={styles.verticalLayout__filterPanel__body}>
                {renderAvailableFilters}
                {renderLinkRemoveAll}
            </div>
        );
    }

    public componentDidMount() {
        this._initGroups(this.props);
        this._initItems(this.props);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: IFilterLayoutProps) {      
        
        let shouldReset = false;

        if (!isEqual(this.props.refinersConfiguration, nextProps.refinersConfiguration)) {
            shouldReset = true;
        }

        this._initGroups(nextProps, shouldReset);
        this._initItems(nextProps);

        // Need to force an update manually because nor items or groups update will be considered as an update by the GroupedList component.
        this._groupedList.forceUpdate();        
    }

    private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
        return (
            <div className={styles.verticalLayout__filterPanel__body__group__item} data-selection-index={itemIndex}>
                {item}
            </div>
        );
    }

    private _onRenderHeader(props: IGroupDividerProps): JSX.Element {

        return (
            <div className={styles.verticalLayout__filterPanel__body__group__header}
                style={props.groupIndex > 0 ? { marginTop: '10px' } : undefined}
                onClick={() => {
                    props.onToggleCollapse(props.group);
                }}>
                <div className={styles.verticalLayout__filterPanel__body__headerIcon}>
                    <i className={props.group.isCollapsed ? 'ms-Icon ms-Icon--ChevronDown' : 'ms-Icon ms-Icon--ChevronUp'}></i>
                </div>
                <div className='ms-font-l'>{props.group.name}</div>
            </div>
        );
    }

    private _removeAllFilters() {
        this.props.onRemoveAllFilters();
    }

    /***
     * Initializes expanded groups
     * @param refinementResults the refinements results
     * @param refinersConfiguration the current refiners configuration
     */
    private _initGroups(props: IFilterLayoutProps, shouldResetCollapse?: boolean) {

        let groups: IGroup[] = [];
        props.refinementResults.map((refinementResult, i) => {

            // Get group name
            let groupName = refinementResult.FilterName;
            const configuredFilters = props.refinersConfiguration.filter(e => { return e.refinerName === refinementResult.FilterName;});
            groupName = configuredFilters.length > 0 && configuredFilters[0].displayValue ? configuredFilters[0].displayValue : groupName;
            let isCollapsed = true;

            const existingGroups = this.state.groups.filter(g => { return g.name === groupName;});

            if (existingGroups.length > 0 && !shouldResetCollapse) {
                isCollapsed = existingGroups[0].isCollapsed;
            } else {
                isCollapsed = configuredFilters.length > 0 && configuredFilters[0].showExpanded ? !configuredFilters[0].showExpanded : true;
            }

            let group: IGroup = {
                key: i.toString(),
                name: groupName,
                count: 1,
                startIndex: i,
                isCollapsed: isCollapsed
            };

            groups.push(group);
        });

        this.setState({
            groups: update(this.state.groups, { $set: groups })
        });
    }

    /**
     * Initializes items in for goups in the GroupedList
     * @param refinementResults the refinements results
     */
    private _initItems(props: IFilterLayoutProps): void {

        let items: JSX.Element[] = [];

        // Initialize the Office UI grouped list
        props.refinementResults.map((refinementResult, i) => {

            const configuredFilter = props.refinersConfiguration.filter(e => { return e.refinerName === refinementResult.FilterName; });

            // Get selected values for this specfic refiner
            // This scenario happens due to the behavior of the Office UI Fabric GroupedList component who recreates child components when a greoup is collapsed/expanded, causing a state reset for sub components
            // In this case we use the refiners global state to recreate the 'local' state for this component
            const selectedFilter = props.selectedFilters.filter(filter => { return filter.FilterName === refinementResult.FilterName; });
            const selectedFilterValues = selectedFilter.length === 1 ? selectedFilter[0].Values : [];

            items.push(
                <TemplateRenderer
                    key={i}
                    refinementResult={refinementResult}
                    shouldResetFilters={props.shouldResetFilters}
                    templateType={configuredFilter[0].template}
                    onFilterValuesUpdated={props.onFilterValuesUpdated}
                    language={props.language}
                    selectedValues={selectedFilterValues}
                />
            );
        });

        this.setState({
            items: update(this.state.items, { $set: items })
        });
    }
}