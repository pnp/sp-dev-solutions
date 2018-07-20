import * as React from 'react';
import { IconButton, Icon, Panel, PanelType, Spinner, SpinnerSize, SearchBox } from 'office-ui-fabric-react';
import styles from './ScriptActionAdder.module.scss';
import { ISiteDesignsStudioProps, IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import GenericObjectEditor from '../genericObjectEditor/GenericObjectEditor';
import { ISiteScriptContent, ISiteScriptAction } from '../../models/ISiteScript';
import {
	ISiteScriptSchemaService,
	SiteScriptSchemaServiceKey
} from '../../services/siteScriptSchema/SiteScriptSchemaService';

export interface IScriptActionAdderState {
	isAdding: boolean;
	isLoading: boolean;
	filterBy: string;
	availableActions: string[];
}

export interface IScriptActionAdderProps extends IServiceConsumerComponentProps {
	onActionAdded: (s: string) => void;
	parentAction?: ISiteScriptAction;
}

export default class ScriptActionAdder extends React.Component<IScriptActionAdderProps, IScriptActionAdderState> {
	private siteScriptSchemaService: ISiteScriptSchemaService;

	constructor(props: IScriptActionAdderProps) {
		super(props);

		this.state = {
			isAdding: false,
			isLoading: true,
			filterBy: null,
			availableActions: []
		};
	}

	public componentWillMount() {
		this.props.serviceScope.whenFinished(() => {
			this.siteScriptSchemaService = this.props.serviceScope.consume(SiteScriptSchemaServiceKey);

			if (!this.props.parentAction) {
				this.setState({
					availableActions: this.siteScriptSchemaService.getAvailableActions(),
					isLoading: false
				});
			} else {
				this.setState({
					availableActions: this.siteScriptSchemaService.getAvailableSubActions(this.props.parentAction),
					isLoading: false
				});
			}
		});
	}

	private _addNewAction() {
		this.setState({ isAdding: true });
	}

	private _onPanelDismiss() {
		this.setState({ isAdding: false, filterBy: null });
	}

	private _onActionAdded(action: string) {
		this.props.onActionAdded(action);
		this._onPanelDismiss();
	}

	private _getActionLabel(actionVerb: string): string {
		let parentAction = this.props.parentAction;
		// Specify the parent action verb if any
		return this.siteScriptSchemaService.getActionTitleByVerb(actionVerb, parentAction && parentAction.verb);
	}

	private _filterAction(criteria: string) {
		this.setState({ filterBy: criteria });
	}

	private cachedFilteredActions: string[] = null;
	private _getFilteredActions() {
		let { filterBy, availableActions } = this.state;

		if (filterBy) {
			let lowerFilter = filterBy.toLowerCase();
			this.cachedFilteredActions = availableActions.filter((a) => {
				let actionLabel = this._getActionLabel(a);
				return actionLabel && actionLabel.toLowerCase().indexOf(lowerFilter) > -1;
			});
		} else {
			this.cachedFilteredActions = availableActions;
		}
		return this.cachedFilteredActions;
	}

	private _tryQuickAdd() {
    let filtered = this.cachedFilteredActions || this._getFilteredActions();
    if (filtered.length == 1) {
      this._onActionAdded(filtered[0]);
    }
  }

	public render(): React.ReactElement<ISiteDesignsStudioProps> {
		let { isLoading } = this.state;
		return (
			<div className={styles.scriptActionAdder}>
				<div
					className={styles.actionAddIcon + ' ' + (this.props.parentAction ? styles.subactions : '')}
					onClick={() => this._addNewAction()}
				>
					<Icon iconName="CircleAdditionSolid" />
				</div>
				<Panel
					type={PanelType.smallFixedFar}
					isOpen={this.state.isAdding}
					headerText="Add a Script Action"
					onDismiss={() => this._onPanelDismiss()}
				>
					{isLoading ? (
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-sm6 ms-smOffset3">
								<Spinner size={SpinnerSize.large} label="Loading..." />
							</div>
						</div>
					) : (
						<div className="ms-Grid-row">
							<div key={'filter'} className="ms-Grid-col ms-sm12">
								<SearchBox
									placeholder="Search"
									onChange={(v) => this._filterAction(v)}
									onSearch={() => this._tryQuickAdd()}
									underlined={true}
								/>
							</div>
							{this._getFilteredActions().map((a, index) => (
								<div key={index} className="ms-Grid-col ms-sm12">
									<div className={styles.actionButtonContainer}>
										<div className={styles.actionButton} onClick={() => this._onActionAdded(a)}>
											<div className="ms-Grid-col ms-sm4">
												<div className={styles.actionIcon}>
													<Icon iconName="SetAction" />
												</div>
											</div>
											<div className="ms-Grid-col ms-sm8">
												<div className={styles.actionButtonLabel}>
													{this._getActionLabel(a)}
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</Panel>
			</div>
		);
	}
}
