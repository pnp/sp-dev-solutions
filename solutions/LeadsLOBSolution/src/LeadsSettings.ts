import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface ILeadsSettings {
  demo: boolean;
  quarterlyOnly: boolean;
  region?: string;
}

export class LeadsSettings {
  private static settingsStorageKey: string = 'LeadsSettings';

  public static getSettings(): ILeadsSettings {
    const defaultSettings: ILeadsSettings = {
      demo: true,
      quarterlyOnly: true
    };

    try {
      const settingsString: string = window.localStorage.getItem(this.settingsStorageKey);
      if (settingsString) {
        const settings: ILeadsSettings = JSON.parse(settingsString);
        return settings;
      }
    }
    catch (e) { }

    return defaultSettings;
  }

  public static setSettings(settings: ILeadsSettings): void {
    window.localStorage.setItem(this.settingsStorageKey, JSON.stringify(settings));
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