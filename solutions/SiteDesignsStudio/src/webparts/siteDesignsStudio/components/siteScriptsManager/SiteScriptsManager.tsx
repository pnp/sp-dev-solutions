import * as React from 'react';
import {
	DocumentCard,
	DocumentCardPreview,
	DocumentCardTitle,
	DocumentCardActions,
	DocumentCardType,
	ImageFit,
	IDocumentCardPreviewProps,
	Panel,
	PanelType,
	PrimaryButton,
	DefaultButton,
	MessageBar,
	MessageBarType,
	IconButton,
	ActionButton,
	DialogFooter
} from 'office-ui-fabric-react';
import styles from '../SiteDesignsStudio.module.scss';
import { ISiteDesignsStudioProps, IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import GenericObjectEditor from '../genericObjectEditor/GenericObjectEditor';
import { ISiteScriptContent, ISiteScript, SiteScriptEntitySchema } from '../../models/ISiteScript';
import { ISiteDesignsService, SiteDesignsServiceKey } from '../../services/siteDesigns/SiteDesignsService';
import { Log } from '@microsoft/sp-core-library';
import { ConfirmDialog, Confirm } from '../confirmBox/ConfirmBox';

export interface ISiteScriptsManagerProps extends IServiceConsumerComponentProps {
	onScriptContentEdit: (siteScript: ISiteScript) => void;
}
export interface ISiteScriptsManagerState {
	siteScripts: ISiteScript[];
	isLoading: boolean;
	hasError: boolean;
	userMessage: string;
}

export default class SiteScriptsManager extends React.Component<ISiteScriptsManagerProps, ISiteScriptsManagerState> {
	private siteDesignsService: ISiteDesignsService;

	constructor(props: ISiteScriptsManagerProps) {
		super(props);

		this.props.serviceScope.whenFinished(() => {
			this.siteDesignsService = this.props.serviceScope.consume<ISiteDesignsService>(SiteDesignsServiceKey);
		});

		this.state = {
			siteScripts: [],
			isLoading: false,
			hasError: false,
			userMessage: null
		};
	}

	public componentWillMount() {
		this._loadSiteScripts();
	}

	private _loadSiteScripts(setLoading: boolean = false): Promise<any> {
		if (setLoading) {
			this.setState({
				isLoading: true
			});
		}
		return this.siteDesignsService
			.getSiteScripts()
			.then((siteScripts) => {
				this.setState({
					siteScripts: siteScripts,
					isLoading: false
				});
			})
			.catch((error) => {
				this.setState({
					siteScripts: null,
					isLoading: false
				});
			});
	}

	public render(): React.ReactElement<ISiteDesignsStudioProps> {
		let { siteScripts, hasError, userMessage } = this.state;
		return (
			<div className={styles.siteDesignsManager}>
				{userMessage && (
					<div className="ms-Grid-row">
						<div className="ms-Grid-col ms-sm12">
							<MessageBar
								messageBarType={hasError ? MessageBarType.error : MessageBarType.success}
								isMultiline={false}
								onDismiss={this._clearError.bind(this)}
							>
								{userMessage}
							</MessageBar>
						</div>
					</div>
				)}
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg2 ms-lgOffset10">
						<ActionButton iconProps={{ iconName: 'Add' }} onClick={() => this._addNewSiteScript()}>
							New
						</ActionButton>
					</div>
				</div>
				<div className="ms-Grid-row">
					{siteScripts.map((sd, ndx) => (
						<div className="ms-Grid-col ms-sm12 ms-md6" key={'SD_' + ndx}>
							<div className={styles.siteDesignItem}>{this._renderSiteScriptItem(sd)}</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	private _addNewSiteScript() {
		this.props.onScriptContentEdit({
			Id: '',
			Title: 'New Site Script',
			Content: null,
			Description: '',
			Version: 1
		});
	}

	private _deleteConfirm(siteScript: ISiteScript) {
		Confirm.show({
      title: `Delete ${siteScript.Title}`,
			message: `Are you sure you want to delete this Site Script '${siteScript.Title}'?`,
			okLabel: 'Yes',
			cancelLabel: 'No'
		})
			.then(() => {
				this._deleteScript(siteScript);
			})
			.catch(() => {
				console.log('Deletion canceled');
			});
	}

	private _clearError() {
		let { hasError } = this.state;
		if (hasError) {
			this.setState({ hasError: false });
		}
	}

	private _renderSiteScriptItem(siteScript: ISiteScript) {
		return (
			<div className={styles.siteScriptItem}>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg10">
						<h2 className={styles.siteScriptItemTitle}>{siteScript.Title}</h2>
					</div>
					<div className="ms-Grid-col ms-sm3 ms-lg1">
						<IconButton
							iconProps={{ iconName: 'PageEdit' }}
							onClick={() => this.props.onScriptContentEdit(siteScript)}
						/>
					</div>
					<div className="ms-Grid-col ms-sm3 ms-lg1">
						<IconButton
							iconProps={{ iconName: 'Delete' }}
							onClick={() => this._deleteConfirm(siteScript)}
						/>
					</div>
				</div>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12">
						<h4>
							Version <strong>{siteScript.Version}</strong>
						</h4>
						<p>{siteScript.Description}</p>
					</div>
				</div>
			</div>
		);
	}

	private _deleteScript(siteScript: ISiteScript) {
		this.setState({ isLoading: true });
		this.siteDesignsService
			.deleteSiteScript(siteScript)
			.then((_) => {
				Log.info(
					'SiteScriptsManager',
					`Site Script '${siteScript.Id}' has been deleted`,
					this.props.serviceScope
				);
				this.setState({
					userMessage: 'The site script has been properly deleted',
					hasError: false
				});
			})
			.then(() => this._loadSiteScripts(true))
			.catch((error) => {
				Log.error(
					`An error occured while trying to delete Site Script '${siteScript.Id}'`,
					error,
					this.props.serviceScope
				);
				this.setState({
					hasError: true,
					userMessage: 'The site script cannot be deleted'
				});
			});
	}
}
