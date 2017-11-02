# Change Request web parts

## Summary
The Change Request management web parts provide a simple tracking tool for change requests for your team.  A change request could serve as the foundation for a wide range of processes, from website issue tracking to equipment repair and beyond.  The Change Request management tool is customizable so that you can tailor the parts to your scenario.

There are two web parts included with Change Request Management:

* A "My Change Requests" web part is a submission tool for users across your organization to submit new change requests.
* A "Change Requests Management" web part lets a triage time view all of the inbound requests, assign them to team mates, and otherwise discuss them.

![Issues Screenshot](./assets/screenshot.png)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-v1.1-green.svg)

## Applies to

* [SharePoint Framework](https://dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Prerequisites
 
None

## Solution

Solution                     | Author                                     			|
---------------------------- | ---------------------------------------------------- |
ChangeRequests               | Mike Ammerlaan (Microsoft) @mammerla                 |
ChangeRequests               | Todd Baginski (Microsoft MVP, Canviz) @tbag          |
ChangeRequests               | Alex Chen (Canviz) @alexchx  						|
ChangeRequests               | Luis Lu (Canviz) @stluislu   						|
ChangeRequests               | Theodore Shi (Canviz) @TheodoreShi                   |
ChangeRequests               | Max Liu (Canviz) @maxliu0621 						|
ChangeRequests               | Cloris Sun (Canviz) @suheart                         |
ChangeRequests               | Benny Zhang (Canviz)                                 |
ChangeRequests               | Cindy Yan (Canviz)                                   |


## Version history

Version | Date               | Comments
------- | ------------------ | --------
1.0     | September 27, 2017 | Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Move to solution folder
- In the command line run:
  - `npm install`
  - `gulp serve`

## Features

### Site Owner Installation

When you add the web part for the first time, a user will need to create the backing lists within the site that support storage of Change Request entries.  A user with list creation permissions within the site will need to click the "Create Lists" button that shows up within the web part.

### Application data structure

Behind the scenes, the Change Request Management part uses two separate lists.  The Change Request list stores items as they are opened by users.  A separate Change Request Discussions list contains the discussion items and assignments for every Change Request item.  With this, you can independently secure the Discussion items to just your team, to keep private conversations about an item separate from the core item itself. 

The Change Request Management web part provides the ability for the Change Request Triage team to address and manage change requests.

The My Change Requests web part allows you to submit change requests.

The Change Request web parts rely on the CommunityAppsLibrary NPM package which provides common functions used to set up and configure the SharePoint lists the web parts use.

<img src="https://telemetry.sharepointpnp.com/sp-dev-solutions/solutions/changerequests" />
