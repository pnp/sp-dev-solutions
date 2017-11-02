# Time Away Web Parts

## Summary

The Time Away web part package provides a simple mechanism to track major away-times for team members.  

The Time Away web part contains two web parts:

* A "Your Time Away" web part lets team members manage their time away from the office.
* A "Time Away Summary" web part shows the overall set of time ways for the next two weeks in an organization.

When you add the web part for the first time, a user will need to create the backing lists within the site that support storage of Time Away entries.  A user with list creation permissions within the site will need to click the "Create Lists" button that shows up within the web part.

![Time Away Screenshot](./assets/timeaway.png)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.0-green.svg)

## Applies to

* [SharePoint Framework](https://dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Prerequisites
 
None.

## Solution

Solution                     | Author                                     			|
---------------------------- | ---------------------------------------------------- |
TimeAway                     | Mike Ammerlaan (Microsoft) @mammerla                 |
TimeAway                     | Todd Baginski (Microsoft MVP, Canviz) @tbag          |
TimeAway                     | Alex Chen (Canviz) @alexchx  						|
TimeAway                     | Luis Lu (Canviz) @stluislu   						|
TimeAway                     | Theodore Shi (Canviz) @TheodoreShi                   |
TimeAway                     | Max Liu (Canviz) @maxliu0621 						|
TimeAway                     | Cloris Sun (Canviz) @suheart                         |
TimeAway                     | Benny Zhang (Canviz)                                 |
TimeAway                     | Cindy Yan (Canviz)                                   |

## Version history

Version  | Date               | Comments
-------- | ------------------ | --------
1.0      | September 27, 2017 | Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Move to solution folder
- in the command line run:
  - `npm install`
  - `gulp serve`

## Features

### Options and Configuration

You can choose to use the web parts separately -- for example, place the "Your Time Away" web part on a page for users to manage their personal information, and the Time Away Summary part on your home page.   Alternatively, you can just use the Time Away Summary web part by itself.  It optionally will show a "Edit your Time Away" summary link that users can use to adjust their time away.

You can also toggle whether the web part willl show a full week, or only show Monday/Tuesday/Wednesday/Thursday/Friday. 

Finally, you can also choose to use content approval features in SharePoint to set up simple notifications or approvals. Via a setting in the Time Away Summary web part, you can choose to hide Time Away out-of-office entries unless the Approval field is set to Approved. This gives administrators the ability to connect SharePoint approval features, or a workflow product like Microsoft Flow, tied to the Approval field in the Time Away list, to let managers choose to approve or hide fields.

<img src="https://telemetry.sharepointpnp.com/sp-dev-solutions/solutions/timeaway" />

