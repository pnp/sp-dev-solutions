import * as React from 'react';
import styles from './Wizards.module.scss';
import { assign, find } from '@microsoft/sp-lodash-subset';

import { ISiteScriptAction } from '../../models/ISiteScript';
import { IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import {
	ISiteScriptSchemaService,
	SiteScriptSchemaServiceKey
} from '../../services/siteScriptSchema/SiteScriptSchemaService';
import { ISiteDesignsService, SiteDesignsServiceKey } from '../../services/siteDesigns/SiteDesignsService';
import ScriptActionWizard, { IScriptActionWizardState, IScriptActionWizardProps } from './ScriptActionWizard';
import { Dropdown, IDropdownOption, Label, autobind, TextField, Spinner, SpinnerType, Checkbox } from 'office-ui-fabric-react';
import { IListsService, ListsServiceKey } from '../../services/lists/ListsService';
import { IList, IField, IContentType } from '../../models/IList';
import { CreateListSubActions } from '../../schema/siteActionConstants';

export interface ICreateListWizardState extends IScriptActionWizardState {
	availableLists: IList[];
	selectedList: IList;
	selectedListFields: IField[];
	selectedListContentTypes: IContentType[];
	isLoadingListDetails: boolean;
}

export interface ICreateListWizardProps extends IScriptActionWizardProps {}

interface ICreateListScriptAction extends ISiteScriptAction {
	listName: string;
	templateType: number;
	subactions: ISiteScriptAction[];
}


export default class CreateListWizard extends ScriptActionWizard<ICreateListWizardProps, ICreateListWizardState> {
	private siteScriptSchemaService: ISiteScriptSchemaService;
	private siteDesignsService: ISiteDesignsService;
	private listsService: IListsService;

	constructor(props: ICreateListWizardProps) {
		super(props);

		this.props.serviceScope.whenFinished(() => {
			this.siteScriptSchemaService = this.props.serviceScope.consume(SiteScriptSchemaServiceKey);
			this.siteDesignsService = this.props.serviceScope.consume(SiteDesignsServiceKey);
			this.listsService = this.props.serviceScope.consume(ListsServiceKey);
		});

		super.initState();
		this.state = assign(this.state, {
			availableLists: [],
			selectedList: null,
			selectedListFields: [],
			selectedListContentTypes: [],
			isLoading: true,
			isLoadingListDetails: false
		});
	}

	public componentWillMount() {
		this.listsService.getLists().then((lists) => {
			this.setState({
				availableLists: lists,
				isLoading: false
			} as any);
		});
	}

	private _getAvailableListsOptions(): IDropdownOption[] {
		let { availableLists } = this.state as ICreateListWizardState;

		return availableLists && availableLists.map((l) => ({ key: l.Id, text: l.Title }));
	}

	private _loadListDetails(list: IList) {
		this.setState({ isLoadingListDetails: true } as any);
		let selectedListFields: IField[] = null;
		let selectedListContentTypes: IContentType[] = null;
		this.listsService
			.getListFields(list.Id)
			.then((fields) => (selectedListFields = fields))
			.then(() => this.listsService.getListContentTypes(list.Id))
			.then((contentTypes) => (selectedListContentTypes = contentTypes))
			.then(() => {
				this.setState({
					isLoadingListDetails: false,
					selectedList: list,
					selectedListFields,
					selectedListContentTypes
				} as any);
			})
			.catch((error) => {
				console.log('Error while loading list details: ', error);
				this.setState({ isLoadingListDetails: false } as any);
			});
	}

	@autobind
	private _onListSelected(selected: IDropdownOption) {
		let { availableLists } = this.state as ICreateListWizardState;
		let selectedList = find(availableLists, (l) => l.Id == selected.key);
		if (selectedList) {
			this._loadListDetails(selectedList);
		}
  }

  private _onFieldToggle(fieldName: string) {

  }

  private _onContentTypeToggle(contentTypeName: string) {

  }

	protected get displayOkButton(): boolean {
		let { selectedList, selectedListFields } = this.state as ICreateListWizardState;
		return (selectedList || false) && true;
	}

	protected generateActionAsync(): Promise<ISiteScriptAction> {
		let { selectedList, selectedListFields, selectedListContentTypes } = this.state as ICreateListWizardState;

		return new Promise<ISiteScriptAction>((resolve, reject) => {
			// Create a new "Create a List" action with basic parameters
			let action: ICreateListScriptAction = {
				verb: this.props.actionVerb,
				listName: selectedList.Title,
				templateType: selectedList.BaseTemplate,
				subactions: []
			};

			// Set the title
			action.subactions.push({ verb: CreateListSubActions.setTitle, title: selectedList.Title } as any);

			// Set the description
			action.subactions.push({ verb: CreateListSubActions.setDescription, description: selectedList.Description } as any);

			// If List fields are known
			if (selectedListFields && selectedListFields.length) {
				let builtinFields = this.listsService.getBuiltinFields();
				// For each field of the list
				selectedListFields.forEach((field) => {
					// If the current field is not a built-in one
					if (builtinFields.indexOf(field.InternalName) < 0) {
						// // Add the field
						// action.subactions.push({
						// 	verb: CreateListSubActions.addSPField,
						// 	fieldType: field.Type,
						// 	displayName: field.Title,
						// 	isRequired: field.Required,
						// 	addToDefaultView: true
            // } as any);

            	// Add the field
						action.subactions.push({
							verb: CreateListSubActions.addSPFieldXml,
              schemaXml: field.Xml
						} as any);
					}

					// set the custom formatter if any
					if (field.CustomFormatter) {
						action.subactions.push({
							verb: CreateListSubActions.setSPFieldCustomFormatter,
							fieldDisplayName: field.Title,
							formatterJSON: JSON.parse(field.CustomFormatter)
						} as any);
					}
				});

				// TODO For each built-in fields, check if present, if not add a deleteSPField action
			}

			// If List content types are known
			if (selectedListContentTypes && selectedListContentTypes.length) {
				let builtinContentTypes = selectedList.IsLibrary
					? this.listsService.getLibraryBuiltinContentTypes()
					: this.listsService.getListBuiltinContentTypes();
				// For each content type
				selectedListContentTypes.forEach((ct) => {
					// If current content type is not a built-in one
					if (builtinContentTypes.indexOf(ct.Name) < 0) {
						// Add the content type
						action.subactions.push({
							verb: CreateListSubActions.addContentType,
							name: ct.Name
						} as any);
					}
				});

				// Check if builtin Content Types are not present
				builtinContentTypes.forEach((ctName) => {
					let builtinContentType = find(selectedListContentTypes, (lct) => lct.Name == ctName);
					if (!builtinContentType) {
						// Remove the content type
						action.subactions.push({
							verb: CreateListSubActions.removeContentType,
							name: ctName
						} as any);
					}
				});
			}

			try {
				resolve(action);
			} catch (error) {
				reject(error);
			}
		});
	}

	protected renderSpecificWizard(): JSX.Element {
		let { selectedList, selectedListFields, isLoading, isLoadingListDetails, selectedListContentTypes } = this
			.state as ICreateListWizardState;

// Note : snippet to add when Content Types and fields handling will be improved
// ,
// 					selectedListFields && (
// 						<div className="ms-Grid-row">
// 							<div className="ms-Grid-col ms-sm6">
// 								<h3>Fields ({selectedListFields.length || 0})</h3>
// 								<div className={styles.fieldsList}>
// 									<table>
// 										{selectedListFields &&
// 											selectedListFields.map((f) => (
// 												<tr>
//                           <td><Checkbox onClick={() => this._onFieldToggle(f.InternalName)} /></td>
// 													<td><span title={f.InternalName}>{f.Title}</span></td>
// 												</tr>
// 											))}
// 									</table>
// 								</div>
// 							</div>
// 							<div className="ms-Grid-col ms-sm6">
// 								<h3>Content Types ({selectedListFields.length || 0})</h3>
// 								<div className={styles.contentTypesList}>
// 									<table>
// 										{selectedListContentTypes &&
// 											selectedListContentTypes.map((ct) => (
// 												<tr>
//                            <td><Checkbox onClick={() => this._onFieldToggle(ct.Name)} /></td>
// 													<td>{ct.Name}</td>
// 												</tr>
// 											))}
// 									</table>
// 								</div>
// 							</div>
// 						</div>
// 					)


		let content = (
			<div>
				<div className="ms-Grid-row">
					<div className="ms-Grid-col ms-sm12">
						<Dropdown
							label="Select a list from this site"
							options={this._getAvailableListsOptions()}
							onChanged={this._onListSelected}
						/>
						{isLoadingListDetails && <Spinner type={SpinnerType.normal} label="Loading..." />}
					</div>
				</div>
				{!isLoadingListDetails &&
				selectedList && [
					<div className="ms-Grid-row">
						<div className="ms-Grid-col ms-sm12">
							<TextField
								label="Description"
								multiline={true}
								rows={5}
								readOnly={true}
								value={selectedList.Description}
							/>
						</div>
					</div>
				]}
			</div>
		);

		return (
			<div>
				<hr />
				{isLoading ? <Spinner type={SpinnerType.large} label="Loading..." /> : content}
			</div>
		);
	}
}
