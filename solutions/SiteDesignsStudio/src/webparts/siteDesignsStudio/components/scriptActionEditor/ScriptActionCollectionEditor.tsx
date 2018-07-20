import * as React from 'react';
import { SortableContainer, SortableHandle, SortableElement } from 'react-sortable-hoc';
import { Toggle, IconButton } from 'office-ui-fabric-react';
import styles from './ScriptActionEditor.module.scss';

import { ISiteScriptAction } from '../../models/ISiteScript';
import { IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import {
	ISiteScriptSchemaService,
	SiteScriptSchemaServiceKey
} from '../../services/siteScriptSchema/SiteScriptSchemaService';
import { ISiteDesignsService, SiteDesignsServiceKey } from '../../services/siteDesigns/SiteDesignsService';
import ScriptActionEditor from './ScriptActionEditor';
import { ISiteScriptActionUIWrapper } from '../../models/ISiteScriptActionUIWrapper';

interface ISortStartEventArgs {
	node: any;
	index: number;
	collection: any[];
}

interface ISortEndEventArgs {
	oldIndex: number;
	newIndex: number;
	collection: any[];
}

export interface IScriptActionCollectionEditorState {}

export interface IScriptActionCollectionEditorProps extends IServiceConsumerComponentProps {
	parentActionUI?: ISiteScriptActionUIWrapper;
	actionUIs: ISiteScriptActionUIWrapper[];
	onActionChanged?: (actionKey: string, action: ISiteScriptAction) => void;
	onActionRemoved?: (actionKey: string) => void;
	onActionMoved?: (
		actionKey: string,
		oldActionIndex: number,
		newActionIndex: number,
		parentActionKey?: string
	) => void;
	onExpandChanged?: (actionUI: ISiteScriptActionUIWrapper) => void;
  getActionSchema?: (action: ISiteScriptAction) => any;
  useWizardPropertyEditors: boolean;
}

export default class ScriptActionCollectionEditor extends React.Component<
	IScriptActionCollectionEditorProps,
	IScriptActionCollectionEditorState
> {
	private siteScriptSchemaService: ISiteScriptSchemaService;
	private siteDesignsService: ISiteDesignsService;

	constructor(props: IScriptActionCollectionEditorProps) {
		super(props);

		this.props.serviceScope.whenFinished(() => {
			this.siteScriptSchemaService = this.props.serviceScope.consume(SiteScriptSchemaServiceKey);
			this.siteDesignsService = this.props.serviceScope.consume(SiteDesignsServiceKey);
		});
	}

	public render(): React.ReactElement<IScriptActionCollectionEditorProps> {
		let { actionUIs, serviceScope, onActionChanged } = this.props;

		const SortableListContainer = SortableContainer(({ items }) => {
			return <div>{items.map((value, index) => this._renderActionEditorWithCommands(value, index))}</div>;
		});

		return (
			<SortableListContainer
				items={actionUIs}
				onSortStart={(args) => this._onSortStart(args)}
				onSortEnd={(args) => this._onSortEnd(args)}
				lockToContainerEdges={true}
				useDragHandle={true}
			/>
		);
	}

	// private sortedItemIsExpanded: boolean;
	// private isSorting: boolean = null;
	private _onSortStart(args: ISortStartEventArgs) {
		// this.sortedItemIsExpanded = this._isExpanded(args.index);
		// this.isSorting = true;
	}

	private _onSortEnd(args: ISortEndEventArgs) {
		let movedItem = this.props.actionUIs[args.oldIndex];
		this._moveAction(movedItem.key, args.oldIndex, args.newIndex);
	}

	private _renderActionEditorWithCommands(actionUI: ISiteScriptActionUIWrapper, actionIndex: number) {
		let { getActionSchema } = this.props;
		let actionSchema = getActionSchema(actionUI.action);

		const DragHandle = SortableHandle(() => (
			<h2 className={styles.title} title={this._getActionDescription(actionSchema)}>
				{this._getActionLabel(actionSchema)}
			</h2>
		));

		let expandCollapseIcon = actionUI.isExpanded ? 'CollapseContentSingle' : 'ExploreContentSingle';
		const SortableItem = SortableElement(({ value }) => (
			<div>
				<div className={styles.scriptActionEditor}>
					<div className="ms-Grid-row">
						<div className="ms-Grid-col ms-sm8">
							<DragHandle />
						</div>
						<div className="ms-Grid-col ms-sm4">
							<div className={styles.commandButtonsContainer}>
								<div className={styles.commandButtons}>
									<IconButton
										iconProps={{ iconName: expandCollapseIcon }}
										onClick={() => this._toggleExpanded(actionUI)}
									/>
									<IconButton
										iconProps={{ iconName: 'ChromeClose' }}
										onClick={() => this._removeAction(actionUI.key)}
									/>
								</div>
							</div>
						</div>
					</div>
					{actionUI.isExpanded && (
						<ScriptActionEditor
							serviceScope={this.props.serviceScope}
							actionUI={value}
							schema={actionSchema}
							onActionChanged={(updated) => this._onActionUpdated(actionUI.key, updated)}
							onSubActionMoved={(actionKey, oldIndex, newIndex) =>
								this._moveAction(actionKey, oldIndex, newIndex, actionUI.key)}
              onExpandChanged={() => this._onActionExpandChanged(actionUI)}
              useWizardPropertyEditors={this.props.useWizardPropertyEditors}
						/>
					)}
				</div>
			</div>
		));

		return <SortableItem key={`item-${actionIndex}`} index={actionIndex} value={actionUI} />;
	}

	private _getActionLabel(actionSchema: any): string {
		let titleFromSchema = actionSchema.title;
		if (!titleFromSchema) {
			return this._getVerbFromActionSchema(actionSchema);
		}

		return titleFromSchema;
	}

	private _getActionDescription(actionSchema: any): string {
		let descriptionFromSchema = actionSchema.description;
		if (!descriptionFromSchema) {
			return '';
		}

		return descriptionFromSchema;
	}

	private _getVerbFromActionSchema(actionDefinition: any): string {
		if (
			!actionDefinition.properties ||
			!actionDefinition.properties.verb ||
			!actionDefinition.properties.verb.enum ||
			!actionDefinition.properties.verb.enum.length
		) {
			throw new Error('Invalid Action schema');
		}

		return actionDefinition.properties.verb.enum[0];
	}

	private _toggleExpanded(actionUI: ISiteScriptActionUIWrapper) {
		actionUI.isExpanded = !actionUI.isExpanded;
		this._onActionExpandChanged(actionUI);
	}

	private _removeAction(actionKey: string) {
		if (this.props.onActionRemoved) {
			this.props.onActionRemoved(actionKey);
		}
	}

	private _onActionUpdated(actionKey: string, action: ISiteScriptAction) {
		if (this.props.onActionChanged) {
			this.props.onActionChanged(actionKey, action);
		}
	}
	private _moveAction(actionKey: string, oldIndex: number, newIndex: number, parentActionKey?: string) {
		if (this.props.onActionMoved) {
			this.props.onActionMoved(actionKey, oldIndex, newIndex, parentActionKey);
		}
	}

	private _onActionExpandChanged(actionUI: ISiteScriptActionUIWrapper) {
		if (this.props.onExpandChanged) {
			this.props.onExpandChanged(actionUI);
		}
	}
}
