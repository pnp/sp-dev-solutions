export default class QueryStringParser{
    public static getQueryStringValue(name: string, url?:string):string{
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");

        name = name.toLowerCase();
        url = url.toLowerCase();

        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    public static ReplaceQueryStringParameters(value: string): string {
        const qsRegex = new RegExp(/\[QueryString\.(.*?)\]/g);
        const qsParams = qsRegex.exec(value);
        if(qsParams && qsParams.length>0){
            qsParams.forEach(element => {
                if(element.indexOf('[QueryString.')>-1){
                    const origVal = element;
                    const paramElement = element.replace("[QueryString.","").replace("]","");
                    value = value.replace(origVal,QueryStringParser.getQueryStringValue(paramElement));
                }
            });
        }
        return value;
    }
}