import * as React from                                                 'react';
import ILinkPanelProps from                                          './ILinkPanelProps';
import ILinkPanelState from                                          './ILinkPanelState';
import { Panel, PanelType } from                                       'office-ui-fabric-react/lib/Panel';
import { Label } from                                                  'office-ui-fabric-react/lib/Label';
import * as update from                                                'immutability-helper';
import {
    GroupedList,
    IGroup,
    IGroupDividerProps
} from                                                                 'office-ui-fabric-react/lib/components/GroupedList/index';
import { Scrollbars } from                                             'react-custom-scrollbars';
import {ActionButton, Link} from 'office-ui-fabric-react';
import styles from './LinkPanel.module.scss';
import * as strings from 'SearchRefinersWebPartStrings';
import TemplateRenderer from '../../Templates/TemplateRenderer';

export default class LinkPanel extends React.Component<ILinkPanelProps, ILinkPanelState> {

    public constructor(props: ILinkPanelProps) {
        super(props);

        this.state = {
            showPanel: false,
            expandedGroups: [],
        };

        this._onTogglePanel = this._onTogglePanel.bind(this);
        this._onClosePanel = this._onClosePanel.bind(this);

        this._removeAllFilters = this._removeAllFilters.bind(this);
        this._onRenderHeader = this._onRenderHeader.bind(this);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    public render(): React.ReactElement<ILinkPanelProps> {

        let items: JSX.Element[] = [];
        let groups: IGroup[] = [];

        if (this.props.refinementResults.length === 0) return <span />;

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
                <TemplateRenderer 
                    key={i} 
                    refinementResult={refinementResult}
                    shouldResetFilters={this.props.shouldResetFilters}
                    templateType={configuredFilter[0].template}
                    onFilterValuesUpdated={this.props.onFilterValuesUpdated}
                />
            );
        });

        const renderSelectedFilterValues: JSX.Element[] = this.props.selectedFilterValues.map((value) => {

            return (
                <Label className={styles.filter}>
                    <i className='ms-Icon ms-Icon--ClearFilter' onClick={() => { /*this._removeFilter(filter);*/ }}></i>
                    {value.RefinementName}
                </Label>)
        });

        const renderAvailableFilters = <GroupedList
            ref='groupedList'
            items={items}
            onRenderCell={this._onRenderCell}
            className={styles.linkPanelLayout__filterPanel__body__group}
            groupProps={
                {
                    onRenderHeader: this._onRenderHeader,
                }
            }
            groups={groups} />;

            const renderLinkRemoveAll = this.props.hasSelectedValues ?
                                        (<div className={`${styles.linkPanelLayout__filterPanel__body__removeAllFilters} ${this.props.hasSelectedValues && "hiddenLink"}`}>
                                                <Link onClick={this._removeAllFilters}>
                                                    {strings.RemoveAllFiltersLabel}
                                                </Link>
                                        </div>) : null;

        return (
            <div>
                <div className={`${styles.linkPanelLayout__buttonBar__button} ms-textAlignRight`}>
                    <ActionButton
                        className={`${styles.linkPanelLayout__filterResultBtn} ms-fontWeight-semibold`}
                        iconProps={{ iconName: 'Filter' }}
                        text={strings.FilterResultsButtonLabel}
                        onClick={this._onTogglePanel}
                    />
                </div>
               {(this.props.selectedFilterValues.length > 0) ?

                    <div className={styles.linkPanelLayout__selectedFilters}>
                        {renderSelectedFilterValues}
                    </div>
                    : null
               }
                <Panel
                        isOpen={this.state.showPanel}
                        type={PanelType.medium}
                        isLightDismiss={true}
                        
                        onDismiss={this._onClosePanel}
                        headerText={strings.FilterPanelTitle}
                        onRenderBody={() => {
                            if (this.props.refinementResults.length > 0) {
                                return (
                                    <Scrollbars style={{height: '100%'}}>
                                        <div className={styles.linkPanelLayout__filterPanel__body}>
                                            {renderLinkRemoveAll}
                                            {renderAvailableFilters}
                                        </div>
                                    </Scrollbars>
                                );
                            } else {
                                return (
                                    <div className={styles.linkPanelLayout__filterPanel__body}>
                                        {strings.NoFilterConfiguredLabel}
                                    </div>
                                );
                            }
                        }}>
                    </Panel>
            </div>
        );
    }

    private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
        return (
            <div className={styles.linkPanelLayout__filterPanel__body__group__item} data-selection-index={itemIndex}>
                {item}
            </div>
        );
    }

    private _onRenderHeader(props: IGroupDividerProps): JSX.Element {
        return (
            <div className={ styles.linkPanelLayout__filterPanel__body__group__header }
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
                <div className={styles.linkPanelLayout__filterPanel__body__headerIcon}>
                    <i className={props.group.isCollapsed ? 'ms-Icon ms-Icon--ChevronDown' : 'ms-Icon ms-Icon--ChevronUp'}></i>
                </div>
                <div className='ms-font-l'>{props.group.name}</div>
            </div>
        );
    }

    private _onClosePanel() {
        this.setState({ showPanel: false });
    }

    private _onTogglePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }

    private _removeAllFilters() {        
        this.props.onRemoveAllFilters();
    }
}