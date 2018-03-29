export interface ISiteScriptAction {
  verb: string;
  subactions?: ISiteScriptAction[];
}

export interface ISiteScriptContent {
  $schema?: string;
  actions : (any | ISiteScriptAction)[];
  bindata: {};
  version: number;
}

export interface ISiteScript {
  Id: string;
  Title: string;
  Description: string;
  Content: ISiteScriptContent;
  Version: number;
}

export const SiteScriptEntitySchema = {
  "type": "object",
	"properties": {
    "Id": { "type": "string"},
    "Title": { "type": "string"},
    "Description": { "type": "string"},
		"Version": { "type": "number"}
  }
};
