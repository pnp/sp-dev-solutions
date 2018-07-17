# Web Part Logger

Web part usage logging capability is included as a based service call that is configured by a webpart-logging.config file that is located in the SiteAssets library of the root site collection of the SharePoint tenant.  The config is a JSON file, but has a different extension as the .json file extension is blocked by SharePoint by default.  The logging service call will send the following information.

- Web Part Name (as defined in the SPFx config)
- Absolute URL of the page the Web Part is on
- Version of the web part
- Custom Data 1 (currently set to log a 0 or 1 based on if the web part uses images from the Approved Image Lib)
- Custom Data 2 (currently not used)
- Custom Data 3 (currently not used)
- Custom Data 4 (currently not used)
- Custom Data 5 (currently not used)

## Configuration

The web part logger will try to get the webpart-logging.config from the /SiteAssets/webpart-logging.config location in the tenant.  The config has the following properties:

- brandImagePreviewUrl: the preview URL of Images that display from the Approved Image Library
- endpoint: the API endpoint that should be called to log the usage information
- apiKey: the API key that should be used with the usage to log the data