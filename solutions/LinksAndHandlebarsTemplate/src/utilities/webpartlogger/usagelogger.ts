import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient } from '@microsoft/sp-http';
import { sp } from "@pnp/sp";
import { Logger, LogLevel } from "@pnp/logging";

export class Usage {

  public WebPartName: string;
  public AbsoluteUrl: string;
  public Version: string;
  public CustomData1: string;
  public CustomData2: string;
  public CustomData3: string;
  public CustomData4: string;
  public CustomData5: string;

  constructor(
    webPartName: string,
    absoluteUrl: string,
    version: string,
    customData1: string,
    customData2: string,
    customData3: string,
    customData4: string,
    customData5: string
  ) {
    this.WebPartName = webPartName;
    this.AbsoluteUrl = absoluteUrl;
    this.Version = version;
    this.CustomData1 = customData1;
    this.CustomData2 = customData2;
    this.CustomData3 = customData3;
    this.CustomData4 = customData4;
    this.CustomData5 = customData5;
  }

}
const storageEntity = "LinksHandlebarsConfig";
const environmentName = "PROD";

export class WebPartLogger {
  public static async logUsage(context: IWebPartContext, urlsToCheck?: string[]): Promise<void> {
    try {
      let response = await sp.web.getStorageEntity(storageEntity);
      if (response) {
        let data = JSON.parse(response.Value);
        var hasBrandImagePreviewUrl = "0";

        if (urlsToCheck) {
          urlsToCheck.forEach(element => {
            if (element && element.indexOf(data.brandImagePreviewUrl) > -1)
              hasBrandImagePreviewUrl = "1";
          });
        }

        const usage = new Usage(
          context.webPartTag,
          context.domElement.baseURI,
          context.manifest.version,
          environmentName,
          hasBrandImagePreviewUrl, null, null, null
        );

        context.httpClient.post(data.loggingUrl, HttpClient.configurations.v1, {
          method: 'POST',
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'x-functions-key': data.loggingKey
          }),
          body: JSON.stringify(usage),
          credentials: 'omit'
        });
      }
    } catch (err) {
      Logger.write(`${err} - WebPartLogger (logUsage)`, LogLevel.Error);
    }
  }
}