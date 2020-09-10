import { SPHttpClient, SPHttpClientResponse, MSGraphClient, HttpClient, HttpClientResponse, HttpClientConfiguration } from "@microsoft/sp-http";

export interface ILeadsSettings {
  demo: boolean;
  quarterlyOnly: boolean;
  region?: string;
}

export class LeadsSettings {
  private static settingsFileName: string = 'LeadsSettings.json';
  private static settingsFileUrl: string = `/me/drive/special/approot:/${LeadsSettings.settingsFileName}`;
  private static graphClient: MSGraphClient;
  private static httpClient: HttpClient;

  public static initialize(graphHttpClient: MSGraphClient, httpClient: HttpClient): void {
    this.graphClient = graphHttpClient;
    this.httpClient = httpClient;
  }

  public static getSettings(): Promise<ILeadsSettings> {
    if (!this.graphClient) {
      throw 'Initialize LeadsSettings before managing settings';
    }

    const defaultSettings: ILeadsSettings = {
      demo: true,
      quarterlyOnly: true
    };

    return this.graphClient
      .api(`${LeadsSettings.settingsFileUrl}?select=@microsoft.graph.downloadUrl`)
      .get()
      .then((response: { '@microsoft.graph.downloadUrl': string }): Promise<HttpClientResponse> => {
        return this.httpClient
          .get(response['@microsoft.graph.downloadUrl'], HttpClient.configurations.v1);
      })
      .then((response: HttpClientResponse): Promise<string> => {
        if (response.ok) {
          return response.text();
        }

        return Promise.reject(response.statusText);
      })
      .then((settingsString: string): Promise<ILeadsSettings> => {
        try {
          const settings: ILeadsSettings = JSON.parse(settingsString);
          return Promise.resolve(settings);
        }
        catch (e) {
          return Promise.resolve(defaultSettings);
        }
      }, _ => Promise.resolve(defaultSettings));
  }

  public static setSettings(settings: ILeadsSettings): Promise<void> {
    if (!this.graphClient) {
      throw 'Initialize LeadsSettings before managing settings';
    }

    return this.graphClient
      .api(`${LeadsSettings.settingsFileUrl}:/content`)
      .header('content-type', 'text/plain')
      .put(JSON.stringify(settings));
  }

  public static getLeadsApiUrl(spHttpClient: SPHttpClient, siteUrl: string): Promise<string> {
    return new Promise<string>((resolve: (leadsApiUrl: string) => void, reject: (error: any) => void): void => {
      spHttpClient
        .get(`${siteUrl}/_api/web/GetStorageEntity('LeadsApiUrl')`, SPHttpClient.configurations.v1)
        .then((res: SPHttpClientResponse) => {
          if (!res.ok) {
            return reject(res.statusText);
          }

          return res.json();
        })
        .then((property: { Value?: string }) => {
          if (property.Value) {
            resolve(property.Value);
          }
          else {
            reject('Property not found');
          }
        }, (error: any): void => {
          reject(error);
        });
    });
  }
}