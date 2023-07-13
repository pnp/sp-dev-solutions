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

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 27, 2022|Initial release
2.0|July 13, 2023|Add samples for Pages API Phase 2

## Disclaimer

Some script samples retrieve information from your tenant or update data in your tenant.  Understand the impact of each sample script prior to running it; samples should be run using a non-production or "test" tenant account.

## App Registration

To configure the sample, you'll need to register a new application in the Microsoft [Application Registration Portal](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).

Follow these steps to register a new application:

1. Sign in to the [Application Registration Portal](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) using either your personal or work or school account.

2. Choose **New registration**.

3. Enter an application name, and choose **Register**.

4. Next you'll see the overview page for your app. Copy and save the **Application Id** field. You will need it later to complete the configuration process.

5. Under **Certificates & secrets**, choose **New client secret** and add a quick description. A new secret will be displayed in the **Value** column. Copy this password. You will need it later to complete the configuration process and it will not be shown again.

6. Under **API permissions**, choose **Add a permission > Microsoft Graph**.

7. Under **Application Permissions**, add the permissions/scopes required for the sample. This sample requires **Sites.ReadWrite.All**. Grant admin consent to the application.

As the final step in configuring the script, add an `.env` file in parent of the root folder. The file should contain the following information:

```plaintext
appId=<your application/client ID>
appSecret=<your application/client secret>
tenantId=<your tenant ID>
siteId=<source site ID>
```

Once changes are complete, save the file. After you've completed these steps and have received admin consent for your app, you'll be able to run the sample code as covered below.

### Notes:

- All code that interacts with the API is contained inside PagesController.ts

## Instructions

1) Clone this repository
2) Register an application using the steps above
3) Provide you application details in the `.env` file
4) Run `run .\Main.ps1` to execute the code

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-solutions/solutions/PagesAPISolution/PowerShell" />