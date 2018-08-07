
import { SPHttpClient } from '@microsoft/sp-http';
export class OffDomainRedirector{
    public static GetRedirectUrl(client: SPHttpClient) : Promise<string> {
        return new Promise<string>((resolve,error)=>{
            const key = "spfx-redirectUrl";
            const currValue = localStorage.getItem(key);
            if(currValue) resolve(currValue);

            client.get('/SiteAssets/Redirect.config',SPHttpClient.configurations.v1).then(result=>{
                result.json().then(val=>{
                    localStorage.setItem(key,val.redirectUrl);
                    resolve(val.redirectUrl);
                });
            });
        });
    }
}