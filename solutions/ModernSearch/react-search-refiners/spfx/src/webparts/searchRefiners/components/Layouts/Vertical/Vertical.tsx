import * as React from                                                 'react';
import IVerticalProps from                                              './IVerticalProps';
import IVerticalState from                                              './IVerticalState';
import * as update from                                                'immutability-helper';
import {
    GroupedList,
    IGroup,
    IGroupDividerProps
} from                                                                 'office-ui-fabric-react/lib/components/GroupedList/index';
import {Link} from 'office-ui-fabric-react';
import styles from './Vertical.module.scss';
import * as strings from 'SearchRefinersWebPartStrings';
import TemplateHost from '../../Templates/TemplateHost';

export default class Vertical extends React.Component<IVerticalProps, IVerticalState> {

    public constructor(props: IVerticalProps) {
        super(props);

        this.state = {
            expandedGroups: [],
        };

        this._removeAllFilters = this._removeAllFilters.bind(this);
        this._onRenderHeader = this._onRenderHeader.bind(this);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    public render(): React.ReactElement<IVerticalProps> {

        let items: JSX.Element[] = [];
        let groups: IGroup[] = [];
        let noResultsElement: JSX.Element;

        // Initialize the Office UI grouped list
        this.props.refinementResults.map((refinementResult, i) => {

            // Get group name
            let groupName = refinementResult.FilterName;
            const configuredFilter = this.props.refinersConfiguration.filter(e => { return e.refinerName === refinementResult.FilterName;});
            groupName = configuredFilter.length > 0 && configuredFilter[0].displayValue ? configuredFilter[0].displayValue : groupName;

            groups.push({
                key: i.toString(),
                name: groupName,
                count: 1,
                startIndex: i,
                isDropEnabled: true,
                isCollapsed: this.state.expandedGroups.indexOf(i) === -1 ? true : false,
            });

            items.push(
                <TemplateHost 
                    key={i} 
                    refinementResult={refinementResult} 
                    selectedRefinementFilters={this.props.selectedRefinementFilters.filter(filter => { return filter.FilterName === refinementResult.FilterName ;})}
                    templateType={configuredFilter[0].template}
                    onFiltersAdded={this.props.onFiltersAdded}
                    onFiltersRemoved={this.props.onFiltersRemoved}
                />
            );
        });

        const renderAvailableFilters = (this.props.refinementResults.length > 0) ? <GroupedList
            ref='groupedList'
            items={items}
            onRenderCell={this._onRenderCell}
            className={styles.verticalLayout__filterPanel__body__group}
            groupProps={
                {
                    onRenderHeader: this._onRenderHeader,
                }
            }
            groups={groups} /> : noResultsElement;

        const renderLinkRemoveAll = this.props.selectedRefinementFilters.length > 0 ?
                                    (<div className={`${styles.verticalLayout__filterPanel__body__removeAllFilters} ${this.props.selectedRefinementFilters.length === 0 && "hiddenLink"}`}>
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

    private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
        return (
            <div className={styles.verticalLayout__filterPanel__body__group__item} data-selection-index={itemIndex}>
                {item}
            </div>
        );
    }

    private _onRenderHeader(props: IGroupDividerProps): JSX.Element {

        return (
            <div className={ styles.verticalLayout__filterPanel__body__group__header }
                style={props.groupIndex > 0 ? { marginTop: '10px' } : undefined }
                onClick={() => {

                    // Update the index for expanded groups to be able to keep it open after a re-render
                    const updatedExpandedGroups =
                        props.group.isCollapsed ?
                            update(this.state.expandedGroups, { $push: [props.group.startIndex] }) :
                            update(this.state.expandedGroups, { $splice: [[this.state.expandedGroups.indexOf(props.group.startIndex), 1]] });

                    this.setState({
                        expandedGroups: updatedExpandedGroups,
                    });

                    props.onToggleCollapse(props.group);
                }}>
                <div className={styles.verticalLayout__filterPanel__body__headerIcon}>
                    <i className={props.group.isCollapsed ? 'ms-Icon ms-Icon--ChevronDown' : 'ms-Icon ms-Icon--ChevronUp'}></i>
                </div>
                <div className='ms-font-l'>{props.group.name}</div>
            </div>
        );
    }

    private _removeAllFilters(): void {
        //this._applyFilters([]);
    }

}