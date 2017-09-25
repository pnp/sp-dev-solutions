// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export default class ElementUtilities {
    public static getParentElementAttribute(elt : Element, attr : string) : any {
      let node = elt.parentElement;

      while (node != null && !node.hasAttribute(attr))
      {
        node = node.parentElement;
      }

      if (node == null)
      {
        return null;
      }
      
      return node.getAttribute(attr);
    }
}
