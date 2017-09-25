// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';

export interface IItemRichTextFieldEditorProps extends IFieldComponentProps {
}

export interface IItemRichTextFieldEditorState extends IFieldComponentState {
}

export default class ItemRichTextFieldEditor extends FieldComponent<IItemRichTextFieldEditorProps, IItemRichTextFieldEditorState> {
  private _lastValue = null;
  private _lastRichTextState = null;
  public constructor()
  {
    super();

    this._handleHtmlChanged = this._handleHtmlChanged.bind(this);
  }
  
  private _handleHtmlChanged(newValue) 
  {
    this._lastRichTextState = newValue;

    let newValueHtml = newValue.toString('html');

    if (newValueHtml != this._lastValue && newValueHtml != this.value)
    {
      this._lastValue = this.value;
      this.value = newValueHtml;
    }
  }

  private _handleEvent(e : Event)
  {
    e.cancelBubble = true;
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  public render(): JSX.Element {
    var me = this;
    /*
      <RichTextEditor
             className={styles.richTextEditor}
              autoFocus={ false }
              value={ this._lastRichTextState ? this._lastRichTextState : 
                      this.valueString != null && this.valueString.length > 2 ? 
                            RichTextEditor.createValueFromString(this.valueString, 'html') : 
                            RichTextEditor.createEmptyValue()
                    }
              onChange={this._handleHtmlChanged}
        />
*/
    return (
      <div className={styles.itemRichTextFieldEditor}  ref={ (input) => {
        if (input != null)
        {
          input.addEventListener("textInput", me._handleEvent, false);
          input.addEventListener("click", me._handleEvent, false);
          input.addEventListener("change", me._handleEvent, false);
          input.addEventListener("mousedown", me._handleEvent, false);
          input.addEventListener("mouseup", me._handleEvent, false);
          input.addEventListener("selectstart", me._handleEvent, false);
          input.addEventListener("cut", me._handleEvent, false);
          input.addEventListener("copy", me._handleEvent, false);
          input.addEventListener("paste", me._handleEvent, false);
          input.addEventListener("keydown", me._handleEvent, false);
          input.addEventListener("keyup", me._handleEvent, false);
          input.addEventListener("keypress", me._handleEvent, false);
          input.addEventListener("focusout", me._handleEvent, false);
          input.addEventListener("focusin", me._handleEvent, false);
          input.addEventListener("focus", me._handleEvent, false);
          input.addEventListener("blur", me._handleEvent, false);
          input.addEventListener("selectionchange", me._handleEvent, false);
          document.addEventListener("textInput", me._handleEvent, false);
        }
        else
        {
          document.removeEventListener("textInput", me._handleEvent, false);
        }
         }} >
         <FocusZone>
         </FocusZone>
      </div>
    );
  }
}
