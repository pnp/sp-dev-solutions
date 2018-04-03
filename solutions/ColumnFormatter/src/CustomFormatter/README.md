# Description

## customformatter-MSFT.js
Pulled directly from O365 (pretty printed with Chrome Dev Tools) and is included only for reference to help track changes

Unfortunately this is not open source or available as a package (AFAIK). Fortunately, it is licensed under Apache 2.0 (see actual file) so this raw file has been adapted for use in this project

#### (Active Version pulled: 4df54baa on 12/13/17)
> Active version means the version used in Column Formatter (not necessarily the version in use in O365 Listviews)

## LocalCustomFormatter.ts
This is the adapted version of the customformatter file. As few changes as possible have been added to make it usable in the project. These changes are noted under Adaptations.

The result is a hard to follow, but working set of code. The goal is to eventually have an API where this project will be able to request the CustomFormatter module from Microsoft be loaded on the page (once loaded it's a global object) so that the official version can be used instead. This will keep us from having to resort to this but also ensure that this project's preview mode is always accurate.

# Adaptations

|Line|Description|
|---|---|
|1|Reworked primary define to be a const function|
|583|Removed ) to match def of const function above|
|598-1066| Removed|
|1067-1093|Reworked as LocalHtmlEncoding const function|
|1085-1088|Reworked function property to work in TypeScript|
|1094-3069| Removed|
|3070|Took styles and moved them to local SCSS file|

# Parameters

|Order|Letter|Guess|
|---|---|---|
|1|e|require|
|2|t|exports|
|3|r|tslib|
|4|n|resource strings|
|5|i|String Helper|
|6|a|HtmlEncoding|
|7|o|UI Fabric|

# Versions
|Active|Version|Date|Notes|
|---|---|---|---|
|Y|4df54baa|12/13/17||
||95c4690|03/02/18|Not a significant update, looks like they just commented out all the console.log messages and updated some dependencies.