Execute in bash
-----------------------
npm i -SE @microsoft/sp-core-library@1.10.0 @microsoft/sp-lodash-subset@1.10.0 @microsoft/sp-webpart-base@1.10.0 @microsoft/sp-property-pane@1.10.0 @types/react@16.8.8 @types/react-dom@16.8.3 office-ui-fabric-react@6.189.2 react@16.8.5 react-dom@16.8.5 @types/webpack-env@1.13.1 @types/es6-promise@0.0.33
npm i -DE @microsoft/sp-build-web@1.10.0 @microsoft/sp-module-interfaces@1.10.0 @microsoft/sp-webpart-workbench@1.10.0 @microsoft/sp-tslint-rules@1.10.0 @microsoft/rush-stack-compiler-3.3@0.3.5 tslint-microsoft-contrib@5.0.0 @types/chai@3.4.34 @types/mocha@2.2.38 ajv@5.2.2
npm un -S @types/react-addons-shallow-compare @types/react-addons-update @types/react-addons-test-utils
mkdir /Users/waldek/github/waldekmastykarz/sp-dev-solutions/solutions/ChangeRequests/teams_changeRequestManagementWebPart
mkdir /Users/waldek/github/waldekmastykarz/sp-dev-solutions/solutions/ChangeRequests/teams_myChangeRequestsWebPart
cat > /Users/waldek/github/waldekmastykarz/sp-dev-solutions/solutions/ChangeRequests/teams_changeRequestManagementWebPart/manifest.json << EOF 
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
  "packageName": "Change Request Management",
  "id": "c9db9295-9313-477a-80e4-b1727e700c40",
  "version": "0.1",
  "developer": {
    "name": "SPFx + Teams Dev",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
  "name": {
    "short": "Change Request Management"
  },
  "description": {
    "short": "Provides a simple way to manage inbound change requests coming from users.",
    "full": "Provides a simple way to manage inbound change requests coming from users."
  },
  "icons": {
    "outline": "tab20x20.png",
    "color": "tab96x96.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId=c9db9295-9313-477a-80e4-b1727e700c40",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "validDomains": [
    "*.login.microsoftonline.com",
    "*.sharepoint.com",
    "*.sharepoint-df.com",
    "spoppe-a.akamaihd.net",
    "spoprod-a.akamaihd.net",
    "resourceseng.blob.core.windows.net",
    "msft.spoppe.com"
  ],
  "webApplicationInfo": {
    "resource": "https://{teamSiteDomain}",
    "id": "00000003-0000-0ff1-ce00-000000000000"
  }
}
EOF
cat > /Users/waldek/github/waldekmastykarz/sp-dev-solutions/solutions/ChangeRequests/teams_myChangeRequestsWebPart/manifest.json << EOF 
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
  "packageName": "My Change Requests",
  "id": "fc1fa611-07f5-4af4-b9eb-d59da23fec1f",
  "version": "0.1",
  "developer": {
    "name": "SPFx + Teams Dev",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
  "name": {
    "short": "My Change Requests"
  },
  "description": {
    "short": "Lets a user manage a set of change requests.",
    "full": "Lets a user manage a set of change requests."
  },
  "icons": {
    "outline": "tab20x20.png",
    "color": "tab96x96.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId=fc1fa611-07f5-4af4-b9eb-d59da23fec1f",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "validDomains": [
    "*.login.microsoftonline.com",
    "*.sharepoint.com",
    "*.sharepoint-df.com",
    "spoppe-a.akamaihd.net",
    "spoprod-a.akamaihd.net",
    "resourceseng.blob.core.windows.net",
    "msft.spoppe.com"
  ],
  "webApplicationInfo": {
    "resource": "https://{teamSiteDomain}",
    "id": "00000003-0000-0ff1-ce00-000000000000"
  }
}
EOF
cp /Users/waldek/github/waldekmastykarz/office365-cli/dist/o365/spfx/commands/project/project-upgrade/assets/tab20x20.png /Users/waldek/github/waldekmastykarz/sp-dev-solutions/solutions/ChangeRequests/teams_changeRequestManagementWebPart/tab20x20.png
cp /Users/waldek/github/waldekmastykarz/office365-cli/dist/o365/spfx/commands/project/project-upgrade/assets/tab20x20.png /Users/waldek/github/waldekmastykarz/sp-dev-solutions/solutions/ChangeRequests/teams_myChangeRequestsWebPart/tab20x20.png
cp /Users/waldek/github/waldekmastykarz/office365-cli/dist/o365/spfx/commands/project/project-upgrade/assets/tab96x96.png /Users/waldek/github/waldekmastykarz/sp-dev-solutions/solutions/ChangeRequests/teams_changeRequestManagementWebPart/tab96x96.png
cp /Users/waldek/github/waldekmastykarz/office365-cli/dist/o365/spfx/commands/project/project-upgrade/assets/tab96x96.png /Users/waldek/github/waldekmastykarz/sp-dev-solutions/solutions/ChangeRequests/teams_myChangeRequestsWebPart/tab96x96.png
cat > tslint.json << EOF 
{
  "rulesDirectory": [
    "tslint-microsoft-contrib"
  ],
  "rules": {
    "class-name": false,
    "export-name": false,
    "forin": false,
    "label-position": false,
    "member-access": true,
    "no-arg": false,
    "no-console": false,
    "no-construct": false,
    "no-duplicate-variable": true,
    "no-eval": false,
    "no-function-expression": true,
    "no-internal-module": true,
    "no-shadowed-variable": true,
    "no-switch-case-fall-through": true,
    "no-unnecessary-semicolons": true,
    "no-unused-expression": true,
    "no-use-before-declare": true,
    "no-with-statement": true,
    "semicolon": true,
    "trailing-comma": false,
    "typedef": false,
    "typedef-whitespace": false,
    "use-named-parameter": true,
    "variable-name": false,
    "whitespace": false
  }
}
EOF
rm config/tslint.json
cat > src/index.ts << EOF 
// A file is required to be in the root of the /src directory by the TypeScript compiler

EOF

./.yo-rc.json
-------------
Update version in .yo-rc.json:
{
  "@microsoft/generator-sharepoint": {
    "version": "1.10.0"
  }
}

Update isDomainIsolated in .yo-rc.json:
{
  "@microsoft/generator-sharepoint": {
    "isDomainIsolated": false
  }
}

Update isCreatingSolution in .yo-rc.json:
{
  "@microsoft/generator-sharepoint": {
    "isCreatingSolution": true
  }
}

Update packageManager in .yo-rc.json:
{
  "@microsoft/generator-sharepoint": {
    "packageManager": "npm"
  }
}

Update componentType in .yo-rc.json:
{
  "@microsoft/generator-sharepoint": {
    "componentType": "webpart"
  }
}

Update environment in .yo-rc.json:
{
  "@microsoft/generator-sharepoint": {
    "environment": "spo"
  }
}

Remove framework in .yo-rc.json:
{
  "@microsoft/generator-sharepoint": {
    "framework": ""
  }
}


./tsconfig.json
---------------
Update tsconfig.json extends property:
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-3.3/includes/tsconfig-web.json"
}

Update tsconfig.json inlineSources value:
{
  "compilerOptions": {
    "inlineSources": false
  }
}

Update tsconfig.json strictNullChecks value:
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}

Update tsconfig.json noUnusedLocals value:
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}

Update tsconfig.json outDir value:
{
  "compilerOptions": {
    "outDir": "lib"
  }
}

Update tsconfig.json include property:
{
  "include": [
    "src/**/*.ts"
  ]
}

Update tsconfig.json exclude property:
{
  "exclude": [
    "node_modules",
    "lib"
  ]
}

Update module type in tsconfig.json:
{
  "compilerOptions": {
    "module": "esnext"
  }
}

Update moduleResolution in tsconfig.json:
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}

Update skipLibCheck in tsconfig.json:
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}

Add ./node_modules/@types to typeRoots in tsconfig.json:
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types"
    ]
  }
}

Add ./node_modules/@microsoft to typeRoots in tsconfig.json:
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@microsoft"
    ]
  }
}

Remove es6-collections type in tsconfig.json:
{
  "compilerOptions": {
    "types": [
      "es6-collections"
    ]
  }
}

Add es5 lib in tsconfig.json:
{
  "compilerOptions": {
    "lib": [
      "es5"
    ]
  }
}

Add dom lib in tsconfig.json:
{
  "compilerOptions": {
    "lib": [
      "dom"
    ]
  }
}

Add es2015.collection lib in tsconfig.json:
{
  "compilerOptions": {
    "lib": [
      "es2015.collection"
    ]
  }
}

Enable tsconfig.json experimental decorators:
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}


src/webparts/myChangeRequestsWebPart/MyChangeRequestsWebPart.ts
---------------------------------------------------------------
Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneTextField } from "@microsoft/sp-property-pane";


./package.json
--------------
Add resolution for package @types/react:
{
  "resolutions": {
    "@types/react": "16.8.8"
  }
}

Add package.json property:
{
  "main": "lib/index.js"
}


src/webparts/changeRequestManagementWebPart/components/Container/CRManagementContainer.module.scss
--------------------------------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/changeRequestManagementWebPart/components/List/CRManagementList.module.scss
----------------------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/changeRequestManagementWebPart/components/PublicSection/CRManagementPublicSection.module.scss
----------------------------------------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/changeRequestManagementWebPart/components/Tab/CRManagementTab.module.scss
--------------------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/changeRequestManagementWebPart/components/TeamSection/CRManagementTeamSection.module.scss
------------------------------------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/myChangeRequestsWebPart/components/Container/MyCRContainer.module.scss
-----------------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/myChangeRequestsWebPart/components/Item/MyCRItem.module.scss
-------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/myChangeRequestsWebPart/components/List/MyCRList.module.scss
-------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/myChangeRequestsWebPart/components/NewDialog/MyCRNewDialog.module.scss
-----------------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/myChangeRequestsWebPart/components/NewForm/MyCRNewForm.module.scss
-------------------------------------------------------------------------------
Add scss file import:
@import '~office-ui-fabric-react/dist/sass/References.scss'


src/webparts/changeRequestManagementWebPart/ChangeRequestManagementWebPart.manifest.json
----------------------------------------------------------------------------------------
Update the supportedHosts property in the manifest:
{
  "supportedHosts": ["SharePointWebPart"]
}

Update schema in manifest:
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}

Update the safeWithCustomScriptDisabled property in the manifest:
{
  "safeWithCustomScriptDisabled": false
}

Update version in manifest to use automated component versioning:
{
      "version": "*",
}


src/webparts/myChangeRequestsWebPart/MyChangeRequestsWebPart.manifest.json
--------------------------------------------------------------------------
Update the supportedHosts property in the manifest:
{
  "supportedHosts": ["SharePointWebPart"]
}

Update schema in manifest:
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}

Update the safeWithCustomScriptDisabled property in the manifest:
{
  "safeWithCustomScriptDisabled": false
}

Update version in manifest to use automated component versioning:
{
      "version": "*",
}


./config/package-solution.json
------------------------------
Update package-solution.json isDomainIsolated:
{
  "solution": {
    "isDomainIsolated": false
  }
}

Update package-solution.json schema URL:
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json"
}

Update package-solution.json includeClientSideAssets:
{
  "solution": {
    "includeClientSideAssets": true
  }
}


./config/config.json
--------------------
Update config.json schema URL:
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/config.2.0.schema.json"
}

Update config.json version number:
{
  "version": "2.0"
}

In config.json  add the 'bundles' property:
{
  "bundles": {
    "change-request-management-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/changeRequestManagementWebPart/ChangeRequestManagementWebPart.js",
          "manifest": "./src/webparts/changeRequestManagementWebPart/ChangeRequestManagementWebPart.manifest.json"
        }
      ]
    },
    "my-change-requests-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/myChangeRequestsWebPart/MyChangeRequestsWebPart.js",
          "manifest": "./src/webparts/myChangeRequestsWebPart/MyChangeRequestsWebPart.manifest.json"
        }
      ]
    }
  }
}

Remove the "entries" property in ./config/config.json:
{
  "entries": [
    {
      "entry": "./lib/webparts/changeRequestManagementWebPart/ChangeRequestManagementWebPart.js",
      "manifest": "./src/webparts/changeRequestManagementWebPart/ChangeRequestManagementWebPart.manifest.json",
      "outputPath": "./dist/change-request-management-web-part.bundle.js"
    },
    {
      "entry": "./lib/webparts/myChangeRequestsWebPart/MyChangeRequestsWebPart.js",
      "manifest": "./src/webparts/myChangeRequestsWebPart/MyChangeRequestsWebPart.manifest.json",
      "outputPath": "./dist/my-change-requests-web-part.bundle.js"
    }
  ]
}

In the config.json file, update the path of the localized resource:
{
  "localizedResources": {
    "k": "lib/webparts/changeRequestManagementWebPart/loc/{locale}.js"
  }
}

In the config.json file, update the path of the localized resource:
{
  "localizedResources": {
    "k": "lib/webparts/myChangeRequestsWebPart/loc/{locale}.js"
  }
}


./config/copy-assets.json
-------------------------
Update copy-assets.json schema URL:
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/copy-assets.schema.json"
}


./config/deploy-azure-storage.json
----------------------------------
Update deploy-azure-storage.json schema URL:
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/deploy-azure-storage.schema.json"
}


./config/serve.json
-------------------
Update serve.json schema URL:
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json"
}


./config/write-manifests.json
-----------------------------
Update write-manifests.json schema URL:
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json"
}


./gulpfile.js
-------------
Add suppression for ms-Grid sass warning:
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);


.vscode/extensions.json
-----------------------
In the .vscode folder, add the extensions.json file:
{
  "recommendations": [
    "msjsdiag.debugger-for-chrome"
  ]
}


.vscode/launch.json
-------------------
In the .vscode folder, add the launch.json file:
{
  /**
    Install Chrome Debugger Extension for Visual Studio Code
    to debug your components with the Chrome browser:
    https://aka.ms/spfx-debugger-extensions
    */
  "version": "0.2.0",
  "configurations": [{
      "name": "Local workbench",
      "type": "chrome",
      "request": "launch",
      "url": "https://localhost:4321/temp/workbench.html",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../../src/*": "${webRoot}/src/*"
      },
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ]
    },
    {
      "name": "Hosted workbench",
      "type": "chrome",
      "request": "launch",
      "url": "https://enter-your-SharePoint-site/_layouts/workbench.aspx",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../../src/*": "${webRoot}/src/*"
      },
      "runtimeArgs": [
        "--remote-debugging-port=9222",
        "-incognito"
      ]
    }
  ]
}


./.vscode/settings.json
-----------------------
Create file ./.vscode/settings.json with provided content:
// Place your settings in this file to overwrite default and user settings.
{
  // Configure glob patterns for excluding files and folders in the file explorer.
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/bower_components": true,
    "**/coverage": true,
    "**/lib-amd": true,
    "src/**/*.scss.ts": true
  },
  "typescript.tsdk": ".\node_modules\typescript\lib",
  "json.schemas": [
    {
      "fileMatch": [
        "/config/config.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-web/lib/schemas/config.schema.json"
    },
    {
      "fileMatch": [
        "/config/copy-assets.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/copyAssets/copy-assets.schema.json"
    },
    {
      "fileMatch": [
        "/config/deploy-azure-storage.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/deployAzureStorage/deploy-azure-storage.schema.json"
    },
    {
      "fileMatch": [
        "/config/package-solution.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/packageSolution/package-solution.schema.json"
    },
    {
      "fileMatch": [
        "/config/serve.json"
      ],
      "url": "./node_modules/@microsoft/gulp-core-build-serve/lib/serve.schema.json"
    },
    {
      "fileMatch": [
        "/config/tslint.json"
      ],
      "url": "./node_modules/@microsoft/gulp-core-build-typescript/lib/schemas/tslint.schema.json"
    },
    {
      "fileMatch": [
        "/config/write-manifests.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/writeManifests/write-manifests.schema.json"
    },
    {
      "fileMatch": [
        "/config/configure-webpack.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/configureWebpack/configure-webpack.schema.json"
    },
    {
      "fileMatch": [
        "/config/configure-external-bundling-webpack.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/configureWebpack/configure-webpack-external-bundling.schema.json"
    },
    {
      "fileMatch": [
        "/copy-static-assets.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/copyStaticAssets/copy-static-assets.schema.json"
    }
  ]
}
