// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import { ItemComponent, IItemComponentProps, IItemComponentState } from './ItemComponent';
import { ISPField } from '../data/ISPField';
import { FieldTypeKind } from '../data/FieldTypeKind';
import { ISharePointItem } from '../data/ISharePointItem';

import Debug from '../utilities/Debug';

export type FieldValueChangeCallback = (field : ISPField, item : ISharePointItem, value : any) => void;

export interface IFieldComponentProps extends IItemComponentProps {
  field : ISPField;
  onChanged? : FieldValueChangeCallback;
}

export interface IFieldComponentState extends IItemComponentState {
}

export abstract class FieldComponent<P extends IFieldComponentProps, S extends IFieldComponentState> extends ItemComponent<P, S> 
{
  public constructor()
  {
    super();

    this._handleValueChanged = this._handleValueChanged.bind(this);
  }

  protected _handleValueChanged(newValue : any) : void
  {
    this.value = newValue;
  }

  public abstract render();

  public get valueString() : string
  {
    var io = this.props.itemContext.itemObject;

    if (io == null)
    {
      return "";
    }

    if (io[this.effectiveFieldInternalName] == null)
    {
      return "";
    }

    return io[this.effectiveFieldInternalName] + "";
  }

  public set valueString(newValue : string)
  {
    var io = this.props.itemContext.itemObject;

    if (io == null)
    {
      Debug.fail("Could not update field '" + this.effectiveFieldInternalName + "' - no backing object.");
      return;
    }

    if (newValue != io[this.effectiveFieldInternalName])
    {
      io[this.effectiveFieldInternalName] = newValue;

      if (this.props.onChanged != null)
      {
        this.props.onChanged(this.props.field, this.props.itemContext.itemObject, newValue);
      }

      this.forceUpdate();

      this.props.itemContext.hasChanged = true;
    }
  }

  public get effectiveFieldInternalName() : string
  {
    var fieldName = this.props.field.InternalName;

    if ((this.props.field.FieldTypeKind == FieldTypeKind.Lookup || this.props.field.FieldTypeKind == FieldTypeKind.User)  && 
        fieldName.substring(fieldName.length-2, fieldName.length) != "Id")
    {
      fieldName += "Id";
    }

    return fieldName;
  }

  public get value() 
  {
    var io = this.props.itemContext.itemObject;

    if (io == null)
    {
      return null;
    }
    
    if (this.props.field == null)
    {
      throw "Field was not found.";
    }


    return io[this.effectiveFieldInternalName];
  }

  public set value(newValue : any)
  {
    var io = this.props.itemContext.itemObject;

    if (io == null)
    {
      // Debug.fail("Could not update field '" + this.effectiveFieldInternalName + "' - no backing object.");
      return;
    }

    var fieldName = this.props.field.InternalName;

    if ((this.props.field.FieldTypeKind == FieldTypeKind.Lookup || this.props.field.FieldTypeKind == FieldTypeKind.User) && 
        fieldName.substring(fieldName.length-2, fieldName.length) != "Id")
    {
      fieldName += "Id";
    }

    if (newValue != io[fieldName])
    {
      io[fieldName] = newValue;

      if (this.props.onChanged != null)
      {
        this.props.onChanged(this.props.field, this.props.itemContext.itemObject, newValue);
      }

      this.forceUpdate();

      this.props.itemContext.hasChanged = true;
    }
  }
}
