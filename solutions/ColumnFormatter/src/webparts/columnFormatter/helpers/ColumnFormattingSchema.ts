export const ColumnFormattingSchemaURI: string = "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json";

export const ColumnFormattingSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "CustomtFormatter JSON",
    "description": "CustomFormatter renderer for SharePoint lists",
    "definitions": {
        "customAction": {
            "type": "object",
            "additionalProperties": false,
            "title": "Action object",
            "description": "Action object for a custom action button",
            "properties": {
                "action": {
                    "description": "Name of the action that the custom action button will execute",
                    "enum": [
                        "defaultClick",
                        "executeFlow"
                    ]
                },
                "actionParams": {
                    "description": "Parameters for the custom action",
                    "anyOf": [
                        {
                            "$ref": "#/definitions/expression"
                        },
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/fieldValue"
                        }
                    ]
                }
            }
        },
        "expression": {
            "type": "object",
            "additionalProperties": false,
            "title": "Expression object JSON",
            "description": "Expression object for CustomFormatter JSON",
            "properties": {
                "operator": {
                    "description": "Operator for this expression",
                    "enum": [
                        "+",
                        "-",
                        "*",
                        "/",
                        "==",
                        "!=",
                        ">",
                        "<",
                        ">=",
                        "<=",
                        "||",
                        "&&",
                        "?",
                        ":",
                        "toString()",
                        "Number()",
                        "Date()",
                        "cos",
                        "sin",
                        "toLocaleString()",
                        "toLocaleDateString()",
                        "toLocaleTimeString()"
                    ]
                },
                "operands": {
                    "description": "Operands for this expression",
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "type": "string"
                            },
                            {
                                "type": "boolean"
                            },
                            {
                                "type": "number"
                            },
                            {
                                "type": "object",
                                "$ref": "#/definitions/expression"
                            },
                            {
                                "$ref": "#/definitions/fieldValue"
                            }
                        ]
                    }
                }
            },
            "required": [
                "operator",
                "operands"
            ]
        },
        "elm": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "$schema": {
                    "description": "schema of the JSON",
                    "type": "string"
                },
                "debugMode": {
                    "description": "Is this JSON in debug mode?",
                    "type": "boolean"
                },
                "elmType": {
                    "description": "The type of element to create",
                    "enum": [
                        "div",
                        "button",
                        "span",
                        "a",
                        "img",
                        "svg",
                        "path"
                    ]
                },
                "children": {
                    "description": "Children elements",
                    "type": "array",
                    "items": {
                        "type": "object",
                        "$ref": "#/definitions/elm"
                    }
                },
                "txtContent": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/expression"
                        },
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/fieldValue"
                        }
                    ]
                },
                "style": {
                    "description": "Specifies the style object for this element",
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "align-items": {
                            "description": "Specifies the default alignment for items inside a flexible container",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "stretch","center","flex-start","flex-end","baseline" ] }
                            ]
                        },
                        "background-color": {
                            "description": "Sets the background color of an element",
                            "allOf": [{ "$ref": "#/definitions/styleColor"}]
                        },
                        "background-image": {
                            "description": "Sets one or more background images for an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "none" ] }
                            ]
                        },
                        "border": {
                            "description": "Sets all the border properties in one declaration",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-bottom": {
                            "description": "Sets all the bottom border properties in one declaration",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-bottom-color": {
                            "description": "Sets the color of an element's bottom border",
                            "allOf": [{ "$ref": "#/definitions/styleColor" }]
                        },
                        "border-bottom-left-radius": {
                            "description": "Defines the shape of the border of the bottom-left corner",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-bottom-right-radius": {
                            "description": "Defines the shape of the border of the bottom-right corner",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-bottom-style": {
                            "description": "Sets the style of an element's bottom border",
                            "allOf": [{ "$ref": "#/definitions/styleBorderStyle" }]
                        },
                        "border-bottom-width": {
                            "description": "Sets the width of an element's bottom border",
                            "allOf": [{ "$ref": "#/definitions/styleBorderWidth" }]
                        },
                        "border-collapse": {
                            "description": "Sets whether the table borders are collapsed into a single border or detached",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "separate","collapse" ] }
                            ]
                        },
                        "border-color": {
                            "description": "Sets the color of an element's four borders",
                            "allOf": [{ "$ref": "#/definitions/styleColor" }]
                        },
                        "border-left": {
                            "description": "Sets all the left border properties in one declaration",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-left-color": {
                            "description": "Sets the color of an element's left border",
                            "allOf": [{ "$ref": "#/definitions/styleColor" }]
                        },
                        "border-left-style": {
                            "description": "Sets the style of an element's left border",
                            "allOf": [{ "$ref": "#/definitions/styleBorderStyle" }]
                        },
                        "border-left-width": {
                            "description": "Sets the width of an element's left border",
                            "allOf": [{ "$ref": "#/definitions/styleBorderWidth" }]
                        },
                        "border-radius": {
                            "description": "Defines the shape of the border of all 4 corners",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-right": {
                            "description": "Sets all the right border properties in one declaration",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-right-color": {
                            "description": "Sets the color of an element's right border",
                            "allOf": [{ "$ref": "#/definitions/styleColor" }]
                        },
                        "border-right-style": {
                            "description": "Sets the style of an element's right border",
                            "allOf": [{ "$ref": "#/definitions/styleBorderStyle" }]
                        },
                        "border-right-width": {
                            "description": "Sets the width of an element's right border",
                            "allOf": [{ "$ref": "#/definitions/styleBorderWidth" }]
                        },
                        "border-spacing": {
                            "description": "Sets the distance between the borders of adjacent cells",
                            "allOf": [{ "$ref": "#/definitions/styleBorderStyle" }]
                        },
                        "border-style": {
                            "description": "Sets the style of an element's four borders",
                            "allOf": [{ "$ref": "#/definitions/styleBorderStyle" }]
                        },
                        "border-top": {
                            "description": "Sets all the top border properties in one declaration",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-top-color": {
                            "description": "Sets the color of an element's top border",
                            "allOf": [{ "$ref": "#/definitions/styleColor" }]
                        },
                        "border-top-left-radius": {
                            "description": "Defines the shape of the border of the top-left corner",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-top-right-radius": {
                            "description": "Defines the shape of the border of the top-right corner",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "border-top-style": {
                            "description": "Sets the style of an element's top border",
                            "allOf": [{ "$ref": "#/definitions/styleBorderStyle" }]
                        },
                        "border-top-width": {
                            "description": "Sets the width of an element's top border",
                            "allOf": [{ "$ref": "#/definitions/styleBorderWidth" }]
                        },
                        "border-width": {
                            "description": "Sets the width of an element's four borders",
                            "allOf": [{ "$ref": "#/definitions/styleBorderWidth" }]
                        },
                        "bottom": {
                            "description": "For absolutely positioned elements, sets the bottom edge of the element to a unit above/below the bottom edge of its nearest positioned ancestor",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "box-align": {
                            "description": "Specifies how an element aligns its contents across its layout in a perpendicular direction",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "start","center","end","baseline","stretch" ] }
                            ]
                        },
                        "box-decoration-break": {
                            "description": "Specifies how the background, padding, border, border-image, box-shadow, margin, and clip-path of an element are applied when the box for the element is fragmented",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "slice","clone" ] }
                            ]
                        },
                        "box-direction": {
                            "description": "Specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge)",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "normal","reverse" ] }
                            ]
                        },
                        "box-flex": {
                            "description": "Specifies how a flexbox grows to fill the box that contains it, in the direction of the containing box's layout",
                            "anyOf": [
                                {
                                    "type": "number",
                                    "minimum": 0
                                },
                                { "$ref": "#/definitions/styleStrict" }
                            ]
                        },
                        "box-flex-group": {
                            "description": "Assigns the flexbox's child elements to a flex group",
                            "anyOf": [
                                {
                                    "type": "integer",
                                    "minimum": 1
                                },
                                { "$ref": "#/definitions/styleStrict" }
                            ]
                        },
                        "box-lines": {
                            "description": "Determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes)",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "single","multiple" ] }
                            ]
                        },
                        "box-ordinal-group": {
                            "description": "Assigns the flexbox's child elements to an ordinal group",
                            "anyOf": [
                                {
                                    "type": "integer",
                                    "minimum": 1
                                },
                                { "$ref": "#/definitions/styleStrict" }
                            ]
                        },
                        "box-orient": {
                            "description": "Specifies whether an element lays out its contents horizontally or vertically",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "horizontal","vertical","inline-axis","block-axis" ] }
                            ]
                        },
                        "box-pack": {
                            "description": "Specifies how a flexbox packs its contents in the direction of its layout",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "start","center","end","justify" ] }
                            ]
                        },
                        "box-shadow": {
                            "description": "Attaches one or more shadows to an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "none","inset" ] }
                            ]
                        },
                        "box-sizing": {
                            "description": "Tells the browser what the sizing properties (width and height) should include",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "content-box","border-box" ] }
                            ]
                        },
                        "caption-side": {
                            "description": "Specifies the placement of a table caption",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "top","bottom" ] }
                            ]
                        },
                        "clear": {
                            "description": "Specifies on which sides of an element floating elements are not allowed to float",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "none","left","right","both" ] }
                            ]
                        },
                        "clip": {
                            "description": "Allows the specification of a rectangle to clip an absolutely positioned element",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "color": {
                            "description": "Specifies the color of text",
                            "allOf":[{ "$ref": "#/definitions/styleColor" }]
                        },
                        "column-count": {
                            "description": "Specifies the number of columns an element should be divided into",
                            "anyOf": [
                                {
                                    "type": "integer",
                                    "minimum": 1
                                },
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "none" ] }
                            ]
                        },
                        "column-fill": {
                            "description": "Specifies how to fill columns, balanced or not",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "balance","auto" ] }
                            ]
                        },
                        "column-gap": {
                            "description": "Specifies the gap between columns",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "normal" ] }
                            ]
                        },
                        "column-rule": {
                            "description": "Sets all the column-rule properties in one declaration",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "column-rule-color": {
                            "description": "Sets the color of the rule between columns",
                            "allOf": [{ "$ref": "#/definitions/styleColor" }]
                        },
                        "column-rule-style": {
                            "description": "Sets the style of the rule between columns",
                            "allOf": [{ "$ref": "#/definitions/styleBorderStyle" }]
                        },
                        "column-rule-width": {
                            "description": "Sets the width of the rule between columns",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "medium","thin","thick" ] }
                            ]
                        },
                        "column-span": {
                            "description": "Specifies if an element should span across all columns or not",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "none","all" ] }
                            ]
                        },
                        "column-width": {
                            "description": "Specifies a suggested, optimal width for the columns",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "columns": {
                            "description": "Sets the column-width and column-count in one declaration",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "direction": {
                            "description": "Specifies the text direction/writing direction",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "ltr","rtl" ] }
                            ]
                        },
                        "display": {
                            "description": "Specifies the type of box used for an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ 
                                    "inline","block","flex","inline-block","inline-flex","inline-table","list-item",
                                    "run-in","table","table-caption","table-column-group","table-header-group",
                                    "table-row-group","table-cell","table-column","table-row","none" ] }
                            ]
                        },
                        "empty-cells": {
                            "description": "Sets whether or not to display borders and background on empty cells in a table",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "show","hide" ] }
                            ]
                        },
                        "float": {
                            "description": "Specifies if a an element should float or not",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "none","left","right" ] }
                            ]
                        },
                        "font": {
                            "description": "Sets all the font properties in one declaration",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "caption","icon","menu","message-box","small-caption","status-bar" ] }
                            ]
                        },
                        "font-family": {
                            "description": "Specifies the font for an element",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "font-size": {
                            "description": "Sets the size of a font",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "medium","xx-small","x-small","small","large","x-large","xx-large","smaller","larger" ] }
                            ]
                        },
                        "font-size-adjust": {
                            "description": "Gives better control of the font size when the first selected font is not available",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "none" ] }
                            ]
                        },
                        "font-stretch": {
                            "description": "Allows text to be wider or narrower",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [
                                    "ultra-condensed","extra-condensed","condensed","semi-condensed",
                                    "normal","semi-expanded","expanded","extra-expanded","ultra-expanded" ] }
                            ]
                        },
                        "font-variant": {
                            "description": "Specifies whether or not text should be displayed in a small-caps font",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "normal","small-caps" ] }
                            ]
                        },
                        "font-weight": {
                            "description": "Sets how thick or thin characters in text should be displayed",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "normal","bold","bolder","lighter" ] }
                            ]
                        },
                        "fill": {
                            "description": "Defines the color of the interior of the given graphical element",
                            "allOf": [{ "$ref": "#/definitions/styleColor" }]
                        },
                        "height": {
                            "description": "Sets the height of an element",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "grid-columns": {
                            "description": "Specifies the width of each column in a grid",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "none" ] }
                            ]
                        },
                        "grid-rows": {
                            "description": "Specifies the height of each row in a grid",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "none" ] }
                            ]
                        },
                        "hanging-punctuation": {
                            "description": "Specifies whether a punctuation mark may be placed outside the line box at the start or at the end of a full line of text",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "none","first","last","allow-end","force-end" ] }
                            ]
                        },
                        "left": {
                            "description": "For absolutely positioned elements, sets the left edge of an element to a unit to the left/right of the left edge of its nearest positioned ancestor",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "letter-spacing": {
                            "description": "Increases or decreases the space between characters in text",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "normal" ] }
                            ]
                        },
                        "line-height": {
                            "description": "Increases or decreases the space between characters in text",
                            "anyOf": [
                                { 
                                    "type": "number",
                                    "minimum": 0
                                },
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "normal" ] }
                            ]
                        },
                        "margin": {
                            "description": "Sets all the margin properties in one declaration",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "margin-bottom": {
                            "description": "Sets the bottom margin of an element",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "margin-left": {
                            "description": "Sets the left margin of an element",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "margin-right": {
                            "description": "Sets the right margin of an element",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "margin-top": {
                            "description": "Sets the top margin of an element",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "max-height": {
                            "description": "Sets the maximum height of an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "none" ] }
                            ]
                        },
                        "max-width": {
                            "description": "Sets the maximum width of an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "none" ] }
                            ]
                        },
                        "min-height": {
                            "description": "Sets the minimum height of an element",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "min-width": {
                            "description": "Sets the minimum width of an element",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "opacity": {
                            "description": "Sets the transparency level for an element where 1 is not transparent at all and 0 is completely transparent",
                            "anyOf": [
                                { 
                                    "type": "number",
                                    "minimum": 0,
                                    "maximum": 1
                                },
                                { "$ref": "#/definitions/styleStrict" }
                            ]
                        },
                        "outline": {
                            "description": "Sets the outline width, style, and color in one declaration",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "outline-color": {
                            "description": "Sets the color of an element's outline",
                            "anyOf": [
                                { "$ref": "#/definitions/styleColor" },
                                { "enum": [ "invert" ] }
                            ]
                        },
                        "outline-style": {
                            "description": "Sets the style of an element's outline",
                            "allOf": [{ "$ref": "#/definitions/styleBorderStyle" }]
                        },
                        "outline-width": {
                            "description": "Sets the width of an element's outline",
                            "allOf": [{ "$ref": "#/definitions/styleBorderWidth" }]
                        },
                        "overflow": {
                            "description": "Specifies what happens if content overflows an element's box",
                            "allOf": [{ "$ref": "#/definitions/styleOverflow" }]
                        },
                        "overflow-x": {
                            "description": "Specifies what to do with the left/right edges of the content if it overflows the element's content area",
                            "allOf": [{ "$ref": "#/definitions/styleOverflow" }]
                        },
                        "overflow-y": {
                            "description": "Specifies what to do with the top/bottom edges of the content if it overflows the element's content area",
                            "allOf": [{ "$ref": "#/definitions/styleOverflow" }]
                        },
                        "padding": {
                            "description": "Sets all the padding properties in one declaration",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "padding-bottom": {
                            "description": "Sets the bottom padding of an element",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "padding-left": {
                            "description": "Sets the left padding of an element",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "padding-right": {
                            "description": "Sets the right padding of an element",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "padding-top": {
                            "description": "Sets the top padding of an element",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "position": {
                            "description": "Specifies the type of positioning method used for an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "static","absolute","fixed","relative","sticky" ] }
                            ]
                        },
                        "punctuation-trim": {
                            "description": "Specifies whether a punctuation character should be trimmed if it appears at the start or end of a line, or adjacent to another full width punctuation character",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "none","start","end","allow-end","adjacent" ] }
                            ]
                        },
                        "right": {
                            "description": "For absolutely positioned elements, sets the right edge of an element to a unit to the left/right of the right edge of its nearest positioned ancestor",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "rotation": {
                            "description": "Rotates an element counterclockwise around the point given by the rotation-point property",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "rotation-point": {
                            "description": "Defines a point as an offset from the top left border edge",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "table-layout": {
                            "description": "Sets the table layout algorithm to be used for a table",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "auto","fixed" ] }
                            ]
                        },
                        "text-align": {
                            "description": "Specifies the horizontal alignment of text in an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "left","right","center","justify" ] }
                            ]
                        },
                        "text-align-last": {
                            "description": "Specifies the horizontal alignment of the last line of text in an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "auto","left","right","center","justify","start","end" ] }
                            ]
                        },
                        "text-decoration": {
                            "description": "Specifies the decoration added to text in an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "none","underline","overline","line-through" ] }
                            ]
                        },
                        "text-indent": {
                            "description": "Specifies the indentation of the first line in a text-block",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "text-justify": {
                            "description": "Specifies the justification method to use when text-align is set to justify",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "auto","none","inter-word","inter-ideograph","inter-cluster","distribute","kashida","trim" ] }
                            ]
                        },
                        "text-outline": {
                            "description": "Specifies a text outline",
                            "allOf": [{ "$ref": "#/definitions/styleStandard" }]
                        },
                        "text-shadow": {
                            "description": "Adds shadow to text",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "none" ] }
                            ]
                        },
                        "text-transform": {
                            "description": "Controls the capitalization of text",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "none","capitalize","uppercase","lowercase" ] }
                            ]
                        },
                        "text-wrap": {
                            "description": "Specifies line breaking rules for text",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "normal","none","unrestricted","suppress" ] }
                            ]
                        },
                        "top": {
                            "description": "For absolutely positioned elements, sets the top edge of an element to a unit above/below the top edge of its nearest positioned ancestor",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "unicode-bidi": {
                            "description": "Used together with the direction property to set whether the text should be overridden to support multiple languages in the same document",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "normal","embed","bidi-override" ] }
                            ]
                        },
                        "vertical-align": {
                            "description": "Sets the vertical alignment of an element",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "baseline","sub","super","top","text-top","middle","bottom","text-bottom" ] }
                            ]
                        },
                        "visibility": {
                            "description": "Specifies whether or not an element is visible",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "visible","hidden","collapse" ] }
                            ]
                        },
                        "white-space": {
                            "description": "Used together with the direction property to set whether the text should be overridden to support multiple languages in the same document",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "normal","nowrap","pre","pre-line","pre-wrap" ] }
                            ]
                        },
                        "width": {
                            "description": "Sets the width of an element",
                            "allOf":[{ "$ref": "#/definitions/styleStandardAuto" }]
                        },
                        "word-break": {
                            "description": "Specifies line breaking rules for scripts that are not Chinese, Japanese, or Korean",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "normal","break-all","keep-all" ] }
                            ]
                        },
                        "word-spacing": {
                            "description": "Increases or decreases the white space between words",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStandard" },
                                { "enum": [ "normal" ] }
                            ]
                        },
                        "word-wrap": {
                            "description": "Allows long words to be able to be broken and wrap onto the next line",
                            "anyOf": [
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "normal","break-word" ] }
                            ]
                        },
                        "z-index": {
                            "description": "Specifies the stack order of an element",
                            "anyOf": [
                                { "type": "integer" },
                                { "$ref": "#/definitions/styleStrict" },
                                { "enum": [ "auto" ] }
                            ]
                        }
                    },
                    "patternProperties": {
                        "^[a-z]+(?:-[a-z]+)?$": {
                            "description": "Specifies style attributes for this element",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        }
                    }
                },
                "customRowAction": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/customAction"
                        }
                    ]
                },
                "attributes": {
                    "type": "object",
                    "description": "Additional attributes to be added to elmType",
                    "properties": {
                        "href": {
                            "description": "Specifies the href attribute",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "src": {
                            "description": "Specifies the src attribute",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "class": {
                            "description": "Specifies the class attribute",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                },
                                {
                                    "enum":[
                                        "sp-field-customFormatBackground",
                                        "sp-field-severity--good",
                                        "sp-field-severity--low",
                                        "sp-field-severity--warning",
                                        "sp-field-severity--severeWarning",
                                        "sp-field-severity--blocked",
                                        "sp-field-dataBars",
                                        "sp-field-trending--up",
                                        "sp-field-trending--down",
                                        "sp-field-quickAction"
                                    ]
                                }
                            ]
                        },
                        "target": {
                            "description": "Specifies the target attribute, used primarily for <a> element types.",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                },
                                {
                                    "enum": [
                                        "_blank","_self","_parent","_top"
                                    ]
                                }
                            ]
                        },
                        "role": {
                            "description": "Specifies the role attribute, used accessibility.",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                },
                                {
                                    "enum": [
                                        "alert","alertdialog","application","article","button","cell","checkbox","columnheader","combobox",
                                        "complementary","contentinfo","definition","dialog","directory","document","feed","figure","form",
                                        "grid","gridcell","group","heading","img","link","list","listbox","listitem","log","main","marquee",
                                        "math","menu","menubar","menuitem","menuitemcheckbox","menuitemradio","navigation","none","note",
                                        "option","presentation","progressbar","radio","radiogroup","region","row","rowgroup","rowheader",
                                        "scrollbar","search","searchbox","separator","slider","spinbutton","status","switch","tab","table",
                                        "tablist","tabpanel","term","textbox","timer","toolbar","tooltip","tree","treegrid","treeitem"
                                    ]
                                }
                            ]
                        },
                        "d": {
                            "description": "Specifies the d attribute. Used primarily for svg path elements",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "iconName": {
                            "description": "Specifies the Fabric icon to display before this element",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                },
                                {
                                    "enum": [
                                        "12PointStar","6PointStar","AADLogo","Accept","AccessLogo","AccessLogoFill","AccountManagement","Accounts",
                                        "ActivateOrders","ActivityFeed","Add","AddEvent","AddFavorite","AddFavoriteFill","AddFriend","AddGroup",
                                        "AddNotes","AddOnlineMeeting","AddPhone","AddTo","Admin","AdminALogo32","AdminALogoFill32","AdminALogoInverse32",
                                        "AdminCLogoInverse32","AdminDLogoInverse32","AdminELogoInverse32","AdminLLogoInverse32","AdminMLogoInverse32",
                                        "AdminOLogoInverse32","AdminPLogoInverse32","AdminSLogoInverse32","AdminYLogoInverse32","Airplane","AirplaneSolid",
                                        "AirTickets","AlarmClock","Album","AlbumRemove","AlertSolid","AlignCenter","AlignHorizontalCenter",
                                        "AlignHorizontalLeft","AlignHorizontalRight","AlignJustify","AlignLeft","AlignRight","AlignVerticalBottom",
                                        "AlignVerticalCenter","AlignVerticalTop","AnalyticsLogo","AnalyticsQuery","AnalyticsReport","AnchorLock","Annotation",
                                        "AppIconDefault","Archive","AreaChart","ArrangeBringForward","ArrangeBringToFront","ArrangeSendBackward",
                                        "ArrangeSendToBack","Arrivals","ArrowDownRight8","ArrowDownRightMirrored8","ArrowTallDownLeft","ArrowTallDownRight",
                                        "ArrowTallUpLeft","ArrowTallUpRight","ArrowUpRight8","ArrowUpRightMirrored8","Articles","Ascending","AspectRatio",
                                        "AssessmentGroup","AssessmentGroupTemplate","AssetLibrary","Assign","Asterisk","AsteriskSolid","ATPLogo","Attach",
                                        "AustralianRules","AutoEnhanceOff","AutoEnhanceOn","AutoFillTemplate","AutoHeight","AutoRacing","AwayStatus",
                                        "AzureAPIManagement","AzureKeyVault","AzureLogo","AzureServiceEndpoint","Back","BackgroundColor","Backlog","BacklogBoard",
                                        "BackToWindow","Badge","Balloons","BankSolid","BarChart4","BarChartHorizontal","BarChartVertical","Baseball","BeerMug",
                                        "BIDashboard","BidiLtr","BidiRtl","BingLogo","BirthdayCake","BlockContact","Blocked","Blocked2","BlockedSolid","BlowingSnow",
                                        "Blur","Boards","Bold","BookingsLogo","Bookmarks","BookmarksMirrored","BorderDash","BorderDot","BoxAdditionSolid",
                                        "BoxCheckmarkSolid","BoxMultiplySolid","BoxPlaySolid","BoxSubtractSolid","BranchCommit","BranchCompare","BranchFork",
                                        "BranchFork2","BranchLocked","BranchMerge","BranchPullRequest","BranchSearch","BranchShelveset","Breadcrumb","Breakfast",
                                        "Brightness","Broom","Brunch","BucketColor","BucketColorFill","BufferTimeAfter","BufferTimeBefore","BufferTimeBoth","Bug",
                                        "BugSolid","Build","BuildIssue","BuildQueue","BuildQueueNew","BulkUpload","BulletedList","BulletedList2",
                                        "BulletedList2Mirrored","BulletedListMirrored","Bullseye","Bus","BusinessCenterLogo","BusinessHoursSign","BusSolid","Cafe",
                                        "Cake","Calculator","CalculatorAddition","CalculatorEqualTo","CalculatorMultiply","CalculatorNotEqualTo","CalculatorSubtract",
                                        "Calendar","CalendarAgenda","CalendarDay","CalendarMirrored","CalendarReply","CalendarSettings","CalendarSettingsMirrored",
                                        "CalendarWeek","CalendarWorkWeek","CaloriesAdd","Camera","Cancel","CannedChat","Car","CaretBottomLeftCenter8",
                                        "CaretBottomLeftSolid8","CaretBottomRightCenter8","CaretBottomRightSolid8","CaretDown8","CaretDownSolid8","CaretHollow",
                                        "CaretHollowMirrored","CaretLeft8","CaretLeftSolid8","CaretRight","CaretRight8","CaretRightSolid8","CaretSolid",
                                        "CaretSolid16","CaretSolidDown","CaretSolidLeft","CaretSolidMirrored","CaretSolidRight","CaretSolidUp","CaretTopLeftCenter8",
                                        "CaretTopLeftSolid8","CaretTopRightCenter8","CaretTopRightSolid8","CaretUp8","CaretUpSolid8","Cat","CellPhone","Certificate",
                                        "Chart","ChartSeries","ChartXAngle","ChartYAngle","Chat","ChatInviteFriend","ChatSolid","Checkbox","CheckboxComposite",
                                        "CheckboxCompositeReversed","CheckboxIndeterminate","CheckList","CheckMark","ChevronDown","ChevronDownEnd6","ChevronDownMed",
                                        "ChevronDownSmall","ChevronFold10","ChevronLeft","ChevronLeftEnd6","ChevronLeftMed","ChevronLeftSmall","ChevronRight",
                                        "ChevronRightEnd6","ChevronRightMed","ChevronRightSmall","ChevronUnfold10","ChevronUp","ChevronUpEnd6","ChevronUpMed",
                                        "ChevronUpSmall","Chopsticks","ChromeBack","ChromeBackMirrored","ChromeClose","ChromeMinimize","CircleAddition",
                                        "CircleAdditionSolid","CircleFill","CircleHalfFull","CirclePause","CirclePauseSolid","CirclePlus","CircleRing","CircleStop",
                                        "CircleStopSolid","CityNext","ClassNotebookLogo16","ClassNotebookLogo32","ClassNotebookLogoFill16","ClassNotebookLogoFill32",
                                        "ClassNotebookLogoInverse","ClassNotebookLogoInverse16","ClassNotebookLogoInverse32","ClassroomLogo","Clear","ClearFilter",
                                        "ClearFormatting","ClearNight","Clock","CloneToDesktop","ClosedCaption","ClosePane","ClosePaneMirrored","Cloud","CloudAdd",
                                        "CloudDownload","CloudUpload","CloudWeather","Cloudy","Cocktails","Code","CodeEdit","Coffee","CoffeeScript","CollapseContent",
                                        "CollapseContentSingle","CollapseMenu","CollegeFootball","CollegeHoops","Color","ColorSolid","ColumnLeftTwoThirds",
                                        "ColumnLeftTwoThirdsEdit","ColumnOptions","ColumnRightTwoThirds","ColumnRightTwoThirdsEdit","Combine","Combobox",
                                        "CommandPrompt","Comment","CommentAdd","CommentNext","CommentPrevious","CommentUrgent","Commitments","Communications",
                                        "CompanyDirectory","CompanyDirectoryMirrored","CompassNW","Completed","CompletedSolid","ConfigurationSolid","ConstructionCone",
                                        "ConstructionConeSolid","Contact","ContactCard","ContactCardSettings","ContactCardSettingsMirrored","ContactInfo","ContactLink",
                                        "ContextMenu","Contrast","Copy","Cotton","CPlusPlus","CPlusPlusLanguage","Cricket","CRMReport","Crop","Crown","CrownSolid",
                                        "CSharp","CSharpLanguage","CSS","CustomList","CustomListMirrored","Cut","Cycling","DashboardAdd","Database",
                                        "DataConnectionLibrary","DateTime","DateTime2","DateTimeMirrored","DeactivateOrders","DecisionSolid","DeclineCall",
                                        "DecreaseIndentLegacy","DefaultRatio","DefectSolid","Delete","DeliveryTruck","DelveAnalytics","DelveAnalyticsLogo","DelveLogo",
                                        "DelveLogoFill","DelveLogoInverse","Deploy","Descending","Design","DeveloperTools","Devices3","Devices4","Diagnostic","Dialpad",
                                        "DiamondSolid","Dictionary","DietPlanNotebook","DiffInline","DiffSideBySide","DisableUpdates","Dislike","DislikeSolid",
                                        "DockLeft","DockLeftMirrored","DockRight","DocLibrary","DocsLogoInverse","Document","DocumentApproval","Documentation",
                                        "DocumentManagement","DocumentReply","DocumentSearch","DocumentSet","DonutChart","Door","DoubleBookmark","DoubleChevronDown",
                                        "DoubleChevronDown12","DoubleChevronDown8","DoubleChevronLeft","DoubleChevronLeft12","DoubleChevronLeft8","DoubleChevronLeftMed",
                                        "DoubleChevronLeftMedMirrored","DoubleChevronRight","DoubleChevronRight12","DoubleChevronRight8","DoubleChevronUp",
                                        "DoubleChevronUp12","DoubleChevronUp8","DoubleColumn","DoubleColumnEdit","Down","Download","DownloadDocument","DragObject",
                                        "DrillDown","DrillDownSolid","DrillExpand","DrillShow","DRM","Drop","Dropdown","Duststorm","Dynamics365Logo","DynamicSMBLogo",
                                        "EatDrink","EdgeLogo","Edit","EditContact","EditMail","EditMirrored","EditNote","EditPhoto","EditSolid12","EditSolidMirrored12",
                                        "EditStyle","Education","Ellipse","Embed","EMI","Emoji","Emoji2","EmojiDisappointed","EmojiNeutral","EmojiTabSymbols",
                                        "EmptyRecycleBin","EngineeringGroup","EntryDecline","EntryView","Equalizer","EraseTool","Error","ErrorBadge","Event",
                                        "EventAccepted","EventDate","EventDeclined","EventInfo","EventTentative","EventTentativeMirrored","ExcelDocument","ExcelLogo",
                                        "ExcelLogo16","ExcelLogoFill","ExcelLogoFill16","ExcelLogoInverse","ExcelLogoInverse16","ExchangeLogo","ExchangeLogoFill",
                                        "ExchangeLogoInverse","ExerciseTracker","ExpandMenu","ExploreContent","ExploreContentSingle","Export","ExportMirrored",
                                        "ExternalBuild","ExternalTFVC","ExternalXAML","F12DevTools","FabricAssetLibrary","FabricDataConnectionLibrary","FabricDocLibrary",
                                        "FabricFolder","FabricFolderFill","FabricFolderSearch","FabricFormLibrary","FabricFormLibraryMirrored","FabricMovetoFolder",
                                        "FabricNewFolder","FabricOpenFolderHorizontal","FabricPictureLibrary","FabricPublicFolder","FabricReportLibrary",
                                        "FabricReportLibraryMirrored","FabricSyncFolder","FabricUnsyncFolder","Family","FangBody","FastForward","FastMode","Favicon",
                                        "FavoriteList","FavoriteStar","FavoriteStarFill","Fax","Feedback","FeedbackRequestMirroredSolid","FeedbackRequestSolid",
                                        "FeedbackResponseSolid","Ferry","FerrySolid","FieldChanged","FieldEmpty","FieldFilled","FieldNotChanged","FieldReadOnly",
                                        "FieldRequired","FileASPX","FileBug","FileCode","FileComment","FileCSS","FileHTML","FileImage","FileJAVA","FileLess","FilePDB",
                                        "FileSass","FileSQL","FileSymlink","FileTemplate","FileTypeSolution","Filter","Filters","FilterSolid","FiltersSolid","Financial",
                                        "FinancialMirroredSolid","FinancialSolid","Fingerprint","FiveTileGrid","Flag","FlameSolid","FlickDown","FlickLeft","FlickRight",
                                        "FlickUp","Flow","FocalPoint","Fog","Folder","FolderFill","FolderHorizontal","FolderList","FolderListMirrored","FolderOpen",
                                        "FolderQuery","FolderSearch","FollowUser","Font","FontColor","FontColorA","FontColorSwatch","FontDecrease","FontIncrease",
                                        "FontSize","FormLibrary","FormLibraryMirrored","Forward","ForwardEvent","Freezing","Frigid","FSharp","FSharpLanguage",
                                        "FullCircleMask","FullHistory","FullScreen","FullWidth","FullWidthEdit","FunctionalManagerDashboard","GallatinLogo","Generate",
                                        "GenericScan","Giftbox","GiftboxOpen","GiftBoxSolid","GiftCard","GitGraph","Glasses","Glimmer","GlobalNavButton","Globe","Globe2",
                                        "GlobeFavorite","Golf","GotoToday","GridViewLarge","GridViewMedium","GridViewSmall","GripperBarHorizontal","GripperBarVertical",
                                        "GripperTool","Group","GroupedAscending","GroupedDescending","GroupedList","GroupObject","GUID","Guitar","HailDay","HailNight",
                                        "HalfAlpha","HalfCircle","Handwriting","HardDrive","HardDriveGroup","HardDriveLock","HardDriveUnlock","Header1","Header2",
                                        "Header3","Header4","Headset","HeadsetSolid","Health","HealthSolid","Heart","HeartBroken","HeartFill","Help","HelpMirrored",
                                        "Hexagon","Hide","Hide2","Highlight","HighlightMappedShapes","HintText","History","Home","HomeSolid","HorizontalDistributeCenter",
                                        "Hospital","Hotel","HourGlass","HumanResources","IconSetsFlag","IDBadge","ImageCrosshair","ImageDiff","ImagePixel","ImageSearch",
                                        "Import","Important","ImportMirrored","Inbox","InboxCheck","IncidentTriangle","IncreaseIndentLegacy","Info","Info2","InfoSolid",
                                        "InsertTextBox","InstallToDrive","InternetSharing","IRMForward","IRMForwardMirrored","IRMReply","IRMReplyMirrored","IssueSolid",
                                        "IssueTracking","IssueTrackingMirrored","Italic","JavaScriptLanguage","JoinOnlineMeeting","JS","KaizalaLogo","Label",
                                        "LadybugSolid","Lamp","LandscapeOrientation","LaptopSecure","LaptopSelected","LargeGrid","Library","Lifesaver","LifesaverLock",
                                        "Light","Lightbulb","LightningBolt","LightWeight","Like","LikeSolid","Line","LineChart","LineSpacing","LineStyle","LineThickness",
                                        "Link","LinkedInLogo","List","ListMirrored","LocaleLanguage","Location","LocationCircle","LocationDot","LocationFill",
                                        "LocationOutline","Lock","LockSolid","LogRemove","LowerBrightness","LyncLogo","Mail","MailAlert","MailCheck","MailFill",
                                        "MailForward","MailForwardMirrored","MailLowImportance","MailPause","MailReminder","MailRepeat","MailReply","MailReplyAll",
                                        "MailReplyAllMirrored","MailReplyMirrored","MailSolid","MailTentative","MailTentativeMirrored","MailUndelivered",
                                        "ManagerSelfService","MapDirections","MapPin","MapPinSolid","MarkDownLanguage","Market","MarketDown","Medal","MediaAdd","Medical",
                                        "Megaphone","MegaphoneSolid","Memo","Merge","MergeDuplicate","Message","MessageFill","MicOff","Microphone","MicrosoftFlowLogo",
                                        "MicrosoftStaffhubLogo","MiniContract","MiniExpand","MiniLink","MobileReport","MobileSelected","Money","More","MoreSports",
                                        "MoreVertical","Move","Movers","MoveToFolder","MSNLogo","MSNVideos","MSNVideosSolid","MTMLogo","MultiSelect","MultiSelectMirrored",
                                        "MusicInCollection","MusicInCollectionFill","MusicNote","MyMoviesTV","Nav2DMapView","NavigateBack","NavigateBackMirrored",
                                        "NavigateExternalInline","NavigateForward","NavigateForwardMirrored","NavigationFlipper","NetworkTower","NewAnalyticsQuery",
                                        "NewFolder","News","NewsSearch","NewTeamProject","Next","NonprofitLogo32","NormalWeight","NoteForward","NotePinned","NoteReply",
                                        "NotExecuted","NotImpactedSolid","NugetLogo","NumberedList","NumberField","NumberSequence","Octagon","OEM","OfficeAddinsLogo",
                                        "OfficeAssistantLogo","OfficeFormsLogo","OfficeFormsLogo16","OfficeFormsLogo24","OfficeFormsLogoFill","OfficeFormsLogoFill16",
                                        "OfficeFormsLogoFill24","OfficeFormsLogoInverse","OfficeFormsLogoInverse16","OfficeFormsLogoInverse24","OfficeLogo",
                                        "OfficeStoreLogo","OfficeVideoLogo","OfficeVideoLogoFill","OfficeVideoLogoInverse","OfflineOneDriveParachute",
                                        "OfflineOneDriveParachuteDisabled","OfflineStorageSolid","OneDrive","OneDriveAdd","OneDriveFolder16","OneNoteEduLogoInverse",
                                        "OneNoteLogo","OneNoteLogo16","OneNoteLogoFill","OneNoteLogoFill16","OneNoteLogoInverse","OneNoteLogoInverse16","OpenFile",
                                        "OpenFolderHorizontal","OpenInNewWindow","OpenPane","OpenPaneMirrored","OpenSource","Org","Orientation","OutlookLogo",
                                        "OutlookLogo16","OutlookLogoFill","OutlookLogoFill16","OutlookLogoInverse","OutlookLogoInverse16","OutOfOffice","Package",
                                        "Packages","Padding","PaddingBottom","PaddingLeft","PaddingRight","PaddingTop","Page","PageAdd","PageCheckedin","PageCheckedOut",
                                        "PageEdit","PageLeft","PageListMirroredSolid","PageListSolid","PageLock","PageRemove","PageRight","PageSolid","PanoIndicator",
                                        "Parachute","ParachuteSolid","Parameter","ParkingLocation","ParkingLocationMirrored","ParkingMirroredSolid","ParkingSolid",
                                        "PartlyCloudyDay","PartlyCloudyNight","PartyLeader","Paste","Pause","PaymentCard","PC1","PDF","PencilReply","Pentagon","People",
                                        "PeopleAdd","PeopleAlert","PeopleBlock","PeoplePause","PeopleRepeat","Permissions","PermissionsSolid","Personalize","Phone","Photo2",
                                        "Photo2Add","Photo2Remove","PhotoCollection","Picture","PictureCenter","PictureFill","PictureLibrary","PicturePosition",
                                        "PictureStretch","PictureTile","PieDouble","PieSingle","PieSingleSolid","Pill","Pin","Pinned","PinnedFill","PivotChart",
                                        "PlannerLogo","PlanView","Play","PlayerSettings","PlayResume","Plug","PlugConnected","PlugDisconnected","PlugSolid","POI","POISolid",
                                        "PostUpdate","PowerApps","PowerApps2Logo","PowerAppsLogo","PowerBILogo","PowerPointDocument","PowerPointLogo","PowerPointLogo16",
                                        "PowerPointLogoFill","PowerPointLogoFill16","PowerPointLogoInverse","PowerPointLogoInverse16","Precipitation",
                                        "PresenceChickletVideo","Preview","PreviewLink","Previous","PrimaryCalendar","Print","PrintfaxPrinterFile","Processing",
                                        "ProcessMetaTask","Product","ProfileSearch","ProFootball","ProgressLoopInner","ProgressLoopOuter","ProgressRingDots","ProHockey",
                                        "ProjectCollection","ProjectLogo16","ProjectLogo32","ProjectLogoFill16","ProjectLogoFill32","ProjectLogoInverse","ProtectedDocument",
                                        "ProtectionCenterLogo32","ProtectRestrict","PublicCalendar","PublicContactCard","PublicContactCardMirrored","PublicEmail",
                                        "PublicFolder","PublisherLogo","PublisherLogo16","PublisherLogoFill","PublisherLogoFill16","PublisherLogoInverse16","Puzzle","PY",
                                        "PythonLanguage","QuarterCircle","QueryList","Questionnaire","QuestionnaireMirrored","QuickNote","QuickNoteSolid","R","RadioBtnOff",
                                        "RadioBtnOn","RadioBullet","Rain","RainShowersDay","RainShowersNight","RainSnow","RawSource","Read","ReadingMode","ReadingModeSolid",
                                        "ReceiptCheck","ReceiptForward","ReceiptReply","ReceiptTentative","ReceiptTentativeMirrored","ReceiptUndelivered","Recent","Record2",
                                        "RectangularClipping","RecurringEvent","RecurringTask","RecycleBin","Redeploy","RedEye","Redo","Refresh","ReminderGroup",
                                        "ReminderPerson","Remote","Remove","RemoveEvent","RemoveFilter","RemoveLink","RemoveOccurrence","Rename","RenewalCurrent",
                                        "RenewalFuture","ReopenPages","Repair","Reply","ReplyAll","ReplyAllAlt","ReplyAllMirrored","ReplyAlt","ReplyMirrored","Repo",
                                        "ReportAdd","ReportHacked","ReportLibrary","ReportLibraryMirrored","RepoSolid","ReturnToSession","ReviewRequestMirroredSolid",
                                        "ReviewRequestSolid","ReviewResponseSolid","ReviewSolid","RevToggleKey","Rewind","Ribbon","RibbonSolid","RightDoubleQuote",
                                        "RightTriangle","Ringer","RingerOff","Robot","Rocket","Room","Rotate","RowsChild","RowsGroup","Rugby","Running","Sad","SadSolid",
                                        "Save","SaveAll","SaveAndClose","SaveAs","Savings","ScaleUp","ScheduleEventAction","ScopeTemplate","Script","ScrollUpDown","Search",
                                        "SearchAndApps","SearchCalendar","SearchIssue","SearchIssueMirrored","Section","Sections","SecurityGroup","Sell","SemiboldWeight",
                                        "Send","SendMirrored","Separator","Server","ServerEnviroment","ServerProcesses","SetAction","Settings","Share","ShareiOS",
                                        "SharepointLogo","SharepointLogoFill","SharepointLogoInverse","Shield","ShieldSolid","Shop","ShoppingCart","ShoppingCartSolid",
                                        "ShopServer","ShowResults","ShowResultsMirrored","SidePanel","SidePanelMirrored","SignOut","SingleBookmark","SingleColumn",
                                        "SingleColumnEdit","SIPMove","SiteScan","SizeLegacy","SkiResorts","SkypeCheck","SkypeCircleCheck","SkypeCircleClock","SkypeCircleMinus",
                                        "SkypeClock","SkypeForBusinessLogo","SkypeForBusinessLogo16","SkypeForBusinessLogoFill","SkypeForBusinessLogoFill16","SkypeLogo",
                                        "SkypeLogo16","SkypeMessage","SkypeMinus","Slider","SliderHandleSize","SliderThumb","Snooze","Snow","Snowflake","SnowShowerDay",
                                        "SnowShowerNight","Soccer","SocialListeningLogo","Sort","SortDown","SortLines","SortUp","Spacer","Speakers","SpeedHigh","Split",
                                        "SplitObject","Sprint","Squalls","Stack","StackedBarChart","StackedLineChart","StackIndicator","StaffNotebookLogo16",
                                        "StaffNotebookLogo32","StaffNotebookLogoFill16","StaffNotebookLogoFill32","StaffNotebookLogoInverted16","StaffNotebookLogoInverted32",
                                        "Starburst","StarburstSolid","StatusCircleCheckmark","StatusCircleInner","StatusCircleOuter","StatusErrorFull","StatusTriangle","Step",
                                        "StepInsert","StepShared","StepSharedAdd","StepSharedInsert","StockDown","StockUp","Stop","StopSolid","Stopwatch","StoreLogo16",
                                        "StoreLogoMed20","Storyboard","Streaming","StreamingOff","StreamLogo","Strikethrough","Subscribe","Subscript","SubstitutionsIn",
                                        "Suitcase","SunAdd","Sunny","SunQuestionMark","Superscript","SurveyQuestions","SwayLogo16","SwayLogo32","SwayLogoFill16",
                                        "SwayLogoFill32","SwayLogoInverse","Switch","SwitcherStartEnd","Sync","SyncFolder","SyncOccurence","SyncToPC","System","Tab","Table",
                                        "Tablet","TabletMode","TabletSelected","Tag","Taskboard","TaskGroup","TaskGroupMirrored","TaskLogo","TaskManager",
                                        "TaskManagerMirrored","TaskSolid","Taxi","TeamFavorite","TeamsLogo","TeamsLogoFill","TeamsLogoInverse","Teamwork","Teeth",
                                        "TemporaryUser","Tennis","TestAutoSolid","TestBeaker","TestBeakerSolid","TestCase","TestExploreSolid","TestImpactSolid",
                                        "TestParameter","TestPlan","TestStep","TestSuite","TestUserSolid","TextBox","TextCallout","TextDocument","TextField","TextOverflow",
                                        "TFVCLogo","ThisPC","ThreeQuarterCircle","ThumbnailView","ThumbnailViewMirrored","Thunderstorms","Ticket","Tiles","Tiles2","TimeEntry",
                                        "Timeline","TimelineDelivery","TimelineMatrixView","TimelineProgress","Timer","TimeSheet","ToDoLogoBottom","ToDoLogoInverse",
                                        "ToDoLogoTop","ToggleBorder","ToggleFilled","ToggleOff","ToggleThumb","Touch","TouchPointer","Train","TrainSolid","TransferCall",
                                        "Transition","TriangleDown12","TriangleLeft12","TriangleRight12","TriangleSolid","TriangleSolidDown12","TriangleSolidLeft12",
                                        "TriangleSolidRight12","TriangleSolidUp12","TriangleUp12","TriggerApproval","TriggerAuto","TriggerUser","TripleColumn",
                                        "TripleColumnEdit","Trophy","Trophy2","Trophy2Solid","TurnRight","TVMonitor","TVMonitorSelected","TypeScriptLanguage","Umbrella",
                                        "Underline","Undo","Uneditable","UneditableMirrored","UneditableSolid12","UneditableSolidMirrored12","Unfavorite","UngroupObject",
                                        "Unknown","UnknownCall","UnknownMirrored","UnknownMirroredSolid","UnknownSolid","Unlock","UnlockSolid","Unpin","Unsubscribe",
                                        "UnsyncFolder","UnsyncOccurence","Up","Upload","UserFollowed","UserPause","UserSync","Vacation","Variable","VariableGroup","VB",
                                        "VennDiagram","VerticalDistributeCenter","Video","VideoOff","VideoSearch","VideoSolid","View","ViewAll","ViewAll2","ViewDashboard",
                                        "ViewList","ViewListGroup","ViewListTree","VisioDiagram","VisioDocument","VisioLogo","VisioLogo16","VisioLogoFill","VisioLogoFill16",
                                        "VisioLogoInverse","VisioLogoInverse16","VisualBasicLanguage","VisualsFolder","VisualsStore","VisualStudioLogo","VoicemailForward",
                                        "VoicemailIRM","VoicemailReply","Volume0","Volume1","Volume2","Volume3","VolumeDisabled","VSTSAltLogo1","VSTSAltLogo2","VSTSLogo",
                                        "Waffle","WaffleOffice365","WaitlistConfirm","WaitlistConfirmMirrored","Warning","WebPublish","Website","Weights","WifiEthernet",
                                        "WindDirection","WindowEdit","WindowsLogo","Wines","WipePhone","WordDocument","WordLogo","WordLogo16","WordLogoFill","WordLogoFill16",
                                        "WordLogoInverse","WordLogoInverse16","Work","WorkFlow","WorkforceManagement","WorkItem","WorkItemBar","WorkItemBarSolid","WorkItemBug",
                                        "World","WorldClock","YammerLogo","ZipFolder","Zoom","ZoomIn","ZoomOut"
                                    ]
                                }
                            ]
                        },
                        "rel": {
                            "description": "Specifies the relationship between the current document and the linked document, used primarily for <a> element types.",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                },
                                {
                                    "enum": [
                                        "alternate","author","bookmark","external","help","license","next",
                                        "nofollow","noreferrer","noopener","prev","search","tag"
                                    ]
                                }
                            ]
                        },
                        "title": {
                            "description": "Specified extra information about the element, generally shown as tooltip text on element hover.",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                },
                                {
                                    "$ref": "#/definitions/fieldValue"
                                }
                            ]
                        }
                    },
                    "patternProperties": {
                        "^aria\\-[a-z]+$": {
                            "description": "Specifies aria- attributes for the element",
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/expression"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        }
                    },
                    "additionalProperties": false
                }
            },
            "required": [
                "elmType"
            ]
        },
        "expressionOrString": {
            "anyOf": [
                { "$ref": "#/definitions/expression" },
                { "type": "string" }
            ]
        },
        "styleBasic": {
            "allOf": [{ "enum": [ "initial","inherit","unset" ] }]
        },
        "styleStandard": {
            "anyOf": [
                { "$ref": "#/definitions/expressionOrString" },
                { "$ref": "#/definitions/styleBasic" }
            ]
        },
        "styleStrict": {
            "anyOf": [
                { "$ref": "#/definitions/expression" },
                { "$ref": "#/definitions/styleBasic" }
            ]
        },
        "styleBorderStyle": {
            "anyOf": [
                { "$ref": "#/definitions/styleStrict" },
                { "enum": [ "none","hidden","dotted","dashed","solid","double","groove","ridge","inset","outset" ] }
            ]
        },
        "styleBorderWidth": {
            "anyOf": [
                { "$ref": "#/definitions/styleStandard" },				
                { "enum": [ "medium","thin","thick" ] }
            ]
        },
        "styleOverflow": {
            "anyOf": [
                { "$ref": "#/definitions/styleStrict" },
                { "enum": [ "visible","hidden","scroll","auto" ] }
                
            ]
        },
        "styleStandardAuto": {
            "anyOf": [
                { "$ref": "#/definitions/styleStandard" },
                { "enum": [ "auto" ] }
            ]
        },
        "styleColor": {
            "anyOf": [
                { "$ref": "#/definitions/styleStandard" },
                {
                    "enum": [
                        "transparent","currentColor",
                        "aqua","black","blue","fuchsia","gray","green","lime","maroon","navy","olive","purple","red","silver","teal","white","yellow",
                        "aliceblue","antiquewhite","aquamarine","azure","beige","bisque","blanchedalmond","blueviolet","brown","burlywood","cadetblue",
                        "chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray",
                        "darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen",
                        "darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick",
                        "floralwhite","forestgreen","gainsboro","ghostwhite","gold","goldenrod","greenyellow","honeydew","hotpink","indianred","indigo",
                        "ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow",
                        "lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow",
                        "limegreen","linen","magenta","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue",
                        "mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","oldlace",
                        "olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff",
                        "peru","pink","plum","powderblue","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna",
                        "skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","thistle","tomato","turquoise","violet","wheat",
                        "whitesmoke","yellowgreen","rebeccapurple"
                    ]
                }
            ]
        },
        "fieldValue": {
            "allOf":[
                {
                    "enum": [
                        "@currentField",
                        "@currentField.title",
                        "@currentField.id",
                        "@currentField.email",
                        "@currentField.sip",
                        "@currentField.picture",
                        "@currentField.lookupValue",
                        "@currentField.lookupId",
                        "@me",
                        "@now"
                    ]
                }
            ]
        }
    },
    "$ref": "#/definitions/elm"
};