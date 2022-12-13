using Microsoft.Graph;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MSGraphPagesAPIExample
{
  class Program
  {
    public static async Task Main()
    {
      // Get access token
      Console.WriteLine("Getting access token...");
      var accessToken = new AccessToken();
      var token = await accessToken.GetToken();
      Console.WriteLine("Received access token: \n" + token.AccessToken);
      Console.WriteLine("******************************************");

      // Uncomment the code below to Run sample scenarios

      // Scenario #1: Copy a page to multiple sites
      string sourceSiteId = "<enter your source site Id here>";
      string sourcePageId = "<enter your source page Id here>";
      string[] targetSiteIds = new string[] { "<enter your target site Id here>" };
      await CopyPageToMultipleSites(sourceSiteId, sourcePageId, targetSiteIds);

      // Scenario 2: Delete pages before a target date
      // string siteId = "<enter your site Id here>";   
      // DateTime targetDate = new DateTime(2000, 1, 1);  
      // await DeletePageBeforeTargetDate(siteId, targetDate);

      // Scenario #3: Promote multiple pages as newposts
      // string siteId = "<enter your site Id here>";   
      // string[] pageIds = new string[]{ "<enter your target page Id here>" };
      // await PromotePagesAsNews(siteId, pageIds)
    }

    public static async Task CopyPageToMultipleSites(string sourceSiteId, string sourcePageId, string[] targetSiteIds)
    {
      SitePagesController sitePagesController = new SitePagesController();
      Console.WriteLine("Fetching pages...");
      JObject page = await sitePagesController.GetPage(sourceSiteId, sourcePageId);
      Console.WriteLine($"Fetch page content successfully. Page title: {page["title"]}");
      foreach (string siteId in targetSiteIds)
      {
        JObject newPage = ModifyPage(page);
        SitePage createdPage = await sitePagesController.CreatePage(siteId, newPage); ;
        Console.WriteLine($"Create page (URL: {createdPage.WebUrl}, ID: {createdPage.ID}) in site ({siteId}) success!");
        Console.WriteLine("******************************************");
        await sitePagesController.PublishPage(siteId, createdPage.ID); ;
        Console.WriteLine($"Publish page (URL: {createdPage.WebUrl}, ID: {createdPage.ID}) success!");
        Console.WriteLine("******************************************");
      }
    }

    public static async Task DeletePageBeforeTargetDate(string siteId, DateTime date)
    {
      SitePagesController sitePagesController = new SitePagesController();
      Console.WriteLine("Listing pages...");
      List<SitePage> pages = await sitePagesController.ListPages(siteId);
      Console.WriteLine($"Received {pages.Count} pages");
      foreach (SitePage page in pages)
      {
        if (Convert.ToDateTime(page.LastModifiedDateTime) < date)
        {
          await sitePagesController.DeletePage(siteId, page.ID);
          Console.WriteLine($"Delete page (ID: {page.ID}, LastModifiedDateTime: {page.LastModifiedDateTime}) success!");
          Console.WriteLine("******************************************");
        }
      }
    }

    public static async Task PromotePagesAsNews(string siteId, string[] pageIds)
    {
      SitePagesController sitePagesController = new SitePagesController();
      SitePage updatedPage = new SitePage()
      {
        PromotionKind = SitePage.PagePromotionType.newsPost
      };
      foreach (string pageId in pageIds)
      {
        var page = await sitePagesController.UpdatePage(siteId, pageId, updatedPage);
        Console.WriteLine($"Promote page ({pageId}) success!");
        Console.WriteLine("******************************************");
      }
    }

    private static JObject ModifyPage(JObject page)
    {
      var newPage = new JObject(page);
      // Add your code here to modify the page: e.g.: 
      // newPage["title"] = "New Title";
      return newPage;
    }
  }
}