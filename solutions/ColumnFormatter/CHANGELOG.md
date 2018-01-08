# Releases
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