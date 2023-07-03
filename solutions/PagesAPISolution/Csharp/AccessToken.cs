using Microsoft.IdentityModel.Clients.ActiveDirectory;
using DotNetEnv;
using System;
using System.Threading.Tasks;

namespace MSGraphPagesAPIExample
{
    //Access token class to authenticate and obtain AAD Token for future calls
    public class AccessToken
    {
        public AccessToken()
        {
        }

        //create GET request to retrieve access token
        public async Task<AuthenticationResult> GetToken()
        {
            Env.Load("../.env"); // Loads the variables from the .env file
            string tenantId = Environment.GetEnvironmentVariable("tenantId");
            string appId = Environment.GetEnvironmentVariable("appId");
            string appSecret = Environment.GetEnvironmentVariable("appSecret");

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
