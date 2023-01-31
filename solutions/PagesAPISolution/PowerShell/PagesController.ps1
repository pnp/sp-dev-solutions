<#
.COPYRIGHT
Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
See LICENSE in the project root for license information.
#>

####################################################

function Get-AuthToken {  
    
    $User = Read-Host -Prompt "Please specify your user principal name for Azure Authentication"
  
    $userUpn = New-Object "System.Net.Mail.MailAddress" -ArgumentList $User
  
    $tenant = $userUpn.Host
  
    Write-Host "Checking for AzureAD module..."
  
    $AadModule = Get-Module -Name "AzureAD" -ListAvailable
  
    if ($AadModule -eq $null) {
        Write-Host "AzureAD PowerShell module not found, looking for AzureADPreview"
        $AadModule = Get-Module -Name "AzureADPreview" -ListAvailable
    }
    if ($AadModule -eq $null) {
        write-host
        write-host "AzureAD Powershell module not installed..." -f Red
        write-host "Install by running 'Install-Module AzureAD' or 'Install-Module AzureADPreview' from an elevated PowerShell prompt" -f Yellow
        write-host "Script can't continue..." -f Red
        write-host
        exit
    }
  
    # Getting path to ActiveDirectory Assemblies
    # If the module count is greater than 1 find the latest version
    if ($AadModule.count -gt 1) {
        $Latest_Version = ($AadModule | select version | Sort-Object)[-1]
        $aadModule = $AadModule | ? { $_.version -eq $Latest_Version.version }
  
        # Checking if there are multiple versions of the same module found
        if ($AadModule.count -gt 1) {
            $aadModule = $AadModule | select -Unique
        }
  
        $adal = Join-Path $AadModule.ModuleBase "Microsoft.IdentityModel.Clients.ActiveDirectory.dll"
        $adalforms = Join-Path $AadModule.ModuleBase "Microsoft.IdentityModel.Clients.ActiveDirectory.Platform.dll"
    }
    else {
        $adal = Join-Path $AadModule.ModuleBase "Microsoft.IdentityModel.Clients.ActiveDirectory.dll"
        $adalforms = Join-Path $AadModule.ModuleBase "Microsoft.IdentityModel.Clients.ActiveDirectory.Platform.dll"
    }
  
    [System.Reflection.Assembly]::LoadFrom($adal) | Out-Null
  
    [System.Reflection.Assembly]::LoadFrom($adalforms) | Out-Null
  
    $clientId = "ENTER_YOUR_APP_ID_HERE"
  
    $redirectUri = "urn:ietf:wg:oauth:2.0:oob"
  
    $resourceAppIdURI = "https://graph.microsoft.com"
  
    $authority = "https://login.microsoftonline.com/$Tenant"
  
    try {
        $authContext = New-Object "Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext" -ArgumentList $authority
  
        # https://msdn.microsoft.com/en-us/library/azure/microsoft.identitymodel.clients.activedirectory.promptbehavior.aspx
        # Change the prompt behaviour to force credentials each time: Auto, Always, Never, RefreshSession
  
        $platformParameters = New-Object "Microsoft.IdentityModel.Clients.ActiveDirectory.PlatformParameters" -ArgumentList "Auto"
  
        $userId = New-Object "Microsoft.IdentityModel.Clients.ActiveDirectory.UserIdentifier" -ArgumentList ($User, "OptionalDisplayableId")
  
        $authResult = $authContext.AcquireTokenAsync($resourceAppIdURI, $clientId, $redirectUri, $platformParameters, $userId).Result
  
        # If the accesstoken is valid then create the authentication header
        if ($authResult.AccessToken) {
  
            # Creating header for Authorization token
            $authHeader = @{
                'Content-Type'  = 'application/json'
                'Accept' =  'application/json;odata.metadata=none'
                'Authorization' = "Bearer " + $authResult.AccessToken
                'ExpiresOn'     = $authResult.ExpiresOn
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

    $rootUrl = "https://graph.microsoft.com/beta/sites"
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
    $rootUrl = "https://graph.microsoft.com/beta/sites"
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
    $rootUrl = "https://graph.microsoft.com/beta/sites"
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
