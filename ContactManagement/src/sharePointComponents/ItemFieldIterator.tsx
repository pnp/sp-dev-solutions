// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import Debug from '../utilities/Debug';

import { ISPField, FieldTypeKind } from '../data/ISPField';
import { ISPList } from '../data/ISPList';
import SPUrl from '../data/SPUrl';

import styles from './sharePointComponents.module.scss';

import { ItemComponent, IItemComponentProps, IItemComponentState } from './ItemComponent';

import ItemFieldLabel from './ItemFieldLabel';

import ItemLookupFieldEditor from './ItemLookupFieldEditor';
import ItemLookupFieldDisplay from './ItemLookupFieldDisplay';
import ItemMultiLookupFieldEditor from './ItemMultiLookupFieldEditor';
import ItemMultiLookupFieldDisplay from './ItemMultiLookupFieldDisplay';
import ItemMultilineTextFieldEditor from './ItemMultilineTextFieldEditor';
import ItemPeopleFieldEditor from './ItemPeopleFieldEditor';
import ItemPeopleFieldDisplay from './ItemPeopleFieldDisplay';
import ItemDateFieldEditor from './ItemDateFieldDisplay';
import ItemChoiceFieldEditor from './ItemChoiceFieldEditor';
import ItemDateFieldDisplay from './ItemDateFieldDisplay';
import ItemTextFieldEditor from './ItemTextFieldEditor';
import ItemTextFieldDisplay from './ItemTextFieldDisplay';
import ItemRichTextFieldDisplay from './ItemRichTextFieldDisplay';
import ItemUrlFieldEditor from './ItemUrlFieldEditor';
import ItemUrlFieldDisplay from './ItemUrlFieldDisplay';
// import ItemRichTextFieldEditor from './ItemRichTextFieldEditor';

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

    this._getFieldElement = this._getFieldElement.bind(this);
    this._isFieldExcluded = this._isFieldExcluded.bind(this);
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

  private _getFieldElement(list: ISPList, field : ISPField) : JSX.Element
  {
    if (this.props.isDisplayOnly == true)
    {
      switch (field.FieldTypeKind)
      {
        case FieldTypeKind.DateTime:
          return <ItemDateFieldDisplay itemContext={ this.props.itemContext } field={ field } />;

        case FieldTypeKind.Url:
          return <ItemUrlFieldDisplay itemContext={ this.props.itemContext } field={ field } />;

        case FieldTypeKind.Lookup:
          if (field.AllowMultipleValues)
          {
            return <ItemMultiLookupFieldDisplay itemContext={ this.props.itemContext } field={ field } />;
          }
          
          return <ItemLookupFieldDisplay itemContext={ this.props.itemContext } field={ field } />;
        
        case FieldTypeKind.User:
          return <ItemPeopleFieldDisplay itemContext={ this.props.itemContext } field={ field } />;

        default:
          if (field.RichText == true)
          {
            return <ItemRichTextFieldDisplay itemContext={ this.props.itemContext } field={ field }/>;
          }

          return <ItemTextFieldDisplay itemContext={ this.props.itemContext } field={ field } />;
      }
    }
    else
    {
      switch (field.FieldTypeKind)
      {
        case FieldTypeKind.DateTime:
          return <ItemDateFieldEditor itemContext={ this.props.itemContext } field={ field } />;

        case FieldTypeKind.Choice:
          return <ItemChoiceFieldEditor itemContext={ this.props.itemContext } field={ field } />;

        case FieldTypeKind.Url:
          return <ItemUrlFieldEditor itemContext={ this.props.itemContext } field={ field }/>;

        case FieldTypeKind.Lookup:
          if (field.AllowMultipleValues)
          {
            return <ItemMultiLookupFieldEditor itemContext={ this.props.itemContext } field={ field } />;
          }
         else if (list.ListItemCount > 220)
          {
            return <ItemMultiLookupFieldEditor allowOnlySingleSelection={ true } itemContext={ this.props.itemContext } field={ field } />;
          }
          
          return <ItemLookupFieldEditor itemContext={ this.props.itemContext } field={ field } />;
        
        case FieldTypeKind.User:
          return <ItemPeopleFieldEditor itemContext={ this.props.itemContext } field={ field } />;

        default:
          if (field.RichText == true)
          {
            //return <ItemRichTextFieldEditor itemContext={ this.props.itemContext } field={ field } />;
            return <ItemMultilineTextFieldEditor itemContext={ this.props.itemContext } stripHtml={ true } field={ field } />;

          }

          return <ItemTextFieldEditor itemContext={ this.props.itemContext } field={ field } />;
      }
    }
  }

  private _canonicalizeFieldName(fieldName : string) : string
  {
    return fieldName.replace(" ", "").replace("_x0020_", "").toLowerCase();
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

  private _isValueEmpty(field : ISPField) : boolean
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
          if (me.props != null && (!me.props.isDisplayOnly || !me._isValueEmpty(field)))
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
                    <ItemFieldLabel itemContext={ me.props.itemContext } field={ doubleField[0] } />
                   </span>
                   <span className={ me.props.isDisplayOnly ? styles.iteratorValueCellDisplay : styles.iteratorValueCell }>
                    {
                      me._getFieldElement(me.props.itemContext.list, doubleField[0]) 
                    }
                   </span>
                
                    <span className={ me.props.isDisplayOnly ? styles.iteratorSecondHeaderCellDisplay : styles.iteratorSecondHeaderCell }>
                      <ItemFieldLabel itemContext={ me.props.itemContext } field={ doubleField.length > 1 ? doubleField[1] : null } />
                    </span>
                    <span className={ me.props.isDisplayOnly ? styles.iteratorSecondValueCellDisplay : styles.iteratorSecondValueCell }>
                      {
                        doubleField.length > 1 ? me._getFieldElement(me.props.itemContext.list, doubleField[1]) : null 
                      }
                    </span>                
                  </span>;
              })
            }
        </div>
      </div>
    );
/*
    return (
      <div className={ styles.itemFieldIterator }>
        <div className={ styles.table }>
          {
            fields.map(function(field : ISPField, i)
              {
                return <span key={"SPIF" + i} className={ styles.iteratorRow }>
                  <span className={ styles.iteratorCell }>
                    <ItemFieldLabel itemContext={ me.props.itemContext } field={ field } fieldName={ field.InternalName }/>
                   </span>
                   <span>
                    {
                      me._getFieldElement(field) 
                    }
                    </span>
                  </span>;
              })
            }
        </div>
      </div>
    );*/
  }
}
