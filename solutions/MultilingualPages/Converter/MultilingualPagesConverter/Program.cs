using Microsoft.SharePoint.Client;
using Newtonsoft.Json;
using OfficeDevPnP.Core.ALM;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace MultilingualPagesConverter
{
    class Program
    {
        private static readonly LogHelper log = LogHelper.Instance;
        private static List<Local> locals;

        private static string defaultLanguage = "";
        private static LanguageConfig languageConfig;
        private static List<ListItem> masterPages = new List<ListItem>();
        private static List<ListItem> folders = new List<ListItem>();
        private static List<ListItem> translationsPages = new List<ListItem>();
        private static ListCollection sitePagesList;
        private static List sitePages;
        private static bool cleanupTasksOnly = false;

        private static AppManager manager;
        private static AppMetadata app;

        static void Main(string[] args)
        {
            log.Echo = true;
            var current = Directory.GetCurrentDirectory();
            using (StreamReader r = new StreamReader($"{current}\\locals.json"))
            {
                string json = r.ReadToEnd();
                locals = JsonConvert.DeserializeObject<List<Local>>(json);
            }
            Init(args);
        }

        static void Init(string[] args)
        {
            var siteUrl = "";
            if (args.Length == 0)
            {
                Console.WriteLine("Please enter the site url.");
                siteUrl = Console.ReadLine();
            }
            else
            {
                siteUrl = args[0];
            }

            if (siteUrl.EndsWith("/"))
                siteUrl = siteUrl.Substring(0, siteUrl.Length - 1);


            Console.WriteLine("Only run cleanup tasks (y/N):");
            var cleanupOnly = Console.ReadLine();
            if (cleanupOnly != null && cleanupOnly.ToLower() == "y")
                cleanupTasksOnly = true;

            Console.WriteLine((cleanupTasksOnly) ? "Will only run cleanup tasks." : "Will run a full conversion.");

            Console.WriteLine("Please enter the site collection administrator username:");
            var userName = Console.ReadLine();

            Console.WriteLine("Please enter the accounts password (masked):");
            var password = "";
            do
            {
                ConsoleKeyInfo key = Console.ReadKey(true);
                // Backspace Should Not Work
                if (key.Key != ConsoleKey.Backspace && key.Key != ConsoleKey.Enter)
                {
                    password += key.KeyChar;
                    Console.Write("*");
                }
                else
                {
                    if (key.Key == ConsoleKey.Backspace && password.Length > 0)
                    {
                        password = password.Substring(0, (password.Length - 1));
                        Console.Write("\b \b");
                    }
                    else if (key.Key == ConsoleKey.Enter)
                    {
                        break;
                    }
                }
            } while (true);

            var sspassword = new SecureString();
            foreach (char c in password)
            {
                sspassword.AppendChar(c);
            }

            Console.WriteLine();
            log.Log("Init", Severity.Info, $"Starting Multilingual conversion for site: {siteUrl}");
            var result = ConvertMultilingual(siteUrl, userName, sspassword);
            if (result)
                log.Log("Init", Severity.Info, $"Finished Multilingual conversion for site: {siteUrl}");
            else
                log.Log("Init", Severity.Error, $"Failed to complete Multilingual conversion for site: {siteUrl}, check logs for more details.");
            Console.WriteLine("Press Any Key to close");
            Console.ReadKey();
        }

        static bool ConvertMultilingual(string siteUrl, string _username, SecureString _password)
        {
            bool allTranslationsComplete = true;

            var retVal = false;
            try
            {
                using (ClientContext ctx = new ClientContext(siteUrl))
                {
                    ctx.Credentials = new SharePointOnlineCredentials(_username, _password);
                    var web = ctx.Web;
                    ctx.Load(web);
                    //Validate Microsoft Multilingual Feature is Enabled
                    manager = new AppManager(ctx);
                    var apps = manager.GetAvailable();

                    app = apps.Where(a => a.Title == "Multilingual Page Management").FirstOrDefault();
                    if (app == null)
                    {
                        log.Log("ConvertMultilingual", Severity.Error, $"PnP Multilingual Pages feature has not been enabled and configured, exiting.");
                        return retVal;
                    }

                    //Validte OOB Multilingual Pages Feature
                    var oobFeature = web.Features.GetById(new Guid("24611c05-ee19-45da-955f-6602264abaf8"));
                    ctx.Load(oobFeature);
                    ctx.ExecuteQuery();
                    if (oobFeature.ServerObjectIsNull())
                    {
                        log.Log("ConvertMultilingual", Severity.Error, $"Microsoft SPO Multilingual Pages feature has not been enabled and configured, exiting.");
                        return retVal;
                    }

                    sitePagesList = ctx.Web.Lists;
                    ctx.Load(sitePagesList);

                    if (!cleanupTasksOnly)
                    {
                        var storageEntityString = ctx.Web.GetStorageEntity("LanguageConfig");
                        ctx.Load(storageEntityString);
                        ctx.ExecuteQuery();

                        defaultLanguage = locals.Where(l => l.localeId == web.Language).First().code.ToLower();
                        if (defaultLanguage == null)
                        {
                            log.Log("ConvertMultilingual", Severity.Error, $"Could not resolve default language code for local {web.Language}, exiting.");
                            return retVal;
                        }
                        log.Log("ConvertMultilingual", Severity.Info, $"Loaded language config and site pages list.");

                        //Fix Chinese
                        var LanguageList = storageEntityString.Value.ToLower().Replace("zh-hans", "zh-cn");

                        languageConfig = JsonConvert.DeserializeObject<LanguageConfig>(LanguageList);
                        if (languageConfig.languages.Count > 0)
                        {
                            log.Log("ConvertMultilingual", Severity.Info, $"Validated language config.");
                        }
                        else
                        {
                            log.Log("ConvertMultilingual", Severity.Error, $"Language config tenant app property is not valid, exiting.");
                            return retVal;
                        }

                        log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");
                        log.Log("ConvertMultilingual", Severity.Info, $"Started loading site pages from library.");
                        var successLoadPage = loadPages(ctx, sitePagesList);
                        if (successLoadPage)
                        {
                            log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");
                            log.Log("ConvertMultilingual", Severity.Info, $"Started updating transition pages to new master page id.");
                            var successFixMaster = fixMaster();
                            if (successFixMaster)
                            {
                                log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");
                                log.Log("ConvertMultilingual", Severity.Info, $"Finished updating transition pages to new master page id.");

                                log.Log("ConvertMultilingual", Severity.Info, $"{masterPages.Count} master translation pages loaded.");
                                log.Log("ConvertMultilingual", Severity.Info, $"{translationsPages.Count} translation pages loaded.");
                                log.Log("ConvertMultilingual", Severity.Info, $"{folders.Count} folders loaded.");

                                log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");
                                log.Log("ConvertMultilingual", Severity.Info, $"Started processing master translation pages.");


                                foreach (var master in masterPages)
                                {
                                    List<object> newLanguages = new List<object>();
                                    if (master["LanguageVariant"].ToString().ToLower().IndexOf("zh-hans") > -1)
                                    {
                                        master["LanguageVariant"] = master["LanguageVariant"].ToString().ToLower().Replace("zh-hans", "zh-cn");
                                    }
                                    var languageVariant = master["LanguageVariant"].ToString().ToLower().Split(' ').ToList();
                                    foreach (var lang in languageConfig.languages)
                                    {
                                        if (!languageVariant.Contains(lang.code.ToLower()))
                                            newLanguages.Add(lang.code.ToLower());
                                    }

                                    master["_SPTranslatedLanguages"] = newLanguages.ToArray();
                                    master["_SPIsTranslation"] = false;
                                    master.Update();
                                    ctx.Load(master);
                                    ctx.ExecuteQuery();
                                    var newFilePath = $"{siteUrl}/sitepages/{master["FileLeafRef"].ToString()}";
                                    master.File.MoveTo(newFilePath, MoveOperations.Overwrite);
                                    ctx.Load(master);
                                    ctx.ExecuteQuery();
                                    log.Log("ConvertMultilingual", Severity.Info, $"{master["FileRef"].ToString()} converted and moved to root folder.");
                                }
                                log.Log("ConvertMultilingual", Severity.Info, $"Finished processing master translation pages.");

                                log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");
                                log.Log("ConvertMultilingual", Severity.Info, $"Started processing translation pages that need a master copy.");

                                var copyTranslation = translationsPages.Where(t => t["MasterTranslationPage"].ToString() == t.Id.ToString()).ToList();
                                foreach (var cm in copyTranslation)
                                {
                                    //Create copy as master page
                                    var newMasterPath = $"{siteUrl}/sitepages/{cm["FileLeafRef"].ToString()}";
                                    cm.File.CopyTo(newMasterPath, true);
                                    ctx.ExecuteQuery();

                                    var newMasterItem = web.GetFileByUrl(newMasterPath).ListItemAllFields;
                                    ctx.Load(newMasterItem);
                                    ctx.ExecuteQuery();

                                    masterPages.Add(newMasterItem);
                                    cm["MasterTranslationPage"] = newMasterItem.Id;
                                    var fixTranslations = translationsPages.Where(t => t["MasterTranslationPage"].ToString() == cm.Id.ToString()).ToList();
                                    foreach (var ft in fixTranslations)
                                    {
                                        ft["MasterTranslationPage"] = newMasterItem.Id;
                                    }
                                }
                                log.Log("ConvertMultilingual", Severity.Info, $"Finished processing translation pages that need a master copy.");

                                log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");
                                log.Log("ConvertMultilingual", Severity.Info, $"Started processing translation pages.");

                                foreach (var trans in translationsPages)
                                {
                                    var masterPage = masterPages.Where(m => m["MasterTranslationPage"].ToString() == trans["MasterTranslationPage"].ToString());
                                    if (masterPage.Any())
                                    {
                                        trans["_SPIsTranslation"] = true;
                                        trans["_SPTranslationLanguage"] = trans["LanguageFolder"].ToString().ToLower();
                                        var masterGuidString = masterPage.First()["UniqueId"].ToString();
                                        Guid masterGuid = Guid.Parse(masterGuidString);
                                        trans["_SPTranslationSourceItemId"] = masterGuid;
                                        trans.Update();
                                        ctx.Load(trans);
                                        ctx.ExecuteQuery();
                                        log.Log("ConvertMultilingual", Severity.Info, $"{trans["FileRef"].ToString()} converted.");
                                    }
                                    else
                                    {
                                        allTranslationsComplete = false;
                                        log.Log("ConvertMultilingual", Severity.Error, $"{trans["FileRef"].ToString()} ({trans["MasterTranslationPage"].ToString()}) could not be converted because a cooresponding master page could not be found.");
                                    }
                                }
                                log.Log("ConvertMultilingual", Severity.Info, $"Finished processing translation pages.");

                                log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");

                            }
                            else
                            {
                                log.Log("ConvertMultilingual", Severity.Error, $"Failed updating transition pages to new master page id.");
                            }
                        }
                        else
                        {
                            log.Log("ConvertMultilingual", Severity.Error, $"Failed loading site pages from library.");
                        }
                    }


                    if (allTranslationsComplete)
                    {
                        disableApp(ctx);

                        log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");
                        log.Log("ConvertMultilingual", Severity.Info, $"Started processing folders.");
                        foreach (var folder in folders)
                        {
                            var langString = folder["FileLeafRef"].ToString().Substring(0, 2);
                            folder["FileLeafRef"] = langString;
                            folder["Title"] = null;
                            folder.Update();
                            ctx.Load(folder);
                            ctx.ExecuteQuery();
                            log.Log("ConvertMultilingual", Severity.Info, $"{folder["FileLeafRef"].ToString()} renamed.");
                        }
                        log.Log("ConvertMultilingual", Severity.Info, $"Finished processing folders.");

                        //Cleanup
                        log.Log("ConvertMultilingual", Severity.Info, $"-----------------------------------------");
                        log.Log("ConvertMultilingual", Severity.Info, $"Started cleanup.");
                        var successCleanup = cleanup(ctx);
                        if (successCleanup)
                        {
                            log.Log("ConvertMultilingual", Severity.Info, $"Finished cleanup.");
                            retVal = true;
                        }
                        else
                        {
                            log.Log("ConvertMultilingual", Severity.Error, $"Failed to cleanup.");
                        }
                    }
                    else
                    {
                        log.Log("ConvertMultilingual", Severity.Info, $"Skipping cleanup tasks as not all translations could be updated. You can fix the problem translations so that they will process and re-run the migration until it runs succesfully.");
                    }
                }
            }
            catch (Exception ex)
            {
                log.Log("ConvertMultilingual", Severity.Exception, $"Exception {ex.Message} - {ex.StackTrace}");
            }
            return retVal;
        }

        static void disableApp(ClientContext ctx)
        {
            try
            {
                log.Log("disableApp", Severity.Info, $"Disabling Multilingual Pages SPFx Application Customizer.");
                if (app != null)
                    manager.Uninstall(app);
                log.Log("disableApp", Severity.Info, $"Multilingual Pages SPFx Application Customizer disabled.");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("-1, Microsoft.SharePoint.Client.ResourceNotFoundException"))
                {
                    log.Log("disableApp", Severity.Info, $"Multilingual Pages SPFx Application Customizer not enabled.");
                }
                else
                {
                    log.Log("disableApp", Severity.Exception, $"Error disabling SPFx Application Customizer - Exception {ex.Message} - {ex.StackTrace}");
                }
            }
        }
        static bool fixMaster()
        {
            bool retVal = false;
            try
            {
                //Fix all master pages that were not previously the master
                var fixMaster = masterPages.Where(m => m["MasterTranslationPage"].ToString() != m.Id.ToString()).ToList();
                foreach (var m in fixMaster)
                {
                    //Find all related translations and point to this new master
                    var fixTrans = translationsPages.Where(t => t["MasterTranslationPage"] == m["MasterTranslationPage"]);
                    foreach (var t in fixTrans)
                    {
                        t["MasterTranslationPage"] = m.Id;
                    }
                }
                retVal = true;
            }
            catch (Exception ex)
            {
                log.Log("fixMaster", Severity.Exception, $"Exception {ex.Message} - {ex.StackTrace}");
            }
            return retVal;
        }
        static bool loadPages(ClientContext ctx, ListCollection sitePagesList)
        {
            bool retVal = false;
            try
            {
                sitePages = sitePagesList.Where(l => l.EntityTypeName == "SitePages").Single();
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = "<View Scope='RecursiveAll'><RowLimit>5000</RowLimit></View>";
                ListItemCollection pages = sitePages.GetItems(camlQuery);
                ctx.Load(pages, ps => ps.Include(
                    p => p.FileSystemObjectType,
                    p => p.Id,
                    p => p["UniqueId"],
                    p => p.File,
                    p => p["Title"],
                    p => p["MasterTranslationPage"],
                    p => p["LanguageVariant"],
                    p => p["FileLeafRef"],
                    p => p["FileRef"],
                    p => p["LanguageFolder"]
                    )
                );
                ctx.ExecuteQuery();
                if (pages.Count > 0)
                    log.Log("loadPages", Severity.Info, $"Site pages loaded.");
                else
                {
                    log.Log("loadPages", Severity.Error, $"No Site pages were found.");
                    return retVal;
                }

                foreach (var sitePage in pages)
                {
                    log.Log("loadPages", Severity.Info, $"Loaded {sitePage.Id.ToString()} - {sitePage["FileRef"].ToString()} - {sitePage["MasterTranslationPage"]}");
                    if (sitePage["LanguageFolder"] != null && sitePage["LanguageFolder"].ToString().ToLower() == "zh-hans")
                    {
                        log.Log("loadPages", Severity.Info, $"{sitePage["FileLeafRef"].ToString()}changing chinese folder name to zh-cn.");
                        sitePage["LanguageFolder"] = "zh-cn";
                    }

                    if (sitePage.FileSystemObjectType == FileSystemObjectType.Folder)
                    {
                        if (sitePage["FileLeafRef"].ToString().Length <= 7 && sitePage["FileLeafRef"].ToString().Substring(2, 1) == "-")
                        {
                            folders.Add(sitePage);
                            log.Log("loadPages", Severity.Info, $"{sitePage["FileLeafRef"].ToString()} added to folders.");
                        }
                        else
                        {
                            log.Log("loadPages", Severity.Info, $"{sitePage["FileLeafRef"].ToString()} skipped.");
                        }
                    }
                    else if (sitePage["MasterTranslationPage"] != null)
                    {
                        //if (sitePage["MasterTranslationPage"].ToString() == sitePage.Id.ToString())
                        if (sitePage["LanguageFolder"] == null || sitePage["LanguageFolder"].ToString().ToLower() == defaultLanguage)
                        {
                            masterPages.Add(sitePage);
                            log.Log("loadPages", Severity.Info, $"{sitePage["FileLeafRef"].ToString()} added to master pages.");
                        }
                        else
                        {
                            translationsPages.Add(sitePage);
                            log.Log("loadPages", Severity.Info, $"{sitePage["FileLeafRef"].ToString()} added to translation pages.");
                        }
                    }
                    else
                    {
                        log.Log("loadPages", Severity.Info, $"{sitePage["FileLeafRef"].ToString()} skipped.");
                    }
                }

                retVal = true;
            }
            catch (Exception ex)
            {
                log.Log("loadPages", Severity.Exception, $"Exception {ex.Message} - {ex.StackTrace}");
            }
            return retVal;
        }

        static bool cleanup(ClientContext ctx)
        {
            bool retVal = false;
            try
            {
                var sitePagesCT = ctx.Web.ContentTypes.GetById("0x0101009D1CB255DA76424F860D91F20E6C4118");
                ctx.Load(sitePagesCT);
                var fieldLinks = sitePagesCT.FieldLinks;
                ctx.Load(fieldLinks, fl => fl.Include(f => f.Id));
                ctx.ExecuteQuery();

                List<Guid> siteColumns = new List<Guid>();
                siteColumns.Add(new Guid("d7d58269-835a-4a04-8280-93fe7bdfc950"));
                siteColumns.Add(new Guid("13286c3b-25c3-4e5c-b4cc-febcb54d9228"));
                siteColumns.Add(new Guid("b245685c-5bd3-4af4-b33b-0b9eadf94296"));
                siteColumns.Add(new Guid("fe2ae783-398f-4b11-a8cf-8799c7a1d19a"));
                siteColumns.Add(new Guid("37384a33-8e2d-4356-8349-c4b127252048"));

                foreach (var g in siteColumns)
                {
                    var link = fieldLinks.Where(fl => fl.Id == g).FirstOrDefault();
                    if (link != null)
                        link.DeleteObject();
                }
                sitePagesCT.Update(true);
                ctx.ExecuteQuery();
                log.Log("cleanup", Severity.Info, $"Removed SitePage content type field links.");

                var siteFields = ctx.Web.Fields;
                ctx.Load(siteFields, sf => sf.Include(f => f.Id));
                ctx.ExecuteQuery();
                foreach (var g in siteColumns)
                {
                    var field = siteFields.Where(fl => fl.Id == g).FirstOrDefault();
                    if (field != null)
                        field.DeleteObject();
                }
                ctx.ExecuteQuery();
                log.Log("cleanup", Severity.Info, $"Removed custom site columns.");

                if (sitePages == null)
                {
                    sitePages = sitePagesList.Where(l => l.EntityTypeName == "SitePages").Single();
                    ctx.Load(sitePages);
                    ctx.ExecuteQuery();
                }
                var pageFields = sitePages.Fields;
                ctx.Load(pageFields, pf => pf.Include(f => f.Id));
                ctx.ExecuteQuery();
                foreach (var g in siteColumns)
                {
                    var field = pageFields.Where(fl => fl.Id == g).FirstOrDefault();
                    if (field != null)
                        field.DeleteObject();
                }
                ctx.ExecuteQuery();
                log.Log("cleanup", Severity.Info, $"Removed custom site columns from site pages library.");
                retVal = true;
            }
            catch (Exception ex)
            {
                log.Log("cleanup", Severity.Exception, $"Exception {ex.Message} - {ex.StackTrace}");
            }
            return retVal;
        }
    }
}
