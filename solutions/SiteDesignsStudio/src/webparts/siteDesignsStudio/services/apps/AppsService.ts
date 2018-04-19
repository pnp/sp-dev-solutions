import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { IApp } from '../../models/IApp';

export interface IAppsService {
	baseUrl: string;
	getAvailableApps(): Promise<IApp[]>;
}

export class AppsService implements IAppsService {
	private spHttpClient: SPHttpClient;
	private cachedResults: IApp[];

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
				ACCEPT: 'application/json; odata.metadata=minimal',
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

	public getAvailableApps(): Promise<IApp[]> {
		if (this.cachedResults && this.cachedResults.length > 0) {
			return Promise.resolve(this.cachedResults);
		} else {
			return this._restRequest('/_api/web/tenantappcatalog/AvailableApps').then((resp) => {
				this.cachedResults = resp.value.map((app) => ({
					title: app.Title,
					id: app.ID
				}));
				return this.cachedResults;
			});
		}
	}
}

export const AppsServiceKey = ServiceKey.create<IAppsService>('YPCODE:AppsService', AppsService);
