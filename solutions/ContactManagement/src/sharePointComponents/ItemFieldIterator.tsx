// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import Debug from '../utilities/Debug';

import { ISPField } from '../data/ISPField';
import { FieldTypeKind } from '../data/FieldTypeKind';
import SPUrl from '../data/SPUrl';

import styles from './sharePointComponents.module.scss';

import { ItemComponent, IItemComponentProps, IItemComponentState } from './ItemComponent';

import ItemFieldLabel from './ItemFieldLabel';

import UserInterfaceUtility from './UserInterfaceUtility';

export interface IItemFieldIteratorProps extends IItemComponentProps {
  excludedFields? : string[];
  isDisplayOnly? : boolean;
}

export interface IItemFieldIteratorState extends IItemComponentState {
  fields? : ISPField[];
}

export default class ItemFieldIterator extends ItemComponent<IItemFieldIteratorProps, IItemFieldIteratorState> {

  public constructor()
  {
    super();

    this.state = {

    };

    this._isFieldExcluded = this._isFieldExcluded.bind(this);
    this._isFieldTypeExcluded = this._isFieldTypeExcluded.bind(this);
  }

  public componentWillMount()
  {
    if (this.props != null && this.props.itemContext != null)
    {
      this.setState(
        {
          fields: this.props.itemContext.list.Fields
        }
      );
    }
  }

  private _canonicalizeFieldName(fieldName : string) : string
  {
    return fieldName.replace(" ", "").replace("_x0020_", "").toLowerCase();
  }

  private _isFieldTypeExcluded(kind : FieldTypeKind) : boolean
  {
    if (kind == FieldTypeKind.DateTime  ||
        kind == FieldTypeKind.Choice ||
        kind == FieldTypeKind.Url || 
        kind == FieldTypeKind.Lookup ||
        kind == FieldTypeKind.User || 
        kind == FieldTypeKind.Text || 
        kind == FieldTypeKind.Note)
        {
          return false;
        }

    return true;
  }

  private _isFieldExcluded(fieldInternalName : string) : boolean
  {
    if (this.props.excludedFields == null)
    {
      return false;
    }

    fieldInternalName = this._canonicalizeFieldName(fieldInternalName);
    
    for (let fieldName of this.props.excludedFields)
    {
      if (this._canonicalizeFieldName(fieldName) == fieldInternalName)
      {
        return true;
      }
    }

    return false;
  }

  public isValueEmpty(field : ISPField) : boolean
  {
    var val = this.props.itemContext.itemObject[this.effectiveInternalNameForField(field)];

    if (val == null)
    {
      return true;
    }

    if (val instanceof SPUrl)
    {
      var url = val as SPUrl;

      if (url != null)
      {
        if (url.Description == null && url.Url == null)
        {
          return true;
        }
      }
    }

    if (field.FieldTypeKind == FieldTypeKind.Lookup && val == 0)
    {
      return true;
    }

    return false;
  }

  public render(): JSX.Element {
    let me = this;
    
    let fields = new Array();

    if (me.state != null && me.state.fields != null)
    {
      for (let field of me.state.fields)
      {
        Debug.assert(field != null, "Field not found in iteration list of fields."); 
    
        if (field != null && ( field.InternalName != 'ID' && 
          field.Title != 'Version' && 
          !me._isFieldExcluded(field.InternalName) && 
          !me._isFieldTypeExcluded(field.FieldTypeKind) && 
          field.Title != 'Item Child Count' && 
          field.Title != 'Attachments' && 
          field.Title != 'Folder Child Count'  &&  
          me.props != null &&                   
          (me.props.isDisplayOnly || 
          ( field.InternalName != "Editor" && 
            field.InternalName != "Author" && 
            field.InternalName != "Attachments" && 
            field.InternalName != 'Modified' && 
            field.InternalName != 'Created'
            )
          ) 
        ))
        {
          if (me.props != null)
          // && (!me.props.isDisplayOnly || !me._isValueEmpty(field)))
          {
            fields.push(field);
          }
        }
      }
    }

    let doubleFields = new Array();

    for (let i=0; i<fields.length; i+=2)
    {
      if (i < fields.length - 1)
      {
        doubleFields.push([fields[i], fields[i + 1]]);
      }
      else
      {
        doubleFields.push([fields[i]]);
      }
    }

    return (
      <div className={ styles.itemFieldIterator }>
        <div className={ styles.table }>
          {
            doubleFields.map( (doubleField : ISPField[], i) =>
              {
                return <span key={"SPIF" + i} className={ styles.iteratorRow }>
                  <span className={ me.props.isDisplayOnly ? styles.iteratorHeaderCellDisplay : styles.iteratorHeaderCell }>
                    <ItemFieldLabel appendColon={ true } itemContext={ me.props.itemContext } field={ doubleField[0] } />
                   </span>
                   <span className={ me.props.isDisplayOnly ? styles.iteratorValueCellDisplay : styles.iteratorValueCell }>
                    {
                      UserInterfaceUtility.getFieldElement(me.props.itemContext, doubleField[0], me.props.isDisplayOnly) 
                    }
                   </span>
                
                    <span className={ me.props.isDisplayOnly ? styles.iteratorSecondHeaderCellDisplay : styles.iteratorSecondHeaderCell }>
                      <ItemFieldLabel appendColon={ true } itemContext={ me.props.itemContext } field={ doubleField.length > 1 ? doubleField[1] : null } />
                    </span>
                    <span className={ me.props.isDisplayOnly ? styles.iteratorSecondValueCellDisplay : styles.iteratorSecondValueCell }>
                      {
                        doubleField.length > 1 ? UserInterfaceUtility.getFieldElement(me.props.itemContext, doubleField[1], me.props.isDisplayOnly) : null 
                      }
                    </span>                
                  </span>;
              })
            }
        </div>
      </div>
    );
  }
}
