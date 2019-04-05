# Lanugages Configuration

Languages that the solution supports will be defined in a [SharePoint Online Tenant Property](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/tenant-properties). The powershell that creates the property is included in the `deployment` folder in the `LanguageConfigTenantProperty.ps1` file. You will need tenant admin privileges to create this property but everyone has rights to read the property.

The value of the custom property is a stringified JSON object that represents the languages that the tenant will support:

- Language code (ISO 639-1) - this is a two part code, e.g. en-US
- Description

Please see an example file in the languages.json file.