# Releases
## [1.2.0] - 2018-03-07
### Added
- French (fr-fr) localization (thanks [PooLP](https://github.com/PooLP)!)
  - Added targeted styling for fr-fr locale to accomodate long strings
- Replaced sp-pnp-js with PnPJS
- German (de-de) localization (thanks [Thomas Goelles](h\https://github.com/thomyg)!)
- Column Formatter now supports Full-Width columns (full bleed)

### Changed
- Updated to [SharePoint Framework](https://github.com/SharePoint/sp-dev-docs/wiki/Release-Notes-for-SPFx-Package-Version-1.4.1) from 1.4.0 to 1.4.1
- Updated [@pnp/spfx-property-controls](https://github.com/SharePoint/sp-dev-fx-property-controls/blob/master/CHANGELOG.md) from 1.1.1 to 1.4.1
- Updated [react-dropzone](https://react-dropzone.js.org/) from 4.2.3 to 4.2.9
- Updated [react-redux](https://github.com/reactjs/react-redux/releases) from 5.0.6 to 5.0.7
- Updated [@types/react-redux](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-redux) from 5.0.14 to 5.0.15
- Moved Editor Theme options to property pane
  - Cleans up UI
  - Ensures theme selection is remembered

### Removed
- Dependency on sp-pnp-js (through CDN)

### Fixed
- 

## [1.1.0] - 2018-01-08
### Added
- Height property to property pane
- Save button to allow for quick resaving (once a save-as option has been performed)
  - Additionally, save details are now prepopulated when opening from either a list or library to make saving back to those destinations even easier
- Action Link Template
- Severity Wizard
- Current User Template
- Round Image Template
- Mail To Wizard
- Mini Map Template
- npm-shrinkwrap.json
- This sweet Changelog
- Documentation & Guides

### Changed
- Updated solution for SPFx 1.4 and enabled asset packaging
- Identified several additional string literals and moved to localization
- Refactored the # Trending Template
  - Now uses the primary column
  - Provides styles when the previous and current are equal
- Moved repository to [SharePoint/SP-Dev-Solutions](https://github.com/SharePoint/sp-dev-solutions)

### Removed
- Description property from property pane
- Invalid template (listed as Mail)

### Fixed
- Issue with `@me` not correctly resolving
- Broken Open from Library functionality

## [1.0.0] - 2017-12-18
### Added
- Initial Release

[1.1.0]: https://github.com/SharePoint/sp-dev-solutions
[1.0.0]: https://github.com/thechriskent/ColumnFormatter