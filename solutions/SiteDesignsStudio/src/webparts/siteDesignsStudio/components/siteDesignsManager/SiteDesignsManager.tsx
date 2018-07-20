import * as React from 'react';
import {
	DocumentCard,
	DocumentCardPreview,
	DocumentCardTitle,
	ImageFit,
	IDocumentCardPreviewProps,
	DocumentCardActions,
	Panel,
	PanelType,
	DefaultButton,
	PrimaryButton,
	MessageBar,
	MessageBarType,
	DialogFooter,
	ActionButton
} from 'office-ui-fabric-react';
import styles from '../SiteDesignsStudio.module.scss';
import { ISiteDesignsStudioProps, IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import GenericObjectEditor from '../genericObjectEditor/GenericObjectEditor';
import { ISiteScriptContent } from '../../models/ISiteScript';
import { ISiteDesignsService, SiteDesignsServiceKey } from '../../services/siteDesigns/SiteDesignsService';
import { ISiteDesign, SiteDesignEntitySchema, WebTemplate } from '../../models/ISiteDesign';
import SiteDesignEditor from '../siteDesignEditor/SiteDesignEditor';
import { ConfirmDialog, Confirm } from '../confirmBox/ConfirmBox';
import { Dialog } from '@microsoft/sp-dialog';

export interface ISiteDesignsManagerProps extends IServiceConsumerComponentProps {}
export interface ISiteDesignsManagerState {
	siteDesigns: ISiteDesign[];
	isEditing: boolean;
	siteDesignEdition: ISiteDesign;
	isLoading: boolean;
	hasError: boolean;
	userMessage: string;
}

export default class SiteDesignsManager extends React.Component<ISiteDesignsManagerProps, ISiteDesignsManagerState> {
	private siteDesignsService: ISiteDesignsService;

	constructor(props: ISiteDesignsManagerProps) {
		super(props);

		this.props.serviceScope.whenFinished(() => {
			this.siteDesignsService = this.props.serviceScope.consume<ISiteDesignsService>(SiteDesignsServiceKey);
		});

		this.state = {
			siteDesigns: [],
			isEditing: false,
			siteDesignEdition: null,
			isLoading: true,
			hasError: false,
			userMessage: null
		};
	}

	public componentWillMount() {
		this._loadSiteDesigns().then((siteDesigns) => {
			this.setState({
				siteDesigns: siteDesigns,
				isLoading: false
			});
		});
	}

	private _loadSiteDesigns(): Promise<ISiteDesign[]> {
		return this.siteDesignsService.getSiteDesigns();
	}

	public render(): React.ReactElement<ISiteDesignsStudioProps> {
		let { siteDesigns, isEditing, userMessage, hasError } = this.state;
		return (
			<div className={styles.siteDesignsManager}>
				{userMessage ? (
					<MessageBar messageBarType={hasError ? MessageBarType.error : MessageBarType.success}>
						{userMessage}
					</MessageBar>
				) : null}
				{isEditing ? this._renderSiteDesignEditor() : null}
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12 ms-lg2 ms-lgOffset10">
						<ActionButton iconProps={{ iconName: 'Add' }} onClick={() => this._addNewSiteDesign()}>
							New
						</ActionButton>
					</div>
				</div>
				<div className="ms-Grid-row">
					{siteDesigns.map((sd) => (
						<div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
							<div className={styles.siteDesignItem}>{this._renderSiteDesign(sd)}</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	private _renderSiteDesign(siteDesign: ISiteDesign) {
		let previewProps: IDocumentCardPreviewProps = {
			previewImages: [
				{
					name: siteDesign.PreviewImageAltText,
					url: siteDesign.PreviewImageUrl,
					previewImageSrc: siteDesign.PreviewImageUrl,
					imageFit: ImageFit.cover,
					width: 318,
					height: 196
				}
			]
		};

		return (
			<DocumentCard>
				<DocumentCardPreview {...previewProps} />
				<DocumentCardTitle title={siteDesign.Title} shouldTruncate={true} />
				<DocumentCardActions
					actions={[
						{
							iconProps: { iconName: 'Edit' },
							onClick: (ev: any) => {
								this._editSiteDesign(siteDesign);
								ev.preventDefault();
								ev.stopPropagation();
							},
							ariaLabel: 'Edit design'
						},
						{
							iconProps: { iconName: 'Delete' },
							onClick: (ev: any) => {
								this._removeSiteDesign(siteDesign);
								ev.preventDefault();
								ev.stopPropagation();
							},
							ariaLabel: 'Delete Design'
						}
					]}
				/>
			</DocumentCard>
		);
	}

	private _renderSiteDesignEditor() {
		let { siteDesignEdition } = this.state;

		const onObjectChanged = (o) => {
			this.setState({
				siteDesignEdition: assign({}, siteDesignEdition, o)
			});
		};

		return (
			<Panel
				isOpen={true}
				type={PanelType.medium}
				headerText="Edit Site Design"
				onDismiss={() => this._cancelSiteDesignEdition()}
			>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12">
						<SiteDesignEditor
							serviceScope={this.props.serviceScope}
							siteDesign={siteDesignEdition}
							onSiteDesignChanged={onObjectChanged}
						/>
					</div>
				</div>
				<DialogFooter>
					<PrimaryButton text="Save" onClick={() => this._saveSiteDesign(siteDesignEdition)} />
					<DefaultButton text="Cancel" onClick={() => this._cancelSiteDesignEdition()} />
				</DialogFooter>
			</Panel>
		);
	}

	private _addNewSiteDesign() {
		this.setState({
			isEditing: true,
			siteDesignEdition: {
				Id: '',
				Title: 'New Site Design',
				WebTemplate: WebTemplate.TeamSite.toString(),
				SiteScriptIds: [],
				Description: '',
				PreviewImageUrl: '',
				PreviewImageAltText: '',
				IsDefault: false,
				Version: 1
			}
		});
	}

	private _editSiteDesign(siteDesign: ISiteDesign) {
		this.setState({
			isEditing: true,
			siteDesignEdition: assign({}, siteDesign)
		});
	}

	private _cancelSiteDesignEdition() {
		this.setState({
			isEditing: false,
			siteDesignEdition: null
		});
	}

	private _saveSiteDesign(siteDesign: ISiteDesign) {
		this.setState({
			isLoading: true
		});
		this.siteDesignsService
			.saveSiteDesign(siteDesign)
			.then(() => this._loadSiteDesigns())
			.then((siteDesigns) => {
				this.setState({
					hasError: false,
					siteDesigns: siteDesigns,
					isLoading: false,
					isEditing: false,
					siteDesignEdition: null,
					userMessage: 'The Site Design has been properly saved'
				});
			})
			.catch((error) => {
				this.setState({
					hasError: true,
					userMessage: 'The Site Design cannot be saved',
					isLoading: false,
					isEditing: false,
					siteDesignEdition: null
				});
			});
	}

	private _removeSiteDesign(siteDesign: ISiteDesign) {
		Confirm.show({
      title: `Delete ${siteDesign.Title}`,
			message: `Are you sure you want to delete '${siteDesign.Title}'`,
			okLabel: 'Yes',
			cancelLabel: 'No'
		})
			.then(() => {
				this.siteDesignsService
					.deleteSiteDesign(siteDesign)
					.then(() => {
						return this._loadSiteDesigns();
					})
					.then((siteDesigns) => {
						this.setState({
							siteDesigns: siteDesigns,
							isLoading: false,
							isEditing: false,
							siteDesignEdition: null,
							userMessage: 'The Site Design has been properly deleted'
						});
					})
					.catch((error) => {
						console.error(error);
						this.setState({
							hasError: true,
							userMessage: 'The Site Design cannot be deleted',
							isLoading: false,
							isEditing: false,
							siteDesignEdition: null
						});
					});
			})
			.catch(() => {
				console.debug('Deletion is canceled');
			});
	}
}
