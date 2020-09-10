# LinkPickerPanel component

## Usage

    <LinkPickerPanel

        // CSS class (currently not used)
        className = <string>

        // Absolute URL for SPWeb
        webAbsUrl = <string>

        // Type of link to pick (see below)
        linkType = <LinkType>
    />

The link type is used to filter the files shown in the document browser, and to add
validation checking for data URLs in the link entry form. The link entry form does not enforce link type; for example a user can enter the URL of an .aspx file even if pages aren't part of the link type.

* doc - select a document
* page - select a page
* image - select an image
* folder - select a folder
* any - select any
* all - no filter

LinkType is a bitwise enumeration, so you can use the OR operator to allow selecting more link types, with the exception of all. For example:

    LinkType.folder | LinkType.doc | LinkType.image

will select documents, pages, and images. The any type is the logical OR of the other values.

To open and use the panel, obtain a reference to the panel React component using a ref function:

      private linkPickerPanel: LinkPickerPanel;

      // ...

      <LinkPickerPanel
            webAbsUrl={this.props.context.pageContext.web.absoluteUrl}
            linkType={ LinkType.any }
            ref={ (ref) => {this.linkPickerPanel = ref;}} />

Then call the pickLink() method on the LinkPickerPanel component to obtain a link from the user. pickLink() returns a promise, which will be rejected if the user closes the link picker without selecting a link.

      this.linkPickerPanel.pickLink()
      .then ((url) => {
        this.props.setUrl(url);
      });

This design was chosen to allow the link picker to manage its own state, as it may be used directly within an SPFx web part.

## Configuring Approved Images

    The ApprovedImageLibs.config file in this folder contains the format that is expected for the configuration.  This file uses the .config extension due to issues getting a json file from a SharePoint  The schema of the JSON file is as follows:

        * The host array contains objects with 2 properties:
            * libUrl: the absolute URL to the library that you want included in the approved images tab
            * cdnUrl: the absolute URL to the CDN front to the library if one exists
    
    The default setting is for the package to look for the ApprovedImageLibs.json in the SiteAssets root folder on the root site of the SharePoint tenant.
