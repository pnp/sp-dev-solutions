# Using the Editor

One you have opened or started a new project, the editor is divided into 2 main sections. Each section has multiple tabs.

## Wizard Tab

The Wizard tab is only visible if you've started from a Wizard such as the Data Bars or Mail To wizards. This will not show up for templates (templates provide starter code and data, but no custom editing interface).

Additional details about what wizards and templates are available can be found in the [Wizards & Templates](../wizards/index.md) section.

## Data Tab

The Data tab allows you to edit the sample data used in the preview tab. You can create additional rows or columns as needed and edit any of their values. Additional details can be found in the [Sample Data](./sample-data.md) section.

## Tree Tab

The tree tab contains the Elements Tree that helps you see the structure of the generated HTML elements. It can be helpful for complicated formats to help distinguish between elements and operations. Additional details can be found in the [Elements Tree](./tree.md) section.

## Preview Tab

The preview provides a live as-you-type preview of the format applied against your sample data.

>Note that you should always test your final format against an actual modern listview. The preview tab is very accurate but it is possible that additional styles/features could be introduced by O365 that are not yet reflected in Column Formatter. For this reason, the preview tab should be considered a highly accurate approximation.

## Code Tab

The code tab provides a custom editor where you can type your format's .json code directly. You will receive validation, intellisense, and as-you-type live previewing of your format. There are several features and options for the editor and additional details can be found in the [Editing Code](./code-editor.md) section.

## Side by Side Tab

The side by side tab splits the interface to show both the preview tab and the code tab.

## Additional Features

### Supports full localization
All strings have been provided to the code using localization opening the possibility to easily translate the project into multiple languages.

### Utilizes Office UI Fabric
Office UI Fabric was used for colors, icons, and typography. Additionally, the UI Fabric React Components were used wherever possible to ensure that Column Formatter matches the look and feel of Office 365 as much as possible. This keeps the experience from being jarring to end users, but also builds on knowledge they've already gained by using the rest of the suite.

The theme colors were also used as much as possible to ensure that Column Formatter will match your site regardless of what theme you choose.

### Contextual Awareness
Column Formatter is aware when it is running in a local workbench and automatically curtails those features that require a connected experience (O365 context) rather than throwing errors.

### Wizard / Templating system is setup to be extensible
Creating a new template is fairly simple just by implementing the necessary interface and registering the component. Wizards only require a few additional steps. This means that additional templates and wizards can be easily created as Column Formatting evolves.

## Related Items

- **[Properties](./properties.md)** - Overview of the property pane options
- **[Editing Code](./code-editor.md)** - Details of the Code editor and features
- **[Save Options](./saving.md)** - Overview of the various save options
- **[Sample Data](./sample-data.md)** - Overview of how to customize your sample data
- **[Elements Tree](./tree.md)** - Overview of what the Tree view provides

> Go [Home](../index.md)

![](https://telemetry.sharepointpnp.com/sp-dev-solutions/solutions/ColumnFormatter/wiki/Editor)