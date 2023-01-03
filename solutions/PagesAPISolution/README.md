---
page_type: sample
products:
- ms-graph
languages:
- powershell
- javascript
- c-sharp
extensions:
  contentType: samples
  technologies:
  - Microsoft Graph 
  services:
  - SharePoint
  createdDate: 12/13/2022 2:58:06 PM
---
# Microsoft Graph SharePoint Pages API Samples

This solution is intended to provide you an example of how various functionalities of entities available in the Microsoft Graph SharePoint Pages API could be integrated to enrich your solutions (applications or services). 

These samples are available in different programming languages / scripts / formats so as to meet the needs for different developer audiences. 

We have samples in the following languages for Microsoft Graph SharePoint Pages API with respective repository locations:

| **Language**   | **Repo** | 
|:---------------|:--------|
| .NET - ASPNET MVC | [Sample](./Csharp) |
| Node.JS | [Sample](./NodeJS) |
| PowerShell | [Sample](./PowerShell)|
| Spfx solution | [Sample](./SPFX)|

## Scenarios

Sample code in `.NET - ASPNET MVC`, `Node.JS`, `PowerShell` includes following scenarios:
1. List all pages in the site
2. Copy a page to multiple sites. (Notes: This call won't copy assets to the target site. It works with pages only have cdn assets.)
3. Delete pages before a target date
4. Promote multiple pages to news post.

Sample code in `Spfx solution` includes:
1. List and pages in the site
2. Filter pages by title, page layout type and the promotion kind.

## Solution

Solution|Author(s)
--------|---------
PagesAPISolution | [Hanbing Wang](https://github.com/sangle7)

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 13, 2022| Initial version
1.1|December 27, 2022| Add spfx solution


## Resources

* [Microsoft Graph Pages API reference docs](https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/sitePage)

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-solutions/solutions/PagesAPISolution" />