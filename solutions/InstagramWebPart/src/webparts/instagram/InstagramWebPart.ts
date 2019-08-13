import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Text } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneButton } from '@microsoft/sp-webpart-base';
import { PropertyFieldTextWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldTextWithCallout';
import * as strings from 'InstagramWebPartStrings';
import Instagram from './components/Instagram';
import { IInstagramProps } from './components/IInstagramProps';
import DataProvider from './DataProvider';
import { IFeedResponse } from './IFeedResponse';

export interface IInstagramWebPartProps {
  accessToken?: string;
  authUrl: string;
  clientId: string;
  feedUrl: string;
  title: string;
}

const TOKEN_KEY: string = 'access_token';

export default class InstagramWebPart extends BaseClientSideWebPart<IInstagramWebPartProps> {
  
  private _provider: DataProvider;
  private _feedResponse?: IFeedResponse;

  public onInit(): Promise<void> {

    // try to get the Instagram access token from the URL, if any
    const tokenIndex: number = window.location.hash.indexOf(TOKEN_KEY);
    if (tokenIndex > -1) {
      const temp: string | undefined = window.location.hash.substr(tokenIndex);
      const tokenValue: string | undefined = temp.substr(TOKEN_KEY.length + 1);
      if (tokenValue) {
        // if we've got the access token, store it in the properties
        // of the current instance of the web part
        this.properties.accessToken = tokenValue;
      }
    }
    
    const { accessToken, feedUrl }: IInstagramWebPartProps = this.properties;

    // if we have an access token
    if (accessToken) {
      // let's get the feed from Instagram
      this._provider = new DataProvider(accessToken, this.context.httpClient, feedUrl);
      return this._fetchFeed();
    } else {
      return super.onInit();
    }
  }

  public render(): void {
    const element: React.ReactElement<IInstagramProps > = React.createElement(
      Instagram,
      {
        accessToken: this.properties.accessToken,
        authUrl: this._authUrl,
        containerWidth: this.domElement.clientWidth, //restore width when available
        feed: this._feedResponse,
        needsConfiguration: (!this.properties.clientId),
        displayMode: this.displayMode,
        title: this.properties.title,
        updateProperty: (value: string): void => {
          // store the new title in the title web part property
          this.properties.title = value;
        },
        configure: this.onConfigure,
      }
    );

    ReactDom.render(element, this.domElement);
  }
  
  private onConfigure = (): void => {
    this.context.propertyPane.open();
  }

  protected onAfterResize(newWidth: number): void {
    this.render();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {  
    
    const canSignIn: boolean = (this.properties.accessToken == undefined);
    const canSignOut: boolean = !!this.properties.accessToken;

    return {  
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.InstagramGroupName,
              groupFields: [
                PropertyFieldTextWithCallout('clientId', {
                  key: 'clientIdFieldId',
                  label: strings.ClientIdDescription,
                  value: this.properties.clientId
                }),
                PropertyFieldTextWithCallout('authUrl', {
                  key: 'authUrlFieldId',
                  label: strings.AuthUrlDescription,
                  value: this.properties.authUrl
                }),
                PropertyFieldTextWithCallout('feedUrl', {
                  key: 'feedUrlFieldId',
                  label: strings.FeedUrlDescription,
                  value: this.properties.feedUrl
                })
              ]
            },
            {  
              groupName: strings.OperationalGroupName,
              groupFields: [
                PropertyPaneButton(
                  'accessToken',{
                    text: strings.SignInButtonText,
                    icon: 'SignIn',
                    disabled: !canSignIn,
                    onClick: () => {
                      // force an Authentication roundtrip
                      window.location.href = this._authUrl;
                    }
                  }),
                PropertyPaneButton(
                  'accessToken',{
                    text: strings.SignOutButtonText,
                    icon: 'SignOut',
                    disabled: !canSignOut,
                    onClick: () => {
                      // clear the access token and the response feed
                      this.properties.accessToken = undefined;
                      this._feedResponse = undefined;
                      // force UI refresh
                      this.render();
                    }
                  })
                ]
            }
          ]
        }
      ]
    };
  }

  private get _authUrl(): string {
    return Text.format(this.properties.authUrl, 
      this.properties.clientId, 
      window.location.href.indexOf('#') > 0 ?
        window.location.href.substr(0, window.location.href.indexOf('#'))
        : window.location.href);
  }

  private _fetchFeed = (): Promise<void> => {
    return this._provider.getFeed()
      .then((response: IFeedResponse) => {
        this._feedResponse = response;
      })
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }
}
