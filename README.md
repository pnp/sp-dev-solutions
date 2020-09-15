# SharePointWorkflowConverter
A C# console application for retrieving legacy 2010 & 2013 custom SharePoint workflow definition files, and creating new Power Automate flows programmatically.

### General Notes:
1. Only compatible with SharePoint Online.
2. Tested with a tenant [global admin](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) account.
3. Uses the 4.7.2 [.NET Framework](https://docs.microsoft.com/en-us/dotnet/standard/choosing-core-framework-server).  
4. The code for retrieving legacy workflows and the code for creating a new Power Automate flow are contained in 2 separate respective functions: `GetLegacyWorkflow()` and `CreateNewWorkflow()`.  
If you don't need one or the other for your purposes, simply comment them out.
### Notes about retrieving legacy 2010/2013 workflows:
1. [Legacy authentication](https://techcommunity.microsoft.com/t5/microsoft-sharepoint-blog/sharepoint-online-authentication-in-powershell-for-csom-when/ba-p/510114) must be enabled in the tenant for this code to work.   
2. All custom list/library workflows created within SharePoint Designer will have `*.xoml` and `*.xoml.wfconfig.xml` files.  
Each file contains pertinent information describing the workflow, such as list/library associations, actions, etc.  You can manually view these files in SharePoint Designer 2013 by clicking *All Files* from the left-hand navigation and selecting > *Workflows*.  The files can be programmatically retrieved using this project and parsed to map to equivalent Power Automate connections, actions, etc.
![Alt text](/SS.png?raw=true "Title")
3. Declarative `*.xoml` and `*.xoml.wfconfig.xml` files do not appear to exist for workflows created from [OOB SharePoint 2010 or 2013 workflow templates](https://support.microsoft.com/en-us/office/overview-of-workflows-included-with-sharepoint-d74fcceb-3a64-40fb-9904-cc33ca49da56).  *(If you can find them - I'll buy you a beverage of your choice!)*
4. 
### Notes about creating Power Automate flows:
1. This project leverages [Power Automate Management Web API](https://docs.microsoft.com/en-us/power-automate/web-api) to create a new Power Automate flow.  
2. Per Microsoft's document, flows under My Flows are not supported by these APIs.  Instead you will find flows created via the API in your [Default Solution](https://flow.microsoft.com/en-us/blog/solutions-in-microsoft-flow/).  *(I have opened a [GitHub issue](https://github.com/MicrosoftDocs/power-automate-docs/issues/323) inquiring about how to programmatically create Power Automate flows within solutions other than Default.)*  
3.  
