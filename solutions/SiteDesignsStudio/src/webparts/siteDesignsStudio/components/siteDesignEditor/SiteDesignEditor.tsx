import * as React from 'react';
import {
	Dropdown,
	TextField,
	Toggle,
	Link,
	IconButton,
	DocumentCard,
	DocumentCardPreview,
	IDocumentCardPreviewProps,
	ImageFit,
	PrimaryButton,
	IDropdownOption,
	ActionButton,
	Spinner,
	SpinnerSize
} from 'office-ui-fabric-react';
import styles from './SiteDesignEditor.module.scss';
import { escape, assign } from '@microsoft/sp-lodash-subset';
import * as strings from 'SiteDesignsStudioWebPartStrings';
import GenericObjectEditor from '../genericObjectEditor/GenericObjectEditor';

import { ISiteScriptAction, ISiteScript } from '../../models/ISiteScript';
import ScriptActionAdder from '../scriptActionAdder/ScriptActionAdder';
import { IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import {
	ISiteScriptSchemaService,
	SiteScriptSchemaServiceKey
} from '../../services/siteScriptSchema/SiteScriptSchemaService';
import { ISiteDesignsService, SiteDesignsServiceKey } from '../../services/siteDesigns/SiteDesignsService';
import { ISiteDesign, WebTemplate } from '../../models/ISiteDesign';

export interface ISiteDesignEditorState {
	isEditingPreview: boolean;
	availableSiteScripts: ISiteScript[];
	scriptToAdd: string;
	isLoading: boolean;
}

export interface ISiteDesignEditorProps extends IServiceConsumerComponentProps {
	siteDesign: ISiteDesign;
	onSiteDesignChanged?: (siteDesign: ISiteDesign) => void;
}

export default class SiteDesignEditor extends React.Component<ISiteDesignEditorProps, ISiteDesignEditorState> {
	private siteDesignsService: ISiteDesignsService;

	constructor(props: ISiteDesignEditorProps) {
		super(props);

		this.props.serviceScope.whenFinished(() => {
			this.siteDesignsService = this.props.serviceScope.consume(SiteDesignsServiceKey);
		});

		this.state = {
			isEditingPreview: false,
			availableSiteScripts: [],
			scriptToAdd: '',
			isLoading: true
		};
	}

	// public componentWillReceiveProps(nextProps: IScriptActionEditorProps) {
	// 	this._setAllSubactionsExpanded(nextProps.isExpanded);
	// }

	public componentWillMount() {
		this._loadAvailableSiteScripts();
	}

	private _loadAvailableSiteScripts() {
		this.siteDesignsService.getSiteScripts().then((scripts) => {
			this.setState({
				availableSiteScripts: scripts,
				isLoading: false
			});
		});
	}

	private _translateLabel(value: string): string {
		const key = 'LABEL_' + value;
		return strings[key] || value;
	}

	public render(): React.ReactElement<ISiteDesignEditorProps> {
		let { siteDesign } = this.props;
		let { isEditingPreview, isLoading } = this.state;

		let previewProps: IDocumentCardPreviewProps = {
			previewImages: [
				{
					name: siteDesign.PreviewImageAltText,
					url: siteDesign.PreviewImageUrl,
					previewImageSrc: siteDesign.PreviewImageUrl,
					imageFit: ImageFit.cover,
					width: 280,
					height: 173
				}
			]
		};

		if (isLoading) {
			return (
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm6 ms-smOffset3">
						<Spinner size={SpinnerSize.large} label="Loading..." />
					</div>
				</div>
			);
		}

		return (
			<div className={styles.siteDesignEditor}>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg6">
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-sm12">
								{isEditingPreview ? (
									<div className={styles.imagePreview}>
										<h3>Preview Image</h3>
										<div className="ms-Grid-row">
											<div className="ms-Grid-col ms-sm12">
												<TextField
													label="Url"
													value={siteDesign.PreviewImageUrl}
													onChanged={(v) => this._onPropertyChanged('PreviewImageUrl', v)}
												/>
											</div>
										</div>{' '}
										<div className="ms-Grid-row">
											<div className="ms-Grid-col ms-sm12">
												<TextField
													label="Alternative Text"
													value={siteDesign.PreviewImageAltText}
													onChanged={(v) => this._onPropertyChanged('PreviewImageAltText', v)}
												/>
											</div>
										</div>
										<div className="ms-Grid-row">
											<div className="ms-Grid-col ms-smPush6 ms-sm4">
												<div className={styles.imagePreviewButton}>
													<PrimaryButton
														text="Ok"
														onClick={() => this._toggleImagePreviewEdition()}
													/>
												</div>
											</div>
										</div>
									</div>
								) : (
									<div onClick={() => this._toggleImagePreviewEdition()}>
										{siteDesign.PreviewImageUrl ? (
											<DocumentCard>
												<DocumentCardPreview {...previewProps} />
											</DocumentCard>
										) : (
											<div className={styles.imagePreview + " " + styles.imagePreviewUpdateLink}>Click here to modify preview</div>
										)}
									</div>
								)}
							</div>
						</div>
						{siteDesign.Id && (
							<div className="ms-Grid-row">
								<div className="ms-Grid-col ms-sm12">
									<TextField readOnly={true} disabled={true} label="Id" value={siteDesign.Id} />
								</div>
							</div>
						)}
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-sm12">
								<TextField
									label="Title"
									value={siteDesign.Title}
									onChanged={(v) => this._onPropertyChanged('Title', v)}
								/>
							</div>
						</div>
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-sm12">
								<TextField
									label="Description"
									value={siteDesign.Description}
									multiline={true}
									rows={6}
									onChanged={(v) => this._onPropertyChanged('Description', v)}
								/>
							</div>
						</div>
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-sm12">
								<TextField
									label="Version"
									value={siteDesign.Version.toString()}
									onChanged={(v) => this._onPropertyChanged('Version', v)}
								/>
							</div>
						</div>
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-sm12">
								<Dropdown
									label="Site Template"
									options={[
										{ key: WebTemplate.TeamSite.toString(), text: 'Team Site' },
										{ key: WebTemplate.CommunicationSite.toString(), text: 'Communication Site' }
									]}
									selectedKey={siteDesign.WebTemplate}
									onChanged={(v) => this._onPropertyChanged('WebTemplate', v.key)}
								/>
							</div>
						</div>
					</div>
					<div className="ms-Grid-col ms-sm12 ms-lg6">
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-sm12">{this._renderSiteScripts()}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	private _renderSiteScripts() {
		let { siteDesign } = this.props;
		let { availableSiteScripts, scriptToAdd } = this.state;

		if (!availableSiteScripts || availableSiteScripts.length == 0) {
			return <div>No available Site Scripts...</div>;
		}

		let availableScriptsToAdd = this._hasAvailableScriptsToAdd();

		return (
			<div>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm10">
						<Dropdown
							options={this._getAvailableScriptsToAddDropdownOptions()}
							onChanged={(v) => this._setScriptToAdd(v.key.toString())}
							selectedKey={scriptToAdd || null}
							disabled={!availableScriptsToAdd}
							label="Available scripts"
						/>
					</div>
					<div className="ms-Grid-col ms-sm2">
						<div className={styles.addScriptButton}>
							<ActionButton
								iconProps={{ iconName: 'Add' }}
								text="Add"
								disabled={!availableScriptsToAdd}
								onClick={() => this._addSiteScript(scriptToAdd)}
							/>
						</div>
					</div>
				</div>

				<div className={styles.siteScripts}>
					{siteDesign.SiteScriptIds.map((scriptId) => this._getSiteScript(scriptId)).map(
						(script: ISiteScript, index: number) =>
							script ? (
								<div className={styles.siteScript}>
									<h3>{script.Title}</h3>
									<h4>{script.Description}</h4>
									<IconButton
										iconProps={{ iconName: 'Up' }}
										onClick={() => this._moveSiteScriptUp(index)}
										disabled={!this._canMoveSiteScriptUp(index)}
									/>
									<IconButton
										iconProps={{ iconName: 'Down' }}
										onClick={() => this._moveSiteScriptDOwn(index)}
										disabled={!this._canMoveSiteScriptDown(index)}
									/>
									<IconButton
										iconProps={{ iconName: 'Delete' }}
										onClick={() => this._removeSiteScript(script.Id)}
									/>
								</div>
							) : null
					)}
				</div>
			</div>
		);
	}

	private _getSiteScript(siteScriptId: string): ISiteScript {
		let { availableSiteScripts } = this.state;
		if (!availableSiteScripts || availableSiteScripts.length == 0) {
			console.log('Site Script is not found');
			return null;
		}

		let foundItems = availableSiteScripts.filter((s) => s.Id == siteScriptId);
		let result = foundItems.length == 1 ? foundItems[0] : null;
		console.log('Site Script =', result);
		return result;
	}

	private _getAvailableScriptsToAddDropdownOptions(): IDropdownOption[] {
		let { availableSiteScripts } = this.state;
		let { siteDesign } = this.props;
		return availableSiteScripts
			.map((s) => ({ key: s.Id, text: s.Title }))
			.filter((s) => siteDesign.SiteScriptIds.indexOf(s.key) < 0);
	}

	private _hasAvailableScriptsToAdd(): boolean {
		let { availableSiteScripts } = this.state;
		let { siteDesign } = this.props;
		return availableSiteScripts.filter((s) => siteDesign.SiteScriptIds.indexOf(s.Id) < 0).length > 0;
	}

	private _setScriptToAdd(scriptId: string) {
		this.setState({
			scriptToAdd: scriptId
		});
	}

	private _addSiteScript(scriptId: string) {
		let currentScripts = this.props.siteDesign.SiteScriptIds;
		if (currentScripts.indexOf(scriptId) >= 0) {
			return;
		}
		let newScripts = [].concat(currentScripts, scriptId);
		this.setState({
			scriptToAdd: ''
		});
		this._onPropertyChanged('SiteScriptIds', newScripts);
	}

	private _removeSiteScript(scriptId: string) {
		let currentScripts = this.props.siteDesign.SiteScriptIds;
		let newScripts = currentScripts.filter((s) => s != scriptId);
		this._onPropertyChanged('SiteScriptIds', newScripts);
	}

	private _swapSiteScript(oldIndex: number, newIndex: number) {
		let { siteDesign } = this.props;
		if (newIndex < 0 || newIndex > siteDesign.SiteScriptIds.length - 1) {
			return;
		}

		let newSiteScriptIds = [].concat(siteDesign.SiteScriptIds);

		let old = newSiteScriptIds[oldIndex];
		newSiteScriptIds[oldIndex] = newSiteScriptIds[newIndex];
		newSiteScriptIds[newIndex] = old;
		this._onPropertyChanged('SiteScriptIds', newSiteScriptIds);
	}

	private _moveSiteScriptUp(index: number) {
		this._swapSiteScript(index, index - 1);
	}

	private _canMoveSiteScriptUp(index: number): boolean {
		return index > 0;
	}

	private _moveSiteScriptDOwn(index: number) {
		this._swapSiteScript(index, index + 1);
	}

	private _canMoveSiteScriptDown(index: number): boolean {
		return index < this.props.siteDesign.SiteScriptIds.length - 1;
	}

	private _toggleImagePreviewEdition() {
		let { isEditingPreview } = this.state;
		this.setState({
			isEditingPreview: !isEditingPreview
		});
	}
	private _onPropertyChanged(propertyName: string, value: any) {
		let { siteDesign, onSiteDesignChanged } = this.props;
		if (!onSiteDesignChanged) {
			return;
		}

		let changed = assign({}, siteDesign);

		// Transform value if needed
		if (propertyName == 'Version') {
			try {
				value = parseFloat(value);
			} catch (error) {}
		}

		changed[propertyName] = value;
		onSiteDesignChanged(changed);
	}
}
