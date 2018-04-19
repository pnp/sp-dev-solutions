import * as React from 'react';
import styles from './ScriptActionEditor.module.scss';
import { assign, find } from '@microsoft/sp-lodash-subset';
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
import ThemeInputField from '../wizards/inputFields/ThemeInputField';
import HubSiteInputField from '../wizards/inputFields/HubSiteInputField';
import ListTemplateInputField from '../wizards/inputFields/ListTemplateInputField';
import AppsInputField from '../wizards/inputFields/AppsInputField';
import { SiteActions } from '../../schema/siteActionConstants';

export interface IScriptActionEditorState {}

export interface IScriptActionEditorProps extends IServiceConsumerComponentProps {
	actionUI: ISiteScriptActionUIWrapper;
	schema: any;
	onActionChanged?: (action: ISiteScriptAction) => void;
	onSubActionMoved?: (actionKey: string, oldIndex: number, newIndex: number) => void;
	onExpandChanged?: (actionUI: ISiteScriptActionUIWrapper) => void;
	useWizardPropertyEditors: boolean;
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

	private _getLabelFromActionProperty(actionDefinition: any, propertyName: string): string {
		let propertyMetadata = actionDefinition.properties[propertyName];
		return (propertyMetadata && propertyMetadata.title) || propertyName;
	}

	private _getDescriptionFromActionProperty(actionDefinition: any, propertyName: string): string {
		let propertyMetadata = actionDefinition.properties[propertyName];
		if (!propertyMetadata) {
			return '';
		}

		return propertyMetadata.description || propertyName;
	}

	private _getCurrentActionName(): string {
		let { schema } = this.props;
		return this._getVerbFromActionSchema(schema);
	}

	private _onSubActionAdded(parentAction: ISiteScriptAction, subAction: ISiteScriptAction) {
		let subactions = parentAction['subactions'] as ISiteScriptAction[];
		parentAction['subactions'] = [].concat(subactions);
		this.props.onActionChanged(parentAction);
	}

	private _getCustomRenderers() {
		let { actionUI, serviceScope, schema, onActionChanged } = this.props;

		const subactionsRenderer = (subactions: ISiteScriptActionUIWrapper[]) => {
			if (!actionUI.subactions) {
				actionUI.subactions = [];
			}
			return (
				<div className={styles.subactions}>
					<h3>{this._getLabelFromActionProperty(schema, 'subactions')}</h3>
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
								useWizardPropertyEditors={this.props.useWizardPropertyEditors}
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

		let customRenderers = {
			subactions: subactionsRenderer
		};

		if (this.props.useWizardPropertyEditors) {
			let wizardEditors = {
				themeName: (value) => (
					<ThemeInputField
						serviceScope={serviceScope}
						label={this._getLabelFromActionProperty(schema, 'themeName')}
						value={value}
						onValueChanged={(v) => this._onActionPropertyChanged('themeName', v)}
					/>
				),
				hubSiteId: (value) => (
					<HubSiteInputField
						serviceScope={serviceScope}
						label={this._getLabelFromActionProperty(schema, 'hubSiteId')}
						value={value}
						onValueChanged={(v) => this._onActionPropertyChanged('hubSiteId', v)}
					/>
				),
				templateType: (value) => (
					<ListTemplateInputField
						serviceScope={serviceScope}
						label={this._getLabelFromActionProperty(schema, 'templateType')}
						value={value}
						onValueChanged={(v) => this._onActionPropertyChanged('templateType', v)}
					/>
				)
			};

			if (actionUI.action.verb == SiteActions.installSPFXSolution) {
				wizardEditors['id'] = (value) => (
					<AppsInputField
						serviceScope={serviceScope}
						label={this._getLabelFromActionProperty(schema, 'id')}
						value={value}
						onValueChanged={(v) => this._onActionPropertyChanged('id', v)}
					/>
				);
			}

			customRenderers = assign(customRenderers, wizardEditors);
		}

		return customRenderers;
	}

	public render(): React.ReactElement<IScriptActionEditorProps> {
		let { actionUI, serviceScope, schema, onActionChanged } = this.props;

		return (
			<div className="ms-Grid-row">
				<div className="ms-Grid-col ms-sm12">
					<GenericObjectEditor
						customRenderers={this._getCustomRenderers()}
						defaultValues={{ subactions: [] }}
						object={actionUI.action}
						schema={schema}
						ignoredProperties={[ 'verb' ]}
						onObjectChanged={onActionChanged.bind(this)}
						updateOnBlur={true}
						fieldLabelGetter={(f) => this._getLabelFromActionProperty(schema, f)}
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

	private _onActionPropertyChanged(propertyName: string, value: any) {
		let { actionUI, onActionChanged } = this.props;
		if (onActionChanged) {
			let updatedAction = assign({}, actionUI.action);
			updatedAction[propertyName] = value;
			onActionChanged(updatedAction);
		}
	}
}
