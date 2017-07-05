export default class UrlUtility
{
    public static ensureUrlEndsWithSlash(url: string) : string {
        
        if (url[url.length - 1] != '/')
        {
            url += '/';
        }

        return url;
    }
}