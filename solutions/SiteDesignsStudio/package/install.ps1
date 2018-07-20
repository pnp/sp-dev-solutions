param (
  [Parameter(Mandatory=$true)]
  [string]$Url,
  [string]$PageName = "SiteDesignsStudio",
  [string]$PageTitle = "Site Designs Studio",
  [switch]$RequireInstall=$false
)

Connect-PnPOnline -Url $Url

################################################
# DO NOT CHANGE THE FOLLOWING PARAMETERS
################################################
$WebPartName = "Site Designs Studio"
################################################
# Add the Solution to the App Catalog
$app = Add-PnPApp -Path .\site-designs-studio.sppkg
# Deploy the Solution
Publish-PnPApp -Identity $app -SkipFeatureDeployment
# Install the app if this argument is specified
If ($RequireInstall) {
  Install-PnPApp -Identity $app
}
# Add a page to host the WebPart
$page = Add-PnPClientSidePage -Name $PageName -LayoutType Article -CommentsEnabled:$false
# Update the page title
Set-PnPClientSidePage -Identity $page -Title $PageTitle -Publish
# Add a one-column section to the page
Add-PnPClientSidePageSection -Page $page -SectionTemplate OneColumn
# Get the Site Designs Studio WebPart
$webpart = Get-PnPAvailableClientSideComponents -Page $page -Component $WebPartName
# Add the WebPart to the page
Add-PnPClientSideWebPart -Page $page -Component $webpart
