export default class ElemUtil {
    public static closest(element: any, selector: string): any{
		if(element.closest) return element.closest(selector);
		
		while (element) {
			if (ElemUtil.matches(element,selector)) {
				return element;
			} else {
			    element = element.parentElement;
			}			
		}
		return null;
	}
	private static matches(element: any, selector: string): boolean {
		if(element["matchesSelector"]) return element["matchesSelector"](selector);  
        if(element["mozMatchesSelector"]) return element["mozMatchesSelector"](selector);
        if(element["msMatchesSelector"]) return  element["msMatchesSelector"](selector);
        if(element["oMatchesSelector"]) return element["oMatchesSelector"](selector);
        if(element["webkitMatchesSelector"]) return element["webkitMatchesSelector"](selector);			
		
		var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== element) {}
            return i > -1;            
        };
}