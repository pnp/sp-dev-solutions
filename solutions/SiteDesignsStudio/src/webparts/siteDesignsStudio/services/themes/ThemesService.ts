import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { ITheme } from '../../models/ITheme';

export interface IThemeService {
	baseUrl: string;
	getCustomThemes(): Promise<ITheme[]>;
}

export class ThemeService implements IThemeService {
	private spHttpClient: SPHttpClient;
	private cachedResults: ITheme[];

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

	public getCustomThemes(): Promise<ITheme[]> {
		if (this.cachedResults && this.cachedResults.length > 0) {
			return Promise.resolve(this.cachedResults);
		} else {
			return this._restRequest('/_api/thememanager/GetTenantThemingOptions').then((resp) => {
				this.cachedResults = resp.themePreviews as ITheme[];
				return this.cachedResults;
			});
		}
	}
}

export const ThemeServiceKey = ServiceKey.create<IThemeService>('YPCODE:ThemeService', ThemeService);
