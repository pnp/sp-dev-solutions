import { AuthenticationContext, TokenResponse } from 'adal-node';

export class AuthenticationHelper {

    private _authorityHostUrl: string = 'https://login.windows.net';
    private _tenant: string;
    private _appId: string;
    private _resource: string;
    private _certificateThumbprint: string;
    private _certificate: string;
    private _authenticationContext: AuthenticationContext;

    public constructor(appId: string, tenant: string, resource: string, certificateThumbprint: string, certificate: string) {

        this._appId = appId;
        this._tenant = tenant;
        this._resource = resource;
        this._certificate = certificate;
        this._certificateThumbprint = certificateThumbprint;

        // Set the authentication context
        this._authenticationContext = new AuthenticationContext(`${this._authorityHostUrl}/${this._tenant}`);
    }

    /**
     * Gets an access token from Azure AD
     */
    public getToken(): Promise<TokenResponse> {

        const p1 = new Promise<TokenResponse>((resolve, reject) => {

            this._authenticationContext.acquireTokenWithClientCertificate(this._resource, this._appId, this._certificate, this._certificateThumbprint, (err, tokenResponse) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(tokenResponse as TokenResponse);
                } 
            });
        });

        return p1;
    }
}