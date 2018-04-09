## site-designs-studio

This SPFx WebPart is currently in Beta version
Please try it out and give some feedback.

The WebPart has only be tested in both local and hosted Workbenchs so far, not in real Modern Pages.

Upcoming features I plan to deliver
- Ordering of associated Site Scripts in Site Designs
- Check and proper handling of current user access rights
- Improve user messages and use localized strings
- Some UI fine-tuning
- ...

Please submit any suggestions or report bugs in the issues

## Install on a Modern Site
To install this application, go to /package and execute install.ps1
'''
install.ps1 -Url https://yourtenant.sharepoint.com/sites/yoursite
'''

### requirements
- a recent version of PnP PowerShell should be installed
- Office 365 CDN must be enabled on the target tenant

### Actions of this PowerShell script
- adds the solution to the app catalog
- deploys it tenant-wide
- Create a Modern page on the target site
- Adds the Site Designs Studio WebPart to the new page
