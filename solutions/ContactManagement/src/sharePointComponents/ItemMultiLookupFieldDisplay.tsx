// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';
import { ISharePointItem } from '../data/ISharePointItem';


export interface IItemMultiLookupFieldDisplayProps extends IFieldComponentProps {

}

export interface IItemMultiLookupFieldDisplayState extends IFieldComponentState {
  lookupItems : ISharePointItem[];
}

export default class ItemMultiLookupFieldDisplay extends FieldComponent<IItemMultiLookupFieldDisplayProps, IItemMultiLookupFieldDisplayState> {

  public constructor()
  {
    super();
  }

  public componentWillMount() : void {
    if (this.props == null || this.props.itemContext == null)
    {
      return;
    }

    if (this.value != null && this.value.length != null && this.value.length > 0)
    {
      this.props.itemContext.readListItemsByIds(this.props.field.LookupList, this.value).then(
              (displayItems: ISharePointItem[]) => { 

                this.setState( { lookupItems: displayItems } ); 
            }
      );
    }
  }

  public render(): JSX.Element 
  {
    if (this.state == null || this.state.lookupItems == null)
    {
      return <div></div>;
    }

    return <div className={ styles.itemMultiLookupFieldDisplay } >
            { this.state.lookupItems.map( (sharePointItem : ISharePointItem, i) =>
              {
                return <div key={ i } className={ styles.tag }> { sharePointItem.Title } </div>;
              })
            }
            </div>;
  }
}
