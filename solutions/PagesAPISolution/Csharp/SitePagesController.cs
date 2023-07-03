using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MSGraphPagesAPIExample
{
  public class SitePagesController
  {
    private const string baseUrl = "https://graph.microsoft.com/beta/sites/";
    public SitePagesController() { }

    public async Task<List<SitePage>> ListPages(string siteId)
    {
      string url = baseUrl + siteId + "/pages";

      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);

      string json = await SendRequest(request);

      JObject jObject = JObject.Parse(json);

      List<SitePage> pages = jObject["value"].ToObject<List<SitePage>>();

      return pages;
    }

    public async Task<JObject> GetPage(string siteId, string pageId)
    {
      string url = baseUrl + siteId + "/pages/" + pageId + "/microsoft.graph.sitepage?expand=canvasLayout";

      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);

      string json = await SendRequest(request);

      return JObject.Parse(json);
    }

    public async Task PublishPage(string siteId, string pageId)
    {
      string url = baseUrl + siteId + "/pages/" + pageId + "/microsoft.graph.sitepage/publish";

      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

      await SendRequest(request);
    }

    public async Task DeletePage(string siteId, string pageId)
    {
      string url = baseUrl + siteId + "/pages/" + pageId;

      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Delete, url);

      await SendRequest(request);
    }


    public async Task<SitePage> CreatePage(string siteId, JObject sitePage)
    {
      sitePage["@odata.type"] = "microsoft.graph.sitepage";
      string payload = JsonConvert.SerializeObject(sitePage, Newtonsoft.Json.Formatting.None,
                            new JsonSerializerSettings
                            {
                              NullValueHandling = NullValueHandling.Ignore
                            });

      string url = baseUrl + siteId + "/pages";

      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);

      request.Content = new StringContent(payload, Encoding.UTF8, "application/json");

      string json = await SendRequest(request);

      return JsonConvert.DeserializeObject<SitePage>(json);
    }

    public async Task<string> UpdatePage(string siteId, string pageId, SitePage sitePage)
    {
      string payload = JsonConvert.SerializeObject(sitePage, Newtonsoft.Json.Formatting.None,
                            new JsonSerializerSettings
                            {
                              NullValueHandling = NullValueHandling.Ignore
                            });

      string url = baseUrl + siteId + "/pages/" + pageId + "/microsoft.graph.sitepage";

      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Patch, url);

      request.Content = new StringContent(payload, Encoding.UTF8, "application/json");

      string json = await SendRequest(request);

      return json;
    }

    // create GET request to retrieve access token
    private async Task<AuthenticationResult> GetToken()
    {
      var accessToken = new AccessToken();

      var token = await accessToken.GetToken();

      return token;
    }

    private async Task<string> SendRequest(HttpRequestMessage request)
    {
      var token = await GetToken();
      request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);

      HttpClient http = new HttpClient();

      http.DefaultRequestHeaders.Add("Accept", "application/json;odata.metadata=none");

      var response = await http.SendAsync(request);

      if (!response.IsSuccessStatusCode)
      {
        string error = await response.Content.ReadAsStringAsync();
        object formatted = JsonConvert.DeserializeObject(error);
        throw new WebException("Error Calling the Graph API: \n" + JsonConvert.SerializeObject(formatted, Formatting.Indented));
      }

      string json = await response.Content.ReadAsStringAsync();
      return json;
    }
  }
}
