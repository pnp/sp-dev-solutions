# Setup & Configuration

The installation & configuration for Column Formatter is no different than most client-side webparts. The package is located [here](../../../assets/column-formatter.sppkg).

## Installation

To get started, you'll need to upload the web part package to your app (or site) catalog. This will require administrator rights so you may have to hand it off to someone in IT for these steps.

Upload or drag and drop the [package](../../../assets/column-formatter.sppkg) to the catalog:

![Dragging onto the App Catalog](./assets/AppCatalogUpload.png)

The Trust Confirmation dialog will appear. Depending on how you've [setup/enabled public CDNs in your environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/hosting-webpart-from-office-365-cdn#enable-cdn-in-your-office-365-tenant), the listed domains may vary from those shown below. Check the box to **Make this solution available to all sites in the organization** (this will allow any site to add it to a page, leave this unchecked if you only want to add it to specific sites). Click **Deploy**:

![Trust Confirmation](./assets/AppCatalogDeploy.png)

Additional details and examples of this process can be found [here] (https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#deploy-the-helloworld-package-to-app-catalog).

## Adding it to a Site

You can add Custom Formatter to a page (classic or modern) just as you would any other webpart.

![Add to a site](./assets/AddToPage.png)

>Note -If tenant deployment wasn't enabled, then the app will have to be added to the site like any other app.

## Configuration

The only configuration you might want to do is adjust the height to make it easier to use. By default, Column Formatter attempts to minimize it's height requirements to be sensitive to other page contents. However, you can adjust this to be taller (this makes editing much easier) by adjusting the Height property in the webpart's property toolpane (just choose to edit the webpart's properties).

## Next Steps

Now it's time to start using Column Formatter! Check out the [Getting Started](./getting-started.md) section.

![](https://telemetry.sharepointpnp.com/sp-dev-solutions/solutions/ColumnFormatter/wiki/Setup)
