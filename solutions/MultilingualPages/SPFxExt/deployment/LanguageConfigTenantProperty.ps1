
$AdminURL = "https://<TENANT>-admin.sharepoint.com"
$username = "<TENANT_ADMIN_ACCOUNT>" 
$userCredential = Get-Credential -UserName $username -Message "Type the password."
[string]$languageJsonString = '{"languages": [{"code": "en-US", "description": "English (United States)"}, {"code": "ja-JP", "description": "Japanese"}, {"code": "de-DE", "description": "German"}, {"code": "es-ES", "description": "Spanish"}, {"code": "fr-FR", "description": "French"}, {"code": "pt-PT", "description": "Portuguese"}, {"code": "ru-RU", "description": "Russian"}, {"code": "zh-Hans", "description": "Chinese (Simplified)"}]}'

try {
	$conn = Connect-PnPOnline -Url $AdminURL -Credentials $userCredential -ReturnConnection
	Set-PnPStorageEntity -Key LanguageConfig -Value $languageJsonString -Description "Language Configuration JSON"
    Get-PnPStorageEntity -Key LanguageConfig
}
catch {
	Write-Error "Failed to create Storage Entity 'LanguageConfig'"
	Write-Error $_.Exception
}
