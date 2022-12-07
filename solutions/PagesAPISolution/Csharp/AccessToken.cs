using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Threading.Tasks;

namespace MSGraphPagesAPIExample
{
    //Access token class to authenticate and obtain AAD Token for future calls
    public class AccessToken
    {
        //enter your tenantId, app/client Id, and app/client secret
        static readonly string tenantId = "<enter your tenant Id here>";
        static readonly string appId = "<enter your app Id here>";
        static readonly string appSecret = "<enter your app secret here>";

        public AccessToken()
        {

        }

        //create GET request to retrieve access token
        public async Task<AuthenticationResult> GetToken()
        {
            var authContext = new AuthenticationContext("https://login.microsoftonline.com/" + tenantId);

            var credential = new ClientCredential(appId, appSecret);

            var GraphAAD_URL = string.Format("https://graph.microsoft.com/");

            try
            {
                AuthenticationResult result = await authContext.AcquireTokenAsync(GraphAAD_URL, credential);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error Acquiring Access Token: \n" + ex.Message);
            }
        }
    }
}
