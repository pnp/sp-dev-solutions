// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';
import { ISharePointItem } from '../data/ISharePointItem';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';

export interface IItemMultiLookupFieldEditorProps extends IFieldComponentProps {
  allowOnlySingleSelection? : boolean;
}

export interface IItemMultiLookupFieldEditorState extends IFieldComponentState {
  selections: IPickerItem[];
}

export interface IPickerItem 
{ 
  key: string;
  name: string;
}

export default class ItemMultiLookupFieldEditor extends FieldComponent<IItemMultiLookupFieldEditorProps, IItemMultiLookupFieldEditorState> {

  public constructor()
  {
    super();

    this._handleChanged = this._handleChanged.bind(this);
    this._onFilterChanged = this._onFilterChanged.bind(this);
  }

  public componentWillMount() : void 
  {
    if (this.props == null || this.props.itemContext == null)
    {
      return;
    }
    
    if (this.value == null || (this.value != null && this.value.length != null && this.value.length == 0))
    {
      this.setState( { selections: new Array() });
    }
    else
    {
      this.props.itemContext.readListItemsByIds(this.props.field.LookupList, this.value).then(
          (displayItems: ISharePointItem[]) => { 

          var selectionsList : IPickerItem[] = new Array();

          for (var displayItem of displayItems)
          {
              selectionsList.push( { 
              key: displayItem.Id + "", 
              name: displayItem.Title
            });
          }
              
          this.setState( { 
            selections: selectionsList
          } ); 
        }
      );
    }
  }

  protected _handleChanged(pickerItems : IPickerItem[]) : void
  {
    if (pickerItems == null)
    {
      this.value = null;
    }
    else
    {
      var lastPickerItem = null;
      var selectedItems : number[] = new Array();

      for (var item of pickerItems)
      {
        lastPickerItem = item;
        selectedItems.push(parseInt(item.key));
      }

      if (this.props.allowOnlySingleSelection)
      {
        if (selectedItems.length > 0)
        {
          this.value = selectedItems[selectedItems.length - 1];
          if (selectedItems.length > 1 && lastPickerItem != null)
          {
            this.setState( { 
              selections: [ lastPickerItem ]
            } ); 
          }        
        }
        else
        {
          this.value = null;
        }
      }
      else
      {
        this.value = selectedItems;
      }
    }
  }

  private _onFilterChanged(filterText: string, tagList: IPickerItem[])  
  {
    if (filterText) 
    {
        return this.props.itemContext.readListItemsBySearch(this.props.field.LookupList, filterText).then( (items: ISharePointItem[]) =>
        {
          var selections : IPickerItem[] = new Array();
          
          if (items != null)
          {
            for (var item of items)
            {
              var selection = {
                name: item.Title,
                key: item.Id + ""
              };

              selections.push(selection);

              this.forceUpdate();
            }
          }

          return selections;
        });
    } 
    else
    {
      return [];
    }
  }

  public render(): JSX.Element 
  {
    if (this.state == null || this.state.selections == null)
    {
      return <div></div>;
    }
    
    return (
      <div className={styles.sharePointComponent}>
        <TagPicker
          onResolveSuggestions = { this._onFilterChanged.bind(this) }
          getTextFromItem = { (item: any) => { return item.name; } }
          defaultSelectedItems = { this.state.selections }
          onChange= { this._handleChanged }
          pickerSuggestionsProps={
          {
            suggestionsHeaderText: 'Items',
            noResultsFoundText: 'No Items Found'
          }
        }
        />

      </div>
    );
  }
}
