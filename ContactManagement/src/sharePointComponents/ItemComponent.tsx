import * as React from 'react';
import ItemContext from './ItemContext';

import { ISPField, FieldTypeKind } from '../data/ISPField';

export interface IItemComponentProps {
  itemContext : ItemContext;  
}

export interface IItemComponentState {
}

export abstract class ItemComponent<P extends IItemComponentProps, S extends IItemComponentState> extends React.Component<P, S> {

  public constructor()
  {
    super();
  }

  public abstract render();
  
  public effectiveInternalNameForField(field : ISPField) : string
  {
    var fieldName = field.InternalName;

    if ((field.FieldTypeKind == FieldTypeKind.Lookup || field.FieldTypeKind == FieldTypeKind.User)  && 
        fieldName.substring(fieldName.length-2, fieldName.length) != "Id")
    {
      fieldName += "Id";
    }

    return fieldName;
  }

}
