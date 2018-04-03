# Minimal Path to Awesome

Getting Column Formatter up and running locally.

## Install prerequisites

Column Formatter is a SharePoint Framework (SPFx) client-side web part targeted at O365 (Not SP2016). This means you'll need all the same tooling as described in the [Set up your SharePoint Framework development environment guide](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment).

If you've already been working on SPFx, then you're good to go.

## Get the local version of Column Formatter

- fork this repository
- clone your fork
- Navigate to the Column Formatter directory
- in the command line:
  - run `npm install` to restore dependencies
  - run `gulp serve` to serve the project

> **Note** - There are some features that are not supported in the local workbench (such as saving/loading to a list). If you want to work on these features then you'll need an O365 tenant and you'll want to use the online workbench (_layouts/15/workbench.aspx)

### Documentation

Column Formatter uses [MkDocs](http://www.mkdocs.org) to publish documentation pages. See more information about installing MkDocs on your operating system at http://www.mkdocs.org/#installation.

Also, the documentation uses a custom MkDocs theme that should be installed as well. See [Material theme for MkDocs](https://squidfunk.github.io/mkdocs-material/) (`pip install mkdocs-material`). In addition, [PyMdown-extensions](https://squidfunk.github.io/mkdocs-material/extensions/pymdown/#installation) are used (to show those sweet emoji), so you'll want to install that too (`pip install pymdown-extensions`).

Once you have MkDocs installed on your machine, in the command line:

- run `cd ./docs/documentation` to change directory to where the manual pages are stored
- run `mkdocs serve` to start the local web server with MkDocs and view the documentation in the [web browser](http://localhost:8000)

You can also **skip all of that** and just read the [documentation](../documentation/docs/index.md) directly in the browser (but without the fancy navigation and search). 

<img src="https://telemetry.sharepointpnp.com/sp-dev-solutions/solutions/ColumnFormatter/guides/MPA" />