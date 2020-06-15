// source: https://github.com/pnp/pnpjs/blob/version-2/samples/project-preset/src/pnp-preset.ts

import { SPRest } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users";
import "@pnp/sp/site-groups/web";

export const sp = new SPRest(); 