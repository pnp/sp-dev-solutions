import * as React from 'react';
import {
	Dropdown,
	TextField,
	Toggle,
	Icon,
	Breadcrumb,
	PrimaryButton,
	IBreadcrumbItem,
	autobind
} from 'office-ui-fabric-react';
import styles from './SiteDesignsStudio.module.scss';
import { ISiteDesignsStudioProps, IServiceConsumerComponentProps } from './ISiteDesignsStudioProps';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import SiteScriptEditor from './siteScriptEditor/SiteScriptEditor';
import { ISiteScriptContent, ISiteScript } from '../models/ISiteScript';
import SiteDesignsManager from './siteDesignsManager/SiteDesignsManager';
import SiteScriptsManager from './siteScriptsManager/SiteScriptsManager';

export enum ApplicationPage {
	Home,
	DesignsManagement,
	ScriptsManagement,
	ScriptEdition
}

export interface ISiteDesignsStudioState {
	currentPage: ApplicationPage;
	currentPageArgs: any;
}

export default class SiteDesignsStudio extends React.Component<ISiteDesignsStudioProps, ISiteDesignsStudioState> {
	private currentAppPage: ApplicationPage = ApplicationPage.Home;

	constructor(props: ISiteDesignsStudioProps) {
		super(props);
		this.state = {
			currentPage: ApplicationPage.Home,
			currentPageArgs: null
		};
	}

	public render(): React.ReactElement<ISiteDesignsStudioProps> {
		let schema = {
			type: 'object',
			properties: {
				verb: {
					enum: [ 'addSPField' ]
				},
				fieldType: {
					enum: [ 'Text', 'Note', 'Number', 'Boolean', 'User', 'DateTime' ]
				},
				displayName: {
					type: 'string'
				},
				isRequired: {
					type: 'boolean'
				},
				addToDefaultView: {
					type: 'boolean'
				}
			},
			required: [ 'verb', 'fieldType', 'displayName', 'isRequired', 'addToDefaultView' ]
		};
		let { currentPage } = this.state;
		return (
			<div className={styles.siteDesignsStudio}>
				{currentPage != ApplicationPage.Home ? (
					<div>
						<Breadcrumb maxDisplayedItems={2} items={this._getBreadcrumbContent()} />
						<hr />
					</div>
				) : null}
				{this._renderCurrentPage()}
			</div>
		);
	}

	private _renderCurrentPage() {
		let { currentPage, currentPageArgs } = this.state;
		switch (currentPage) {
			case ApplicationPage.DesignsManagement:
				return <SiteDesignsManager serviceScope={this.props.serviceScope} />;
			case ApplicationPage.ScriptsManagement:
				return (
					<SiteScriptsManager
						serviceScope={this.props.serviceScope}
						onScriptContentEdit={(siteScript) => this._onScriptEditRequested(siteScript)}
					/>
				);
			case ApplicationPage.ScriptEdition:
				return (
					<SiteScriptEditor
						script={this.state.currentPageArgs as ISiteScript}
            serviceScope={this.props.serviceScope}
            useWizardActionGenerators={this.props.useWizardActionGenerators}
            useWizardPropertyEditors={this.props.useWizardPropertyEditors}
            onScriptUpdated={script => this._onCurrentSiteScriptUpdated(script) }
					/>
				);
			case ApplicationPage.Home:
			default:
				return (
					<div>
						<div className="ms-Grid-row">
							<div className="ms-Grid-col ms-sm12 ms-lg6">
								<div className="ms-slideRightIn40">
									<div
										className={styles.sectionButton}
										onClick={() => this._goToPage(ApplicationPage.DesignsManagement)}
									>
										<div className={styles.sectionButtonIcon}>
											<Icon iconName="Design" />
										</div>
										<div>Site Designs</div>
									</div>
								</div>
							</div>
							<div className="ms-Grid-col ms-sm12 ms-lg6">
								<div className="ms-slideLeftIn40">
									<div
										className={styles.sectionButton}
										onClick={() => this._goToPage(ApplicationPage.ScriptsManagement)}
									>
										<div className={styles.sectionButtonIcon}>
											<Icon iconName="Script" />
										</div>
										<div>Site Scripts</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
		}
	}

private _onCurrentSiteScriptUpdated(script: ISiteScript) {
  this.setState({
    currentPageArgs: script
  });
}

	private _goToPage(page: ApplicationPage, args: any = null) {
		this.setState({
			currentPage: page,
			currentPageArgs: args
		});
	}

	private _getBreadcrumbContent() {
		let { currentPage, currentPageArgs } = this.state;

		let siteDesignsStudio = {
			text: 'Studio',
			key: ApplicationPage[ApplicationPage.Home],
			onClick: this._onBreadcrumbItemClicked,
			isCurrentItem: currentPage == ApplicationPage.Home
		};

		let siteDesignsMgmt = {
			text: 'Designs',
			key: ApplicationPage[ApplicationPage.DesignsManagement],
			onClick: this._onBreadcrumbItemClicked,
			isCurrentItem: currentPage == ApplicationPage.DesignsManagement
		};

		let scriptsMgmt = {
			text: 'Scripts',
			key: ApplicationPage[ApplicationPage.ScriptsManagement],
			onClick: this._onBreadcrumbItemClicked,
			isCurrentItem: currentPage == ApplicationPage.ScriptsManagement
		};

    let currentSiteScript = currentPageArgs as ISiteScript;
    let scriptEditionTitle = currentSiteScript ? currentSiteScript.Title : null;
		let scriptEdition = {
			text: scriptEditionTitle || 'Edition',
			key: ApplicationPage[ApplicationPage.ScriptEdition],
			isCurrentItem: currentPage == ApplicationPage.ScriptEdition
		};

		switch (currentPage) {
			case ApplicationPage.DesignsManagement:
				return [ siteDesignsStudio, siteDesignsMgmt ];
			case ApplicationPage.ScriptsManagement:
				return [ siteDesignsStudio, scriptsMgmt ];
			case ApplicationPage.ScriptEdition:
				return [ siteDesignsStudio, scriptsMgmt, scriptEdition ];
			case ApplicationPage.Home:
			default:
				return [ siteDesignsStudio ];
		}
	}

	@autobind
	private _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) {
		this._goToPage(ApplicationPage[item.key]);
	}

	private _onScriptEditRequested(siteScript: ISiteScript) {
		this._goToPage(ApplicationPage.ScriptEdition, siteScript);
	}
}
