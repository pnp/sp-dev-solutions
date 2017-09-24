## Change Request web parts

The Change Request Management web part provides the ability for the Change Request Triage team to address and manage change requests.

The My Change Requests web part allows you to submit change requests.

The Change Request web parts rely on the CommunityAppsLibrary NPM package which provides common functions used to set up and configure the SharePoint lists the web parts use.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean
gulp serve
gulp bundle
gulp package-solution


### Open source libraries

"@types/react": "0.14.46"
"@types/react-addons-shallow-compare": "0.14.17"
"@types/react-addons-test-utils": "0.14.15"
"@types/react-addons-update": "0.14.14"
"@types/react-dom": "0.14.18"
"@types/webpack-env": ">=1.12.1 <1.14.0"
"immutability-helper": "^2.2.2"
"communityappslibrary": "^1.4.0"
"lodash": "^4.17.4"
"moment": "^2.18.1"
"react": "15.4.2"
"react-datetime": "^2.8.10"
"react-dom": "15.4.2"
"react-raw-html": "^0.4.0"
