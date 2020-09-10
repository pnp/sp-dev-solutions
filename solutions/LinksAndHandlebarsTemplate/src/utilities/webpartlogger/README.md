# Web Part Logger

Web part usage logging capability is included as a POST based service call that is configured by a tenant app property. The logging service call will send the following payload.

- Web Part Name (as defined in the SPFx config)
- Absolute URL of the page the Web Part is on
- Version of the web part
- Custom Data 1 (currently set to log a 0 or 1 based on if the web part uses images from the Approved Image Lib)
- Custom Data 2 (currently not used)
- Custom Data 3 (currently not used)
- Custom Data 4 (currently not used)
- Custom Data 5 (currently not used)

## Configuration

The web part logger will try to get the configuration from the Tenant App Property named "LinksHandlebarsConfig" which is stored as a stringified JSON blob. The config has the following properties:

- brandImagePreviewUrl: the preview URL of Images that display from the Approved Image Library
- loggingUrl: the API endpoint that should be called to log the usage information
- loggingKey: the API key that should be used with the usage to log the data

See the [CreateTenantAppProperty.ps1](./CreateTenantAppProperty.ps1) script for an example of how to create the tenant app property using PnP PowerShell.
