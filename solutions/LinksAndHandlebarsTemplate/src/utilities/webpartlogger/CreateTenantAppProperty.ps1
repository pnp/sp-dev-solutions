$site = ""
$config = '{
"brandImagePreviewUrl": "<tenant>.sharepoint.com/<pathToSite>/_layouts/15/getpreview.ashx",
"loggingKey": "",
"loggingUrl": ""
}'


try {
  Connect-PnPOnline -Url $site -UseWebLogin
  Set-PnPStorageEntity -Key LinksHandlebarsConfig -Value $config -Description "Configuration for Links And Handlebars Teamplate PnP web parts"
  Get-PnPStorageEntity -Key LinksHandlebarsConfig
}
catch {
  Write-Error "Failed to authenticate to $site"
  Write-Error $_.Exception
}