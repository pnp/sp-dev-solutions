## Time Away web parts

The Time Away Summary web part displays a list of time away for users in your organization and allows you to view and edit your time away.

The My Time Away web part allows you to view and edit your time away.

The Time Away web parts rely on the CommunityAppsLibrary NPM package which provides common functions used to set up and configure the SharePoint lists the web parts use.

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

"@types/lodash": "https://registry.npmjs.org/@types/lodash/-/lodash-4.14.52.tgz"
"@types/react": "0.14.46"
"@types/react-addons-shallow-compare": "0.14.17"
"@types/react-addons-test-utils": "0.14.15"
"@types/react-addons-update": "0.14.14"
"@types/react-dom": "0.14.18"
"@types/webpack-env": ">=1.12.1 <1.14.0"
"communityappslibrary": "^1.2.0"
"immutability-helper": "^2.2.0"
"lodash": "https://registry.npmjs.org/lodash/-/lodash-4.15.0.tgz"
"moment": "^2.18.1"
"office-ui-fabric-react": "^2.34.2"
"react": "15.4.2"
"react-datetime": "^2.8.10"
"react-dom": "15.4.2"