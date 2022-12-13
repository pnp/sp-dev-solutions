# Demo SharePoint 2019 SharePoint Framework capabilities

Demo solution demonstrating SharePoint Framework capabilities available in SharePoint Server 2019.

Solution contains two components:

## To do web part

![Animated gif demonstrating the to do web part](./assets/todo-basic-demo.gif)

> The To do web part is an adaptation of the [web part originally built by Chakkaradeep Chandran](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-todo-basic) to work on SharePoint Server 2019.

## Site footer

Add custom footer to all sites in your SharePoint tenant to quickly access important resources in your organization.

![Footer enabled on a marketing site](./assets/footer-marketing.png)

> The Site footer is an adaptation of the [footer originally built by Waldek Mastykarz](https://github.com/SharePoint/sp-dev-solutions/blob/master/solutions/global-footer/README.md) to work on SharePoint Server 2019.

## Installation

1. From the **sharepoint/solution** folder, add the **sp-2019-capabilities.sppkg** file to the tenant app catalog in your SharePoint tenant

2. Navigate to the site where you want to install the solution

## Configuration

To configure footer links, you need to update the custom action associated with the footer in the particular site. You can do this using the [PnP PowerShell](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/add-pnpcustomaction?view=sharepoint-ps#examples) or [Office 365 CLI](https://pnp.github.io/office365-cli/cmd/spo/customaction/customaction-add/#examples).

## Solution information

![SPFx v1.7.0](https://img.shields.io/badge/SPFx-1.7.0-green.svg)

### Compatibility

This solution is compatible with SharePoint Server 2019 and SharePoint Online.

### Third-party libraries

- [immutability-helper@2.2.0](https://www.npmjs.com/package/immutability-helper)

### Authors

- [Chakkaradeep Chandran](https://github.com/chakkaradeep) (Microsoft)
- [Waldek Mastykarz](https://github.com/waldekmastykarz) (MVP, [Rencore](https://rencore.com))

### Version history

Version|Date|Comments
-------|----|--------
1.0.0|November 19, 2018|Updated to match v1.7 experience and tested in RTM
1.0.0|September 18, 2018|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

![](https://pnptelemetry.azurewebsites.net/sp-dev-solutions/solutions/sp2019-capabilities)
