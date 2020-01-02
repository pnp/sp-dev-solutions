![SharePoint Patterns and Practices](https://devofficecdn.azureedge.net/media/Default/PnP/sppnp.png)

# SharePoint Patterns and Practices Community Solutions

Welcome to the SharePoint PnP Community Solutions repository. This repository contains samples and templates you can use as foundations and patterns of solutions for your SharePoint sites.

#### STATUS

These web parts are currently in preview, and undergoing further updates to improve quality and add capabilities, based on your feedback.
  
## About

This repository contains solution samples that implement different user scenarios that you can use as part of your own solutions within SharePoint sites.  These samples end-to-end solutions that contain all of the components you need to fulfill productivity needs of users and teams.  For developers, these are extended examples, and contain some modules and patterns you may find useful to re-use in your solutions.

We welcome your reported issues, pull requests, and new solution samples. Please use the Github issues list to submit your feature requests and issues, and please submit pull requests and bug fixes.  For new solutions, you will want to review the solutions standards criteria for inclusion.  For more information, see [Contribution Guidance](./.github/CONTRIBUTING.md).

## Solution Samples

| Solution           | Description                                                                        | Link  |
| ------------------ |:-----------------------------------------------------------------------------------| -----:|
| ChangeRequests     | Manage and close change requests opened by users.                                  | [Link](./solutions/ChangeRequests/README.md) |
| Column Formatter | Easy editor for modern listview Column Formatting | [Link](./solutions/ColumnFormatter/README.md) |
| ContactManagement  | Organize and manage contacts and organizations.                                    | [Link](./solutions/ContactManagement/README.md) |
| LinksAndHandlebarsTemplate  | Different kinds of visuals for hosting sets of links on a page, including with custom Handlebars Templates | [Link](./solutions/LinksAndHandlebarsTemplate/README.md) | 
| Multilingual Pages  | Solution to create, manage, and consume multilingual pages based on users preferred language. | [Link](./solutions/MultilingualPages/README.md) | 
| InventoryCheckOut  | Manage a list of items in an inventory, and let users check out and reserve items. | [Link](./solutions/InventoryCheckOut/README.md) | 
| Site Designs Studio | Enables the management of Site Designs and Site Scripts directly in the browser | [Link](./solutions/SiteDesignsStudio/README.md) |
| TimeAway           | Provides a simple out-of-office tracker for members of your team.                  | [Link](./solutions/TimeAway/README.md) | 
| ModernSearch       | User friendly search experience in the modern SharePoint interface              | [Link](./solutions/ModernSearch/react-search-refiners/README.md) | 
| ModernSearchRenderers          | Custom renderers for the ModernSearch solution.      | [Link](./solutions/ModernSearch/react-search-refiners-renderer/README.md) | 
 
## Additional resources

* [Overview of the SharePoint Framework](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)

## Using the solutions

To build and start using these projects, you'll need to clone and build the projects.

Clone this repository by executing the following command in your console:

```
git clone https://github.com/SharePoint/sp-dev-solutions.git
```

Navigate to the cloned repository folder which should be the same as the repository name:

```
cd sp-dev-solutions
```

To access the solutions use the following command, where you replace `solution-folder-name` with the name of the solution you want to access.

```
cd solution-folder-name

```

Now run the following command to install the npm packages:

```
npm install
```

This will install the required npm packages and dependencies to build and run the client-side project.


Once the npm packages are installed, run the following command to preview your web parts in SharePoint Workbench:

```
gulp serve
```

## Contributions

These solutions are direct from the feature teams, SharePoint PnP core team (http://aka.ms/SharePointPnP) or shared by the community. This project's contributors include Microsoft and [community contributors](Contributors.md). Work is done as as open source community project. We welcome your input on issues and suggestions for new samples. We also welcome community contributions around new solutions. 

Please have a look on our [Contribution Guidance](./.github/CONTRIBUTING.md) before submitting your pull requests, so that we can get your contribution processed as fast as possible. Thanks!


> Sharing is caring!



### Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
