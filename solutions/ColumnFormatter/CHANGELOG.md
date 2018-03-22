# Releases
## 1.2.0 - 2018-03-22
### Added
- French (fr-fr) localization (thanks [PooLP](https://github.com/PooLP)!)
  - Added targeted styling for fr-fr locale to accomodate long strings
- Replaced sp-pnp-js with PnPJS
- German (de-de) localization (thanks [Thomas Goelles](https://github.com/thomyg)!)
- Column Formatter now supports Full-Width columns (full bleed)
- Start Flow Wizard
  - Creates a button to easily launch a Flow for an item
- StandardColorsDropdown (for use in wizards)
- IconsDropdown (for use in wizards)
- Line Numbers in the editor (toggle in the property pane)
- Ability to adjust Indent Guides in the editor (toggle in the property pane)
- Mini Map in the editor (toggle in the property pane)
- SpinButtonWithSuffix (for use in wizards)
- Donut Wizard
  - Shows values using a donut or pie chart
- Twitter Wizard
  - Displays Twitter profile pictures from Twitter handles
- Overdue Task Template
  - Colors the field red once the date is greater than today if the Status is not Complete
- Documentation
  - [Properties](./docs/documentation/docs/editor/properties.md)
  - [Localization](./docs/documentation/docs/about/localization.md)
  - [# Trending](./docs/documentation/docs/wizards/number-trending.md)
  - [Action Link](./docs/documentation/docs/wizards/action-link.md)
  - [Checkboxes](./docs/documentation/docs/wizards/checkboxes.md)
  - [Current User](./docs/documentation/docs/wizards/current-user.md)
  - [Data Bars](./docs/documentation/docs/wizards/data-bars.md)
  - [Donut](./docs/documentation/docs/wizards/donut.md)
  - [Mail To](./docs/documentation/docs/wizards/mail-to.md)
  - [Overdue](./docs/documentation/docs/wizards/overdue.md)
  - [Overdue Task](./docs/documentation/docs/wizards/overdue-task.md)
  - [Round Image](./docs/documentation/docs/wizards/round-image.md)
  - [Severity](./docs/documentation/docs/wizards/severity.md)
  - [Start Flow](./docs/documentation/docs/wizards/start-flow.md)
  - [Tiny Map](./docs/documentation/docs/wizards/tiny-map.md)
  - [Twitter Pic](./docs/documentation/docs/wizards/twitter-pic.md)

### Changed
- Updated to [SharePoint Framework](https://github.com/SharePoint/sp-dev-docs/wiki/Release-Notes-for-SPFx-Package-Version-1.4.1) from 1.4.0 to 1.4.1
- Updated [@pnp/spfx-property-controls](https://github.com/SharePoint/sp-dev-fx-property-controls/blob/master/CHANGELOG.md) from 1.1.1 to 1.4.1
- Updated [react-dropzone](https://react-dropzone.js.org/) from 4.2.3 to 4.2.9
- Updated [react-redux](https://github.com/reactjs/react-redux/releases) from 5.0.6 to 5.0.7
- Updated [@types/react-redux](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-redux) from 5.0.14 to 5.0.15
- Moved Editor Theme options to property pane
  - Cleans up UI
  - Ensures theme selection is remembered
- Added Icon dropdown to the Mail To Wizard
- Reorganized and standardized strings (localization)
- Renamed the Mini Map wizard to Tiny Map to avoid confusion with editor Mini Map feature
- Documentation
  - Added support for emojis in mkdocs
  - [Minimal Path to Awesome](./docs/projectguides/mpa.md)
    - Added details about showing emojis in mkdocs
  - [Setup](./docs/documentation/docs/setup.md)
    - Updated deployment steps
    - Added section for full-width columns
    - Added section for Updating Column Formatter
  - [Wizards](./docs/documentation/docs/wizards/index.md)
    - Added column coverage table
  - [About](./docs/documentation/docs/about/index.md)
    - Added actual content
  - [Save Options](./docs/documentation/docs/editor/saving.md)
    - Added section about Applying to site columns

### Removed
- Dependency on sp-pnp-js (through CDN)

### Fixed
- Removed empty Attributes from the Round Image Wizard
- Fixed issue with DataBars wizard where range values could be equal and low could be greater than high
- Default strings in Mail Wizard weren't localizable
- Removed debugMode from any templates/wizards that had it

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