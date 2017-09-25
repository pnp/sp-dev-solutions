// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';
import SPUrl from '../data/SPUrl';
import SharePointUtility from '../data/SharePointUtility';

export interface IUrlFieldComponentProps extends IFieldComponentProps {

}

export interface IUrlFieldComponentState extends IFieldComponentState {
}

export abstract class UrlFieldComponent<P extends IUrlFieldComponentProps, S extends IUrlFieldComponentState> extends FieldComponent<P, S> 
{
  public constructor()
  {
    super();

    this._urlChanged = this._urlChanged.bind(this);
    this._descriptionChanged = this._descriptionChanged.bind(this);
  }

  protected _urlChanged(newValue : any) : void
  {
    this.url = newValue;
  }

  protected _descriptionChanged(newValue : any) : void
  {
    this.description = newValue;
  }

  public get url() : string
  {
    return SharePointUtility.getUrl(this.props.itemContext.itemObject, this.effectiveFieldInternalName);
  }

  public get description() : string
  {
    var obj = this.value;

    if (obj == null)
    {
      return null;
    }
    
    if (obj instanceof SPUrl)
    {
      return (obj as SPUrl).Description;
    }
    else if (typeof obj == "object")
    {
      return obj.Description;
    }

    return "";
  }

  public set url(newValue : string)
  {
    var spurl : SPUrl = new SPUrl();

    spurl.Url = newValue;
    spurl.Description = this.description;

    this.value = spurl;
  }

  public set description(newValue : string)
  {
    var spurl : SPUrl = new SPUrl();

    spurl.Url = this.url;
    spurl.Description = newValue;

    this.value = spurl;
  }

  public abstract render();
}
