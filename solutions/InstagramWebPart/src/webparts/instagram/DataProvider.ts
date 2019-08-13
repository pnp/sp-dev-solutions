import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import {
  HttpClient,
  HttpClientResponse
} from '@microsoft/sp-http';
import { 
  Text 
} from '@microsoft/sp-core-library';
import { IFeedResponse } from './IFeedResponse';

export default class DataProvider {

  private readonly _accessToken: string;
  private readonly _httpClient: HttpClient;
  private readonly _feedUrl: string;

  constructor(accessToken: string, httpClient: HttpClient, feedUrl: string) {
    this._accessToken = accessToken;
    this._httpClient = httpClient;
    this._feedUrl = feedUrl;
  }

  @autobind
  public getFeed(): Promise<IFeedResponse> {
    return this._httpClient.get(this._formattedFeedUrl, HttpClient.configurations.v1)
    .then((response: HttpClientResponse) => {
      return response.json();
    })
    .catch((error: Error) => {
      console.error(`Data fetch error from '${this._formattedFeedUrl}': ${error.toString()}`);
      return Promise.reject(error);
    });
  }
  

  private get _formattedFeedUrl(): string {
    return Text.format(
      this._feedUrl,
      this._accessToken
    );
  }
}