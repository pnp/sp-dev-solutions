import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { Text, Log } from "@microsoft/sp-core-library";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { ITokenService } from ".";

const LOG_SOURCE: string = '[SearchResultsWebPart_{0}]';

export class TokenService implements ITokenService {
    private _context: IWebPartContext;

    constructor(context: IWebPartContext) {
        this._context = context;
    }

    public async replaceQueryVariables(queryTemplate: string): Promise<string> {
        const pagePropsVariables = /\{(?:Page)\.(.*?)\}/gi;
        let reQueryTemplate = queryTemplate;
        let match = pagePropsVariables.exec(reQueryTemplate);
        let item = null;

        if (match != null) {
            let url = this._context.pageContext.web.absoluteUrl + `/_api/web/GetList(@v1)/RenderExtendedListFormData(itemId=${this._context.pageContext.listItem.id},formId='viewform',mode='2',options=7)?@v1='${this._context.pageContext.list.serverRelativeUrl}'`;
            var client = this._context.spHttpClient;
            try {
                const response: SPHttpClientResponse = await client.post(url, SPHttpClient.configurations.v1, {});
                if (response.ok) {
                    let result = await response.json();
                    let itemRow = JSON.parse(result.value);
                    item = itemRow.Data.Row[0];
                }
                else {
                    throw response.statusText;
                }
            } catch (error) {
                Log.error(Text.format(LOG_SOURCE, "RenderExtendedListFormData"), error);
            }

            while (match !== null && item != null) {
                // matched variable
                let pageProp = match[1];
                let itemProp;
                if (pageProp.indexOf(".Label") !== -1 || pageProp.indexOf(".TermID") !== -1) {
                    let term = pageProp.split(".");

                    // Handle multi or single values
                    if (item[term[0]].length > 0) {
                        itemProp = item[term[0]].map(e => { return e[term[1]]; }).join(',');
                    } else {
                        itemProp = item[term[0]][term[1]];
                    }
                } else {
                    itemProp = item[pageProp];
                }
                if (itemProp && itemProp.indexOf(' ') !== -1) {
                    // add quotes to multi term values
                    itemProp = `"${itemProp}"`;
                }
                queryTemplate = queryTemplate.replace(match[0], itemProp);
                match = pagePropsVariables.exec(reQueryTemplate);
            }
        }

        const currentDate = /\{CurrentDate\}/gi;
        const currentMonth = /\{CurrentMonth\}/gi;
        const currentYear = /\{CurrentYear\}/gi;

        const d = new Date();
        queryTemplate = queryTemplate.replace(currentDate, d.getDate().toString());
        queryTemplate = queryTemplate.replace(currentMonth, (d.getMonth() + 1).toString());
        queryTemplate = queryTemplate.replace(currentYear, d.getFullYear().toString());

        return queryTemplate;
    }
}