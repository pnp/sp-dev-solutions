import * as React from 'react';
import { Dropdown, TextField, Toggle, Link, IconButton } from 'office-ui-fabric-react';
import styles from './ScriptActionEditor.module.scss';
import { escape, assign, find } from '@microsoft/sp-lodash-subset';
import * as strings from 'SiteDesignsStudioWebPartStrings';
import GenericObjectEditor from '../genericObjectEditor/GenericObjectEditor';

import { ISiteScriptAction } from '../../models/ISiteScript';
import ScriptActionAdder from '../scriptActionAdder/ScriptActionAdder';
import { IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import {
	ISiteScriptSchemaService,
	SiteScriptSchemaServiceKey
} from '../../services/siteScriptSchema/SiteScriptSchemaService';
import { ISiteDesignsService, SiteDesignsServiceKey } from '../../services/siteDesigns/SiteDesignsService';
import ScriptActionCollectionEditor from './ScriptActionCollectionEditor';
import { ISiteScriptActionUIWrapper } from '../../models/ISiteScriptActionUIWrapper';

export interface IScriptActionEditorState {}

export interface IScriptActionEditorProps extends IServiceConsumerComponentProps {
	actionUI: ISiteScriptActionUIWrapper;
	schema: any;
	onActionChanged?: (action: ISiteScriptAction) => void;
	onSubActionMoved?: (actionKey: string, oldIndex: number, newIndex: number) => void;
	onExpandChanged?: (actionUI: ISiteScriptActionUIWrapper) => void;
}

export default class ScriptActionEditor extends React.Component<IScriptActionEditorProps, IScriptActionEditorState> {
	private siteScriptSchemaService: ISiteScriptSchemaService;
	private siteDesignsService: ISiteDesignsService;

	constructor(props: IScriptActionEditorProps) {
		super(props);

		this.props.serviceScope.whenFinished(() => {
			this.siteScriptSchemaService = this.props.serviceScope.consume(SiteScriptSchemaServiceKey);
			this.siteDesignsService = this.props.serviceScope.consume(SiteDesignsServiceKey);
		});

		this.state = {};
	}

	public componentWillReceiveProps(nextProps: IScriptActionEditorProps) {
		// this._setAllSubactionsExpanded(nextProps.allSubactionsExpanded);
	}

	// TODO Reuse the current private method from schema service
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

	private _getCurrentActionName(): string {
		let { schema } = this.props;
		return this._getVerbFromActionSchema(schema);
	}

	private _translateLabel(value: string): string {
		const key = 'LABEL_' + value;
		return strings[key] || value;
	}

	private _onSubActionAdded(parentAction: ISiteScriptAction, subAction: ISiteScriptAction) {
		let subactions = parentAction['subactions'] as ISiteScriptAction[];
		parentAction['subactions'] = [].concat(subactions);
		this.props.onActionChanged(parentAction);
	}

	public render(): React.ReactElement<IScriptActionEditorProps> {
		let { actionUI, serviceScope, schema, onActionChanged } = this.props;

		const subactionsRenderer = (subactions: ISiteScriptActionUIWrapper[]) => {
			if (!actionUI.subactions) {
				actionUI.subactions = [];
			}
			return (
				<div className={styles.subactions}>
					<h3>{this._translateLabel('subactions')}</h3>
					<div className={styles.subactionsWorkspace}>
						<div>
							<ScriptActionCollectionEditor
								serviceScope={this.props.serviceScope}
								parentActionUI={actionUI}
								actionUIs={actionUI.subactions}
								onActionRemoved={(subActionKey) => this._removeScriptSubAction(actionUI, subActionKey)}
								onActionMoved={(actionKey, oldIndex, newIndex) =>
									this._moveSubAction(actionKey, oldIndex, newIndex)}
								onActionChanged={(subActionKey, subAction) =>
									this._onSubActionUpdated(actionUI, subActionKey, subAction)}
								getActionSchema={(subAction) =>
									this.siteScriptSchemaService.getSubActionSchema(actionUI.action, subAction)}
								onExpandChanged={(expandedAction) => this._onActionExpandChanged(expandedAction)}
							/>
						</div>
						<div>
							<ScriptActionAdder
								parentAction={actionUI.action}
								serviceScope={serviceScope}
								onActionAdded={(a) => this._addScriptSubAction(actionUI.action, a)}
							/>
						</div>
					</div>
				</div>
			);
		};

		return (
			<div className="ms-Grid-row">
				<div className="ms-Grid-col ms-sm12">
					<GenericObjectEditor
						customRenderers={{ subactions: subactionsRenderer }}
						defaultValues={{ subactions: [] }}
						object={actionUI.action}
						schema={schema}
						ignoredProperties={[ 'verb' ]}
						onObjectChanged={onActionChanged.bind(this)}
						updateOnBlur={true}
					/>
				</div>
			</div>
		);
	}

	private _moveSubAction(actionKey: string, oldIndex: number, newIndex: number) {
		if (this.props.onSubActionMoved) {
			this.props.onSubActionMoved(actionKey, oldIndex, newIndex);
		}
	}

	private _addScriptSubAction(parentAction: ISiteScriptAction, verb: string) {
		let newSubAction: ISiteScriptAction = {
			verb: verb
		};

		let newSubActions = [].concat(parentAction.subactions, newSubAction);
		let updatedAction = assign({}, parentAction);
		updatedAction.subactions = newSubActions;
		// this._setSingleSubactionExpanded(newSubActions.length - 1);
		this.props.onActionChanged(updatedAction);
	}

	private _removeScriptSubAction(parentAction: ISiteScriptActionUIWrapper, subActionKey: string) {
		let newSubActions = parentAction.subactions
			.filter((subactionUI) => subactionUI.key != subActionKey)
			.map((ui) => ui.action);
		let updatedAction = assign({}, parentAction.action);
		updatedAction.subactions = newSubActions;
		this.props.onActionChanged(updatedAction);
	}

	private _onActionExpandChanged(actionUI: ISiteScriptActionUIWrapper) {
		if (this.props.onExpandChanged) {
			this.props.onExpandChanged(actionUI);
		}
	}

	private _onSubActionUpdated(
		parentAction: ISiteScriptActionUIWrapper,
		subActionKey: string,
		updatedSubAction: ISiteScriptAction
	) {
		let existingSubActionUI = find(parentAction.subactions, (s) => s.key == subActionKey);
		let subAction = assign({}, existingSubActionUI.action, updatedSubAction);

		let updatedParentAction = assign({}, parentAction.action);
		updatedParentAction.subactions = parentAction.subactions.map(
			(sa) => (sa.key == subActionKey ? subAction : sa.action)
		);
		this.props.onActionChanged(updatedParentAction);
	}
}
