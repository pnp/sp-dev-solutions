# Description

## customformatter-*.js files
Pulled directly from O365 (pretty printed with Chrome Dev Tools) and is included only for reference to help track changes

Unfortunately this is not open source or available as a package (AFAIK). Fortunately, it is licensed under Apache 2.0 (see actual file) so the raw file has been adapted for use in this project

#### (Active Version pulled: 1de8bcce on 6/12/18)
> Active version means the version used in Column Formatter (not necessarily the version in use in O365 Listviews)

## LocalCustomFormatter.ts
This is the adapted version of the customformatter file. As few changes as possible have been added to make it usable in the project. These changes are noted under Adaptations.

The result is a hard to follow, but working set of code. The goal is to eventually have an API where this project will be able to request the CustomFormatter module from Microsoft be loaded on the page (once loaded it's a global object) so that the official version can be used instead. This will keep us from having to resort to this but also ensure that this project's preview mode is always accurate.

> Note about **View Formatting** - The LocalCustomFormatter is used to evaluate the column formatting schema objects. This includes Column Formatters, but only the rowFormatter property of View Formatters (however, it is used indirectly to determine class values in the rowAdditionalClass property). The other properties are evaluated against a UI Fabric Details List control. This isn't the exact code, but a really good mimic. (the code used is included in the ViewFormatting folder, but it is huge and very little of it actually concerns viewformatting)


# Adaptations

### 4df54baa

|Line|Description|
|---|---|
|1|Reworked primary define to be a const function|
|583|Removed ) to match def of const function above|
|598-1066| Removed|
|1067-1093|Reworked as LocalHtmlEncoding const function|
|1085-1088|Reworked function property to work in TypeScript|
|1094-3069| Removed|
|3070|Took styles and moved them to local SCSS file|

### 1de8bcce

|Line|Description|
|---|---|
|1|Removed global variable declaration|
|8|Reworked primary define to be a const function|
|595|Removed ) to match def of const function above|
|610-1084| Removed|
|1085-1105|Reworked as LocalHtmlEncoding const function|
|1106-5309| Removed|
|5310|Took styles and moved them to local SCSS file|

>Style changes in this version: webkit flex props removed from `.sp-field-customFormatter` and font-family prop added to `.sp-field-quickAction`

>Notable changes are support for `@window.innerHeight` & `@window.innerWidth`, removal of extra console messages, and inclusion of delete, editProps, & share as customRowAction values.

# Parameters (Dependencies)

### 4df54baa

|Order|Letter|Value|
|---|---|---|
|1|e|require|
|2|t|exports|
|3|r|tslib|
|4|n|resource strings|
|5|i|String Helper|
|6|a|HtmlEncoding|
|7|o|UI Fabric|

### 1de8bcce

|Order|Letter|Value|Notes|
|---|---|---|---|
|1|e|require|function from require*.js|
|2|t|exports|
|3|r|tslib|__assign, __asyncDelegator, etc.|
|4|o|resource strings|default.ariaError, default.elmTypeMissing, etc.|
|5|n|String Helper|captialize, decapitalize, etc.|
|6|c|HtmlEncoding|encodeText|
|7|i|??|initializeIcons|
|8|m|UI Fabric|AnimationClasses, FontHelper, etc.|


# Versions
|Active|Version|Date|Notes|
|---|---|---|---|
||4df54baa|12/13/17||Was Active version until 2.0
||795c4690|03/02/18|Not a significant update, looks like they just commented out all the console.log messages and updated some dependencies. Never active in solution.
||dee2731e|Never evaluated, since 1de8bcce came out immediately after. Never active in solution.
|Y|1de8bcce|06/12/18|Support for View Formatting|