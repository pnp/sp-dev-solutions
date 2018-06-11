import { ColumnFormattingSchemaURI } from "./ColumnFormattingSchema";

export const ViewFormattingSchemaURI: string = "http://viewformatting.sharepointpnp.com/viewFormattingSchema.json";

export const ViewFormattingSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "ViewFormatter JSON",
    "description": "View Formatter JSON for SharePoint lists",
    "type": "object",
    "properties": {
        "hideSelection": {
            "description": "If true, then selection UX in this view will be disabled.",
            "type": "boolean"
        },
        "hideColumnHeaders": {
            "description": "If true, then the list column header UX in this view will be hidden",
            "type": "boolean"
        },
        "rowFormatter": {
            "$ref": `${ColumnFormattingSchemaURI}#definitions/elm`
        },
        "additionalRowClass": {
            "description": "An expression whose output is a class name to be applied to the list row.",
            "$ref": `${ColumnFormattingSchemaURI}#definitions/expression`
        }
    }
};