// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';
import { ISharePointItem } from '../data/ISharePointItem';

import Debug from '../utilities/Debug';


export interface IItemLookupFieldDisplayProps extends IFieldComponentProps {

}

export interface IItemLookupFieldDisplayState extends IFieldComponentState {
  lookupItem : ISharePointItem;
}

export default class ItemLookupFieldDisplay extends FieldComponent<IItemLookupFieldDisplayProps, IItemLookupFieldDisplayState> {

  public constructor()
  {
    super();
  }

  public componentWillMount() : void {
    if (this.props == null || this.props.itemContext == null)
    {
      return;
    }

    if (this.value != null && (this.value > 0 || this.value < 0))
    {
      this.props.itemContext.readListItemsByIds(this.props.field.LookupList, [ this.value ]).then(
              (displayItems: ISharePointItem[]) => { 
                Debug.assert(displayItems != null && displayItems.length == 1, "Could not find expected lok up items for item ID '" + this.value + "' Found: " + (displayItems ? "null" : displayItems.length) + " items");

                if (displayItems.length == 1)
                {
                  this.setState( { lookupItem: displayItems[0] } ); 
                }
            }
      );
    }
  }

  public render(): JSX.Element 
  {
    if (this.state == null || this.state.lookupItem == null)
    {
      return <div></div>;
    }

    return <div>{ this.state.lookupItem.Title }</div>;
  }
}
