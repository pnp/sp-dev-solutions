import { IField, IContentType } from './../../models/IList';
import { IHubSite } from './../../models/IHubSite';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { IList } from '../../models/IList';

export interface IListsService {
	baseUrl: string;
	getLists(): Promise<IList[]>;
	getListFields(listId: string): Promise<IField[]>;
	getBuiltinFields(): string[];
	getListContentTypes(listId: string): Promise<IContentType[]>;
	getListBuiltinContentTypes(): string[];
	getLibraryBuiltinContentTypes(): string[];
}

const BuiltinFields = [
	'Author',
	'Editor',
	'Created',
	'Modified',
	'ID',
	'fAllDayEvent',
	'AppAuthor',
	'AppEditor',
	'AppName',
	'Attachments',
	'ParticipantsPicker',
	'Attributes',
	'CanvasContent1',
	'Authors',
	'BannerImageUrl',
	'BannerUrl',
	'Category',
	'Overbook',
	'_CheckinComment',
	'CheckoutUser',
	'_CommentCount',
	'ComplianceAssetId',
	'Content',
	'ContentType',
	'ContentData',
	'_CopySource',
	'DefinitionId',
	'Description',
	'Edit',
	'eMailSubscribers',
	'eMailUnsubscribed',
	'EndDate',
	'FileSizeDisplay',
	'FirstPublishedDate',
	'FolderChildCount',
	'FormCategory',
	'FormDescription',
	'FormId',
	'FormLocale',
	'FormName',
	'LinkTemplateName',
	'FormVersion',
	'FreeBusy',
	'Geolocation',
	'HashTags',
	'ItemChildCount',
	'_IsRecord',
	'_ComplianceTagWrittenTime',
	'_ComplianceTagUserId',
	'_ComplianceFlags',
	'_ComplianceTag',
	'_LikeCount',
	'Location',
	'MediaLinkDescription',
	'MediaActionClickKind',
	'MediaActionClickUrl',
	'MediaActionHeight',
	'MediaActionWidth',
	'MediaHeight',
	'MediaLength',
	'MediaLinkContentURI',
	'MediaLinkType',
	'MediaLinkUISnippet',
	'MediaLinkURI',
	'MediaPreviewHeight',
	'MediaPreviewWidth',
	'MediaWidth',
	'MicroBlogType',
	'FileLeafRef',
	'LinkFilenameNoMenu',
	'LinkFilename',
	'LikesCount',
	'OriginalSourceUrl',
	'LayoutWebpartsContent',
	'PeopleCount',
	'PeopleList',
	'PostAuthor',
	'PostSource',
	'PostSourceUri',
	'ProductId',
	'PromotedState',
	'fRecurrence',
	'ReferenceID',
	'RefReply',
	'RefRoot',
	'RemoteLocation',
	'ReplyCount',
	'Facilities',
	'RootPostOwnerID',
	'RootPostUniqueID',
	'RootPostID',
	'SearchContent',
	'ShowInCatalog',
	'ParentLeafName',
	'ParentVersionString',
	'EventDate',
	'Title',
	'LinkTitleNoMenu',
	'LinkTitle',
	'DocIcon',
	'_UIVersionString',
	'AppVersion',
	'WikiField'
];

const BuiltinLibraryContentTypes = [ 'Document', 'Folder' ];

const BuiltinListContentTypes = [ 'Item', 'Folder' ];

export class ListsService implements IListsService {
	private spHttpClient: SPHttpClient;

	constructor(serviceScope: ServiceScope) {
		this.spHttpClient = new SPHttpClient(serviceScope);
	}

	public baseUrl: string = '/';

	private _getEffectiveUrl(relativeUrl: string): string {
		return (this.baseUrl + '//' + relativeUrl).replace(/\/{2,}/, '/');
	}

	private _restRequest(url: string): Promise<any> {
		const restUrl = this._getEffectiveUrl(url);
		const options: ISPHttpClientOptions = {
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				ACCEPT: 'application/json',
				'ODATA-VERSION': '4.0'
			}
		};
		return this.spHttpClient.get(restUrl, SPHttpClient.configurations.v1, options).then((response) => {
			if (response.status == 204) {
				return {};
			} else {
				return response.json();
			}
		});
	}

	private _getFieldTypeOrDefault(fieldType: string): string {
		switch (fieldType) {
			case 'Text':
			case 'Note':
			case 'Number':
			case 'Boolean':
			case 'User':
			case 'DateTime':
				return fieldType;
			default:
				return 'Text';
		}
	}

	public getLists(): Promise<IList[]> {
		return this._restRequest(
			`_api/web/lists?$select=Id,Title,Description,Fields,BaseTemplate,BaseType&$expand=Fields&$filter=Hidden eq false`
		).then((lists) => {
			return lists.value.map(list => ({
        Id: list.Id,
        Title: list.Title,
        Description: list.Description,
        BaseTemplate: list.BaseTemplate,
        IsLibrary: list.BaseType == 1
      })) as IList[];
		});
	}

	public getListBuiltinContentTypes(): string[] {
		return BuiltinListContentTypes;
	}
	public getLibraryBuiltinContentTypes(): string[] {
		return BuiltinLibraryContentTypes;
	}
	public getListContentTypes(listId: string): Promise<IContentType[]> {
		return this._restRequest(`_api/web/lists('${listId}')/ContentTypes?$filter=Hidden eq false`).then((result) => {
			let contentTypes = result.value;

			return contentTypes.map((ct) => ({
				Id: ct.StringId,
				Name: ct.Name,
				Description: ct.Description,
				Group: ct.Group
			})) as IContentType[];
		});
	}

	public getBuiltinFields(): string[] {
		return BuiltinFields;
	}
	public getListFields(listId: string): Promise<IField[]> {
		return this._restRequest(`_api/web/lists('${listId}')/Fields?$filter=Hidden eq false`).then((result) => {
			let fields = result.value;

			return fields.map((f) => ({
				Id: f.Id,
				Title: f.Title,
				InternalName: f.InternalName,
				Type: this._getFieldTypeOrDefault(f.TypeAsString),
        CustomFormatter: f.CustomFormatter,
        Xml: f.SchemaXml,
				Group: f.Group,
				Required: f.Required
			})) as IField[];
		});
	}
}

export const ListsServiceKey = ServiceKey.create<IListsService>('YPCODE:ListsService', ListsService);
