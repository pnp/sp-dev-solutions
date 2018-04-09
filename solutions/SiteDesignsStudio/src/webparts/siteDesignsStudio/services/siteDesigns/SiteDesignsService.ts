import { ISiteScript } from '../../models/ISiteScript';
import { ISiteDesign, WebTemplate } from '../../models/ISiteDesign';
import Schema from '../../schema/schema';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientConfiguration } from '@microsoft/sp-http';

export interface ISiteDesignsService {
	baseUrl: string;
	getSiteDesigns(): Promise<ISiteDesign[]>;
	getSiteDesign(siteDesignId: string): Promise<ISiteDesign>;
	saveSiteDesign(siteDesign: ISiteDesign): Promise<void>;
	deleteSiteDesign(siteDesign: ISiteDesign | string): Promise<void>;
	getSiteScripts(): Promise<ISiteScript[]>;
	getSiteScript(siteScriptId: string): Promise<ISiteScript>;
	saveSiteScript(siteScript: ISiteScript): Promise<void>;
	deleteSiteScript(siteScript: ISiteScript | string): Promise<void>;
}

export class SiteDesignsService implements ISiteDesignsService {
	private spHttpClient: SPHttpClient;

	constructor(serviceScope: ServiceScope) {
		this.spHttpClient = new SPHttpClient(serviceScope);
	}

	public baseUrl: string = '/';

	private _getEffectiveUrl(relativeUrl: string): string {
		return (this.baseUrl + '//' + relativeUrl).replace(/\/{2,}/, '/');
	}

	private _restRequest(url: string, params: any = null): Promise<any> {
		const restUrl = this._getEffectiveUrl(url);
		const options: ISPHttpClientOptions = {
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				ACCEPT: 'application/json; odata.metadata=minimal',
				'ODATA-VERSION': '4.0'
			}
		};
		return this.spHttpClient.post(restUrl, SPHttpClient.configurations.v1, options).then((response) => {
			if (response.status == 204) {
				return {};
			} else {
				return response.json();
			}
		});
	}

	public getSiteDesigns(): Promise<ISiteDesign[]> {
		return this._restRequest(
			'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteDesigns'
		).then((resp) => resp.value as ISiteDesign[]);
	}
	public getSiteDesign(siteDesignId: string): Promise<ISiteDesign> {
		return this._restRequest(
			'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteDesignMetadata',
			{ id: siteDesignId }
		).then((resp) => resp as ISiteDesign);
	}
	public deleteSiteDesign(siteDesign: ISiteDesign | string): Promise<void> {
		let id = typeof siteDesign === 'string' ? siteDesign as string : (siteDesign as ISiteDesign).Id;
		return this._restRequest(
			'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.DeleteSiteDesign',
			{ id: id }
		);
	}
	public saveSiteDesign(siteDesign: ISiteDesign): Promise<void> {
		if (siteDesign.Id) {
			// Update
			return this._restRequest(
				'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.UpdateSiteDesign',
				{
					updateInfo: {
						Id: siteDesign.Id,
						Title: siteDesign.Title,
						Description: siteDesign.Description,
						SiteScriptIds: siteDesign.SiteScriptIds,
						WebTemplate: siteDesign.WebTemplate.toString(),
						PreviewImageUrl: siteDesign.PreviewImageUrl,
						PreviewImageAltText: siteDesign.PreviewImageAltText,
						Version: siteDesign.Version,
						IsDefault: siteDesign.IsDefault
					}
				}
			);
		} else {
			// Create
			return this._restRequest(
				'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.CreateSiteDesign',
				{
					info: {
						Title: siteDesign.Title,
						Description: siteDesign.Description,
						SiteScriptIds: siteDesign.SiteScriptIds,
						WebTemplate: siteDesign.WebTemplate.toString(),
						PreviewImageUrl: siteDesign.PreviewImageUrl,
						PreviewImageAltText: siteDesign.PreviewImageAltText
					}
				}
			);
		}
	}
	public getSiteScripts(): Promise<ISiteScript[]> {
		return this._restRequest(
			'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteScripts'
		).then((resp) => resp.value as ISiteScript[]);
	}

	public getSiteScript(siteScriptId: string): Promise<ISiteScript> {
		return this._restRequest(
			'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteScriptMetadata',
			{ id: siteScriptId }
		).then((resp) => {
			let siteScript = resp as ISiteScript;
			siteScript.Content = JSON.parse(siteScript.Content as any);
			return siteScript;
		});
	}
	public saveSiteScript(siteScript: ISiteScript): Promise<void> {
		if (siteScript.Id) {
			return this._restRequest(
				'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.UpdateSiteScript',
				{
					updateInfo: {
						Id: siteScript.Id,
						Title: siteScript.Title,
						Description: siteScript.Description,
						Version: siteScript.Version,
						Content: JSON.stringify(siteScript.Content)
					}
				}
			);
		} else {
			return this._restRequest(
				`/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.CreateSiteScript(Title=@title)?@title='${siteScript.Title}'`,
				siteScript.Content
			);
		}
	}
	public deleteSiteScript(siteScript: ISiteScript | string): Promise<void> {
		let id = typeof siteScript === 'string' ? siteScript as string : (siteScript as ISiteScript).Id;
		return this._restRequest(
			'/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.DeleteSiteScript',
			{ id: id }
		);
	}
}

export const SiteDesignsServiceKey = ServiceKey.create<ISiteDesignsService>(
	'YPCODE:SiteDesignsService',
	SiteDesignsService
);
