# PowerShell example

## Description

This repository contains very simple PowerShell sample scripts that implements the Microsoft Graph SharePoint Pages API.

The following samples are included in this repository:

- GET all pages from a SharePoint site
- GET a specific page
- POST a new page
- PATCH an existing page
- DELETE a page
- POST to publish a page

The scripts are licensed "as-is." under the [MIT License](../../LICENSE).

## Disclaimer

Some script samples retrieve information from your tenant or update data in your tenant.  Understand the impact of each sample script prior to running it; samples should be run using a non-production or "test" tenant account.

## Prerequisites

Use of these Microsoft Graph SharePoint Pages API PowerShell samples requires the following:
* Install the AzureAD PowerShell module by running 'Install-Module AzureAD' or 'Install-Module AzureADPreview' from an elevated PowerShell prompt
* An account with permissions to operate SharePoint page.
* PowerShell v5.0 on Windows 10 x64 (PowerShell v4.0 is a minimum requirement for the scripts to function correctly)
* Note: For PowerShell 4.0 you will require the [PowershellGet Module for PS 4.0](https://www.microsoft.com/en-us/download/details.aspx?id=51451) to enable the usage of the Install-Module functionality
* First time usage of these scripts requires a Global Administrator of the Tenant to accept the permissions of the application
* Azure AD v2 App id (Native Application) from <https://apps.dev.microsoft.com> with `Sites.ReadWrite.All(Delegated)` permissions.
* Set `urn:ietf:wg:oauth:2.0:oob` as one of the `redirect_uri` of the App.

## Getting Started

After the prerequisites are installed or met, perform the following steps to use these scripts:

#### 1. Script usage

* Download the contents of the repository to your local Windows machine
* Extract the files to a local folder (for example, C:\PagesAPISamples)
* Run PowerShell x64 from the start menu
* Browse to the directory (for example, cd C:\PagesAPISamples)
* Update the `$clientId` variable with your [App id](https://apps.dev.microsoft.com).
* Run `run .\Main.ps1`

#### 2. Authentication with Microsoft Graph

The first time you run these scripts you will be asked to provide an account to authenticate with the service:
```
Please specify your user principal name for Azure Authentication:
```
Once you have provided a user principal name a popup will open prompting for your password. After a successful authentication with Azure Active Directory the user token will last for an hour, once the hour expires within the PowerShell session you will be asked to re-authenticate.

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-solutions/solutions/PagesAPISolution/PowerShell" />