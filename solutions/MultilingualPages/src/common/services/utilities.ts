export function correctUrl(absoluteUrl:string):string{
  
  let url: string = absoluteUrl;
  let currentHost: string = (window.location.protocol + "//" + window.location.host);
  let reverseHost: string = 'https://mytakeda.sharepoint.com.rproxy.goskope.com';
  let normalHost: string = 'https://mytakeda.sharepoint.com';
  let reversePattern: RegExp = new RegExp(reverseHost,'gi');
  let normalPattern: RegExp = new RegExp(normalHost,'gi');

  switch(currentHost.toLowerCase()){

    case reverseHost:
      if(url.toLowerCase().indexOf(reverseHost) != -1){
        return url;
      }
      else {
        return url.replace(normalPattern,reverseHost);
      }

    case normalHost:
      if(url.toLowerCase().indexOf(reverseHost) == -1){
        return url;
      }
      else {
        return url.replace(reversePattern,normalHost);
      }

      default:
        return url;

  }

}

export function getQueryStringValue(name:string):string{
  let args: Array<string> = window.location.search.substring(1).split("&");
  let value: string = "";
  for (let i = 0; i < args.length; i++) {
      let n = args[i].split("=");
      if (n[0] == name)
          value = decodeURIComponent(n[1]);
  }
  return value;
}
