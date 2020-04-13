export function correctUrl(absoluteUrl:string):string{
  
  let url: string = absoluteUrl;
  let currentHost: string = (window.location.protocol + "//" + window.location.host);

  let reverseProxy = '.rproxy.goskope.com';
  let currentReverse = currentHost.toLowerCase().indexOf(reverseProxy) != -1 ? true : false;

  if (currentReverse) {
    if (url.toLowerCase().indexOf(reverseProxy) !== -1) {
      return url;
    }
    else {
      return url.replace(currentHost, currentHost + reverseProxy);
    }
  } else {
    if (url.toLowerCase().indexOf(reverseProxy) === -1) {
      return url;
    }
    else {
      return url.replace(reverseProxy, "");
    }
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
