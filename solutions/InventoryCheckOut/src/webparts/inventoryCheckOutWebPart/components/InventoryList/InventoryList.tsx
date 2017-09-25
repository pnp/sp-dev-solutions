// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { css, Label, PrimaryButton, CommandButton, DocumentCard, DocumentCardActivity, DocumentCardPreview, ImageFit,DocumentCardTitle } from 'office-ui-fabric-react';
import InventoryItemCard from '../InventoryItemCard/InventoryItemCard';
import IInventoryListProps from './IInventoryListProps';
import style from './InventoryList.module.scss';

export default class InventoryList extends React.Component<IInventoryListProps, any> {
  constructor(props: IInventoryListProps) {
    super(props);
    this.state = {
     myCheckoutItems:props.myCheckoutItems,
     allItems:props.allItems,
     selectedItemId:null,
     activeId: 0,
     isMyCheckoutItemClicked:false
    };
    this._handleChange = this._handleChange.bind(this);
  }

    public componentWillReceiveProps(props: IInventoryListProps) {
    
        this.setState({
            myCheckoutItems:props.myCheckoutItems,
            allItems:props.allItems
        });
        
    }

    private _handleChange(id, isMyCheckoutItemClicked) {        
        this.setState({ activeId: id , isMyCheckoutItemClicked:isMyCheckoutItemClicked});
        this.props.onClickEvent(id);
    }

     public render(): JSX.Element {
         let myCheckoutItems = this.props.myCheckoutItems;
         let allItems = this.props.allItems;
      
        return (
            <div className={style.inventoryList}>
                { myCheckoutItems.length > 0 ?
                    <div className={style.inventoryListTitle}>
                        <h3>My Checked Out Items</h3>
                    </div> : <div></div>
                }
                <div className={style.mycheckoutitems}>
                 {myCheckoutItems.map((item) =>
                    <InventoryItemCard key={ item.id } item={ item } onClickEvent={ this._handleChange }/>
                 )}
                </div>
                <div className={style.inventoryListTitle}>
                    <h3>All Items</h3>
                </div>
                <div className={style.mycheckoutitems}>
                  {allItems.map((item) =>
                    <InventoryItemCard key={ item.id } item={ item } onClickEvent={ this._handleChange }/>
                )}    
                </div>
            </div>
        );
    }
}