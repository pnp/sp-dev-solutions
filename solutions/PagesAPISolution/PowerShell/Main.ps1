<#
.COPYRIGHT
Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
See LICENSE in the project root for license information.
#>

####################################################

. ".\PagesController.ps1"

$envFileContent = Get-Content -Path '../.env'

$envVariables = @{}
foreach ($line in $envFileContent) {
    $key, $value = $line -split '=', 2
    $envVariables[$key] = $value
}

# Uncomment to run the samples

# Scenario 0: Get Token

Get-AuthToken

###############################################################################

# Scenario 1: Copy page to multiple sites
# Note: This call won't copy assets to the target site. Use pages with only cdn assets.

# $sourceSiteId = $envVariables["siteId"]
# $sourcePageId = "<input your source page id here>"
# $targetSiteIds = "<input your site id here>", "<another site id>"

# $authToken = Get-AuthToken
# $page = Get-Page -siteId $sourceSiteId -pageId $sourcePageId -authToken $authToken 
# foreach ($siteId in $targetSiteIds) {
#   $newPage = ConvertTo-Json (ModifyPage $page) -Depth 100 -Compress
#   $createdPage = New-Page -siteId $siteId -payload $newPage -authToken $authToken 
#   Publish-Page -siteId $siteId -pageId $createdPage.id -authToken $authToken 
# }

###############################################################################

# Scenario 2: Delete page modified before the target date

# $siteId = "<input your site id here>"
# $date = "2000-01-01" # modify this to your target date

# $authToken = Get-AuthToken
# $pages = Get-Pages -siteId $siteId -authToken $authToken | Where-Object { $_.lastModifiedDateTime -lt $date }
# foreach ($page in $pages) {
#   Remove-Page -siteId $siteId -pageId $page.id -authToken $authToken
# }

###############################################################################

# Scenario 3: Promote pages

# $siteId = "<input your site id here>"
# $pageIds = "<input your page id here>", "<another page id>"

# $payload = @"
# {
#   "promotionKind": "newsPost"
# }
# "@

# $authToken = Get-AuthToken
# foreach ($id in $pageIds)
# {
#   $result = Update-Page -siteId $siteId  -pageId $id -payload $payload -authToken $authToken
# }

###############################################################################
