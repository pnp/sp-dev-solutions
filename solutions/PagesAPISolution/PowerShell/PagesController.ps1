<#
.COPYRIGHT
Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
See LICENSE in the project root for license information.
#>

####################################################

function Get-AuthToken {  

    try {
        # Parameters
        $clientId = $envVariables["appId"]
        $clientSecret = $envVariables["appSecret"]
        $tenantId = $envVariables["tenantId"]

        $resource = "https://graph.microsoft.com"
        $authority = "https://login.microsoftonline.com/$tenantId"

        # Construct the token endpoint URL
        $tokenEndpoint = "$authority/oauth2/token"

        # Build the request body
        $body = @{
            client_id     = $clientId
            client_secret = $clientSecret
            grant_type    = "client_credentials"
            resource      = $resource
        }

        # Send the token request
        $tokenResponse = Invoke-RestMethod -Uri $tokenEndpoint -Method POST -Body $body

        if ($tokenResponse.access_token) {
  
            # Creating header for Authorization token
            $authHeader = @{
                'Content-Type'  = 'application/json'
                'Accept'        = 'application/json;odata.metadata=none'
                'Authorization' = "Bearer " + $tokenResponse.access_token
                'ExpiresOn'     = $tokenResponse.expires_on
            }
            return $authHeader
        }
        else {
            Write-Host
            Write-Host "Authorization Access Token is null, please re-run authentication..." -ForegroundColor Red
            Write-Host
            break
        }
    }
    catch {
        write-host $_.Exception.Message -f Red
        write-host $_.Exception.ItemName -f Red
        write-host
        break
    }
}
  
Function Get-Pages([string]$siteId, [object]$authToken) {
  
    [cmdletbinding()]
  
    $graphApiVersion = "beta"
    $resource = "sites/$siteId/pages"
  
    try {
        $uri = "https://graph.microsoft.com/$graphApiVersion/$($resource)"
        $pages = (Invoke-RestMethod -Uri $uri -Headers $authToken -Method Get).value
        $count = $pages.Count
        Write-Host "Get all $count pages."
        return $pages
    } 
    catch {
        $ex = $_.Exception
        $errorResponse = $ex.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd();
        Write-Host "Response content:`n$responseBody" -f Red
        Write-Error "Request to $Uri failed with HTTP Status $($ex.Response.StatusCode) $($ex.Response.StatusDescription)"
        write-host
        break
    }
}
  
Function Get-Page([string]$siteId, [string]$pageId, [object]$authToken) {
    
    [cmdletbinding()]

    $rootUrl = "https://canary.graph.microsoft.com/testprodbetapages-api-df/sites"
    $resource = "$($siteId)/pages/$($pageId)?expand=canvasLayout"
    
    try {
        $uri = "$rootUrl/$($resource)"
        $page = (Invoke-RestMethod -Uri $uri -Headers $authToken -Method Get)
        Write-Host "Get page(ID: $pageId) successfully."
        return $page
    } 
    catch {
        $ex = $_.Exception
        $errorResponse = $ex.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd();
        Write-Host "Response content:`n$responseBody" -f Red
        Write-Error "Request to $Uri failed with HTTP Status $($ex.Response.StatusCode) $($ex.Response.StatusDescription)"
        write-host
        break
    }
}
  
Function Remove-Page([string]$siteId, [string]$pageId, [object]$authToken) {
    [cmdletbinding()]
    
    $graphApiVersion = "beta"
    $resource = "sites/$($siteId)/pages/$($pageId)"
    
    try {
        $uri = "https://graph.microsoft.com/$graphApiVersion/$($resource)"
        Invoke-RestMethod -Uri $uri -Headers $authToken -Method Delete
        Write-Host "Delete page($pageId) successfully."
    } 
    catch {
        $ex = $_.Exception
        $errorResponse = $ex.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd();
        Write-Host "Response content:`n$responseBody" -f Red
        Write-Error "Request to $Uri failed with HTTP Status $($ex.Response.StatusCode) $($ex.Response.StatusDescription)"
        write-host
        break
    }
} 

Function Publish-Page([string]$siteId, [string]$pageId, [object]$authToken) {
    [cmdletbinding()]
    
    $graphApiVersion = "beta"
    $resource = "sites/$($siteId)/pages/$($pageId)/publish"
    
    try {
        $uri = "https://graph.microsoft.com/$graphApiVersion/$($resource)"
        Invoke-RestMethod -Uri $uri -Headers $authToken -Method Post
        Write-Host "Publish page($pageId) successfully."
    } 
    catch {
        $ex = $_.Exception
        $errorResponse = $ex.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd();
        Write-Host "Response content:`n$responseBody" -f Red
        Write-Error "Request to $Uri failed with HTTP Status $($ex.Response.StatusCode) $($ex.Response.StatusDescription)"
        write-host
        break
    }
}

Function Update-Page([string]$siteId, [string]$pageId, [object]$payload, [object]$authToken) {

    [cmdletbinding()]
    $rootUrl = "https://canary.graph.microsoft.com/testprodbetapages-api-df/sites"
    $resource = "$($siteId)/pages/$($pageId)"
    
    try {
        $uri = "$rootUrl/$($resource)"
        $page = (Invoke-RestMethod -Uri $uri -Headers $authToken -Method Patch -Body $payload)
        Write-Host "Promote page(ID: $($page.id), URL: $($page.webUrl)) successfully."
        return $page
    } 
    catch {
        $ex = $_.Exception
        $errorResponse = $ex.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd();
        Write-Host "Response content:`n$responseBody" -f Red
        Write-Error "Request to $Uri failed with HTTP Status $($ex.Response.StatusCode) $($ex.Response.StatusDescription)"
        write-host
        break
    }
}
Function New-Page([string]$siteId, [object]$payload, [object]$authToken) {

    [cmdletbinding()]
    $rootUrl = "https://canary.graph.microsoft.com/testprodbetapages-api-df/sites"
    $resource = "$($siteId)/pages"
    
    try {
        $uri = "$rootUrl/$($resource)"
        $page = (Invoke-RestMethod -Uri $uri -Headers $authToken -Method Post -Body $payload)
        Write-Host "Create page(ID: $($page.id), URL: $($page.webUrl)) successfully."
        return $page
    } 
    catch {
        $ex = $_.Exception
        $errorResponse = $ex.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd();
        Write-Host "Response content:`n$responseBody" -f Red
        Write-Error "Request to $Uri failed with HTTP Status $($ex.Response.StatusCode) $($ex.Response.StatusDescription)"
        write-host
        break
    }
}


Function ModifyPage([object] $page) {
    # add your logic here to modify the page,
    # e.g. add a section, add a column, modify metadatas etc.
    $page.Name = "sample name"
    return $page
}